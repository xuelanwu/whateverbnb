"use strict";

const demoReviews = [
  {
    spotId: 1,
    userId: 4,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    stars: 5,
  },
  {
    spotId: 1,
    userId: 2,
    review:
      "Egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Sed risus ultricies tristique nulla aliquet. Adipiscing elit pellentesque habitant morbi tristique senectus et.",
    stars: 4,
  },
  {
    spotId: 1,
    userId: 3,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae proin sagittis nisl rhoncus mattis rhoncus urna neque. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam.",
    stars: 3,
  },
  {
    spotId: 2,
    userId: 1,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    stars: 2,
  },
  {
    spotId: 2,
    userId: 3,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae proin sagittis nisl rhoncus mattis rhoncus urna neque.",
    stars: 1,
  },
  {
    spotId: 2,
    userId: 4,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae proin sagittis nisl rhoncus mattis rhoncus urna neque. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam.",
    stars: 1,
  },
  {
    spotId: 3,
    userId: 4,
    review:
      "Sed risus ultricies tristique nulla aliquet. Adipiscing elit pellentesque habitant morbi tristique senectus et.",
    stars: 4,
  },
  {
    spotId: 3,
    userId: 5,
    review: "Vivamus posuere euismod rhoncus.",
    stars: 3,
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
