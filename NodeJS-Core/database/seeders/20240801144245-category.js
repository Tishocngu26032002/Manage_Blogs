'use strict';

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
    await queryInterface.bulkInsert('categories', [
      {
        title: "shortstory",
        slug: 'shortstory',
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "football",
        slug: 'football',
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "travel",
        slug: 'travel',
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "news",
        slug: 'news',
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
