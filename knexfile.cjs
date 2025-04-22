import { parse } from "pg-connection-string";

const connectionDetails = parse(process.env.DATABASE_URL, true);

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const config = {
  development: {
    client: "pg",
    connection: {
      host: connectionDetails.host,
      port: connectionDetails.port,
      user: connectionDetails.user,
      password: connectionDetails.password,
      database: connectionDetails.database,
    },
    migrations: {
      tableName: "knex_migrations",
      getNewMigrationName: (name) => {
        return `${+new Date()}-${name}.cjs`;
      },
      directory: "./src/database/migrations",
      stub: "./migration.stub.cjs",
      extension: "cjs",
    },
  },

  production: {
    client: "pg",
    connection: {
      host: connectionDetails.host,
      port: connectionDetails.port,
      user: connectionDetails.user,
      password: connectionDetails.password,
      database: connectionDetails.database,
    },
    migrations: {
      tableName: "knex_migrations",
      getNewMigrationName: (name) => {
        return `${+new Date()}-${name}.cjs`;
      },
      directory: "./src/database/migrations",
      stub: "./migration.stub.cjs",
      extension: "cjs",
    },
  },
};

module.exports = config;
