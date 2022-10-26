"use strict";

const demoSpotImages = [
  { url: "image1.url", preview: true },
  { url: "image2.url", preview: false },
  { url: "image3.url", preview: false },
  { url: "image4.url", preview: true },
  { url: "image5.url", preview: true },
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
    await queryInterface.bulkDelete("SporImages", demoSpotImages);
  },
};
