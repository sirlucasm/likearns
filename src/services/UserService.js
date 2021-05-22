import API from '../configs/axios';
import axios from 'axios';
import Cookie from 'js-cookie';
import jwt from 'jsonwebtoken';

const sessionToken = Cookie.get('session_token');

const headers = {
	Authorization: `Bearer ${sessionToken}`,
};

const getIpAddress = async () => {
	const { data } = await axios.get('https://api.ipgeolocation.io/getip');
	return data.ip
}

export default {
	async createUser(params) {
		try {
			params.current_ip = await getIpAddress();
			const res = await API.post('users', { params });
			if (res.status === 201) Cookie.set('session_token', res.data.token, { expires: 7 });
			return res;
		} catch (error) {
			return Promise.reject(error.response);
		}
	},

	async login(params) {
		try {
			const res = await API.post('users/login', { params });
			if (res.status === 200) Cookie.set('session_token', res.data.token, { expires: 7 });
			return res;
		} catch (error) {
			return Promise.reject(error.response);
		}
	},

	async authenticated(token) {
		const customHeaderToken = {
			Authorization: `Bearer ${token}`
		}
		const res = await API.get('users/me', { headers: customHeaderToken });
		return res.status == 200;
	},

	async currentUser(token) {
		try {
			const customHeaderToken = {
				Authorization: `Bearer ${token}`
			}
			const { data } = await API.get('users/me', { headers: customHeaderToken });
			return data;
		} catch (error) {
			return Promise.reject(error.response);
		}
	},

	async sendEmailVerification() {
		try {
			localStorage.getItem('@likearns/authentication_token')
			const res = await API.get('mail/send-verification', { headers });
			return res;
		} catch (error) {
			return Promise.reject(error.response);
		}
	},

	async activateAccount(params) {
		try {
			const res = await API.post('users/verify-account', { params });
			return res;
		} catch (error) {
			return Promise.reject(error.response);
		}
	},

	async gainPointsFollowing(params) {
		try {
			const res = await API.get('users/gain-points/following', { params, headers });
			return res;
		} catch (error) {
			return Promise.reject(error.response);
		}
	},

	async gainPointsLiking(params) {
		try {
			const res = await API.get('users/gain-points/liking', { params, headers });
			return res;
		} catch (error) {
			return Promise.reject(error.response);
		}
	},

	async verifyIfUserFollowed(params) {
		try {
			const res = await API.get('users/verify-followed', { headers, params });
			return res.data;
		} catch (error) {
			return Promise.reject(error.response);
		}
	},
	
	async verifyIfUserPostLiked(params) {
		try {
			const res = await API.get('users/verify-liked', { headers, params });
			return res.data;
		} catch (error) {
			return Promise.reject(error.response);
		}
	},

	async updateAccount(params) {
		try {
			const res = await API.put('users', { params }, { headers });
			return res;
		} catch (error) {
			return Promise.reject(error.response);
		}
	},

	async resetPassword(params) {
		try {
			const res = await API.post('users/reset-password', { params, headers });
			return res;
		} catch (error) {
			return Promise.reject(error.response);
		}
	},

	async deleteAccount(params) {
		try {
			const res = await API.post('users/delete', params, { headers });
			return res;
		} catch (error) {
			return Promise.reject(error.response);
		}
	},

	async verifyAuthenticity(params) {
		try {
			const res = await API.post('users/verify-authenticity', params, { headers });
			return res.data;
		} catch (error) {
			return Promise.reject(error.response);
		}
	},

	async sendResetPasswordEmail(params) {
		try {
			const res = await API.post('mail/send-reset-password', params);
			return res;
		} catch (error) {
			return Promise.reject(error.response);
		}
	},

	async topSharers() {
		try {
			const res = await API.get('users/top-sharers');
			return res.data;
		} catch (error) {
			return Promise.reject(error.response);
		}
	},

	async isVerifiedEmail() {
		try {
			const res = await API.get('users/is-verified-email');
			return res.data;
		} catch (error) {
			return Promise.reject(error.response);
		}
	},

	async claimReward(params) {
		try {
			const token = jwt.sign(params, process.env.NEXT_PUBLIC_JWT_PRIVATE_KEY,	{
				expiresIn: '10m',
            });
			const data = {};
			data.rewardToken = token;
			const res = await API.post('users/claim-reward', data, { headers });
			return res.data;
		} catch (error) {
			return Promise.reject(error.response);
		}
	},

	async resetReward(params) {
		try {
			const token = jwt.sign(params, process.env.NEXT_PUBLIC_JWT_PRIVATE_KEY,	{
				expiresIn: '10m',
            });
			const data = {};
			data.rewardToken = token;
			const res = await API.post('users/reset-reward', data, { headers });
			return res.data;
		} catch (error) {
			return Promise.reject(error.response);
		}
	},

	async importProfilePic(params) {
		try {
			const res = await API.post('users/import-profile-picture', params, { headers });
			return res.data;
		} catch (error) {
			return Promise.reject(error.response);
		}
	},

	async logout() {
		Cookie.remove('session_token');
		localStorage.removeItem('@likearns/twitter_token_secret');
		localStorage.removeItem('@likearns/twitter_user_info');
	},
}
