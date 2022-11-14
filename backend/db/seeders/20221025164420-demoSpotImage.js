"use strict";

const demoSpotImages = [
  {
    spotId: 1,
    url: "https://images.pexels.com/photos/2980955/pexels-photo-2980955.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    preview: true,
  },
  {
    spotId: 2,
    url: "https://images.pexels.com/photos/1862402/pexels-photo-1862402.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    preview: true,
  },
  {
    spotId: 3,
    url: "https://images.pexels.com/photos/2480608/pexels-photo-2480608.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    preview: true,
  },
  {
    spotId: 1,
    url: "https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    preview: false,
  },
  {
    spotId: 1,
    url: "https://images.pexels.com/photos/3617496/pexels-photo-3617496.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    preview: false,
  },
  {
    spotId: 1,
    url: "https://images.pexels.com/photos/2351649/pexels-photo-2351649.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    preview: false,
  },
  {
    spotId: 2,
    url: "https://images.pexels.com/photos/750697/pexels-photo-750697.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    preview: false,
  },
  {
    spotId: 2,
    url: "https://images.pexels.com/photos/449461/pexels-photo-449461.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    preview: false,
  },
  {
    spotId: 3,
    url: "https://images.pexels.com/photos/2566860/pexels-photo-2566860.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    preview: false,
  },
  {
    spotId: 4,
    url: "https://images.pexels.com/photos/1559825/pexels-photo-1559825.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    preview: true,
  },
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
