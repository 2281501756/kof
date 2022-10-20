package com.example.backend.controller.user;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.backend.mapper.UserMapper;
import com.example.backend.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserMapper userMapper;

    @GetMapping("/")
    public List<User> getAll() {
        return userMapper.selectList(null);
    }
    @GetMapping("/{userId}")
    public User getById(@PathVariable int userId) {
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("id", userId);
        return userMapper.selectOne(queryWrapper);
    }
    @GetMapping("/{username}/{password}")
    public String create(@PathVariable String username, @PathVariable String password) {
        User user = new User(null, username, password);
        userMapper.insert(user);
        return "succeed";
    }
}
