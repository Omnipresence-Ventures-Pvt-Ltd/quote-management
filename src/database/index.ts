import { DateTime } from "luxon";
import { Sequelize } from "sequelize";
import utils from "utils/utils";

const DB_HOST = process.env.DB_HOST as string;
const DB_USER = process.env.DB_USER as string;
const DB_PASSWORD = process.env.DB_PASSWORD as string;
const DB_NAME = process.env.DB_NAME as string;
const DB_PORT = parseInt(process.env.DB_PORT as string, 10);

const databaseConnection = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "postgres",
  dialectModule: await import("pg"),
  logQueryParameters: utils.checkIfProduction(),
  timezone: "+05:30",
  typeValidation: true,
  ssl: utils.checkIfProduction(),
  port: DB_PORT,
  logging: (...msg): void => console.log(msg),
  hooks: {
    beforeValidate(attributes): void {
      attributes.setAttributes("createdAt", DateTime.now().toISO());
      attributes.setAttributes("updatedAt", DateTime.now().toISO());
    },
    beforeUpdate(instance, options): void {
      // TODO: use logging table to insert updated and old data
      console.log({ options, instance });
    },
  },
});

try {
  await databaseConnection.authenticate();
} catch (error) {
  console.log({ error });
  throw error;
}

export default databaseConnection;
