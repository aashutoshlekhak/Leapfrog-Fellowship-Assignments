import express from "express";

import { authenticate, authorize } from "../middlewares/auth";
import {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  getUserById,
} from "../Controller/user";
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
  authorize("admin"),
  validateReqBody(createUserBodySchema),
  createUser
);
router.get("/", authenticate, authenticate, authorize("admin"), getUsers);
router.get(
  "/:id",
  authenticate,
  authorize("admin"),
  validateReqQuery(getUserQuerySchema),
  getUserById
);
router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  validateReqQueryAndBody(getUserQuerySchema, createUserBodySchema),
  updateUser
);
router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  validateReqQuery(getUserQuerySchema),
  deleteUser
);

export default router;
