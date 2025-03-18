package com.example.meowketplace.model;

import jakarta.persistence.*;

@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "review_id", nullable = false)
    private Review review;

    @ManyToOne
    @JoinColumn(name = "comment_id")
    private Comment parentComment;  // Self-referencing for nested comments

    @Column(nullable = false, columnDefinition = "TEXT")
    private String messageContent;

    //date

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
