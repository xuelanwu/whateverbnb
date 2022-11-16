"use strict";

const demoSpots = [
  {
    ownerId: 1,
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
    ownerId: 2,
    address: "3283 Sharon Lane",
    city: "South Bend",
    state: "South Bend",
    country: "United States of America",
    lat: 41.780071,
    lng: -86.215736,
    name: "App Academy Demo2",
    description: "Place where web developers are created",
    price: 234,
  },
  {
    ownerId: 3,
    address: "3961 Hall Valley Drive",
    city: "Clarksburg",
    state: "West Virginia",
    country: "United States of America",
    lat: 39.206917,
    lng: -80.388603,
    name: "App Academy Demo3",
    description: "Place where web developers are created",
    price: 345,
  },
  {
    ownerId: 4,
    address: "1876 Harrison Street",
    city: "Oakland",
    state: "California",
    country: "United States of America",
    lat: 37.908894,
    lng: -122.259377,
    name: "App Academy Demo4",
    description: "Place where web developers are created",
    price: 123,
  },
  {
    ownerId: 5,
    address: "4169 Lilac Lane",
    city: "Willacoochee",
    state: "Georgia",
    country: "United States of America",
    lat: 31.33453,
    lng: -83.025322,
    name: "App Academy Demo5",
    description: "Place where web developers are created",
    price: 456,
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
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete("Spots", { [Op.or]: demoSpots });
  },
};
