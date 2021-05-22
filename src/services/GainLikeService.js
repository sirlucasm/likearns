import API from '../configs/axios';
import Cookie from 'js-cookie';

const sessionToken = Cookie.get('session_token');

export default {
	async publish(params) {
		try {
			const headers = {
				Authorization: `Bearer ${sessionToken}`,
			};
			const res = await API.post('gain/likes/publish', { params }, { headers });
			return res.data;
		} catch (error) {
			return Promise.reject(error.response);
		}
	},

	async listAll(page, limit, token) {
		try {
			const headers = {
				Authorization: `Bearer ${token}`,
			};
			const res = await API.get(`gain/likes?page=${page}&limit=${limit}`, { headers });
			return res.data;
		} catch (error) {
			return Promise.reject(error.response);
		}
	}
}
