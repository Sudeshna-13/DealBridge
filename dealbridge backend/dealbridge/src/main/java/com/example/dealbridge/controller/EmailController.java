package com.example.dealbridge.controller;

import com.example.dealbridge.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@CrossOrigin("*")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @GetMapping("/test")
    public String testEmail() {

        emailService.sendMail(
                "sdesha33@gmail.com",
                "DealBridge Test Mail",
                "Congratulations! Email integration is working successfully."
        );

        return "Email Sent Successfully";
    }
}