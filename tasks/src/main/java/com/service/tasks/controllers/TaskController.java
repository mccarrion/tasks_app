package com.service.tasks.controllers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.exceptions.JWTDecodeException;
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

    @GetMapping()
    public List<Task> getTasksByUser(@RequestHeader(value="Authorization") String authorizationHeader) {
        String username = extractUsername(authorizationHeader);
        User user = userRepository.findByUsername(username);

        if (user != null) {
            return taskRepository.findByCreatedBy(user);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    @PostMapping()
    public Task addTask(@RequestHeader(value="Authorization") String authorizationHeader, @Valid @RequestBody Task task) {
        String username = extractUsername(authorizationHeader);
        User user = userRepository.findByUsername(username);

        if (user != null) {
            task.setCreatedBy(user);
            return taskRepository.save(task);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    @PutMapping("/{taskId}")
    public Task updateTask(@RequestHeader(value="Authorization") String authorizationHeader, @PathVariable Long taskId, @Valid @RequestBody Task taskRequest) {
        String username = extractUsername(authorizationHeader);
        User user = userRepository.findByUsername(username);

        if (user != null) {
            return taskRepository.findById(taskId).map(task -> {
                task.setTitle(taskRequest.getTitle());
                task.setContent(taskRequest.getContent());
                task.setCompleted(taskRequest.getCompleted());
                return taskRepository.save(task);
            }).orElseThrow(() -> new RuntimeException("Task not found"));
        } else {
            throw new RuntimeException("User not found");
        }
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<?> deleteTask(@RequestHeader(value="Authorization") String authorizationHeader, @PathVariable Long taskId) {
        String username = extractUsername(authorizationHeader);
        User user = userRepository.findByUsername(username);

        if (user != null) {
            return taskRepository.findById(taskId).map(task -> {
                taskRepository.delete(task);
                return ResponseEntity.ok().build();
            }).orElseThrow(() -> new RuntimeException("Task not found"));
        } else {
            throw new RuntimeException("User not found");
        }
    }

    public String extractUsername(String authToken) {
        try {
            DecodedJWT jwt = JWT.decode(authToken.substring(7));
            return jwt.getSubject();
        } catch (JWTDecodeException e) {
            throw new RuntimeException("Invalid JWT token");
        }
    }
}
