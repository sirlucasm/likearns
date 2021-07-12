// imports
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Tooltip } from '@material-ui/core';
import Swal from 'sweetalert2';
import {
	dailyRewardDateVerify
} from '../../utils';

// style
import {
	DailyRewardArea,
	TitleArea,
	Title,
	Reward,
	Points,
	DetailReward,
	ClaimButton,
	ClaimButtonDisabled,
	RewardLine,
	DailyRewardClaimed
} from '../../styles/components/DailyReward';

// icons
import {
	RiCopperCoinLine,
	RiCheckFill,
	RiCloseLine
} from 'react-icons/ri';

// services
import UserService from '../../services/UserService';

export default function DailyReward({ me }) {
	const router = useRouter();
	const [formatedTime, setFormatedTime] = useState(null);

	const claimReward = (reward, points) => {
		UserService.claimReward({ reward, points })
			.then(() => Swal.fire({
				position: 'top-end',
				icon: 'success',
				text: `Você resgatou a recompensa e ganhou ${points} EC's`,
				showConfirmButton: false,
				timer: 2500,
			})
				.then(() => {
					router.replace('/ganhar-earnscoins');
				})
			).catch(err => console.log(err));
	}

	const formatTime = async (hours, minutes) => {
		if (hours || minutes) {
			setFormatedTime(`${hours ? hours : 0}h${minutes < 10 ? '0'+minutes.toString() : minutes}m`)
		} else {
			setFormatedTime(null);
			if (me.reward_daily) {
				await UserService.resetReward({ reward: 'reward_daily' })
			}
		}
	}

	useEffect(() => {
		const { hours, minutes } = dailyRewardDateVerify(me.reward_daily);
		formatTime(hours, minutes);
	}, []);

	return (
		<DailyRewardArea>
			<TitleArea>
				<Title>Resgatar recompensa</Title>
			</TitleArea>
			<RewardLine>
				<Reward>
					<DetailReward>
						<Tooltip title="Receba 250 EC's diariamente">
							<span>Diária</span>
						</Tooltip>
					</DetailReward>
					<Points>
						{
							me.reward_daily || formatedTime ?
							<span style={{ marginTop: 4 }}>{formatedTime}</span>
							:
							<>
								<RiCopperCoinLine size={18} />
								<h3 style={{ margin: '5px 0 0 3px', }}>250</h3>
							</>
						}
					</Points>
					<div style={{ marginTop: 9 }}>
						{
							me.reward_daily || formatedTime ?
								<ClaimButtonDisabled disabled><RiCheckFill /></ClaimButtonDisabled>
								:
								<ClaimButton onClick={() => claimReward('reward_daily', 250)}>Resgatar</ClaimButton>
						}
					</div>
				</Reward>

				<Reward>
					<DetailReward>
						<Tooltip title="Receba 875 EC's de presente ao convidar 1 amigo">
							<span>1 convidados</span>
						</Tooltip>
					</DetailReward>
					<Points>
						<RiCopperCoinLine size={18} />
						<h3 style={{ margin: '5px 0 0 3px', }}>875</h3>
					</Points>
					<div style={{ marginTop: 9 }}>
						{
							me.reward_level1 ?
								<ClaimButtonDisabled disabled><RiCheckFill /></ClaimButtonDisabled>
								:
								me.invited_friends >= 1 ?
									<ClaimButton onClick={() => claimReward('reward_level1', 875)}>Resgatar</ClaimButton>
									:
									<ClaimButtonDisabled avaiableToClaim={true} disabled><RiCloseLine /></ClaimButtonDisabled>
						}
					</div>
				</Reward>

				<Reward>
					<DetailReward>
						<Tooltip title="Receba 1875 EC's de presente ao convidar 5 amigos">
							<span>5 convidados</span>
						</Tooltip>
					</DetailReward>
					<Points>
						<RiCopperCoinLine size={18} />
						<h3 style={{ margin: '5px 0 0 3px', }}>1875</h3>
					</Points>
					<div style={{ marginTop: 9 }}>
						{
							me.reward_level5 ?
								<ClaimButtonDisabled disabled><RiCheckFill /></ClaimButtonDisabled>
								:
								me.invited_friends >= 5 ?
									<ClaimButton onClick={() => claimReward('reward_level5', 1875)}>Resgatar</ClaimButton>
									:
									<ClaimButtonDisabled avaiableToClaim={true} disabled><RiCloseLine /></ClaimButtonDisabled>
						}
					</div>
				</Reward>

				<Reward>
					<DetailReward>
						<Tooltip title="Receba 3125 EC's de presente ao convidar 10 amigos">
							<span>10 convidados</span>
						</Tooltip>
					</DetailReward>
					<Points>
						<RiCopperCoinLine size={18} />
						<h3 style={{ margin: '5px 0 0 3px', }}>3125</h3>
					</Points>
					<div style={{ marginTop: 9 }}>
						{
							me.reward_level10 ?
								<ClaimButtonDisabled disabled><RiCheckFill /></ClaimButtonDisabled>
								:
								me.invited_friends >= 10 ?
									<ClaimButton onClick={() => claimReward('reward_level10', 3125)}>Resgatar</ClaimButton>
									:
									<ClaimButtonDisabled avaiableToClaim={true} disabled><RiCloseLine /></ClaimButtonDisabled>
						}
					</div>
				</Reward>

				<Reward>
					<DetailReward>
						<Tooltip title="Receba 6250 EC's de presente ao convidar 50 amigos">
							<span>50 convidados</span>
						</Tooltip>
					</DetailReward>
					<Points>
						<RiCopperCoinLine size={18} />
						<h3 style={{ margin: '5px 0 0 3px', }}>6250</h3>
					</Points>
					<div style={{ marginTop: 9 }}>
						{
							me.reward_level50 ?
								<ClaimButtonDisabled disabled><RiCheckFill /></ClaimButtonDisabled>
								:
								me.invited_friends >= 50 ?
									<ClaimButton onClick={() => claimReward('reward_level50', 6250)}>Resgatar</ClaimButton>
									:
									<ClaimButtonDisabled avaiableToClaim={true} disabled><RiCloseLine /></ClaimButtonDisabled>
						}
					</div>
				</Reward>

				<Reward>
					<DetailReward>
						<Tooltip title="Receba 12500 EC's de presente ao convidar 100 amigos">
							<span>100 convidados</span>
						</Tooltip>
					</DetailReward>
					<Points>
						<RiCopperCoinLine size={18} />
						<h3 style={{ margin: '5px 0 0 3px', }}>12500</h3>
					</Points>
					<div style={{ marginTop: 9 }}>
						{
							me.reward_level100 ?
								<ClaimButtonDisabled disabled><RiCheckFill /></ClaimButtonDisabled>
								:
								me.invited_friends >= 100 ?
									<ClaimButton onClick={() => claimReward('reward_level100', 12500)}>Resgatar</ClaimButton>
									:
									<ClaimButtonDisabled avaiableToClaim={true} disabled><RiCloseLine /></ClaimButtonDisabled>
						}
					</div>
				</Reward>
			</RewardLine>
		</DailyRewardArea>
	);
}
