import AxiosInstance from '../axiosInstance';
// Action types
export const LOGOUT = 'LOGOUT';
export const SET_TOKEN = 'SET_TOKEN';
export const SET_LOGGED_IN_USER = 'SET_LOGGED_IN_USER';
export const SET_AUTH = 'SET_AUTH';

// Actions
export const loginSuccess = (data) => ({
    type: SET_LOGGED_IN_USER,
    data
});

export const logout = (data) => ({
    type: LOGOUT,
    data
});

export const setToken = (data) => ({
    type: SET_TOKEN,
    data
});

export const setAuthStatus = data => ({
    type: SET_AUTH,
    data
});

// Apis
export const loginWithCred = (body) => {
    return (dispatch) => {
        return AxiosInstance.post('/auth/login', body).then(resp => {
            console.log('resp', resp);
            const data = { isSuccess: true, status: resp.status, ...resp.data };
            dispatch(loginSuccess(data.user));
            dispatch(setToken(data.tokens));
            return data;
        }).catch(err => {
            return { isSuccess: false, status: err.response.status };
        });
    };
};