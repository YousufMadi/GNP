import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./Home";
import Feed from "./Feed";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Signup from "./Auth/Signup";
import Login from "./Auth/Login";
import history from "../history";

import '../stylesheets/shared.css';

import {v4 as uuid} from "uuid"; 

class App extends React.Component {

  state = {
    users: [
      {
        id: uuid,
        first_name: "Sam",
        last_name: "Apple",
        email: "sam@apple.com",
        password: "password",
        is_logged_in: false
      },

      {
        id: uuid,
        first_name: "John",
        last_name: "Pole",
        email: "john@pole.com",
        password: "password",
        is_logged_in: false
      },

      {
        id: uuid,
        first_name: "Robert",
        last_name: "Hartz",
        email: "robert@hartz.com",
        password: "password",
        is_logged_in: false
      },

    ]
  }

  addUser = (first_name, last_name, email, password) => {
    const newUser = {
      id: uuid,
      first_name,
      last_name,
      email,
      password,
      is_logged_in: false
    }

    this.setState({ users: [...this.state.users, newUser] });
    console.log(this.state.users)
  }


  render() {
    return (
      <BrowserRouter>
      <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/feed" component={Feed} />
            
            <Route exact path='/signup' render={() => 
                              (<Signup addUser={this.addUser}/>)}/>

            <Route exact path='/login' render={() => 
                              (<Login users={this.state.users}/>)}/>

          </Switch>
        <Footer />
      </BrowserRouter>
    );
  }
}

export default App;
