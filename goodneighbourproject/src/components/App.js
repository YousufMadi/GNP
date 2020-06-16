import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import Feed from "./Feed";
import Home from "./Home";
import history from "../history";

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/feed" exact component={Feed} />
        </Switch>
      </Router>
    );
  }
}

export default App;
