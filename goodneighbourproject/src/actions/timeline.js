export const addPostToState = (database, new_post) => {
  database.setState({
    posts: [...database.posts, new_post],
  });
};

export const deletePost = (database, id) => {
  const newPosts = database.posts.filter((post) => {
    return post.id !== id;
  });
  database.setState({ posts: newPosts });
};

export const editPost = (database, id, post) => {
  console.log(id);
  let newPosts = database.posts;
  for (let i = 0; i < newPosts.length; i++) {
    if (newPosts[i].id === id) {
      newPosts[i].description = post.description;
      newPosts[i].items = post.items;
      newPosts[i].reimbursement = post.reimbursement;
      break;
    }
  }
  database.setState({
    posts: newPosts,
  });
};

export const filterPosts = (posts, filter) => {
  let newFilteredPosts = posts;
  if (filter.filterPayment !== null && filter.filterPayment !== "any") {
    // Filter by payment
    newFilteredPosts = posts.filter((post) => {
      return filter.filterPayment === post.reimbursement.toLowerCase();
    });
  }
  if (filter.filterSize !== null && filter.filterSize !== "any") {
    // Filter by request size
    newFilteredPosts = newFilteredPosts.filter((post) => {
      return !filter.filterSize || filter.filterSize === sizeEstimate(post);
    });
  }
  return newFilteredPosts;
};

export const fetchPostAuthor = (post, users) => {
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === post.author) {
      return users[i];
    }
  }
  return null;
};

export const getSizeEstimate = (post) => {
  return sizeEstimate(post);
};

const sizeEstimate = (post) => {
  let size = null;
  if (post.items.length <= 3) {
    size = "small";
  } else if (post.items.length <= 8) {
    size = "medium";
  } else {
    size = "large";
  }
  return size;
};
