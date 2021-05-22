import { useEffect } from "react";
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import SEO from '../../next-seo.config';

// imports
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import GlobalStyles from '../styles/globals/index';
import '../styles/animations.css';

function MyApp({ Component, pageProps }) {
	useEffect(() => {
		AOS.init();
	}, [])
	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
			</Head>
			<DefaultSeo {...SEO} />
			<GlobalStyles />
			<Component {...pageProps} />
		</>
	);
}

export default MyApp
