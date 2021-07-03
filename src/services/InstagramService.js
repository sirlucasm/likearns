import API from '../configs/axios';
import Cookie from 'js-cookie';

const sessionToken = Cookie.get('session_token');

const headers = {
	Authorization: `Bearer ${sessionToken}`,
};

export default {
	getCurrentUser() {
		const user = localStorage.getItem('@likearns/instagram_token');
		return user && JSON.parse(user);
	},

	async auth(params) {
		try {
			const res = await API.post('instagram/auth', { params, headers });
			if (res.status === 200) localStorage.setItem('@likearns/instagram_token', JSON.stringify(res.data));
			return res.message;
		} catch (error) {
			return Promise.reject(error.response);
		}
	},
}
