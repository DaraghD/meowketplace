package com.example.meowketplace.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.meowketplace.component.JwtUtil;
import com.example.meowketplace.dto.ReviewRequest;
import com.example.meowketplace.dto.DeleteReviewRequest;
import com.example.meowketplace.model.Product;
import com.example.meowketplace.model.Review;
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

    @DeleteMapping
    public ResponseEntity<String> deleteReview(@RequestBody DeleteReviewRequest review_req,
            @RequestHeader("Authorization") String authHeader) {
        try {
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                String id = jwtUtil.extractUserID(token);
                System.out.println(id);
                jwtUtil.validateToken(token, id);

                User user = userService.getUserById(Long.parseLong(id));
                Review review = reviewService.getReviewById(review_req.getId());
                reviewService.deleteReview(user, review);

                return ResponseEntity.status(HttpStatus.OK).body("Review successfully deleted");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error");
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

                if (review.getProduct_id() == null) {
                    reviewService.addReply(review, user);
                    return ResponseEntity.status(HttpStatus.OK).body("Reply successfully added");
                } else {
                    Long product_id = review.getProduct_id();
                    Product product = productService.findProductById(product_id);
                    reviewService.addReview(review, user, product);
                    return ResponseEntity.status(HttpStatus.OK).body("Review successfully added");
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error");
    }

    @DeleteMapping("/{review_id}")
    public ResponseEntity<String> removeReview(@RequestHeader("Authorization") String authHeader,
            @PathVariable Long review_id) {
        try {
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                System.out.println(token);
                String id = jwtUtil.extractUserID(token);
                boolean valid = jwtUtil.validateToken(token, id);
                User user = userService.getUserById(Long.parseLong(id));

                Review review = reviewService.getReviewById(review_id);

                if (!valid)
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated");

                System.out.println("User: ");
                System.out.println(user);

                reviewService.deleteReview(user, review);
                return ResponseEntity.ok("Succesfully deleted review");
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error");
    }

}
