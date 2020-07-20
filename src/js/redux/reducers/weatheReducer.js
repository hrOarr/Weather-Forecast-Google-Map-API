import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "./utility";

const initialState = {
	loading: false,
	JSON: {},
	error: null
};

const weatheUpdateInit = (state, action) => {
	return updateObject(state,{
		loading: true,
		JSON: {},
		error: null
	});
};

const weatheUpdateSuccess = (state, action) => {
	return updateObject(state,{
		loading: false,
		JSON: action.JSON,
		error: null
	});
};

const weatheUpdateFail = (state, action) => {
	return updateObject(state,{
		loading: false,
		JSON: {},
		error: action.error
	});
};

const reducer = (state = initialState, action) => {
	Switch(action.type){
		case actionTypes.WEATHER_UPDATE_VIEW_INIT:
		    return weatheUpdateInit(state, action);
		case actionTypes.WEATHER_UPDATE_VIEW_SUCCESS:
		    return weatheUpdateSuccess(state, action);
		case actionTypes.WEATHER_UPDATE_VIEW_FAIL:
		    return weatheUpdateFail(state, action);
		default:
		    return state;
	}
};

export default reducer;