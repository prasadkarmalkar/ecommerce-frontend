import { ORDER_LOADED, ORDER_LOADING, CREATE_ORDER, CLEAR_ORDER } from '../actions/types';

const initialState = {
	order: null,
	loading: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		// case GET_CART:
		//     return {
		//         ...state,
		//         cart: action.payload,
		//         loading: false
		//     }

		case CREATE_ORDER:
			return {
				...state,
				order: action.payload
			};

		// case DELETE_FROM_CART:
		//     return {
		//         ...state,
		//         cart: action.payload
		//     }

		case ORDER_LOADING:
			return {
				...state,
				loading: true
			};

		case CLEAR_ORDER:
			return {
				...state,
				order: null
			};

		default:
			return state;
	}
}
