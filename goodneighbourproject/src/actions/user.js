import { notifyWarn, notifySuccess, notifyError } from "../Utils/notificationUtils";


export const addUser = (users_state, first_name, last_name, email, password) => {

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

export const handleUserLogin = (users_state, user) => {
  users_state.setState({ currentUser: user });
};

export const handleUserLogout = (users_state) => {
  users_state.setState({ currentUser: null });
};

export const deleteUser = (users_state, email) => {
  if (users_state.currentUser.email !== email) {
    let users = [...users_state.users];
    let deletedUser = users.filter(users => users.email === email);
    console.log(deletedUser)
    let newUsers = users.filter(users => users.email !== email);
    notifySuccess(deletedUser[0].first_name + " " + deletedUser[0].last_name + " has been deleted");

    users_state.setState({
      users: newUsers
    })
  } else {
    notifyError("You cannot delete your self");
  }
}

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
      console.log('new')
      console.log(newUser)
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
