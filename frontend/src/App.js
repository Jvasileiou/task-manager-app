import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

const App = () => {
  const [tasks, setTasks] = useState([]); // State to hold the list of tasks
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Function to add a new task and refresh the task list
  const handleTaskAdded = () => {
    const token = localStorage.getItem("jwtToken");
    fetch("http://localhost:8080/tasks", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setTasks(data)) // Update the task list
      .catch((error) => console.error("Error fetching tasks:", error));
  };

  const handleTaskDeleted = () => {
    const token = localStorage.getItem("jwtToken");
    fetch("http://localhost:8080/tasks", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setTasks(data)) // Refresh the task list
      .catch((error) => console.error("Error fetching tasks:", error));
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/tasks" />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/tasks"
          element={<TaskList tasks={tasks} onTaskAdded={handleTaskAdded} onTaskDeleted={handleTaskDeleted} />}
        />
        <Route
          path="/add-task"
          element={<TaskForm onTaskUpdated={handleTaskAdded} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
