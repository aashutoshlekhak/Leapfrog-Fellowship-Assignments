# NodeJS assignment 1 Todo CRUD API

## Local Setup

## Using docker

```sh
    # Pull the Docker image
    docker pull aashutoshlekhak/todo-app

    # Run the Docker container
    docker run -p 3000:3000  aashutoshlekhak/todo-app:v.1.0


```

### Install (Without using docker)

- Install Node.js on your system, here is the link:
  [Node.js](https://nodejs.org/en)

```sh

    git clone https://github.com/aashutoshlekhak/Leapfrog-Fellowship-Assignments.git

    cd NodeAssignment1Todo

    npm install

    # Add in .env file
    PORT=3000

    # Finally in terminal run
    npm run start

```

# API routes/paths

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
