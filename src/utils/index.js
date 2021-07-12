import moment from 'moment';

moment.locale('pt-BR');

const COST_PER_FOLLOWER = 30;
const COST_PER_LIKE = 20;
const COST_EARNS = 0.0008;

export function parseData(data) {
	if (!data) return {};
	if (typeof data === 'object') return data;
	if (typeof data === 'string') return JSON.parse(data);

	return {};
}

export function saveTimeClicked(time) {
	localStorage.setItem('@likearns/time_email_verification_send', time);
}
export function getTimeStored() {
	return localStorage.getItem('@likearns/time_email_verification_send');
}
export function formatTime(seconds) {
	let currentMinutes = Math.floor(seconds > 59 ? seconds / 60 : 0);
	let currentSeconds = seconds > 59 ? seconds - (60 * currentMinutes) : seconds;
	if (seconds === 0) return null;
	return `${currentMinutes < 10 ? '0' + currentMinutes : currentMinutes}:${currentSeconds < 10 ? '0' + currentSeconds : currentSeconds}`;
}

export function calculateFollowersLostPoints(fnum) {
	return fnum * COST_PER_FOLLOWER;
}

export function calculateLikesLostPoints(lnum) {
	return lnum * COST_PER_LIKE;
}

export function calculatePointsToEarn(lostPoints) {
	let earnPoints = lostPoints / 2;
	if (lostPoints >= 10) earnPoints = lostPoints / 10;
	return parseInt(earnPoints);
}

const currencyOptions = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
}).resolvedOptions();

export function calculateEarns(points, locale='pt-BR') {
	return (points * COST_EARNS).toLocaleString(locale, {
		...currencyOptions,
		style: 'decimal',
	});
}

export function convertValueToEarns(value, locale='pt-BR') {
	return value.toLocaleString(locale, {
		...currencyOptions,
		style: 'decimal',
	});
}

export function convertEarnsToPoints({ earns, points, wantEarn }) {
	return (points * wantEarn / earns);
}

export function convertSocialMediaToString(socialMedia) {
	if (socialMedia === 1) return 'Instagram';
	else if (socialMedia === 2) return 'Twitter';
}

export function convertWithdrawTypeToString(withdraw_type) {
	if (withdraw_type === 1) return 'Paypal';
	else if (withdraw_type === 2) return 'Pix';
}

export function getCurrentYear() {
	return new Date().getFullYear();
}

export function getCurrentMonth() {
	const month = new Date().getMonth() + 1;
	return month < 10 ? '0' + month.toString() : month.toString();
}

export function getCurrentDay() {
	return new Date().getDate().toString();
}

export function convertDateBR(dateString) {
	const date = new Date(dateString);
	const month = date.getMonth() + 1;
	return `${date.getFullYear()}-${month < 10 ? '0' + month.toString() : month.toString()}-${date.getDate()}`;
}

export function verifyUserAgent() {
	if (navigator.userAgent.match(/Android/i)
		|| navigator.userAgent.match(/webOS/i)
		|| navigator.userAgent.match(/iPhone/i)
		|| navigator.userAgent.match(/iPad/i)
		|| navigator.userAgent.match(/iPod/i)
		|| navigator.userAgent.match(/BlackBerry/i)
		|| navigator.userAgent.match(/Windows Phone/i)
	) {
		return true;
	}
	else {
		return false;
	}
}

export function topSharersBgColorChange(position) {
	if (position === 1) return {
		backgroundColor: '#dcedec',
		color: '#524949'
	}
	if (position === 2) return {
		backgroundColor: '#ffd700',
		color: '#524949'
	}
	if (position === 3) return {
		backgroundColor: '#c0c0c0',
		color: '#f9f9f9'
	}
	if (position === 4) return {
		backgroundColor: '#cd7f32',
		color: '#524949'
	}
	return {
		backgroundColor: '#f9f9f9',
		color: '#090909'
	}
}

export function chartDataSet(legend, data) {
	const days = [];
	const obtained_values = [];
	data?.map(res => {
		days.push(res.day_name)
		obtained_values.push(res.obtained_values)
	});
	return {
		labels: days,
		datasets: [{
			label: legend,
			data: obtained_values,
			backgroundColor: [
				'rgba(201, 64, 64, .3)',
			],
			borderColor: [
				'rgba(201, 64, 64, 1)',
			],
			borderWidth: 1
		}]
	}
}

export function dailyRewardDateVerify(dateTimeString) {
	const rewardClaimed = moment(dateTimeString);
	const oneDayAfterClaimed = rewardClaimed.add(1, 'days');
	const now = moment(new Date());
	let hours = now.diff(oneDayAfterClaimed, 'hours');
	let minutes = now.diff(oneDayAfterClaimed, 'minute');
	if (hours < 0) hours = Math.abs(hours);
	else hours = null;
	if (minutes < 0) minutes = Math.abs(minutes);
	else minutes = null;
	if (minutes >= 60) minutes = minutes - (hours * 60);
	return {
		hours,
		minutes
	};
}

export function convertNotificationTypeString(notificationType) {
	if (notificationType == 1) return 'seguindo';
	if (notificationType == 2) return 'curtiu';
}
