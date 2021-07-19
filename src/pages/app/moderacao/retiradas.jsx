import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// imports
import Drawer from '../../../components/Drawer';
import StartNav from '../../../components/StartNav';
import RetiradasTable from '../../../components/ModeratorTables/Retiradas';
import {
	SearchArea
} from '../../../styles/pages/app/Moderacao';
import { NextSeo } from 'next-seo';
import {
	redirectAuthenticityCustomUrl
} from '../../../utils/auth';
import SimpleInput from '../../../components/SimpleInput';
import styles from '../../../styles/pages/retirar.module.css';

// services
import UserService from '../../../services/UserService';
import ModeratorService from '../../../services/ModeratorService';

// icons
import {
	RiSearchLine
} from 'react-icons/ri';

const Withdraw = ({
	me,
}) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [titleLoading, setTitleLoading] = useState('Carregando...');
	const [openMenu, setOpenMenu] = useState(false);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(7);

	const [withdraws, setWithdraws] = useState();

	const fetchMyWithdraws = async (search) => {
		const allWithdraws = await ModeratorService.withdrawList({ page, limit, search });
		setWithdraws(allWithdraws);
	}

	useEffect(() => {
		fetchMyWithdraws();
	}, [page]);
	
	return (
		<div>
			<NextSeo
				title='Moderação - Retiradas'
				nofollow={true}
				noindex={true}
			/>
			<StartNav setOpenMenu={setOpenMenu} profile={me} />
			<Drawer
				open={openMenu}
				toggleDrawer={setOpenMenu}
				profile={me}
			/>

			<div className={styles.areaTitle}>
				<h3 className={styles.areaTitleText}>Moderação | Retiradas</h3>
			</div>

			<div className="container">
				<SearchArea>
					<div>
						<SimpleInput
							type="search"
							name="search"
							placeholder="Buscar por username"
							icon={
								<RiSearchLine color={'#505050'} />
							}
							iconPosition="right"
							onChange={(e) => fetchMyWithdraws(e.target.value)}
						/>
					</div>
				</SearchArea>

				<RetiradasTable
					withdraws={withdraws}
					page={page}
					limit={limit}
					setPage={setPage}
				/>
			</div>
		</div>
	)
}

export default Withdraw;

export async function getServerSideProps({ req }) {
	const token = req.cookies.session_token;
	if (!token) return redirectAuthenticityCustomUrl('/entrar');

	const me = await UserService.currentUser(token);
	if (!me.verified_email) return redirectAuthenticityCustomUrl('/minha-conta/verificar');
	if (!me.user_type === 'moderator') return redirectAuthenticityCustomUrl('/inicio');

	return {
		props: {
			me,
		}
	};
}
