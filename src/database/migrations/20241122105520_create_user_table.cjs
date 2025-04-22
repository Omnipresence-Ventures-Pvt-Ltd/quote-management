const { Knex } = require("knex");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function ({ schema, raw }) {
  return schema.createTable("users", (table) => {
    table.bigInteger("id").primary();
    table.string("name", 255).notNullable();
    table.string("mobile", 11).notNullable().unique().index();
    table.string("email", 255).notNullable().unique().index();

    table.dateTime("createdAt", {
      useTz: true
    }).defaultTo(Knex.raw('now()')).notNullable().index();
    table.dateTime("updatedAt", {
      useTz: true
    }).defaultTo(Knex.raw('now()')).notNullable().index();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function ({ schema, raw }) {
  return schema.dropTable("users");
};
