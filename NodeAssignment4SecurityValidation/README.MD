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

## Updates after TODO assignment 3
* Enhanced security in Helmet, CORS
* Data validation in User and Todo routes
* Rate limiter for a given IP.

# Rest is same as below
## API routes/paths
## Authentication

- Login as a super admin.
- http://localhost:3000/auth/login (POST request)
- Add JSON file below as the body

```sh
{
    "email": "apple@gmail.com",
    "password": "apple"
}

```
- This will return access token. 
- Use this token as a bearer token for the super admin Operations
- Super admin can perform CRUD in Users
- Each User can Perform CRUD in their respective todos only. 

- As Super admin you can create other user accounts as below.
- All the errors are handled properly and HTTP status codes are displayed. 
- Loggers are also added to track important interactions and the API responses. 


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

- They will run only after authentication

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
