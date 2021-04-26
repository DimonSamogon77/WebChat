package com.chat.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "users")
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String userName;
    private String email;
    private String password;

    public Person(String userName, String email, String password) {
        this.userName = userName;
        this.email = email;
        this.password = password;
    }
}
