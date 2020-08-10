import React from "react";

import { connect } from "react-redux";
import { addImage } from "../../actions/image";

/* Component for the Image Form */
class Upload extends React.Component {

  state = {
    profile_picture: null,
  }

  handleChange = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.onloadend = () => {
      this.setState({
         profile_picture: reader.result,
      })
    }
 
  }

  formSubmit = (e) => {
    e.preventDefault();
    if(this.state.profile_picture !== null){
      const id = this.props.currentUser._id
      this.props.addImage(id, this.state.profile_picture); 
      console.log(this.state)
    }
    
  }

  render() {
    return (
      <div>
        <form onSubmit={(e) => this.formSubmit(e)}>
          <label>Image:</label>
          <input name="profile_picture"
                 type="file" 
                 onChange={(e) => this.handleChange(e)}/>
          <button
              type="submit"
              onSubmit={(e) => this.formSubmit(e)}
            >
              Upload
            </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
  };
};
export default connect(mapStateToProps, { addImage })(Upload);
