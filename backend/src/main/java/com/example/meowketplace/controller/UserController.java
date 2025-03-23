package com.example.meowketplace.controller;

import com.example.meowketplace.component.JwtUtil;
import com.example.meowketplace.dto.LoginRequest;
import com.example.meowketplace.dto.SignupRequest;
import com.example.meowketplace.model.User;
import com.example.meowketplace.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
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

    @PostMapping("/signup")
    public ResponseEntity<String> addUser(@RequestBody SignupRequest signupRequest) {
        try {
            System.out.println(signupRequest.toString());
            userService.addUser(signupRequest);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.OK).body("User successfully added");
    }

    @GetMapping("/picture/{id}")
    public ResponseEntity<byte[]> getProfilePicture(@PathVariable Long id) {
        try {
            User user = userService.getUserById(id);
            Path filePath = Paths.get("uploads/profile_pictures/"+id).normalize();
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

    @PostMapping("/picture")
    public ResponseEntity<String> uploadProfilePicture(@RequestParam("profile_picture") MultipartFile profile_picture, @RequestHeader("Authorization") String authHeader) {
        try {
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                String id = jwtUtil.extractUserID(token);
                boolean valid = jwtUtil.validateToken(token, id);
                if (!valid) {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated");
                }
                System.out.println(profile_picture.getContentType());
                String content_type = profile_picture.getContentType();
                if (!content_type.startsWith("image/")) {
                    throw new Exception("Only image files are allowed");
                }

                User user = userService.getUserById(Long.parseLong(id));
                String fileName = userService.storeProfilePicture(profile_picture, user);
                return ResponseEntity.ok("Profile picture uploaded successfully: " + fileName);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated");
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody LoginRequest loginRequest) {
        try {
            boolean validUser = userService.authenticateUserPassword(loginRequest);
            if (validUser) {
                String token = jwtUtil.generateToken(userService.getUserByEmail(loginRequest.getEmail()).getId().toString());
                return ResponseEntity.ok().body(token);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not found");
    }

    @RequestMapping("/auth")// maybe move to /user get request
    public ResponseEntity<String> authenticateUser(@RequestHeader("Authorization") String authHeader) {
        try {
            if (authHeader != null && authHeader.startsWith("Bearer ")) {//todo: make this a util function
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

                ObjectMapper mapper = new ObjectMapper();
                return ResponseEntity.ok(mapper.writeValueAsString(user)); // return all user data for frontend to parse and show logged in
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated");
    }

}
