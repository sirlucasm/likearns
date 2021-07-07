import {
	Div,
	PointsShow,
	Points,
	Separator,
	RewardValue
} from '../../styles/components/WithdrawReward';
import { Tooltip } from '@material-ui/core';
import {
	calculateEarns,
} from '../../utils';
// icons
import {
	RiCopperCoinLine,
} from 'react-icons/ri';

const WithdrawReward = ({
	me,
	rewardValue
}) => {
	return (
		<Div>
			<Tooltip title={`1250 EC's = R$ ${calculateEarns(1250)}`}>
				<PointsShow>
					<Points>
						<RiCopperCoinLine />
						<h3>{me.points}</h3>
					</Points>
					<Separator />
					<RewardValue>
						<span>R$</span>
						<h3>{rewardValue}</h3>
					</RewardValue>
				</PointsShow>
			</Tooltip>
		</Div>
	);
}

export default WithdrawReward;
