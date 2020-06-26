import React from "react";

import "../../stylesheets/RequestTimeline/requestAsk.css";
import ItemsList from "../GroceryList/ItemsList";

class RequestAsk extends React.Component {
  state = {
    dropdownOpenSize: false,
    dropdownOpenReimburse: false,
    items: [],
    formReimbursement: null,
    formDescription: null,
  };

  toggleSize() {
    this.setState({ dropdownOpenSize: !this.state.dropdownOpenSize });
  }
  toggleReimburse() {
    this.setState({ dropdownOpenReimburse: !this.state.dropdownOpenReimburse });
  }
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
        dropdownOpenSize: false,
        dropdownOpenReimburse: false,
      });
      this.props.addPostToTimeline(newPost);
    }
  };

  render() {
    return (
      <div className="new-request">
        <div className="users-pic-name">
          <img src={this.props.currentUser.profile_picture} alt="profile-pic" />
        </div>

        <div id="new-post-detail">
          <textarea
            value={this.state.formDescription}
            className="new-post-description"
            placeholder="Add more information here..."
            onChange={this.handleDescriptionChange}
          ></textarea>
          <div id="new-post-information">
            <ItemsList
              handleItemsChange={this.handleItemsChange}
              items={this.state.items}
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
                <option value="E-Transfer">{"E-Transfer"}</option>
                <option value="Cheque">{"Cheque"}</option>
              </select>
            </div>
          </div>
          <br />
          <button
            type="button"
            className="new-post-button"
            onClick={this.handleCreateRequest}
          >
            Create Request
          </button>
        </div>
      </div>
    );
  }
}

export default RequestAsk;
