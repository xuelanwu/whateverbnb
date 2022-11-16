import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = "spot/getAllSpots";
const GET_SPOT_DETAIL = "spot/getSpotDetail";
// const CREATE_SPOT = "spot/createSpot";
// const ADD_SPOT_IMAGE = "spot/addSpotImage";

const getAllSpots = (spots) => {
  return { type: GET_ALL_SPOTS, spots };
};
const getSpotDetail = (spot) => {
  return { type: GET_SPOT_DETAIL, spot };
};
// const createSpot = (spot) => {
//   return { type: CREATE_SPOT, spot };
// };
// const addSpotImage = (spotId, img) => {
//   return { type: CREATE_SPOT_IMAGE, spotId, img };
// };

export const fetchAllSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");
  const data = await response.json();
  dispatch(getAllSpots(data.Spots));
  return response;
};
export const fetchCreateSpot = (spot) => async (dispatch) => {
  const response = await csrfFetch("/api/spots", {
    method: "POST",
    body: JSON.stringify(spot),
  });
  const data = await response.json();
  const { id } = data;
  dispatch(fetchSpotDetail(id));
  return data;
};

export const fetchSpotDetail = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);
  const data = await response.json();
  dispatch(getSpotDetail(data));
  return response;
};

export const fetchCreateSpotImage = (spotId, img) => async (dispatch) => {
  console.log(img);
  const response = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: "POST",
    body: JSON.stringify(img),
  });

  const data = await response.json();
  dispatch(fetchSpotDetail(spotId));
  return data;
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
    // case CREATE_SPOT:
    //   newState = action.spot;
    //   return newState;
    // case ADD_SPOT_IMAGE:
    //   console.log(action);
    //   return newState;
    default:
      return state;
  }
};

export default spotReducer;
