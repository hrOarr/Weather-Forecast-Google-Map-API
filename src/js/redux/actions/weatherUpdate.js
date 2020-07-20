import * as actionTypes from './actionTypes';
import axios from 'axios';
const API_KEY_GOOGLE = "**************";

export const weatherUpdateInit = () => {
	return {
		type: actionTypes.WEATHER_UPDATE_VIEW_INIT
	};
};

export const weatherUpdateSuccess = (result) => {
	return {
		type: actionTypes.WEATHER_UPDATE_VIEW_SUCCESS,
		JSON: result
	};
};

export const weatherUpdateFail = (error) => {
	return {
		type: actionTypes.WEATHER_UPDATE_VIEW_FAIL,
		error: error
	};
};

export const weatherUpdate = (data) => {
	return dispatch => {
		dispatch(weatherUpdateInit);
		const GOOGLE_URL_HOME = 'https://maps.googleapis.com/maps/api/geocode/json?address=${data}&key=${API_KEY_GOOGLE}';
		axios.get(GOOGLE_URL_HOME)
		.then(
			response => {
				dispatch(weatherUpdateSuccess(
					response.data
				));
		})
		.catch(error => {
			alert("Something from from action page");
			dispatch(weatherUpdateFail(error));
		});
	};
};