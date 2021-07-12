import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// imports
import Drawer from '../../components/Drawer';
import StartNav from '../../components/StartNav';
import { NextSeo } from 'next-seo';
import {
	redirectAuthenticityCustomUrl
} from '../../utils/auth';
import WithdrawsTable from '../../components/WithdrawReward/WithdrawTable';
import styles from '../../styles/pages/retirar.module.css';

// services
import UserService from '../../services/UserService';
import UserWithdrawService from '../../services/UserWithdrawService';

// icons

const Withdraw = ({
	me,
}) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [titleLoading, setTitleLoading] = useState('Carregando...');
	const [openMenu, setOpenMenu] = useState(false);
	const [withdraws, setWithdraws] = useState();
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(7);

	const fetchMyWithdraws = async () => {
		const myWithdraws = await UserWithdrawService.index({ page, limit });
		setWithdraws(myWithdraws);
	}

	useEffect(() => {
		fetchMyWithdraws();
	}, [page]);

	return (
		<div>
			<NextSeo
				title='Minhas Retiradas'
			/>
			<StartNav setOpenMenu={setOpenMenu} profile={me} />
			<Drawer
				open={openMenu}
				toggleDrawer={setOpenMenu}
				profile={me}
			/>

			<div className={styles.areaTitle}>
				<h3 className={styles.areaTitleText}>Minhas Retiradas</h3>
			</div>

			<WithdrawsTable
				withdraws={withdraws}
				page={page}
				limit={limit}
				setPage={setPage}
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
