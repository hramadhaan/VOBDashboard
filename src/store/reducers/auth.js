import User from "models/User";
import {
  AUTH_FAIL,
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_START,
  AUTH_FETCH,
  AUTH_DELETE,
  AUTH_UPDATE
} from "../actions/auth";

const initialState = {
  uid: null,
  email: null,
  name: null,
  image: null,
  typeUser: null,
  loading: false,
  error: null,
  authenticated: false,
  users: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return {
        ...state,
        loading: true,
      };
    case AUTH_LOGIN:
      return {
        ...state,
        loading: false,
        uid: action.uid,
        email: action.email,
        name: action.name,
        image: action.image,
        typeUser: action.typeUser,
        authenticated: true,
      };
    case AUTH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case AUTH_LOGOUT:
      return {
        uid: null,
        email: null,
        name: null,
        image: null,
        loading: false,
        typeUser: null,
        error: null,
        authenticated: false,
      };
    case AUTH_FETCH:
      return {
        ...state,
        users: action.payload,
        loading: false,
        error: null,
      };
    case AUTH_UPDATE:
      const authIndex = state.users.findIndex(auth => auth.id === action.id)
      const authUpdate = new User(
        action.id,
        action.payload.photoURL,
        action.payload.email,
        action.payload.displayName,
        action.payload.typeUser
      )
      const updatedAuth = [...state.users]
      updatedAuth[authIndex] = authUpdate
      return {
        ...state,
        users: updatedAuth,
        loading: false,
        error: null
      }
    case AUTH_DELETE:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.id),
        loading: false,
        error: null
      }
    default:
      return state;
  }
};
