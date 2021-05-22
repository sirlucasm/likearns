import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// imports
import Drawer from '../components/Drawer';
import StartNav from '../components/StartNav';
import SimpleInput from '../components/SimpleInput';
import SimpleSelect from '../components/SimpleSelect';
import UserService from '../services/UserService';
import GainFollowerService from '../services/GainFollowerService';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { FormButton } from '../components/Styleds';
import { calculateFollowersLostPoints } from '../utils';
import styles from '../styles/pages/ganhar-seguidores.module.css';
import { NextSeo } from 'next-seo';
import {
	redirectAuthenticityCustomUrl
} from '../utils/auth';

// icons
import {
	RiCopperCoinLine,
} from 'react-icons/ri';


const GainFollowers = ({ me }) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);
	const [openMenu, setOpenMenu] = useState(false);
	const [canSubmitForm, setCanSubmitForm] = useState(false);
	const [lostPoints, setLostPoints] = useState(0);
	const [insufficientPoints, setInsufficientPoints] = useState(false);
	const [isNotIntegerNumber, setIsNotIntegerNumber] = useState(false);
	const [canWriteFollowers, setCanWriteFollowers] = useState(true);
	const { register, handleSubmit, watch } = useForm();

	const selectItems = [
		{ value: 'Instagram' },
		{ value: 'Twitter' },
	];

	const checkErrors = () => {
		if (insufficientPoints || isNotIntegerNumber) return true;
		return false;
	}

	const canSubmit = () => {
		if ((!watch('social_media') || parseFloat(watch('social_media')) === 0) || (!watch('followers') || parseFloat(watch('followers')) === 0) || !watch('username') || checkErrors()) {
			setCanSubmitForm(false);
		} else setCanSubmitForm(true);
	}

	const numberVerification = (event) => {
		if (event.target.value.length === 3 && event.keyCode !== 8 && event.keyCode != 9)
			setCanWriteFollowers(false);
		else setCanWriteFollowers(true);
	}

	const onSubmit = (data) => {
		data.lost_points = lostPoints;
		GainFollowerService.publish(data)
			.then(() => Swal.fire({
				position: 'top-end',
				icon: 'success',
				text: 'Publicado com sucesso :). Agora as pessoas podem ver seu perfil',
				showConfirmButton: false,
				timer: 2500,
			})
				.then(() => {
					setIsLoading(true);
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

	const checkIsNotIntegerNumber = () => {
		if (Number.isInteger(parseFloat(watch('followers')))) setIsNotIntegerNumber(false);
		else setIsNotIntegerNumber(true);
	}

	const calcPointsSufficient = () => {
		if (lostPoints > me.points) setInsufficientPoints(true);
		else setInsufficientPoints(false);
	}

	useEffect(() => {
		setLostPoints(calculateFollowersLostPoints(watch('followers')));
		checkIsNotIntegerNumber();
	}, [watch('social_media'), watch('followers'), watch('post_url')]);

	useEffect(() => {
		canSubmit();
	});

	return (
		<div>
			<NextSeo
				title='Ganhar Seguidores'
			/>
			<StartNav setOpenMenu={setOpenMenu} profile={me} />
			<Drawer
				open={openMenu}
				toggleDrawer={setOpenMenu}
				profile={me}
			/>
			<div className={styles.areaTitle}>
				<h3 className={styles.areaTitleText}>Ganhar seguidores</h3>
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
						name="followers"
						placeholder="Quantidade de seguidores"
						forwardRef={register({ required: true })}
						required
						onKeyDown={numberVerification}
						onChange={() => calcPointsSufficient()}
						disabled={!canWriteFollowers}
					/>
					{
						!canWriteFollowers && (
							<div className="row justify-content-end">
								<span onClick={() => setCanWriteFollowers(true)} className="show-pass-btn">editar seguidores</span>
							</div>
						)
					}
					<SimpleInput
						type="text"
						name="username"
						placeholder="Username na rede social"
						forwardRef={register({ required: true })}
						maxLength={30}
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

export default GainFollowers;

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
