import API from '../configs/axios';

export default {
	async getUserNotifications(token) {
		try {
			const headers = {
				Authorization: `Bearer ${token}`,
			};
			const res = await API.get('users-notifications', { headers });
			return res.data;
		} catch (error) {
			return Promise.reject(error.response);
		}
	},
}
