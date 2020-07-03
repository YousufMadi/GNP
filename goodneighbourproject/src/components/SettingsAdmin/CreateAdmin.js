import React, { useState } from "react";
import { notifyError, notifySuccess, notifyWarn } from "../../Utils/notificationUtils";

import "react-toastify/dist/ReactToastify.css";
import "../../stylesheets/settingsAdmin.css";

const CreateAdmin = (props) => {
  const [userToPromote, setUserToPromote] = useState("");
  const userIsAdmin = () => notifyWarn("Error! User is already an admin");
  const userIsPromoted = () => notifySuccess("User has been promoted!");

  const promoteUser = (e) => {
    e.preventDefault();
    let check = false;
    let newUser;
    for (let i = 0; i < props.users.users.length; i++) {
      if (props.users.users[i].email === userToPromote) {
        if (props.users.users[i].admin === true) {
          userIsAdmin();
          check = true;
          break;
        }
        newUser = { ...props.users.users[i], admin: true };
        props.updateUser(props.users, newUser, false);
        userIsPromoted();
        check = true;
        break;
      }
    }
    if (check === false) {
      notifyError("Error! Email address is not registered");
    }
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
