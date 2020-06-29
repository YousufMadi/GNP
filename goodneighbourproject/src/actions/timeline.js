export const filterPosts = (posts, filter) => {
  debugger;
  let newFilteredPosts = posts;
  if (
    filter.filterPayment !== null &&
    filter.filterPayment !== "any"
  ) {
    // Filter by payment
    newFilteredPosts = posts.filter((post) => {
      return (
        filter.filterPayment ===
        post.reimbursement.toLowerCase()
      );
    });
  }
  if (
    filter.filterSize !== null &&
    filter.filterSize !== "any"
  ) {
    // Filter by request size
    newFilteredPosts = newFilteredPosts.filter((post) => {
      return (
        !filter.filterSize ||
        filter.filterSize === sizeEstimate(post)
      );
    });
  }
  return newFilteredPosts;
}

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