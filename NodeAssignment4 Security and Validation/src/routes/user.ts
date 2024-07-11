import express from "express";

import { authenticate, authorize } from "../middlewares/auth";
import {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  getUserById,
} from "../Controller/user";

const router = express();

router.post("/", authenticate, authorize("admin"), createUser);
router.get("/", authenticate, authenticate, authorize("admin"), getUsers);
router.get("/:id", authenticate, authorize("admin"), getUserById);
router.put("/:id", authenticate, authorize("admin"), updateUser);
router.delete("/:id", authenticate, authorize("admin"), deleteUser);

export default router;
