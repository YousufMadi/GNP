export const addPostToState = (posts_state, new_post) => {
  posts_state.setState({
    posts: [...posts_state.posts, new_post],
  });
};

export const deletePost = (posts_state, id) => {
  const newPosts = posts_state.posts.filter((post) => {
    return post.id !== id;
  });
  posts_state.setState({ posts: newPosts });
};

export const editPost = (posts_state, id, post) => {
  let newPosts = posts_state.posts;
  for (let i = 0; i < newPosts.length; i++) {
    if (newPosts[i].id === id) {
      newPosts[i].description = post.description;
      newPosts[i].items = post.items;
      newPosts[i].reimbursement = post.reimbursement;
      break;
    }
  }

  posts_state.setState({
    posts: newPosts,
  });
};

export const filterPosts = (posts, posts_state) => {
  let newFilteredPosts = posts;
  if (
    posts_state.filterPayment !== null &&
    posts_state.filterPayment !== "any"
  ) {
    // Filter by payment
    newFilteredPosts = posts.filter((post) => {
      return posts_state.filterPayment === post.reimbursement.toLowerCase();
    });
  }
  if (posts_state.filterSize !== null && posts_state.filterSize !== "any") {
    // Filter by request size
    newFilteredPosts = newFilteredPosts.filter((post) => {
      return (
        !posts_state.filterSize || posts_state.filterSize === sizeEstimate(post)
      );
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
