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

export const getTodos = () => todos;

export const getTodoById = (id: string) => {
  return todos.find((todo) => todo.id === id);
};

export const addTodo = (todo: Todo) => {
  const newTodo = {
    id: `${todos.length + 1}`,
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
