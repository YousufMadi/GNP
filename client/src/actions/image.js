import { notifySuccess, notifyError } from "../Utils/notificationUtils";

// A function to send a POST request with a new image
export const addImage = (id, img) => {

  return async (dispatch) => {
    // Create our request constructor with all the parameters we need
    const url = "/image/" + id;
    const request = new Request(url, {
        method: "post",
        body: JSON.stringify({data: img}),
        headers: {
          "Content-Type": "application/json",
        },
    });

    const response = await fetch(request);
    if(response.status === 200){
      const data = await response.json();
      dispatch({ type: "SET_PROFILE_PIC", payload: data });
      notifySuccess("Profile picture updated");
    }else{
      notifyError("Could not update profile picture")
    }

  };


};

// A function to send a DELETE request with an image PUBLIC id (id on cloudinary)
export const deleteImage = (id) => {
  // the URL for the request
  const url = `/images/${id}`;

  // Create our request constructor with all the parameters we need
  const request = new Request(url, {
    method: "delete",
  });

  // Send the request with fetch()
  fetch(request)
    .then(function (res) {
      // Handle response we get from the API.
      // Usually check the error codes to see what happened.
      if (res.status === 200) {
          // If image was deleted successfully, tell the user.
          // dashboardComp.setState({
          //   message: {
          //     body: "Delete successful.",
          //     type: "success"
          //   }
          // });

          // Also remove the image from the imageList state
          // Use filter to only keep the images you want.
          // const filteredList = imageListComp.state.imageList.filter(img => img.image_id !== imageId);
          // imageListComp.setState(
          //   { imageList: filteredList }
          // );

      } else {
          // If server couldn't delete the image, tell the user.
          // Here we are adding a generic message, but you could be more specific in your app.
          // dashboardComp.setState({
          //   message: {
          //     body: "Error: Could not delete image.",
          //     type: "error"
          //   }
          // });
      }
    })
    .catch(error => {
        console.log(error);
    });
}
