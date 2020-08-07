import { notifySuccess, notifyError } from "../Utils/notificationUtils";

export const PAYLOAD_TYPES = {
  REGISTER: "REGISTER",
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  UPDATE_USER: "UPDATE_USER",
  DELETE_USER: "DELETE_USER",
};
/* 

ALL THE FUNCTIONS BEING EXPORTED IN THIS FILE REQUIRE SERVER CALLS.
FOR NOW, THEY SIMPLY MODIFY THE USERS STATE IN APP.

*/

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
      notifySuccess("Login succesfully")
    }
  };
};
/*

Update a user from the "database" (Currently just state)

Arguments:
  - users_state: The current state of users in the application
  - user: The user being updated
  - changeCurrentUser: Whether the currently logged in user is being
                      modified
  

  This will be replaced by a call to the database to add the user

*/

export const updateUser = (id, updateComp) => {
  return async (dispatch) => {
    const url = "/users/" + id;
    const request = new Request(url, {
      method: "PATCH",
      body: JSON.stringify(updateComp),
      completed:true,
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
      // notifySuccess("Profile succesfully updated")
    }
  }
}

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
  const user = await fetch(request)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        notifyError("Something went wrong while getting user data");
      }
    })
    .catch((error) => {
      notifyError("Internal server error - couldn't find user");
    });

  const result = await user;
  return result;
};

/*

Log out the currently logged in user

Arguments:
  - users_state: The current state of users in the application
  - user: The user to be logged out

  This will be replaced by a call to the database to add the user

*/

export const logout = () => {
  return {
    type: PAYLOAD_TYPES.LOGOUT,
  };
};

/*

Delete the user corresponding to the given email. If email
does not exist in the state, notify the user and do nothing

Arguments:
  - users_state: The current state of users in the application
  - email: The email of the user to delete

  This will be replaced by a call to the database to add the user

*/

export const deleteUser = (users_state, email) => {
  if (users_state.currentUser.email !== email) {
    let users = [...users_state.users];
    let deletedUser = users.filter((users) => users.email === email);
    let newUsers = users.filter((users) => users.email !== email);
    notifySuccess(
      deletedUser[0].first_name +
        " " +
        deletedUser[0].last_name +
        " has been deleted"
    );

    users_state.setState({
      users: newUsers,
    });
  } else {
    notifyError("You cannot delete your self");
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

export const promoteUser = (users_state, user_to_promote_email) => {
  let check = false;
  let newUser;

  for (let i = 0; i < users_state.users.length; i++) {
    if (users_state.users[i].email === user_to_promote_email) {
      if (users_state.users[i].admin === true) {
        notifyError("Error! User is already an admin");
        check = true;
        break;
      }
      newUser = { ...users_state.users[i], admin: true };
      updateUser(users_state, newUser, false);
      notifySuccess("User has been promoted!");
      check = true;
      break;
    }
  }
  if (check === false) {
    notifyError("Error! Email address is not registered");
  }
};
