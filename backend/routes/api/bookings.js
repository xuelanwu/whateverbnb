const express = require("express");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { requireAuth } = require("../../utils/auth");
const { User, Booking, Spot, SpotImage } = require("../../db/models");
const { Sequelize } = require("sequelize");

const router = express.Router();

router.get("/current", requireAuth, async (req, res) => {
  const userId = req.user.id;

  const bookings = await Booking.findAll({
    where: { userId },
    include: {
      model: Spot,
      attributes: [
        "id",
        "ownerId",
        "address",
        "city",
        "state",
        "country",
        "lat",
        "lng",
        "name",
        "price",
      ],
    },
  });

  if (bookings.length > 0) {
    for (let booking of bookings) {
      const previewImage = await SpotImage.findOne({
        where: { spotId: booking.dataValues.Spot.id, preview: true },
      });

      if (previewImage) {
        booking.dataValues.Spot.dataValues.previewImage =
          previewImage.dataValues.url;
      } else {
        booking.dataValues.Spot.dataValues.previewImage =
          "Let's add some photos!";
      }
    }
    return res.json({ Bookings: bookings });
  } else {
    return res.json({ Bookings: "Book now!" });
  }
});

module.exports = router;