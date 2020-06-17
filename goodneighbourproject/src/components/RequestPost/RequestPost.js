import React, { useState } from "react";
import { Container, Row, Col, Media, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Input, Button } from 'reactstrap';
import NoPic from "../../images/noPhoto.png";

import "./requestpost.css";

const RequestPost = (props) => {
  return (
    <div>
      <Container className="posted-request">
        <Row>
          <Col xs="3">
            <Row>
              <img className="profile-pic" src={NoPic} />
            </Row>
          </Col>
          <Col>
            <Row>
              <Col>
                Size: Small
                </Col>
              <Col>
                Reimbursement: Cash
                </Col>
            </Row>
            <Row>
              <Col>
                lalalalalal
              </Col>
            </Row>

          </Col>

        </Row>
      </Container>
    </div>
  );
}

export default RequestPost;