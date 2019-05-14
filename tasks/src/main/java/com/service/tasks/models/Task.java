package com.service.tasks.models;

import javax.persistence.*;

@Entity
@Table(name = "tasks")
public class Task extends Base {
    private static final long serialVersionUID = 1L;

    @ManyToOne
    @JoinColumn(name = "createdby", referencedColumnName = "id", nullable = false)
    private User createdBy;

    @Column(name="title")
    private String title;

    @Column(name="content")
    private String content;

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
