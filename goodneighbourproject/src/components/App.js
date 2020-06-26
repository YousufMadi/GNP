import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./Home";
import Feed from "./Feed";
import Signup from "./Auth/Signup";
import Login from "./Auth/Login";
import Settings from "./Settings/Settings";
import history from "../history";
import "../stylesheets/shared.css";

import { v4 as uuid } from "uuid";

class App extends React.Component {
  state = {
    currentUser: null,
    users: [
      {
        id: uuid,
        first_name: "Sam",
        last_name: "Apple",
        email: "sam@apple.com",
        password: "password",
        is_logged_in: false,
      },
      {
        id: uuid,
        first_name: "John",
        last_name: "Pole",
        email: "john@pole.com",
        password: "password",
        is_logged_in: false,
      },

      {
        id: uuid,
        first_name: "Robert",
        last_name: "Hartz",
        email: "robert@hartz.com",
        password: "password",
        is_logged_in: false,
      },
    ],
  };

  addUser = (first_name, last_name, email, password) => {
    const newUser = {
      id: uuid,
      first_name,
      last_name,
      email,
      password,
      is_logged_in: false,
    };

    this.setState({ users: [...this.state.users, newUser] });
    console.log(this.state.users);
  };

  handleUserLogin = (user) => {
    this.setState({ currentUser: user });
  };

  render() {
    console.log(this.state.currentUser);
    return (
      <BrowserRouter history={history}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route
            path="/feed"
            component={() => <Feed currentUser={this.state.currentUser} />}
          />

          <Route
            exact
            path="/signup"
            component={() => (
              <Signup
                currentUser={this.state.currentUser}
                addUser={this.addUser}
              />
            )}
          />

          <Route
            exact
            path="/login"
            component={() => (
              <Login
                currentUser={this.state.currentUser}
                handleUserLogin={this.handleUserLogin}
                users={this.state.users}
              />
            )}
          />

          <Route path="/settings" exact component={Settings} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
