package com.spingular.chat.service.mapper;

import com.spingular.chat.domain.*;
import com.spingular.chat.service.dto.ChatmessageDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Chatmessage} and its DTO {@link ChatmessageDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ChatmessageMapper extends EntityMapper<ChatmessageDTO, Chatmessage> {



    default Chatmessage fromId(String id) {
        if (id == null) {
            return null;
        }
        Chatmessage chatmessage = new Chatmessage();
        chatmessage.setId(id);
        return chatmessage;
    }
}
