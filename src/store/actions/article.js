import firebase from "firebase";
import Article from "models/Article";
import swal from "sweetalert";
import moment from "moment";
import "moment/locale/id";

export const ARTICLE_START = "ARTICLE_START";
export const ARTICLE_FAIL = "ARTICLE_FAIL";
export const ARTICLE_FETCH = "ARTICLE_FETCH";
export const ARTICLE_CREATE = "ARTICLE_CREATE";
export const ARTICLE_UPDATE = "ARTICLE_UPDATE";
export const ARTICLE_DELETE = "ARTICLE_DELETE";

// INTERNAL FUNCTION
const firebaseDatabase = (id) => {
  if (id) {
    return firebase.database().ref("artikel").child(id);
  } else {
    return firebase.database().ref("artikel");
  }
};

const firebaseStorage = (name) => {
  const uploadTask = firebase.storage().ref("Article").child(name);
  return uploadTask;
};

export const fetchArticle = () => {
  return async (dispatch) => {
    dispatch({
      type: ARTICLE_START,
    });
    firebaseDatabase()
      .once("value")
      .then((result) => {
        const loadedArticle = [];
        result.forEach((snapshot) => {
          const data = snapshot.val();
          const key = snapshot.key;
          loadedArticle.push(
            new Article(
              key,
              data.countView,
              data.hashtag,
              data.kategori,
              data.idPenulis,
              data.imageUrl,
              data.judul,
              data.partOne,
              data.partTwo,
              data.partThree,
              data.timeStamp
            )
          );
        });
        dispatch({
          type: ARTICLE_FETCH,
          payload: loadedArticle.reverse(),
        });
      })
      .catch((err) => {
        dispatch({
          type: ARTICLE_FAIL,
          error: err,
        });
      });
  };
};

export const addArticle = (data) => {
  return async (dispatch) => {
    dispatch({
      type: ARTICLE_START,
    });

    const time = moment().format("LLL");

    const uploadTask = firebase
      .storage()
      .ref("Article")
      .child(`${data.judul}`)
      .put(data.imageUrl);

    uploadTask.on(
      "state_changed",
      (snapshot) => console.log("Snapshot: ", snapshot),
      (err) => console.log("Error: ", err),
      () => {
        firebase
          .storage()
          .ref("Article")
          .child(`${data.judul}`)
          .getDownloadURL()
          .then((res) => {
            firebase
              .database()
              .ref("artikel")
              .push({
                judul: data.judul && data.judul,
                hashtag: data.hashtag && data.hashtag,
                kategori: data.idCategory && data.idCategory,
                idPenulis: data.idPenulis && data.idPenulis,
                partOne: data.partOne && data.partOne,
                partTwo: data.partTwo && data.partTwo,
                partThree: data.partThree && data.partThree,
                imageUrl: res,
                countView: 0,
                timeStamp: time,
              })
              .then((res) => {
                const id = res.key;
                swal('Berhasil ditambahkan', 'Anda berhasil menambahkan artikel', 'success')
                dispatch({
                  type: ARTICLE_CREATE,
                  payload: {
                    id: id,
                    judul: data.judul && data.judul,
                    hashtag: data.hashtag && data.hashtag,
                    idCategory: data.idCategory && data.idCategory,
                    idPenulis: data.idPenulis && data.idPenulis,
                    partOne: data.partOne && data.partOne,
                    partTwo: data.partTwo && data.partTwo,
                    partThree: data.partThree && data.partThree,
                    time: time,
                  },
                });
              })
              .catch((err) =>
                dispatch({
                  type: ARTICLE_FAIL,
                  error: err,
                })
              );
          })
          .catch((err) => dispatch({ type: ARTICLE_FAIL, error: err }));
      }
    );
  };
};

export const updateArticle = (id, data, oldImage) => {
  return async (dispatch, getState) => {
    dispatch({
      type: ARTICLE_START,
    });
    const stateArticle = getState().article.article;
    const selectedArticle = stateArticle.find((cat) => cat.id === id);
    // console.log("State: ", idCategory);

    // console.log('Data Picture: ', data.imageUrl)

    let url;

    if (data.imageUrl) {

      firebaseStorage(data.imageUrl.name)
        .put(data.imageUrl)
        .on(
          "state_changed",
          (snapshot) => console.log("Snapshot Update: ", snapshot),
          (err) => console.log("Error Update: ", err),
          () => {
            firebaseStorage(data.imageUrl.name)
              .getDownloadURL()
              .then((res) => {
                url = res;
                firebaseDatabase(id)
                  .update({
                    judul: data.judul ? data.judul : selectedArticle.judul,
                    imageUrl: url,
                    hashtag: data.hashtag
                      ? data.hashtag
                      : selectedArticle.hashtag,
                    partOne: data.partOne
                      ? data.partOne
                      : selectedArticle.partOne,
                    partTwo: data.partTwo
                      ? data.partTwo
                      : selectedArticle.partTwo,
                    partThree: data.partThree
                      ? data.partThree
                      : selectedArticle.partThree,
                  })
                  .then((res) => {
                    dispatch({
                      type: ARTICLE_UPDATE,
                      id: id,
                      payload: {
                        judul: data.judul
                          ? data.judul
                          : selectedArticle.judul,
                        imageUrl: url,
                        hashtag: data.hashtag
                          ? data.hashtag
                          : selectedArticle.hashtag,
                        idCategory: data.idCategory
                          ? data.idCategory
                          : selectedArticle.idCategory,
                        idPenulis: data.idPenulis
                          ? data.idPenulis
                          : selectedArticle.idPenulis,
                        partOne: data.partOne
                          ? data.partOne
                          : selectedArticle.partOne,
                        partTwo: data.partTwo
                          ? data.partTwo
                          : selectedArticle.partTwo,
                        partThree: data.partThree
                          ? data.partThree
                          : selectedArticle.partThree,
                      },
                    });
                    swal({
                      title: "Update data sukses",
                      text: "Artikel tersebut telah berhasil diubah",
                      icon: "success",
                    });
                  })
                  .catch((err) =>
                    dispatch({
                      type: ARTICLE_FAIL,
                      error: err,
                    })
                  );
              })
              .catch((err) => {
                console.log("Error: ", err);
                dispatch({
                  type: ARTICLE_FAIL,
                  error: err,
                });
              });
          }
        );
    } else {
      firebaseDatabase(id)
        .update({
          judul: data.judul ? data.judul : selectedArticle.judul ?? '',
          hashtag: data.hashtag ? data.hashtag : selectedArticle.hashtag ?? '',
          partOne: data.partOne ? data.partOne : selectedArticle.partOne ?? '',
          partTwo: data.partTwo ? data.partTwo : selectedArticle.partTwo ?? '',
          partThree: data.partThree
            ? data.partThree
            : selectedArticle.partThree ?? '',
        })
        .then(() => {
          swal({
            title: "Update data sukses",
            text: "Kategori tersebut telah berhasil diubah",
            icon: "success",
          });
          dispatch({
            type: ARTICLE_UPDATE,
            id: id,
            payload: {
              judul: data.judul ? data.judul : selectedArticle.judul,
              imageUrl: selectedArticle.imageUrl,
              hashtag: data.hashtag ? data.hashtag : selectedArticle.hashtag,
              idCategory: data.idCategory
                ? data.idCategory
                : selectedArticle.idCategory,
              idPenulis: data.idPenulis
                ? data.idPenulis
                : selectedArticle.idPenulis,
              partOne: data.partOne ? data.partOne : selectedArticle.partOne,
              partTwo: data.partTwo ? data.partTwo : selectedArticle.partTwo,
              partThree: data.partThree
                ? data.partThree
                : selectedArticle.partThree,
            },
          });
        })
        .catch((err) =>
          dispatch({
            type: ARTICLE_FAIL,
            error: err,
          })
        );
    }
  };
};

export const deleteArticle = (id, oldImage) => {
  return async (dispatch) => {
    dispatch({
      type: ARTICLE_START,
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
              text: "Artikel tersebut telah berhasil dihapus",
              icon: "success",
            });
            dispatch({
              type: ARTICLE_DELETE,
              id: id,
            });
          })
          .catch((err) =>
            dispatch({
              type: ARTICLE_FAIL,
            })
          );
      })
      .catch((err) =>
        dispatch({
          type: ARTICLE_FAIL,
          error: err,
        })
      );
  };
};
