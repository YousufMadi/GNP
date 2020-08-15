import { notifySuccess, notifyError } from "../Utils/notificationUtils";
import { TL_PAYLOAD_TYPES } from "./timeline";

export const PAYLOAD_TYPES = {
  REGISTER: "REGISTER",
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  UPDATE_USER: "UPDATE_USER",
  DELETE_USER: "DELETE_USER",
  SET_COOKIE: "SET_COOKIE",
  SET_PROFILE_PIC: "SET_PROFILE_PIC",
  ACCEPT_POST: "ACCEPT_POST",
  COMPLETE_POST: "COMPLETE_POST",
};

export const readCookie = () => {
  return async (dispatch) => {
    const url = "/users/check-session";
    const response = await fetch(url);
    if (response.status === 200) {
      const data = await response.json();
      dispatch({ type: PAYLOAD_TYPES.SET_COOKIE, payload: data });
    }
  };
};

/*

Add a user to the database

Arguments:
  - signupComp: The object containing the user's sign up information

Response is the new user object created
*/

export const register = (signupComp) => {
  return async (dispatch) => {
    const request = new Request("/users", {
      method: "post",
      body: JSON.stringify(signupComp),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
    const response = await fetch(request);
    if (response.status === 400) {
      notifyError("Invalid login credentials");
    } else if (response.status === 500 || response.status === 404) {
      notifyError("Something went wrong");
    } else if (response.status === 417) {
      notifyError("Passwords do not match");
    } else if (response.status === 200) {
      const data = await response.json();
      dispatch({ type: PAYLOAD_TYPES.LOGIN, payload: data });
    }
  };
};
/*

Log in a given user

Arguments:
  - loginComp: The login credentials provided by the user

Response is the user object if successfully logged in

*/

export const login = (loginComp) => {
  return async (dispatch) => {
    // Create our request constructor with all the parameters we need
    const request = new Request("/users/login", {
      method: "post",
      body: JSON.stringify(loginComp),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
    // Send the request with fetch()
    const response = await fetch(request);
    if (response.status === 400) {
      notifyError("Invalid login credentials");
    } else if (response.status === 500 || response.status === 404) {
      notifyError("Something went wrong");
    } else if (response.status === 200) {
      const data = await response.json();
      dispatch({ type: PAYLOAD_TYPES.LOGIN, payload: data });
      notifySuccess("Login succesfully");
    }
  };
};

/*

Action creator to update the user. 

Arguments:
  - id: The id of the user to be updated
  - updateComp: The state of the updated user

Response is the updated user object
*/

export const updateUser = (id, updateComp) => {
  return async (dispatch) => {
    const url = "/users/" + id;
    const request = new Request(url, {
      method: "PATCH",
      body: JSON.stringify(updateComp),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
    const response = await fetch(request);
    if (response.status === 400) {
      notifyError("Profile not updated due to invalid information");
    } else if (response.status === 500 || response.status === 404) {
      notifyError("Something went wrong");
    } else if (response.status === 200) {
      const data = await response.json();
      dispatch({ type: PAYLOAD_TYPES.UPDATE_USER, payload: data });
      notifySuccess("Profile succesfully updated");
    }
  };
};

/*

Get a the user in the database.

Arguments:
    - id: The id of the user to fetch
*/

export const getUserById = async (id) => {
  const url = "/users/" + id;
  const request = new Request(url, {
    method: "get",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });
  // Send the request with fetch()
  const response = await fetch(request);
  if (response.status !== 200) {
    notifyError("Internal server error - couldn't find user");
  } else {
    const data = await response.json();
    return data;
  }
};

/*

Get all the users in the database. Used in admin view.

*/

export const getAllUsers = async () => {
  const url = "/users";
  const request = new Request(url, {
    method: "get",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });
  const response = await fetch(request);
  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else {
    notifyError("Something went wrong while getting users data");
  }
};

/*

Log out the currently logged in user

*/

export const logout = () => {
  return async (dispatch) => {
    const url = "/users/logout";
    fetch(url)
      .then((res) => {
        dispatch({ type: PAYLOAD_TYPES.LOGOUT });
        notifySuccess("Logout successful");
      })
      .catch((error) => {
        notifyError("Could not log out");
      });
  };
};

/*

Delete the user corresponding to the given id.

Arguments:
  - id: The id of the user to delete

  Response is the new list of users to update the state of the component


*/

export const deleteUser = async (id) => {
  const url = "/users/" + id;
  const request = new Request(url, {
    method: "delete",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });

  // Send the request with fetch()
  const response = await fetch(request);
  if (response.status === 200) {
    notifySuccess("User has been deleted");
    const data = await response.json();
    return data;
  } else {
    notifyError("Something went wrong deleting the user");
  }
};

/*

Promote the user corresponding to the given email to admin role. If email
does not exist in the state, notify the user and do nothing

Arguments:
  - email: The email of the user to make admin

  Response is the new list of users to update the state of the component

*/

export const promoteUser = async (email) => {
  const url = "/users";
  const request = new Request(url, {
    method: "put",
    body: JSON.stringify({ email: email }),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });
  const response = await fetch(request);
  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else if (response.status === 404) {
    notifyError("Email was not found");
  } else if (response.status === 400) {
    notifySuccess("User is already an admin!");
  } else {
    notifyError("Internal Error");
  }
};

/*

Accept a request action creator

Arguments:
  - post: The id of the post to request
  - user: The current user's id

  Response is the updated current user with an active post

*/
export const acceptPost = (post, user) => {
  return async (dispatch) => {
    const request = new Request(`/posts/accept/${post}`, {
      method: "put",
      body: JSON.stringify({ user: user }),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
    const response = await fetch(request);
    if (response.status === 200) {
      const data = await response.json();
      dispatch({ type: PAYLOAD_TYPES.ACCEPT_POST, payload: data });
      notifySuccess("Request accepted");
    } else {
      notifyError("Something went wrong accepting this request");
    }
  };
};

export const completePost = (post, user) => {
  return async (dispatch) => {
    const request = new Request(`/posts/complete/${post}`, {
      method: "put",
      body: JSON.stringify({ user: user }),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
    const response = await fetch(request);
    if (response.status === 200) {
      const data = await response.json();
      dispatch({ type: PAYLOAD_TYPES.COMPLETE_POST, payload: data });
      dispatch({ type: TL_PAYLOAD_TYPES.GET_POSTS, payload: data.posts });
      notifySuccess("Request completed.");
    } else {
      notifyError("Something went wrong completing this request");
    }
  };
};

export const getNumUsers = async () => {
  const users = await getAllUsers();
  return users.length

}
