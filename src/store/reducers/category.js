import {
  //   CATEGORY_CREATE,
  CATEGORY_FAIL,
  CATEGORY_FETCH,
  CATEGORY_START,
  //   CATEGORY_DELETE,
  //   CATEGORY_UPDATE,
} from "../actions/category";
// import Category from "../../models/Category";

const initialState = {
  loading: false,
  error: null,
  category: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY_START:
      return {
        ...state,
        loading: true,
      };
    case CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case CATEGORY_FETCH:
      return {
        category: action.payload,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
