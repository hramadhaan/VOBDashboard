import firebase from "firebase";
import swal from "sweetalert";

export const AUTH_START = "AUTH_START";
export const AUTH_LOGIN = "AUTH_LOGIN";
export const AUTH_LOGOUT = "AUTH_LOGOUT";
export const AUTH_FAIL = "AUTH_FAIL";
export const AUTH_AUTHENTICATED = "AUTH_AUTHENTICATED";

export const profile = (uid) => {
  return async (dispatch) => {
    dispatch({ type: AUTH_START });
    await firebase
      .database()
      .ref("User")
      .child(uid)
      .once("value")
      .then((res) => {
        // console.log("res: ", res.val());
        const user = res.val();
        if (res.val() !== null) {
          dispatch({
            type: AUTH_LOGIN,
            uid: user.uid,
            email: user.email,
            name: user.displayName,
            image: user.photoURL,
            typeUser: user.typeUser,
          });
        }
      })
      .catch((err) => {
        console.log("error: ", err);
        dispatch({
          type: AUTH_FAIL,
        });
        swal({
          title: "Login Failed",
          text: `${err}`,
          icon: "error",
        });
      });
  };
};

export const register = (email, password, name, image) => {
  let user;
  return async (dispatch) => {
    dispatch({
      type: AUTH_START,
    });
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        user = res.user;
        const uploadTask = firebase
          .storage()
          .ref("User")
          .child(`${res.user.uid}-${name}`)
          .put(image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            console.log("Snapshot: ", snapshot);
          },
          (err) => {
            console.log("Error: ", err);
          },
          () => {
            firebase
              .storage()
              .ref("User")
              .child(`${res.user.uid}-${name}`)
              .getDownloadURL()
              .then((res) => {
                firebase.database().ref("User").child(user.uid).set({
                  displayName: name,
                  email: email,
                  photoURL: res,
                  typeUser: 1,
                  uid: user.uid,
                });
              });
          }
        );
      })
      .catch((err) => {
        dispatch({
          type: AUTH_FAIL,
          error: err.message,
        });
      });
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    dispatch({
      type: AUTH_START,
    });
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        dispatch(profile(res.user.uid));
        localStorage.setItem("uid", res.user.uid);
        console.log("uid", res);
      })
      .catch((err) => {
        console.log("Error: ", err);
        dispatch({
          type: AUTH_FAIL,
        });
        swal({
          title: "Login Failed",
          text: `${err}`,
          icon: "error",
        });
      });
  };
};

export const logout = () => {
  return async (dispatch) => {
    firebase.auth().signOut();
    dispatch({
      type: AUTH_LOGOUT,
    });
  };
};

export const authCheckState = () => {
  return async (dispatch) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("masih masuk");
        dispatch(profile(user.uid));
        // console.log(user.)
      } else {
        dispatch({
          type: AUTH_LOGOUT,
        });
      }
    });
  };
};
