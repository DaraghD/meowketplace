package com.example.meowketplace.service;

import com.example.meowketplace.component.JwtUtil;
import com.example.meowketplace.dto.MessageRequest;
import com.example.meowketplace.model.Message;
import com.example.meowketplace.repository.MessageRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MessageService {

    private final MessageRepository messageRepository;
    private final JwtUtil jwtUtil;
    private final UserService userService;

    @Autowired
    public MessageService(MessageRepository messageRepository, JwtUtil jwtUtil, UserService userService) {
        this.messageRepository = messageRepository;
        this.jwtUtil = jwtUtil;
        this.userService = userService;
    }

    public List<Message> getMessages(Long sender, Long receiver) {
        return messageRepository.findAllBySenderAndReceiver(userService.getUserById(sender), userService.getUserById(receiver));
    }

    public Optional<Message> getMessageById(Long id) {
        return messageRepository.findById(id);
    }

    public Message createMessage(Message message) {
        return messageRepository.save(message);
    }

    public void deleteMessage(String authHeader, Long id) {
        messageRepository.deleteById(id);
    }

    public List<Message> findAllBySenderAndReceiver(Long sender, Long receiver) {
        return messageRepository.findAllBySenderAndReceiver(userService.getUserById(sender), userService.getUserById(receiver));
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
        Optional<List<Message>> messagesReceived = messageRepository.findAllByReceiver(userService.getUserById(id));
        Optional<List<Message>> messagesSent = messageRepository.findAllBySender(userService.getUserById(id));

        if(messagesReceived.isEmpty() && messagesSent.isEmpty()){
            throw new IllegalArgumentException("No messages found");
        }

        List<Message> received_list = messagesReceived.get();
        List<Message> sent_list= messagesSent.get();
        List<Message> messageList = new ArrayList<Message>();

        messagesReceived.ifPresent(messageList::addAll);
        messagesSent.ifPresent(messageList::addAll);

        try {
            return objectMapper.writeValueAsString(messageList);
        } catch (Exception e) {
            throw new IllegalArgumentException("Error parsing messages");
        }
    }
}