import firebase from "../config/fbconfig";
import { ACTIONS } from "../reducers/topics";

export const get =
  (deptId, subjectId, unitId) => async (dispatch, getState) => {
    dispatch({ type: ACTIONS.TOPICS_GET_REQ });
    const db = firebase.firestore();
    return db
      .collection("TOPICS")
      .where("deptId", "==", deptId)
      .where("subjectId", "==", subjectId)
      .where("unitId", "==", unitId)
      .orderBy("createdAt", "asc")
      .get()
      .then((snap) => {
        const data = {};
        snap.docs.forEach((doc) => {
          data[doc.id] = doc.data();
        });
        return dispatch({ type: ACTIONS.TOPICS_GET_SUCCESS, payload: data });
      })
      .catch((err) => {
        console.error(err);
        return dispatch({ type: ACTIONS.TOPICS_GET_FAILURE, payload: err });
      });
  };

export const onAdd =
  (newData, deptId, subjectId, unitId) => async (dispatch, getState) => {
    dispatch({ type: ACTIONS.TOPICS_CREATE_REQ });
    const db = firebase.firestore();
    const uid = getState().auth.login.user.uid;
    const ref = db.collection("TOPICS").doc();
    return ref
      .set({
        ...newData,
        isExist: true,
        id: ref.id,
        deptId,
        subjectId,
        unitId,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        createdBy: uid,
      })
      .then(() => {
        dispatch(get(deptId, subjectId, unitId));
        return dispatch({ type: ACTIONS.TOPICS_CREATE_SUCCESS });
      })
      .catch((err) => {
        console.error(err);
        return dispatch({
          type: ACTIONS.TOPICS_CREATE_FAILURE,
          payload: err,
        });
      });
  };

export const onUpdate =
  (deptId, subjectId, unitId, id, newData) => async (dispatch, getState) => {
    dispatch({ type: ACTIONS.TOPICS_UPDATE_REQ });
    const db = firebase.firestore();
    const uid = getState().auth.login.user.uid;
    const ref = db.collection("TOPICS").doc(id);
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
        dispatch(get(deptId, subjectId, unitId));
        return dispatch({ type: ACTIONS.TOPICS_UPDATE_SUCCESS });
      })
      .catch((err) => {
        console.error(err);
        return dispatch({
          type: ACTIONS.TOPICS_UPDATE_FAILURE,
          payload: err,
        });
      });
  };

export const onDelete =
  (deptId, subjectId, unitId, id) => async (dispatch, getState) => {
    dispatch({ type: ACTIONS.TOPICS_DELETE_REQ });
    const db = firebase.firestore();
    const uid = getState().auth.login.user.uid;
    const ref = db.collection("TOPICS").doc(id);
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
        dispatch(get(deptId, subjectId, unitId));
        return dispatch({ type: ACTIONS.TOPICS_DELETE_SUCCESS });
      })
      .catch((err) => {
        console.error(err);
        return dispatch({
          type: ACTIONS.TOPICS_DELETE_FAILURE,
          payload: err,
        });
      });
  };
