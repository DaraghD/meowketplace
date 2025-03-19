package com.example.meowketplace.dto;

import java.sql.Date;

public class MessageRequest {
    String message_content;
    Long sender_id;
    Long receiver_id;
    Date created_at;
    //maybe take usernames over ids and then find id from username?

    public MessageRequest(String message_content, Long sender_id, Long receiver_id) {
        this.created_at = new Date(System.currentTimeMillis());
        this.message_content = message_content;
        this.sender_id = sender_id;
        this.receiver_id = receiver_id;
    }

    public String getMessage_content() {
        return message_content;
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
