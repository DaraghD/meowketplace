package com.example.meowketplace.service;

import com.example.meowketplace.component.JwtUtil;
import com.example.meowketplace.dto.LoginRequest;
import com.example.meowketplace.dto.SignupRequest;
import com.example.meowketplace.model.User;
import com.example.meowketplace.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class UserService {

    private UserRepository userRepository;
    JwtUtil jwtUtil;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void addUser(SignupRequest signupRequest) throws Exception {
        if (signupRequest.getUsername() == null || signupRequest.getPassword() == null
                || signupRequest.getEmail() == null) {
            throw new Exception("Missing required fields");
        }

        if (userRepository.findByUsername(signupRequest.getUsername()).isPresent()) {
            throw new Exception("Username is taken");
        }
        if (userRepository.findByEmail(signupRequest.getEmail()).isPresent()) {
            throw new Exception("Email is taken");
        }

        User user = new User();
        if (signupRequest.isIs_business()) {
            user.setIs_business(true);
            user.setBusiness_tags(signupRequest.getServices());
            user.setReview_count(0);
        }
        user.setUsername(signupRequest.getUsername());
        user.setPassword(signupRequest.getPassword());// TODO: hash password, validate on frontend
        user.setEmail(signupRequest.getEmail()); // TODO: validate on frontend

        userRepository.save(user);
    }

    public boolean authenticateUserPassword(LoginRequest loginRequest) throws Exception {
        if (loginRequest.getEmail() == null || loginRequest.getPassword() == null)
            throw new Exception("Missing required fields");

        if (userRepository.findByEmail(loginRequest.getEmail()).isEmpty())
            throw new Exception("Email not found");

        User user = userRepository.findByEmail(loginRequest.getEmail()).get();
        if (user.getPassword().equals(loginRequest.getPassword()) && user.getEmail().equals(loginRequest.getEmail()))
            return true;

        return false;
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).get();
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).get();
    }

    public String storeProfilePicture(MultipartFile file, User user) throws IOException {
        String uploadDir = "uploads/profile_pictures/";
        String fileName = user.getId().toString();
        Path uploadPath = Paths.get(uploadDir);

        if (!Files.exists(uploadPath))
            Files.createDirectories(uploadPath);

        try (InputStream inputStream = file.getInputStream()) {
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
            user.setProfile_picture(filePath + fileName);
            System.out.println(user.getProfile_picture());
        } catch (IOException e) {
            throw new IOException("Could not save profile picture: " + fileName, e);
        }

        userRepository.save(user);
        return fileName;
    }

    public byte[] getProfilePicture(User user) {
        return user.getProfile_picture().getBytes();
    }

    public void verifyUser(User user, User verify_user) throws Exception {
        if (!user.isIs_business())
            throw new Exception("Only businesses can verify user");

        if (verify_user.isIs_verified())
            throw new Exception("User already verified");

        verify_user.setIs_verified(true);
        userRepository.save(verify_user);
    }
}
