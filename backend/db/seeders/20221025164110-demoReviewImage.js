"use strict";

const demoReviewImages = [
  { url: "image1.url" },
  { url: "image2.url" },
  { url: "image3.url" },
  { url: "image4.url" },
  { url: "image5.url" },
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
    await queryInterface.bulkInsert("ReviewImages", demoReviewImages);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("ReviewImages", demoReviewImages);
  },
};
