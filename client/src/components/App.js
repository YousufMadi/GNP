import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { connect } from "react-redux";

import Home from "./Home/Home";
import Feed from "./Feed/Feed";
import Signup from "./Auth/Signup";
import Login from "./Auth/Login";
import Logout from "./Auth/Logout";
import Settings from "./Settings/Settings";
import SettingsAdmin from "./SettingsAdmin/SettingsAdmin";

import { readCookie } from "../actions/user";

import "../stylesheets/shared.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.props.readCookie();
  }

  componentDidMount() {}

  render() {
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={() => <Home />} />
            <Route path="/feed" component={() => <Feed />} />
            <Route exact path="/signup" component={() => <Signup />} />
            <Route exact path="/login" component={() => <Login />} />
            <Route exact path="/settings" component={() => <Settings />} />
            <Route exact path="/admin" component={() => <SettingsAdmin />} />
            <Route
              exact
              path="/logout"
              component={() => <Logout users_state={this.state} />}
            />
          </Switch>
        </BrowserRouter>
        <ToastContainer />
      </>
    );
  }
}

export default connect(null, { readCookie })(App);
