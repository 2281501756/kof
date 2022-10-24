package com.example.backend.controller.account;

import com.example.backend.service.impl.account.LoginServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class LoginController {
    @Autowired
    private LoginServiceImpl loginService;

    @PostMapping("/user/account/token/")
    public Map<String, String> getToken(@RequestBody Map<String, String> map) {
        String username = map.get("username");
        String password = map.get("password");
        return  loginService.login(username, password);
    }

}
