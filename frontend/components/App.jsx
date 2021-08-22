import React from "react";
import { Route, Switch } from "react-router-dom";
import { AuthRoute } from "../util/route_util";
import MainPage from "./main_page/main_page";
import LoginFormContainer from "./session_form/login_form_container";
import SignupFormContainer from "./session_form/signup_form_container";
import NotFound from "./notfound";
import Modal from "../components/modal/modal";
import VideoShow from "../components/show_video/show_video_container";
import SearchResults from "./search/search_results_container";
import NavBar from "./main_page/nav_bar/nav_bar_container";

const App = () => {
  return (
    <div>
      <Modal />
      <NavBar />
      <Switch>
        <AuthRoute path='/login' component={LoginFormContainer} />
        <AuthRoute exact path='/signup' component={SignupFormContainer} />
        <Route exact path='/' component={MainPage} />
        <Route exact path='/watch/:id' component={VideoShow} />
        <Route exact path='/results' component={SearchResults} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;
