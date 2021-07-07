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
			const res = await API.post('instagram/login', params, { headers });
			if (res.status === 200) localStorage.setItem('@likearns/instagram_token', JSON.stringify(res.data));
			return res.data;
		} catch (error) {
			return Promise.reject(error.response);
		}
	},

	async likePost(params) {
		try {
			const res = await API.post('instagram/posts/like', params, { headers });
			return res.data;
		} catch (error) {
			if (error.response.status === 404) return Promise.reject({ message: 'Postagem não existe' });
			if (error.response.status === 400) return Promise.reject({ message: 'Você atingiu o limite de likes por dia' });
			return Promise.reject(error.response);
		}
	},

	async followUser(params) {
		try {
			const res = await API.post('instagram/followers/follow', params, { headers });
			return res.data;
		} catch (error) {
			if (error.response.status === 404) return Promise.reject({ message: 'Usuário não existe' });
			if (error.response.status === 400) return Promise.reject({ message: 'Você atingiu o limite de follows por dia' });
			return Promise.reject(error.response);
		}
	},

	async getMediaData(params) {
		try {
			const res = await API.get('instagram/posts/getMediaData', { params, headers });
			return res.data;
		} catch (error) {
			return Promise.reject(error.response);
		}
	},

	async logoutUser() {
		try {
			localStorage.removeItem('@likearns/instagram_token');
		}
		catch (error) {
			return Promise.reject(error);
		}
	}
}
