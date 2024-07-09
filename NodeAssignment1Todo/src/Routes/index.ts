import express from "express";
import todoRouter from "./todo";

const router = express();

router.use("/todos", todoRouter);

export default router;
