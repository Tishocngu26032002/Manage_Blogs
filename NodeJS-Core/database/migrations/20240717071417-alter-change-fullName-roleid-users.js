'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    queryInterface.renameColumn('users', 'fullname', 'fullName');
    queryInterface.renameColumn('users', 'roleid', 'role_id');
    await queryInterface.addColumn(
      'users', // table name
      'avatar', // new field name
      {
        type: Sequelize.TEXT,
        allowNull: true,
      },
    );
    await queryInterface.addColumn(
      'users', // table name
      'deleted', // new field name
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
    )

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
