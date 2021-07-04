import { useState } from 'react';
import { useRouter } from 'next/router';

// imports
import Modal from 'react-modal';
import SimpleInput from '../../components/SimpleInput';
import {
	CustomButton
} from '../../components/Styleds';
import ProgressLoader from '../../components/ProgressLoading';

// icons
import {
	RiCloseFill,
	RiInstagramLine
} from 'react-icons/ri';
import {
	FiUser,
	FiLock
} from 'react-icons/fi';
import InstagramService from '../../services/InstagramService';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)'
	},

	modalArea: {
		display: 'flex',
		flexDirection: 'column'
	},

	headArea: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
	},

	contentForm: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '0 20px'
	},

	contentFormInput: {
		width: 250
	},

	logoContent: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		marginBottom: 20
	}
};

function InstagramLogin({
	isOpen,
	closeModal,
}) {
	const router = useRouter();
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	const [isLoading, setIsLoading] = useState(false);

	const loginWInstagram = (e) => {
		e.preventDefault();
		setIsLoading(true);
		InstagramService.auth({ username, password })
			.then(() => router.reload())
	}

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={closeModal}
			style={customStyles}
			contentLabel="Example Modal"
		>
			<div>
				<div style={{ ...customStyles.headArea, marginBottom: 20 }}>
					<span></span>
					<div>
						<span onClick={closeModal}><RiCloseFill size={28} /></span>
					</div>
				</div>
				<div style={customStyles.logoContent}>
					<RiInstagramLine size={48} />
				</div>
				<form autoComplete="off" onSubmit={loginWInstagram} style={customStyles.contentForm}>
					<SimpleInput
						type="text"
						onChange={e => setUsername(e.target.value)}
						placeholder="Usuário"
						id='username'
						icon={
							<FiUser color={'#505050'} />
						}
						iconPosition="right"
						required
						style={customStyles.contentFormInput}
					/>
					<SimpleInput
						type="password"
						onChange={e => setPassword(e.target.value)}
						placeholder="Senha"
						id='password'
						icon={
							<FiLock color={'#505050'} />
						}
						iconPosition="right"
						required
						style={customStyles.contentFormInput}
					/>
					<CustomButton primary type="submit" style={{ marginTop: 20 }}>
						Entrar
					</CustomButton>
				</form>
				<ProgressLoader
					enabled={isLoading}
					title="Entrando"
					colorText="#fff"
					transparent
				/>
			</div>
		</Modal>
	);
}

export default InstagramLogin;
