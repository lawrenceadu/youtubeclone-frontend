import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { namedRoutes } from "Router";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import Wrapper from "./Auth/Styles/Auth";

export default () => {
  return (
    <Wrapper>
      <div className="content">
        <Switch>
          <Route exact path={namedRoutes.auth.login} component={Login} />
          <Route exact path={namedRoutes.auth.signup} component={Signup} />
          <Redirect to={namedRoutes.auth.login} />
        </Switch>
      </div>
    </Wrapper>
  );
};
