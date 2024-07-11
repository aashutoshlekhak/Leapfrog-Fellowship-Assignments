import { Response, NextFunction } from "express";
import config from "../config";
import { verify } from "jsonwebtoken";
import { Request } from "../interfaces/auth";
import { User } from "../interfaces/user";
import { UnauthenticatedError } from "../error/Errors";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    next(new UnauthenticatedError("Token not found"));
    return;
  }

  const token = authorization.split(" ");
  if (token.length !== 2 || token[0] !== "Bearer") {
    next(new UnauthenticatedError("Unauthenticated"));

    return;
  }

  verify(token[1], config.jwt.secret!);

  const user = verify(token[1], config.jwt.secret!) as User;

  req.user = user;

  next();
}

export function authorize(permission: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user!;
    if (!user?.permission.includes(permission)) {
      next(new UnauthenticatedError("Unauthorized"));
    }
    next();
  };
}
