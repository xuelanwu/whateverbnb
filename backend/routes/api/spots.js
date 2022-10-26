const express = require("express");

const { handleValidationErrors } = require("../../utils/validation");

const { requireAuth } = require("../../utils/auth");
const { Spot, Review, SpotImage } = require("../../db/models");

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

module.exports = router;