import styled from 'styled-components';

export const Dropdown = styled.div`
	background: #fff;
	position: absolute;
	width: 220px;
	transform: translateX(-50%);
	top: 40px;
	display: flex;
	flex-direction: column;
	align-items: center;
	border-radius: 5px;
`;

export const Title = styled.div`
	height: 40px;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	border-bottom: 1px solid #e6e6e6;
	& h3 {
		font-size: 16px;
		font-weight: 700;
		color: #757e89;
		margin-top: 5px;
	}
`;
export const Notification = styled.div`
	display: flex;
	flex-direction: column;
	padding: 9px 14px;
`;

export const UserImage = styled.div`
	border-radius: 50%;
	& img {
		width: 29px;
		border-radius: 50%;
	}
`;

export const Content = styled.div`
	display: flex;
	flex-direction: row;
	border-bottom: 1px solid #e6e6e6;
	align-items: center;
`;
