import styled from 'styled-components';

export const Div = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const TableArea = styled.div`
	margin-top: 30px;
	width: 700px;

	@media screen and (max-width: 620px) {
		width: 427px;
		zoom: .84;
	}
	@media screen and (max-width: 320px) {
		zoom: .62;
	}
`;

export const NoWithdraw = styled.div`
	text-align: center;
	color:#333333;
	margin-top: 60px;
	div h3 {
		font-size: 16px;
		font-style: italic;
		margin-top: 20px;
	}
`;

export const StatusCaptionArea = styled.div`
	display: flex;
	justify-content: space-evenly;
`;

export const StatusCaption = styled.div`
	display: flex;
	align-items: center;
	@media screen and (max-width: 620px) {
		display: flex;
		flex-direction: column;
	}
	div {
		background-color: ${props => props.bgColor};
		border-radius: 50%;
		width: 18px;
		height: 18px;
		margin-right: 4px;
	}
	span { font-size: 14px;	}
	margin-bottom: 40px;
`;

export const ActionArea = styled.div`
	display: flex;

	@media screen and (max-width: 620px) {
		flex-direction: column;
	}
`;

export const ActionButton = styled.div`
	cursor: pointer;
	width: 30px;
	height: 30px;
	text-align: center;
	border-radius: 50%;

	&:hover {
		background: #7e7e7e;
	}
`;
