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
		width: 400px;
		zoom: .88;
	}
	@media screen and (max-width: 320px) {
		zoom: .68;
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
