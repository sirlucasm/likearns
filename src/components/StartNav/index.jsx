import { useRouter } from 'next/router';

// imports
import {
	Button
} from '@material-ui/core';
import styled from 'styled-components';

// icons
import {
	FiMenu
} from 'react-icons/fi';
import {
	RiCopperCoinLine
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
			<Points onClick={() => handleLinkURL('/ganhar-earnscoins')}>
				<RiCopperCoinLine size={20} />
				<span style={{ margin: '7px 0 0 3px', position: 'relative', top: 1, userSelect: 'none' }}>{profile?.points}</span>
			</Points>
		</div>
	);
}
