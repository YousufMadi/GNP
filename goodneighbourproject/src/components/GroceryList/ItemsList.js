import React from "react";
import "../../stylesheets/RequestTimeline/groceryList.css";
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

      this._inputElement.value = "";
      this.props.handleItemsChange([...this.state.items, newItem]);
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
            <input
              placeholder="enter item"
              ref={(a) => (this._inputElement = a)}
            ></input>
            <button type="submit">+</button>
          </form>
        </div>
        <Items entries={this.state.items} delete={this.deleteItem} />
      </div>
    );
  }
}

export default ItemsList;
