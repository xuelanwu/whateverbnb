const express = require("express");

const { handleValidationErrors } = require("../../utils/validation");

const { requireAuth } = require("../../utils/auth");
const { User, Spot, Review, SpotImage } = require("../../db/models");
const { Sequelize } = require("sequelize");

const router = express.Router();

const handleSpots = async (spots) => {
  for (const spot of spots) {
    const totalRatings = await Review.sum("stars", {
      where: { spotId: spot.id },
    });
    const ratingCount = await Review.count({ where: { spotId: spot.id } });
    if (totalRatings && ratingCount) {
      const avgRating = Math.round(totalRatings / ratingCount, 1);
      spot.dataValues.avgRating = avgRating;
    } else spot.dataValues.avgRating = "We'd love to hear from you!";

    const previewImage = await SpotImage.findOne({
      where: { spotId: spot.id, preview: true },
    });
    if (previewImage) {
      spot.dataValues.previewImage = previewImage.url;
    } else spot.dataValues.previewImage = "Let's add some photos!";
  }
  return spots;
};

//Get all spots
router.get("/", async (req, res) => {
  const spots = await Spot.findAll();
  const result = await handleSpots(spots);
  return res.json({ Spots: result });
});

//Get all Spots owned by the Current User
router.get("/current", requireAuth, async (req, res) => {
  const userId = req.user.id;
  const spots = await Spot.findAll({
    where: { ownerId: userId },
  });
  if (spots.length > 0) {
    const result = await handleSpots(spots);
    return res.json({ Spots: result });
  } else res.json({ Spots: "Become a Host in 10 easy steps" });
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
  } else result = { ...spot.dataValues };

  const spotReviews = await spot.getReviews({
    includes: { model: Review },
    attributes: [
      [Sequelize.fn("COUNT", Sequelize.col("spotId")), "numReviews"],
      [Sequelize.fn("AVG", Sequelize.col("stars")), "avgRating"],
    ],
  });
  const { numReviews, avgRating } = spotReviews[0].dataValues;
  result.numReviews = numReviews;
  if (numReviews === 0) result.avgRating = "Please leave a review!";
  else result.avgRating = avgRating;

  const spotImages = await spot.getSpotImages({
    includes: { model: SpotImage },
    attributes: ["id", "url", "preview"],
  });
  if (spotImages.length > 0) result.SpotImage = spotImages;
  else result.SpotImage = "Let's add some photos!";

  const owner = await spot.getUser({
    includes: { model: User },
    attributes: ["id", "firstName", "lastName"],
  });
  result.Owner = { ...owner.dataValues };

  return res.json(result);
});

module.exports = router;
