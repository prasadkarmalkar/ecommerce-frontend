import { AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED, USER_LOADING } from "./types";
import axios from '../http-common';import { returnErrors } from './errorActions';
import { tokenConfig } from '../helper/tokenConfig'


export const loadUser = () => (dispatch) => {
    // User loading
    dispatch({ type: USER_LOADING });

    axios.get('/user/getLoggedInUser', tokenConfig())
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            // dispatch(returnErrors(err.response.data.errors, err.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        });
}

export const register = ({ email, mobile_number, password }) => dispatch => {
    // headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //request body
    const body = JSON.stringify({ email, mobile_number, password });

    axios.post('/user', body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            console.log(err.response)
            dispatch(returnErrors(err.response.data.errors, err.response.status, 'REGISTER_FAIL'));
            dispatch({
                type: REGISTER_FAIL
            });
        });
}

export const login = ({ email, password }) => dispatch => {
    // headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //request body
    const body = JSON.stringify({ email, password });

    axios.post('/user/login', body, config)
        .then(res =>{ dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })})
        .catch(err => {
            dispatch(returnErrors(err.response.data.errors, err.response.status, 'LOGIN_FAIL'));
            dispatch({
                type: LOGIN_FAIL
            });
        });
}
export const update = ({ mobile_number, address, state, pincode }) => dispatch => {
    // User loading
    dispatch({ type: USER_LOADING });

    //request body
    const body = JSON.stringify({ mobile_number, address, state, pincode });

    axios.put('/user/', body, tokenConfig()).then(res => dispatch({
        type: USER_LOADED,
        payload: res.data
    }))
        .catch(err => {
            // dispatch(returnErrors(err.response.data.errors, err.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        });

}
// logout user
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}
