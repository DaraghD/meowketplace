package com.example.meowketplace.service;

import com.example.meowketplace.dto.SignupRequest;
import com.example.meowketplace.model.User;
import com.example.meowketplace.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private UserRepository userRepository;

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

}
