import styled from 'styled-components';

export const Div = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const PointsShow = styled.div`
	background: linear-gradient(180deg, rgba(219,219,219, .6) 0%, rgba(226,226,226,0.29343487394957986) 100%);
	cursor: default;
	user-select: none;
	color: #3a3a3a;
	margin: 20px 0;
	padding: 0 10px;
	width: 444px;
	height: 94px;
	border: 1px solid #e4e4e4;

	display: flex;
	justify-content: space-around;

	@media screen and (max-width: 620px) {
		width: 256px;
	}
`;

export const Points = styled.div`
	display: flex;
	align-items: center;
	color: #545454;
	font-size: 24px;
	h3 {
		margin-top: 5px;
		margin-left: 3px;
	}
`;

export const RewardValue = styled(Points)`
	span {
		font-size: 22px;
	}
`;

export const Separator = styled.div`
	border-right: 1px dotted #c9c9c9;
`;
