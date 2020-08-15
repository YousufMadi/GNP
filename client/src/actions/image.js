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
