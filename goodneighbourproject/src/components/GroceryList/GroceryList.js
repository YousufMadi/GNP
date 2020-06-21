import React from "react";
import "./groceryList.css";
import GroceryItems from "./GroceryItems";
import { Col, Row } from "reactstrap";

class GroceryList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            items: [],
        };

        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }
    addItem(e) {
        if (this._inputElement.value !== "") {
            var newItem = {
                text: this._inputElement.value,
                key: Date.now()
            };

            this.setState((prevState) => {
                return {
                    items: prevState.items.concat(newItem)
                };
            });

            this._inputElement.value = "";
        }

        console.log(this.state.items);

        e.preventDefault();
    }

    deleteItem(key) {
        var filteredItems = this.state.items.filter(function (item) {
            return (item.key !== key);
        });

        this.setState({
            items: filteredItems
        });
    }

    render() {
        return (
            <div className="groceryListMain">
                <div className="header">
                    <form onSubmit={this.addItem}>
                        <input placeholder="enter item" ref={(a) => this._inputElement = a}>
                        </input>
                        <button type="submit">+</button>
                    </form>
                </div>
                <GroceryItems entries={this.state.items}
                    delete={this.deleteItem} />
            </div>
        );
    }
}

export default GroceryList;