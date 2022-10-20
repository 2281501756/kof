package com.example.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
public class index {
    @RequestMapping("/")
    public String demo() {
        String res = "hello world";
        return res;
    }
}
