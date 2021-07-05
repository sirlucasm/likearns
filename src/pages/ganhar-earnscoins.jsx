import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// imports
import Drawer from '../components/Drawer';
import StartNav from '../components/StartNav';
import { CustomButton } from '../components/Styleds';
import ProgressLoader from '../components/ProgressLoading';
import Swal from 'sweetalert2';
import {
	calculatePointsToEarn,
} from '../utils';
import { NextSeo } from 'next-seo';
import {
	redirectAuthenticityCustomUrl
} from '../utils/auth';
import SocialMediaButtons from '../components/SocialMediaButtons';
import DailyReward from '../components/DailyReward';
import styles from '../styles/pages/ganhar-earnscoins.module.css';

// services
import TwitterService from '../services/TwitterService';
import UserService from '../services/UserService';
import InstagramService from '../services/InstagramService';
import GainFollowerService from '../services/GainFollowerService';
import GainLikeService from '../services/GainLikeService';

// icons
import {
	RiInstagramLine,
	RiTwitterLine,
	RiDeleteBin6Line,
} from 'react-icons/ri';

const GainEarnsCoins = ({
	me,
	gainFollowers,
	gainLikes
}) => {
	const router = useRouter();
	const { oauth_token, oauth_verifier } = router.query;
	const [isLoading, setIsLoading] = useState(false);
	const [titleLoading, setTitleLoading] = useState('Carregando...');
	const [openMenu, setOpenMenu] = useState(false);
	const [pageF, setPageF] = useState(1);
	const [limitF, setLimitF] = useState(10);
	const [userTwitter, setUserTwitter] = useState();
	const [userInstagram, setUserInstagram] = useState();

	const deleteGainFollowers = (id) => {
		Swal.fire({
			icon: 'warning',
			text: 'Deseja mesmo deletar esta publicação?',
			showConfirmButton: true,
			showCancelButton: true,
			confirmButtonText: 'Sim',
			cancelButtonText: 'Não',
		})
			.then((res) => {
				if (res.isConfirmed) {
					GainFollowerService.delete(id)
						.then(() => Swal.fire({
							position: 'top-end',
							icon: 'success',
							text: 'Publicação deletada com sucesso',
							showConfirmButton: false,
							timer: 2500,
						})
							.then(() => router.push('/ganhar-earnscoins'))
						);
				}
			})
	}

	const seePublication = (post_url) => {
		window.open(post_url, '_blank', 'channelmode');
	}

	const listGainFollowers = gainFollowers?.followers.map((data, index) => {
		const calculateProgressWidth = (data.obtained_followers / data.followers) * 100;
		return (
			<div
				key={index}
				className={styles.gainCards}
				data-aos="fade-right"
				data-aos-once="true"
				data-aos-duration="600"
			>
				<div>
					<div style={{ textAlign: 'center' }}>
						{
							data.social_media === 1 && <RiInstagramLine size={28} /> ||
							data.social_media === 2 && <RiTwitterLine size={28} />
						}
						<div>
							<span style={{ fontSize: 13 }}>@{data.username}</span>
						</div>
					</div>
					<div className={styles.gainStatus}>
						<span style={{ fontSize: 12, userSelect: 'none' }}>{data.obtained_followers}</span>
						<span style={{ fontSize: 12, userSelect: 'none' }}>{data.followers}</span>
					</div>
					<div className="progress mb-3" style={{ height: 6, width: 120 }}>
						<div className="progress-bar" role="progressbar" style={{ width: calculateProgressWidth + '%', backgroundColor: '#ffbc00' }} aria-valuenow={data.obtained_followers} aria-valuemin="0" aria-valuemax={data.followers}></div>
					</div>
				</div>
				{
					data.user_id === me?.id ?
						<CustomButton onClick={() => deleteGainFollowers(data.id)}><RiDeleteBin6Line className="mb-1" /> Excluir</CustomButton>
						:
						<CustomButton
							onClick={() => {
								if (data.social_media === 2) return twitterFollowUser(data);
							}}
							primary
						>
							Seguir +{ calculatePointsToEarn(data.lost_points) }
						</CustomButton>
				}
			</div>
		);
	});

	const listGainLikes = gainLikes?.likes.map((data, index) => {
		const calculateProgressWidth = (data.obtained_likes / data.likes) * 100;
		return (
			<div
				key={index}
				className={styles.gainCards}
				data-aos="fade-right"
				data-aos-once="true"
				data-aos-duration="600"
				data-aos-delay="150"
			>
				<div>
					<div style={{ textAlign: 'center' }}>
						{
							data.social_media === 1 && <RiInstagramLine size={28} /> ||
							data.social_media === 2 && <RiTwitterLine size={28} />
						}
						<div>
							<span style={{ fontSize: 13, cursor: 'pointer' }} onClick={() => seePublication(data.post_url)}>Ver publicação</span>
						</div>
					</div>
					<div className={styles.gainStatus}>
						<span style={{ fontSize: 12, userSelect: 'none' }}>{data.obtained_likes}</span>
						<span style={{ fontSize: 12, userSelect: 'none' }}>{data.likes}</span>
					</div>
					<div className="progress mb-3" style={{ height: 6, width: 120 }}>
						<div className="progress-bar" role="progressbar" style={{ width: calculateProgressWidth + '%', backgroundColor: '#ffbc00' }} aria-valuenow={data.obtained_likes} aria-valuemin="0" aria-valuemax={data.likes}></div>
					</div>
				</div>
				{
					data.user_id === me?.id ?
						<CustomButton onClick={() => deleteGainFollowers(data.id)}><RiDeleteBin6Line className="mb-1" /> Excluir</CustomButton>
						:
						<CustomButton
							onClick={() => {
								if (data.social_media === 1) return instagramLikePost(data);
								if (data.social_media === 2) return twitterLikePost(data);
							}}
							primary
						>
							Curtir +{ calculatePointsToEarn(data.lost_points) }
						</CustomButton>
				}
			</div>
		);
	});

	const sendOAuthTokens = () => {
		if (oauth_token) {
			TwitterService.sendOAuthToken({ oauth_token, oauth_verifier })
				.then(() => {
					router.replace('/ganhar-earnscoins');
					fetchCurrentUserTwitter();
				})
				.catch(err => console.log(err));
		}
	}

	const fetchCurrentUserTwitter = () => {
		setUserTwitter(TwitterService.getCurrentUser());
	}

	const fetchCurrentUserInstagram = () => {
		setUserInstagram(InstagramService.getCurrentUser());
	}

	const twitterFollowUser = (param) => {
		setIsLoading(true);
		setTitleLoading('Seguindo usuário');

		param.twitter = userTwitter;
		param.current_user = me.id;

		UserService.verifyIfUserFollowed({ gain_follower_id: param.id })
			.then(res => {
				if (!res.following) {
					TwitterService.followUser(param)
						.then(res => {
							if (!res.twitter.following) {
								UserService.gainPointsFollowing({ token: res.token })
									.then(() => {
										Swal.fire({
											position: 'top-end',
											icon: 'success',
											text: `Você seguiu @${param.username} e ganhou ${calculatePointsToEarn(param.lost_points)} EC's`,
											showConfirmButton: false,
											timer: 2500,
										}).then(() => router.reload());
									});
							} else {
								Swal.fire({
									position: 'top-end',
									icon: 'error',
									text: 'Você deve estar conectado',
									showConfirmButton: false,
									timer: 2500,
								})
							}
						})
						.catch(err => console.log(err));
				} else {
					Swal.fire({
						position: 'top-end',
						icon: 'error',
						text: 'Você já realizou esta ação. 👀',
						showConfirmButton: false,
						timer: 2500,
					});
				}
			})
		setIsLoading(false);
	}

	const twitterLikePost = (param) => {
		setIsLoading(true);
		setTitleLoading('Curtindo postagem');

		param.twitter = userTwitter;
		let getPostId = param.post_url.split('https://twitter.com/')[1].split('/');
		param.post = {
			id: getPostId[2],
			url: param.post_url,
			username: getPostId[0],
		}
		param.current_user = me.id;

		UserService.verifyIfUserPostLiked({ gain_like_id: param.id })
			.then(res => {
				if (!res.liking) {
					TwitterService.likePost(param)
						.then(res => {
							if (res.twitter.favorited) {
								UserService.gainPointsLiking({ token: res.token })
									.then(() => {
										Swal.fire({
											position: 'top-end',
											icon: 'success',
											text: `Você curtiu a postagem de @${param.post.username} e ganhou ${calculatePointsToEarn(param.lost_points)} EC's`,
											showConfirmButton: false,
											timer: 2500,
										}).then(() => router.reload());
									});
							}
						})
						.catch(() => Swal.fire({
							position: 'top-end',
							icon: 'error',
							text: 'Você deve estar conectado',
							showConfirmButton: false,
							timer: 2500,
						})
						);
				} else {
					Swal.fire({
						position: 'top-end',
						icon: 'error',
						text: 'Você já realizou esta ação. 👀',
						showConfirmButton: false,
						timer: 2500,
					});
				}
			})
		setIsLoading(false);
	}

	const instagramLikePost = async (param) => {
		setIsLoading(true);
		setTitleLoading('Curtindo postagem');

		const postData = await InstagramService.getMediaData({ post_url: param.post_url });
		param.instagramToken = userInstagram.token;
		param.postId = postData.media_id;
		param.current_user = me.id;

		const res = await UserService.verifyIfUserPostLiked({ gain_like_id: param.id });
		if (!res.liking) {
			const instaPostLike = await InstagramService.likePost(param)
				if (instaPostLike.token) {
					UserService.gainPointsLiking({ token: instaPostLike.token })
						.then(() => {
							Swal.fire({
								position: 'top-end',
								icon: 'success',
								text: `Você curtiu a postagem de @${postData.author_name} e ganhou ${calculatePointsToEarn(param.lost_points)} EC's`,
								showConfirmButton: false,
								timer: 2500,
							}).then(() => router.reload());
						});
				} else {
					Swal.fire({
						position: 'top-end',
						icon: 'error',
						text: 'Você deve estar conectado',
						showConfirmButton: false,
						timer: 2500,
					})
				}
				
		} else {
			Swal.fire({
				position: 'top-end',
				icon: 'error',
				text: 'Você já realizou esta ação. 👀',
				showConfirmButton: false,
				timer: 2500,
			});
		}
		setIsLoading(false);
	}

	useEffect(() => {
		sendOAuthTokens();
		fetchCurrentUserTwitter();
		fetchCurrentUserInstagram();
	}, []);

	return (
		<div>
			<NextSeo
				title='Ganhar EarnsCoins'
			/>
			<StartNav setOpenMenu={setOpenMenu} profile={me} />
			<Drawer
				open={openMenu}
				toggleDrawer={setOpenMenu}
				profile={me}
			/>
			<div className={styles.areaTitle}>
				<h3 className={styles.areaTitleText}>Ganhar EarnsCoins</h3>
			</div>

			<div className="container">
				<SocialMediaButtons
					userTwitter={userTwitter}
					userInstagram={userInstagram}
				/>
			</div>

			<div className="container">
				<div className="my-4">
					<h4>Seguindo</h4>
				</div>
				<div className={styles.gainArea}>
					{
						listGainFollowers
					}
					{
						gainFollowers?.followers.length <= 0 && <span>Não há nenhuma publicação para seguir</span>
					}
				</div>

				<div className="mt-5 mb-4">
					<h4>Curtindo</h4>
				</div>
				<div className={styles.gainArea}>
					{
						listGainLikes
					}
					{
						gainLikes?.likes.length <= 0 && <span>Não há nenhuma publicação para curtir</span>
					}
				</div>

				<DailyReward me={me} />
				<ProgressLoader
					enabled={isLoading}
					title={titleLoading}
					colorText="#fff"
				/>
				<div className={styles.adsArea}>
					{/*   ANÚNCIOS   */}
					{/* banner */}
				</div>
				{/* flutuante desktop */}
				{/* flutuante mobile */}
				{/* interstitial */}
			</div>
		</div>
	);
}

export default GainEarnsCoins;

export async function getServerSideProps({ req }) {
	const token = req.cookies.session_token;
	if (!token) return redirectAuthenticityCustomUrl('/entrar');
	
	const me = await UserService.currentUser(token);
	if (!me.verified_email) return redirectAuthenticityCustomUrl('/minha-conta/verificar');
	
	const gainFollowers = await GainFollowerService.listAll(1, 10, token);
	const gainLikes = await GainLikeService.listAll(1, 10, token);


	return {
		props: {
			me,
			gainFollowers,
			gainLikes
		}
	};
}
