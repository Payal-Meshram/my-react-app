import React, { useState, useEffect } from "react";
import "./App.css";
import MainRoute from "./Components/MainRoute";
import { useDispatch, useSelectore } from 'react-redux';
import { setAuthStatus, setToken } from './actions/authentication';

const App = props => {
  const disptach = useDispatch();

  useEffect(
    () => {
      retriveTokens();
    },
    []
  );

  const retriveTokens = () => {
    const tokens = JSON.parse(localStorage.getItem('tokens'));
    disptach(setAuthStatus(tokens && tokens.access ? true : false));
    disptach(setToken(tokens && tokens.access ? tokens : {}));
    // if (!tokens) {
    //   props.history.push('/signin');
    // }
  };

  return (
    <>
      <MainRoute />
    </>
  );
};

export default App;
