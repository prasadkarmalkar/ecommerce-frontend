import axios from '../http-common';
import { tokenConfig } from '../helper/tokenConfig';
import { returnErrors } from './errorActions';
import { ADD_TO_CART, CART_LOADING, DELETE_FROM_CART, GET_CART } from './types';
export const getCart = () => (dispatch, getState) => {
    dispatch(setCartLoading());
    axios.get(`/cart`, tokenConfig(getState))
        .then(res => dispatch({
            type: GET_CART,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const addToCart = (productId, quantity) => (dispatch, getState) => {
    axios.put(`/cart`, { productId, quantity }, tokenConfig(getState))
        .then(res => dispatch({
            type: ADD_TO_CART,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}
export const deleteFromCart = (productId) => (dispatch) => {
    axios.delete(`/cart/${productId}`,tokenConfig())
        .then(res => dispatch({
            type: DELETE_FROM_CART,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const setCartLoading = () => {
    return {
        type: CART_LOADING
    }
}
