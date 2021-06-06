import {
  AUTH_FAIL,
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_START,
  AUTH_FETCH,
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
    default:
      return state;
  }
};
