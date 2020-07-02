import React from "react";
import Items from "./Items";

class ItemsList extends React.Component {
  /*

  ------- State Initialization ----------

    items: The list of items that is to be rendered. Upon initialization, it sets this
           list to the list value passed down as a prop from the parent component.

  */
  state = {
    items: this.props.items,
  };

  /* Update lifecycle method required to reset the list of items upon submitting a new request */
  componentDidUpdate() {
    if (this.props.items.length === 0 && this.state.items.length !== 0) {
      this.setState({ items: [] });
    }
  }

  /* This function adds an item to the state, updates the parent's list of items, and resets the input's value */
  addItem = (e) => {
    e.preventDefault();
    if (
      this._inputElement.value !== "" &&
      this._inputElement.value[0] !== " "
    ) {
      this.setState({ items: [...this.state.items, this._inputElement.value] });
      this.props.changeItems([...this.state.items, this._inputElement.value]);
      this._inputElement.value = "";
    }
  };

  /* This function deletes an item from the state, and updates the parent's list of items */
  deleteItem = (removeItem) => {
    const filteredItems = this.state.items.filter((item) => {
      return item !== removeItem;
    });
    this.setState({ items: filteredItems });
    this.props.changeItems(filteredItems);
  };

  /* This function maps through the items prop and renders each item as an li, with
     an onClick function that allows the user to delete the item if the li is clicked */
  renderItems() {
    return this.state.items.map((item, index) => {
      return (
        <li
          key={index}
          onClick={() => this.deleteItem(item)}
          className="request-item"
        >
          {item} <i className="fas fa-times"></i>
        </li>
      );
    });
  }

  /* 
  
  ------- Render function ----------
     
     Renders a form which manages the items state. Upon submitting the form, it 
     adds the input value to the list.

     The items are displayed using the Items component, which takes in a deleteItem
     prop so that it can manage deleting items from this components state.

  */
  render() {
    return (
      <>
        <div id="item-input-container">
          <form onSubmit={this.addItem}>
            <button id="add-item-btn" type="submit">
              Add Item
            </button>
            <input
              className="form-new-post item-input"
              placeholder="Enter an item"
              ref={(input) => (this._inputElement = input)}
            ></input>
          </form>
        </div>
        <div id="items-list-container">
          <ul className="request-items-list">{this.renderItems()}</ul>
        </div>
      </>
    );
  }
}

export default ItemsList;
