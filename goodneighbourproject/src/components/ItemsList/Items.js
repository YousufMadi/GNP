import React, { Component } from "react";
import "../../stylesheets/RequestTimeline/itemList.css";

class Items extends Component {
    constructor(props) {
        super(props);

        this.createTasks = this.createTasks.bind(this);
    }

    delete(key) {
        this.props.delete(key);
    }

    createTasks(item) {
        return <li onClick={() => this.delete(item.key)} className="itemBox" xs="3" key={item.key}>{item.text}</li>
    }

    render() {
        var itemEntries = this.props.entries;
        var listItems = itemEntries.map(this.createTasks);

        return (
            <ul className="theList">
                {listItems}
            </ul>
        );
    }
};

export default Items;