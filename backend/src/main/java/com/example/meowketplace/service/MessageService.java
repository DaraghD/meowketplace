package com.example.meowketplace.service;

import com.example.meowketplace.component.JwtUtil;
import com.example.meowketplace.dto.MessageRequest;
import com.example.meowketplace.dto.MessageResponse;
import com.example.meowketplace.model.Message;
import com.example.meowketplace.model.User;
import com.example.meowketplace.repository.MessageRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MessageService {

    private final MessageRepository messageRepository;
    private final JwtUtil jwtUtil;
    private final UserService userService;
    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public MessageService(SimpMessagingTemplate messagingTemplate,MessageRepository messageRepository, JwtUtil jwtUtil, UserService userService) {
        this.messagingTemplate = messagingTemplate;
        this.messageRepository = messageRepository;
        this.jwtUtil = jwtUtil;
        this.userService = userService;
    }

    public List<Message> getMessages(Long sender, Long receiver) {
        return messageRepository.findAllBySenderAndReceiver(userService.getUserById(sender),
                userService.getUserById(receiver));
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
        return messageRepository.findAllBySenderAndReceiver(userService.getUserById(sender),
                userService.getUserById(receiver));
    }

    public void send(MessageRequest messageRequest, String authHeader) {
        jwtUtil.validateToken(authHeader, messageRequest.getSender_id().toString());

        Message message = new Message();
        message.setMessageContent(messageRequest.getMessage_content());
        message.setSender(userService.getUserById(messageRequest.getSender_id()));
        message.setReceiver(userService.getUserById(messageRequest.getReceiver_id()));
        message.setCreated_at(new Date(System.currentTimeMillis()));

        notifyUserNewMessage(messageRequest.getSender_id());
        notifyUserNewMessage(messageRequest.getReceiver_id());
        messageRepository.save(message);
    }

    private void notifyUserNewMessage(Long userId) {
        messagingTemplate.convertAndSend("/topic/messages/" + userId, "New message available");
    }

    public String getAllMessagesJSON(String jwtToken) {
        Long id = Long.parseLong(jwtUtil.extractUserID(jwtToken));
        boolean valid_token = jwtUtil.validateToken(jwtToken, id.toString());
        if (!valid_token) {
            throw new IllegalArgumentException("Invalid token");
        }

        ObjectMapper objectMapper = new ObjectMapper();

        User user = userService.getUserById(id);
        Optional<List<Message>> all_messages = messageRepository.findAllBySenderOrReceiver(user, user);

        if (all_messages.isEmpty()) {
            throw new IllegalArgumentException("No messages found");
        }

        ArrayList<MessageResponse> message_response_list = new ArrayList<>();
        for (Message msg : all_messages.get()) {
            message_response_list.add(new MessageResponse(msg));
        }

        try {
            System.out.println("TESTING");
            System.out.println(message_response_list);
            System.out.println(objectMapper.writeValueAsString(message_response_list));
            return objectMapper.writeValueAsString(message_response_list);
        } catch (Exception e) {
            e.printStackTrace();
            throw new IllegalArgumentException("Error parsing messages");
        }
    }
}
