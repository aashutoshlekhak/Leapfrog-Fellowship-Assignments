import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";
import { BadRequestError } from "../error/Errors";

export function validateReqQuery(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.query);

    if (error) {
      next(new BadRequestError(error.message));
    }

    req.query = value;

    next();
  };
}

export function validateReqBody(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body);

    if (error) {
      next(new BadRequestError(error.message));
    }

    req.body = value;

    next();
  };
}

//for updating user which requires both id and body
export function validateReqQueryAndBody(
  querySchema: Schema,
  bodySchema: Schema
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error: queryError, value: queryValue } = querySchema.validate(
      req.query
    );
    const { error: bodyError, value: bodyValue } = bodySchema.validate(
      req.body
    );

    if (queryError) {
      next(new BadRequestError(queryError.message));
    } else if (bodyError) {
      next(new BadRequestError(bodyError.message));
    } else {
      req.query = queryValue;
      req.body = bodyValue;
      next();
    }
  };
}

export function validateReqParam(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.params);

    if (error) {
      next(new BadRequestError(error.message));
    }

    req.params = value;

    next();
  };
}
