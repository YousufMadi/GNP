import React from "react";
import { Redirect } from "react-router-dom";

import {
  handleUserLogout,
} from "../../actions/user";

class Logout extends React.Component {

  render(){
    handleUserLogout(this.props.users_state);
    return <Redirect to="/login" />;
  }
}

export default Logout;