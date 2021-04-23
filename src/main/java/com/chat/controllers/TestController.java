package com.chat.controllers;

import com.chat.models.Person;
import com.chat.models.TextMessage;
import lombok.SneakyThrows;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class TestController {

    @SneakyThrows
    @MessageMapping("/hello")
    @SendTo("/topic/chat")
    public TextMessage hi(Person person){
        Thread.sleep(1000);
        return new TextMessage("Hello "+person.getName());
    }
}
