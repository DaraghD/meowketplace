package com.example.meowketplace.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.meowketplace.component.JwtUtil;
import com.example.meowketplace.dto.ReviewRequest;
import com.example.meowketplace.model.Product;
import com.example.meowketplace.model.User;
import com.example.meowketplace.service.ProductService;
import com.example.meowketplace.service.ReviewService;
import com.example.meowketplace.service.UserService;

@CrossOrigin
@RestController
@RequestMapping("/api/review")
public class ReviewController {

    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final ReviewService reviewService;
    private final ProductService productService;

    @Autowired
    public ReviewController(ProductService productService, ReviewService reviewService, UserService userService,
            JwtUtil jwtUtil) {
        this.reviewService = reviewService;
        this.userService = userService;
        this.productService = productService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping
    public ResponseEntity<String> addReview(@RequestBody ReviewRequest review,
            @RequestHeader("Authorization") String authHeader) {
        try {
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                String id = jwtUtil.extractUserID(token);
                System.out.println(id);
                jwtUtil.validateToken(token, id);

                User user = userService.getUserById(Long.parseLong(id));

                Long product_id = review.getProduct_id();
                Product product = productService.findProductById(product_id);

                reviewService.addReview(review, user, product);

                return ResponseEntity.status(HttpStatus.OK).body("Review successfully added");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error");
    }

}
