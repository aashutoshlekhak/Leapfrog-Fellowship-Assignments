import express from "express";

import { auth } from "../middlewares/auth";
import { createUser, getUsers } from "../Controller/user";

const router = express();

router.post("/", createUser);
router.get("/", auth, getUsers);

export default router;