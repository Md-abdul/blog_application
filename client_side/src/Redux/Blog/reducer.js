import {
  FETCH_BLOGS_REQUEST,
  FETCH_BLOGS_SUCCESS,
  FETCH_BLOGS_FAILURE,
  ADD_BLOG_REQUEST,
  ADD_BLOG_SUCCESS,
  ADD_BLOG_FAILURE,
  BLOG_UPDATE,
  BLOG_UPDATE_REQUEST,
  BLOG_UPDATE_FAILURE,
  BLOG_DELETE,
  BLOG_DELETE_REQUEST,
  BLOG_DELETE_FAILURE,
  BLOG_GET,
} from "./actionType";

const initialState = {
  loading: false,
  blogs: [],
  error: "",
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BLOGS_REQUEST:
    case ADD_BLOG_REQUEST:
    case BLOG_UPDATE_REQUEST:
    case BLOG_DELETE_REQUEST:
      return { ...state, loading: true };

    case FETCH_BLOGS_SUCCESS:
      return { ...state, loading: false, blogs: action.payload, error: "" };

    case FETCH_BLOGS_FAILURE:
    case ADD_BLOG_FAILURE:
    case BLOG_UPDATE_FAILURE:
    case BLOG_DELETE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case ADD_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        blogs: [...state.blogs, action.payload],
        error: "",
      };

    case BLOG_UPDATE:
      return {
        ...state,
        loading: false,
        blogs: state.blogs.map((blog) =>
          blog._id === action.payload._id ? action.payload : blog
        ),
        error: "",
      };

    case BLOG_DELETE:
      return {
        ...state,
        loading: false,
        blogs: state.blogs.filter((blog) => blog._id !== action.payload),
        error: "",
      };

    case BLOG_GET:
      return { ...state, loading: false, blogs: action.payload, error: "" };

    default:
      return state;
  }
};
