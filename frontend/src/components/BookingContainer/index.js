import "./index.css";

const BookingContainer = ({ spot, avgRating, reviewList }) => {
  console.log("********* spot", spot);
  return (
    <div className="booking-container">
      <div className="booking-price-block">
        <div className="booking-price-left">
          <h2>
            {`$${spot.price}`}
            <span> night</span>
          </h2>
        </div>
        <div className="booking-price-right">
          <i className="fa-solid fa-star fa-sm"></i>
          {reviewList.length > 0 ? (
            <span>
              <span className="booking-avg">{`${avgRating}`} · </span>
              <span className="booking-reviews">{`${reviewList.length} reviews`}</span>
            </span>
          ) : (
            <span>New</span>
          )}
        </div>
      </div>
      <div className="booking-date-block"></div>
      <div className="booking-button-block"></div>
    </div>
  );
};

export default BookingContainer;
