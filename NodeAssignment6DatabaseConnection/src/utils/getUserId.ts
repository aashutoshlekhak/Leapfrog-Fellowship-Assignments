import { Request } from "../interfaces/auth";
export const getUserId = (req: Request) => {
  return req.user!.id;
};
