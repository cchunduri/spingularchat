package com.spingular.chat.web.websocket.dto;

import java.util.StringJoiner;

/**
 * DTO for storing a user's message.
 */
public class MessageDTO {

    private String userLogin;

    private String message;

    private String time;

    public String getUserLogin() {
        return userLogin;
    }

    public void setUserLogin(String userLogin) {
        this.userLogin = userLogin;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", MessageDTO.class.getSimpleName() + "[", "]")
                .add("userLogin='" + userLogin + "'")
                .add("message='" + message + "'")
                .add("time='" + time + "'")
                .toString();
    }
}

