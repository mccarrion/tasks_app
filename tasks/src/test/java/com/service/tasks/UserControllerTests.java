package com.service.tasks;

import static org.assertj.core.api.Assertions.assertThat;

import com.service.tasks.controllers.UserController;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserControllerTests {

    @Autowired
    private UserController controller;

    @Test
    public void contextLoads() throws Exception {
        assertThat(controller).isNotNull();
    }
}
