package com.example.meowketplace.service;

import com.example.meowketplace.component.JwtUtil;
import com.example.meowketplace.dto.MessageRequest;
import com.example.meowketplace.model.Message;
import com.example.meowketplace.repository.MessageRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MessageService {

    private final MessageRepository messageRepository;
    private final JwtUtil jwtUtil;

    @Autowired
    public MessageService(MessageRepository messageRepository, JwtUtil jwtUtil) {
        this.messageRepository = messageRepository;
        this.jwtUtil = jwtUtil;
    }

    public List<Message> getMessages(Long sender, Long receiver) {
        return messageRepository.findAllBySenderAndReceiver(sender, receiver);
    }

    public Optional<Message> getMessageById(Long id) {
        return messageRepository.findById(id);
    }

    public Optional<List<Message>> findAllBySenderOrReceiver(Long id) {
        return messageRepository.findAllBySenderOrReceiver(id);
    }

    public Message createMessage(Message message) {
        return messageRepository.save(message);
    }

    public void deleteMessage(String authHeader, Long id) {
        messageRepository.deleteById(id);
    }

    public List<Message> findAllBySenderAndReceiver(Long sender, Long receiver) {
        return messageRepository.findAllBySenderAndReceiver(sender, receiver);
    }

    public Message send(MessageRequest messageRequest) {
        Message message = new Message();
        //TOOD: add user id from jwt token
        return messageRepository.save(message);
    }

    public String getAllMessagesJSON(String jwtToken) {
        Long id = Long.parseLong(jwtUtil.extractUserID(jwtToken));
        Boolean valid_token = jwtUtil.validateToken(jwtToken, id.toString());
        if(!valid_token){
            throw new IllegalArgumentException("Invalid token");
        }

        ObjectMapper objectMapper = new ObjectMapper();
        Optional<List<Message>> messages = messageRepository.findAllBySenderOrReceiver(id);

        if(messages.isEmpty()){
            throw new IllegalArgumentException("No messages found");
        }
        List<Message> MessageList = messages.get();
        try {
            return objectMapper.writeValueAsString(MessageList);
        } catch (Exception e) {
            throw new IllegalArgumentException("Error parsing messages");
        }
    }
}