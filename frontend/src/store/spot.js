import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = "spot/getAllSpots";
const GET_SPOT_DETAIL = "spot/getSpotDetail";

const getAllSpots = (spots) => {
  return { type: GET_ALL_SPOTS, spots };
};
const getSpotDetail = (spot) => {
  return { type: GET_SPOT_DETAIL, spot };
};

export const fetchAllSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");
  const data = await response.json();
  dispatch(getAllSpots(data.Spots));
  return response;
};

export const fetchSpotDetail = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);
  const data = await response.json();
  dispatch(getSpotDetail(data));
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
    case GET_SPOT_DETAIL:
      newState = action.spot;
      return newState;
    default:
      return state;
  }
};

export default spotReducer;
