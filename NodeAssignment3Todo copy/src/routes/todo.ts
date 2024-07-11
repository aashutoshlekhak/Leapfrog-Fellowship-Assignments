import express from "express";
import {
  addTodo,
  deleteTodo,
  getTodoById,
  getTodos,
  updateTodo,
} from "../Controller/todo";
import { authenticate, authorize } from "../middlewares/auth";
const router = express.Router();

router.get("/", authenticate, getTodos);
router.get("/:id", authenticate, getTodoById);
router.post("/", authenticate, addTodo);
router.delete("/:id", authenticate, deleteTodo);
router.put("/:id", authenticate, updateTodo);

export default router;
