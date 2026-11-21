package com.example.dealbridge.controller;

import com.example.dealbridge.dto.BuyerBidDTO;
import com.example.dealbridge.service.BidService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.dealbridge.dto.BuyerDashboardStatsDTO;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/buyer")
@CrossOrigin("*")
public class BuyerController {

    @Autowired
    private BidService bidService;

    @GetMapping("/dashboard/{email}")
    public List<BuyerBidDTO> dashboard(
            @PathVariable String email) {

        return bidService.getBuyerDashboard(email);
    }
    @GetMapping("/statistics/{email}")
    public BuyerDashboardStatsDTO statistics(
            @PathVariable String email) {

        return bidService.getBuyerStatistics(email);

    }

    @GetMapping("/live/{email}")
    public List<BuyerBidDTO> live(
            @PathVariable String email) {

        return bidService.getBuyerDashboard(email)
                .stream()
                .filter(b -> b.getStatus().equals("AVAILABLE"))
                .collect(Collectors.toList());
    }

    @GetMapping("/won/{email}")
    public List<BuyerBidDTO> won(
            @PathVariable String email) {

        return bidService.getBuyerDashboard(email)
                .stream()
                .filter(BuyerBidDTO::isWinner)
                .collect(Collectors.toList());
    }

    @GetMapping("/lost/{email}")
    public List<BuyerBidDTO> lost(
            @PathVariable String email) {

        return bidService.getBuyerDashboard(email)
                .stream()
                .filter(b -> b.getStatus().equals("SOLD") && !b.isWinner())
                .collect(Collectors.toList());
    }
}