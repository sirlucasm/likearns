import React, { useState } from 'react';

// imports
import styled from 'styled-components';
import Image from 'next/image';
import animateScrollTo from 'animated-scroll-to';
import styles from '../../styles/components/NavMenu.module.css';
import Link from 'next/link';

const NavItem = styled.a`
	color:  #303030;
	transition: .25s;
	font-size: 15px;
	margin: 0 12px;
	padding-bottom: 3px;
	position: relative;
	&:hover {
		color: #c94040;
		text-decoration: none;
	}
	&::after {
		border-bottom: 2px solid #c94040;
		position: absolute;
		left: 0;
		bottom: 0;
		content: '';
		width: 0px;
		transition: all 0.3s ease 0s;
	}
	&:hover::after{ width: 100%; }
`;

const Button = styled.button`
	color: #f0f0f0;
	background-color: #c94040;
	border: none;
	padding: 7px 17px;
	font-size: 16px;
	transition: .4s;
	text-align: center;
	&:hover {
		color: #f0f0f0;
		text-decoration: none;
		background-color: #ec8d8d;
	}
`;

const ImageButton = styled.a`
	cursor: pointer;
	margin-top: 4px;
`;

export default function NavMenu() {
	const [showingMenuContent, setShowingMenuContent] = useState(0);

	const menuButton = () => {
		const content = document.getElementById('menuContent');
		const menuItems = document.getElementById('menuItems');
		if (showingMenuContent === 0) {
			content.classList.remove('hideMenu');
			content.classList.add('fadeInDownMenu');
			// show the menu items after the content
			setTimeout(() => { menuItems.classList.add('fadeInRight'); }, 250);
			setShowingMenuContent(1);
		} else {
			content.classList.add('hideMenu');
			setTimeout(() => {
				content.classList.add('menu-content');
				menuItems.classList.remove('fadeInRight');
			}, 200);
			setShowingMenuContent(0);
		}
	};

	const scrollTo = (id) => {
		let value = document.getElementById(id);
		if (typeof id === 'number') value = id;
		animateScrollTo(value, {
			verticalOffset: -40,
		});
	}

	return (
		<div className={styles['navmenu-area']} style={{ zIndex: 999, }}>
			<ImageButton href="/">
				<Image src="/assets/logo/likearns_logo_red_heart.png" width={152} height={30} className={styles['logo-img']} alt="Logo Likearns" />
			</ImageButton>
			<button className={styles['menu-button']} type="button" id="menuButton" onClick={menuButton}>
				<span className="fas fa-bars menu-icon" />
			</button>
			<div className={styles['menu-content']} id="menuContent">
				<div className={styles['menu-items']} id="menuItems">
					<NavItem href="#" onClick={() => scrollTo(0)}>Inicio</NavItem>
					<NavItem href="#" onClick={() => scrollTo('content-how-to-use')}>Sobre</NavItem>
					<NavItem href="#" onClick={() => scrollTo('content-help')}>Dúvidas</NavItem>
					<NavItem href="#" onClick={() => scrollTo('content-contact')}>Contato</NavItem>
					<Link href="/entrar"><Button>Entrar</Button></Link>
				</div>
			</div>
		</div>
	);
}
