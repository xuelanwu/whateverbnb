import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = "spot/getAllSpots";
const CREATE_SPOT = "spot/createSpot";

const getAllSpots = (spots) => {
  return { type: GET_ALL_SPOTS, spots };
};
const createSpot = (spot) => {
  return { type: CREATE_SPOT, spot };
};

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

  const {
    id,
    ownerId,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  } = data;
  dispatch(
    createSpot({
      id,
      ownerId,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    })
  );
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
    case CREATE_SPOT:
      newState = action.spot;
      return newState;
    default:
      return state;
  }
};

export default spotReducer;
