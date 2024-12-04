import axios from "axios";
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

export const signIn = (userData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const response = await axios.post(
      "https://blog-application-1-si4j.onrender.com/api/user/login",
      userData
    );

    const token = response.data.token;
    dispatch({ type: LOGIN_SUCCESS, payload: token });
    localStorage.setItem("token", token);
    return true;
  } catch (error) {
    console.error("Sign In Error:", error);
    dispatch({ type: LOGIN_ERROR });
    return false;
  }
};

export const register = (formData) => (dispatch) => {
  dispatch({ type: SIGNUP_REQUEST });
  axios
    .post(
      "https://blog-application-1-si4j.onrender.com/api/user/signup",
      formData
    )
    .then(() => {
      // const { token } = res.data;
      dispatch({ type: SIGNUP_SUCCESS,});
      // localStorage.setItem("token", token);
    })
    .catch(() => {
      dispatch({ type: SIGNUP_ERROR });
    });
};

export const LogoutUsers = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: LOGOUT });
};

export const fetchUserProfile = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  if (!token) return;

  dispatch({ type: FETCH_PROFILE_REQUEST });
  try {
    const response = await axios.get(
      "https://blog-application-1-si4j.onrender.com/api/user/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const userData = response.data;
    dispatch({ type: FETCH_PROFILE_SUCCESS, payload: userData });
    return userData;
  } catch (error) {
    console.error("Fetch Profile Error:", error);
    dispatch({ type: FETCH_PROFILE_ERROR });
    return null;
  }
};

export const updateUserProfile = (profileData) => async (dispatch) => {
  const token = localStorage.getItem("token");
  if (!token) return;

  dispatch({ type: UPDATE_PROFILE_REQUEST });
  try {
    const response = await axios.put(
      "https://blog-application-1-si4j.onrender.com/api/user/profile",
      profileData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const updatedData = response.data;
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: updatedData });
    return updatedData;
  } catch (error) {
    console.error("Update Profile Error:", error);
    dispatch({ type: UPDATE_PROFILE_ERROR });
    return null;
  }
};
