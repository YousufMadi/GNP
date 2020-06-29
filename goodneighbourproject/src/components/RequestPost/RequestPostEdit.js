import React from "react";

class RequestPostEdit extends React.Component {
  state = {
    formReimbursement: this.props.post.reimbursement,
    formDescription: this.props.post.description,
    items: this.props.post.items,
  };
  handleReimbursementChange = (e) => {
    this.setState({ formReimbursement: e.target.value });
  };
  handleDescriptionChange = (e) => {
    this.setState({ formDescription: e.target.value });
  };
  handleEditRequest = (e) => {
    e.preventDefault();
  };
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
    }
  }
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
          <button className="post-edit-save">
            <i className="fas fa-check"></i>
          </button>
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

export default RequestPostEdit;
