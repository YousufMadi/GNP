import React from "react";

class Items extends React.Component {
  /* This function maps through the items prop and renders each item as an li, with
     an onClick function that allows the user to delete the item if the li is clicked */
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

  /* 
  ------- Render function ----------
     Creates a ul element that calls renderItems to render each li
  */
  render() {
    return (
      <div id="items-list-container">
        <ul className="request-items-list">{this.renderItems()}</ul>
      </div>
    );
  }
}

export default Items;
