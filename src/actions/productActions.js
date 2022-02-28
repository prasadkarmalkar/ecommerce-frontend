import axios from '../http-common';
import { tokenConfig, tokenConfigAdmin } from '../helper/tokenConfig';
import { returnErrors } from './errorActions';
import { ADD_PRODUCT, DELETE_PRODUCT, GET_ONE_PRODUCT, GET_PRODUCTS, PRODUCT_LOADING } from './types';

export const getProducts = (page) => (dispatch) => {
	dispatch(setItemsLoading());
	axios
		.get(`/product?page=${page}&limit=50`)
		.then((res) =>
			dispatch({
				type: GET_PRODUCTS,
				payload: res.data
			})
		)
		.catch(
			(err) => console.log(err)
			// dispatch(returnErrors(err.response.data.errors, err.response.status))
		);
};

export const addProduct = (product) => (dispatch) => {
	axios
		.post('/product', product, tokenConfigAdmin())
		.then((res) =>
			dispatch({
				type: ADD_PRODUCT,
				payload: res.data
			})
		)
		.catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const deleteProduct = (id) => (dispatch) => {
	axios
		.delete(`/product/${id}`, tokenConfigAdmin())
		.then((res) =>
			dispatch({
				type: DELETE_PRODUCT,
				payload: res.data
			})
		)
		.catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const getOneProduct = (id) => (dispatch) => {
	axios
		.get(`/product/${id}`)
		.then((res) =>
			dispatch({
				type: GET_ONE_PRODUCT,
				payload: res.data
			})
		)
		.catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};
export const addReview = (id, review) => (dispatch) => {
	axios.post(`/product/${id}/review`, review, tokenConfig()).then((res) =>
		dispatch({
			type: GET_ONE_PRODUCT,
			payload: res.data
		})
	);
};
export const setItemsLoading = () => {
	return {
		type: PRODUCT_LOADING
	};
};
