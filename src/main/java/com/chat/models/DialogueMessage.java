package com.chat.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "messages")
public class DialogueMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String sender;
    private String text;
    private String avatar;

    public DialogueMessage(String sender, String text, String avatar) {
        this.sender = sender;
        this.text = text;
        this.avatar = avatar;
    }
}
