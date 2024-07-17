import express from "express";

import { authenticate, authorize } from "../middlewares/auth";
import {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  getUserById,
} from "../controller/user";
import { createUserBodySchema, getUserQuerySchema } from "../schema/user";
import {
  validateReqBody,
  validateReqQuery,
  validateReqQueryAndBody,
} from "../middlewares/validator";

const router = express();

router.post(
  "/",
  authenticate,
  authorize("users.create"),
  validateReqBody(createUserBodySchema),
  createUser
);
router.get("/", authenticate, authenticate, authorize("users.get"), getUsers);
router.get(
  "/:id",
  authenticate,
  authorize("users.get"),
  validateReqQuery(getUserQuerySchema),
  getUserById
);
router.put(
  "/:id",
  authenticate,
  authorize("users.update"),
  validateReqQueryAndBody(getUserQuerySchema, createUserBodySchema),
  updateUser
);
router.delete(
  "/:id",
  authenticate,
  authorize("users.delete"),
  validateReqQuery(getUserQuerySchema),
  deleteUser
);

export default router;
