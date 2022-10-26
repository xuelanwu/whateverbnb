"use strict";

const demoBookings = [
  {
    startDate: "2025-1-24",
    endDate: "2025-1-25",
  },
  {
    startDate: "2025-2-24",
    endDate: "2025-2-25",
  },
  {
    startDate: "2025-3-24",
    endDate: "2025-3-25",
  },
  {
    startDate: "2025-4-24",
    endDate: "2025-4-25",
  },
  {
    startDate: "2025-5-24",
    endDate: "2025-5-25",
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
    await queryInterface.bulkInsert("Bookings", demoBookings);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Bookings", demoBookings);
  },
};
