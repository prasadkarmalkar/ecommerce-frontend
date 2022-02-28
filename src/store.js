import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleWare = [ thunk ];

const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleWare,)));

export default store;


// For Local 
// const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleWare,), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
// For Production 
// const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleWare,)));
