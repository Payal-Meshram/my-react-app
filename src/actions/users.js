import AxiosInstance from '../axiosInstance';
import { setToken, logout } from './authentication';
export const fetchUsers = async (body) => {
    const url = '/users';
    return AxiosInstance.get(url).then(resp => {
        console.log('resp', resp);
    }).catch(err => {
        console.log('err', err);
    });
};

export const getNewTokens = (body) => {
    return dispatch => {
        const url = '/auth/refresh-tokens';
        return AxiosInstance.post(url, body).then(resp => {
            console.log('getNewTokens resp*****', resp);
            const data = { isSuccess: true, status: resp.status, ...resp.data };
            dispatch(setToken(resp.data));
            return data;
        }).catch(err => {
            console.log('err', err);
            const resp = err.response;
            const data = { isSuccess: false, status: resp.status, ...resp.data };
            dispatch(setToken({}));
            dispatch(logout());
        });
    }
};