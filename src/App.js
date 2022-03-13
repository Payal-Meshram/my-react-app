import React, { useState, useEffect } from "react";
import "./App.css";
import MainRoute from "./Components/MainRoute";
import { useDispatch, useSelector } from 'react-redux';
import { setAuthStatus, setToken } from './actions/authentication';
import { useHistory } from 'react-router-dom';
import AxiosInstance from './axiosInstance';
import { getNewTokens } from './actions/users';

const App = props => {
  const dispatch = useDispatch();
  const history = useHistory();

  // Redux states
  const tokens = useSelector(state => state.Auth.tokens);

  useEffect(
    () => {
      console.log('**** token redux callback', tokens.refresh);
      setAccessTokenInAxios();
      if (tokens && tokens.refresh) {
        RefreshTokenInterceptor();
      }
    },
    [tokens]
  );

  useEffect(
    () => {
      retriveTokens();
    },
    []
  );

  const retriveTokens = () => {
    const tokens = JSON.parse(localStorage.getItem('tokens'));
    dispatch(setToken(tokens && tokens.access ? tokens : {}));
    if (!tokens) {
      history.push('/signin');
    }
  };

  const setAccessTokenInAxios = () => {
    const accessToken = tokens && tokens.access ? tokens.access.token : '';
    AxiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    dispatch(setAuthStatus(tokens && tokens.access ? true : false));
  };

  const RefreshTokenInterceptor = () => {
    AxiosInstance.interceptors.response.use(function (response) {
      return response;
    }, async function (error) {
      const reqUrl = error.response.config.url;
      if (error.response.status === 401 && reqUrl !== '/auth/refresh-tokens' && reqUrl !== '/auth/login') {
        fetchNewTokens();
      }
      return Promise.reject(error);
    });
  };

  const fetchNewTokens = async () => {
    const refreshToken = tokens && tokens.refresh ? tokens.refresh.token : '';
    const resp = dispatch(getNewTokens({ refreshToken }));
    if (!resp.isSuccess) {
      history.push('/signin');
    }
  }

  return (
    <>
      <MainRoute />
    </>
  );
};

export default App;
