# NodeJS assignment 1 Todo CRUD API

## Local Setup

- Install Node.js on your system, here is the link:
  [Node.js](https://nodejs.org/en)

```sh

    git clone https://github.com/aashutoshlekhak/Leapfrog-Fellowship-Assignments.git

    cd NodeAssignment2TodoJWT

    npm install

    # Add in .env file
    PORT=3000

    # Finally in terminal run
    npm run start

```

# API routes/paths

## Authentication

First create a user account

- http://localhost:3000/user (POST request)

  payload in body

```sh
    {
    name: "User 1",
    email: "user@user.com",
    password: "password",
    }
```

- With this email and password, you can login
- http://localhost:3000/auth/login (POST request)

  - This will return access token and refresn token.
  - Paste the access token in the header as Bearer token.
  - After this you can navigate to other routes

- For generating new access token
  - Navigate to:
  - http://localhost:3000/auth/refresh
    - and paste the refresh token generated previously during login as a bearer token

# Other Routes
* They will run only after authentication

## For user

- http://localhost:3000/user (GET request)
  - This retrieves all the user

## For Todos

### To see all todos

- http://localhost:3000/todos (GET request)

### To get a todo by id

- http://localhost:3000/todos/id (GET request)

### To add todo

- http://localhost:3000/todos (POST request)

### To delete a todo

- http://localhost:3000/todos/id (DELETE request)

### To update a todo

- http://localhost:3000/todos (PUT request)

Along with the id add following body while updating todo

```sh
    {
        "title" : "title name",
        "description" : "description text"
    }
```
