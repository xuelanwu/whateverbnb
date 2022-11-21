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
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse accumsan vehicula elit nec suscipit. Praesent eget augue turpis. Nam ut molestie justo. Praesent elementum, metus non vulputate mollis, justo augue malesuada quam, non placerat lacus dui nec erat. Vivamus nulla urna, vestibulum a nibh at, hendrerit semper justo. Praesent interdum, quam sed aliquam convallis, massa purus convallis ante, nec congue sapien elit quis massa. Etiam tincidunt libero non nunc volutpat sollicitudin. Duis mollis libero a lacus viverra, et blandit urna euismod. Mauris ut est risus.",
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
      "Pellentesque tincidunt varius ipsum id pretium. Ut vitae nunc vel nunc cursus luctus sed et magna. Donec consectetur leo non nisi gravida, eleifend dictum erat dignissim. Mauris quis elementum augue. Vestibulum ut auctor justo, quis tincidunt nunc. Curabitur diam dolor, scelerisque nec ligula nec, vulputate tempor erat. Nam ac metus lectus. Morbi tristique, eros nec mollis hendrerit, diam tortor interdum quam, a posuere turpis tellus vel leo. Phasellus tristique sit amet sem sed sodales. Donec rutrum aliquet sapien, ut porttitor dui volutpat id.",
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
      "Donec purus lacus, consectetur ac elementum sed, gravida ac lorem. Maecenas nisl leo, vestibulum vel velit sit amet, lacinia auctor diam. Vivamus cursus, augue eu condimentum iaculis, sapien tortor cursus lorem, nec egestas tellus leo at sapien. Vestibulum eget odio a dui vulputate lacinia id sagittis elit. Morbi interdum sit amet purus in laoreet. Mauris laoreet dapibus mi vel pellentesque. Morbi aliquam euismod hendrerit. Nam cursus nulla ac elit varius dapibus. Morbi et viverra quam, id suscipit risus. Nulla quis ipsum lobortis, sollicitudin massa in, rhoncus lorem.",
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
      "Morbi pharetra a nisl id bibendum. Proin suscipit tellus eu eros pulvinar bibendum. Nullam ut bibendum nunc. Maecenas pretium porttitor sem, pulvinar rhoncus turpis aliquet eu. Curabitur blandit lacus ut lorem malesuada cursus. Aenean sagittis erat ut tempus fermentum. Duis ullamcorper dapibus arcu, nec eleifend sapien bibendum a. Morbi tincidunt magna volutpat, dapibus purus sed, aliquet tortor.",
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
      "Cras porta convallis ultrices. Morbi tempus nibh ac purus feugiat porta. Praesent maximus nisl leo, a interdum turpis luctus et. Maecenas nec est accumsan, dignissim lacus vitae, ullamcorper felis. Maecenas sed nibh ante. Morbi erat nibh, convallis sit amet tortor et, fringilla aliquet orci. Nunc quis molestie nibh.",
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
