import React, { useState } from "react";
import "../../stylesheets/settingsAdmin.css";

const CreateAdmin = (props) => {
  const [userToPromote, setUserToPromote] = useState("");

  const promoteUser = (e) => {
    e.preventDefault();
    let newUser;
    for (let i = 0; i < props.users.users.length; i++) {
      if (props.users.users[i].email === userToPromote) {
        newUser = { ...props.users.users[i], admin: true };
      }
    }
    props.updateUser(props.users, newUser, false);
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
          onClick={(e) => promoteUser(e)}
        >
          Promote
        </button>
      </form>
    </div>
  );
};

export default CreateAdmin;
