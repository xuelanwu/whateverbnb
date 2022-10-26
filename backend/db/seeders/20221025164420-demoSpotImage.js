"use strict";

const demoSpotImages = [
  { spotId: 1, url: "image1.url", preview: true },
  { spotId: 2, url: "image2.url", preview: false },
  { spotId: 3, url: "image3.url", preview: false },
  { spotId: 4, url: "image4.url", preview: true },
  { spotId: 1, url: "image5.url", preview: false },
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
    await queryInterface.bulkInsert("SpotImages", demoSpotImages);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("SpotImages", demoSpotImages);
  },
};
