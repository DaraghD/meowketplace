package com.example.meowketplace.service;

import com.example.meowketplace.component.JwtUtil;
import com.example.meowketplace.dto.LoginRequest;
import com.example.meowketplace.dto.SignupRequest;
import com.example.meowketplace.model.User;
import com.example.meowketplace.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private UserRepository userRepository;
    JwtUtil jwtUtil;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void addUser(SignupRequest signupRequest) throws Exception {
        if (signupRequest.getUsername() == null || signupRequest.getPassword() == null || signupRequest.getEmail() == null) {
            throw new Exception("Missing required fields");
        }

        if (userRepository.findByUsername(signupRequest.getUsername()).isPresent() ){
            throw new Exception("Username is taken");
        }
        if (userRepository.findByEmail(signupRequest.getEmail()).isPresent()) {
            throw new Exception("Email is taken");
        }

        User user = new User();
        user.setUsername(signupRequest.getUsername());
        user.setPassword(signupRequest.getPassword());// TODO: hash password, validate on frontend
        user.setEmail(signupRequest.getEmail()); //TODO: validate on frontend

        userRepository.save(user);
    }
    public boolean authenticateUserPassword(LoginRequest loginRequest) throws Exception {
        if (loginRequest.getEmail() == null || loginRequest.getPassword() == null) {
            throw new Exception("Missing required fields");
        }

        if (userRepository.findByEmail(loginRequest.getEmail()).isEmpty()){
            throw new Exception("Email not found");
        }

        User user = userRepository.findByEmail(loginRequest.getEmail()).get();
        if(user.getPassword().equals(loginRequest.getPassword()) && user.getEmail().equals(loginRequest.getEmail())) {
            return true;
        }
        return false;
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).get();
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).get();
    }
}
