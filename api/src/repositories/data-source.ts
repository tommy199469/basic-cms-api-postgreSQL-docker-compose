import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ["src/entity/*.ts"],
  synchronize: true,
  migrations: ["src/migration/*.ts"],
});

console.log("checking the database config", {
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ["src/entity/*.ts"],
  synchronize: true,
  migrations: ["src/migration/*.ts"],
});

dataSource
  .initialize()
  .then(() => {})
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
