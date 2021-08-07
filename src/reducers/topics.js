export const ACTIONS = {
  TOPICS_GET_REQ: "TOPICS_GET_REQ",
  TOPICS_GET_SUCCESS: "TOPICS_GET_SUCCESS",
  TOPICS_GET_FAILURE: "TOPICS_GET_FAILURE",

  TOPICS_UPDATE_REQ: "TOPICS_UPDATE_REQ",
  TOPICS_UPDATE_SUCCESS: "TOPICS_UPDATE_SUCCESS",
  TOPICS_UPDATE_FAILURE: "TOPICS_UPDATE_FAILURE",

  TOPICS_DELETE_REQ: "TOPICS_DELETE_REQ",
  TOPICS_DELETE_SUCCESS: "TOPICS_DELETE_SUCCESS",
  TOPICS_DELETE_FAILURE: "TOPICS_DELETE_FAILURE",

  TOPICS_CREATE_REQ: "TOPICS_CREATE_REQ",
  TOPICS_CREATE_SUCCESS: "TOPICS_CREATE_SUCCESS",
  TOPICS_CREATE_FAILURE: "TOPICS_CREATE_FAILURE",
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

export default function topicsReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ACTIONS.TOPICS_GET_REQ:
      return { ...state, get: { ...state.get, isLoading: true } };

    case ACTIONS.TOPICS_GET_SUCCESS:
      return {
        ...state,
        get: { ...state.get, isLoading: false, data: payload },
      };

    case ACTIONS.TOPICS_GET_FAILURE:
      return {
        ...state,
        get: { ...state.get, isLoading: false, error: payload },
      };

    case ACTIONS.TOPICS_UPDATE_REQ:
      return { ...state, update: { ...state.update, isLoading: true } };

    case ACTIONS.TOPICS_UPDATE_SUCCESS:
      return { ...state, update: { ...state.update, isLoading: false } };

    case ACTIONS.TOPICS_UPDATE_FAILURE:
      return {
        ...state,
        update: { ...state.update, isLoading: false, error: payload },
      };

    case ACTIONS.TOPICS_DELETE_REQ:
      return { ...state, delete: { ...state.delete, isLoading: true } };

    case ACTIONS.TOPICS_DELETE_SUCCESS:
      return { ...state, delete: { ...state.delete, isLoading: false } };

    case ACTIONS.TOPICS_DELETE_FAILURE:
      return {
        ...state,
        delete: { ...state.delete, isLoading: false, error: payload },
      };

    case ACTIONS.TOPICS_CREATE_REQ:
      return { ...state, create: { ...state.create, isLoading: true } };

    case ACTIONS.TOPICS_CREATE_SUCCESS:
      return { ...state, create: { ...state.create, isLoading: false } };

    case ACTIONS.TOPICS_CREATE_FAILURE:
      return {
        ...state,
        create: { ...state.create, isLoading: false, error: payload },
      };

    default:
      return state;
  }
}
