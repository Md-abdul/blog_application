import axios from "axios";
import {
  FETCH_BLOGS_REQUEST,
  FETCH_BLOGS_SUCCESS,
  FETCH_BLOGS_FAILURE,
  ADD_BLOG_REQUEST,
  ADD_BLOG_SUCCESS,
  ADD_BLOG_FAILURE,
  BLOG_UPDATE,
  BLOG_GET,
  BLOG_UPDATE_REQUEST,
  BLOG_UPDATE_FAILURE,
  BLOG_DELETE_REQUEST,
  BLOG_DELETE,
  BLOG_DELETE_FAILURE,
} from "./actionType";

export const fetchBlogs = () => async (dispatch) => {
  dispatch({ type: FETCH_BLOGS_REQUEST });
  try {
    const response = await axios.get(
      "https://blog-application-1-si4j.onrender.com/api/blog/allblogs"
    );
    dispatch({ type: FETCH_BLOGS_SUCCESS, payload: response.data });
    return true;
  } catch (error) {
    console.error("Error:", error);
    dispatch({ type: FETCH_BLOGS_FAILURE, payload: error.message });
    return false;
  }
};

export const addBlog = (blogData) => async (dispatch) => {
  dispatch({ type: ADD_BLOG_REQUEST });

  try {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(
      "https://blog-application-1-si4j.onrender.com/api/blog/addblog",
      blogData,
      config
    );

    dispatch({ type: ADD_BLOG_SUCCESS, payload: response.data });
    return true;
  } catch (error) {
    console.error("Error:", error);
    dispatch({ type: ADD_BLOG_FAILURE, payload: error.message });
    return false;
  }
};

export const getBlog = () => async (dispatch) => {
  dispatch({ type: FETCH_BLOGS_REQUEST });
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      "https://blog-application-1-si4j.onrender.com/api/blog/myblogs",
      config
    );
    dispatch({ type: BLOG_GET, payload: response.data });
    return true;
  } catch (error) {
    console.error("Error:", error);
    dispatch({ type: FETCH_BLOGS_FAILURE, payload: error.message });
    return false;
  }
};

export const updateBlog = (_id, blogUpdate) => async (dispatch) => {
  dispatch({ type: BLOG_UPDATE_REQUEST });
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put(
      `https://blog-application-1-si4j.onrender.com/api/blog/updateblog/${_id}`,
      blogUpdate,
      config
    );
    dispatch({ type: BLOG_UPDATE, payload: response.data });
    return true;
  } catch (error) {
    console.error("Error:", error);
    dispatch({ type: BLOG_UPDATE_FAILURE, payload: error.message });
    return false;
  }
};

export const deleteBlog = (_id) => async (dispatch) => {
  dispatch({ type: BLOG_DELETE_REQUEST });
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.delete(
      `https://blog-application-1-si4j.onrender.com/api/blog/deleteblog/${_id}`,
      config
    );
    dispatch({ type: BLOG_DELETE, payload: _id });
    return true;
  } catch (error) {
    console.error("Error:", error);
    dispatch({ type: BLOG_DELETE_FAILURE, payload: error.message });
    return false;
  }
};
