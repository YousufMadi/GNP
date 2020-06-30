import React from "react";
import './settingsAdmin.css';

const CreateAdmin = (props) => {
    return (
        <div>
            <form>
                <label>
                    <input type="text" name="name" placeholder="Email" />
                </label>
                <input className="promoteButton" type="submit" value="Promote" onClick={e => e.preventDefault()} />
            </form>
        </div>
    );

}

export default CreateAdmin;