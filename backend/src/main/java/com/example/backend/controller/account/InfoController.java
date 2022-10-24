package com.example.backend.controller.account;

import com.example.backend.service.impl.account.InfoServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class InfoController {
    @Autowired
    private InfoServiceImpl infoService;

    @GetMapping("/user/account/info/")
    public Map<String, String> getInfo() {
        return infoService.getInfo();
    }
}
