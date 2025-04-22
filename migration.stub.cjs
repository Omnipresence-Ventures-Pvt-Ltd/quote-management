/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function ({ schema, raw }) {
  return schema.createTable("", (table) => {
    table.bigIncrements("id").primary();
    table.dateTime("created_at");
    table.dateTime("updated_at");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function ({ schema, raw }) {
  return schema.dropTable("");
};
