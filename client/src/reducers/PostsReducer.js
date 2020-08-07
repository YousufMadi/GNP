import { TL_PAYLOAD_TYPES } from "../actions/timeline";

const INITIAL_STATE = {
  posts: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TL_PAYLOAD_TYPES.GET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    default:
      return state;
  }
};
