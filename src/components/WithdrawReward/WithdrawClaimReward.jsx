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

const WithdrawClaimReward = ({
	me,
	rewardValue
}) => {
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
