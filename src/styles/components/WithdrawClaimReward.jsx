import styled from 'styled-components';

export const Div = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const PixIcon = styled.img`
	width: 17px;
	height: 17px;
	pointer-events: none;
`;

export const TitleArea = styled.div`
	h3 {
		font-size: 16px;
		color: #333;
	}
`;

export const FormOfPayment = styled.div`
	width: 444px;
	margin-top: 50px;
	@media screen and (max-width: 620px) {
		width: 256px;
	}
`;

export const Button = styled.div`
	display: flex;
	align-items: center;
	color:#4c4c4c;
	background: #f9f9f9;
	margin: 10px auto;
	width: 100%;
	padding: 6px 20px;
	cursor: pointer;
	user-select: none;
	border-radius: 4px;
	border: 1px solid transparent;
	position: relative;
	
	${props => props.disabled && `
		background: #e0e0e0;
		cursor: default;
		&:hover {
			background: #e0e0e0 !important;
			border: 1px solid transparent !important;
		}
	`}
	${props => props.comingSoon && `
		&::after {
			content: '(em breve)';
			font-size: 14px;
			position: absolute;
			right: 15px;
		}
	`}

	&:hover {
		background: ${props => props.hoverColor};
		border: 1px solid ${props => props.hoverBorderColor};
	}
	span {
		font-size: 16px;
		font-weight: 400;
		font-style: italic;
		margin: auto 10px;
	}
`;

export const ClaimRuleAlert = styled.div`
	display: flex;
	align-items: center;
	color: ${props => props.redAlert ? '#b12323' : '#363636'};
	justify-content: flex-start;
	span {
		margin-left: 6px;
		font-size: 13px;
	}
`;
