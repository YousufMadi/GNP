import React, { useState } from "react";
import '../../components/Settings/settings.css';
import './settingsAdmin.css';
import CreateAdmin from './CreateAdmin';
import ViewUsers from './ViewUsers';
import AppStats from './AppStats';
import UserInfo from '../UserInfo/UserInfo'

import { Redirect } from "react-router-dom";
import Navbar from "../Navigation/Navbar";



const SettingsAdmin = (props) => {
    console.log(props)
    const adminOptions = {
        CREATE_ADMIN: "Create Admin",
        VIEW_USERS: "View Users",
        APP_STATS: "App Stats",
        UPDATE_INFO: "Update Info",
    };


    const [adminOption, setAdminOption] = useState(null);
    let SelectedOption = null;

    switch (adminOption) {
        case adminOptions.CREATE_ADMIN:
            SelectedOption = CreateAdmin;
            break;
        case adminOptions.VIEW_USERS:
            SelectedOption = ViewUsers;
            break;
        case adminOptions.APP_STATS:
            SelectedOption = AppStats;
            break;
    }

    const currentUser = props.users_state.currentUser;
    if (currentUser === null) {
        return <Redirect to="/login" />;
    }

    return (
        <div className="settings-container">
            <div>
                <UserInfo currentUser={currentUser} />
            </div>


            <div className="user-update-info">
                <h2>Admin Dashboard</h2>
                <div>

                    <div className="options">
                        <ul className="flex-container">
                            <button className="flex-options" onClick={(e) => setAdminOption(adminOptions.CREATE_ADMIN)}>Create Admin</button>
                            <button className="flex-options" onClick={(e) => setAdminOption(adminOptions.VIEW_USERS)}>View Users</button>
                            <button className="flex-options" onClick={(e) => setAdminOption(adminOptions.APP_STATS)}>View App Stats</button>
                            <button className="flex-options">Update Info</button>
                        </ul>
                    </div>
                    <div className="content">
                        {adminOption && <SelectedOption users={props.users_state} updateUser={props.updateUser} toast={props.toast} />}
                    </div>
                </div>
            </div>

        </div>
    );

}

export default SettingsAdmin;