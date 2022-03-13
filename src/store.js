import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import RootReducer from './reducers/rootReducer';

// exclude logger middleware in production
const middleware = [thunk, logger]
const store = createStore(
    RootReducer,
    applyMiddleware(...middleware)
);

// For me to check reducers in my store
const ActionTypes = {
    INIT: `@@redux/INIT${/* #__PURE__ */ Date.now()}`,
};
store.dispatch({ type: ActionTypes.INIT });

export default store;
