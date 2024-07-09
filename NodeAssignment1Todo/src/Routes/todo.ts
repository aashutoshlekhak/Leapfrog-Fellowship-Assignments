import express from "express";
import {
  deleteTodo,
  getTodoById,
  getTodos,
  updateTodo,
} from "../Controller/todo";
import { addTodo } from "../Controller/todo";
const router = express.Router();

router.get("/", getTodos);
router.get("/:id", getTodoById);
router.post("/", addTodo);
router.delete("/:id", deleteTodo);
router.put("/:id", updateTodo);

export default router;
