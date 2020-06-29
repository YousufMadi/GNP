import React from "react";
import "../../stylesheets/RequestTimeline/itemList.css";
import Items from "./Items";

class ItemsList extends React.Component {
  state = {
    items: [],
  };
  addItem = (e) => {
    e.preventDefault();

    if (this._inputElement.value !== "") {
      var newItem = {
        text: this._inputElement.value,
        key: Date.now(),
      };

      this.setState((prevState) => {
        return {
          items: prevState.items.concat(newItem),
        };
      });
      const itemListWithoutKey = this.state.items.map((item) => {
        return item.text;
      });
      this.props.handleItemsChange([
        ...itemListWithoutKey,
        this._inputElement.value,
      ]);
      this._inputElement.value = "";
    }
  };

  deleteItem = (key) => {
    var filteredItems = this.state.items.filter(function (item) {
      return item.key !== key;
    });

    this.setState({
      items: filteredItems,
    });
    this.props.handleItemsChange(filteredItems);
  };

  render() {
    return (
      <div className="itemListMain">
        <div className="header">
          <form onSubmit={this.addItem}>
            <button id="add-item-btn" type="submit">
              Add Item
            </button>
            <input
              className="form-new-post item-input"
              placeholder="Enter an item"
              ref={(a) => (this._inputElement = a)}
            ></input>
          </form>
        </div>
        <div>
          <Items entries={this.state.items} delete={this.deleteItem} />
        </div>
      </div>
    );
  }
}

export default ItemsList;