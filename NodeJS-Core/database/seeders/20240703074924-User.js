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

    await queryInterface.bulkInsert('users', [{
      fullname: 'John Doe',
      email: 'John@gmail.com',
      password: '123423',
      status: 'true',
      roleid: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      fullname: 'John hat',
      email: 'John1@gmail.com',
      password: '123423222',
      status: 'false',
      roleid: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }
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
