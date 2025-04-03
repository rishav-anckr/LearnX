import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || "learnx",
  process.env.DB_USER || "postgres",
  process.env.DB_PASSWORD || "postgres",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",

    logging: false,
  }
);

// Test the connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

testConnection();

export default sequelize;
