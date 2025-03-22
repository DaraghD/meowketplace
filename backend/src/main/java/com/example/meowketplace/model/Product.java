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

    private String name;

    @Column(columnDefinition = "DECIMAL(3,2) DEFAULT 0.0")//TODO: only update this when a review is added
    private Double starRating;

    @Column(nullable = false)
    private Date createdAt = new Date();

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<Review> reviews;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<Tier> tiers;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getProductText() {
        return productText;
    }

    public void setProductText(String productText) {
        this.productText = productText;
    }

    public Double getStarRating() {
        return starRating;
    }

    public void setStarRating(Double starRating) {
        this.starRating = starRating;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

    public List<Tier> getTiers() {
        return tiers;
    }

    public void setTiers(List<Tier> tiers) {
        this.tiers = tiers;
    }

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", user=" + user +
                ", productText='" + productText + '\'' +
                ", starRating=" + starRating +
                ", createdAt=" + createdAt +
                ", reviews=" + reviews +
                ", tiers=" + tiers +
                '}';
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
