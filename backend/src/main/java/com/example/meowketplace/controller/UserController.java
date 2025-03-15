package com.example.meowketplace.controller;

import com.example.meowketplace.dto.SignupRequest;
import com.example.meowketplace.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @CrossOrigin
    @PostMapping("/signup")
    public ResponseEntity<String> addUser(@RequestBody SignupRequest signupRequest) {
       try {
           userService.addUser(signupRequest);
       }catch (Exception e) {
           return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
       }
       return ResponseEntity.status(HttpStatus.OK).body("User successfully added");
    }
    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody SignupRequest signupRequest) {
        try {
            userService.addUser(signupRequest);
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
        return ResponseEntity.ok("User successfully added");
    }

}
