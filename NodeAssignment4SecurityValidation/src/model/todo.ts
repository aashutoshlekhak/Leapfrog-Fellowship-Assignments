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

export const getTodos = (userId: string) => {
  const todos1 = todos.filter((todo) => todo.userId === userId);
  return todos1;
};

export const getTodoById = (id: string, userId: string) => {
  return todos.find((todo) => todo.id === id && todo.userId === userId);
};

export const addTodo = (todo: Todo, userId: string) => {
  count++;
  const newTodo = {
    ...todo,
    id: `${count}`,
    userId: userId,
  };
  todos.push(newTodo);
};

export const deleteTodo = (id: string, userId: string) => {
  todos = todos.filter((todo) => todo.userId === userId && todo.id !== id);
};

export const updateTodo = (id: string, todo: Todo, userId: string) => {
  todos = todos.map((t) =>
    t.id === id && t.userId === userId ? { ...todo, id } : t
  );
};
