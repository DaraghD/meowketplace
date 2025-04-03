package com.example.meowketplace.controller;

import com.example.meowketplace.dto.MessageRequest;
import com.example.meowketplace.model.Message;
import com.example.meowketplace.repository.MessageRepository;
import com.example.meowketplace.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/messages")
public class MessageController {

    private final MessageService messageService;

    @Autowired
    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @GetMapping("/{sender}/{receiver}")
    public ResponseEntity<List<Message>> getMessages(@RequestHeader("Authorization") String authHeader,
            @PathVariable Long sender, @PathVariable Long receiver) {
        List<Message> messages = messageService.findAllBySenderAndReceiver(sender, receiver);
        return ResponseEntity.ok(messages);
    }

    @PostMapping
    public ResponseEntity<String> sendMessage(@RequestHeader("Authorization") String authHeader,
            @RequestBody MessageRequest message) {
        System.out.println(message);
        try {
            String token = authHeader.substring(7);
            System.out.println(authHeader);
            System.out.println(token);
            messageService.send(message, token);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("FUCKKKKK");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.OK).body("Message sent");
    }

    @GetMapping
    public ResponseEntity<String> getAllMessages(@RequestHeader("Authorization") String authHeader) {
        try {
            System.out.println(authHeader);
            String token = authHeader.substring(7);
            String response_data = messageService.getAllMessagesJSON(token);
            return ResponseEntity.status(HttpStatus.OK).body(response_data);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/{deleteId}")
    public ResponseEntity<String> deleteMessage(@RequestHeader("Authorization") String authHeader,
            @PathVariable Long deleteId) {
        try {
            messageService.deleteMessage(authHeader, deleteId); // auth header to see if message is owned by the auth
                                                                // user
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.OK).body("Message sent?");
    }

}