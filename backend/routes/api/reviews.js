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

//Add an Image to a Review based on the Review's id
router.post("/:reviewId/images", requireAuth, async (req, res, next) => {
  const userId = req.user.id;
  const { reviewId } = req.params;
  const { url } = req.body;

  const review = await Review.findByPk(reviewId);
  if (!review) {
    const err = new Error("Review couldn't be found");
    err.status = 404;
    err.title = "Review Not Found";
    err.errors = ["Review couldn't be found"];
    return next(err);
  }

  if (userId !== review.dataValues.userId) {
    const err = new Error("Review must belong to the current user");
    err.status = 403;
    err.title = "Forbidden";
    err.errors = ["Review must belong to the current user"];
    return next(err);
  }

  const imagesNum = await ReviewImage.count({
    where: {
      reviewId,
    },
  });
  if (imagesNum >= 10) {
    const err = new Error(
      "Maximum number of images for this resource was reached"
    );
    err.status = 403;
    err.title = "Max Images Reached";
    err.errors = ["Maximum number of images for this resource was reached"];
    return next(err);
  }

  const newImage = await ReviewImage.create({
    reviewId,
    url,
  });
  return res.json({ newImage });
});

module.exports = router;
