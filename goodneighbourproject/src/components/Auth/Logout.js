import React from "react";
import { Redirect } from "react-router-dom";

class Logout extends React.Component {

  render(){
    this.props.logout(this.props.database);
    return <Redirect to="/login" />;
  }
}

export default Logout;