import { useRouter } from 'next/router';

// imports
import clsx from 'clsx';
import {
	SwipeableDrawer,
	List,
	Divider,
	ListItem,
	ListItemIcon,
	ListItemText
} from '@material-ui/core';
import UserService from '../../services/UserService';
import Image from 'next/image';
import styles from '../../styles/components/Drawer.module.css';

// icons
import {
	FiHome,
	FiLogOut
} from 'react-icons/fi';
import {
	RiCopperCoinLine,
	RiHeart3Line,
	RiGroupLine,
	RiSettings2Line,
} from 'react-icons/ri';
import { GiReceiveMoney } from 'react-icons/gi';



export default function Drawer({ toggleDrawer, open, profile }) {
	const router = useRouter();

	const handleLinkURL = (url) => {
		router.push(url);
	};

	const handleLogout = () => {
		UserService.logout();
		router.replace('/');
	};

	const list = () => (
		<div
			className={clsx(styles.list)}
			role="presentation"
			onClick={() => toggleDrawer(false)}
			onKeyDown={() => toggleDrawer(false)}
		>
			<div className={styles.profileInfo} onClick={() => handleLinkURL('/ganhar-earnscoins')}>
				<div style={{ margin: 6 }}>
					<Image src={profile?.social_profile_picture || '/assets/icons/no_user.png'} className={styles.noUserImage} width={55} height={60} alt="Profile Photo" />
				</div>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<span className={styles.profileName}>{profile?.username}</span>
					<div>
						<RiCopperCoinLine size={18} />
						<span style={{ margin: '7px 0 0 3px', position: 'relative', top: 1 }}>{profile?.points}</span>
					</div>
				</div>
			</div>
			<List>
				<ListItem button onClick={() => handleLinkURL('/inicio')}>
					<ListItemIcon><FiHome /></ListItemIcon>
					<ListItemText primary="Inicio" />
				</ListItem>
				<ListItem button onClick={() => handleLinkURL('/ganhar-seguidores')}>
					<ListItemIcon><RiGroupLine /></ListItemIcon>
					<ListItemText primary="Ganhar Seguidores" />
				</ListItem>
				<ListItem button onClick={() => handleLinkURL('/ganhar-curtidas')}>
					<ListItemIcon><RiHeart3Line /></ListItemIcon>
					<ListItemText primary="Ganhar Curtidas" />
				</ListItem>
				<ListItem button onClick={() => handleLinkURL('/ganhar-earnscoins')}>
					<ListItemIcon><RiCopperCoinLine /></ListItemIcon>
					<ListItemText primary="Ganhar EarnsCoins" />
				</ListItem>
				<ListItem button onClick={() => handleLinkURL('/retirar')}>
					<ListItemIcon><GiReceiveMoney /></ListItemIcon>
					<ListItemText primary="Retirar" />
				</ListItem>
				<ListItem button onClick={() => handleLinkURL('/opcoes')}>
					<ListItemIcon><RiSettings2Line /></ListItemIcon>
					<ListItemText primary="Opções" />
				</ListItem>
			</List>
			<Divider />
			<List>
				<ListItem button onClick={handleLogout}>
					<ListItemIcon><FiLogOut /></ListItemIcon>
					<ListItemText primary="Sair" />
				</ListItem>
			</List>
		</div>
	);

	return (
		<div>
			<>
				<SwipeableDrawer
					anchor="left"
					open={open}
					onClose={() => toggleDrawer(false)}
					onOpen={() => toggleDrawer(true)}
				>
					{list()}
				</SwipeableDrawer>
			</>
		</div>
	);
}
