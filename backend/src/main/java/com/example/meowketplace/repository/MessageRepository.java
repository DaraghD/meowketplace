package com.example.meowketplace.repository;

import com.example.meowketplace.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {

    List<Message> findAllBySenderAndReceiver(Long sender, Long receiver);
    Optional<List<Message>> findAllBySenderOrReceiver(Long id);

}
