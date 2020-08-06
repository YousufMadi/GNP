import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { notifyWarn } from "../Utils/notificationUtils";

import Home from "./Home/Home";
import Feed from "./Feed/Feed";
import Signup from "./Auth/Signup";
import Login from "./Auth/Login";
import Logout from "./Auth/Logout";
import Settings from "./Settings/Settings";
import SettingsAdmin from "./SettingsAdmin/SettingsAdmin";

import "../stylesheets/shared.css";

class App extends React.Component {
  /*

  THIS WILL BE STORED IN THE DATABASE
    ------- Users state ----------
    This state keeps track of all the users which WILL BE STORED IN THE DATABSE
    in the later phase.

    currentUserLocation: Keeps track of the location of the user
    currentUser: Keeps track of the currently logged in user
    users: A list of users.
      - id: The id of the user
      - first_name: First name
      - last_name: Last name
      - email: User's email
      - password: User's password
      - rating: The current rating of the user on a scale of 5
      - active_post: If a user has accepted a post, they cannot accept
                    any other posts until they have completed this post.
      - profile_picture: User's profile picture
      - admin: Whether the user is an admin

  */

  constructor(props){
    super(props)
  }
  state = {
    currentUser: null,
    currentUserLocation: null,
    setState: this.setState.bind(this),
  };

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.getUserLocation,
        this.displayLocationWarning
      );
    } else {
      alert("Geolocation is not supported on this browser");
    }
  }

  displayLocationWarning = () => {
    notifyWarn(
      "We cannot retrieve your location. This app requires location to be enabled in your browser to function correctly."
    );
  };

  getUserLocation = (position) => {
    this.setState({ currentUserLocation: position.coords });
  };

  render() {
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route
              path="/"
              exact
              component={() => <Home users_state={this.state} />}
            />
            <Route
              path="/feed"
              component={() => <Feed app={this} />}
            />

            <Route
              exact
              path="/signup"
              component={() => <Signup app={this} />}
            />

            <Route
              exact
              path="/login"
              component={() => <Login app={this} />}
            />

            <Route
              exact
              path="/logout"
              component={() => <Logout users_state={this.state} />}
            />

            <Route
              exact
              path="/settings"
              component={() => <Settings users_state={this.state} />}
            />

            <Route
              exact
              path="/admin"
              component={() => <SettingsAdmin users_state={this.state} />}
            />
          </Switch>
        </BrowserRouter>
        <ToastContainer />
      </>
    );
  }
}

export default App;
