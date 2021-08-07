import firebase from "../config/fbconfig";
import { ACTIONS } from "../reducers/auth";

export const loginWithEmailAndPassword =
  ({ email, password }) =>
  async (dispatch, getState) => {
    dispatch({ type: ACTIONS.LOGIN_REQ });
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        return dispatch({ type: ACTIONS.LOGIN_SUCCESS, payload: user });
      })
      .catch((err) => {
        console.error(err);
        alert(err.message);
        return dispatch({ type: ACTIONS.LOGIN_FAILURE, payload: err });
      });
  };

export const signUpWithEmail =
  ({ email, password, firstName, lastName }, history) =>
  async (dispatch, getState) => {
    dispatch({ type: ACTIONS.SIGNUP_REQ });
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCred) => {
        return firebase
          .firestore()
          .collection("USERS")
          .doc(userCred.user.uid)
          .set({ email, firstName, lastName });
      })
      .then(() => {
        history.push("/");
        return dispatch({ type: ACTIONS.SIGNUP_SUCCESS });
      })
      .catch((err) => {
        console.error(err);
        alert(err.message);
        return dispatch({ type: ACTIONS.SIGNUP_FAILURE, payload: err });
      });
  };

export const onAuthStateChanged = () => (dispatch) => {
  dispatch({ type: ACTIONS.LOGIN_REQ });
  return firebase.auth().onAuthStateChanged(
    (user) => {
      if (user != null) {
        dispatch({ type: ACTIONS.LOGIN_SUCCESS, payload: user });
      } else {
        dispatch({ type: ACTIONS.LOGIN_FAILURE, payload: "" });
      }
    },
    (err) => {
      console.error(err);
      dispatch({ type: ACTIONS.LOGIN_FAILURE, payload: err });
    }
  );
};

export const logout = () => async (dispatch) => {
  dispatch({ type: ACTIONS.LOGOUT_REQ });
  return firebase
    .auth()
    .signOut()
    .then(() => dispatch({ type: ACTIONS.LOGOUT_SUCCESS }))
    .catch((err) => {
      console.error(err);
      return dispatch({ type: ACTIONS.LOGOUT_FAILURE, payload: err });
    });
};
