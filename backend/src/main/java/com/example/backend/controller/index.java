package com.example.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/a")
public class index {
    @RequestMapping("index")
    public List<String> getData() {
        List<String> l = new ArrayList<String>();
        l.add("第一");
        l.add("第二");
        l.add("第三");
        return l;
    }
    @RequestMapping("demo")
    public String demo() {
        String res = "我是测试类中的";
        return res;
    }
}
