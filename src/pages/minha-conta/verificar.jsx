import { useState, useEffect } from 'react'

// imports
import { CustomButton } from '../../components/Styleds';
import Swal from 'sweetalert2';
import {
	saveTimeClicked,
	getTimeStored,
	formatTime
} from '../../utils';
import {
	redirectAuthenticityCustomUrl,
} from '../../utils/auth';
import { NextSeo } from 'next-seo';

// services
import UserService from '../../services/UserService';

// styles
import styles from '../../styles/pages/minha-conta/verificar.module.css';

function VerifyEmail({ me }) {
	const WAIT_TIME = 120;
	const [counting, setCounting] = useState(false);
	const [formatedTime, setFormatedTime] = useState();
	const [timeClickedStored, setTimeClickedStored] = useState();

	const sendEmailVerification = () => {
		setCounting(true);
		saveTimeClicked(WAIT_TIME);
		UserService.sendEmailVerification()
			.then(() => Swal.fire({
				position: 'top-end',
				icon: 'success',
				text: 'Email de confirmação enviado com sucesso',
				showConfirmButton: false,
				timer: 2500,
			}));
	}

	useEffect(() => {
		setTimeClickedStored(getTimeStored());
	}, [])

	useEffect(() => {
		let seconds = getTimeStored();	
		let timer;
		if (counting || timeClickedStored) {
			timer = setInterval(() => {
				seconds--;
				setFormatedTime(formatTime(seconds));
				saveTimeClicked(seconds);
				if (seconds <= 0) {
					clearInterval(timer);
					localStorage.removeItem('@likearns/time_email_verification_send');
					setCounting(false);
					setTimeClickedStored(null);
				}
			}, 1000);
		}
	}, [counting, timeClickedStored]);

	return (
		<div>
			<NextSeo
				title="Verificar Email da conta"
			/>
			<div className={styles.verifyEmailRedArea}>
				<div>
					<h3 className={styles.verifyEmailRedAreaTitle}>Bem vindo, {me?.name.split(' ')[0]}!</h3>
				</div>
			</div>
			<div className={styles.verifyEmailWhiteArea}>
				<div className={styles.verifyEmailWhiteContent}>
					<div style={{ textAlign: 'center', marginTop: 40 }}>
						<img className={styles.verifyEmailImage} src={'/assets/icons/verify-email.png'} alt="Verify Email" />
					</div>
					<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', }}>
						<h4 style={{ margin: '12px 12px' }}>Você ainda não verificou sua conta</h4>
						<div className={styles.verifyEmailText1}>
							<span>Estamos felizes que tenha cadastrado sua conta, e estamos prontos para te passar o melhor de nosso sistema.</span>
						</div>
						<div className={styles.verifyEmailText2}>
							<span>Clique no botão "Enviar Link de Verificação" e receba em seu e-mail </span>
						</div>
					</div>
					<div style={{ textAlign: 'center', margin: '40px 0' }}>
						{
							(counting || timeClickedStored) && formatedTime !== null ?
								formatedTime
								:
								<CustomButton onClick={sendEmailVerification}>Enviar Link de Verificação</CustomButton>
						}
					</div>
				</div>
			</div>
		</div>
	);
}

export default VerifyEmail;

export async function getServerSideProps({ req }) {
	const token = req.cookies.session_token;
	if (!token) return redirectAuthenticityCustomUrl('/entrar');

	const me = await UserService.currentUser(token);
	if (me.verified_email) return redirectAuthenticityCustomUrl('/inicio');

	return {
		props: {
			me,
		}
	};
}
