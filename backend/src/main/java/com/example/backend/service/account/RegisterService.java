package com.example.backend.service.account;

import java.util.Map;

public interface RegisterService {
    public Map<String, String> register(String username, String password, String confirmPassword, String nickname);
}
