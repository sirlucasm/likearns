import { ServerStyleSheet } from 'styled-components';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import {
	APP_NAME,
	APP_URL,
	APP_DESCRIPTION
} from '../constants/app';

export default class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const sheet = new ServerStyleSheet()
		const originalRenderPage = ctx.renderPage

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App) => (props) =>
						sheet.collectStyles(<App {...props} />),
				})

			const initialProps = await Document.getInitialProps(ctx)
			return {
				...initialProps,
				styles: (
					<>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</>
				),
			}
		} finally {
			sheet.seal()
		}
	}

	render() {
		return (
			<Html>
				<Head>
					{/* links */}
					<link rel="shortcut icon" href="/assets/likearns_icon.png" />
					<link
						rel="stylesheet"
						href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
						integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
						crossOrigin="anonymous"
					/>
					<script src="https://kit.fontawesome.com/3f722b8912.js" crossOrigin="anonymous"></script>

					{/* meta tags */}
					<meta name="keywords" content="instagram likes, twitter likes, curtidas no instagram, curtidas no twitter, likes, curtidas, money, paypal money, fazer dinheiro em casa, grana extra, ganhar dinheiro, likearns, earns, like earns, likearns brasil, curtidas brasileiras" />
					<meta name="Distribution" content="Global" />
					<meta name="Copyright" content="Likearns" />
					<meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
					<meta name="revisit-after" content="7 days" />
					<meta charSet="utf-8" />

					{/* Twitter */}
					<meta property="twitter:url" content={APP_URL} />
					<meta property="twitter:title" content={`${APP_NAME}: Curtidas em seus posts e fazer dinheiro curtindo`} />
					<meta property="twitter:description" content={APP_DESCRIPTION} />
					<meta property="twitter:image" content={`${APP_URL}assets/likearns_icon.png`} />
				</Head>
				<body>
					<Main />
					<NextScript />

					{/* scripts imports */}
					<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossOrigin="anonymous"></script>
					<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossOrigin="anonymous"></script>
					<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossOrigin="anonymous"></script>
				</body>
			</Html>
		);
	}
}
