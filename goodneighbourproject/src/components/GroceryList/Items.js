import React, { Component } from "react";
import { Col, Row } from "reactstrap";

class Items extends Component {
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
        var itemEntries = this.props.entries;
        var listItems = itemEntries.map(this.createTasks);

        return (
            <Row className="theList">
                {listItems}
            </Row>
        );
    }
};

export default Items;