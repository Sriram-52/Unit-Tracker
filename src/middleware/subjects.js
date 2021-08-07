import firebase from "../config/fbconfig";
import { ACTIONS } from "../reducers/subjects";

export const get = (deptId) => async (dispatch, getState) => {
  dispatch({ type: ACTIONS.SUBJECTS_GET_REQ });
  const db = firebase.firestore();
  return db
    .collection("SUBJECTS")
    .where("deptId", "==", deptId)
    .where("isExist", "==", true)
    .get()
    .then((snap) => {
      const data = {};
      snap.docs.forEach((doc) => {
        data[doc.id] = doc.data();
      });
      return dispatch({ type: ACTIONS.SUBJECTS_GET_SUCCESS, payload: data });
    })
    .catch((err) => {
      console.error(err);
      return dispatch({ type: ACTIONS.SUBJECTS_GET_FAILURE, payload: err });
    });
};

export const onAdd = (newData, deptId) => async (dispatch, getState) => {
  dispatch({ type: ACTIONS.SUBJECTS_CREATE_REQ });
  const db = firebase.firestore();
  const uid = getState().auth.login.user.uid;
  const ref = db.collection("SUBJECTS").doc();
  return ref
    .set({
      ...newData,
      isExist: true,
      id: ref.id,
      sem: "3-2",
      deptId: deptId,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      createdBy: uid,
    })
    .then(() => {
      dispatch(get(deptId));
      return dispatch({ type: ACTIONS.SUBJECTS_CREATE_SUCCESS });
    })
    .catch((err) => {
      console.error(err);
      return dispatch({
        type: ACTIONS.SUBJECTS_CREATE_FAILURE,
        payload: err,
      });
    });
};

export const onUpdate = (deptId, id, newData) => async (dispatch, getState) => {
  dispatch({ type: ACTIONS.SUBJECTS_UPDATE_REQ });
  const db = firebase.firestore();
  const uid = getState().auth.login.user.uid;
  const ref = db.collection("SUBJECTS").doc(id);
  return ref
    .set(
      {
        ...newData,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedBy: uid,
        id: ref.id,
      },
      { merge: true }
    )
    .then(() => {
      dispatch(get(deptId));
      return dispatch({ type: ACTIONS.SUBJECTS_UPDATE_SUCCESS });
    })
    .catch((err) => {
      console.error(err);
      return dispatch({
        type: ACTIONS.SUBJECTS_UPDATE_FAILURE,
        payload: err,
      });
    });
};

export const onDelete = (deptId, id) => async (dispatch, getState) => {
  dispatch({ type: ACTIONS.SUBJECTS_DELETE_REQ });
  const db = firebase.firestore();
  const uid = getState().auth.login.user.uid;
  const ref = db.collection("SUBJECTS").doc(id);
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
      dispatch(get(deptId));
      return dispatch({ type: ACTIONS.SUBJECTS_DELETE_SUCCESS });
    })
    .catch((err) => {
      console.error(err);
      return dispatch({
        type: ACTIONS.SUBJECTS_DELETE_FAILURE,
        payload: err,
      });
    });
};
