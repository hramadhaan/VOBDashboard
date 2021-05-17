import firebase from "firebase";
import Category from "models/Category";

export const CATEGORY_START = "CATEGORY_START";
export const CATEGORY_FAIL = "CATEGORY_FAIL";
export const CATEGORY_FETCH = "CATEGORY_FETCH";
export const CATEGORY_CREATE = "CATEGORY_CREATE";
export const CATEGORY_UPDATE = "CATEGORY_UPDATE";
export const CATEGORY_DELETE = "CATEGORY_DELETE";

export const fetchCategory = () => {
  return async (dispatch) => {
    dispatch({
      type: CATEGORY_START,
    });
    firebase
      .database()
      .ref("Category")
      .once("value")
      .then((result) => {
        const loadedCategory = [];
        result.forEach((snapshot) => {
          const key = snapshot.key;
          const data = snapshot.val();
          loadedCategory.push(new Category(key, data.name, data.image));
        });
        dispatch({
          type: CATEGORY_FETCH,
          payload: loadedCategory,
        });
      })
      .catch((err) => {
        dispatch({
          type: CATEGORY_FAIL,
          error: err,
        });
      });
  };
};
