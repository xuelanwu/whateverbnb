import { fetchAllSpots } from "../../store/spot";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import SpotCard from "./SpotCard";
import "./index.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots);
  const spotList = Object.values(spots);

  useEffect(() => {
    dispatch(fetchAllSpots());
  }, [dispatch]);

  console.log(spots);
  if (!spots.spots) return null;
  return (
    <div className="spot-card-container">
      {spotList.map((spot) => {
        return (
          <li key={`spotId-${spot.id}`} className="spot-card">
            <SpotCard spot={spot} />
          </li>
        );
      })}
    </div>
  );
};

export default HomePage;
