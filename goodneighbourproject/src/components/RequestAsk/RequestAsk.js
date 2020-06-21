import React, { useState } from "react";
import { Container, Row, Col, Media, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Input, Button } from 'reactstrap';
import NoPic from "../../images/noPhoto.png";

import "./requestAsk.css";
import GroceryList from "../GroceryList/GroceryList";

const RequestAsk = () => {
  const [dropdownOpenSize, setOpenSize] = useState(false);
  const toggleSize = () => setOpenSize(!dropdownOpenSize)

  const [dropdownOpenReimburse, setOpenReimburse] = useState(false);
  const toggleReimburse = () => setOpenReimburse(!dropdownOpenReimburse)

  const [formValues, setFormValues] = useState({
    size: null,
    reimbursement: null,
    description: null
  });

  const onChange = (e) => {
    setFormValues(prevValue => ({ ...prevValue, [e.target.id]: e.target.value }));
  };
  return (
    <div>
      <Container className="askRequest">
        <Row>
          <Col xs="3">
            <Row>
              <img className="profile-pic-small" src={NoPic} />
            </Row>
          </Col>
          <Col xs="Auto">
            <Row>
              <GroceryList />
            </Row>
            <Row>
              <Col>
                <ButtonDropdown isOpen={dropdownOpenSize} toggle={toggleSize} size="sm">
                  <DropdownToggle caret>
                    Size
                </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem id="size" value="Small" onClick={onChange} >Small</DropdownItem>
                    <DropdownItem id="size" value="Medium" onClick={onChange}>Medium</DropdownItem>
                    <DropdownItem id="size" value="Large" onClick={onChange}>Large</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              </Col>
              <Col>
                <p>{formValues.size}</p>
              </Col>
              <Col>
                <ButtonDropdown isOpen={dropdownOpenReimburse} toggle={toggleReimburse} size="sm">
                  <DropdownToggle caret>
                    Reimburse
                </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem id="reimbursement" value="Cash" onClick={onChange}>Cash</DropdownItem>
                    <DropdownItem id="reimbursement" value="E-Transfer" onClick={onChange}>E-Transfer</DropdownItem>
                    <DropdownItem id="reimbursement" value="Cheque" onClick={onChange}>Cheque</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              </Col>
              <Col>
                <p>{formValues.reimbursement}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <Input type="textarea" id="descriptionInput" />
              </Col>
            </Row>
            <Row>
              <Col md={{ size: 2, offset: 10 }}>
                <Button className="send-button" color="info" size="sm">SEND</Button>{' '}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default RequestAsk;