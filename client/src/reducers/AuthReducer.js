import { PAYLOAD_TYPES } from "../actions/user";

const INITIAL_STATE = {
  currentUser: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PAYLOAD_TYPES.REGISTER:
      return {
        ...state,
        currentUser: action.payload.currentUser,
      };
    case PAYLOAD_TYPES.LOGIN:
      return {
        ...state,
        currentUser: action.payload.currentUser,
      };
    case PAYLOAD_TYPES.LOGOUT:
      return {
        ...state,
        currentUser: null,
      };
    case PAYLOAD_TYPES.UPDATE_USER:
      return {
        ...state,
        currentUser: action.payload.currentUser,
      };
    case PAYLOAD_TYPES.SET_COOKIE:
      return {
        ...state,
        currentUser: action.payload.currentUser,
      };
    case PAYLOAD_TYPES.SET_PROFILE_PIC:
      return {
        ...state,
        currentUser: action.payload.currentUser,
      };
    case PAYLOAD_TYPES.ACCEPT_POST:
      return {
        ...state,
        currentUser: action.payload.currentUser,
      };
    case PAYLOAD_TYPES.COMPLETE_POST:
      return {
        ...state,
        currentUser: action.payload.currentUser,
      };
    default:
      return state;
  }
};
