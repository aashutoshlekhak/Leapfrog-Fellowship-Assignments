import express from "express";
import {
  deleteTodo,
  getTodoById,
  getTodos,
  updateTodo,
} from "../Controller/todo";
import { addTodo } from "../Controller/todo";
import { auth } from "../middlewares/auth";
const router = express.Router();

router.get("/", auth, getTodos);
router.get("/:id", auth, getTodoById);
router.post("/", auth, addTodo);
router.delete("/:id", auth, deleteTodo);
router.put("/:id", auth, updateTodo);

export default router;
 