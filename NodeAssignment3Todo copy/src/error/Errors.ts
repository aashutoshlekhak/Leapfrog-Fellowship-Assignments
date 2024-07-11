import { BaseError } from "./BaseError";
import HttpStatusCodes from "http-status-codes";
export class UnauthenticatedError extends BaseError {
  constructor(message = "Unauthenticated") {
    super(message, HttpStatusCodes.UNAUTHORIZED);
  }
}

export class BadRequestError extends BaseError {
  constructor(message = "Bad Request") {
    super(message, HttpStatusCodes.BAD_REQUEST);
  }
}

export class NotFoundError extends BaseError {
  constructor(message = "Not Found") {
    super(message, HttpStatusCodes.NOT_FOUND);
  }
}

export class ForbiddenError extends BaseError {
  constructor(message = "Forbidden") {
    super(message, HttpStatusCodes.FORBIDDEN);
  }
}

export class InternalServerError extends BaseError {
  constructor(message = "Internal Server Error") {
    super(message, HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
}
