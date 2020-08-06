import ServerAPI from "../api/ServerAPI";
import { notifySuccess, notifyError } from "../Utils/notificationUtils";

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

  This will be replaced by a call to the database to add the user

*/
// export const addUser = async (first_name, last_name, email, password) => {
//   const fullname = first_name + " " + last_name;
//   const newUser = {
//     name: fullname,
//     email,
//     password,
//     profile_picture:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSf_Bf0-x44hsGqqcQwrTcNeLUSnYjlDuoql-hQHydDdBwxeCT2&usqp=CAU",
//   };
//   const response = await ServerAPI({
//     method: "post",
//     url: "/users",
//     data: newUser,
//   });
//   if (response.status === 200) {
//     // SET THE CURRENT USER STATE
//   } else {
//     // DISPLAY ERROR MESSAGE
//   }
// };

export const addUser = (loginComp, app) => {

  const request = new Request("/users", {
    method: "post",
    body: JSON.stringify(loginComp.state),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json"
    }
  });

  // Send the request with fetch()
  fetch(request)
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }else{
        notifyError("Please check the info provided");
      }
    })
    .then(json => {
      // Set the current user here
      if (json.currentUser !== undefined) {
        console.log('setting current user on signup')
        app.setState({ currentUser: json.currentUser });
      }
    })
    .catch(error => {
      // notifyError("Please check the info provided");
      console.log('bad request in add user')
    });

}
/*

Update a user from the "database" (Currently just state)

Arguments:
  - users_state: The current state of users in the application
  - user: The user being updated
  - changeCurrentUser: Whether the currently logged in user is being
                      modified
  

  This will be replaced by a call to the database to add the user

*/

export const updateUser = (users_state, user, changeCurrentUser = true) => {
  let users = [...users_state.users];
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === user.id) {
      users[i] = user;
      break;
    }
  }

  users_state.setState({
    currentUser: changeCurrentUser ? user : users_state.currentUser,
    users,
  });
};

export const getUserById = async (id) => {
  const url = "/users/" + id;
  const request = new Request(url, {
    method: "get",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json"
    }
  });

  // Send the request with fetch()
  const user = await fetch(request)
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }else{
        notifyError("Something went wrong while getting user data");
      }
    })
    .catch(error => {
      notifyError("Internal server error - couldn't find user");
    });

  const result = await user;
  return result; 
}

export const getActiveRequest = (id) => {

  const result = getUserById(id).then((user) => {
    if(user){
      return user.active_post;
    }else{
      return null;
    }
  });

  return result;

}
/*

Log in given user

Arguments:
  - users_state: The current state of users in the application
  - user: The user to be logged in

  This will be replaced by a call to the database to add the user

*/

// export const handleUserLogin = async (email, password) => {
//   const response = await ServerAPI({
//     method: "post",
//     url: "/users/login",
//     data: { email, password },
//   });
//   if (response.status === 200) {
//     // SET THE CURRENT USER STATE
//   } else {
//     // DISPLAY ERROR MESSAGE
//   }
// };

// export const login = async (loginComp, app) => {
//   const response = await ServerAPI({
//     method: "post",
//     url: "/users/login",
//     data: { email: loginComp.state.email, password: loginComp.state.password },
//   });
//   if (response.status === 200) {
//     // SET THE CURRENT USER STATE
//     console.log('success')
//   } else {
//     // DISPLAY ERROR MESSAGE
//   }
// };
export const login = (loginComp, app) => {
  // Create our request constructor with all the parameters we need
  const request = new Request("/users/login", {
    method: "post",
    body: JSON.stringify(loginComp.state),
    headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
    }
  });

  // Send the request with fetch()
  fetch(request)
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }else{
        notifyError("Email and password confirmation not found");

      }
    })
    .then(json => {
      // Set the current user here
      if (json.currentUser !== undefined) {
        app.setState({ currentUser: json.currentUser });
        console.log(json)
      }
    })
    .catch(error => {
      console.log('bad request in login')
    });
};

/*

Log out the currently logged in user

Arguments:
  - users_state: The current state of users in the application
  - user: The user to be logged out

  This will be replaced by a call to the database to add the user

*/

export const handleUserLogout = (users_state) => {
  users_state.setState({ currentUser: null });
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
