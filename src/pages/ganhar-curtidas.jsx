import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// imports
import Drawer from '../components/Drawer';
import StartNav from '../components/StartNav';
import SimpleInput from '../components/SimpleInput';
import SimpleSelect from '../components/SimpleSelect';
import UserService from '../services/UserService';
import GainLikeService from '../services/GainLikeService';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { FormButton } from '../components/Styleds';
import { calculateLikesLostPoints, verifyUserAgent } from '../utils';
import { redirectAuthenticityCustomUrl } from '../utils/auth';
import styles from '../styles/pages/ganhar-seguidores.module.css';
import { NextSeo } from 'next-seo';

// icons
import {
	RiCopperCoinLine,
} from 'react-icons/ri';


const GainLikes = ({ me }) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);
	const [openMenu, setOpenMenu] = useState(false);
	const [canSubmitForm, setCanSubmitForm] = useState(false);
	const [lostPoints, setLostPoints] = useState(0);
	const [insufficientPoints, setInsufficientPoints] = useState(false);
	const [postUrlError, setPostUrlError] = useState(false);
	const [isNotIntegerNumber, setIsNotIntegerNumber] = useState(false);
	const [canWriteLikes, setCanWriteLikes] = useState(true);
	const { register, handleSubmit, watch } = useForm();

	const selectItems = [
		{ value: 'Instagram' },
		{ value: 'Twitter'	},
	];

	const checkErrors = () => {
		if (insufficientPoints || postUrlError || isNotIntegerNumber) return true;
		return false;
	}

	const canSubmit = () => {
		if ((!watch('social_media') || parseFloat(watch('social_media')) === 0) || (!watch('likes') || parseFloat(watch('likes')) === 0) || !watch('post_url') || checkErrors()) {
			setCanSubmitForm(false);
		} else setCanSubmitForm(true);
	}

	const numberVerification = (event) => {
		if (event.target.value.length === 3 && event.keyCode !== 8 && event.keyCode != 9)
			setCanWriteLikes(false);
		else setCanWriteLikes(true);
	}

	const onSubmit = (data) => {
		data.lost_points = lostPoints;
		GainLikeService.publish(data)
			.then(() => Swal.fire({
				position: 'top-end',
				icon: 'success',
				text: 'Publicado com sucesso :). Agora as pessoas podem ver seu perfil',
				showConfirmButton: false,
				timer: 2500,
			})
				.then(() => {
					setIsLoading(false);
					router.replace('/ganhar-earnscoins');
				})
			).catch(error => {
				setIsLoading(false);
				Swal.fire({
					position: 'top-end',
					icon: 'error',
					text: error?.data?.message,
					showConfirmButton: true,
					timer: 2500,
				});
			});
	};

	const checkPostUrl = (url) => {
		if (
			url.includes(`https://www.instagram.com/`) ||
			url.includes(`https://instagram.com/`) ||
			url.includes(`https://www.twitter.com/`) ||
			url.includes(`https://twitter.com/`)
		) setPostUrlError(false);
		else setPostUrlError(true);
	}

	const checkIsNotIntegerNumber = () => {
		if (Number.isInteger(parseFloat(watch('likes')))) setIsNotIntegerNumber(false);
		else setIsNotIntegerNumber(true);
	}

	const calcPointsSufficient = () => {
		if (lostPoints > me?.points) setInsufficientPoints(true);
		else setInsufficientPoints(false);
	}

	useEffect(() => {
		checkPostUrl(watch('post_url'));
		setLostPoints(calculateLikesLostPoints(watch('likes')));
		checkIsNotIntegerNumber();
	}, [watch('social_media'), watch('likes'), watch('post_url')]);

	useEffect(() => {
		canSubmit();
	});

	return (
		<div>
			<NextSeo
				title='Ganhar Curtidas'
			/>
			<StartNav setOpenMenu={setOpenMenu} profile={me} />
			<Drawer
				open={openMenu}
				toggleDrawer={setOpenMenu}
				profile={me}
			/>
			<div className={styles.areaTitle}>
				<h3 className={styles.areaTitleText}>Ganhar curtidas</h3>
			</div>

			<form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className={styles.formArea}>
				<div className={styles.formContent}>
					<SimpleSelect
						name="social_media"
						placeholder="Selecione a rede social"
						items={selectItems}
						forwardRef={register({ required: true })}
					/>
					<SimpleInput
						type="number"
						name="likes"
						placeholder="Quantidade de curtidas"
						forwardRef={register({ required: true })}
						required
						onKeyDown={numberVerification}
						onChange={() => calcPointsSufficient()}
						disabled={!canWriteLikes}
					/>
					{
						!canWriteLikes && (
							<div className="row justify-content-end">
								<span onClick={() => setCanWriteLikes(true)} className="show-pass-btn">editar seguidores</span>
							</div>
						)
					}
					<SimpleInput
						type="text"
						name="post_url"
						placeholder="URL da postagem"
						forwardRef={register({ required: true })}
						required
					/>
					<div>
						<RiCopperCoinLine size={18} />
						<span style={{ margin: '7px 0 0 3px', position: 'relative', top: 1 }}>-{lostPoints}</span>
					</div>
					<div style={{ display: 'flex', flexDirection: 'column', marginTop: 10 }}>
						{
							insufficientPoints && <span style={{ color: '#c94040', fontSize: 13 }}>Pontos insuficientes</span>
						}
						{
							postUrlError && <span style={{ color: '#c94040', fontSize: 13 }}>URL de postagem inválida</span>
						}
						{
							isNotIntegerNumber && <span style={{ color: '#c94040', fontSize: 13 }}>O número de CURTIDAS deve ser inteiro</span>
						}
					</div>
					<div className="mt-4">
						<FormButton type="submit" style={{ width: '100%' }} disabled={!canSubmitForm} value="Publicar" />
					</div>
				</div>
			</form>
			{/*   ANÚNCIOS   */}
			{/* banner */}
		</div>
	);
}

export default GainLikes;

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
