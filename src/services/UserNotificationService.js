import API from '../configs/axios';
import Cookie from 'js-cookie';

const sessionToken = Cookie.get('session_token');

const headers = {
	Authorization: `Bearer ${sessionToken}`,
};

export default {
	async getUserNotifications(token) {
		try {
			const customHeaderToken = {
				Authorization: `Bearer ${token}`
			}
			const res = await API.get('users-notifications', { headers: customHeaderToken });
			return res.data;
		} catch (error) {
			return Promise.reject(error.response);
		}
	},

	async setNotificationReaded(params) {
		try {
			const res = await API.post('users-notifications/read-notification', params, { headers });
			return res.data;
		} catch (error) {
			return Promise.reject(error.response);
		}
	},
}
