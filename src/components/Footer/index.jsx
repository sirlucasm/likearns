/* eslint indent: "off" */
import React from 'react';

// imports
import Link from 'next/link';
import animateScrollTo from 'animated-scroll-to';

import {
    EmailShareButton,
    EmailIcon,
    FacebookShareButton,
    FacebookIcon,
    TelegramShareButton,
    TelegramIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon
  } from 'react-share';

import styles from '../../styles/components/Footer.module.css';

function Footer() {
    const getCurrentYear = () => {
        return new Date().getFullYear();
    }

    const scrollTo = (id) => {
		let value = document.getElementById(id);
		if (typeof id === 'number') value = id;
		animateScrollTo(value, {
			verticalOffset: -40,
		});
	}

    const shareUrl = 'https://likearns.com.br';
    const title = 'Likearns: Curtidas em seus posts e fazer dinheiro curtindo';

    return (
        <div>
            <footer className={`${styles["content-footer"]} row justify-content-center justify-content-lg-center justify-content-md-center`}>
                <ul className="col-md-2 col-lg-2" align="center">
                    <li><h3>Links</h3></li>
                    <li><a onClick={() => scrollTo(0)} href="#">Inicio</a></li>
                    <li><a onClick={() => scrollTo('content-how-to-use')} href="#">Sobre</a></li>
                    <li><a onClick={() => scrollTo('content-help')} href="#">Dúvidas</a></li>
                    <li><a onClick={() => scrollTo('content-contact')} href="#">Contato</a></li>
                    <li><Link href='/'><a>Termos de utilização</a></Link></li>
                    <li><Link href='/'><a>Política de Privacidade</a></Link></li>
                </ul>
                <ul className="col-md-2 col-lg-2" align="center">
                    <li><h3>Informações</h3></li>
                    <li><p>Maceió - Alagoas, Brasil</p></li>
                    <li><p>suporte.likearns@gmail.com</p></li>
                </ul>     
                <div className={`col-lg-12 ${styles["content-social-share"]}`}>
                    <EmailShareButton
                        url={shareUrl}
                        subject={title}
                        body="Venha ganhar seguidores e curtidas em sua rede social, ganhe tambem saldos em sua conta Paypal trocando seus pontos. Acesse: "
                    >
                        <EmailIcon size={32} round />
                    </EmailShareButton>

                    <FacebookShareButton
                        url={shareUrl}
                        quote={title}
                    >
                        <FacebookIcon size={32} round />
                    </FacebookShareButton>

                    <TwitterShareButton
                        url={shareUrl}
                        title={title}
                    >
                        <TwitterIcon size={32} round />
                    </TwitterShareButton>

                    <TelegramShareButton
                        url={shareUrl}
                        title={title}
                    >
                        <TelegramIcon size={32} round />
                    </TelegramShareButton>

                    <WhatsappShareButton
                        url={shareUrl}
                        title={title}
                        separator=":: "
                    >
                        <WhatsappIcon size={32} round />
                    </WhatsappShareButton>
                </div>
            </footer>
            <div className={`${styles["content-copyright"]} row pt-3`}>
                <div className="col-lg-12" align="center">
                    <p>© {getCurrentYear()} Copyright: <Link href='/'><a>Likearns</a></Link></p>
                </div>
            </div>
        </div>
    );
}

export default Footer;
