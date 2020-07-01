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
  let id = user.id;
  let users = [...users_state.users];
  users[id] = user;

  users_state.setState({
    currentUser: changeCurrentUser ? user : users_state.currentUser,
    users
  });
}

export const handleUserLogin = (users_state, user) => {
  users_state.setState({ currentUser: user });
};

export const handleUserLogout = (users_state) => {
  users_state.setState({ currentUser: null });
};