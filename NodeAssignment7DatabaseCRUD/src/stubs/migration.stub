import { Knex } from 'knex';

const TABLE_NAME = 'table_name';


/**
 * Create table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements();

    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    
    table
      .bigInteger('created_by')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable(TABLE_NAME);
      
    table.timestamp('updated_at').nullable();
    
    table
      .bigInteger('updated_by')
      .unsigned()
      .references('id')
      .inTable(TABLE_NAME)
      .nullable();
  });
}

/**
 * Drop table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}