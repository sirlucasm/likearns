import styled from 'styled-components';

export const Dropdown = styled.div`
	background: #fff;
	position: absolute;
	width: 275px;
	transform: translateX(-50%);
	top: 40px;
	display: flex;
	flex-direction: column;
	align-items: center;
	border-radius: 5px;
	box-shadow: 2px 3px 8px 3px rgba(0, 0, 0, .153);
	z-index: 99;
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
	padding: 9px 17px;
`;

export const UserImage = styled.div`
	border-radius: 50%;
	& img {
		width: ${props => props.haveProfilePic ? '29px' : '24px'};
		border-radius: 50%;
	}
	margin-top: 5px;
`;

export const Content = styled.div`
	display: flex;
	flex-direction: row;
	border-bottom: 1px solid #f1f1f1;
	align-items: center;
	cursor: default;
	user-select: none;
	&:last-child {
		border-bottom: none;
	}
`;

export const UsernameText = styled.span`
	font-weight: 700;
`;

export const Message = styled.span`
	font-size: 12.45px;
	color:#4c4a4a;
	margin-left: 7px;
`;

export const BottomButton = styled.div`
	display: flex;
	justify-content: center;
	margin: 7px 0;
	& span {
		cursor: pointer;
		color: #2170d2;
		font-size: 13px;
	}
	& span:hover {
		color: #104688;
	}
`;
