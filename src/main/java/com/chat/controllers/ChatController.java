package com.chat.controllers;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.chat.config.StorageConfig;
import com.chat.dao.MessagesDao;
import com.chat.dao.PersonDao;
import com.chat.models.DialogueMessage;
import com.chat.models.Person;
import com.chat.models.PersonWithNoUsername;
import lombok.SneakyThrows;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.URL;


@RestController
@RequestMapping(value = "/chatik")
public class ChatController {

    private PersonDao personDao;
    private MessagesDao messagesDao;
    AmazonS3 s3;

    @Autowired
    public ChatController(PersonDao personDao, MessagesDao messagesDao, StorageConfig storageConfig) {
        this.personDao = personDao;
        this.messagesDao = messagesDao;
        this.s3 = storageConfig.getAmazonS3();
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

    @RequestMapping(value = "/signin", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Person signIn(@RequestBody PersonWithNoUsername personWithNoUsername){
        return personDao.findByEmail(personWithNoUsername.getEmail());
    }

    @RequestMapping(value = "/loaddb", method = RequestMethod.GET, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Iterable<DialogueMessage> loadDb(){
        return messagesDao.findAll();
    }


    @SneakyThrows
    @RequestMapping(value = "/image", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public URL saveImage(@RequestPart MultipartFile avatar) {
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(avatar.getSize());
        String filename = avatar.getName()+"aboba."+FilenameUtils.getExtension(avatar.getOriginalFilename());
        s3.putObject("webchatdimonanton", filename, avatar.getInputStream(), objectMetadata);
        s3.setObjectAcl("webchatdimonanton", filename, CannedAccessControlList.PublicRead);
        return s3.getUrl("webchatdimonanton", filename);
    }
}
