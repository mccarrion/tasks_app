package com.service.tasks.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.service.tasks.repositories.*;

/**
 * User API
 */
@RestController
@RequestMapping(value = "/users")
public class UserController {
    
    @Autowired
    private UserRepository userRepository;

}
