import React from "react";

class Items extends React.Component {
  renderItems() {
    return this.props.items.map((item, index) => {
      return (
        <li
          key={index}
          onClick={() => this.props.deleteItem(item)}
          className="request-item"
        >
          {item} <i className="fas fa-times"></i>
        </li>
      );
    });
  }
  render() {
    return (
      <div id="items-list-container">
        <ul className="request-items-list">{this.renderItems()}</ul>
      </div>
    );
  }
}

export default Items;
