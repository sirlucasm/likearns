import { useState } from 'react';
//imports
import { CustomButton } from '../Styleds';
import styles from '../../styles/components/SocialMediaButtons.module.css';

// services
import TwitterService from '../../services/TwitterService';
import InstagramService from '../../services/InstagramService';

// icons
import {
	RiInstagramLine,
	RiTwitterLine,
	RiShieldUserFill
} from 'react-icons/ri';
import InstagramLogin from '../InstagramLogin';

export default function SocialMediaButtons({ userTwitter, userInstagram }) {
	const [isOpen, setIsOpen] = useState(false);

	const conectWithInstagram = () => {
		setIsOpen(true);
	}

	const conectWithTwitter = () => {
		TwitterService.auth()
			.then(res => window.location.href = res.authUrl)
			.catch(err => console.log(err));
	}

	const logoutTwitterSocial = () => {
		TwitterService.logoutUser()
			.then(() => window.location.reload())
	}

	const logoutInstagramSocial = () => {
		InstagramService.logoutUser()
			.then(() => window.location.reload())
	}

	return (
		<>
			<div>

				{
					userInstagram ?
						<div className="ml-3">
							<span>
								<RiShieldUserFill color="#4caf50" size={24} className="mr-1" />
								Conectado no Instagram como <span style={{ fontWeight: 'bold' }}>{userInstagram.userName}</span>,
								<span onClick={logoutInstagramSocial} className={styles.logoutSocialMedia}> sair</span>
							</span>
						</div>
						:
						<CustomButton onClick={conectWithInstagram}>
							<RiInstagramLine size={24} />
							<span> Conectar com Instagram</span>
						</CustomButton>
				}
			</div>
			<div>
				{
					userTwitter ?
						<div className="ml-3">
							<span>
								<RiShieldUserFill color="#4caf50" size={24} className="mr-1" />
								Conectado no Twitter como <span style={{ fontWeight: 'bold' }}>{userTwitter.userName}</span>,
								<span onClick={logoutTwitterSocial} className={styles.logoutSocialMedia}> sair</span>
							</span>
						</div>
						:
						<CustomButton onClick={conectWithTwitter}>
							<RiTwitterLine size={24} />
							<span> Conectar com Twitter</span>
						</CustomButton>
				}
			</div>
			<InstagramLogin
				isOpen={isOpen}
				closeModal={() => setIsOpen(false)}
			/>
		</>
	);
}
