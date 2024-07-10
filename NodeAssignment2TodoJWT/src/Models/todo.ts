import { Todo } from "../interfaces/todo";

let todos: Todo[] = [
  {
    id: "1",
    title: "Todo 1",
    description: "Todo 1 description",
    createdAt: new Date(),
    userId: "1",
  },
  {
    id: "2",
    title: "Todo 2",
    description: "Todo 2 description",
    createdAt: new Date(),
    userId: "1",
  },
  {
    id: "3",
    title: "Todo 3",
    description: "Todo 3 description",
    createdAt: new Date(),
    userId: "2",
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
    ...todo,
    id: `${count}`,
  };
  todos.push(newTodo);
};

export const deleteTodo = (id: string) => {
  todos = todos.filter((todo) => todo.id !== id);
};

export const updateTodo = (id: string, todo: Todo) => {
  todos = todos.map((t) => (t.id === id ? { ...todo, id } : t));
};
