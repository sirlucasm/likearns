import { useState } from 'react';
import Router from 'next/router';
import {
	Div,
	PixIcon,
	HeaderTitle,
	TitleArea,
	ShowHistoryArea,
	FormOfPayment,
	Button,
	ClaimRuleAlert,
	SelectValue,
	SelectValueItem,
} from '../../styles/components/WithdrawClaimReward';
import Swal from 'sweetalert2';
import {
	convertEarnsToPoints
} from '../../utils';
// icons
import {
	RiCopperCoinLine,
	RiPaypalFill,
	RiAlertLine
} from 'react-icons/ri';

// services
import UserWithdrawService from '../../services/UserWithdrawService';

const WithdrawClaimReward = ({
	me,
	rewardValue,
	setIsLoading
}) => {
	const MINIMAL_VALUE = 5;
	const currentValue = parseFloat(rewardValue);
	const [valueSelected, setValueSelected] = useState(0);
	const [lostPoints, setLostPoints] = useState(0);
	const values = [5, 10, 15, 20];

	const PaypalWithdraw = async (event) => {
		const params = {
			withdraw_type: 1,
			email_address: me.paypal_email,
			value: valueSelected,
			lost_points: lostPoints
		};
		if (!event.target.attributes['disabled']) {
			if (me.paypal_email) {
				// botão habilitado
				setIsLoading(true);
				UserWithdrawService.createPaypalOrder(params)
					.then(() => Swal.fire({
						position: 'top-end',
						icon: 'success',
						text: 'Solicitação de retirada criada com sucesso.',
						showConfirmButton: false,
						timer: 2500,
					})
						.then(() => {
							setIsLoading(false);
							Router.reload();
						})
					)
			} else {
				Swal.fire({
					position: 'top-end',
					icon: 'error',
					text: 'Você deve adicionar um email Paypal válido em "Opções".',
					showConfirmButton: false,
					timer: 2500,
				})
			}
		}
	}

	const canWithdraw = (currentValue >= MINIMAL_VALUE);
	const canWithdrawSelectedValue = (valueSelected >= MINIMAL_VALUE);

	const handleSelectValue = (value) => {
		setValueSelected(value);
		setLostPoints(
			convertEarnsToPoints({
				earns: currentValue,
				points: me.points,
				wantEarn: value
			})
		);
	}

	return (
		<Div className="container">
			<SelectValue active>
				{
					values.map((value, key) => {
						return (
							<SelectValueItem
								key={key} 
								disabled={!canWithdraw}
								active={valueSelected === value}
								onClick={() => canWithdraw ? handleSelectValue(value) : ''}
							>
								<span>R${value}</span>
							</SelectValueItem>
						)
					})
				}
			</SelectValue>
			<FormOfPayment>
				<HeaderTitle>
					<TitleArea>
						<h3>Formas de retirada</h3>
					</TitleArea>
					<ShowHistoryArea>
						<span onClick={() => Router.push('minha-conta/retiradas')}>ver retiradas</span>
					</ShowHistoryArea>
				</HeaderTitle>
				<Button
					hoverColor={'rgba(0, 150, 218, .212)'}
					hoverBorderColor={'rgba(0, 150, 218, .312)'}
					disabled={!canWithdrawSelectedValue}
					onClick={(e) => canWithdraw ? PaypalWithdraw(e) : ''}
				>
					<RiPaypalFill size={18} />
					<span>Paypal</span>
				</Button>
				<Button
					hoverColor={'rgba(48, 182, 168, .212)'}
					hoverBorderColor={'rgba(48, 182, 168, .312)'}
					disabled={true}
					comingSoon={true}
				>
					<PixIcon src={'/assets/icons/pix_icon.png'} alt='pix icon' />
					<span>Pix</span>
				</Button>
			</FormOfPayment>
			<ClaimRuleAlert redAlert={!canWithdraw}>
				<RiAlertLine size={16} />
				<span>É necessário ter pelo menos <strong>R${MINIMAL_VALUE}</strong> para efetuar a retirada.</span>
			</ClaimRuleAlert>
		</Div>
	);
}

export default WithdrawClaimReward;
