import { fetchAllSpots } from "../../store/spot";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import SpotCard from "./SpotCard";
import "./index.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots);

  useEffect(() => {
    dispatch(fetchAllSpots());
  }, [dispatch]);

  // if (!spots.spots) return null;
  return (
    <div className="spot-card-container">
      {spots ? (
        Object.values(spots).map((spot) => {
          if (spot)
            return (
              <li key={`spotId-${spot.id}`} className="spot-card">
                <SpotCard spot={spot} />
              </li>
            );
        })
      ) : (
        <div className="no-matches-container">
          <h3>No exact matches</h3>
          <p>
            Try changing or removing some of your filters or adjusting your
            search area.
          </p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
