import firebase from "firebase";
import Category from "models/Category";
import swal from "sweetalert";

export const CATEGORY_START = "CATEGORY_START";
export const CATEGORY_FAIL = "CATEGORY_FAIL";
export const CATEGORY_FETCH = "CATEGORY_FETCH";
export const CATEGORY_CREATE = "CATEGORY_CREATE";
export const CATEGORY_UPDATE = "CATEGORY_UPDATE";
export const CATEGORY_DELETE = "CATEGORY_DELETE";

// INTERNAL FUNCTION
const firebaseDatabase = (id) => {
  if (id) {
    return firebase.database().ref("Category").child(id);
  } else {
    return firebase.database().ref("Category");
  }
};

const firebaseStorage = (name) => {
  const uploadTask = firebase.storage().ref("category").child(name);
  return uploadTask;
};

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

export const addCategory = (data) => {
  return async (dispatch) => {
    dispatch({
      type: CATEGORY_START,
    });
    const uploadTask = firebase
      .storage()
      .ref("category")
      .child(`${data.name}`)
      .put(data.image);

    uploadTask.on(
      "state_changed",
      (snapshot) => console.log("Snapshot: ", snapshot),
      (err) => console.log("Error: ", err),
      () => {
        firebase
          .storage()
          .ref("category")
          .child(`${data.name}`)
          .getDownloadURL()
          .then((res) => {
            firebase
              .database()
              .ref("Category")
              .push({
                name: data.name,
                image: res,
              })
              .then((res) => {
                const id = res.key;
                dispatch({
                  type: CATEGORY_CREATE,
                  payload: {
                    id: id,
                    name: data.name,
                    image: res,
                  },
                });
              })
              .catch((err) =>
                dispatch({
                  type: CATEGORY_FAIL,
                  error: err,
                })
              );
          })
          .catch((err) => dispatch({ type: CATEGORY_FAIL, error: err }));
      }
    );
  };
};

export const updateCategory = (id, data, oldImage) => {
  return async (dispatch, getState) => {
    dispatch({
      type: CATEGORY_START,
    });
    const stateCategory = getState().category.category;
    const idCategory = stateCategory.find((cat) => cat.id === id);
    // console.log("State: ", idCategory);

    let url;

    if (data.image) {
      firebase
        .storage()
        .refFromURL(oldImage)
        .delete()
        .then(() => {
          firebaseStorage(data.name)
            .put(data.image)
            .on(
              "state_changed",
              (snapshot) => console.log("Snapshot Update: ", snapshot),
              (err) => console.log("Error Update: ", err),
              () => {
                firebaseStorage(data.name)
                  .getDownloadURL()
                  .then((res) => {
                    url = res;
                    firebaseDatabase(id)
                      .update({
                        name: data.name,
                        image: res,
                      })
                      .then((res) => {
                        dispatch({
                          type: CATEGORY_UPDATE,
                          id: id,
                          payload: {
                            name: data.name,
                            image: url,
                          },
                        });
                        swal({
                          title: "Update data sukses",
                          text: "Kategori tersebut telah berhasil diubah",
                          icon: "success",
                        });
                      })
                      .catch((err) =>
                        dispatch({
                          type: CATEGORY_FAIL,
                          error: err,
                        })
                      );
                  })
                  .catch((err) => {
                    console.log("Error: ", err);
                    dispatch({
                      type: CATEGORY_FAIL,
                      error: err,
                    });
                  });
              }
            );
        })
        .catch((err) => dispatch({ type: CATEGORY_FAIL, error: err }));
    } else {
      firebaseDatabase(id)
        .update({
          name: data.name,
        })
        .then(() => {
          swal({
            title: "Update data sukses",
            text: "Kategori tersebut telah berhasil diubah",
            icon: "success",
          });
          dispatch({
            type: CATEGORY_UPDATE,
            id: id,
            payload: {
              name: data.name,
              image: idCategory.image,
            },
          });
        })
        .catch((err) =>
          dispatch({
            type: CATEGORY_FAIL,
            error: err,
          })
        );
    }
  };
};

export const deleteCategory = (id, oldImage) => {
  return async (dispatch) => {
    dispatch({
      type: CATEGORY_START,
    });

    firebase
      .storage()
      .refFromURL(oldImage)
      .delete()
      .then(() => {
        firebaseDatabase(id)
          .remove()
          .then(() => {
            swal({
              title: "Hapus data sukses",
              text: "Kategori tersebut telah berhasil dihapus",
              icon: "success",
            });
            dispatch({
              type: CATEGORY_DELETE,
              id: id,
            });
          })
          .catch((err) =>
            dispatch({
              type: CATEGORY_FAIL,
            })
          );
      })
      .catch((err) =>
        dispatch({
          type: CATEGORY_FAIL,
          error: err,
        })
      );
  };
};
