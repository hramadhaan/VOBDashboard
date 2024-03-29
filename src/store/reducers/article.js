import {
  ARTICLE_CREATE,
  ARTICLE_FAIL,
  ARTICLE_FETCH,
  ARTICLE_START,
  ARTICLE_DELETE,
  ARTICLE_UPDATE
} from "../actions/article";

import Article from '../../models/Article'

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
      const article = new Article(
        action.payload.id,
        action.payload.actionView,
        action.payload.hashtag,
        action.payload.idCategory,
        action.payload.idPenulis,
        action.payload.imageUrl,
        action.payload.judul,
        action.payload.partOne,
        action.payload.partTwo,
        action.payload.partThree,
        action.payload.time
      )
      return {
        ...state,
        loading: false,
        article: state.article.concat(article),
        error: null
      };
    case ARTICLE_UPDATE:
      const articleIndex = state.article.findIndex(art => art.id === action.id)
      const articleUpdate = new Article(
        action.id,
        action.payload.actionView,
        action.payload.hashtag,
        action.payload.idCategory,
        action.payload.idPenulis,
        action.payload.imageUrl,
        action.payload.judul,
        action.payload.partOne,
        action.payload.partTwo,
        action.payload.partThree,
        action.payload.time
      )
      const updatedArticle = [...state.article]
      updatedArticle[articleIndex] = articleUpdate
      return {
        ...state,
        article: updatedArticle,
        loading: false,
        error: null
      }
    case ARTICLE_DELETE:
      return {
        ...state,
        article: state.article.filter(art => art.id !== action.id),
        loading: false,
        error: null
      }
    default:
      return state;
  }
};
