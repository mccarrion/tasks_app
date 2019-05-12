package com.service.tasks.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Collection;

@Entity
@Table(name = "users")
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private long id;

    @Column(name="createtime", nullable = false)
    private ZonedDateTime createdAt;

    @Column(name="updatetime", nullable = false)
    private ZonedDateTime updatedAt;

    @Column(name = "username")
    private String username;

    @Column(name = "email")
    private String email;

    @JsonIgnore
    private String password;

    @OneToMany(mappedBy = "createdBy")
	private Collection<Task> tasks;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public ZonedDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(ZonedDateTime createTime) {
        createdAt = createTime;
    }

    public ZonedDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(ZonedDateTime updateTime) {
        updatedAt = updateTime;
    }

    public Collection<Task> getTasks() {
        return tasks;
    }
    
    public void setTasks(Collection<Task> tasks) {
        this.tasks = tasks;
    }
}
