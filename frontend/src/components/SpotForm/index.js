import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  fetchCreateSpot,
  fetchEditSpot,
  fetchCreateSpotImage,
} from "../../store/spot";
import { useHistory, useParams } from "react-router-dom";

const SpotForm = ({ setShowModal, setCreateSpot, createSpot }) => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [img, setImg] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    const spot = {
      address,
      city,
      state,
      country,
      lat: 37.7645358,
      lng: -122.4730327,
      name,
      description,
      price,
    };
    return dispatch(
      createSpot ? fetchCreateSpot(spot) : fetchEditSpot(spotId, spot)
    )
      .then((spot) => {
        if (createSpot) {
          dispatch(fetchCreateSpotImage(spot.id, { url: img, preview: true }));
        }
        history.push(`/spots/${spot.id}`);
      })
      .then(() => setShowModal(false))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li key={`signupError-${idx + 1}`}>{error}</li>
        ))}
      </ul>
      <label>
        Address
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </label>
      <label>
        City
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </label>
      <label>
        State
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
      </label>
      <label>
        Country
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
      </label>
      <label>
        Name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Description
        <input
          type="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>
      <label>
        Price
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </label>
      {createSpot && (
        <label>
          Add an image
          <input
            type="text"
            value={img}
            onChange={(e) => setImg(e.target.value)}
            required
          />
        </label>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default SpotForm;
