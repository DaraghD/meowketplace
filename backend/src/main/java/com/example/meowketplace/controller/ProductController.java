package com.example.meowketplace.controller;

import com.example.meowketplace.Views;
import com.example.meowketplace.model.Product;
import com.example.meowketplace.model.Review;
import com.example.meowketplace.component.JwtUtil;
import com.example.meowketplace.dto.AddProductRequest;
import com.example.meowketplace.dto.GetProductResponse;
import com.example.meowketplace.dto.ReviewResponse;
import com.example.meowketplace.model.User;
import com.example.meowketplace.service.ProductService;
import com.example.meowketplace.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/service")
public class ProductController {

    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService, UserService userService, JwtUtil jwtUtil) {
        this.productService = productService;
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping("/{id}")
    public ResponseEntity<String> getProduct(@PathVariable Long id) {
        try {
            System.out.println(id);
            System.out.println("Getting product :" + id);

            Product product = productService.getProductById(id);
            List<Review> reviews = product.getReviews();

            List<ReviewResponse> response_reviews = new ArrayList<ReviewResponse>();
            for (Review r : reviews) {
                var rr = new ReviewResponse(r);
                System.out.println(rr.getUsername());
                response_reviews.add(new ReviewResponse(r));
            }

            GetProductResponse response_product = new GetProductResponse(product, response_reviews);

            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.enable(SerializationFeature.INDENT_OUTPUT);

            return new ResponseEntity<>(
                    objectMapper.writerWithView(Views.Public.class).writeValueAsString(response_product),
                    HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Problem serialising data ", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping
    public ResponseEntity<String> getProducts() {
        try {
            System.out.println("Getting all products");
            List<Product> products = productService.getAllProducts();
            List<GetProductResponse> response_products = new ArrayList<>();
            for (Product p : products) {
                response_products.add(new GetProductResponse(p));
            }
            System.out.println(products);
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.enable(SerializationFeature.INDENT_OUTPUT);
            return new ResponseEntity<>(
                    objectMapper.writerWithView(Views.Public.class).writeValueAsString(response_products),
                    HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Problem serialising data ", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(consumes = { "multipart/form-data", "application/octet-stream" })
    public ResponseEntity<String> addProduct(@RequestParam String product,
            @RequestHeader("Authorization") String authHeader,
            @RequestParam List<MultipartFile> images) {
        try {
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                ObjectMapper objectMapper = new ObjectMapper();
                AddProductRequest addProductRequest = objectMapper.readValue(product, AddProductRequest.class);

                String token = authHeader.substring(7);
                String id = jwtUtil.extractUserID(token);
                System.out.println(id);
                User user = userService.getUserById(Long.parseLong(id));
                jwtUtil.validateToken(token, id);

                productService.addProduct(addProductRequest, user, images);
                return ResponseEntity.status(HttpStatus.OK).body("Product successfully added");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not found");
    }

    @DeleteMapping("/{product_id}")
    public ResponseEntity<String> removeReview(@RequestHeader("Authorization") String authHeader,
            @PathVariable Long product_id) {
        try {
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                System.out.println(token);
                String id = jwtUtil.extractUserID(token);
                boolean valid = jwtUtil.validateToken(token, id);
                User user = userService.getUserById(Long.parseLong(id));

                Product product = productService.getProductById(product_id);

                if (!user.isIs_admin() || product.getUser().getId() != Long.parseLong(id) || !valid)
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated");

                productService.deleteProduct(user, product);
                return ResponseEntity.ok("Succesfully deleted review");
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error");
    }

    @GetMapping("/picture/{id}/{image}")
    public ResponseEntity<byte[]> getProductImage(@PathVariable Long id, @PathVariable Long image) {
        try {
            Path filePath = Paths.get("uploads/product_images/" + id + "/" + image).normalize();
            byte[] fileContent = Files.readAllBytes(filePath);
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + filePath.getFileName() + "\"")
                    .body(fileContent);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

}
