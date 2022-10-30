const express = require("express");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { requireAuth } = require("../../utils/auth");
const {
  User,
  Booking,
  Spot,
  SpotImage,
  Review,
  ReviewImage,
} = require("../../db/models");
const { Sequelize, Op } = require("sequelize");

const router = express.Router();

//Get all Reviews of the Current User
router.get("/current", requireAuth, async (req, res) => {
  const userId = req.user.id;

  const reviews = await Review.findAll({
    where: { userId },
    include: [
      {
        model: Spot,
        attributes: {
          exclude: ["createdAt", "updatedAt", "description"],
        },
      },
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: ReviewImage,
        attributes: ["id", "url"],
      },
    ],
  });

  for (let review of reviews) {
    const previewImage = await SpotImage.findOne({
      where: {
        spotId: review.dataValues.spotId,
        preview: true,
      },
    });
    review.dataValues.Spot.dataValues.previewImage =
      previewImage.dataValues.url;
  }

  return res.json({ Reviews: reviews });
});

module.exports = router;
