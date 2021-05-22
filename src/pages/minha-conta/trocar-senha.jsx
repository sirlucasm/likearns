import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// imports
import { FormButton } from '../../components/Styleds';
import SimpleInput from '../../components/SimpleInput';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import UserService from '../../services/UserService';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import Image from 'next/image';
import {
	redirectAuthenticityCustomUrl,
} from '../../utils/auth';

// styles
import styles from '../../styles/pages/entrar_criar-conta.module.css';

// icons
import {
	FiLock
} from 'react-icons/fi';

function ResetPassword() {
	const router = useRouter();
	const { tk: token } = router.query;
	const [showPass, setShowPass] = useState(false);
	const [canSubmitForm, setCanSubmitForm] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleShowPassword = () => setShowPass(!showPass);

	const { register, handleSubmit, watch } = useForm();
	const onSubmit = (data) => {
		setIsLoading(true);
		data.token = token;
		UserService.resetPassword(data)
			.then(() => Swal.fire({
				position: 'top-end',
				icon: 'success',
				text: 'A senha foi alterada com sucesso.',
				showConfirmButton: false,
				timer: 2500,
			})
				.then(() => {
					router.replace('/entrar');
				})
			).catch(error => {
				setIsLoading(false);
				Swal.fire({
					position: 'top-end',
					icon: 'error',
					text: error?.data?.message,
					showConfirmButton: false,
					timer: 2500,
				});
			});
	};

	const canSubmit = () => {
		if (!watch('password')) {
			setCanSubmitForm(false);
		} else setCanSubmitForm(true);
	}

	useEffect(() => {
		canSubmit();
	}, [watch('password')])

	return (
		<div className={styles["content"]}>
			<NextSeo
				title="Trocar senha"
			/>
			<div className="row justify-content-center">
				<form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className={styles["content-form"]}>
					<div className={styles['logo-img']}>
						<a href="/">
							<Image src="/assets/logo/likearns_logo_red_heart.png" layout="responsive" width={152} height={30} alt="Logo Likearns" />
						</a>
					</div>
					<SimpleInput
						type={showPass ? 'text' : 'password'}
						name="password"
						placeholder="Sua senha"
						icon={
							<FiLock color={'#505050'} />
						}
						iconPosition="right"
						forwardRef={register({ required: true })}
						required
					/>
					<div className="row justify-content-end">
						<span onClick={handleShowPassword} className="show-pass-btn">{showPass ? 'ocultar' : 'mostrar'} senha</span>
					</div>
					<div className="mt-4">
						<FormButton type="submit" style={{ width: '100%' }} disabled={!canSubmitForm} value="Salvar" />
					</div>
					<div className="mt-3 row justify-content-center">
						<Link href="/"><a className={styles["back-btn"]}>Voltar</a></Link>
					</div>
				</form>
			</div>
		</div>
	);
}

export default ResetPassword;

export async function getServerSideProps({ req }) {
	const token = req.cookies.session_token;
	let isAuthenticated;
	if (token) isAuthenticated = await UserService.authenticated(token);

	if (isAuthenticated) return redirectAuthenticityCustomUrl('/inicio');

	return {
		props: {}
	};
}
