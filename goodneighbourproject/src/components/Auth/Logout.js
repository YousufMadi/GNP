import React from "react";
import { Redirect } from "react-router-dom";

class Logout extends React.Component {

  render(){
    this.props.logout(this.props.users_state);
    return <Redirect to="/login" />;
  }
}

export default Logout;