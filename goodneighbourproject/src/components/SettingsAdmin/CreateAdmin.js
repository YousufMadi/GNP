import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { notifyWarn, notifySuccess } from '../../Utils/notificationUtils'

import 'react-toastify/dist/ReactToastify.css';
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
            notifyWarn("Error! Email address is not registered");
        }

    };


    return (
        <div>
            <p>Promote User</p>
            <form>
                <label>
                    <input
                        type="text"
                        name="name"
                        value={userToPromote}
                        placeholder="Email"
                        onChange={(e) => setUserToPromote(e.target.value)}
                    />
                </label>
                <input
                    className="promoteButton"
                    type="submit"
                    value="Promote"
                    onClick={(e) => promoteUser(e)}
                />
            </form>
        </div>
    );
};

export default CreateAdmin;
