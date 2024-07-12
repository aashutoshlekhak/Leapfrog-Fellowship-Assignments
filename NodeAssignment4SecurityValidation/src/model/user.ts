import { User } from "../interfaces/user";

let users: User[] = [
  {
    name: "apple",
    email: "apple@gmail.com",
    password: "$2b$10$N5J46uOEfQj.Ysb4dGIP5eHQ7qARmbRRF4m9.YM3PeDWmu1XZFdNi",
    permission: ["admin"],
    id: "1",
  },
];

let count = users.length;

export function getUsers() {
  return users;
}

export function getUserById(id: string) {
  return users.find(({ id: userId }) => userId == id);
}

export function createUser(user: User) {
  count++;
  return users.push({
    ...user,
    id: `${count}`,
  });
}

export function getUserByEmail(email: string) {
  return users.find(({ email: userEmail }) => userEmail == email);
}

export function deleteUser(id: string) {
  users = users.filter(({ id: userId }) => userId != id);
}

export function updateUser(id: string, body: User) {
  users = users.map((user) => (user.id == id ? { ...user, ...body } : user));
}
