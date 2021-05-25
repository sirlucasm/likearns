import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookie from 'js-cookie';

// imports
import {
	Button,
	Badge
} from '@material-ui/core';
import styled from 'styled-components';
import Notifications from './Notifications';

// services
import UserNotificationService from '../../services/UserNotificationService';

// icons
import {
	FiMenu
} from 'react-icons/fi';
import {
	RiCopperCoinLine,
	RiNotification3Line
} from 'react-icons/ri';

const customStyles = {
	root: {
		width: '100%',
		backgroundColor: '#e8e8e8',
		height: 50,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
};

const Points = styled.div`
	cursor: pointer;
	border-radius: 3px;
	padding: 6px 9px;
	transition: .2s;
	margin-right: 12px;
	&:hover {
		background-color: #dedede;
	}
`;

const ButtonsArea = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	position: relative;
`;

const Notification = styled(Points)`
	margin-right: 6px;
`;

export default function StartNav({ setOpenMenu, profile }) {
	const router = useRouter();
	const [openNotification, setOpenNotificaion] = useState(false);
	const [usersNotifications, setUsersNotifications] = useState([]);

	const handleLinkURL = (url) => {
		router.push(url);
	};

	const fetchNotifications = async () => {
		const token = Cookie.get('session_token');
		const notifications = await UserNotificationService.getUserNotifications(token);
		setUsersNotifications(notifications);
	}

	const readNotifications = () => {
		let notificationsList = [];
		if (usersNotifications.length > 0) {
			usersNotifications.map(notification => notificationsList.push(notification.id));
			UserNotificationService.setNotificationReaded({ notificationsList })
				.then(() => router.reload())
		}
	}

	useEffect(() => {
		fetchNotifications();
	}, []);

	return (
		<div style={customStyles.root}>
			<div>
				<Button onClick={() => setOpenMenu(true)}><FiMenu style={{ fontSize: 24 }} /></Button>
			</div>
			<ButtonsArea>
				<Notification onClick={() => setOpenNotificaion(!openNotification)}>
					<Badge color="error" badgeContent={usersNotifications.length} max={99}>
						<RiNotification3Line size={20} />
					</Badge>
				</Notification>
				<Notifications
					open={openNotification}
					me={profile}
					usersNotifications={usersNotifications}
					readNotifications={readNotifications}
				/>
				<Points onClick={() => handleLinkURL('/ganhar-earnscoins')}>
					<RiCopperCoinLine size={20} />
					<span style={{ margin: '7px 0 0 3px', position: 'relative', top: 1, userSelect: 'none' }}>{profile?.points}</span>
				</Points>
			</ButtonsArea>
		</div>
	);
}
