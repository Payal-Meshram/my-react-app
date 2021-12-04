import React from "react";

import { Route, Switch } from "react-router";
import Home from "./Pages/Home";
import View from "./Student/View";
import Edit from "./Student/Edit";
import List from "./Student/List";
import SignUp from './signup';
import SignIn from './Pages/login';

const MainRoute = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={List} />
        <Route exact path="/home/login" component={Home} />
        <Route exact path="/view/:id" component={View} />
        <Route exact path="/edit/:id" component={Edit} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
      </Switch>
    </>
  );
};

export default MainRoute;
