"use strict";

const demoReviews = [
  { review: "This was an awesome spot!", stars: 5 },
  { review: "This was a beautiful spot!", stars: 4 },
  { review: "This was a nice spot!", stars: 3 },
  { review: "This was an ok spot!", stars: 2 },
  { review: "This was a worst spot!", stars: 1 },
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
    await queryInterface.bulkDelete("Reviews", demoReviews);
  },
};
