"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Statuses", [
      { name: "Pending", createdAt: new Date(), updatedAt: new Date() },
      { name: "In Progress", createdAt: new Date(), updatedAt: new Date() },
      { name: "Completed", createdAt: new Date(), updatedAt: new Date() },
    ]);

    await queryInterface.bulkInsert("Users", [
      {
        name: "John Doe",
        email: "john@example.com",
        password: "JohnDoe",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Jane Doe",
        email: "jane@example.com",
        password: "JaneDoe",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("Tasks", [
      {
        title: "Task 1",
        UserId: 1,
        StatusId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Task 2",
        UserId: 2,
        StatusId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Tasks", null, {});
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("Statuses", null, {});
  },
};
