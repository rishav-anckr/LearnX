import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import User from "./User";

class Course extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public thumbnail!: string;
  public price!: number;
  public instructorId!: number;
  public status!: "draft" | "published" | "archived";
  public level!: "beginner" | "intermediate" | "advanced";
  public duration!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Course.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    thumbnail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.0,
    },
    instructorId: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    status: {
      type: DataTypes.ENUM("draft", "published", "archived"),
      defaultValue: "draft",
    },
    level: {
      type: DataTypes.ENUM("beginner", "intermediate", "advanced"),
      defaultValue: "beginner",
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "courses",
  }
);

// Define associations
Course.belongsTo(User, { as: "instructor", foreignKey: "instructorId" });
export default Course;
