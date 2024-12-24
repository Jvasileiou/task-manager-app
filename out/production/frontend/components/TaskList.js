import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native-web";
import { useNavigate } from "react-router-dom";
import apiClient from "../api";
import "../styles/TaskList.css";

const TaskList = ({ onEditTask, onDeleteTask }) => {
  const [tasks, setTasks] = useState([]); // State to hold tasks
  const [error, setError] = useState(""); // State to hold error messages
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("jwtToken"); // Retrieve JWT token
        const response = await fetch("http://localhost:8080/tasks", {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in Authorization header
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }

        const data = await response.json(); // Parse response JSON
        console.log("Fetched tasks:", data); // Debugging: Log tasks
        setTasks(data); // Update tasks state
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError("Failed to load tasks. Please try again.");
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = () => {
    navigate("/add-task"); // Navigate to TaskForm
  };

  return (
    <div className="task-list">
      <h1>Task Manager</h1>
      {error ? (
        <p className="error-message">{error}</p>
      ) : tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(task.createdDateTime).toLocaleString()} {/* Format the date */}
              </p>
              <button onClick={() => onEditTask(task)}>Edit</button>
              <button onClick={() => onDeleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks available.</p>
      )}
      <button className="add-task-btn" onClick={handleAddTask}>
        Add Task
      </button>
    </div>
  );
};

export default TaskList;

