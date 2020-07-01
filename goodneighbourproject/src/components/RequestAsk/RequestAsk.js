import React from "react";

import "../../stylesheets/RequestTimeline/requestAsk.css";
import ItemsList from "../RequestPost/ItemsList";
import Items from "../RequestPost/Items";

class RequestAsk extends React.Component {
  state = {
    items: [],
    formReimbursement: null,
    formDescription: null,
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
    if (this.state.formReimbursement !== null && this.state.items.length > 0) {
      const newPost = {
        id: 5,
        author: this.props.currentUser.id,
        name: "Filler",
        reimbursement: this.state.formReimbursement,
        items: this.state.items,
        description: this.state.formDescription,
      };

      this.setState({
        formDescription: null,
        formReimbursement: null,
        items: [],
      });
      this.props.addPostToState(this.props.posts_state, newPost);
    }
  };

  render() {
    return (
      <div className="new-request">
        <div id="new-request-description">
          <img src={this.props.currentUser.profile_picture} alt="profile-pic" />
          <textarea
            value={this.state.formDescription}
            className="new-post-description"
            placeholder="Provide information about your request here..."
            onChange={this.handleDescriptionChange}
            rows="3"
          />
        </div>
        <div id="new-post-address">
          <input
            id="address-input"
            placeholder="Enter your delivery address here"
          />
          <div id="pay-selector">
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
        <div id="new-request-detail">
          <ItemsList
            changeItems={this.handleItemsChange}
            items={this.state.items}
          />
        </div>
        {this.state.formReimbursement !== null &&
        this.state.items.length > 0 ? (
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
