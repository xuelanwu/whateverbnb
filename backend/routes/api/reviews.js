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
        include: {
          model: SpotImage,
          as: "previewImage",
          where: { preview: true },
          attributes: ["url"],
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

  return res.json({ Reviews: reviews });
});

module.exports = router;
