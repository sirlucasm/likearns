import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// imports
import Drawer from '../components/Drawer';
import StartNav from '../components/StartNav';
import SimpleInput from '../components/SimpleInput';
import AuthPassword from '../components/AuthPassword';
import ProgressLoader from '../components/ProgressLoading';
import {
	CustomIconButton,
	CustomButton,
} from '../components/Styleds';
import {
	getCurrentYear,
	getCurrentMonth,
	getCurrentDay,
	convertDateBR,
	convertSocialMediaToString
} from '../utils';
import Swal from 'sweetalert2';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import SocialMediaButtons from '../components/SocialMediaButtons';
import { Tooltip } from '@material-ui/core';
import styles from '../styles/pages/opcoes.module.css';

// services
import TwitterService from '../services/TwitterService';
import UserService from '../services/UserService';
import InstagramService from '../services/InstagramService';

// icons
import {
	FiUser,
	FiCalendar
} from 'react-icons/fi';
import {
	RiPencilLine,
	RiCheckFill,
	RiCloseFill,
	RiDeleteBin6Fill,
	RiPaypalLine
} from 'react-icons/ri';


const Options = ({ me }) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);
	const [titleLoading, setTitleLoading] = useState('Carregando...');
	const [openMenu, setOpenMenu] = useState(false);
	const [inputDisabled, setInputDisabled] = useState({
		name: true,
		username: true,
		birth_date: true,
		paypal_email: true,
		pix_key: true
	});
	const [changes, setChanges] = useState();
	const [userTwitter, setUserTwitter] = useState();
	const [userInstagram, setUserInstagram] = useState();
	const [isOpen, setIsOpen] = useState(false);
	const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);

	const valideMaxDate = () => `${getCurrentYear() - 18}-${getCurrentMonth()}-${getCurrentDay()}`;
	const valideMinDate = () => `${getCurrentYear() - 80}-${getCurrentMonth()}-${getCurrentDay()}`;

	const handleEditValue = (input) => {
		if (
			inputDisabled[input] === inputDisabled.name &&
			inputDisabled[input] === inputDisabled.username &&
			inputDisabled[input] === inputDisabled.birth_date &&
			inputDisabled[input] === inputDisabled.paypal_email &&
			inputDisabled[input] === inputDisabled.pix_key
		) {
			setChanges({ [input]: me[input] });
			setInputDisabled(prev => { return { ...prev, [input]: false } });
		}
	}

	const handleCancelEditValue = (input) => {
		setInputDisabled(prev => { return { ...prev, [input]: true } });
	}

	const saveChanges = () => {
		UserService.updateAccount(changes)
			.then(() => Swal.fire({
				position: 'top-end',
				icon: 'success',
				text: 'Edição realizada com sucesso',
				showConfirmButton: false,
				timer: 2500,
			})
				.then(() => {
					setIsLoading(false);
					window.location.reload();
				})
			)
			.catch(error => Swal.fire({
				position: 'top-end',
				icon: 'error',
				text: error?.data.message,
				showConfirmButton: false,
				timer: 2500,
			}));
	}

	const fetchCurrentUserTwitter = () => {
		setUserTwitter(TwitterService.getCurrentUser());
	}

	const fetchCurrentUserInstagram = () => {
		setUserInstagram(InstagramService.getCurrentUser());
	}

	const deleteAccount = () => {
		Swal.fire({
			title: 'Certeza disso?',
			text: 'Você não poderá criar outra conta se excluir essa.',
			icon: 'warning',
			showCancelButton: true,
			cancelButtonText: 'Não',
			cancelButtonColor: '#3085d6',
			confirmButtonColor: '#d33',
			confirmButtonText: 'Sim, tenho certeza!'
		})
			.then((result) => {
				if (result.isConfirmed) setIsOpen(true)
			})
	}

	const importProfilePic = (socialMedia) => {
		const socialName = convertSocialMediaToString(socialMedia);
		setTitleLoading('Importando foto...');
		setIsLoading(true);
		if (socialMedia === 1) {
			if (userInstagram) {
				UserService.importProfilePic({ instagramToken: userInstagram.token, socialMedia })
					.then(() => Swal.fire({
						position: 'top-end',
						icon: 'success',
						text: `Você importou a foto de perfil do ${socialName}`,
						showConfirmButton: false,
						timer: 2500,
					})
						.then(() => {
							setIsLoading(false);
							router.replace('/opcoes');
						})
					)
			} else {
				setIsLoading(false);
				Swal.fire({
					position: 'top-end',
					icon: 'error',
					text: `Para importar a foto do ${socialName} para seu perfil, você deve fazer conectar a sua conta.`,
					showConfirmButton: false,
					timer: 2500,
				})
			}
		}
		if (socialMedia === 2) {
			if (userTwitter) {
				UserService.importProfilePic({ username: userTwitter.userName, socialMedia })
					.then(() => Swal.fire({
						position: 'top-end',
						icon: 'success',
						text: `Você importou a foto de perfil do ${socialName}`,
						showConfirmButton: false,
						timer: 2500,
					})
						.then(() => {
							setIsLoading(false);
							router.replace('/opcoes');
						})
					)
			} else {
				setIsLoading(false);
				Swal.fire({
					position: 'top-end',
					icon: 'error',
					text: `Para importar a foto do ${socialName} para seu perfil, você deve fazer conectar a sua conta.`,
					showConfirmButton: false,
					timer: 2500,
				})
			}
		}
	}

	const handleAuthPassswordModal = () => {
		setIsOpen(!isOpen);
	}

	useEffect(() => {
		fetchCurrentUserTwitter();
		fetchCurrentUserInstagram();
		if (me) setIsLoading(false);
	}, []);

	useEffect(() => {
		if (
			changes?.name === me?.name ||
			changes?.username === me?.username ||
			changes?.birth_date === me?.birth_date
		)
			setSaveButtonDisabled(true);
		else setSaveButtonDisabled(false);
	}, [changes]);

	return (
		<div>
			<NextSeo
				title='Opções da conta'
			/>
			<StartNav setOpenMenu={setOpenMenu} profile={me} />
			<Drawer
				open={openMenu}
				toggleDrawer={setOpenMenu}
				profile={me}
			/>

			<div className="container">
				<div className={styles.areaTitle}>
					<h3 className={styles.areaTitleText}>Conectar redes sociais</h3>
				</div>
				<div className="d-flex flex-column align-items-center">
					<SocialMediaButtons
						userTwitter={userTwitter}
						userInstagram={userInstagram}
					/>
				</div>
			</div>

			<div className={styles.areaTitle}>
				<h3 className={styles.areaTitleText}>Opções da conta</h3>
			</div>

			<div className="container">
				<div className="d-flex flex-column align-items-center">
					<div className={styles.importProfilePic}>
						<div>
							<Image
								className={styles.profilePic}
								width={124}
								height={128}
								src={me.social_profile_picture || '/assets/icons/no_user.png'}
								alt="Foto de perfil"
							/>
						</div>
						<div style={{ marginBottom: 20, marginTop: 14 }}>
							<div>
								<Tooltip title="Iremos buscar pelo seu nome de usuário no nosso Sistema" arrow>
									<CustomButton onClick={() => importProfilePic(1)}>Importar foto do Instagram</CustomButton>
								</Tooltip>
							</div>
							<div>
								<CustomButton onClick={() => importProfilePic(2)}>Importar foto do Twitter</CustomButton>
							</div>
						</div>
					</div>
					<div className={styles.areaInput}>
						<div className={styles.inputField}>
							<SimpleInput
								type="text"
								placeholder="Seu nome"
								icon={
									<FiUser color={'#505050'} />
								}
								iconPosition="right"
								required
								onChange={(e) => setChanges({ name: e.target.value })}
								defaultValue={me && me.name}
								disabled={inputDisabled.name}
							/>
						</div>
						<div className="ml-2">
							{
								inputDisabled.name ?
									<CustomIconButton rounded onClick={() => handleEditValue('name')}><RiPencilLine /></CustomIconButton>
									:
									(
										<>
											<CustomIconButton rounded disabled={saveButtonDisabled} onClick={() => saveChanges()}><RiCheckFill /></CustomIconButton>
											<CustomIconButton rounded onClick={() => handleCancelEditValue('name')}><RiCloseFill /></CustomIconButton>
										</>
									)
							}
						</div>
					</div>
					<div className={styles.areaInput}>
						<div className={styles.inputField}>
							<SimpleInput
								type="text"
								placeholder="Usuário"
								icon={
									<FiUser color={'#505050'} />
								}
								iconPosition="right"
								required
								onChange={(e) => setChanges({ username: e.target.value })}
								defaultValue={me && me.username}
								disabled={inputDisabled.username}
							/>
						</div>
						<div className="ml-2">
							{
								inputDisabled.username ?
									<CustomIconButton rounded onClick={() => handleEditValue('username')}><RiPencilLine /></CustomIconButton>
									:
									(
										<>
											<CustomIconButton rounded disabled={saveButtonDisabled} onClick={() => saveChanges()}><RiCheckFill /></CustomIconButton>
											<CustomIconButton rounded onClick={() => handleCancelEditValue('username')}><RiCloseFill /></CustomIconButton>
										</>
									)
							}
						</div>
					</div>
					<div className={styles.areaInput}>
						<div className={styles.inputField}>
							<SimpleInput
								type="date"
								max={valideMaxDate()}
								min={valideMinDate()}
								icon={
									<FiCalendar color={'#505050'} />
								}
								iconPosition="right"
								required
								onChange={(e) => setChanges({ birth_date: e.target.value })}
								defaultValue={me && convertDateBR(me.birth_date)}
								disabled={inputDisabled.birth_date}
							/>
						</div>
						<div className="ml-2">
							{
								inputDisabled.birth_date ?
									<CustomIconButton rounded onClick={() => handleEditValue('birth_date')}><RiPencilLine /></CustomIconButton>
									:
									(
										<>
											<CustomIconButton rounded disabled={saveButtonDisabled} onClick={() => saveChanges()}><RiCheckFill /></CustomIconButton>
											<CustomIconButton rounded onClick={() => handleCancelEditValue('birth_date')}><RiCloseFill /></CustomIconButton>
										</>
									)
							}
						</div>
					</div>
					<div className={styles.areaInput}>
						<div className={styles.inputField}>
							<SimpleInput
								type="text"
								placeholder="Email Paypal"
								icon={
									<RiPaypalLine color={'#505050'} />
								}
								iconPosition="right"
								required
								onChange={(e) => setChanges({ paypal_email: e.target.value })}
								defaultValue={me && me.paypal_email}
								disabled={inputDisabled.paypal_email}
							/>
						</div>
						<div className="ml-2">
							{
								inputDisabled.paypal_email ?
									<CustomIconButton rounded onClick={() => handleEditValue('paypal_email')}><RiPencilLine /></CustomIconButton>
									:
									(
										<>
											<CustomIconButton rounded disabled={saveButtonDisabled} onClick={() => saveChanges()}><RiCheckFill /></CustomIconButton>
											<CustomIconButton rounded onClick={() => handleCancelEditValue('paypal_email')}><RiCloseFill /></CustomIconButton>
										</>
									)
							}
						</div>
					</div>
					<div className={styles.areaInput}>
						<div className={styles.inputField}>
							<SimpleInput
								type="text"
								placeholder="Chave Pix"
								icon={
									<img
										src={'/assets/icons/pix_icon.png'}
										style={{
											width: 17,
											height: 17,
											pointerEvents: 'none',
											userSelect: 'none'
										}}
									/>
								}
								iconPosition="right"
								required
								onChange={(e) => setChanges({ pix_key: e.target.value })}
								defaultValue={me && me.pix_key}
								disabled={inputDisabled.pix_key}
							/>
						</div>
						<div className="ml-2">
							{
								inputDisabled.pix_key ?
									<CustomIconButton rounded onClick={() => handleEditValue('pix_key')}><RiPencilLine /></CustomIconButton>
									:
									(
										<>
											<CustomIconButton rounded disabled={saveButtonDisabled} onClick={() => saveChanges()}><RiCheckFill /></CustomIconButton>
											<CustomIconButton rounded onClick={() => handleCancelEditValue('pix_key')}><RiCloseFill /></CustomIconButton>
										</>
									)
							}
						</div>
					</div>

					<div className={styles.areaInput, 'mt-5'}>
						<div>
							<CustomIconButton
								onClick={deleteAccount}
								primary
								color="#fff"
							>
								<RiDeleteBin6Fill /> Excluir minha conta
							</CustomIconButton>
						</div>
					</div>
				</div>
			</div>
			<AuthPassword
				isOpen={isOpen}
				closeModal={handleAuthPassswordModal}
			/>
			<ProgressLoader
				enabled={isLoading}
				title={titleLoading}
				colorText="#fff"
			/>
			{/*   ANÚNCIOS   */}
			{/* flutuante desktop */}
			{/* flutuante mobile */}
		</div>
	);
}

export default Options;

export async function getServerSideProps({ req }) {
	const token = req.cookies.session_token;
	if (!token) return redirectAuthenticityCustomUrl('/entrar');

	const me = await UserService.currentUser(token);
	if (!me.verified_email) return redirectAuthenticityCustomUrl('/minha-conta/verificar');

	return {
		props: {
			me,
		}
	};
}
