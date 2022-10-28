package com.example.backend.controller.account;


import com.example.backend.service.impl.account.RegisterServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class RegisterController {
    @Autowired
    private RegisterServiceImpl registerService;

    @PostMapping("/user/account/register/")
    public Map<String, String> register(@RequestBody Map<String, String> map) {
        return registerService.register(map.get("username"), map.get("password"), map.get("confirmedPassword"), map.get("nickname"));
    }
}
