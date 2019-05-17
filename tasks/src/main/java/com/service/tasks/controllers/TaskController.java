package com.service.tasks.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import javax.validation.Valid;

import java.util.List;

import com.service.tasks.repositories.*;
import com.service.tasks.models.*;

/**
 * Task API
 */
@RestController
@RequestMapping(value = "/tasks")
public class TaskController {
    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/{userId}")
    public List<Task> getTasksByUser(@PathVariable Long userId) {
        return taskRepository.findByCreatedBy(userId);
    }

    @PostMapping("/{userId}")
    public Task addTask(@PathVariable Long userId, @Valid @RequestBody Task task) {
        return userRepository.findById(userId).map(user -> {
            task.setCreatedBy(user);
            return taskRepository.save(task);
        }).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @PutMapping("/{userId}/{taskId}")
    public Task updateTask(@PathVariable Long userId, @PathVariable Long taskId, @Valid @RequestBody Task taskRequest) {
        if (!userRepository.existsById(userId)) {
            throw new RuntimeException("User not found");
        }

        return taskRepository.findById(taskId).map(task -> {
            task.setTitle(taskRequest.getTitle());
            task.setContent(taskRequest.getContent());
            return taskRepository.save(task);
        }).orElseThrow(() -> new RuntimeException("Task not found"));
    }

    @DeleteMapping("/{userId}/{taskId}")
    public ResponseEntity<?> deleteAnswer(@PathVariable Long userId, @PathVariable Long taskId) {
        if (!userRepository.existsById(userId)) {
            throw new RuntimeException("User not found");
        }

        return taskRepository.findById(taskId).map(task -> {
            taskRepository.delete(task);
            return ResponseEntity.ok().build();
        }).orElseThrow(() -> new RuntimeException("Task not found"));
    }
}
