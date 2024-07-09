import { Todo } from "../interfaces/todo";

let todos = [
  {
    id: "1",
    title: "Todo 1",
    description: "Todo 1 description",
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "Todo 2",
    description: "Todo 2 description",
    createdAt: new Date(),
  },
  {
    id: "3",
    title: "Todo 3",
    description: "Todo 3 description",
    createdAt: new Date(),
  },
];

let count = todos.length;

export const getTodos = () => todos;

export const getTodoById = (id: string) => {
  return todos.find((todo) => todo.id === id);
};

export const addTodo = (todo: Todo) => {
  count++;
  const newTodo = {
    id: `${count}`,
    ...todo,
  };
  todos.push(newTodo);
};

export const deleteTodo = (id: string) => {
  todos = todos.filter((todo) => todo.id !== id);
};

export const updateTodo = (id: string, todo: Todo) => {
  todos = todos.map((t) => (t.id === id ? { id, ...todo } : t));
};
