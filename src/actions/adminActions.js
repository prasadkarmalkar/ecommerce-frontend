
import axios from '../http-common';
import { returnErrors } from './errorActions';
import { tokenConfigAdmin } from '../helper/tokenConfig';
import { ADMIN_LOADED, ADMIN_LOADING, AUTH_ERROR_ADMIN, LOGIN_FAIL_ADMIN, LOGIN_SUCCESS_ADMIN, LOGOUT_SUCCESS_ADMIN } from './types';

export const loadAdmin = () => (dispatch) => {
	// Admin loading
	dispatch({ type: ADMIN_LOADING });

	axios
		.get('/admin/getLoggedInAdmin', tokenConfigAdmin())
		.then((res) =>
			dispatch({
				type: ADMIN_LOADED,
				payload: res.data
			})
		)
		.catch((err) => {
			// dispatch(returnErrors(err.response.data.errors, err.response.status));
			dispatch({
				type: AUTH_ERROR_ADMIN
			});
		});
};


export const loginAdmin = ({ email, password }) => (dispatch) => {
	// headers
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	//request body
	const body = JSON.stringify({ email, password });

	axios
		.post('/admin/login', body, config)
		.then((res) => {
			dispatch({
				type: LOGIN_SUCCESS_ADMIN,
				payload: res.data
			});
		})
		.catch((err) => {
			dispatch(returnErrors(err.response.data.errors, err.response.status, 'LOGIN_FAIL'));
			dispatch({
				type: LOGIN_FAIL_ADMIN
			});
		});
};
// logout user
export const logoutAdmin = () => {
	return {
		type: LOGOUT_SUCCESS_ADMIN
	};
};
