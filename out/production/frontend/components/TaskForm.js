import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/TaskForm.css";

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  const handleAddTask = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setError("");

    const token = localStorage.getItem("jwtToken"); // Get the JWT token from localStorage
    if (!token) {
      setError("You must be logged in to create a task.");
      return;
    }

    try {
      // Send the POST request to create a new task
      const response = await fetch("http://localhost:8080/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the Authorization header with the Bearer token
        },
        body: JSON.stringify({ title, description }), // Send the task title and description
      });

      if (response.ok) {
        const data = await response.json(); // Parse the JSON response
        onTaskAdded(data); // Refresh the task list with the new task
        setTitle(""); // Clear the title input
        setDescription(""); // Clear the description input
        navigate("/"); // Navigate back to TaskList after adding the task
      } else {
        setError("Failed to add task. Please try again."); // Handle any server-side errors
      }
    } catch (err) {
      setError("An error occurred. Please try again."); // Handle network or unexpected errors
    }
  };

  const handleCancel = () => {
    navigate("/"); // Navigate back to TaskList
  };

  return (
    <div className="task-form-container">
      <form className="task-form" onSubmit={handleAddTask}>
        <h2>Add Task</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="form-actions">
          <button type="submit" className="add-task-btn">
            Add Task
          </button>
          <button type="button" className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
        </div>
        {error && <p className="error-message">{error}</p>} {/* Display error messages */}
      </form>
    </div>
  );
};

export default TaskForm;
