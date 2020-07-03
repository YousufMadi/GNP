import React, { useState } from "react";

import { promoteUser } from "../../actions/user";


import "react-toastify/dist/ReactToastify.css";
import "../../stylesheets/settingsAdmin.css";

const CreateAdmin = (props) => {
  const [userToPromote, setUserToPromote] = useState("");

  const promoteUserObject = (e) => {
    e.preventDefault();
    promoteUser(props.users_state, userToPromote);
  };

  return (
    <div className="make-user-admin">
      <form className="make-admin-form">
        <label className="make-admin-label">Make A User An Admin</label>

        <input
          type="text"
          name="name"
          value={userToPromote}
          placeholder="Email"
          onChange={(e) => setUserToPromote(e.target.value)}
        />
        <button
          className="promoteButton"
          type="submit"
          onClick={(e) => promoteUserObject(e)}
        >
          Promote
        </button>
      </form>
    </div>
  );
};

export default CreateAdmin;
