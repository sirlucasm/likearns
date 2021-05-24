import { useRouter } from 'next/router';

// imports
import {
	Button,
	Badge
} from '@material-ui/core';
import styled from 'styled-components';

// icons
import {
	FiMenu
} from 'react-icons/fi';
import {
	RiCopperCoinLine,
	RiNotification3Line
} from 'react-icons/ri';

const customStyles = {
	root: {
		width: '100%',
		backgroundColor: '#e8e8e8',
		height: 50,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
};

const Points = styled.div`
	cursor: pointer;
	border-radius: 3px;
	padding: 6px 9px;
	transition: .2s;
	margin-right: 12px;
	&:hover {
		background-color: #dedede;
	}
`;

const ButtonsArea = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`;

const Notification = styled(Points)`
	margin-right: 6px;
`;

export default function StartNav({ setOpenMenu, profile }) {
	const router = useRouter();

	const handleLinkURL = (url) => {
		router.push(url);
	};

	return (
		<div style={customStyles.root}>
			<div>
				<Button onClick={() => setOpenMenu(true)}><FiMenu style={{ fontSize: 24 }} /></Button>
			</div>
			<ButtonsArea>
				<Notification>
					<Badge color="error" badgeContent={12} max={99}>
						<RiNotification3Line size={20} />
					</Badge>
				</Notification>
				<Points onClick={() => handleLinkURL('/ganhar-earnscoins')}>
					<RiCopperCoinLine size={20} />
					<span style={{ margin: '7px 0 0 3px', position: 'relative', top: 1, userSelect: 'none' }}>{profile?.points}</span>
				</Points>
			</ButtonsArea>
		</div>
	);
}
