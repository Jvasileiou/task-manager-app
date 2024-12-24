package com.example.taskmanager;

import com.example.taskmanager.dto.TaskDTO;
import com.example.taskmanager.model.Task;
import com.example.taskmanager.model.User;
import com.example.taskmanager.repository.TaskRepository;
import com.example.taskmanager.repository.UserRepository;
import com.example.taskmanager.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;

@SpringBootApplication
public class TaskManagerApplication implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TaskRepository taskRepository;

    public static void main(String[] args) {
        SpringApplication.run(TaskManagerApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        // Initialize database with some users
        if (userRepository.count() == 0) {
            userRepository.save(new User(null, "user1", passwordEncoder.encode("password1")));
            userRepository.save(new User(null, "user2", passwordEncoder.encode("password2")));
            userRepository.save(new User(null, "user3", passwordEncoder.encode("password3")));
            System.out.println("Users initialized in the database!");
        } else {
            System.out.println("Users already exist in the database. No initialization needed.");
        }

        // Initialize database with some tasks
        if (taskRepository.count() == 0) {
            taskRepository.save(new Task(null, "new 1", "Desc for Task 1", LocalDateTime.now()));
            taskRepository.save(new Task(null, "new 2", "Desc for Task 2", LocalDateTime.now()));
            System.out.println("Tasks initialized in the database!");
        } else {
            System.out.println("Tasks already exist in the database. No initialization needed.");
        }
//
//        // Retrieve All Tasks
//        System.out.println("\nAll Tasks:");
//        taskService.getAllTasks().forEach(System.out::println);
//
//        // Update a Task
//        TaskDTO updatedTask = new TaskDTO(savedTask1.getId(), "Updated Task 1", "Updated Description for Task 1", null);
//        TaskDTO savedUpdatedTask = taskService.updateTask(savedTask1.getId(), updatedTask);
//
//        System.out.println("\nUpdated Task:");
//        System.out.println(savedUpdatedTask);
//
//        // Delete a Task
//        System.out.println("\nDeleting Task with ID: " + savedTask2.getId());
//        String deleteMessage = taskService.deleteTask(savedTask2.getId());
//        System.out.println(deleteMessage);
//
//        // Retrieve All Tasks After Deletion
//        System.out.println("\nAll Tasks After Deletion:");
//        taskService.getAllTasks().forEach(System.out::println);
    }
}