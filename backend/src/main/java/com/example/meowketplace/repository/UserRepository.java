package com.example.meowketplace.repository;

import java.util.Optional;
import com.example.meowketplace.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    void deleteByUsername(String username);
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String username);

}
