import UserService from '../services/UserService';

const emailVerified = (router, url) => {
	UserService.isVerifiedEmail()
		.then(res => {
			if (res.isVerifiedEmail) router.replace(url);
			else router.replace('/entrar');
		})
		.catch(() => router.replace('/entrar'))
}

export function redirectAuthenticityCustomUrl(url) {
	return {
		redirect: {
			destination: url,
			permanent: false,
		},
	}
}
