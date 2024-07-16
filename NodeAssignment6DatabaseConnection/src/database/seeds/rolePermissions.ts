import { Knex } from "knex";

const TABLE_NAME = "rolePermissions";

/**
 * Delete existing entries and seed values for table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export function seed(knex: Knex): Promise<void> {
  return knex(TABLE_NAME)
    .del()
    .then(() => {
      return knex(TABLE_NAME).insert([
        {
          role_id: 1,
          permission_id: 1,
        },
        {
          role_id: 1,
          permission_id: 2,
        },
        {
          role_id: 1,
          permission_id: 3,
        },
        {
          role_id: 1,
          permission_id: 4,
        },
        {
          role_id: 1,
          permission_id: 5,
        },
      ]);
    });
}
