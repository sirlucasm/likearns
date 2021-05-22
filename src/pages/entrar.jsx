import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// imports
import Link from 'next/link';
import Image from 'next/image';
import { FormButton } from '../components/Styleds';
import SimpleInput from '../components/SimpleInput';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import UserService from '../services/UserService';
import ForgetPassword from '../components/ForgetPassword';
import { NextSeo } from 'next-seo';
import { EntrarPageSeo } from '../configs/pages-seo.config';
import {
	redirectAuthenticityCustomUrl,
} from '../utils/auth';

// icons
import {
	FiUser,
	FiLock
} from 'react-icons/fi';

import styles from '../styles/pages/entrar_criar-conta.module.css';

function Login() {
	const router = useRouter();
	const [showPass, setShowPass] = useState(false);
	const [canSubmitForm, setCanSubmitForm] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const handleShowPassword = () => setShowPass(!showPass);

	const { register, handleSubmit, watch } = useForm();
	const onSubmit = (data) => {
		setIsLoading(true);
		UserService.login(data)
			.then(() => {
				setIsLoading(false);
				router.replace('/inicio');
			}).catch(error => {
				setIsLoading(false);
				Swal.fire({
					position: 'top-end',
					icon: 'error',
					text: error?.data.message,
					showConfirmButton: false,
					timer: 2500,
				});
			});
	};

	const canSubmit = () => {
		if (!watch('username') || !watch('password')) {
			setCanSubmitForm(false);
		} else setCanSubmitForm(true);
	}

	const handleForgetPasswordModal = () => {
		setIsOpen(!isOpen);
	}

	useEffect(() => {
		canSubmit();
	}, [watch('username'), watch('password')])

	return (
		<div className={styles["content"]}>
			<NextSeo {...EntrarPageSeo} />
			<div className="row justify-content-center">
				<form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className={styles["content-form"]}>
					<div className={styles['logo-img']}>
						<a href="/">
							<Image src="/assets/logo/likearns_logo_red_heart.png" layout="responsive" width={152} height={30} alt="Logo Likearns" />
						</a>
					</div>
					<SimpleInput
						type="text"
						name="username"
						placeholder="Usuário"
						icon={
							<FiUser color={'#505050'} />
						}
						iconPosition="right"
						forwardRef={register({ required: true })}
						required
					/>
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
					<div className="row justify-content-between">
						<span onClick={handleForgetPasswordModal} className={styles["show-pass-btn"]}>Esqueci minha senha</span>
						<span onClick={handleShowPassword} className={styles["show-pass-btn"]}>{showPass ? 'ocultar' : 'mostrar'} senha</span>
					</div>
					<div className="mt-4">
						<FormButton type="submit" style={{ width: '100%' }} disabled={!canSubmitForm} value="Entrar" />
					</div>
					<div className="mt-3 row justify-content-center">
						<Link href="/"><a className={styles["back-btn"]}>Voltar</a></Link>
					</div>
				</form>
			</div>
			<ForgetPassword
				isOpen={isOpen}
				closeModal={handleForgetPasswordModal}
			/>
		</div>
	);
}

export default Login;

export async function getServerSideProps({ req }) {
	const token = req.cookies.session_token;

	if (token)	return redirectAuthenticityCustomUrl('/inicio');

	return {
		props: {}
	};
}
