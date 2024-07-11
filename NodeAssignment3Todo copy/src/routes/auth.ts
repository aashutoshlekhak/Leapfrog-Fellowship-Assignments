import express from "express";
import { login } from "../Controller/auth";
import { refresh } from "../Controller/auth";

const router = express.Router();

router.post("/login", login);
router.post("/refresh", refresh);

export default router;
