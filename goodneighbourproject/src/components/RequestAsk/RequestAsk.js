import React from "react";
import AutoComplete from "react-google-autocomplete";

import "../../stylesheets/RequestTimeline/requestAsk.css";
import ItemsList from "../RequestPost/ItemsList";

import {addPostToState} from "../../actions/timeline";

class RequestAsk extends React.Component {
  state = {
    items: [],
    formReimbursement: null,
    formDescription: null,
    location: { lat: null, lng: null },
  };

  handleItemsChange = (items) => {
    this.setState({ items: items });
  };

  handleReimbursementChange = (e) => {
    this.setState({ formReimbursement: e.target.value });
  };

  handleDescriptionChange = (e) => {
    this.setState({ formDescription: e.target.value });
  };

  handleCreateRequest = (e) => {
    e.preventDefault();
    if (
      this.state.formReimbursement !== null &&
      this.state.items.length > 0 &&
      this.state.location.lat !== null &&
      this.state.location.lng !== null
    ) {
      // This guarentees a unique id by getting the last elements id, which has the largest
      // id of all the posts, and adding 1 to it. This will be handled automatically by
      // the database we later implement.
      const newPost = {
        id:
          this.props.posts_state.posts[this.props.posts_state.posts.length - 1]
            .id + 1,
        author: this.props.currentUser.id,
        location: this.state.location,
        reimbursement: this.state.formReimbursement,
        items: this.state.items,
        description: this.state.formDescription,
      };

      this.setState({
        formDescription: null,
        formReimbursement: null,
        items: [],
        location: { lat: null, lng: null },
      });

      addPostToState(this.props.posts_state, newPost);
    }
  };

  render() {
    return (
      <div className="new-request">
        <div className="new-request-description">
          <img src={this.props.currentUser.profile_picture} alt="profile-pic" />
          <textarea
            value={this.state.formDescription ? this.state.formDescription : ""}
            className="new-post-description"
            placeholder="Provide information about your request here..."
            onChange={this.handleDescriptionChange}
            rows="3"
          />
        </div>
        <div className="new-post-address">
          <AutoComplete
            id="address-input"
            placeholder="Enter your delivery address here"
            apiKey={"AIzaSyARRBVg-xS1QeLJMfoCSeQm5At4Q-E7luU"}
            types={["address"]}
            onPlaceSelected={(place) => {
              this.setState({
                location: {
                  lat: place.geometry.location.lat(),
                  lng: place.geometry.location.lng(),
                },
              });
            }}
          />
          <div className="pay-selector">
            <select
              className="form-new-post pay-select"
              onChange={(e) => this.handleReimbursementChange(e)}
            >
              <option selected disabled value={null}>
                Reimbursement
              </option>
              <option value="Cash">{"Cash"}</option>
              <option value="E-transfer">{"E-Transfer"}</option>
              <option value="Cheque">{"Cheque"}</option>
            </select>
          </div>
        </div>
        <div className="new-request-detail">
          <ItemsList
            changeItems={this.handleItemsChange}
            items={this.state.items}
          />
        </div>
        {this.state.formReimbursement !== null &&
        this.state.items.length > 0 &&
        this.state.location.lat !== null &&
        this.state.location.lng !== null ? (
          <button
            type="button"
            className="new-post-button"
            onClick={this.handleCreateRequest}
          >
            Create Request
          </button>
        ) : (
          <button type="button" className="new-post-button disabled" disabled>
            Create Request
          </button>
        )}
      </div>
    );
  }
}

export default RequestAsk;
