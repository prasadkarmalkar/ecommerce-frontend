import { combineReducers } from 'redux';
import productReducer from './productReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import cartReducer from './cartReducer';
import adminReducer from './adminReducer';
import orderReducer from './orderReducer';

export default combineReducers({
    products: productReducer,
    error: errorReducer,
    auth: authReducer,
    cart: cartReducer,
    admin: adminReducer,
    order:orderReducer
})