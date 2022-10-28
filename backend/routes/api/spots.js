const express = require("express");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { requireAuth } = require("../../utils/auth");
const { User, Spot, Review, Booking, SpotImage } = require("../../db/models");
const { Sequelize, Op } = require("sequelize");
const e = require("express");

const router = express.Router();

const getSpotReview = async (spot) => {
  let result = {};
  const spotReviews = await spot.getReviews({
    includes: { model: Review },
    attributes: [
      [Sequelize.fn("COUNT", Sequelize.col("spotId")), "numReviews"],
      [Sequelize.fn("AVG", Sequelize.col("stars")), "avgRating"],
    ],
  });
  const { numReviews, avgRating } = spotReviews[0].dataValues;
  result.numReviews = numReviews;
  if (numReviews === 0) {
    result.avgRating = "We'd love to hear from you!";
  } else {
    result.avgRating = avgRating;
  }
  return result;
};

const getSpotPreviewImage = async (spot) => {
  const previewImage = await SpotImage.findOne({
    where: { spotId: spot.id, preview: true },
  });

  if (previewImage) {
    console.log(previewImage.dataValues.url);
    return previewImage.dataValues.url;
  } else {
    return "Let's add some photos!";
  }
};

const handleAllSpotsReponse = async (spots) => {
  for (let spot of spots) {
    const { avgRating } = await getSpotReview(spot);
    spot.dataValues.avgRating = avgRating;

    const previewImageUrl = await getSpotPreviewImage(spot);
    spot.dataValues.previewImage = previewImageUrl;
  }
  return spots;
};

//Get all spots
router.get("/", async (req, res) => {
  const spots = await Spot.findAll();
  if (spots.length > 0) {
    const result = await handleAllSpotsReponse(spots);
    return res.json({ Spots: result });
  } else {
    return res.json({ Spots: "Add an spot" });
  }
});

//Get all Spots owned by the Current User
router.get("/current", requireAuth, async (req, res) => {
  const userId = req.user.id;

  const spots = await Spot.findAll({
    where: { ownerId: userId },
  });

  if (spots.length > 0) {
    const result = await handleAllSpotsReponse(spots);
    return res.json({ Spots: result });
  } else {
    return res.json({ Spots: "Become a Host in 10 easy steps" });
  }
});

//Get details of a Spot from an id
router.get("/:spotId", async (req, res, next) => {
  let result = {};

  const { spotId } = req.params;

  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    err.title = "Spot Not Found";
    err.errors = ["Spot couldn't be found"];
    return next(err);
  } else {
    result = { ...spot.dataValues };
  }

  const { numReviews, avgRating } = await getSpotReview(spot);
  result.numReviews = numReviews;
  result.avgRating = avgRating;

  const spotImages = await spot.getSpotImages({
    includes: { model: SpotImage },
    attributes: ["id", "url", "preview"],
  });
  if (spotImages.length > 0) {
    result.SpotImage = spotImages;
  } else {
    result.SpotImage = "Let's add some photos!";
  }

  const owner = await spot.getUser({
    includes: { model: User },
    attributes: ["id", "firstName", "lastName"],
  });
  result.Owner = { ...owner.dataValues };

  return res.json(result);
});

//Create a Spot
router.post("/", requireAuth, async (req, res) => {
  const ownerId = req.user.id;
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  const spot = await Spot.create({
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
  });
  return res.json(spot);
});

//Edit a Spot
router.put("/:spotId", requireAuth, async (req, res, next) => {
  const userId = req.user.id;
  const { spotId } = req.params;
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    err.title = "Spot Not Found";
    err.errors = ["Spot couldn't be found"];
    return next(err);
  } else {
    result = { ...spot.dataValues };
  }

  if (userId === spot.dataValues.ownerId) {
    const updatedSpot = await spot.update({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    });
    return res.json(updatedSpot);
  } else return res.json("Only owner can update");
});

//Delete a Spot
router.delete("/:spotId", requireAuth, async (req, res, next) => {
  const userId = req.user.id;
  const { spotId } = req.params;

  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    err.title = "Spot Not Found";
    err.errors = ["Spot couldn't be found"];
    return next(err);
  } else {
    result = { ...spot.dataValues };
  }

  if (userId === spot.dataValues.ownerId) {
    await spot.destroy();
    res.status = 200;
    return res.json({
      message: `Successfully deleted ${spotId}`,
      statusCode: 200,
    });
  } else return res.json("Only owner can update");
});

//Add an Image to a Spot based on the Spot's id
router.post("/:spotId/images", requireAuth, async (req, res, next) => {
  const userId = req.user.id;
  const { spotId } = req.params;
  const { url, preview } = req.body;

  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    err.title = "Spot Not Found";
    err.errors = ["Spot couldn't be found"];
    return next(err);
  } else {
    result = { ...spot.dataValues };
  }

  if (userId === spot.dataValues.ownerId) {
    const image = await SpotImage.create({ spotId, url, preview });
    const { id } = image.dataValues;
    console.log(image);
    return res.json({ id, url, preview });
  } else return res.json("Only owner can update");
});

//Get all Bookings for a Spot based on the Spot's id
router.get("/:spotId/bookings", requireAuth, async (req, res, next) => {
  const userId = req.user.id;
  const { spotId } = req.params;
  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    err.title = "Spot Not Found";
    err.errors = ["Spot couldn't be found"];
    return next(err);
  }
  if (userId === spot.dataValues.ownerId) {
    const bookings = await Booking.findAll({
      where: { spotId },
      include: {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
    });
    return res.json(bookings);
  } else {
    const bookings = await Booking.findAll({
      where: { spotId },
      attributes: ["spotId", "startDate", "endDate"],
    });
    return res.json(bookings);
  }
});

//Create a Booking from a Spot based on the Spot's id
router.post("/:spotId/bookings", requireAuth, async (req, res, next) => {
  const userId = req.user.id;
  const { spotId } = req.params;
  const { startDate: newStartDate, endDate: newEndDate } = req.body;

  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    err.title = "Spot Not Found";
    err.errors = ["Spot couldn't be found"];
    return next(err);
  }

  if (userId === spot.dataValues.ownerId) {
    const err = new Error("Spot must NOT belong to the current users");
    err.status = 403;
    err.title = "Forbidden";
    err.errors = ["Spot must NOT belong to the current user"];
    return next(err);
  }

  const conflict = await Booking.count({
    where: {
      spotId,
      startDate: { [Op.lte]: newStartDate },
      endDate: { [Op.gte]: newEndDate },
    },
  });
  if (conflict) {
    const err = new Error(
      "Sorry, this spot is already booked for the specified dates"
    );
    err.status = 403;
    err.title = "Booking Conflict";
    err.errors = [
      "Start date conflicts with an existing booking",
      "End date conflicts with an existing booking",
    ];
    return next(err);
  }

  const booking = await Booking.create({
    spotId,
    userId,
    startDate: newStartDate,
    endDate: newEndDate,
  });
  return res.json(booking);
});

module.exports = router;
