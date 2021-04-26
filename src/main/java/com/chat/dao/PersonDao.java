package com.chat.dao;

import com.chat.models.Person;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class PersonDao {
    private final List<Person> people = new ArrayList<>();

    public void save(Person person){
        people.add(person);
    }
}
