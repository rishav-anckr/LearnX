"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("courses", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      thumbnail: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0.0,
      },
      instructorId: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      status: {
        type: Sequelize.ENUM("draft", "published", "archived"),
        defaultValue: "draft",
      },
      level: {
        type: Sequelize.ENUM("beginner", "intermediate", "advanced"),
        defaultValue: "beginner",
      },
      duration: {
        type: Sequelize.INTEGER, // in minutes
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    // Adding indexes for better query performance
    await queryInterface.addIndex("courses", ["instructorId"]);
    await queryInterface.addIndex("courses", ["status"]);
    await queryInterface.addIndex("courses", ["level"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("courses");
  },
};
