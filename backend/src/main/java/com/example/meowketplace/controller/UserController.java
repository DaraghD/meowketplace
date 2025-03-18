package com.example.meowketplace.controller;

import com.example.meowketplace.component.JwtUtil;
import com.example.meowketplace.dto.LoginRequest;
import com.example.meowketplace.dto.SignupRequest;
import com.example.meowketplace.model.User;
import com.example.meowketplace.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    @Autowired
    public UserController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
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
    @CrossOrigin(allowCredentials = "true", origins="http://localhost:5173")
    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        try {
            boolean validUser = userService.authenticateUserPassword(loginRequest);
            if(validUser){
                String token = jwtUtil.generateToken(userService.getUserByEmail(loginRequest.getEmail()).getId().toString());
                return ResponseEntity.ok().body("Body: " + token);
            }
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not found");
    }
    @RequestMapping("/auth")
    public ResponseEntity<String> authenticateUser(@RequestHeader("Authorization") String authHeader) {
        try {
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                System.out.println(token);
                String id = jwtUtil.extractUserID(token);
                boolean valid = jwtUtil.validateToken(token, id);
                if (!valid) {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated");
                }

                User user = userService.getUserById(Long.parseLong(id));
                System.out.println("User: ");
                System.out.println(user);

                return ResponseEntity.ok(user.toString()); // return all user data for frontend to parse and show logged in
            }
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated");
    }

}
