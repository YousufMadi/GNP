import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import Home from "./Home";
import Feed from "./Feed";
import Navbar from "./Navbar";
import Signup from "./Auth/Signup";
import history from "../history";

import '../stylesheets/shared.css'

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
      <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/feed" exact component={Feed} />
          <Route path="/signup" exact component={Signup} />
        </Switch>
      </Router>
    );
  }
}

export default App;
