import React from "react";

import { connect } from "react-redux";
import { addImage } from "../../actions/image";
import "../../stylesheets/upload.css";


/* Component for the Image Form */
class Upload extends React.Component {

  uploadProfilePic = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.onloadend = () => {
      const id = this.props.currentUser._id;
      this.props.addImage(id, reader.result); 
    }
  }

  render() {
    return (
      <div>
        <label>Image:</label>
        <input name="profile_picture"
               type="file" 
               onChange={(e) => this.uploadProfilePic(e)}/>
        
        <button className="remove-profile-pci">
          <i
            className="fas fa-trash"
            
          ></i>
        </button>
        
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
