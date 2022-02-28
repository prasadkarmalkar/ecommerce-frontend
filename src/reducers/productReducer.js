import {
	GET_PRODUCTS,
	ADD_PRODUCT,
	UPDATE_PRODUCT,
	DELETE_PRODUCT,
	PRODUCT_LOADING,
	GET_ONE_PRODUCT
} from '../actions/types';

const initialState = {
	products: [],
	page: 0,
	pages: 0,
	loading: false,
	singleproduct: null
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_PRODUCTS:
			return {
				...state,
				products: action.payload.products,
				page: action.payload.page,
				pages: action.payload.pages,
				loading: false
			};

		case ADD_PRODUCT:
			return {
				...state,
				products: [ action.payload, ...state.products ]
			};

		case DELETE_PRODUCT:
			return {
				...state,
				products: state.products.filter((product) => product._id !== action.payload._id)
			};

		case UPDATE_PRODUCT:
			const { id, data } = action.payload;
			return {
				...state,
				items: state.items.map((item) => {
					if (item._id === id) {
						item = data;
					}
				})
			};

		case PRODUCT_LOADING:
			return {
				...state,
				loading: true
			};

		case GET_ONE_PRODUCT:
			return {
				...state,
				singleproduct: action.payload
			};

		default:
			return state;
	}
}
