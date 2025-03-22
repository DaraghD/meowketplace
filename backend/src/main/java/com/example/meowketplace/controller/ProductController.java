package com.example.meowketplace.controller;

import com.example.meowketplace.Views;
import com.example.meowketplace.component.JwtUtil;
import com.example.meowketplace.dto.AddProductRequest;
import com.example.meowketplace.dto.LoginRequest;
import com.example.meowketplace.dto.SignupRequest;
import com.example.meowketplace.model.User;
import com.example.meowketplace.service.ProductService;
import com.example.meowketplace.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/service")
public class ProductController {

    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService,UserService userService, JwtUtil jwtUtil) {
        this.productService = productService;
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @RequestMapping
    public ResponseEntity<String> getProducts() throws JsonProcessingException {
        try {
            System.out.println("Getting all products");
            var products = productService.getAllProducts();
            System.out.println(products);
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.enable(SerializationFeature.INDENT_OUTPUT);
            return new ResponseEntity<>(objectMapper.writerWithView(Views.Public.class).writeValueAsString(products), HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>("Problem serialising data ", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping
    public ResponseEntity<String> addProduct(@RequestBody AddProductRequest product, @RequestHeader("Authorization") String authHeader) {
        System.out.println("adding product 999");
        try {
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                String id = jwtUtil.extractUserID(token);
                System.out.println(id);
                User user = userService.getUserById(product.getUserId());
                jwtUtil.validateToken(token, product.getUserId().toString());

                productService.addProduct(product);
                return ResponseEntity.status(HttpStatus.OK).body("Product successfully added");
            }
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not found");
    }




}
