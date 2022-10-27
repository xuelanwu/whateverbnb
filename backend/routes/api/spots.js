const express = require("express");

const { handleValidationErrors } = require("../../utils/validation");

const { requireAuth } = require("../../utils/auth");
const { User, Spot, Review, SpotImage } = require("../../db/models");
const { Sequelize } = require("sequelize");

const router = express.Router();

const getSpotReview = async (spot) => {
  let result = {};
  const spotReviews = await spot.getReviews({
    includes: { model: Review },
    attributes: [
      [Sequelize.fn("COUNT", Sequelize.col("spotId")), "numReviews"],
      [
        Sequelize.fn("ROUND", Sequelize.fn("AVG", Sequelize.col("stars")), 1),
        "avgRating",
      ],
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
  console.log(previewImage);
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
  console.log(userId);
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

module.exports = router;
