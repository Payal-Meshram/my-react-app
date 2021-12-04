import { LOGOUT, SET_LOGGED_IN_USER, SET_TOKEN, SET_AUTH } from '../actions/authentication';

const initialState = {
    isAuthenticated: false,
    user: {},
    tokens: {}
};

const Authentication = (state = initialState, actions) => {
    switch (actions.type) {
        case SET_LOGGED_IN_USER:
            return {
                ...state, user: actions.data
            }
        case SET_TOKEN:
            return {
                ...state, tokens: actions.data
            }
        case LOGOUT:
            return {
                ...state, user: {}
            }
        case SET_AUTH:
            return {
                ...state,
                isAuthenticated: actions.data
            }
        default: return state;
    }
};
export default Authentication;