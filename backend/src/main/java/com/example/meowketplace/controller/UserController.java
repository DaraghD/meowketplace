package com.example.meowketplace.controller;

import com.example.meowketplace.dto.SignupDTO;
import com.example.meowketplace.model.User;
import com.example.meowketplace.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<String> addUser(@RequestBody SignupDTO signupRequest) {
       try {
           userService.addUser(signupRequest);
       }catch (Exception e) {
           return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
       }
       return ResponseEntity.ok("User successfully added");
    }

}
