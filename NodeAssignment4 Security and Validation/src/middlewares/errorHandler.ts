import { NextFunction, Response } from "express";

import { Request } from "../interfaces/auth";

import HttpStatusCodes from "http-status-codes";
import {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  UnauthenticatedError,
} from "../error/Errors";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("ErrorHandler");

export function notFoundError(req: Request, res: Response) {
  return res.status(HttpStatusCodes.NOT_FOUND).json({
    message: "Not Found",
  });
}

export function genericErrorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error.stack) {
    logger.error(error.stack);
  }

  if (error instanceof UnauthenticatedError) {
    return res.status(HttpStatusCodes.UNAUTHORIZED).json({
      message: error.message,
    });
  }

  if (error instanceof BadRequestError) {
    return res.status(HttpStatusCodes.BAD_REQUEST).json({
      message: error.message,
    });
  }

  if (error instanceof NotFoundError) {
    return res.status(HttpStatusCodes.NOT_FOUND).json({
      message: error.message,
    });
  }

  if (error instanceof ForbiddenError) {
    return res.status(HttpStatusCodes.FORBIDDEN).json({
      message: error.message,
    });
  }

  if (error instanceof InternalServerError) {
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }

  if (error instanceof ConflictError) {
    return res.status(HttpStatusCodes.CONFLICT).json({
      message: error.message,
    });
  }

  return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
    message: "Internal Server Error",
  });
}
