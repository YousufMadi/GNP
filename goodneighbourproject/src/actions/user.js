// export const addUser = (users_state, first_name, last_name, email, password) => {
//   const newUser = {
//     id: users_state.users.length,
//     first_name,
//     last_name,
//     email,
//     password,
//     rating: 5,
//     profile_picture:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSf_Bf0-x44hsGqqcQwrTcNeLUSnYjlDuoql-hQHydDdBwxeCT2&usqp=CAU",
//   };

//   this.setState({
//     currentUser: newUser,
//     users: [...this.state.users, newUser],
//   });
// };


export const handleUserLogin = (users, user) => {
  // debugger;
  users.setState({ currentUser: user });
};