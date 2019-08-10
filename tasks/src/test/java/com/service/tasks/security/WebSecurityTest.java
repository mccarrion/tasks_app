package com.service.tasks.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.test.context.ActiveProfiles;

@Configuration
@EnableWebSecurity
@ActiveProfiles("test")
public class WebSecurityTest extends WebSecurityConfigurerAdapter {
}
