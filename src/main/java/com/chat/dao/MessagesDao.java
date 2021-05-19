package com.chat.dao;

import com.chat.models.DialogueMessage;
import org.springframework.data.repository.CrudRepository;

public interface MessagesDao extends CrudRepository<DialogueMessage, Long> {
}
