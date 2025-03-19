package com.example.meowketplace.dto;

import com.example.meowketplace.model.Message;

import java.sql.Date;

public class MessageResponse {
    private String message_content;
    private Long sender_id;
    private Long receiver_id;
    private Date created_at;

    public MessageResponse(String message_content, Long sender_id, Long receiver_id, Date created_at) {
        this.message_content = message_content;
        this.sender_id = sender_id;
        this.receiver_id = receiver_id;
        this.created_at = created_at;
    }

    public MessageResponse(Message message){
        this.message_content = message.getMessageContent();
        this.sender_id = message.getSender().getId();
        this.receiver_id = message.getReceiver().getId();
        this.created_at = message.getCreated_at();
    }

    public String getMessage_content() {
        return message_content;
    }

    public void setMessage_content(String message_content) {
        this.message_content = message_content;
    }

    public Long getSender_id() {
        return sender_id;
    }

    public void setSender_id(Long sender_id) {
        this.sender_id = sender_id;
    }

    public Long getReceiver_id() {
        return receiver_id;
    }

    public void setReceiver_id(Long receiver_id) {
        this.receiver_id = receiver_id;
    }

    public Date getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Date created_at) {
        this.created_at = created_at;
    }
    //pfp?
}
