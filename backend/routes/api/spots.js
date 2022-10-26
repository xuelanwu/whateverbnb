const express = require("express");

const { handleValidationErrors } = require("../../utils/validation");

const { requireAuth } = require("../../utils/auth");
const { Spot, Review, SpotImage } = require("../../db/models");

const router = express.Router();

//Get all spots
router.get("/", async (req, res) => {
  const spots = await Spot.findAll();
  for (const spot of spots) {
    const totalRatings = await Review.sum("stars", {
      where: { spotId: spot.id },
    });
    const ratingCount = await Review.count({ where: { spotId: spot.id } });
    if (totalRatings && ratingCount) {
      const avgRating = Math.round(totalRatings / ratingCount, 1);
      spot.dataValues.avgRating = avgRating;
    }

    const previewImage = await SpotImage.findOne({
      where: { spotId: spot.id, preview: true },
    });
    if (previewImage) spot.dataValues.previewImage = previewImage.url;
  }
  return res.json({ Spots: spots });
});

module.exports = router;
