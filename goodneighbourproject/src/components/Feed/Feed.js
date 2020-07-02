import React from "react";
import { Redirect } from "react-router-dom";
import RequestTimeline from "../RequestTimeline/RequestTimeline";
import ActiveRequest from "../ActiveRequest/ActiveRequest";

import "../../stylesheets/feed.css";

class Feed extends React.Component {
  /*

    ------- State Initialization ----------

      filterDistance: The value given by the select distance element in the sidebar
      filterSize: The value given by the select favour size element in the sidebar
      filterPayment: The value given by the select payment type element in the sidebar

      posts: Hardcoded requests and their information. This will require a databse fetch in later phases of the project.

    */

  state = {
    filterDistance: null,
    filterSize: null,
    filterPayment: null,

    posts: [
      {
        id: 0,
        reimbursement: "Cash",
        items: ["Face mask", "Toilet paper", "batteries", "A dozen eggs"],
        author: 1,
        location: { lat: 43.680978, lng: -79.337887 },
        description:
          "I require a few items picked up from Shoppers." +
          " Some of these products are essentials so I would appreciate" +
          " urgent attention",
      },
      {
        id: 1,
        reimbursement: "Cheque",
        items: [
          "Honey Nut Cheerios",
          "Doritos",
          "4 Chicken breasts",
          "Milk",
          "1 pound of Shrimp",
          "Vitamin pills",
          "Gum",
          "2 cans of Red bull",
          "Flour",
        ],
        author: 2,
        location: { lat: 43.64422, lng: -79.473842 },
        description:
          "Hello! I am in need of some groceries. There is a Walmart very close " +
          "to my house. Thanks for your help!",
      },
      {
        id: 2,
        reimbursement: "E-transfer",
        items: ["Pipe burst"],
        author: 0,
        location: { lat: 43.756411, lng: -79.458736 },
        description:
          "Hi everyone! A pipe has recently burst in my house and needs fixing." +
          " Would really appreciate it if someone could come fix it for me." +
          " Thank you very much!",
      },
      {
        id: 3,
        reimbursement: "Cash",
        items: ["Hammer", "Clamp", "Drill", "Chair", "Screw driver"],
        author: 2,
        location: { lat: 43.635275, lng: -79.526027 },
        description:
          "Hey guys! I'm in need of some tools and furniture from Canadian tire." +
          " Thanks for the help!",
      },
      {
        id: 4,
        reimbursement: "E-transfer",
        items: [
          "Face Cream",
          "Thermometer",
          "Shoes",
          "Pillow",
          "Milk",
          "Radio",
          "Towel",
          "Blanket",
          "Clock",
          "Apples",
          "Frozen pizza",
          "Batteries",
          "All purpose cleaner",
          "Dish soap",
          "Toilet brush",
        ],
        author: 0,
        location: { lat: 43.656101, lng: -79.659355 },
        description:
          "Hey everyone... I would really appreicate if someone could pick" +
          " up some items for me from Metro/Shoppers near my house. Please complete this" +
          " request only between 1pm and 6pm. Thank you",
      },
      {
        id: 5,
        reimbursement: "Cheque",
        items: ["Mow lawn"],
        author: 1,
        location: { lat: 43.775169, lng: -79.54424 },
        description:
          "The grass in my lawn needs mowing. The lawn mower will be provided." +
          " Need this request to be completed between 11am and 7pm. Thanks!",
      },
      {
        id: 6,
        reimbursement: "Cheque",
        items: ["24 pc Water", "Crackers", "Apple pie", "Cake"],
        author: 1,
        location: { lat: 43.756325, lng: -79.43987 },
        description:
          "Hi I need some items picked up for me. This request is not urgent. Thanks!",
      },
    ],

    setState: this.setState.bind(this),
  };

  /* This function will handle a change in the filter state by updating
      every filter option that needs to change */
  handleFilterChange = (newFilter) => {
    this.setState({ ...newFilter });
  };

  /* 
  
  ------- Render function ----------
     
     If the current user is not logged in, it redirects to the login page.

     If the current user has an active request they need to finish, it renders the 
     ActiveRequest component.

     If the current user is logged in and has no active request, they will be able to
     view the feed and all of the requests currently pending. 

  */
  render() {
    const currentUser = this.props.users_state.currentUser;
    if (currentUser === null) {
      return <Redirect to="/login" />;
    } else if (currentUser.active_post) {
      return (
        <div className="feedContainer">
          <ActiveRequest
            posts={[currentUser.active_post]}
            changeFilterState={this.handleFilterChange}
            users_state={this.props.users_state}
            currentUser={currentUser}
          />
        </div>
      );
    }
    return (
      <div className="feedContainer">
        <RequestTimeline
          changeFilterState={this.handleFilterChange}
          users_state={this.props.users_state}
          posts_state={this.state}
        />
      </div>
    );
  }
}

export default Feed;
