import React, { useState } from "react";

import "./requestAsk.css";
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
        name: "Filler",
        reimbursement: this.state.formReimbursement,
        items: this.state.items,
      };
      this.props.addPostToTimeline(newPost);
    }
  };

  render() {
    console.log(this.state);
    return (
      <div className="new-request">
        <div className="users-pic-name">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSf_Bf0-x44hsGqqcQwrTcNeLUSnYjlDuoql-hQHydDdBwxeCT2&usqp=CAU"
            alt="profile-pic"
          />
        </div>

        <div className="post-description">
          <div className="size-price-selectors">
            <select onChange={(e) => this.handleReimbursementChange(e)}>
              <option selected disabled value={null}>
                Reimburse
              </option>
              <option value="Cash">{"Cash"}</option>
              <option value="E-Transfer">{"E-Transfer"}</option>
              <option value="Cheque">{"Cheque"}</option>
            </select>
          </div>

          <ItemsList handleItemsChange={this.handleItemsChange} />

          <textarea
            className="new-post-description"
            placeholder="Enter a description..."
            onChange={this.handleDescriptionChange}
          ></textarea>

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
/*
const RequestAsk = () => {
  const [dropdownOpenSize, setOpenSize] = useState(false);
  const toggleSize = () => setOpenSize(!dropdownOpenSize);

  const [dropdownOpenReimburse, setOpenReimburse] = useState(false);
  const toggleReimburse = () => setOpenReimburse(!dropdownOpenReimburse);

  const [formValues, setFormValues] = useState({
    size: null,
    reimbursement: null,
    description: null,
  });

  const onChange = (e) => {
    setFormValues((prevValue) => ({
      ...prevValue,
      [e.target.id]: e.target.value,
    }));
  };
  return (
    <div className="new-request">
      <div className="users-pic-name">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSf_Bf0-x44hsGqqcQwrTcNeLUSnYjlDuoql-hQHydDdBwxeCT2&usqp=CAU"
          alt="profile-pic"
        />
      </div>

      <div className="post-description">
        <div className="size-price-selectors">
          <select>
            <option selected disabled value={null}>
              Reimburse
            </option>
            <option value="Cash">{"Cash"}</option>
            <option value="E-Transfer">{"E-Transfer"}</option>
            <option value="Cheque">{"Cheque"}</option>
          </select>
        </div>

        <ItemsList />

        <textarea
          className="new-post-description"
          placeholder="Enter a description..."
        ></textarea>

        <br />

        <button type="button" className="new-post-button">
          Create Request
        </button>
      </div>
    </div>
  );
};*/

export default RequestAsk;
