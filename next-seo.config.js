import {
	APP_NAME,
	APP_AUTOR,
	APP_URL,
	APP_FB_ID,
	APP_DESCRIPTION,
	APP_TWITTER_USER
} from './src/constants/app';

const additionalMetaTags = [
	{
		property: 'dc:creator',
		content: APP_AUTOR
	},
	{
		name: 'application-name',
		content: APP_NAME
	},
	{
		httpEquiv: 'x-ua-compatible',
		content: 'IE=edge; chrome=1'
	}
];

export default {
	defaultTitle: `${APP_NAME}: Curtidas em seus posts e fazer dinheiro curtindo`,
	noindex: false,
	nofollow: false,
	title: `${APP_NAME}: Curtidas em seus posts e fazer dinheiro curtindo`,
	description: APP_DESCRIPTION,
	openGraph: {
		type: 'website',
		locale: 'pt_BR',
		url: APP_URL,
		site_name: APP_NAME,
		title: `${APP_NAME}: Curtidas em seus posts e fazer dinheiro curtindo`,
		description: APP_DESCRIPTION,
		images: [
			{
				url: `${APP_URL}assets/likearns_icon.png`,
				width: 256,
				height: 256,
				alt: `${APP_NAME} Favicon`,
			},
		]
	},
	twitter: {
		handle: `@${APP_AUTOR}`,
		site: `@${APP_TWITTER_USER}`,
		cardType: 'summary_large_image',
	},
	additionalMetaTags,
	facebook: {
		appId: APP_FB_ID,
	}
}
