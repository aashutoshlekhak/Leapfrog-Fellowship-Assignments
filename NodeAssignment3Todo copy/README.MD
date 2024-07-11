# NODE.JS Assignment 2: Todo with JWT token



## Steps to locally setup



### Install (Without using docker)
- Install NodeJS version 20 through the link below
[Node.js](https://nodejs.org/en) 

```bash
   
    git clone https://github.com/aashutoshlekhak/Leapfrog-Fellowship-Assignments/tree/main

    cd NodeAssignment2TodoJWT

    #Run Command
    npm install

    # Add in .env file
    PORT=3000

    # Run command
    npm run start

```



# API routes/paths

### To see all todos 
- http://localhost:3000/todos (GET request)

### To see todo by id
- http://localhost:3000/todos/id (GET request)

### To delete todo by id
- http://localhost:3000/todos/id (DELETE request)

### To mark todo as done
- http://localhost:3000/todos/finish/id (PUT request)

### To add todo
- http://localhost:3000/todos (POST request)

```sh
    {
        "title" : "title name",
        "description" : "description text"
    }
```

### To update todo
- http://localhost:3000/todos (PUT request)
```sh
    {
        "id":"exist id",
        "title" : "new title name",
        "description" : "new description text"
    }
```
