import {
    ARTICLE_CREATE,
    ARTICLE_FAIL,
    ARTICLE_FETCH,
    ARTICLE_START,
    //   CATEGORY_DELETE,
    //   CATEGORY_UPDATE,
  } from "../actions/article";
  import Category from "../../models/Category";
  
  const initialState = {
    loading: false,
    error: null,
    article: [],
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case ARTICLE_START:
        return {
          ...state,
          loading: true,
        };
      case ARTICLE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      case ARTICLE_FETCH:
        return {
          article: action.payload,
          loading: false,
          error: null,
        };
      case ARTICLE_CREATE:
        const category = new Category(
          action.payload.id,
          action.payload.name,
          action.payload.image
        );
        return {
          ...state,
          loading: false,
          article: state.category.concat(category),
        };
      default:
        return state;
    }
  };
  