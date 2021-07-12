import {
	Div,
	PixIcon,
	TitleArea,
	FormOfPayment,
	Button,
	ClaimRuleAlert
} from '../../styles/components/WithdrawClaimReward';
import Swal from 'sweetalert2';
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
	const value = parseFloat(rewardValue);

	const PaypalWithdraw = async (event) => {
		const params = {
			withdraw_type: 1,
			email_address: me.paypal_email,
			value
		};
		if (!event.target.attributes['disabled']) {
			// botão habilitado
			if ((params.value > MINIMAL_VALUE)) {
				setIsLoading(true);
				UserWithdrawService.createPaypalOrder(params)
					.then(() => Swal.fire({
						position: 'top-end',
						icon: 'success',
						text: 'Solicitação de retirada criada com sucesso.',
						showConfirmButton: false,
						timer: 2500,
					})
						.then(() => setIsLoading(false))
					)
			}
		}
	}

	return (
		<Div className="container">
			<FormOfPayment>
				<TitleArea>
					<h3>Formas de retirada</h3>
				</TitleArea>
				<Button
					hoverColor={'rgba(0, 150, 218, .212)'}
					hoverBorderColor={'rgba(0, 150, 218, .312)'}
					disabled={!(value > MINIMAL_VALUE)}
					onClick={PaypalWithdraw}
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
			<ClaimRuleAlert redAlert={!(value > MINIMAL_VALUE)}>
				<RiAlertLine size={16} />
				<span>É necessário ter pelo menos <strong>R${MINIMAL_VALUE}</strong> para efetuar a retirada.</span>
			</ClaimRuleAlert>
		</Div>
	);
}

export default WithdrawClaimReward;
