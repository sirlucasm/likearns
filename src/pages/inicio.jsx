import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';

// imports
import Drawer from '../components/Drawer';
import UserService from '../services/UserService';
import ProgressLoader from '../components/ProgressLoading';
import StartNav from '../components/StartNav';
import SimpleInput from '../components/SimpleInput';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Bar } from 'react-chartjs-2';
import UserLikeService from '../services/UserLikeService';
import UserFollowerService from '../services/UserFollowerService';
import {
	topSharersBgColorChange,
	chartDataSet
} from '../utils';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import {
	redirectAuthenticityCustomUrl
} from '../utils/auth';

// icons
import {
	RiFileCopyLine,
	RiCopperCoinLine,
	RiUserSharedLine
} from 'react-icons/ri';

import styles from '../styles/pages/inicio.module.css';

function Start({
	me,
	usersLikes,
	usersFollowers,
	topSharers
}) {
	const router = useRouter();
	const referralCode = useRef();
	const chartResponsive = {};
	const [isLoading, setIsLoading] = useState(true);
	const [openMenu, setOpenMenu] = useState(false);

	const handleCopyReferralCode = () => {
		referralCode.current.select();
		referralCode.current.setSelectionRange(0, 99999);
		document.execCommand('copy');
	}

	useEffect(() => {
		if (me) setIsLoading(false);
	}, [])

	return (
		<div>
			<NextSeo
				title='Inicio'
				noindex={true}
			/>
			<StartNav setOpenMenu={setOpenMenu} profile={me} />
			<Drawer
				open={openMenu}
				toggleDrawer={setOpenMenu}
				profile={me}
			/>

			<div className={styles.middleContent}>
				<div></div>
				<div></div>
				<div className={styles.topSharersArea}>
					<div>
						<div className={styles.topSharersScrollTb}>
							<div className={styles.topSharersTitle}>
								<h4>Top Compartilhadores</h4>
							</div>
							<table className={styles.topSharersTable}>
								<thead>
									<tr>
										<th>Rank</th>
										<th>Username</th>
										<th>Shares</th>
									</tr>
								</thead>
								<tbody>
									{
										topSharers?.users.map((data, rows) => {
											const index = rows + 1;
											const delay = index * 100;
											const cursorPointer = { cursor: 'pointer', marginLeft: 7 };
											return (
												<tr key={index} style={topSharersBgColorChange(index)}>
													<td><strong>{index}.</strong></td>
													<td className={styles.topSharersData}>
														<Image
															style={cursorPointer}
															className={styles.topSharersPfpc}
															width={24}
															height={24}
															src={data.social_profile_picture || '/assets/icons/no_user.png'}
															alt="Foto de perfil"
														/>
														<span style={cursorPointer}> {data.username}</span>
													</td>
													<td><span>{data.invited_friends}</span></td>
												</tr>
											);
										})
									}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>

			<div className={styles.areaTitle}>
				<h3 className={styles.areaTitleText}>Estatísticas</h3>
			</div>
			<div className={styles.statisticsContent}>
				<div>
					<h5>Curtidas no Twitter</h5>
					<div className={styles.statistics}>
						<Bar
							data={chartDataSet('Curtidas', usersLikes)}
							width={400}
							height={200}
							options={{
								maintainAspectRatio: true,
								responsive: true,
								animation: {
									animateScale: true
								},
								scales: {
									y: {
										ticks: {
											stepSize: 1
										}
									}
								}
							}}
						/>
					</div>
				</div>
				<div className={styles.statisticsMarginTop}>
					<h5>Seguidores no Twitter</h5>
					<div className={styles.statistics}>
						<Bar
							data={chartDataSet('Seguidores', usersFollowers)}
							width={400}
							height={200}
							options={{
								maintainAspectRatio: true,
								responsive: true,
								animation: {
									animateScale: true
								},
								scales: {
									y: {
										ticks: {
											stepSize: 1
										}
									}
								}
							}}
						/>
					</div>
				</div>
			</div>

			<div className={styles.areaTitle} style={{ marginTop: 25 }}>
				<h3 className={styles.areaTitleText}>Indique amigos</h3>
			</div>
			<div className={styles.inviteFriendArea}>
				<div className={styles.inviteFriendContent}>
					<div className={styles.inviteFriend}>
						<span style={{ color: '#fff' }}>Convide seus amigos a usarem o Likearns</span>
						<span style={{ color: '#fff', textAlign: 'center' }}>+<RiCopperCoinLine size={19} style={{ position: 'relative', bottom: 2 }} />150</span>
						<SimpleInput
							type="text"
							readOnly
							value={`${process.env.NEXT_PUBLIC_URL}/criar-conta?ref=${me?.username}`}
							name="referralCode"
							icon={<RiFileCopyLine onClick={handleCopyReferralCode} style={{ cursor: 'pointer' }} />}
							iconPosition="right"
							forwardRef={referralCode}
						/>
					</div>
					<div className={styles.inviteFriendDown}>
						<div className={styles.inviteInfo} style={{ paddingTop: 6 }}>
							<div style={{ textAlign: 'center' }}>
								<p>amigos indicados</p>
								<span style={{ fontSize: 14, position: 'relative', bottom: 14, }}><RiUserSharedLine size={19} />{me?.invited_friends}</span>
							</div>
							<div></div>
							<div style={{ textAlign: 'center' }}>
								<p>total ganho</p>
								<span style={{ fontSize: 14, position: 'relative', bottom: 14, }}><RiCopperCoinLine size={19} /> {me?.invited_total_points}</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<ProgressLoader
				enabled={isLoading}
				title="Carregando"
				colorText="#fff"
			/>
		</div>
	);
}

export default Start;

export async function getServerSideProps({ req }) {
	const token = req.cookies.session_token;
	if (!token) return redirectAuthenticityCustomUrl('/entrar');
	
	const me = await UserService.currentUser(token);
	if (!me.verified_email) return redirectAuthenticityCustomUrl('/minha-conta/verificar');

	const usersLikes = await UserLikeService.index(token, {
		page: 1,
		limit: 7,
		social_media: 2
	});
	const usersFollowers = await UserFollowerService.index(token, {
		page: 1,
		limit: 7,
		social_media: 2
	});
	const topSharers = await UserService.topSharers();

	return {
		props: {
			me,
			usersLikes,
			usersFollowers,
			topSharers
		}
	};
}
