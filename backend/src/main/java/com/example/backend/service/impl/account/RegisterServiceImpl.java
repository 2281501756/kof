package com.example.backend.service.impl.account;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.backend.mapper.UserMapper;
import com.example.backend.pojo.User;
import com.example.backend.service.account.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class RegisterServiceImpl implements RegisterService {
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Map<String, String> register(String username, String password, String confirmPassword) {
        Map<String, String> map = new HashMap<>();
        username = username.trim();
        if(username.length() == 0) {
            map.put("error_message", "用户名不能为空");
            return map;
        }
        if(!password.equals(confirmPassword)) {
            map.put("error_message", "两次密码不一致");
            return map;
        }
        if(password.length() > 20) {
            map.put("error_message", "密码长度不能大于20");
            return map;
        }
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username", username);
        List<User> users = userMapper.selectList(queryWrapper);
        if(!users.isEmpty()) {
            map.put("error_message", "用户名已经存在");
            return map;
        }
        String encodedPassword = passwordEncoder.encode(password);
        String photo = "https://cdn.acwing.com/media/user/profile/photo/67937_lg_b3096b1d39.png";
        User user = new User(null, username, encodedPassword, photo);
        userMapper.insert(user);
        map.put("error_message", "success");
        return map;
    }
}
