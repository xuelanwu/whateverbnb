"use strict";

const demoSpots = [
  {
    ownerId: 1,
    address: "aaa456 Disney Lane",
    city: "San Francisco",
    state: "California",
    country: "USA",
    lat: 37.7645351,
    lng: -122.4730321,
    name: "App Academy Demo1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse accumsan vehicula elit nec suscipit. Praesent eget augue turpis. Nam ut molestie justo.",
    price: 123,
  },
  {
    ownerId: 2,
    address: "2944 Rose Avenue",
    city: "Metairie",
    state: "Louisiana",
    country: "USA",
    lat: 41.780071,
    lng: -86.215736,
    name: "App Academy Demo2",
    description:
      "Pellentesque tincidunt varius ipsum id pretium. Ut vitae nunc vel nunc cursus luctus sed et magna.",
    price: 234,
  },
  {
    ownerId: 3,
    address: "3961 Hall Valley Drive",
    city: "Clarksburg",
    state: "West Virginia",
    country: "USA",
    lat: 39.206917,
    lng: -80.388603,
    name: "App Academy Demo3",
    description:
      "Donec purus lacus, consectetur ac elementum sed, gravida ac lorem. Maecenas nisl leo, vestibulum vel velit sit amet, lacinia auctor diam. Vivamus cursus, augue eu condimentum iaculis.",
    price: 345,
  },
  {
    ownerId: 4,
    address: "1876 Harrison Street",
    city: "Oakland",
    state: "California",
    country: "USA",
    lat: 37.908894,
    lng: -122.259377,
    name: "App Academy Demo4",
    description:
      "Morbi pharetra a nisl id bibendum. Proin suscipit tellus eu eros pulvinar bibendum. Nullam ut bibendum nunc. Maecenas pretium porttitor sem, pulvinar rhoncus turpis aliquet eu.",
    price: 213,
  },
  {
    ownerId: 5,
    address: "4169 Lilac Lane",
    city: "Willacoochee",
    state: "Georgia",
    country: "USA",
    lat: 31.33453,
    lng: -83.025322,
    name: "App Academy Demo5",
    description:
      "Cras porta convallis ultrices. Morbi tempus nibh ac purus feugiat porta. Praesent maximus nisl leo, a interdum turpis luctus et.",
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
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete("Spots", { [Op.or]: demoSpots });
  },
};
