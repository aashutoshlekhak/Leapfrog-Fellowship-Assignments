import { Knex } from "knex";
import db from "../utils/db";

export class BaseModel {
  static connection: Knex = db;

  static queryBuilder() {
    return this.connection;
  }
}
