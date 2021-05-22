import { useState } from 'react';

// imports
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import SimpleInput from '../../components/SimpleInput';
import {
	CustomButton
} from '../../components/Styleds';

// services
import UserService from '../../services/UserService';

// icons
import {
	RiCloseFill
} from 'react-icons/ri';
import {
	FiUser
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

export default function ForgetPassword({
	isOpen,
	closeModal,
}) {
	const [email, setEmail] = useState();

	const sendResetPasswordEmail = (e) => {
		UserService.sendResetPasswordEmail({ email })
			.then(() => Swal.fire({
				position: 'top-end',
				icon: 'success',
				text: 'Email de reset de senha enviado por email.',
				showConfirmButton: false,
				timer: 2500,
			})
				.then(() => {
					closeModal();
				})
			).catch((error) => Swal.fire({
				position: 'top-end',
				icon: 'error',
				text: error?.data.message,
				showConfirmButton: false,
				timer: 2500,
			}));
		e.preventDefault();
	}

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
					<label htmlFor='email'>Digite o seu email cadastrado</label>
				</div>
				<form autoComplete="off" onSubmit={sendResetPasswordEmail} style={customStyles.contentForm}>
					<SimpleInput
						type="email"
						onChange={e => setEmail(e.target.value)}
						placeholder="Seu email"
						id='email'
						icon={
							<FiUser color={'#505050'} />
						}
						iconPosition="right"
						required
						style={customStyles.contentFormDiv}
					/>
					<CustomButton primary type="submit">
						Enviar email
					</CustomButton>
				</form>
			</div>
		</Modal>
	);
}
