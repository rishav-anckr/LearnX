"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("courses", [
      {
        title: "Introduction to JavaScript",
        description:
          "Learn the fundamentals of JavaScript programming language. This course covers variables, functions, objects, arrays, and more.",
        thumbnail:
          "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
        price: 49.99,
        instructorId: 1, // This should be an actual instructor ID in your database
        status: "published",
        level: "beginner",
        duration: 300,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Advanced React Development",
        description:
          "Take your React skills to the next level. Learn about hooks, context API, Redux, and performance optimization.",
        thumbnail:
          "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
        price: 79.99,
        instructorId: 2, // This should be an actual instructor ID in your database
        status: "published",
        level: "advanced",
        duration: 480,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Full Stack Web Development with Node.js",
        description:
          "Build complete web applications with Node.js, Express, and MongoDB. Learn both frontend and backend development.",
        thumbnail:
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
        price: 99.99,
        instructorId: 2, // This should be an actual instructor ID in your database
        status: "published",
        level: "intermediate",
        duration: 720,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Python for Data Science",
        description:
          "Learn Python programming for data analysis and visualization. Covers pandas, numpy, matplotlib, and more.",
        thumbnail:
          "https://images.unsplash.com/photo-1526379879527-8559ecfd8bf7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
        price: 59.99,
        instructorId: 2, // This should be an actual instructor ID in your database
        status: "published",
        level: "beginner",
        duration: 360,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Mobile App Development with Flutter",
        description:
          "Build beautiful native apps for iOS and Android with a single codebase using Flutter and Dart.",
        thumbnail:
          "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
        price: 69.99,
        instructorId: 2, // This should be an actual instructor ID in your database
        status: "published",
        level: "intermediate",
        duration: 420,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("courses", null, {});
  },
};
