package com.chat.controllers;

import com.chat.dao.PersonDao;
import com.chat.models.DialogueMessage;
import com.chat.models.Person;
import com.chat.models.PersonWithNoUsername;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/chatik")
public class TestController {

    private PersonDao personDao;

    @Autowired
    public TestController(PersonDao personDao) {
        this.personDao = personDao;
    }

    @MessageMapping("/dialogue")
    @SendTo("/topic/chat")
    public DialogueMessage sendMessage(DialogueMessage dialogueMessage){
        return new DialogueMessage(dialogueMessage.getFrom() ,dialogueMessage.getText());
    }

    @RequestMapping(value = "/signup", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public boolean signUp(@RequestBody Person person) {
        Person findPerson = personDao.findByEmail(person.getEmail());
        if (findPerson == null) {
            personDao.save(person);
            System.out.println("Мы молодцы");
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
}
