package com.example.taskmanager.service;

import com.example.taskmanager.dto.TaskDTO;
import com.example.taskmanager.model.Task;
import com.example.taskmanager.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public List<TaskDTO> getAllTasks() {
        return taskRepository.findAll().stream()
                .map(task ->
                        new TaskDTO(
                                task.getId(),
                                task.getTitle(),
                                task.getDescription(),
                                task.getCreatedDateTime()
                        ))
                .collect(Collectors.toList());
    }

    public TaskDTO createTask(TaskDTO taskDTO) {
        Task task = new Task();
        task.setTitle(taskDTO.getTitle());
        task.setDescription(taskDTO.getDescription());
        task.setCreatedDateTime(LocalDateTime.now());
        Task savedTask = taskRepository.save(task);
        return new TaskDTO(savedTask.getId(), savedTask.getTitle(), savedTask.getDescription(), savedTask.getCreatedDateTime());
    }

    public TaskDTO getTaskById(Long id) {
        return taskRepository.findById(id)
                .map(task ->
                        new TaskDTO(
                                task.getId(),
                                task.getTitle(),
                                task.getDescription(),
                                task.getCreatedDateTime()
                        ))
                .orElse(null);
    }

    public TaskDTO updateTask(Long id, TaskDTO updatedTaskDTO) {
        return taskRepository.findById(id).map(task -> {
            task.setTitle(updatedTaskDTO.getTitle());
            task.setDescription(updatedTaskDTO.getDescription());
            Task savedTask = taskRepository.save(task);
            return new TaskDTO(savedTask.getId(), savedTask.getTitle(), savedTask.getDescription(), savedTask.getCreatedDateTime());
        }).orElse(null);
    }

    public String deleteTask(Long id) {
        if (taskRepository.existsById(id)) {
            taskRepository.deleteById(id);
            return "Task deleted successfully";
        }
        return "Task not found";
    }
}