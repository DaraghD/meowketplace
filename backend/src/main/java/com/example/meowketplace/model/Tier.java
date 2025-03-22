package com.example.meowketplace.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tiers")
public class Tier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(nullable = false)
    private double price;

    @Column(nullable = false)
    private String name;

    public Long getId() {
        return id;
    }
}
