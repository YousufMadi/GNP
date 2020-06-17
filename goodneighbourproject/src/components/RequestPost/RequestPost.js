import React, { useState } from "react";
import { Container, Row, Col, Collapse, Button, CardBody, Card } from 'reactstrap';
import NoPic from "../../images/noPhoto.png";

import "./requestpost.css";

const RequestPost = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const openDiscription = () => setIsOpen(!isOpen);



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
                <div>
                  <Button className="description-button" onClick={openDiscription} color="primary" id={`description-${props.id}`} size="sm">
                    Description
                  </Button>
                  <Collapse isOpen={isOpen}>
                    <Card>
                      <CardBody>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt magni, voluptas debitis
                        similique porro a molestias consequuntur earum odio officiis natus, amet hic, iste sed
                        dignissimos esse fuga! Minus, alias.
                      </CardBody>
                    </Card>
                  </Collapse>
                </div>
              </Col>
            </Row>

          </Col>

        </Row>
      </Container>
    </div>
  );
}

export default RequestPost;