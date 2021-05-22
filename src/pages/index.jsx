import { useState, useEffect } from 'react';
import Link from 'next/link';

// imports
import NavMenu from '../components/NavMenu';
import { Button } from '../components/Styleds';
import Asks from '../components/Asks';
import Footer from '../components/Footer';

// icons
import {
	FaSignInAlt,
	FaHeart,
	FaCoffee,
	FaCoins
} from 'react-icons/fa';

import styles from '../styles/pages/index.module.css';

export default function Home() {
	const [toGainList] = useState(['Seguidores', 'Curtidas', 'Comentários']);
	const [toGainSelected, setToGainSelected] = useState('Curtidas');

	//form
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [subject, setSubject] = useState('');
	const [message, setMessage] = useState('');
	const [messageLength, setMessageLength] = useState(300);

	const autoShowGainList = (count) => {
		setToGainSelected(toGainList[count]);
	}

	const messageChangerAndVerification = (event) => {
		const value = event.target.value, limit = 300;
		setMessage(value);
		setMessageLength(limit - value.length);
	}

	const sendEmailContact = (event) => {
		event.preventDefault();
		// send contact email
		alert(email);
	}

	useEffect(() => {
		let count = 0;
		setInterval(() => {
			autoShowGainList(count);
			count++;
			if (count === 3) count = 0;
		}, 2380);
		return () => {
			setToGainSelected();
		}
	}, []);

	return (
		<div>
			<div>
				<NavMenu />
				<div className={styles.header}>
					<div className={styles["header-title"]}>
						<h3>Que tal ganhar <span data-aos="fade-down" data-aos-duration="900" className={styles["header-title-gain-words"]}>{toGainSelected}</span>?</h3>
					</div>
					<div className={styles["header-paragraph"]}>
						<p
							data-aos="fade-right"
							data-aos-once="true"
							data-aos-duration="900"
						>
							Com o Likearns você ganha curtidas em suas postagens do Twitter/Instagram e além disso, você pode juntar pontos
							para trocar por saldo Paypal.
					</p>
						<Link href='criar-conta'>
							<Button style={{ position: 'relative', top: 20, }}>Cadastrar agora</Button>
						</Link>
					</div>
				</div>

				<div className={styles["content-header"]}>
					<div
						className={styles["content-header-title"]}
						data-aos="fade-down"
						data-aos-once="true"
						data-aos-duration="1200"
						data-aos-delay="300"
					>
						<h3>Nossos serviços</h3>
					</div>
					<div
						className={styles["content-header-paragraph"]}
						data-aos="fade-up"
						data-aos-once="true"
						data-aos-duration="1200"
						data-aos-delay="300"
					>
						<p>Utilizando o Likearns, você tem a oportunidade trocar seus pontos por curtidas/seguidores ou curtir postagens de outras
						pessoas e ganhar mais pontos. Com os pontos ganhos você poderá trocar por saldo no Paypal, não é o máximo?
					</p>
					</div>
				</div>

				<div id="content-how-to-use" className={`${styles["content-how-to-use"]} row list-group list-group-horizontal justify-content-md-center`}>
					<div className={`${styles["content-how-to-use-items"]} col-md-5 col-lg-3 h-auto list-group-item`}>
						<FaSignInAlt className={styles["content-how-to-use-icons"]} />
						<h3>Cadastre/Entre</h3>
						<p>
							Crie sua conta <Link href="criar-conta">aqui</Link> no <b>Likearns</b> e logue na sua nova conta, após isso você já pode
							juntar seus pontos e ganhar curtidas/seguidores. Lembre de autorizar nosso Sistema para ler algumas informações do seu perfil, para sabermos se
							você curtiu ou não as postagens.
						</p>
					</div>
					<div className={`${styles["content-how-to-use-items"]} col-md-5 col-lg-3 h-auto list-group-item`}>
						<FaHeart className={styles["content-how-to-use-icons"]} />
						<h3>Escolha entre curtidas e seguidores</h3>
						<p>Você pode trocar seus pontos por seguidores/curtidas, ou se preferir, trocar por saldo em sua conta Paypal, isso é demais!🤑</p>
					</div>
					<div className={`${styles["content-how-to-use-items"]} col-md-5 col-lg-3 h-auto list-group-item`}>
						<FaCoffee className={styles["content-how-to-use-icons"]} />
						<h3>Relaxe enquanto espera</h3>
						<p>
							Depois que você publicar sua postagem ou seu perfil para ganhar curtidas/seguidores, basta esperar o tempo que você determinou e ver
							seu perfil crescendo.
						</p>
					</div>
					<div className={`${styles["content-how-to-use-items"]} col-md-5 col-lg-3 h-auto list-group-item`}>
						<FaCoins className={styles["content-how-to-use-icons"]} />
						<h3>+EarnsCoins</h3>
						<p>Você pode ganhar mais EC simplesmente indicando seus amigos a usarem o <b>Likearns</b>. Muito top!</p>
					</div>
				</div>

				<div id="content-help" className={styles["content-help"]}>
					<div
						className={`${styles["content-header-title"]} ${styles["content-help-title"]}`}
						data-aos="fade-down"
						data-aos-once="true"
						data-aos-duration="1200"
					>
						<h3>Dúvidas</h3>
					</div>
					<Asks />
				</div>

				<div id="content-contact" className={styles["content-contact"]}>
					<div
						className={`${styles["content-header-title"]} ${styles["content-help-title"]}`}
						data-aos="fade-down"
						data-aos-once="true"
						data-aos-duration="1200"
					>
						<h3>ENTRE EM CONTATO</h3>
					</div>
					<div className={`${styles["content-contact"]} row`} data-aos="zoom-in" data-aos-once="true" data-aos-duration="900">
						<form className="card-body mx-auto col-lg-4 col-md-6 col-sm-7 col-10" onSubmit={sendEmailContact}>
							<div className="row form-group">
								<div className="col-12">
									<input className="form-control" onChange={(e) => setName(e.target.value)} type="text" name="name" id="name" placeholder="Seu nome" maxLength="30" required />
								</div>
							</div>
							<div className="row form-group">
								<div className="col-12">
									<input className="form-control" onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" placeholder="seuemail@example.com" maxLength="30" required />
								</div>
							</div>
							<div className="row form-group">
								<div className="col-12">
									<input className="form-control" onChange={(e) => setSubject(e.target.value)} type="text" name="subject" id="subject" placeholder="Assunto" maxLength="20" required />
								</div>
							</div>
							<div className="row form-group">
								<div className="col-12">
									<textarea className="form-control" onChange={messageChangerAndVerification} name="message" id="message" placeholder="Mensagem..." maxLength="300" required></textarea>
								</div>
								<p id="charLeft" className="ml-3 mt-1">{messageLength}</p>
							</div>

							<div className="row form-group">
								<div className="col-lg-12">
									<input type="submit" className="btn btn-primary" name="send" id="send" value="Enviar" />
								</div>
							</div>
						</form>
					</div>
				</div>
				<Footer />
			</div>
		</div>
	)
}
