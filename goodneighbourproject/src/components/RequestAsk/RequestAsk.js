import React, { useState } from "react";

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
    <div className="new-request">
      <div className="users-pic-name">
        <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSf_Bf0-x44hsGqqcQwrTcNeLUSnYjlDuoql-hQHydDdBwxeCT2&usqp=CAU"
            alt="profile-pic"
          />
      </div>

      <div className="post-description">
        <div className="size-price-selectors">

          <select>
            <option selected disabled value={null}>
              Size
            </option>
            <option value="Small">{"Small"}</option>
            <option value="Medium">{"Medium"}</option>
            <option value="Large">{"Large"}</option>
          </select>

          <select>
            <option selected disabled value={null}>
              Reimburse
            </option>
            <option value="Cash">{"Cash"}</option>
            <option value="E-Transfer">{"E-Transfer"}</option>
            <option value="Cheque">{"Cheque"}</option>
          </select>
        </div>

        <GroceryList />

        <textarea className="new-post-description" placeholder="Enter a description..."></textarea>

        <br/>

        <button type="button" className="new-post-button">Create Request</button>
        
      </div>
    </div>
  );
}

export default RequestAsk;