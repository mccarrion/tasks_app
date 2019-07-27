package com.service.tasks.controllers;

import com.service.tasks.models.Task;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.assertThat;
//import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class TaskControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private TaskController controller;

    @Test
    public void contextLoads() throws Exception {
        assertThat(controller).isNotNull();
    }

    @Test
    public void getTasksByUser() {
        Task task = new Task();
    }

    @Test
    public void addTask() {
    }

    @Test
    public void updateTask() {
    }

    @Test
    public void deleteTask() {
    }

    @Test
    public void extractUsername() {
    }
}