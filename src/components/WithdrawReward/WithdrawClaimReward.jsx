import {
	Div,
	PixIcon
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
			<div>
				<div>
					<RiPaypalFill />
					<span>Paypal</span>
				</div>
				<div>
					<PixIcon src={'/assets/icons/pix_icon.png'} alt='pix icon' />
					<span>Pix</span>
				</div>
			</div>
		</Div>
	);
}

export default WithdrawClaimReward;
