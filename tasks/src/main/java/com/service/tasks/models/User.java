package com.service.tasks.models;

import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;

import java.util.Collection;

@Entity
@Table(name = "users")
public class User extends Base {
    private static final long serialVersionUID = 1L;

    @Column(name = "username")
    private String username;

    @Column(name = "email")
    private String email;

    @JsonIgnore
    @Column(name = "password")
    private String password;

    @OneToMany(mappedBy = "createdBy")
    private Collection<Task> tasks;

    /**
     * Zero argument constructor for the purpose of deserialization
     * Part of default behavior in Jackson library
     */
    public User() {}

    /**
     * This is the User constructor for when a user inputs valid information in
     * the signup form.
     * @param username
     * @param email
     * @param password
    */
    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @JsonIgnore
    public String getPassword() {
        return password;
    }

    @JsonProperty
    public void setPassword(String password) {
        this.password = password;
    }

    public Collection<Task> getTasks() {
        return tasks;
    }

    public void setTasks(Collection<Task> tasks) {
        this.tasks = tasks;
    }
}
