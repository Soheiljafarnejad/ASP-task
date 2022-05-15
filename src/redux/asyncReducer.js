import axios from "axios";

const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

export const fetchUserRequest = () => {
  return {
    type: FETCH_USER_REQUEST,
  };
};

export const fetchUserSuccess = (data) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: data,
  };
};

export const fetchUserFailure = (error) => {
  return {
    type: FETCH_USER_FAILURE,
    payload: error,
  };
};

const initState = {
  loading: false,
  data: [],
  error: "",
};

export const asyncReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return { ...state, loading: true, error: "", data: [] };
    case FETCH_USER_SUCCESS:
      return { ...state, loading: false, error: "", data: action.payload };
    case FETCH_USER_FAILURE:
      return { ...state, loading: false, error: action.payload, data: [] };
    default:
      return state;
  }
};

export const fetchUser = () => {
  return function (dispatch) {
    dispatch(fetchUserRequest());
    axios
      .get("http://localhost:3001/data")
      .then((response) => dispatch(fetchUserSuccess(response.data)))
      .catch((error) => dispatch(fetchUserFailure(error.message)));
  };
};
