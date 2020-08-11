import React, { useState } from "react";
import "../../stylesheets/settingsAdmin.css";
import "../../stylesheets/auth-forms.css";
import Login from "./Login";
import Signup from "./Signup";
import Navbar from "../Navigation/Navbar";
import UserInfo from "../UserInfo/UserInfo";
import UserUpdateForm from "../UserUpdateForm/UserUpdateForm";

import { Redirect } from "react-router-dom";

const AuthBox = (props) => {
    const loginOptions = {
        LOGIN: "Login",
        REGISTER: "Register",
    };

    const [loginOption, setLoginOption] = useState(loginOptions.LOGIN);
    let SelectedOption = null;

    switch (loginOption) {
        case loginOptions.LOGIN:
            SelectedOption = Login;
            break;
        case loginOptions.REGISTER:
            SelectedOption = Signup;
            break;
        default:
            break;
    }


    return (
        <>
            <Navbar />
            <div className="contentContainer slide">
                <div className="form-container">
                    <div>
                        {loginOption && (
                            <SelectedOption
                                users_state={props.users_state}
                                users={props.users_state}
                                adminClass="admin-class"
                                posts_state={props.posts_state}
                            />
                        )}
                    </div>
                    <div>
                        <div className="login-types">
                            <button
                                onClick={() => setLoginOption(loginOptions.LOGIN)}
                            >
                                Login
                        </button>
                            <button
                                onClick={() => setLoginOption(loginOptions.REGISTER)}
                            >
                                Register
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuthBox;