import { useState } from 'react';
import { useRouter } from 'next/router';

// imports
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import SimpleInput from '../SimpleInput';
import {
	CustomButton
} from '../Styleds';

// services
import UserService from '../../services/UserService';

// icons
import {
	RiCloseFill
} from 'react-icons/ri';
import {
	FiLock
} from 'react-icons/fi';

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

	contentFormDiv: {
		width: 250
	}
};

Modal.setAppElement('#__next');

export default function AuthPassword({
	isOpen,
	closeModal,
}) {
	const router = useRouter();
	const [showPass, setShowPass] = useState(false);
	const [authPassword, setAuthPassword] = useState();

	const deleteAccount = (e) => {
		UserService.verifyAuthenticity({ password: authPassword })
			.then((res) => UserService.deleteAccount(res)
				.then(() => Swal.fire({
					position: 'top-end',
					icon: 'success',
					text: 'Você excluiu sua conta',
					showConfirmButton: false,
					timer: 2500,
				})
					.then(() => {
						UserService.logout();
						router.push('/');
					})
				)
			)
			.catch((error) => Swal.fire({
				position: 'top-end',
				icon: 'error',
				text: error?.data.message,
				showConfirmButton: false,
				timer: 2500,
			}));
		e.preventDefault();
	}

	const handleShowPassword = () => setShowPass(!showPass);

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={closeModal}
			style={customStyles}
			contentLabel="Example Modal"
		>
			<div style={customStyles.modalArea}>
				<div style={{ ...customStyles.headArea, marginBottom: 20 }}>
					<span></span>
					<div>
						<span onClick={closeModal}><RiCloseFill size={28} /></span>
					</div>
				</div>
				<div>
					<label htmlFor='authPassword'>Confirme sua senha para prosseguir</label>
				</div>
				<form autoComplete="off" onSubmit={deleteAccount} style={customStyles.contentForm}>
					<SimpleInput
						type={showPass ? 'text' : 'password'}
						onChange={e => setAuthPassword(e.target.value)}
						placeholder="Sua senha"
						id='authPassword'
						icon={
							<FiLock color={'#505050'} />
						}
						iconPosition="right"
						required
						style={customStyles.contentFormDiv}
					/>
					<div style={{ width: '35%', display: 'flex', alignSelf: 'flex-end'}}>
						<span onClick={handleShowPassword} className="show-pass-btn">{showPass ? 'ocultar' : 'mostrar'} senha</span>
					</div>
					<CustomButton primary type="submit">
						Excluir agora
					</CustomButton>
				</form>
			</div>
		</Modal>
	);
}
