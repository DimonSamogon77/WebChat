package com.chat.controllers;

import com.chat.dao.PersonDao;
import com.chat.models.DialogueMessage;
import com.chat.models.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/chatik")
public class TestController {

    @Autowired
    private PersonDao personDao;

    @MessageMapping("/dialogue")
    @SendTo("/topic/chat")
    public DialogueMessage sendMessage(DialogueMessage dialogueMessage){
        return new DialogueMessage(dialogueMessage.getFrom(), dialogueMessage.getText());
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public void newPerson(@RequestBody Person person) {
        personDao.save(person);
        System.out.println("Мы молодцы");
    }

}
