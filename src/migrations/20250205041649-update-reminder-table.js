'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Reminders", "reminderTime");
    await queryInterface.addColumn("Reminders", "status", {
      type: Sequelize.ENUM("Pending", "Sent"),
      allowNull: false,
      defaultValue: "Pending",
    });

    await queryInterface.removeColumn("Reminders", "SubtaskId");
    await queryInterface.addColumn("Reminders", "UserId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
      onDelete: "CASCADE",
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Reminders", "reminderTime", {
      type: Sequelize.DATE,
      allowNull: false,
    });

    await queryInterface.removeColumn("Reminders", "status");

    await queryInterface.addColumn("Reminders", "SubtaskId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Subtasks",
        key: "id",
      },
      onUpdate: "CASCADE",  
      onDelete: "SET NULL",
      allowNull: true,
    });

    await queryInterface.removeColumn("Reminders", "UserId");
  }
};
