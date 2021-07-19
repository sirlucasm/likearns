import API from '../configs/axios';
import Cookie from 'js-cookie';

const sessionToken = Cookie.get('session_token');

const headers = {
	Authorization: `Bearer ${sessionToken}`,
};

export default {
	async withdrawList(params) {
		try {
			const res = await API.get('moderators/users-withdraws', { params, headers });
			return res.data;
		} catch (error) {
			return Promise.reject(error.response);
		}
	},
}
