import React from "react";
import { Redirect } from "react-router-dom";
import RequestTimeline from "./RequestTimeline/RequestTimeline";
import Sidebar from "./Sidebar/Sidebar";
import ActiveRequest from "./ActiveRequest/ActiveRequest";

import {
  filterPosts,
  addPostToState,
  deletePost,
  editPost,
} from "../actions/timeline";

import "../stylesheets/feed.css";

class Feed extends React.Component {
  state = {
    filterTerm: "",
    filterDistance: null,
    filterSize: null,
    filterPayment: null,

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

  /* This function will handle a change in the filter state by updating
      every filter option that needs to change */
  handleFilterChange = (newFilter) => {
    this.setState({ ...newFilter });
  };

  render() {
    const currentUser = this.props.users_state.currentUser;
    if (currentUser === null) {
      return <Redirect to="/login" />;
    } else if (currentUser.active_post) {
      console.log(this.state.posts);
      return (
        <div className="feedContainer">
          <Sidebar
            handleUserLogout={this.props.handleUserLogout}
            users_state={this.props.users_state}
            changeFilterState={this.handleFilterChange}
          />
          <ActiveRequest
            users_state={this.props.users_state}
            updateUser={this.props.updateUser}
            currentUser={currentUser}
          />
        </div>
      );
    }
    return (
      <div className="feedContainer">
        <Sidebar
          handleUserLogout={this.props.handleUserLogout}
          users_state={this.props.users_state}
          changeFilterState={this.handleFilterChange}
        />

        <RequestTimeline
          updateUser={this.props.updateUser}
          users_state={this.props.users_state}
          posts_state={this.state}
          filterPosts={filterPosts}
          addPostToState={addPostToState}
          deletePost={deletePost}
          editPost={editPost}
        />
      </div>
    );
  }
}

export default Feed;
