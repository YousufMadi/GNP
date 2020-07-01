import React, { useState } from "react";
import './settingsAdmin.css';

const CreateAdmin = (props) => {

    const [userToPromote, setUserToPromote] = useState("");


    const promoteUser = (e) => {
        e.preventDefault();
        let newUser;
        for (let i = 0; i < props.users.users.length; i++) {
            if (props.users.users[i].email === userToPromote) {
                newUser = { ...props.users.users[i], admin: true }
            }
        }
        console.log(newUser)
        props.updateUser(props.users, newUser, false)
    }




    return (
        <div>
            {console.log(props.users)}
            <form>
                <label>
                    <input type="text" name="name" value={userToPromote} placeholder="Email" onChange={e => setUserToPromote(e.target.value)} />
                </label>
                <input className="promoteButton" type="submit" value="Promote" onClick={e => promoteUser(e)} />
            </form>
        </div>
    );

}

export default CreateAdmin;