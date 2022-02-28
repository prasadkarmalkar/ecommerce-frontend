import axios from '../http-common';
import { tokenConfig } from '../helper/tokenConfig';
import { returnErrors } from './errorActions';
import { ORDER_LOADED, ORDER_LOADING, CREATE_ORDER, CLEAR_ORDER } from './types';
// export const getCart = () => (dispatch, getState) => {
//     dispatch(setCartLoading());
//     axios.get(`/cart`, tokenConfig(getState))
//         .then(res => dispatch({
//             type: GET_CART,
//             payload: res.data
//         }))
//         .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
// }

export const createOrder = () => (dispatch) => {
	axios
		.get(`/order/createOrder`, tokenConfig())
		.then((res) => {
			dispatch({
				type: CREATE_ORDER,
				payload: res.data
			});
		})
		.catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};
// export const deleteFromCart = (productId) => (dispatch) => {
//     axios.delete(`/cart/${productId}`,tokenConfig())
//         .then(res => dispatch({
//             type: DELETE_FROM_CART,
//             payload: res.data
//         }))
//         .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
// }

export const setOrderLoading = () => {
	return {
		type: ORDER
	};
};
export const clearOrder = () => {
	return {
		type: CLEAR_ORDER
	};
};
