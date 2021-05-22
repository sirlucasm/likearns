import API from '../configs/axios';
import Cookie from 'js-cookie';

const sessionToken = Cookie.get('session_token');

export default {
	getCurrentUser() {
		const user = localStorage.getItem('@likearns/twitter_user_info');
		return user && JSON.parse(user);
	},

	async auth() {
		try {
			const headers = {
				Authorization: `Bearer ${sessionToken}`,
			};
			const { data } = await API.get('twitter/auth', { headers });
			localStorage.setItem('@likearns/twitter_token_secret', data.tokenSecret);
			return data;
		} catch (error) {
			return Promise.reject(error);
		}
	},

	async sendOAuthToken(params) {
		try {
			const headers = {
				Authorization: `Bearer ${sessionToken}`,
			};
			const tokenSecret = localStorage.getItem('@likearns/twitter_token_secret');
			params.tokenSecret = tokenSecret;
			const { data } = await API.post('twitter/auth/callback', params, { headers });
			localStorage.setItem('@likearns/twitter_user_info', JSON.stringify(data));
			return data;
		} catch (error) {
			return Promise.reject(error);
		}
	},

	async followUser(params) {
		try {
			const headers = {
				Authorization: `Bearer ${sessionToken}`,
			};
			const { data } = await API.post('twitter/followers/follow', params, { headers });
			return data;
		} catch (error) {
			return Promise.reject(error);
		}
	},

	async likePost(params) {
		try {
			const headers = {
				Authorization: `Bearer ${sessionToken}`,
			};
			const { data } = await API.post('twitter/posts/like', params, { headers });
			return data;
		} catch (error) {
			return Promise.reject(error);
		}
	},

	async verifyFriendship(params, friendName) {
		try {
			const headers = {
				Authorization: `Bearer ${sessionToken}`,
			};
			params.friendName = friendName;
			const { data } = await API.get('twitter/followers/check-friendship', { headers, params });
			return data;
		} catch (error) {
			return Promise.reject(error);
		}
	},

	async logoutUser() {
		try {
			localStorage.removeItem('@likearns/twitter_token_secret');
			localStorage.removeItem('@likearns/twitter_user_info');
		}
		catch (error) {
			return Promise.reject(error);
		}
	}
}
