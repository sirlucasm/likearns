import styled from 'styled-components';

export const Div = styled.div`
	display: flex;
	width: 645px;

	@media screen and (max-width: 620px) {
		width: 314px;
		flex-direction: column;
	}

	@media screen and (max-width: 320px) { width: 256px; }
`;

export const ModerationElement = styled.div`
	background: #f9f9f9;
	color: #3d3d3d;
	padding: 6px 14px;
	border-radius: 6px;
	display: flex;
	align-items: center;
	cursor: pointer;

	&:hover {
		background: #dadada;
		transition: .2s;
	}
`;

export const ModerationItemTitle = styled.div`
	span {
		font-size: 16px;
		font-weight: 500;
		user-select: none;
		margin-left: 8px;
	}
`;

export const SearchArea = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
	flex-direction: column;

	div {
		width: 244px;
	}
`;
