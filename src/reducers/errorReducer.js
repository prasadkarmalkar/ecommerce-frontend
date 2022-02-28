import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

const initialState = {
    errors: [],
    status: null,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ERRORS:
            return {
                errors: action.payload.errors,
                status: action.payload.status,
            };

        case CLEAR_ERRORS:
            return {
                errors: [],
                status: 200,
            };

        default:
            return state;
    }
}