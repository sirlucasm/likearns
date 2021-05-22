//imports
import { CustomButton } from '../Styleds';
import styles from '../../styles/components/SocialMediaButtons.module.css';

// services
import TwitterService from '../../services/TwitterService';

// icons
import {
	RiInstagramLine,
	RiTwitterLine,
	RiShieldUserFill
} from 'react-icons/ri';

export default function SocialMediaButtons({ userTwitter }) {
	const conectWithInstagram = () => {
		window.location.href = `https://api.instagram.com/oauth/authorize?
		client_id=241693594216500
		&redirect_uri=https://likearns.com.br/ganhar-earnscoins
		&response_type=code
		&scope=user_profile,user_media`;
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

	return (
		<>
			<div>
				<CustomButton onClick={conectWithInstagram}>
					<RiInstagramLine size={24} />
					<span> Conectar com Instagram</span>
				</CustomButton>
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
		</>
	);
}
