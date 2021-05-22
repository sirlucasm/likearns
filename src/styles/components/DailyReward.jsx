import styled from 'styled-components';

export const DailyRewardArea = styled.div`
	background: linear-gradient(180deg, rgba(219,219,219, .6) 0%, rgba(226,226,226,0.29343487394957986) 100%);
	cursor: default;
	user-select: none;
	color: #3a3a3a;
	margin-top: 98px;
	margin-bottom: 50px;
	padding: 0 10px;
`;

export const TitleArea = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	padding: 14px 0;
`;
export const Title = styled.h2`
	font-size: 22px;
`;

export const RewardLine = styled.div`
	display: flex;
	flex-direction: row;
	overflow-x: auto;
	padding: 22px 8px 29px 8px;
`;
export const Reward = styled.div`
	background: linear-gradient(0deg, rgba(255,80,80,1) 0%, rgba(255,80,80,0.6662640056022409) 100%);
	border-radius: 7px;
	color: #f9f9f9;
	width: 184px;
	padding: 12px 9px;
	margin: 6px 8px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

export const DetailReward = styled.div`
	display: flex;
	flex-direction: row;
	align-self: flex-start;
	margin-left: 12px;
`;

export const Points = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	& h3 {
		font-size: 29px;
	}
`;

export const ClaimButton = styled.button`
	border: none;
	background: none;
	color: #f9f9f9;
	font-size: 14px;
	&:hover {
		color: #dedede;
	}
`;

export const ClaimButtonDisabled = styled.button`
	border: none;
	color: ${props => props.avaiableToClaim ? '#3c3c3c' : '#333'};
	font-size: 14px;
	background: ${props => props.avaiableToClaim ? '#da4f4f' : '#fff'};
	border-radius: 50%;
	padding: 3px 6px;
`;

export const DailyRewardClaimed = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;
