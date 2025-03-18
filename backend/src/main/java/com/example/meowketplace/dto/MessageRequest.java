package com.example.meowketplace.dto;

import java.sql.Date;

public class MessageRequest {
    String message;
    Long sender_id;
    Long receiver_id;
    Date created_at;
    //maybe take usernames over ids and then find id from username?

    public MessageRequest(String message, Long sender_id, Long receiver_id) {
        this.created_at = new Date(System.currentTimeMillis());
        this.message = message;
        this.sender_id = sender_id;
        this.receiver_id = receiver_id;
    }

    public String getMessage() {
        return message;
    }

    public Long getSender_id() {
        return sender_id;
    }

    public Long getReceiver_id() {
        return receiver_id;
    }

    public Date getCreated_at() {
        return created_at;
    }
}
