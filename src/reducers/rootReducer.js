import { combineReducers } from 'redux';
import Test from './test';
import Authentication from './Authentication';

const appReducer = combineReducers({
    Test,
    Auth: Authentication
});
const RootReducer = (state, actions) => {
    // logout states clear => add condition for logout actions return state= undefined;
    return appReducer(state, actions);

};
export default RootReducer;