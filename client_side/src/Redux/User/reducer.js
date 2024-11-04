import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_ERROR,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERROR,
} from "./actionType";

const initialState = {
  isAuth: false,
  isLoading: false,
  isError: false,
  token: null,
  name: null,
  profile: null, 
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_REQUEST:
    case SIGNUP_REQUEST:
    case FETCH_PROFILE_REQUEST:
    case UPDATE_PROFILE_REQUEST:
      return { ...state, isLoading: true, isError: false };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        token: payload,
        name: payload,
      };

    case SIGNUP_SUCCESS:
      return { ...state, isLoading: false, isAuth: false };

    case LOGIN_ERROR:
    case SIGNUP_ERROR:
    case FETCH_PROFILE_ERROR:
    case UPDATE_PROFILE_ERROR:
      return { ...state, isLoading: false, isError: true };

    case FETCH_PROFILE_SUCCESS:
      return { ...state, isLoading: false, profile: payload };

    case UPDATE_PROFILE_SUCCESS:
      return { ...state, isLoading: false, profile: payload };

    case LOGOUT:
      return { ...initialState };

    default:
      return state;
  }
};
