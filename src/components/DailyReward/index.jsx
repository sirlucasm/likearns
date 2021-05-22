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
						<Tooltip title="Receba 100 EC's diariamente">
							<span>Diária</span>
						</Tooltip>
					</DetailReward>
					<Points>
						<RiCopperCoinLine size={18} />
						<h3 style={{ margin: '5px 0 0 3px', }}>100</h3>
					</Points>
					<div style={{ marginTop: 9 }}>
						{
							me.reward_daily || formatedTime ?
								<DailyRewardClaimed>
									<ClaimButtonDisabled disabled><RiCheckFill /></ClaimButtonDisabled>
									<span style={{ marginTop: 4 }}>{formatedTime}</span>
								</DailyRewardClaimed>
								:
								<ClaimButton onClick={() => claimReward('reward_daily', 100)}>Resgatar</ClaimButton>
						}
					</div>
				</Reward>

				<Reward>
					<DetailReward>
						<Tooltip title="Receba 150 EC's de presente ao convidar 1 amigo">
							<span>1 convidados</span>
						</Tooltip>
					</DetailReward>
					<Points>
						<RiCopperCoinLine size={18} />
						<h3 style={{ margin: '5px 0 0 3px', }}>150</h3>
					</Points>
					<div style={{ marginTop: 9 }}>
						{
							me.reward_level1 ?
								<ClaimButtonDisabled disabled><RiCheckFill /></ClaimButtonDisabled>
								:
								me.invited_friends >= 1 ?
									<ClaimButton onClick={() => claimReward('reward_level1', 150)}>Resgatar</ClaimButton>
									:
									<ClaimButtonDisabled avaiableToClaim={true} disabled><RiCloseLine /></ClaimButtonDisabled>
						}
					</div>
				</Reward>

				<Reward>
					<DetailReward>
						<Tooltip title="Receba 300 EC's de presente ao convidar 5 amigos">
							<span>5 convidados</span>
						</Tooltip>
					</DetailReward>
					<Points>
						<RiCopperCoinLine size={18} />
						<h3 style={{ margin: '5px 0 0 3px', }}>300</h3>
					</Points>
					<div style={{ marginTop: 9 }}>
						{
							me.reward_level5 ?
								<ClaimButtonDisabled disabled><RiCheckFill /></ClaimButtonDisabled>
								:
								me.invited_friends >= 5 ?
									<ClaimButton onClick={() => claimReward('reward_level5', 300)}>Resgatar</ClaimButton>
									:
									<ClaimButtonDisabled avaiableToClaim={true} disabled><RiCloseLine /></ClaimButtonDisabled>
						}
					</div>
				</Reward>

				<Reward>
					<DetailReward>
						<Tooltip title="Receba 500 EC's de presente ao convidar 10 amigos">
							<span>10 convidados</span>
						</Tooltip>
					</DetailReward>
					<Points>
						<RiCopperCoinLine size={18} />
						<h3 style={{ margin: '5px 0 0 3px', }}>500</h3>
					</Points>
					<div style={{ marginTop: 9 }}>
						{
							me.reward_level10 ?
								<ClaimButtonDisabled disabled><RiCheckFill /></ClaimButtonDisabled>
								:
								me.invited_friends >= 10 ?
									<ClaimButton onClick={() => claimReward('reward_level10', 500)}>Resgatar</ClaimButton>
									:
									<ClaimButtonDisabled avaiableToClaim={true} disabled><RiCloseLine /></ClaimButtonDisabled>
						}
					</div>
				</Reward>

				<Reward>
					<DetailReward>
						<Tooltip title="Receba 700 EC's de presente ao convidar 50 amigos">
							<span>50 convidados</span>
						</Tooltip>
					</DetailReward>
					<Points>
						<RiCopperCoinLine size={18} />
						<h3 style={{ margin: '5px 0 0 3px', }}>700</h3>
					</Points>
					<div style={{ marginTop: 9 }}>
						{
							me.reward_level50 ?
								<ClaimButtonDisabled disabled><RiCheckFill /></ClaimButtonDisabled>
								:
								me.invited_friends >= 50 ?
									<ClaimButton onClick={() => claimReward('reward_level50', 700)}>Resgatar</ClaimButton>
									:
									<ClaimButtonDisabled avaiableToClaim={true} disabled><RiCloseLine /></ClaimButtonDisabled>
						}
					</div>
				</Reward>

				<Reward>
					<DetailReward>
						<Tooltip title="Receba 1000 EC's de presente ao convidar 100 amigos">
							<span>100 convidados</span>
						</Tooltip>
					</DetailReward>
					<Points>
						<RiCopperCoinLine size={18} />
						<h3 style={{ margin: '5px 0 0 3px', }}>1000</h3>
					</Points>
					<div style={{ marginTop: 9 }}>
						{
							me.reward_level100 ?
								<ClaimButtonDisabled disabled><RiCheckFill /></ClaimButtonDisabled>
								:
								me.invited_friends >= 100 ?
									<ClaimButton onClick={() => claimReward('reward_level100', 1000)}>Resgatar</ClaimButton>
									:
									<ClaimButtonDisabled avaiableToClaim={true} disabled><RiCloseLine /></ClaimButtonDisabled>
						}
					</div>
				</Reward>
			</RewardLine>
		</DailyRewardArea>
	);
}
