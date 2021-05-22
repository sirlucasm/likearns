import API from '../configs/axios';

export default {
	async index(token, params) {
		try {
			const headers = {
				Authorization: `Bearer ${token}`,
			};
			const res = await API.get('users-followers', { params, headers });
			return res.data;
		} catch (error) {
			return Promise.reject(error.response);
		}
	},
}
