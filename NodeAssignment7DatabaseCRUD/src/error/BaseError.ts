import HttpStatusCodes from "http-status-codes";

export class BaseError extends Error {
  statusCode: number;
  constructor(message = "", statusCode = 500) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
