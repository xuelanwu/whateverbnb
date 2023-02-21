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
    name: "Serenity Cottage",
    description:
      "Welcome to our charming 2b1b house, perfect for your next vacation! Located in a quiet and peaceful neighborhood, our house offers a relaxing escape from the hustle and bustle of city life.",
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
    name: "The Garden Retreat",
    description:
      "As you enter, you'll immediately notice the warm and inviting atmosphere of the living room, which features comfortable seating, a flat-screen TV, and large windows that let in plenty of natural light. Adjacent to the living room is the fully equipped kitchen, which comes with all the appliances and utensils you need to prepare your own meals.",
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
    name: "Coastal Escape",
    description:
      "The house has two cozy bedrooms, both of which are furnished with comfortable beds, fresh linens, and plenty of closet space. The bathroom is modern and clean, and comes with a full bath and shower.",
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
    name: "City Lights Oasis",
    description:
      "Our house is conveniently located near many local attractions, including parks, museums, and restaurants. We provide a detailed guidebook to help you plan your stay and make the most of your visit.",
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
    name: "Rustic Charm Cabin",
    description:
      "Whether you're here for a weekend getaway or an extended stay, our 2b1b house is the perfect home away from home. We look forward to hosting you!",
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
