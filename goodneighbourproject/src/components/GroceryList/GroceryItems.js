import React, { Component } from "react";
import { Col, Row } from "reactstrap";

class GroceryItems extends Component {
    constructor(props) {
        super(props);

        this.createTasks = this.createTasks.bind(this);
    }

    delete(key) {
        this.props.delete(key);
    }

    createTasks(item) {
        return <Col onClick={() => this.delete(item.key)} className="itemBox" xs="3" key={item.key}>{item.text}</Col>
    }

    render() {
        var groceryEntries = this.props.entries;
        var listItems = groceryEntries.map(this.createTasks);

        return (
            <Row className="theList">
                {listItems}
            </Row>
        );
    }
};

export default GroceryItems;