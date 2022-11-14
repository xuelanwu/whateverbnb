import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = "spot/getAllSpots";

const getAllSpots = (spots) => {
  return { type: GET_ALL_SPOTS, spots };
};

export const fetchAllSpots = () => async (dispatch) => {
  const response = await csrfFetch("api/spots");
  const data = await response.json();
  dispatch(getAllSpots(data.Spots));
  return response;
};

const initialState = { spots: null };

const spotReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case GET_ALL_SPOTS:
      action.spots.forEach((spot) => {
        newState[spot.id] = spot;
      });
      return newState;
    default:
      return state;
  }
};

export default spotReducer;
