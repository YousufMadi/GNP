import React from "react";
import ItemsList from "../ItemsList/ItemsList";

class EditRequest extends React.Component {
  /*

  ------- State Initialization ----------

    formReimbursement: The state that manages the reimbursement select option.
    formDescription: The state that manages the description textarea for the new requst.

    items: The state that manages all the items the users wants to add to their request.

  */
  state = {
    formReimbursement: this.props.post.reimbursement,
    formDescription: this.props.post.description,
    items: this.props.post.items,
  };

  /* This function handles changes to the item list */
  handleItemsChange = (items) => {
    this.setState({ items: items });
  };

  /* This function handles changes to the reimbursement value */
  handleReimbursementChange = (e) => {
    this.setState({ formReimbursement: e.target.value });
  };

  /* This function handles changes to the description textarea */
  handleDescriptionChange = (e) => {
    this.setState({ formDescription: e.target.value });
  };

  /* This function is responsible for handling the save request button in the edit view
     It creates a new post with values stored in the state, and sends it to the parent component
     to save as the new values. */
  handleEditRequest = (e) => {
    e.preventDefault();
    const newPost = {
      reimbursement: this.state.formReimbursement,
      items: this.state.items,
      description: this.state.formDescription,
    };
    this.props.editPost(this.props.post._id, newPost);
  };

  /* This function renders the other options for the payment select to avoid duplicates */
  renderOtherPaymentOptions() {
    switch (this.props.post.reimbursement) {
      case "Cash":
        return (
          <>
            <option value="E-transfer">{"E-Transfer"}</option>
            <option value="Cheque">{"Cheque"}</option>
          </>
        );
      case "E-transfer":
        return (
          <>
            <option value="Cash">{"Cash"}</option>
            <option value="Cheque">{"Cheque"}</option>
          </>
        );
      case "Cheque":
        return (
          <>
            <option value="Cash">{"Cash"}</option>
            <option value="E-transfer">{"E-Transfer"}</option>
          </>
        );
      default:
        return <></>;
    }
  }

  /* 

  ------- Render function ----------

    Renders the select option where the payment is specified to allow the user to pick a new payment type.
    Renders the ItemsList component to manage the item list for this request and also renders a text area,
    allowing the user to change their description of their request.

  */
  render() {
    return (
      <div className="posted-request">
        <div className="users-pic-name">
          <img
            className="post-user-pic"
            src={this.props.postUser.profile_picture}
            alt="profile-pic"
          />
          <label className="post-user-title">
            <span className="post-user-name">
              {this.props.postUser.first_name}
            </span>{" "}
            <span className="post-user-payment">is paying by</span>
          </label>
          <select
            id="edit-payment-select"
            className="form-new-post pay-select"
            onChange={(e) => this.handleReimbursementChange(e)}
          >
            <option selected value={this.props.post.reimbursement}>
              {this.props.post.reimbursement}
            </option>
            {this.renderOtherPaymentOptions()}
          </select>
          <button className="post-edit-save" onClick={this.handleEditRequest}>
            <i className="fas fa-check"></i>
          </button>
          <button className="post-edit-cancel" onClick={this.props.exitEdit}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div id="edit-item-list">
          <ItemsList
            changeItems={this.handleItemsChange}
            items={this.state.items}
          />
        </div>
        <div id="edit-post-description">
          <label className="more-info">Additional Information</label>
          <textarea
            value={this.state.formDescription}
            className="new-post-description"
            placeholder="Add more information here..."
            onChange={this.handleDescriptionChange}
            rows="5"
          ></textarea>
        </div>
      </div>
    );
  }
}

export default EditRequest;
