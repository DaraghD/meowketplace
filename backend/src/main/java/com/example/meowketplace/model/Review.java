package com.example.meowketplace.model;

import jakarta.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "reviews")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(nullable = false)
    private String reviewText;

    @Column(nullable = false)
    private int starRating;

    @Column(nullable = false)
    private Date createdAt;

}