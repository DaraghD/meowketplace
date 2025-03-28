package com.example.meowketplace.model;

import jakarta.persistence.*;
import java.sql.Date;
import java.util.List;

import com.example.meowketplace.dto.ReviewRequest;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "reviews")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(nullable = false)
    private String reviewText;

    @OneToMany(mappedBy = "review")
    private List<Reply> replies;

    @Column(nullable = false)
    private int starRating;

    @Column(nullable = false)
    private Date createdAt;

    public Review() {
    }

    public Review(ReviewRequest r, Product product, User user) {
        this.user = user;
        this.product = product;
        this.reviewText = r.getReview_content();
        this.createdAt = new Date(System.currentTimeMillis());
        this.starRating = r.getStars();
    }

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

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public String getReviewText() {
        return reviewText;
    }

    public void setReviewText(String reviewText) {
        this.reviewText = reviewText;
    }

    public List<Reply> getReplies() {
        return replies;
    }

    public void setReplies(List<Reply> replies) {
        this.replies = replies;
    }

    public int getStarRating() {
        return starRating;
    }

    public void setStarRating(int starRating) {
        this.starRating = starRating;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}
