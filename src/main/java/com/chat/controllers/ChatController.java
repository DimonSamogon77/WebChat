package com.chat.controllers;

import com.chat.dao.MessagesDao;
import com.chat.dao.PersonDao;
import com.chat.models.DialogueMessage;
import com.chat.models.Person;
import com.chat.models.PersonWithNoUsername;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.MediaType;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.servlet.MultipartConfigElement;
import java.awt.image.BufferedImage;
import java.io.File;

@RestController
@RequestMapping(value = "/chatik")
public class ChatController {

    private PersonDao personDao;
    private MessagesDao messagesDao;

    @Autowired
    public ChatController(PersonDao personDao, MessagesDao messagesDao) {
        this.personDao = personDao;
        this.messagesDao = messagesDao;
    }

    @MessageMapping("/dialogue")
    @SendTo("/topic/chat")
    public DialogueMessage sendMessage(DialogueMessage dialogueMessage){
        messagesDao.save(dialogueMessage);
        return new DialogueMessage(dialogueMessage.getSender() ,dialogueMessage.getText());
    }

    @SneakyThrows
    @RequestMapping(value = "/signup", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public boolean signUp(@RequestBody Person person) {
        Person findPerson = personDao.findByEmail(person.getEmail());
        if (findPerson == null) {
            personDao.save(person);
            return true;
        }
        return false;
    }

    @RequestMapping(value = "/verification", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public int verification(@RequestBody PersonWithNoUsername personWithNoUsername){
        Person findPerson = personDao.findByEmail(personWithNoUsername.getEmail());
        if(findPerson!=null){
            if(findPerson.getPassword().equals(personWithNoUsername.getPassword())){
                return 1;
            }else {
                return 0;
            }
        }else{
            return 0;
        }
    }

    @RequestMapping(value = "/signin", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public Person signIn(@RequestBody PersonWithNoUsername personWithNoUsername){
        return personDao.findByEmail(personWithNoUsername.getEmail());
    }

    @RequestMapping(value = "/loaddb", method = RequestMethod.GET, consumes = MediaType.APPLICATION_JSON_VALUE)
    public Iterable<DialogueMessage> loadDb(){
        return messagesDao.findAll();
    }

    @Bean
    public MultipartConfigElement multipartConfigElement() {
        return new MultipartConfigElement("");
    }

    @SneakyThrows
    @RequestMapping(value = "/image", method = RequestMethod.POST, consumes = "multipart/form-data")
    public void saveImage(@RequestParam("avatar") MultipartFile file){
        System.out.println("пососи");
    }
}
