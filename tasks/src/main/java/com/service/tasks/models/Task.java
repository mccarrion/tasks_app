package com.service.tasks.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

@Entity
@Table(name = "tasks")
public class Task implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private long id;

    @Column(name="createtime", nullable = false)
    private ZonedDateTime createdAt;

    @Column(name="updatetime", nullable = false)
    private ZonedDateTime updatedAt;

	@ManyToOne
	@JoinColumn(name = "createdby", referencedColumnName = "id", nullable = false)
	private User createdBy;

	@Column(name="title")
	private String title;

	@Column(name="content")
	private String content;

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
