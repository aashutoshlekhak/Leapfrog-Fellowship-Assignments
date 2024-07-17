import { Response, NextFunction } from "express";
import config from "../config";
import { verify } from "jsonwebtoken";
import { Request } from "../interfaces/auth";
import { User } from "../interfaces/user";
import { UnauthenticatedError } from "../error/Errors";
import { PermissionModel } from "../model/user";

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
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user!;
    const permissions = await PermissionModel.checkPermission(user.id);
    const userPermissions = permissions.map(({ permission }) => permission);
    console.log(userPermissions);
    if (!userPermissions.includes(permission)) {
      next(new UnauthenticatedError("Unauthorized"));
    }
    next();
  };
}
