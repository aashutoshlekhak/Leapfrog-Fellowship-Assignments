import express from "express";
import {
  addTodo,
  deleteTodo,
  getTodoById,
  getTodos,
  updateTodo,
} from "../Controller/todo";
import { authenticate, authorize } from "../middlewares/auth";
import {
  validateReqBody,
  validateReqQuery,
  validateReqQueryAndBody,
} from "../middlewares/validator";
import { createTodoBodySchema, getTodoQuerySchema } from "../schema/todo";
const router = express.Router();

router.get("/", authenticate, getTodos);
router.get("/:id", authenticate);
router.post("/", authenticate, validateReqBody(createTodoBodySchema), addTodo);
router.delete(
  "/:id",
  authenticate,
  validateReqQuery(getTodoQuerySchema),
  deleteTodo
);
router.put(
  "/:id",
  authenticate,
  validateReqQueryAndBody(getTodoQuerySchema, createTodoBodySchema),
  updateTodo
);

export default router;
