import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./Home/Home";
import Feed from "./Feed";
import Signup from "./Auth/Signup";
import Login from "./Auth/Login";
import Logout from "./Auth/Logout";
import Settings from "./Settings/Settings";
import "../stylesheets/shared.css";

import {addUser, updateUser, handleUserLogin, handleUserLogout} from "../actions/user";

class App extends React.Component {
  state = {
    currentUser: null,
    users: [
      {
        id: 0,
        first_name: "Sam",
        last_name: "Apple",
        email: "sam@apple.com",
        password: "password",
        rating: 4,
        profile_picture:
          "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
      },
      {
        id: 1,
        first_name: "John",
        last_name: "Pole",
        email: "john@pole.com",
        password: "password",
        rating: 5,
        profile_picture:
          "https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70",
      },

      {
        id: 2,
        first_name: "Robert",
        last_name: "Hartz",
        email: "robert@hartz.com",
        password: "password",
        rating: 3,
        profile_picture:
          "https://miro.medium.com/max/2048/0*0fClPmIScV5pTLoE.jpg",
      },
    ],

    setState: this.setState.bind(this),
  };


  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={() => (
              <Home
                currentUser={this.state.currentUser}
              />
            )} 
          />
          <Route
            path="/feed"
            component={() => (
              <Feed
                handleUserLogout={handleUserLogout}
                users_state={this.state}
              />
            )}
          />

          <Route
            exact
            path="/signup"
            component={() => (
              <Signup
                users_state={this.state}
                addUser={addUser}
              />
            )}
          />

          <Route
            exact
            path="/login"
            component={() => (
              <Login
                handleUserLogin={handleUserLogin}
                users_state={this.state}
              />
            )}
          />

          <Route
            exact
            path="/logout"
            component={() => (
              <Logout
                logout={handleUserLogout}
                users_state={this.state}
              />
            )}
          />

          <Route 
            exact
            path="/settings"
            component={() => (
              <Settings
                users_state={this.state}
                updateUser={updateUser}

              />
            )}
           />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
