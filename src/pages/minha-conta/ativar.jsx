import { useEffect } from 'react';
import { useRouter } from 'next/router';

// imports
import Swal from 'sweetalert2';
import {
	redirectAuthenticityCustomUrl,
} from '../../utils/auth';
import { NextSeo } from 'next-seo';

// styles
import styles from '../../styles/pages/minha-conta/verificar.module.css';

// services
import UserService from '../../services/UserService';

function ActivateAccount() {
	const router = useRouter();
	const { tk: token } = router.query;

	const activateAccount = () => {
		const params = {};
		params.token = token;
		UserService.activateAccount(params)
			.then(() => setTimeout(() => {
				router.replace('/inicio');
			}, 3000)
			).catch(error => {
				Swal.fire({
					position: 'top-end',
					icon: 'error',
					text: error?.data.message,
					showConfirmButton: false,
					timer: 2500,
				});
			});
	}

	useEffect(() => {
		if (!token) router.replace('/inicio');
		activateAccount();
	}, []);

	return (
		<div>
			<NextSeo
				title="Ativando a conta"
			/>
			<div className={styles.verifyEmailRedArea}>

			</div>
			<div className={styles.verifyEmailWhiteArea}>
				<div className={styles.verifyEmailWhiteContent}>
					<div style={{ textAlign: 'center', marginTop: 40 }}>
						<img className={styles.verifyEmailImage} src={'/assets/icons/success-icon.png'} alt="Verify Email" />
					</div>
					<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 40 }}>
						<h4 style={{ margin: '12px 12px' }}>Conta verificada com sucesso!</h4>
						<div className={styles.verifyEmailText1}>
							<span>Em alguns segundos você será redirecionado...</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ActivateAccount;

export async function getServerSideProps({ req }) {
	const token = req.cookies.session_token;
	if (!token) return redirectAuthenticityCustomUrl('/entrar');

	const isAuthenticated = await UserService.authenticated(token);
	if (isAuthenticated) return redirectAuthenticityCustomUrl('/inicio');

	return {
		props: {}
	};
}
