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
    case TL_PAYLOAD_TYPES.CREATE_POST:
      return {
        ...state,
        posts: action.payload,
      };
    case TL_PAYLOAD_TYPES.DELETE_POST:
      return {
        ...state,
        posts: action.payload,
      };
    case TL_PAYLOAD_TYPES.EDIT_POST:
      return {
        ...state,
        posts: action.payload,
      };
    default:
      return state;
  }
};
