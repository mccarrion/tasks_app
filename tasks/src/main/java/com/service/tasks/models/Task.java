package com.service.tasks.models;

import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;

@Entity
@Table(name = "tasks")
public class Task extends Base {
    private static final long serialVersionUID = 1L;

    @ManyToOne
    @JoinColumn(name = "created_by", referencedColumnName = "id", nullable = false)
    @JsonIgnore
    private User createdBy;

    @Column(name="title")
    private String title;

    @Column(name="content")
    private String content;

    public Task() {}

    public Task(String title, String content) {
        this.title = title;
        this.content = content;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
