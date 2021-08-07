import firebase from "../config/fbconfig";
import { ACTIONS } from "../reducers/departments";

export const get = () => async (dispatch, getState) => {
  dispatch({ type: ACTIONS.DEPARTMENTS_GET_REQ });
  const db = firebase.firestore();
  return db
    .collection("DEPARTMENTS")
    .where("isExist", "==", true)
    .get()
    .then((snap) => {
      const data = {};
      snap.docs.forEach((doc) => {
        data[doc.id] = doc.data();
      });
      return dispatch({
        type: ACTIONS.DEPARTMENTS_GET_SUCCESS,
        payload: data,
      });
    })
    .catch((err) => {
      console.error(err);
      return dispatch({
        type: ACTIONS.DEPARTMENTS_GET_FAILURE,
        payload: err,
      });
    });
};

export const onAdd = (newData) => async (dispatch, getState) => {
  dispatch({ type: ACTIONS.DEPARTMENTS_CREATE_REQ });
  const db = firebase.firestore();
  const uid = getState().auth.login.user.uid;
  const ref = db.collection("DEPARTMENTS").doc();
  return ref
    .set({
      ...newData,
      isExist: true,
      id: ref.id,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      createdBy: uid,
    })
    .then(() => {
      dispatch(get());
      return dispatch({ type: ACTIONS.DEPARTMENTS_CREATE_SUCCESS });
    })
    .catch((err) => {
      console.error(err);
      return dispatch({
        type: ACTIONS.DEPARTMENTS_CREATE_FAILURE,
        payload: err,
      });
    });
};

export const onUpdate = (id, newData) => async (dispatch, getState) => {
  dispatch({ type: ACTIONS.DEPARTMENTS_UPDATE_REQ });
  const db = firebase.firestore();
  const uid = getState().auth.login.user.uid;
  const ref = db.collection("DEPARTMENTS").doc(id);
  return ref
    .set(
      {
        ...newData,
        id: ref.id,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedBy: uid,
      },
      { merge: true }
    )
    .then(() => {
      dispatch(get());
      return dispatch({ type: ACTIONS.DEPARTMENTS_UPDATE_SUCCESS });
    })
    .catch((err) => {
      console.error(err);
      return dispatch({
        type: ACTIONS.DEPARTMENTS_UPDATE_FAILURE,
        payload: err,
      });
    });
};

export const onDelete = (id) => async (dispatch, getState) => {
  dispatch({ type: ACTIONS.DEPARTMENTS_DELETE_REQ });
  const db = firebase.firestore();
  const uid = getState().auth.login.user.uid;
  const ref = db.collection("DEPARTMENTS").doc(id);
  return ref
    .set(
      {
        isExist: false,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedBy: uid,
      },
      { merge: true }
    )
    .then(() => {
      dispatch(get());
      return dispatch({ type: ACTIONS.DEPARTMENTS_DELETE_SUCCESS });
    })
    .catch((err) => {
      console.error(err);
      return dispatch({
        type: ACTIONS.DEPARTMENTS_DELETE_FAILURE,
        payload: err,
      });
    });
};
