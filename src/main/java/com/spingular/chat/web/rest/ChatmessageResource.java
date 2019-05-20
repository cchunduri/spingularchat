package com.spingular.chat.web.rest;

import com.spingular.chat.service.ChatmessageService;
import com.spingular.chat.web.rest.errors.BadRequestAlertException;
import com.spingular.chat.service.dto.ChatmessageDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.spingular.chat.domain.Chatmessage}.
 */
@RestController
@RequestMapping("/api")
public class ChatmessageResource {

    private final Logger log = LoggerFactory.getLogger(ChatmessageResource.class);

    private static final String ENTITY_NAME = "chatmessage";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ChatmessageService chatmessageService;

    public ChatmessageResource(ChatmessageService chatmessageService) {
        this.chatmessageService = chatmessageService;
    }

    /**
     * {@code POST  /chatmessages} : Create a new chatmessage.
     *
     * @param chatmessageDTO the chatmessageDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new chatmessageDTO, or with status {@code 400 (Bad Request)} if the chatmessage has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/chatmessages")
    public ResponseEntity<ChatmessageDTO> createChatmessage(@RequestBody ChatmessageDTO chatmessageDTO) throws URISyntaxException {
        log.debug("REST request to save Chatmessage : {}", chatmessageDTO);
        if (chatmessageDTO.getId() != null) {
            throw new BadRequestAlertException("A new chatmessage cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ChatmessageDTO result = chatmessageService.save(chatmessageDTO);
        return ResponseEntity.created(new URI("/api/chatmessages/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /chatmessages} : Updates an existing chatmessage.
     *
     * @param chatmessageDTO the chatmessageDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated chatmessageDTO,
     * or with status {@code 400 (Bad Request)} if the chatmessageDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the chatmessageDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/chatmessages")
    public ResponseEntity<ChatmessageDTO> updateChatmessage(@RequestBody ChatmessageDTO chatmessageDTO) throws URISyntaxException {
        log.debug("REST request to update Chatmessage : {}", chatmessageDTO);
        if (chatmessageDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ChatmessageDTO result = chatmessageService.save(chatmessageDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, chatmessageDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /chatmessages} : get all the chatmessages.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of chatmessages in body.
     */
    @GetMapping("/chatmessages")
    public List<ChatmessageDTO> getAllChatmessages() {
        log.debug("REST request to get all Chatmessages");
        return chatmessageService.findAll();
    }

    /**
     * {@code GET  /chatmessages/:id} : get the "id" chatmessage.
     *
     * @param id the id of the chatmessageDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the chatmessageDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/chatmessages/{id}")
    public ResponseEntity<ChatmessageDTO> getChatmessage(@PathVariable String id) {
        log.debug("REST request to get Chatmessage : {}", id);
        Optional<ChatmessageDTO> chatmessageDTO = chatmessageService.findOne(id);
        return ResponseUtil.wrapOrNotFound(chatmessageDTO);
    }

    /**
     * {@code DELETE  /chatmessages/:id} : delete the "id" chatmessage.
     *
     * @param id the id of the chatmessageDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/chatmessages/{id}")
    public ResponseEntity<Void> deleteChatmessage(@PathVariable String id) {
        log.debug("REST request to delete Chatmessage : {}", id);
        chatmessageService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
