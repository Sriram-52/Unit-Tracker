export const ACTIONS = {
  UNITS_GET_REQ: "UNITS_GET_REQ",
  UNITS_GET_SUCCESS: "UNITS_GET_SUCCESS",
  UNITS_GET_FAILURE: "UNITS_GET_FAILURE",

  UNITS_UPDATE_REQ: "UNITS_UPDATE_REQ",
  UNITS_UPDATE_SUCCESS: "UNITS_UPDATE_SUCCESS",
  UNITS_UPDATE_FAILURE: "UNITS_UPDATE_FAILURE",

  UNITS_DELETE_REQ: "UNITS_DELETE_REQ",
  UNITS_DELETE_SUCCESS: "UNITS_DELETE_SUCCESS",
  UNITS_DELETE_FAILURE: "UNITS_DELETE_FAILURE",

  UNITS_CREATE_REQ: "UNITS_CREATE_REQ",
  UNITS_CREATE_SUCCESS: "UNITS_CREATE_SUCCESS",
  UNITS_CREATE_FAILURE: "UNITS_CREATE_FAILURE",
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

export default function unitsReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ACTIONS.UNITS_GET_REQ:
      return { ...state, get: { ...state.get, isLoading: true } };

    case ACTIONS.UNITS_GET_SUCCESS:
      return {
        ...state,
        get: { ...state.get, isLoading: false, data: payload },
      };

    case ACTIONS.UNITS_GET_FAILURE:
      return {
        ...state,
        get: { ...state.get, isLoading: false, error: payload },
      };

    case ACTIONS.UNITS_UPDATE_REQ:
      return { ...state, update: { ...state.update, isLoading: true } };

    case ACTIONS.UNITS_UPDATE_SUCCESS:
      return { ...state, update: { ...state.update, isLoading: false } };

    case ACTIONS.UNITS_UPDATE_FAILURE:
      return {
        ...state,
        update: { ...state.update, isLoading: false, error: payload },
      };

    case ACTIONS.UNITS_DELETE_REQ:
      return { ...state, delete: { ...state.delete, isLoading: true } };

    case ACTIONS.UNITS_DELETE_SUCCESS:
      return { ...state, delete: { ...state.delete, isLoading: false } };

    case ACTIONS.UNITS_DELETE_FAILURE:
      return {
        ...state,
        delete: { ...state.delete, isLoading: false, error: payload },
      };

    case ACTIONS.UNITS_CREATE_REQ:
      return { ...state, create: { ...state.create, isLoading: true } };

    case ACTIONS.UNITS_CREATE_SUCCESS:
      return { ...state, create: { ...state.create, isLoading: false } };

    case ACTIONS.UNITS_CREATE_FAILURE:
      return {
        ...state,
        create: { ...state.create, isLoading: false, error: payload },
      };

    default:
      return state;
  }
}
