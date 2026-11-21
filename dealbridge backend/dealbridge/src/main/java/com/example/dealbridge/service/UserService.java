package com.example.dealbridge.service;

import com.example.dealbridge.dto.UserRegistrationDTO;
import com.example.dealbridge.entity.User;
import com.example.dealbridge.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.dealbridge.dto.LoginRequestDTO;
import com.example.dealbridge.dto.LoginResponseDTO;
import com.example.dealbridge.security.JwtUtil;

import java.time.LocalDateTime;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private EmailService emailService;


    // ==============================
    // REGISTER USER
    // ==============================

    public String registerUser(UserRegistrationDTO dto) {

        if (userRepository.findByEmail(dto.getEmail()).isPresent()) {

            return "Email already exists!";

        }

        User user = new User();

        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword());
        user.setPhone(dto.getPhone());
        user.setRole(dto.getRole());

        user.setCreatedAt(LocalDateTime.now());

        user.setCity(dto.getCity());
        user.setState(dto.getState());
        user.setCountry(dto.getCountry());

        userRepository.save(user);


        // ==============================
        // REGISTRATION EMAIL
        // ==============================

        emailService.sendMail(
                user.getEmail(),

                "Welcome to DealBridge - Registration Successful",

                "Hello " + user.getName() + ",\n\n"
                        + "Your DealBridge account has been registered successfully.\n\n"
                        + "Account Details:\n"
                        + "Name : " + user.getName() + "\n"
                        + "Email : " + user.getEmail() + "\n"
                        + "Role : " + user.getRole().name() + "\n\n"
                        + "You can now login to DealBridge using your registered email and password.\n\n"
                        + "Thank you,\n"
                        + "DealBridge Team"
        );

        return "User Registered Successfully!";
    }


    // ==============================
    // LOGIN USER
    // ==============================

    public LoginResponseDTO loginUser(LoginRequestDTO dto) {

        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("Email not found"));

        if (!user.getPassword().equals(dto.getPassword())) {

            throw new RuntimeException("Invalid Password");

        }

        String token =
                jwtUtil.generateToken(user.getEmail());

        LoginResponseDTO response =
                new LoginResponseDTO();

        response.setId(user.getId());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole().name());
        response.setToken(token);

        return response;
    }

}