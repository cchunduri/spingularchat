package com.spingular.chat.service;

import com.spingular.chat.domain.Chatmessage;
import com.spingular.chat.repository.ChatmessageRepository;
import com.spingular.chat.service.dto.ChatmessageDTO;
import com.spingular.chat.service.mapper.ChatmessageMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Chatmessage}.
 */
@Service
public class ChatmessageService {

    private final Logger log = LoggerFactory.getLogger(ChatmessageService.class);

    private final ChatmessageRepository chatmessageRepository;

    private final ChatmessageMapper chatmessageMapper;

    public ChatmessageService(ChatmessageRepository chatmessageRepository, ChatmessageMapper chatmessageMapper) {
        this.chatmessageRepository = chatmessageRepository;
        this.chatmessageMapper = chatmessageMapper;
    }

    /**
     * Save a chatmessage.
     *
     * @param chatmessageDTO the entity to save.
     * @return the persisted entity.
     */
    public ChatmessageDTO save(ChatmessageDTO chatmessageDTO) {
        log.debug("Request to save Chatmessage : {}", chatmessageDTO);
        Chatmessage chatmessage = chatmessageMapper.toEntity(chatmessageDTO);
        chatmessage = chatmessageRepository.save(chatmessage);
        return chatmessageMapper.toDto(chatmessage);
    }

    /**
     * Get all the chatmessages.
     *
     * @return the list of entities.
     */
    public List<ChatmessageDTO> findAll() {
        log.debug("Request to get all Chatmessages");
        return chatmessageRepository.findAll().stream()
            .map(chatmessageMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one chatmessage by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    public Optional<ChatmessageDTO> findOne(String id) {
        log.debug("Request to get Chatmessage : {}", id);
        return chatmessageRepository.findById(id)
            .map(chatmessageMapper::toDto);
    }

    /**
     * Delete the chatmessage by id.
     *
     * @param id the id of the entity.
     */
    public void delete(String id) {
        log.debug("Request to delete Chatmessage : {}", id);
        chatmessageRepository.deleteById(id);
    }
}
