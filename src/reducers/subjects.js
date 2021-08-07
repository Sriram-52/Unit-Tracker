export const ACTIONS = {
  SUBJECTS_GET_REQ: "SUBJECTS_GET_REQ",
  SUBJECTS_GET_SUCCESS: "SUBJECTS_GET_SUCCESS",
  SUBJECTS_GET_FAILURE: "SUBJECTS_GET_FAILURE",

  SUBJECTS_UPDATE_REQ: "SUBJECTS_UPDATE_REQ",
  SUBJECTS_UPDATE_SUCCESS: "SUBJECTS_UPDATE_SUCCESS",
  SUBJECTS_UPDATE_FAILURE: "SUBJECTS_UPDATE_FAILURE",

  SUBJECTS_DELETE_REQ: "SUBJECTS_DELETE_REQ",
  SUBJECTS_DELETE_SUCCESS: "SUBJECTS_DELETE_SUCCESS",
  SUBJECTS_DELETE_FAILURE: "SUBJECTS_DELETE_FAILURE",

  SUBJECTS_CREATE_REQ: "SUBJECTS_CREATE_REQ",
  SUBJECTS_CREATE_SUCCESS: "SUBJECTS_CREATE_SUCCESS",
  SUBJECTS_CREATE_FAILURE: "SUBJECTS_CREATE_FAILURE",
};

const initialState = {
  get: {
    data: {},
    isLoading: false,
    error: null,
  },
  update: {
    isLoading: false,
    error: null,
  },
  delete: {
    isLoading: false,
    error: null,
  },
  create: {
    isLoading: false,
    error: null,
  },
};

export default function subjectsReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case ACTIONS.SUBJECTS_GET_REQ:
      return { ...state, get: { ...state.get, isLoading: true } };

    case ACTIONS.SUBJECTS_GET_SUCCESS:
      return {
        ...state,
        get: { ...state.get, isLoading: false, data: payload },
      };

    case ACTIONS.SUBJECTS_GET_FAILURE:
      return {
        ...state,
        get: { ...state.get, isLoading: false, error: payload },
      };

    case ACTIONS.SUBJECTS_UPDATE_REQ:
      return { ...state, update: { ...state.update, isLoading: true } };

    case ACTIONS.SUBJECTS_UPDATE_SUCCESS:
      return { ...state, update: { ...state.update, isLoading: false } };

    case ACTIONS.SUBJECTS_UPDATE_FAILURE:
      return {
        ...state,
        update: { ...state.update, isLoading: false, error: payload },
      };

    case ACTIONS.SUBJECTS_DELETE_REQ:
      return { ...state, delete: { ...state.delete, isLoading: true } };

    case ACTIONS.SUBJECTS_DELETE_SUCCESS:
      return { ...state, delete: { ...state.delete, isLoading: false } };

    case ACTIONS.SUBJECTS_DELETE_FAILURE:
      return {
        ...state,
        delete: { ...state.delete, isLoading: false, error: payload },
      };

    case ACTIONS.SUBJECTS_CREATE_REQ:
      return { ...state, create: { ...state.create, isLoading: true } };

    case ACTIONS.SUBJECTS_CREATE_SUCCESS:
      return { ...state, create: { ...state.create, isLoading: false } };

    case ACTIONS.SUBJECTS_CREATE_FAILURE:
      return {
        ...state,
        create: { ...state.create, isLoading: false, error: payload },
      };

    default:
      return state;
  }
}
