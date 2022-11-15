import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSpotDetail } from "../../store/spot";

const SpotDetailPage = () => {
  const { spotId } = useParams();
  console.log(spotId);
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spot);

  useEffect(() => {
    dispatch(fetchSpotDetail(spotId));
  }, [dispatch]);

  console.log(spot);

  return <div>'spot detail page'</div>;
};

export default SpotDetailPage;
