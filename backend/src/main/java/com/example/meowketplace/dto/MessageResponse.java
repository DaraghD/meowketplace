package com.example.meowketplace.dto;

import com.example.meowketplace.model.Message;

import java.sql.Date;

public class MessageResponse {
    private Long id;
    private String message_content;
    private Long sender_id;
    private Long receiver_id;
    private String sender_username;
    private String receiver_username;
    private boolean sender_verified;
    private boolean receiver_verified;
    private Date created_at;

    public MessageResponse(Message message){
        this.message_content = message.getMessageContent();
        this.sender_id = message.getSender().getId();
        this.receiver_id = message.getReceiver().getId();
        this.created_at = message.getCreated_at();
        this.sender_username = message.getSender().getUsername();
        this.receiver_username = message.getReceiver().getUsername();
        this.sender_verified = message.getReceiver().isIs_verified();
        this.receiver_verified = message.getReceiver().isIs_verified();
        this.id = message.getId();
    }

    @Override
        public String toString() {
            return "MessageResponse{" +
                    "message_content='" + message_content + '\'' +
                    ", sender_id=" + sender_id +
                    ", receiver_id=" + receiver_id +
                    ", sender_username='" + sender_username + '\'' +
                    ", receiver_username='" + receiver_username + '\'' +
                    ", sender_verified=" + sender_verified +
                    ", receiver_verified=" + receiver_verified +
                    ", created_at=" + created_at +
                    '}';
        }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getSender_username() {
        return sender_username;
    }

    public void setSender_username(String sender_username) {
        this.sender_username = sender_username;
    }

    public String getReceiver_username() {
        return receiver_username;
    }

    public void setReceiver_username(String receiver_username) {
        this.receiver_username = receiver_username;
    }

    public boolean isSender_verified() {
        return sender_verified;
    }

    public void setSender_verified(boolean sender_verified) {
        this.sender_verified = sender_verified;
    }

    public boolean isReceiver_verified() {
        return receiver_verified;
    }

    public void setReceiver_verified(boolean receiver_verified) {
        this.receiver_verified = receiver_verified;
    }

    public Date getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Date created_at) {
        this.created_at = created_at;
    }
}
