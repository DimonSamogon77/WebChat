package com.chat.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class DialogueMessage {
    private String text;
    private String from;
}
