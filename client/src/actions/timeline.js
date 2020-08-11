import { getDistance, convertDistance } from "geolib";
import { PAYLOAD_TYPES } from "./user";
import { notifySuccess, notifyError } from "../Utils/notificationUtils";

export const TL_PAYLOAD_TYPES = {
  GET_POSTS: "GET_POSTS",
  EDIT_POST: "EDIT_POST",
  ACCEPT_POST: "ACCEPT_POST",
  DELETE_POST: "DELETE_POST",
  CREATE_POST: "CREATE_POST",
};

/* 

ALL THE FUNCTIONS BEING EXPORTED IN THIS FILE REQUIRE SERVER CALLS.
FOR NOW, THEY SIMPLY MODIFY THE FEED STATE IN THE FEED COMPONENT.

*/

export const getPosts = () => {
  return async (dispatch) => {
    const request = new Request("/posts", {
      method: "get",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
    const response = await fetch(request);
    if (response.status === 200) {
      const data = await response.json();
      dispatch({ type: TL_PAYLOAD_TYPES.GET_POSTS, payload: data });
    } else {
      notifyError("Something went wrong, couldn't load posts");
    }
  };
};

/*

Add a post to the timeline's list of state (currently just state)

Arguments:
  - posts_state: The current state of the timeline in the application
  - new_post: The post being added

  This will be replaced by a call to the database to add the user

*/

export const createPost = (new_post, currentUserID) => {
  return async (dispatch) => {
    const request = new Request("/posts", {
      method: "post",
      body: JSON.stringify({ post: new_post, user: currentUserID }),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
    const response = await fetch(request);
    if (response.status === 200) {
      const data = await response.json();
      dispatch({ type: TL_PAYLOAD_TYPES.CREATE_POST, payload: data });
      notifySuccess("Your request has been created.");
    } else {
      notifyError("Something went wrong creating your request.");
    }
  };
};

/*

Delete a user post (currently just state)

Arguments:
  - posts_state: The current state of the timeline in the application
  - id: The id of the post to be deleted

  This will be replaced by a call to the database to add the user

*/
export const deletePost = (id, currentUserID) => {
  return async (dispatch) => {
    const request = new Request(`/posts`, {
      method: "delete",
      body: JSON.stringify({ post: id, user: currentUserID }),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
    const response = await fetch(request);
    if (response.status === 200) {
      const data = await response.json();
      dispatch({ type: TL_PAYLOAD_TYPES.DELETE_POST, payload: data });
      notifySuccess("Request successfully deleted");
    } else if (response.status === 400) {
      notifyError("You cannot delete that request");
    } else {
      notifyError("Something went wrong deleting the request");
    }
  };
};

/*

Edit a post in the timeline (currently just state)

Arguments:
  - posts_state: The current state of the timeline in the application
  - id: The id of the post being modified
  - post: The updated post

  This will be replaced by a call to the database to add the user

*/

export const editPost = (postID, editedPost, currentUserID) => {
  return async (dispatch) => {
    const request = new Request(`/posts/${postID}`, {
      method: "put",
      body: JSON.stringify({ post: editedPost, user: currentUserID }),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
    const response = await fetch(request);
    if (response.status === 200) {
      const data = await response.json();
      dispatch({ type: TL_PAYLOAD_TYPES.EDIT_POST, payload: data });
      notifySuccess("Request successfully edited");
    } else if (response.status === 400) {
      notifyError("You are not allowed to do that");
    } else {
      notifyError("Something went wrong editing the request");
    }
  };
};

/*

Filter posts in the timeline (currently just state)

Arguments:
  - posts: The filtered posts
  - posts_state: The current state of the timeline in the application
  - currentUserLocation: The current location of the user

  This will be replaced by a call to the database to add the user

*/

export const filterPosts = (posts, posts_state, currentUserLocation) => {
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
  if (
    posts_state.filterDistance !== null &&
    posts_state.filterDistance !== "any" &&
    currentUserLocation !== null
  ) {
    let filterValue = null;
    if (posts_state.filterDistance === "1") {
      filterValue = 1;
    } else if (posts_state.filterDistance === "5") {
      filterValue = 5;
    } else if (posts_state.filterDistance === "20") {
      filterValue = 20;
    } else if (posts_state.filterDistance === "21") {
      filterValue = 40075;
    }
    // Filter by distance
    newFilteredPosts = newFilteredPosts.filter((post) => {
      return (
        convertDistance(
          getDistance(
            {
              latitude: currentUserLocation.latitude,
              longitude: currentUserLocation.longitude,
            },
            { latitude: post.location.lat, longitude: post.location.lng }
          ),
          "km"
        ) < filterValue
      );
    });
  }
  return newFilteredPosts;
};

/*

Get the author of a post

Arguments:
  - post: The post who's author is being fetched
  - users: The user state in the application

  This will be replaced by a call to the database to add the user

*/
export const fetchPostAuthor = (post, users) => {
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === post.author) {
      return users[i];
    }
  }
  return null;
};

/*

Get the size estimate of a favor

Small favor <= 3 items
Medium favor  3 <  items <= 8 
Large favor <= 8 items

Arguments:
  - post: The post that we are calculating the size of

  This will be replaced by a call to the database to add the user

*/
export const getSizeEstimate = (post) => {
  return sizeEstimate(post);
};

/*

Helper function to calculate size

Arguments:
  - post: The post that we are calculating the size of

*/
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
