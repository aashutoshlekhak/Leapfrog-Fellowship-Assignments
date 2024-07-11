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

### To create user 
- http://localhost:3000/user (POST request)
-creates user: email, password of type string 

### To login
- http://localhost:3000/auth/login (POST request)
-it returns access token and refresn token. 
-copy that token 

### To perform CRUD in todos
- send the access token as bearer token in the header

- http://localhost:3000/todos/ (POST Create request) 
- http://localhost:3000/todos/id (PUT Update Request)
- http://localhost:3000/todos/ (GET Read request) 
- http://localhost:3000/todos/id (DELETE request)


```sh
    {
        "title" : "title name",
        "description" : "description text"
        "created at": "date field"
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
