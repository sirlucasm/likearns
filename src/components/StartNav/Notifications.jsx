import { useEffect } from 'react';
import Cookie from 'js-cookie';

// imports
import {
	Dropdown,
	Title,
	Notification,
	UserImage,
	Content
} from '../../styles/components/Notifications';
import {
	convertNotificationTypeString,
	convertSocialMediaToString
} from '../../utils';
import Image from 'next/image';

function Notifications({
	open,
	me,
	usersNotifications
}) {

	if (open) return (
		<Dropdown>
			<Title>
				<h3>Notificações</h3>
			</Title>
			<Notification>
				{
					usersNotifications.length > 0 ?
						usersNotifications.map((notification, index) => {
							return (
								<Content key={index}>
									<UserImage>
										<Image src={notification.user.social_profile_picture || '/assets/icons/no_user.png'} height={26} width={26} />
									</UserImage>
									<div>
										{
											notification.type == 1 ?
												<span>{notification.user.username} está te <span>{convertNotificationTypeString(notification.type)}</span> no {convertSocialMediaToString(notification.social_media)}.</span>
												:
												<span>{notification.user.username} <span>{convertNotificationTypeString(notification.type)}</span> sua postagem no {convertSocialMediaToString(notification.social_media)}.</span>
										}
									</div>
								</Content>
							);
						})
						:
						<div>
							Nenhuma notificação para exibir
						</div>
				}
			</Notification>
		</Dropdown>
	)
	else return (<></>);
}

export default Notifications;
