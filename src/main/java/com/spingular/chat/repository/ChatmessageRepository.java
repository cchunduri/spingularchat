package com.spingular.chat.repository;

import com.spingular.chat.domain.Chatmessage;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Chatmessage entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ChatmessageRepository extends MongoRepository<Chatmessage, String> {

}
