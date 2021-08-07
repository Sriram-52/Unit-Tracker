export const ACTIONS = {
  DEPARTMENTS_GET_REQ: "DEPARTMENTS_GET_REQ",
  DEPARTMENTS_GET_SUCCESS: "DEPARTMENTS_GET_SUCCESS",
  DEPARTMENTS_GET_FAILURE: "DEPARTMENTS_GET_FAILURE",

  DEPARTMENTS_UPDATE_REQ: "DEPARTMENTS_UPDATE_REQ",
  DEPARTMENTS_UPDATE_SUCCESS: "DEPARTMENTS_UPDATE_SUCCESS",
  DEPARTMENTS_UPDATE_FAILURE: "DEPARTMENTS_UPDATE_FAILURE",

  DEPARTMENTS_DELETE_REQ: "DEPARTMENTS_DELETE_REQ",
  DEPARTMENTS_DELETE_SUCCESS: "DEPARTMENTS_DELETE_SUCCESS",
  DEPARTMENTS_DELETE_FAILURE: "DEPARTMENTS_DELETE_FAILURE",

  DEPARTMENTS_CREATE_REQ: "DEPARTMENTS_CREATE_REQ",
  DEPARTMENTS_CREATE_SUCCESS: "DEPARTMENTS_CREATE_SUCCESS",
  DEPARTMENTS_CREATE_FAILURE: "DEPARTMENTS_CREATE_FAILURE",
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

export default function departmentsReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case ACTIONS.DEPARTMENTS_GET_REQ:
      return { ...state, get: { ...state.get, isLoading: true } };

    case ACTIONS.DEPARTMENTS_GET_SUCCESS:
      return {
        ...state,
        get: { ...state.get, isLoading: false, data: payload },
      };

    case ACTIONS.DEPARTMENTS_GET_FAILURE:
      return {
        ...state,
        get: { ...state.get, isLoading: false, error: payload },
      };

    case ACTIONS.DEPARTMENTS_UPDATE_REQ:
      return { ...state, update: { ...state.update, isLoading: true } };

    case ACTIONS.DEPARTMENTS_UPDATE_SUCCESS:
      return { ...state, update: { ...state.update, isLoading: false } };

    case ACTIONS.DEPARTMENTS_UPDATE_FAILURE:
      return {
        ...state,
        update: { ...state.update, isLoading: false, error: payload },
      };

    case ACTIONS.DEPARTMENTS_DELETE_REQ:
      return { ...state, delete: { ...state.delete, isLoading: true } };

    case ACTIONS.DEPARTMENTS_DELETE_SUCCESS:
      return { ...state, delete: { ...state.delete, isLoading: false } };

    case ACTIONS.DEPARTMENTS_DELETE_FAILURE:
      return {
        ...state,
        delete: { ...state.delete, isLoading: false, error: payload },
      };

    case ACTIONS.DEPARTMENTS_CREATE_REQ:
      return { ...state, create: { ...state.create, isLoading: true } };

    case ACTIONS.DEPARTMENTS_CREATE_SUCCESS:
      return { ...state, create: { ...state.create, isLoading: false } };

    case ACTIONS.DEPARTMENTS_CREATE_FAILURE:
      return {
        ...state,
        create: { ...state.create, isLoading: false, error: payload },
      };

    default:
      return state;
  }
}
