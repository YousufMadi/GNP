import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import Home from "./Home";
import Feed from "./Feed";
import history from "../history";

import '../stylesheets/shared.css'

class App extends React.Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/feed" exact component={Feed} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
