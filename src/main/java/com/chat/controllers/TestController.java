package com.chat.controllers;

import com.chat.models.DialogueMessage;
import com.chat.models.Person;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/chatik")
public class TestController {

    @MessageMapping("/dialogue")
    @SendTo("/topic/chat")
    public DialogueMessage sendMessage(DialogueMessage dialogueMessage){
        return new DialogueMessage(dialogueMessage.getFrom(), dialogueMessage.getText());
    }

    @PostMapping("/login")
    public void newPerson(Person person){
        System.out.println("Мы молодцы");
    }

}
