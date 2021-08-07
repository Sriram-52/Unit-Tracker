export const ACTIONS = {
  LOGIN_REQ: "LOGIN_REQ",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",

  SIGNUP_REQ: "SIGNUP_REQ",
  SIGNUP_SUCCESS: "SIGNUP_SUCCESS",
  SIGNUP_FAILURE: "SIGNUP_FAILURE",

  LOGOUT_REQ: "LOGOUT_REQ",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  LOGOUT_FAILURE: "LOGOUT_FAILURE",
};

const initialState = {
  login: {
    user: null,
    isLoading: false,
    error: null,
  },
  signup: {
    isLoading: false,
    error: null,
  },
  logout: {
    isLoading: false,
    error: null,
  },
};

export default function authReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ACTIONS.LOGIN_REQ:
      return {
        ...state,
        login: {
          ...state.login,
          isLoading: true,
        },
      };

    case ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        login: {
          ...state.login,
          isLoading: false,
          user: payload,
        },
      };

    case ACTIONS.LOGIN_FAILURE:
      return {
        ...state,
        login: {
          ...state.login,
          isLoading: false,
          error: payload,
        },
      };

    case ACTIONS.SIGNUP_REQ:
      return {
        ...state,
        signup: {
          ...state.signup,
          isLoading: true,
        },
      };

    case ACTIONS.SIGNUP_SUCCESS:
      return {
        ...state,
        signup: {
          ...state.signup,
          isLoading: false,
        },
      };

    case ACTIONS.SIGNUP_FAILURE:
      return {
        ...state,
        signup: {
          ...state.signup,
          isLoading: false,
          error: payload,
        },
      };

    case ACTIONS.LOGOUT_REQ:
      return {
        ...state,
        logout: {
          ...state.logout,
          isLoading: true,
        },
      };

    case ACTIONS.LOGOUT_SUCCESS:
      return {
        ...state,
        logout: {
          ...state.logout,
          isLoading: false,
        },
      };

    case ACTIONS.LOGOUT_FAILURE:
      return {
        ...state,
        logout: {
          ...state.logout,
          isLoading: false,
          error: payload,
        },
      };

    default:
      return state;
  }
}
