package com.spingular.chat.web.rest;

import com.spingular.chat.SpingularchatApp;
import com.spingular.chat.domain.Chatmessage;
import com.spingular.chat.repository.ChatmessageRepository;
import com.spingular.chat.service.ChatmessageService;
import com.spingular.chat.service.dto.ChatmessageDTO;
import com.spingular.chat.service.mapper.ChatmessageMapper;
import com.spingular.chat.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.validation.Validator;


import java.util.List;

import static com.spingular.chat.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link ChatmessageResource} REST controller.
 */
@SpringBootTest(classes = SpingularchatApp.class)
public class ChatmessageResourceIT {

    private static final String DEFAULT_USER_LOGIN = "AAAAAAAAAA";
    private static final String UPDATED_USER_LOGIN = "BBBBBBBBBB";

    private static final String DEFAULT_MESSAGE = "AAAAAAAAAA";
    private static final String UPDATED_MESSAGE = "BBBBBBBBBB";

    private static final String DEFAULT_TIME = "AAAAAAAAAA";
    private static final String UPDATED_TIME = "BBBBBBBBBB";

    @Autowired
    private ChatmessageRepository chatmessageRepository;

    @Autowired
    private ChatmessageMapper chatmessageMapper;

    @Autowired
    private ChatmessageService chatmessageService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restChatmessageMockMvc;

    private Chatmessage chatmessage;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ChatmessageResource chatmessageResource = new ChatmessageResource(chatmessageService);
        this.restChatmessageMockMvc = MockMvcBuilders.standaloneSetup(chatmessageResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Chatmessage createEntity() {
        Chatmessage chatmessage = new Chatmessage()
            .userLogin(DEFAULT_USER_LOGIN)
            .message(DEFAULT_MESSAGE)
            .time(DEFAULT_TIME);
        return chatmessage;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Chatmessage createUpdatedEntity() {
        Chatmessage chatmessage = new Chatmessage()
            .userLogin(UPDATED_USER_LOGIN)
            .message(UPDATED_MESSAGE)
            .time(UPDATED_TIME);
        return chatmessage;
    }

    @BeforeEach
    public void initTest() {
        chatmessageRepository.deleteAll();
        chatmessage = createEntity();
    }

    @Test
    public void createChatmessage() throws Exception {
        int databaseSizeBeforeCreate = chatmessageRepository.findAll().size();

        // Create the Chatmessage
        ChatmessageDTO chatmessageDTO = chatmessageMapper.toDto(chatmessage);
        restChatmessageMockMvc.perform(post("/api/chatmessages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chatmessageDTO)))
            .andExpect(status().isCreated());

        // Validate the Chatmessage in the database
        List<Chatmessage> chatmessageList = chatmessageRepository.findAll();
        assertThat(chatmessageList).hasSize(databaseSizeBeforeCreate + 1);
        Chatmessage testChatmessage = chatmessageList.get(chatmessageList.size() - 1);
        assertThat(testChatmessage.getUserLogin()).isEqualTo(DEFAULT_USER_LOGIN);
        assertThat(testChatmessage.getMessage()).isEqualTo(DEFAULT_MESSAGE);
        assertThat(testChatmessage.getTime()).isEqualTo(DEFAULT_TIME);
    }

    @Test
    public void createChatmessageWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = chatmessageRepository.findAll().size();

        // Create the Chatmessage with an existing ID
        chatmessage.setId("existing_id");
        ChatmessageDTO chatmessageDTO = chatmessageMapper.toDto(chatmessage);

        // An entity with an existing ID cannot be created, so this API call must fail
        restChatmessageMockMvc.perform(post("/api/chatmessages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chatmessageDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Chatmessage in the database
        List<Chatmessage> chatmessageList = chatmessageRepository.findAll();
        assertThat(chatmessageList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void getAllChatmessages() throws Exception {
        // Initialize the database
        chatmessageRepository.save(chatmessage);

        // Get all the chatmessageList
        restChatmessageMockMvc.perform(get("/api/chatmessages?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(chatmessage.getId())))
            .andExpect(jsonPath("$.[*].userLogin").value(hasItem(DEFAULT_USER_LOGIN.toString())))
            .andExpect(jsonPath("$.[*].message").value(hasItem(DEFAULT_MESSAGE.toString())))
            .andExpect(jsonPath("$.[*].time").value(hasItem(DEFAULT_TIME.toString())));
    }
    
    @Test
    public void getChatmessage() throws Exception {
        // Initialize the database
        chatmessageRepository.save(chatmessage);

        // Get the chatmessage
        restChatmessageMockMvc.perform(get("/api/chatmessages/{id}", chatmessage.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(chatmessage.getId()))
            .andExpect(jsonPath("$.userLogin").value(DEFAULT_USER_LOGIN.toString()))
            .andExpect(jsonPath("$.message").value(DEFAULT_MESSAGE.toString()))
            .andExpect(jsonPath("$.time").value(DEFAULT_TIME.toString()));
    }

    @Test
    public void getNonExistingChatmessage() throws Exception {
        // Get the chatmessage
        restChatmessageMockMvc.perform(get("/api/chatmessages/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateChatmessage() throws Exception {
        // Initialize the database
        chatmessageRepository.save(chatmessage);

        int databaseSizeBeforeUpdate = chatmessageRepository.findAll().size();

        // Update the chatmessage
        Chatmessage updatedChatmessage = chatmessageRepository.findById(chatmessage.getId()).get();
        updatedChatmessage
            .userLogin(UPDATED_USER_LOGIN)
            .message(UPDATED_MESSAGE)
            .time(UPDATED_TIME);
        ChatmessageDTO chatmessageDTO = chatmessageMapper.toDto(updatedChatmessage);

        restChatmessageMockMvc.perform(put("/api/chatmessages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chatmessageDTO)))
            .andExpect(status().isOk());

        // Validate the Chatmessage in the database
        List<Chatmessage> chatmessageList = chatmessageRepository.findAll();
        assertThat(chatmessageList).hasSize(databaseSizeBeforeUpdate);
        Chatmessage testChatmessage = chatmessageList.get(chatmessageList.size() - 1);
        assertThat(testChatmessage.getUserLogin()).isEqualTo(UPDATED_USER_LOGIN);
        assertThat(testChatmessage.getMessage()).isEqualTo(UPDATED_MESSAGE);
        assertThat(testChatmessage.getTime()).isEqualTo(UPDATED_TIME);
    }

    @Test
    public void updateNonExistingChatmessage() throws Exception {
        int databaseSizeBeforeUpdate = chatmessageRepository.findAll().size();

        // Create the Chatmessage
        ChatmessageDTO chatmessageDTO = chatmessageMapper.toDto(chatmessage);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restChatmessageMockMvc.perform(put("/api/chatmessages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chatmessageDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Chatmessage in the database
        List<Chatmessage> chatmessageList = chatmessageRepository.findAll();
        assertThat(chatmessageList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteChatmessage() throws Exception {
        // Initialize the database
        chatmessageRepository.save(chatmessage);

        int databaseSizeBeforeDelete = chatmessageRepository.findAll().size();

        // Delete the chatmessage
        restChatmessageMockMvc.perform(delete("/api/chatmessages/{id}", chatmessage.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Chatmessage> chatmessageList = chatmessageRepository.findAll();
        assertThat(chatmessageList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Chatmessage.class);
        Chatmessage chatmessage1 = new Chatmessage();
        chatmessage1.setId("id1");
        Chatmessage chatmessage2 = new Chatmessage();
        chatmessage2.setId(chatmessage1.getId());
        assertThat(chatmessage1).isEqualTo(chatmessage2);
        chatmessage2.setId("id2");
        assertThat(chatmessage1).isNotEqualTo(chatmessage2);
        chatmessage1.setId(null);
        assertThat(chatmessage1).isNotEqualTo(chatmessage2);
    }

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ChatmessageDTO.class);
        ChatmessageDTO chatmessageDTO1 = new ChatmessageDTO();
        chatmessageDTO1.setId("id1");
        ChatmessageDTO chatmessageDTO2 = new ChatmessageDTO();
        assertThat(chatmessageDTO1).isNotEqualTo(chatmessageDTO2);
        chatmessageDTO2.setId(chatmessageDTO1.getId());
        assertThat(chatmessageDTO1).isEqualTo(chatmessageDTO2);
        chatmessageDTO2.setId("id2");
        assertThat(chatmessageDTO1).isNotEqualTo(chatmessageDTO2);
        chatmessageDTO1.setId(null);
        assertThat(chatmessageDTO1).isNotEqualTo(chatmessageDTO2);
    }
}
