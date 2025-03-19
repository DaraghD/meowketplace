package com.example.meowketplace.repository;

import com.example.meowketplace.model.Message;
import com.example.meowketplace.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {

    List<Message> findAllBySenderAndReceiver(User sender, User receiver);
    Optional<List<Message>> findAllBySenderOrReceiver(User sender, User receiver);
    Optional<List<Message>> findAllBySender(User senderOrReceiver);
    Optional<List<Message>> findAllByReceiver(User senderOrReceiver);

}
