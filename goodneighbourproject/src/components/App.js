import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./Home/Home";
import Feed from "./Feed";
import Signup from "./Auth/Signup";
import Login from "./Auth/Login";
import Logout from "./Auth/Logout";
import Settings from "./Settings/Settings";
import "../stylesheets/shared.css";

import { addUser, updateUser, handleUserLogin, handleUserLogout } from "../actions/user";
import { filterPosts, addPostToState, deletePost } from "../actions/timeline";

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
    posts: [
        {
          id: 0,
          reimbursement: "Cash",
          items: ["Chips", "Apples", "Flour"],
          author: 1,
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt magni, voluptas debitis similique porro a molestias consequuntur earum odio officiis natus, amet hic, iste sed dignissimos esse fuga! Minus, alias.",
        },
        {
          id: 1,
          reimbursement: "Cheque",
          items: ["Honey Nut Cheerios"],
          author: 2,
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt magni, voluptas debitis similique porro a molestias consequuntur earum odio officiis natus, amet hic, iste sed dignissimos esse fuga! Minus, alias.",
        },
        {
          id: 2,
          reimbursement: "E-transfer",
          items: ["Drawer", "Brush", "Canvas", "Lamp", "Blouse"],
          author: 0,
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt magni, voluptas debitis similique porro a molestias consequuntur earum odio officiis natus, amet hic, iste sed dignissimos esse fuga! Minus, alias.",
        },
        {
          id: 3,
          reimbursement: "Cash",
          items: [
            "Boat",
            "Frame",
            "Clamp",
            "Cell Phone",
            "Fridge",
            "Drill",
            "Puddle",
            "Couch",
          ],
          author: 2,
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt magni, voluptas debitis similique porro a molestias consequuntur earum odio officiis natus, amet hic, iste sed dignissimos esse fuga! Minus, alias.",
        },
        {
          id: 4,
          reimbursement: "E-transfer",
          items: [
            "Wagon",
            "Stop Cream",
            "Thermometer",
            "Shoes",
            "Pillow",
            "Milk",
            "Radio",
            "Towel",
            "PS4",
            "Clock",
          ],
          author: 0,
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt magni, voluptas debitis similique porro a molestias consequuntur earum odio officiis natus, amet hic, iste sed dignissimos esse fuga! Minus, alias.",
        },
        {
          id: 5,
          reimbursement: "Cheque",
          items: ["Blue Blanket", "Red Blanket", "Orange Blanket"],
          author: 1,
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt magni, voluptas debitis similique porro a molestias consequuntur earum odio officiis natus, amet hic, iste sed dignissimos esse fuga! Minus, alias.",
        },
        {
          id: 6,
          reimbursement: "Cheque",
          items: ["24 pc Water", "Crackers", "Apple pie", "Cake"],
          author: 1,
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt magni, voluptas debitis similique porro a molestias consequuntur earum odio officiis natus, amet hic, iste sed dignissimos esse fuga! Minus, alias.",
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
                database={this.state}
                posts={this.state.posts}
                filterPosts={filterPosts}
                addPostToState={addPostToState}
                deletePost={deletePost}
              />
            )}
          />

          <Route
            exact
            path="/signup"
            component={() => (
              <Signup
                database={this.state}
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
                database={this.state}
              />
            )}
          />

          <Route
            exact
            path="/logout"
            component={() => (
              <Logout
                logout={handleUserLogout}
                database={this.state}
              />
            )}
          />

          <Route
            exact
            path="/settings"
            component={() => (
              <Settings
                database={this.state}
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