import React from "react";
import Items from "./Items";

class ItemsList extends React.Component {
  state = {
    items: this.props.items,
  };

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

  deleteItem = (removeItem) => {
    const filteredItems = this.state.items.filter((item) => {
      return item !== removeItem;
    });
    this.setState({ items: filteredItems });
    this.props.changeItems(filteredItems);
  };

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
        <Items deleteItem={this.deleteItem} items={this.state.items} />
      </>
    );
  }
}

export default ItemsList;
