package com.spingular.chat.service.dto;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.spingular.chat.domain.Chatmessage} entity.
 */
public class ChatmessageDTO implements Serializable {

    private String id;

    private String userLogin;

    private String message;

    private String time;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

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
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ChatmessageDTO chatmessageDTO = (ChatmessageDTO) o;
        if (chatmessageDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), chatmessageDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ChatmessageDTO{" +
            "id=" + getId() +
            ", userLogin='" + getUserLogin() + "'" +
            ", message='" + getMessage() + "'" +
            ", time='" + getTime() + "'" +
            "}";
    }
}
