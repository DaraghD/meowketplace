package com.example.meowketplace.controller;

import com.example.meowketplace.component.JwtUtil;
import com.example.meowketplace.dto.LoginRequest;
import com.example.meowketplace.dto.SignupRequest;
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
                String token = jwtUtil.generateToken(loginRequest.getEmail());
                Cookie cookie = new Cookie("meow-token", token);
                cookie.setMaxAge(60*60*24);
                cookie.setPath("/");
                cookie.setHttpOnly(true);
                cookie.setAttribute("SameSite", "None");
                //cookie.setSecure(true);
                System.out.println(token);
                response.addCookie(cookie);
                response.addHeader("Access-Control-Allow-Credentials", "true");
                return ResponseEntity.ok().body("User successfully logged in");
            }
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
        return ResponseEntity.ok("User not found");
    }
    @RequestMapping("/auth")
    public ResponseEntity<String> authenticateUser(@CookieValue(value="meow-token") String token) {
        /*
        if(jwtUtil.validateToken(token)) {
            return ResponseEntity.ok("User is authenticated");
        }*/
        return ResponseEntity.ok(jwtUtil.validateToken(token));

        //return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated");
    }
/*
    @CrossOrigin
    @PostMapping("/auth")
    public ResponseEntity<String> authenticateUser(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();

    }
*/

}
