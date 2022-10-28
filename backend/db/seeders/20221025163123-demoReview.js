"use strict";

const demoReviews = [
  { spotId: 1, userId: 1, review: "This was an awesome spot!", stars: 5 },
  { spotId: 1, userId: 2, review: "This was a beautiful spot!", stars: 4 },
  { spotId: 1, userId: 3, review: "This was a nice spot!", stars: 3 },
  { spotId: 2, userId: 1, review: "This was an ok spot!", stars: 2 },
  { spotId: 3, userId: 1, review: "This was a worst spot!", stars: 1 },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Reviews", demoReviews);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete("Reviews", { [Op.or]: demoReviews });
  },
};
