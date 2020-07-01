import React, { useState } from "react";
import '../../components/Settings/settings.css';
import './settingsAdmin.css';
import CreateAdmin from './CreateAdmin';
import ViewUsers from './ViewUsers';
import AppStats from './AppStats';

import { Redirect } from "react-router-dom";
import Navbar from "../Navigation/Navbar";



const SettingsAdmin = (props) => {

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

    const renderRating = () => {
        let renderStarsReturn = [];
        for (let i = 0; i < currentUser.rating; i++) {
            renderStarsReturn.push(<i key={i} className="fas fa-star"></i>);
        }
        return renderStarsReturn;
    }



    return (
        <div className="settings-container">
            <Navbar currentUser={currentUser} />
            <div className="settings-cover"></div>
            <div className="user-container">

                <div className="user-curr-info">
                    <div className="profile-img">
                        <img src={currentUser.profile_picture} />
                    </div>
                    <h3>{currentUser.first_name} {currentUser.last_name} </h3>
                    <div className="user-ratings">
                        {renderRating()}
                    </div>
                    <h4>{currentUser.email}</h4>
                    <div className="requests-info">
                        <p>Number of requests made: </p>
                        <p>4</p>
                    </div>
                    <div className="requests-info">
                        <p>Number of requests accepted: </p>
                        <p>10</p>
                    </div>
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
                            {adminOption && <SelectedOption users={props.users_state} updateUser={props.updateUser} />}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );

}

export default SettingsAdmin;