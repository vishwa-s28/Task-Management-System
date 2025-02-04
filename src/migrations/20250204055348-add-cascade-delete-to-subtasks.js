'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Subtasks', 'TaskId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Tasks', // Name of the table being referenced
        key: 'id', // Primary key in the referenced table
      },
      onDelete: 'CASCADE', // Enable cascading delete
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Subtasks', 'TaskId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Tasks', // Name of the table being referenced
        key: 'id', // Primary key in the referenced table
      },
      onDelete: null, // Remove cascade delete behavior
    });
  }
};
