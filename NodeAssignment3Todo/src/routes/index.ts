import express from "express";
import todoRouter from "./todo";
import userRouter from "./user";
import authRouter from "./auth";

const router = express();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/todos", todoRouter);

export default router;

