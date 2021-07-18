import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// imports
import Drawer from '../../components/Drawer';
import StartNav from '../../components/StartNav';
import { NextSeo } from 'next-seo';
import {
	redirectAuthenticityCustomUrl
} from '../../utils/auth';
import styles from '../../styles/pages/retirar.module.css';
import {
	Div,
	ModerationElement,
	ModerationItemTitle,
	HoverAnimation
} from '../../styles/pages/app/Moderacao';

// services
import UserService from '../../services/UserService';

// icons
import {
	MdPayment
} from 'react-icons/md';

const Withdraw = ({
	me,
}) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [titleLoading, setTitleLoading] = useState('Carregando...');
	const [openMenu, setOpenMenu] = useState(false);

	return (
		<div>
			<NextSeo
				title='Moderação'
			/>
			<StartNav setOpenMenu={setOpenMenu} profile={me} />
			<Drawer
				open={openMenu}
				toggleDrawer={setOpenMenu}
				profile={me}
			/>

			<div className={styles.areaTitle}>
				<h3 className={styles.areaTitleText}>Bem vindo a Moderação</h3>
			</div>

			<Div className="container">
				<ModerationElement>
					<MdPayment size={22} />
					<ModerationItemTitle>
						<span>Retiradas</span>
					</ModerationItemTitle>
				</ModerationElement>
			</Div>
		</div>
	)
}

export default Withdraw;

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
