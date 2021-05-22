import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// imports
import Link from 'next/link';
import Image from 'next/image';
import {
	Checkbox,
	FormControlLabel
} from '@material-ui/core';
import { FormButton } from '../components/Styleds';
import SimpleInput from '../components/SimpleInput';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import UserService from '../services/UserService';
import {
	getCurrentYear,
	getCurrentMonth,
	getCurrentDay
} from '../utils';

// icons
import {
	FiUser,
	FiMessageSquare,
	FiCalendar,
	FiLock
} from 'react-icons/fi';
import { NextSeo } from 'next-seo';
import { CriarContaPageSeo } from '../configs/pages-seo.config';

import styles from '../styles/pages/entrar_criar-conta.module.css';


function SignUp() {
	const router = useRouter();
	const { ref } = router.query;
	const [showPass, setShowPass] = useState(false);
	const [termsChecked, setTermsChecked] = useState(false);
	const [canSubmitForm, setCanSubmitForm] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const valideMaxDate = () => `${getCurrentYear() - 18}-${getCurrentMonth()}-${getCurrentDay()}`;
	const valideMinDate = () => `${getCurrentYear() - 80}-${getCurrentMonth()}-${getCurrentDay()}`;

	const handleShowPassword = () => setShowPass(!showPass);

	const { register, handleSubmit, watch } = useForm();
	const onSubmit = (data) => {
		if (ref) data.referral_code_applied = ref;
		setIsLoading(true);
		UserService.createUser(data)
			.then(() => Swal.fire({
				position: 'top-end',
				icon: 'success',
				text: 'Sua conta foi criada com sucesso',
				showConfirmButton: false,
				timer: 2500,
			})
				.then(() => {
					setIsLoading(true);
					router.replace('/inicio');
				})
			).catch(error => {
				setIsLoading(false);
				Swal.fire({
					position: 'top-end',
					icon: 'error',
					text: error?.data.message,
					showConfirmButton: true,
					timer: 2500,
				});
			});
	};

	const canSubmit = () => {
		if (!watch('name') || !watch('email') || !watch('birth_date') || !watch('password') || !watch('username') || !termsChecked) {
			setCanSubmitForm(false);
		} else setCanSubmitForm(true);
	}

	useEffect(() => {
		canSubmit();
	}, [watch('name'), watch('email'), watch('birth_date'), watch('password'), watch('username'), termsChecked])

	return (
		<div className={styles["content"]}>
			<NextSeo {...CriarContaPageSeo} />
			<div className="row justify-content-center">
				<form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className={styles["content-form"]}>
					<div className={styles['logo-img']}>
						<a href="/">
							<Image src="/assets/logo/likearns_logo_red_heart.png" layout="responsive" width={152} height={30} alt="Logo Likearns" />
						</a>
					</div>
					<SimpleInput
						type="text"
						name="name"
						placeholder="Seu nome"
						icon={
							<FiUser color={'#505050'} />
						}
						iconPosition="right"
						forwardRef={register({ required: true })}
						required
					/>
					<SimpleInput
						type="text"
						name="username"
						placeholder="Username"
						icon={
							<FiUser color={'#505050'} />
						}
						iconPosition="right"
						forwardRef={register({ required: true })}
						required
					/>
					<SimpleInput
						type="email"
						name="email"
						placeholder="Seu email"
						icon={
							<FiMessageSquare color={'#505050'} />
						}
						iconPosition="right"
						forwardRef={register({ required: true })}
						required
					/>
					<SimpleInput
						type="date"
						name="birth_date"
						max={valideMaxDate()}
						min={valideMinDate()}
						icon={
							<FiCalendar color={'#505050'} />
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
					<div className="row justify-content-end">
						<span onClick={handleShowPassword} className={styles["show-pass-btn"]}>{showPass ? 'ocultar' : 'mostrar'} senha</span>
					</div>
					<div className={`${styles["content-form-items"]} ${styles["content-form-terms-check"]}`}>
						<FormControlLabel
							control={
								<Checkbox
									checked={termsChecked}
									onChange={() => setTermsChecked(!termsChecked)}
									inputProps={{ 'aria-label': 'primary checkbox' }}
									label="Aceito os TERMOS DE UTILIZAÇÃO"
									required
								/>
							}
							label="Aceito os TERMOS DE UTILIZAÇÃO"
						/>
					</div>
					<div className="mt-4">
						<FormButton type="submit" style={{ width: '100%' }} disabled={!canSubmitForm} value="Criar conta" />
					</div>
					<div className="mt-3 row justify-content-center">
						<Link href="/"><a className={styles["back-btn"]}>Voltar</a></Link>
					</div>
				</form>
			</div>
		</div>
	);
}

export default SignUp;

export async function getServerSideProps({ req }) {
	const token = req.cookies.session_token;

	if (token)	return redirectAuthenticityCustomUrl('/inicio');

	return {
		props: {}
	};
}
