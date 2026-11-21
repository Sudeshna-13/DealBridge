package com.example.dealbridge.controller;

import com.example.dealbridge.dto.UserRegistrationDTO;
import com.example.dealbridge.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.dealbridge.dto.LoginRequestDTO;
import com.example.dealbridge.dto.LoginResponseDTO;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public String register(@RequestBody UserRegistrationDTO dto){

        return userService.registerUser(dto);

    }
    @PostMapping("/login")
    public LoginResponseDTO login(@RequestBody LoginRequestDTO dto) {

        return userService.loginUser(dto);

    }

}