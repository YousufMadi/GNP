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
export const addUser = (
  users_state,
  first_name,
  last_name,
  email,
  password
) => {
  const newUser = {
    id: users_state.users.length,
    first_name,
    last_name,
    email,
    password,
    rating: 5,
    profile_picture:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSf_Bf0-x44hsGqqcQwrTcNeLUSnYjlDuoql-hQHydDdBwxeCT2&usqp=CAU",
  };

  users_state.setState({
    currentUser: newUser,
    users: [...users_state.users, newUser],
  });
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

/*

Log in given user

Arguments:
  - users_state: The current state of users in the application
  - user: The user to be logged in

  This will be replaced by a call to the database to add the user

*/

export const handleUserLogin = (users_state, user) => {
  users_state.setState({ currentUser: user });
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
