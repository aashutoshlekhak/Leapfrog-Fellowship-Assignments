import { Knex } from "knex";

const TABLE_NAME = "users";

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
          name: "apple",
          email: "apple@gmail.com",
          password:
            "$2b$10$N5J46uOEfQj.Ysb4dGIP5eHQ7qARmbRRF4m9.YM3PeDWmu1XZFdNi",
          id: 1,
        },
      ]);
    });
}
