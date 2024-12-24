# Task Management Application

This is a full-stack task management application built using **React** (Frontend) and **Spring Boot** (Backend) for **Qualco** assignment.

---

## Dependencies

### Backend
- Java 17
- Spring Boot
- Dependencies:
  - Spring Web
  - Spring Data JPA
  - Spring Security
  - PostgreSQL
  - jjwt (for JWT authentication)

### Frontend
- React
- Dependencies:
  - react-router-dom
  - fetch API for HTTP requests

---

## Setup Instructions

### Backend
1. **Navigate to the `backend` folder.**
2. Run:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```
3. The backend server will start at `http://localhost:8080`.

#### Database Configuration
- **Database:** PostgreSQL
- Default Tables: `app_task`, `app_user`

### Frontend
1. **Navigate to the `frontend` folder.**
2. Run:
   ```bash
   npm install
   npm start
   ```
3. The frontend server will start at `http://localhost:3000`.

---

## API Endpoints

### Authentication
- **POST** `/auth/login`: Login and receive a JWT token.

### Tasks
**JWT token** : is always sent in the Request Header.
- **GET** `/tasks`: Fetch all tasks.
- **POST** `/tasks`: Create a task.
- **PUT** `/tasks/{id}`: Update a task.
- **DELETE** `/tasks/{id}`: Delete a task.

---

## Notes
- Users that you can use/login with.
- Default admin credentials:
1) User1
    - **Username:** `user1`
    - **Password:** `password1`
2) User2
    - **Username:** `user2`
    - **Password:** `password2`
3) User3
    - **Username:** `user3`
    - **Password:** `password3`
```

