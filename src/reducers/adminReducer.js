import {
	ADMIN_LOADED,
	ADMIN_LOADING,
	AUTH_ERROR_ADMIN,
	LOGIN_FAIL_ADMIN,
	LOGIN_SUCCESS_ADMIN,
	LOGOUT_SUCCESS_ADMIN,
	REGISTER_SUCCESS
} from '../actions/types';

const initialState = {
	adminauthtoken: localStorage.getItem('adminauthtoken'),
	isAuthenticated: null,
	isLoading: false,
	admin: null
};
export default function(state = initialState, action) {
	switch (action.type) {
		case ADMIN_LOADING:
			return {
				...state,
				isLoading: true
			};
		case ADMIN_LOADED:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				admin: action.payload
			};
		case LOGIN_SUCCESS_ADMIN:
			localStorage.setItem('adminauthtoken', action.payload.adminauthtoken);
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				isLoading: false
			};
		case AUTH_ERROR_ADMIN:
		case LOGIN_FAIL_ADMIN:
		case LOGOUT_SUCCESS_ADMIN:
			localStorage.removeItem('adminauthtoken');
			return {
				...state,
				adminauthtoken: null,
				admin: null,
				isAuthenticated: false,
				isLoading: false
			};
		default:
			return state;
	}
}
