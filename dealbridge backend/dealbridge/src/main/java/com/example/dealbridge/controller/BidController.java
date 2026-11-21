package com.example.dealbridge.controller;

import com.example.dealbridge.dto.BidDTO;
import com.example.dealbridge.dto.BidResponseDTO;
import com.example.dealbridge.dto.WinnerResponseDTO;
import com.example.dealbridge.service.BidService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bids")
@CrossOrigin("*")
public class BidController {

    @Autowired
    private BidService bidService;

    @PostMapping("/place")
    public String placeBid(@RequestBody BidDTO dto) {
        return bidService.placeBid(dto);
    }

    @GetMapping("/product/{productId}")
    public List<BidResponseDTO> getBids(@PathVariable Long productId) {
        return bidService.getBidsByProduct(productId);
    }

    @GetMapping("/winner/{productId}")
    public WinnerResponseDTO getWinner(@PathVariable Long productId) {
        return bidService.getWinner(productId);
    }

    @GetMapping("/buyer/{email}")
    public List<BidResponseDTO> getBuyerBids(
            @PathVariable String email) {

        return bidService.getBuyerBids(email);

    }
}