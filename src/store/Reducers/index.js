import { combineReducers } from "redux";
import authReducer, { ACTIONS } from "../../reducers/auth";
import departmentsReducer from "../../reducers/departments";
import subjectsReducer from "../../reducers/subjects";
import topicsReducer from "../../reducers/topics";
import unitsReducer from "../../reducers/units";

const appReducer = combineReducers({
  auth: authReducer,
  departments: departmentsReducer,
  subjects: subjectsReducer,
  units: unitsReducer,
  topics: topicsReducer,
});

const rootReducer = (state, action) => {
  if (action.type === ACTIONS.LOGOUT_SUCCESS) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
