import { BaseError } from "./BaseError";
import HttpStatusCodes from "http-status-codes";
export class UnauthenticatedError extends BaseError {}

export class BadRequestError extends BaseError {}

export class NotFoundError extends BaseError {}

export class ForbiddenError extends BaseError {}

export class InternalServerError extends BaseError {}

export class ConflictError extends BaseError{}