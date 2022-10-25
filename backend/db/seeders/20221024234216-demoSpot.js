"use strict";

const demoSpots = [
  {
    address: "aaa456 Disney Lane",
    city: "San Francisco",
    state: "California",
    country: "United States of America",
    lat: 37.7645351,
    lng: -122.4730321,
    name: "App Academy Demo1",
    description: "Place where web developers are created",
    price: 123,
  },
  {
    address: "bbb123 Disney Lane",
    city: "San Francisco",
    state: "California",
    country: "United States of America",
    lat: 37.7645352,
    lng: -122.47303272,
    name: "App Academy Demo2",
    description: "Place where web developers are created",
    price: 123,
  },
  {
    address: "ccc123 Disney Lane",
    city: "San Francisco",
    state: "California",
    country: "United States of America",
    lat: 37.7645353,
    lng: -122.4730323,
    name: "App Academy Demo3",
    description: "Place where web developers are created",
    price: 123,
  },
  {
    address: "ddd123 Disney Lane",
    city: "San Francisco",
    state: "California",
    country: "United States of America",
    lat: 37.7645354,
    lng: -122.4730324,
    name: "App Academy Demo4",
    description: "Place where web developers are created",
    price: 123,
  },
  {
    address: "eee123 Disney Lane",
    city: "San Francisco",
    state: "California",
    country: "United States of America",
    lat: 37.7645355,
    lng: -122.4730325,
    name: "App Academy Demo5",
    description: "Place where web developers are created",
    price: 123,
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
    await queryInterface.bulkInsert("Spots", demoSpots);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Spots", { [Op.or]: demoSpots });
  },
};
