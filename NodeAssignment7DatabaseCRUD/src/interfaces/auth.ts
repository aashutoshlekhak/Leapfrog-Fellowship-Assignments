import { Request as ExpressRequest } from "express";
import { User } from "../interfaces/user";

export interface Request extends ExpressRequest {
  user?: User;
}
