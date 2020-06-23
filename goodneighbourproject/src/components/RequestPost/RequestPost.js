import React, { useState } from "react";
import NoPic from "../../images/noPhoto.png";

import "./requestpost.css";

const RequestPost = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const openDiscription = () => setIsOpen(!isOpen);

  var size;

  const sizeEstimate = () => {
    if (props.items.length <= 3) {
      size = "Small"
    } else if (props.items.length <= 8) {
      size = "Medium"
    } else {
      size = "Large"
    }
    return size
  }

  return (
    <div className="posted-request">
      <div className="users-pic-name">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSf_Bf0-x44hsGqqcQwrTcNeLUSnYjlDuoql-hQHydDdBwxeCT2&usqp=CAU"
          alt="profile-pic"
        />
        <p>{props.name}</p>
      </div>

      <div className="post-description">
        <p><span className="bold">Size:</span> {sizeEstimate()}</p>
        <p><span className="bold">Reimbursement:</span> {props.reimbursement}</p>
        <p>
          <span className="bold">Description:</span> <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt magni, voluptas debitis
          similique porro a molestias consequuntur earum odio officiis natus, amet hic, iste sed
          dignissimos esse fuga! Minus, alias.
        </p>
      </div>
    </div>
  );
}

export default RequestPost;