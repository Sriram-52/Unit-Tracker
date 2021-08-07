import firebase from "../config/fbconfig";
import { ACTIONS } from "../reducers/units";

export const get = (deptId, subjectId) => async (dispatch, getState) => {
  dispatch({ type: ACTIONS.UNITS_GET_REQ });
  const db = firebase.firestore();
  return db
    .collection("UNITS")
    .where("deptId", "==", deptId)
    .where("subjectId", "==", subjectId)
    .where("isExist", "==", true)
    .orderBy("createdAt", "asc")
    .get()
    .then((snap) => {
      const data = {};
      snap.docs.forEach((doc) => {
        data[doc.id] = doc.data();
      });
      return dispatch({ type: ACTIONS.UNITS_GET_SUCCESS, payload: data });
    })
    .catch((err) => {
      console.error(err);
      return dispatch({ type: ACTIONS.UNITS_GET_FAILURE, payload: err });
    });
};

export const onAdd =
  (newData, deptId, subjectId) => async (dispatch, getState) => {
    dispatch({ type: ACTIONS.UNITS_CREATE_REQ });
    const db = firebase.firestore();
    const uid = getState().auth.login.user.uid;
    const ref = db.collection("UNITS").doc();
    return ref
      .set({
        ...newData,
        isExist: true,
        id: ref.id,
        deptId,
        subjectId,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        createdBy: uid,
      })
      .then(() => {
        dispatch(get(deptId, subjectId));
        return dispatch({ type: ACTIONS.UNITS_CREATE_SUCCESS });
      })
      .catch((err) => {
        console.error(err);
        return dispatch({
          type: ACTIONS.UNITS_CREATE_FAILURE,
          payload: err,
        });
      });
  };

export const onUpdate =
  (deptId, subjectId, id, newData) => async (dispatch, getState) => {
    dispatch({ type: ACTIONS.UNITS_UPDATE_REQ });
    const db = firebase.firestore();
    const uid = getState().auth.login.user.uid;
    const ref = db.collection("UNITS").doc(id);
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
        dispatch(get(deptId, subjectId));
        return dispatch({ type: ACTIONS.UNITS_UPDATE_SUCCESS });
      })
      .catch((err) => {
        console.error(err);
        return dispatch({
          type: ACTIONS.UNITS_UPDATE_FAILURE,
          payload: err,
        });
      });
  };

export const onDelete =
  (deptId, subjectId, id) => async (dispatch, getState) => {
    dispatch({ type: ACTIONS.UNITS_DELETE_REQ });
    const db = firebase.firestore();
    const uid = getState().auth.login.user.uid;
    const ref = db.collection("UNITS").doc(id);
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
        dispatch(get(deptId, subjectId));
        return dispatch({ type: ACTIONS.UNITS_DELETE_SUCCESS });
      })
      .catch((err) => {
        console.error(err);
        return dispatch({
          type: ACTIONS.UNITS_DELETE_FAILURE,
          payload: err,
        });
      });
  };
