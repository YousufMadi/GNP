import { getDistance, convertDistance } from "geolib";
import { PAYLOAD_TYPES } from "./user";
import { notifySuccess, notifyError } from "../Utils/notificationUtils";

export const TL_PAYLOAD_TYPES = {
  FILTER_POSTS: "FILTER_POSTS",
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

Action creator to send a request to create a post to the server

Arguments:
  - posts_state: The current state of the timeline in the application
  - new_post: The post being added

  Response is the new list of posts that are not completed

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

Action creator to send a request to delete a post to the server

Arguments:
  - currentUserID: The current user's id
  - id: The id of the post to be deleted

  Response is the new list of posts that are not completed

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

Action creator to send a request to the server to edit a post

Arguments:
  - currentUserID: The current user's id
  - postID: The id of the post being modified
  - editedPost: The updated post

  Response is the new list of posts that are not completed

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

Filter posts in the timeline

Arguments:
  - filter: Filter attributes
  - currentUserId: the users currentId
  - currentUserLocation: The current location of the user
*/

export const filterPosts = (filter, currentUserId, currentUserLocation) => {
  return async (dispatch) => {
    const request = new Request(`/posts/${currentUserId}`, {
      method: "get",
      body: JSON.stringify({
        distance: filter.distance,
        size: filter.size,
        reimbursement: filter.reimbursement,
        currLocation: currentUserLocation
      }),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
    const response = await fetch(request);
    if (response.status === 200) {
      const data = await response.json();
      dispatch({ type: TL_PAYLOAD_TYPES.FILTER_POSTS, payload: data });
    }

  }
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
