package com.example.meowketplace.model;

import jakarta.persistence.*;
import java.util.Date;
import java.util.List;
import com.example.meowketplace.model.Tier;

@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String productText;

    @Column(columnDefinition = "DECIMAL(3,2) DEFAULT 0.0")
    private Double starRating;

    @Column(nullable = false)
    private Date createdAt = new Date();

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<Review> reviews;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<Tier> tiers;
}
