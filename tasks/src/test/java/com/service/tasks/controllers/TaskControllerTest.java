package com.service.tasks.controllers;

import com.service.tasks.models.Task;
import com.service.tasks.repositories.UserRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.json.JacksonJsonParser;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

//import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class TaskControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private TaskController controller;

    @Autowired
    private UserRepository userRepository;

    @Test
    public void contextLoads() throws Exception {
        assertThat(controller).isNotNull();
    }

    /**
     * Register a user before making POST requests. This method should be moved over to tests
     * for either the User or the Security tests and be brought in through Composition
     * @param username
     * @param password
     * @throws Exception
     */
    @Before
    public void setup() throws Exception {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("username", "john");
        params.add("password", "hello1234");

        ResultActions res = mvc.perform(post("/users/register")
                .params(params)
                .accept(APPLICATION_JSON)
                .contentType(APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    /**
     * This is the method to get the Authorization header in order
     * to test the REST APIs
     * @param username
     * @param password
     * @return
     */
    private String getAuthToken(String username, String password) throws Exception {

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("username", username);
        params.add("password", password);

        ResultActions res = mvc.perform(post("/login")
                .params(params)
                .accept(APPLICATION_JSON)
                .contentType(APPLICATION_JSON))
                .andExpect(status().isOk());

        String resString = res.andReturn().getResponse().getContentAsString();

        JacksonJsonParser jsonParser = new JacksonJsonParser();
        return jsonParser.parseMap(resString).get("auth_token").toString();
    }

    @Test
    @WithMockUser(value="john")
    public void getTasksByUser() throws Exception {

        // See if MockUser works first
        // registerUser("john", "hello1234");
        String token = getAuthToken("john", "hello1234");

        // TODO: Uncomment this and integrate into test
        Task task = new Task();
        task.setCreatedBy(userRepository.findByUsername("john"));
        task.setTitle("Go to gym");
        task.setContent("Workout for 30 minutes");
        task.setCompleted(false);

        //given(controller.getTasksByUser(task.getCreatedBy())).willReturn(task);

        // Currently basic GET request
        mvc.perform(get("/tasks")
                .header("Authorization", token)
                .with(user("john").password("hello1234"))
                .contentType(APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username="john", password="hello1234") // Testing how MockUser annotation works
    public void addTask() throws Exception {

        String token = getAuthToken("john", "hello1234");

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("title", "Go to gym");
        params.add("content", "Workout for 30 minutes");

        mvc.perform(post("/tasks")
                .header("Authorization", token)
                .with(user("john").password("hello1234"))
                .params(params)
                .accept(APPLICATION_JSON)
                .contentType(APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(value="john")
    public void updateTask() throws Exception{

        String token = getAuthToken("john", "hello1234");

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("title", "Read");
        params.add("content", "Read for 30 minutes");

        mvc.perform(MockMvcRequestBuilders.put("/tasks")
                .header("Authorization", token)
                .with(user("john").password("hello1234"))
                .accept(APPLICATION_JSON)
                .contentType(APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(value="john")
    public void deleteTask() throws Exception {

        String token = getAuthToken("john", "hello1234");

        mvc.perform(MockMvcRequestBuilders.delete("/tasks")
                .header("Authorization", token)
                .with(user("john").password("hello1234"))
                .accept(APPLICATION_JSON)
                .contentType(APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void extractUsername() {
    }
}