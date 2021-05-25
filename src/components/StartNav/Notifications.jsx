import { useEffect } from 'react';
import Cookie from 'js-cookie';

// imports
import {
	Dropdown,
	Title,
	Notification,
	UserImage,
	Content,
	UsernameText,
	Message,
	BottomButton
} from '../../styles/components/Notifications';
import {
	convertNotificationTypeString,
	convertSocialMediaToString
} from '../../utils';
import Image from 'next/image';

function Notifications({
	open,
	readNotifications,
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
									<UserImage haveProfilePic={notification.user.social_profile_picture !== null}>
										<Image
											src={notification.user.social_profile_picture || '/assets/icons/no_user.png'}
											height={26}
											width={26}
										/>
									</UserImage>
									<Message>
										{
											notification.type == 1 ?
												<span><UsernameText>{notification.user.username}</UsernameText> está te {convertNotificationTypeString(notification.type)} no {convertSocialMediaToString(notification.social_media)}.</span>
												:
												<span><UsernameText>{notification.user.username}</UsernameText> {convertNotificationTypeString(notification.type)} sua postagem no {convertSocialMediaToString(notification.social_media)}.</span>
										}
									</Message>
								</Content>
							);
						})
						:
						<div>
							Nenhuma notificação para exibir
						</div>
				}
			</Notification>
			<BottomButton>
				<div onClick={readNotifications}>
					<span>Limpar</span>
				</div>
			</BottomButton>
		</Dropdown>
	)
	else return (<></>);
}

export default Notifications;
