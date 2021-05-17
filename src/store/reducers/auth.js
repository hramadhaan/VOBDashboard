import {
  AUTH_FAIL,
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_START,
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
    default:
      return state;
  }
};
