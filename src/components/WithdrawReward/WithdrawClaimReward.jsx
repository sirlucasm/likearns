import {
	Div,
	PixIcon,
	TitleArea,
	FormOfPayment,
	Button
} from '../../styles/components/WithdrawClaimReward';
import { Tooltip } from '@material-ui/core';
import {
	calculateEarns,
} from '../../utils';
// icons
import {
	RiCopperCoinLine,
	RiPaypalFill
} from 'react-icons/ri';

// services
import UserWithdrawService from '../../services/UserWithdrawService';

const WithdrawClaimReward = ({
	me,
	rewardValue
}) => {
	const PaypalWithdraw = async () => {
		setIsLoading(true);
		const params = {
			withdraw_type: 1,
			email_address: me.paypal_email,
			value: rewardValue,
		};
		UserWithdrawService.createPaypalOrder(params)
			.then(() => Swal.fire({
				position: 'top-end',
				icon: 'success',
				text: 'Solicitação de retirada criada com sucesso.',
				showConfirmButton: false,
				timer: 2500,
			}))
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
					disabled
					comingSoon
				>
					<RiPaypalFill size={18} />
					<span>Paypal</span>
				</Button>
				<Button
					hoverColor={'rgba(48, 182, 168, .212)'}
					hoverBorderColor={'rgba(48, 182, 168, .312)'}
					disabled
					comingSoon
				>
					<PixIcon src={'/assets/icons/pix_icon.png'} alt='pix icon' />
					<span>Pix</span>
				</Button>
			</FormOfPayment>
		</Div>
	);
}

export default WithdrawClaimReward;
