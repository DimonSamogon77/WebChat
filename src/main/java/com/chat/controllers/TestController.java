package com.chat.controllers;

import com.chat.models.DialogueMessage;
import com.chat.models.Person;
import com.chat.models.TextMessage;
import lombok.SneakyThrows;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class TestController {
    private String name;

//    @SneakyThrows
//    @MessageMapping("/hello")
//    @SendTo("/topic/chat")
//    public TextMessage hi(Person person){
//        Thread.sleep(1000);
//        this.name = person.getName();
//        return new TextMessage("Hi "+name);
//    }

    @MessageMapping("/dialogue")
    @SendTo("/topic/chat")
    public DialogueMessage sendMessage(DialogueMessage dialogueMessage){
        return new DialogueMessage(dialogueMessage.getFrom(), dialogueMessage.getText());
    }
}
