import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// imports
import Drawer from '../components/Drawer';
import StartNav from '../components/StartNav';
import { CustomButton } from '../components/Styleds';
import WithdrawReward from '../components/WithdrawReward';
import WithdrawClaimReward from '../components/WithdrawReward/WithdrawClaimReward';
import ProgressLoader from '../components/ProgressLoading';
import Swal from 'sweetalert2';
import {
	calculateEarns,
} from '../utils';
import { NextSeo } from 'next-seo';
import {
	redirectAuthenticityCustomUrl
} from '../utils/auth';
import styles from '../styles/pages/retirar.module.css';

// services
import UserService from '../services/UserService';

// icons

const Withdraw = ({
	me,
}) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [titleLoading, setTitleLoading] = useState('Carregando...');
	const [openMenu, setOpenMenu] = useState(false);
	const [rewardValue, setRewardValue] = useState(calculateEarns(me.points));

	return (
		<div>
			<NextSeo
				title='Retirar'
			/>
			<StartNav setOpenMenu={setOpenMenu} profile={me} />
			<Drawer
				open={openMenu}
				toggleDrawer={setOpenMenu}
				profile={me}
			/>

			<div className={styles.areaTitle}>
				<h3 className={styles.areaTitleText}>Retirar</h3>
			</div>

			<WithdrawReward
				me={me}
				rewardValue={rewardValue}
			/>

			<WithdrawClaimReward
				me={me}
				rewardValue={rewardValue}
			/>

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
