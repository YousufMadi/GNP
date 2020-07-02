import React from "react";
import AutoComplete from "react-google-autocomplete";

import "../../stylesheets/newrequest.css";
import ItemsList from "../ItemsList/ItemsList";

import { addPostToState } from "../../actions/timeline";

class NewRequest extends React.Component {
  /*

  ------- State Initialization ----------

    formReimbursement: The state that manages the reimbursement select option.
    formDescription: The state that manages the description textarea for the new requst.
    autocompleteValue: The state that manages the input value for the autocomplete
    location: The state that holds the currently selected location, provided by the autocomplete.

    items: The state that manages all the items the users wants to add to their request.

  */
  state = {
    items: [],
    formReimbursement: null,
    formDescription: null,
    autocompleteValue: "",
    location: { lat: null, lng: null },
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

  /* This function handles changes to the autocomplete input */
  handleAutocompleteChange = (e) => {
    this.setState({ autocompleteValue: e.target.value });
  };

  /* This function is responsible for creating a new request
    
     It validates the inputs and creates a new request.
     Upon creating a new request, it resets the input values.

     This is where we will make a database call to create a new post */
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
        autocompleteValue: "",
        items: [],
        location: { lat: null, lng: null },
      });

      addPostToState(this.props.posts_state, newPost);
    }
  };

  /*
  
  ------- Render function ----------
     
  This component renders all the inputs required to create a new request.

  They are:
    - Textarea for the description
    - Input for the address (Google Autocomplete)
    - Select for the payment type
    - Input for the item list

  It uses Google's Autocomplete API to retrieve addresses matching the user's input/

  If the inputs are not valid, the create request button is disabled and the user 
  cannot create a new request.

  */
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
            onChange={this.handleAutocompleteChange}
            value={this.state.autocompleteValue}
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
                autocompleteValue: place.formatted_address,
              });
            }}
          />
          <div className="pay-selector">
            <select
              className="form-new-post pay-select"
              onChange={(e) => this.handleReimbursementChange(e)}
            >
              {this.state.formReimbursement ? (
                <></>
              ) : (
                <option selected disabled value={null}>
                  Reimbursement
                </option>
              )}
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

export default NewRequest;
