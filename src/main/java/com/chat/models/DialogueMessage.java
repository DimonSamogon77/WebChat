package com.chat.models;

import lombok.AllArgsConstructor;
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

    private String from;
    private String text;

    public DialogueMessage(String from, String text) {
        this.from = from;
        this.text = text;
    }
}
