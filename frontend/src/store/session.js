import { csrfFetch } from "./csrf";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

const setUser = (user) => {
  return { type: SET_USER, user };
};

const removeUser = () => {
  return { type: REMOVE_USER };
};

export const login = (user) => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify(user),
  });
  if (response.ok) {
    const data = await response.json();
    const { id, firstName, lastName, username, email } = data;
    dispatch(setUser({ id, firstName, lastName, username, email }));
  }
  return response;
};

export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("api/session");
  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
  }
  return response;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = { ...state };
      newState.user = action.user;
      return newState;
    case REMOVE_USER:
      return initialState;
    default:
      return state;
  }
};

export default sessionReducer;
