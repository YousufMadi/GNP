import { notifySuccess, notifyError } from "../Utils/notificationUtils";

export const PAYLOAD_TYPES = {
  REGISTER: "REGISTER",
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  UPDATE_USER: "UPDATE_USER",
  DELETE_USER: "DELETE_USER",
  SET_COOKIE: "SET_COOKIE",
  SET_PROFILE_PIC: "SET_PROFILE_PIC"
};

export const readCookie = () => {
  return async (dispatch) => {
    const url = "/users/check-session";
    const response = await fetch(url);
    if (response.status === 400) {
      notifyError("Something went wrong");
    } else if (response.status === 500 || response.status === 404) {
      notifyError("Something went wrong");
    } else if (response.status === 200) {
      const data = await response.json();
      dispatch({ type: PAYLOAD_TYPES.SET_COOKIE, payload: data });
    }
  };
};


/*

Add a user to the "database" (currently just state)

Arguments:
  - users_state: The current state of users in the application
  - first_name: The first name of the user being added
  - last_name: The last name of the user being added
  - email: The email of the user being added
  - password: The password of the user being added
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
    } else if (response.status === 200) {
      const data = await response.json();
      dispatch({ type: PAYLOAD_TYPES.LOGIN, payload: data });
    }
  };
};
/*

Log in given user

Arguments:
  - users_state: The current state of users in the application
  - user: The user to be logged in

  This will be replaced by a call to the database to add the user

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
Arguments:
  - id: The id of the user to be updated
  - updateComp: The state of the updated user
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

Arguments:
  - users_state: The current state of users in the application
  - user: The user to be logged out

  This will be replaced by a call to the database to add the user

*/

// export const logout = () => {
//   return {
//     type: PAYLOAD_TYPES.LOGOUT,
//   };
// };

export const logout = () => {
  return async (dispatch) => {
    // Create our request constructor with all the parameters we need
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
  - users_state: The current state of users in the application
  - email: The email of the user to delete

  This will be replaced by a call to the database to add the user

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
  - users_state: The current state of users in the application
  - user_to_promote_email: The email of the user to make admin

  This will be replaced by a call to the database to add the user

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
