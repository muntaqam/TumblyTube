import React from "react";
import { Route, Switch } from "react-router-dom";
import { AuthRoute } from "../util/route_util";
import NavBarContainer from "./nav_bar/nav_bar_container";
import LoginFormContainer from "./session_form/login_form_container";
import SignupFormContainer from "./session_form/signup_form_container";
import NotFound from "./notfound";

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={NavBarContainer} />
        <AuthRoute exact path="/login" component={LoginFormContainer} />
        <AuthRoute exact path="/signup" component={SignupFormContainer} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;
