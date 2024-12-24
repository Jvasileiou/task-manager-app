import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate
import "../styles/TaskForm.css";

const TaskForm = ({ onTaskAdded, onTaskUpdated }) => {
  const location = useLocation(); // Use the useLocation hook
  const task = location.state?.task; // Access the task passed via navigation
  const [title, setTitle] = useState(task ? task.title : "");
  const [description, setDescription] = useState(task ? task.description : "");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
      if (task) {
        setTitle(task.title);
        setDescription(task.description);
      }
    }, [task]);

    const handleSaveTask = async (e) => {
      e.preventDefault();
      setError("");

      const token = localStorage.getItem("jwtToken");
      if (!token) {
        setError("You must be logged in to save a task.");
        return;
      }

      try {
        const response = await fetch(
          task
            ? `http://localhost:8080/tasks/${task.id}` // PUT request for editing
            : "http://localhost:8080/tasks", // POST request for creating
          {
            method: task ? "PUT" : "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ title, description }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (task) {
            onTaskUpdated(data); // Call the update handler
          } else {
            onTaskAdded(data); // Call the add handler
          }
          navigate("/tasks");
        } else {
          setError("Failed to save task. Please try again.");
        }
      } catch (err) {
        setError("An error occurred. Please try again.");
      }
    };

    const handleCancel = () => {
      navigate("/tasks");
    };

    return (
      <div className="task-form-container">
        <form className="task-form" onSubmit={handleSaveTask}>
          <h2>{task ? "Edit Task" : "Add Task"}</h2>
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
              {task ? "Save" : "Add Task"}
            </button>
            <button type="button" className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
          </div>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    );
  };

  export default TaskForm;
