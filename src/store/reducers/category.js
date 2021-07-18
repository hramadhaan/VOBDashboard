import {
  CATEGORY_CREATE,
  CATEGORY_FAIL,
  CATEGORY_FETCH,
  CATEGORY_START,
  CATEGORY_DELETE,
  CATEGORY_UPDATE,
} from "../actions/category";
import Category from "../../models/Category";

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
    case CATEGORY_CREATE:
      const category = new Category(
        action.payload.id,
        action.payload.name,
        action.payload.image
      );
      return {
        ...state,
        loading: false,
        category: state.category.concat(category),
      };
    case CATEGORY_UPDATE:
      const categoryIndex = state.category.findIndex(cat => cat.id === action.id)
      const categoryUpdate = new Category(
        action.id,
        action.payload.name,
        action.payload.image
      );
      const updatedCategory = [...state.category]
      updatedCategory[categoryIndex] = categoryUpdate
      return {
        ...state,
        category: updatedCategory,
        loading: false,
        error: null
      }
    case CATEGORY_DELETE:
      return {
        ...state,
        category: state.category.filter(cat => cat.id !== action.id),
        loading: false,
        error: null
      }
    default:
      return state;
  }
};
