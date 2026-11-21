package com.example.dealbridge.dto;

import java.time.LocalDateTime;

public class SellerSaleDTO {

    private String productName;
    private String buyerName;
    private double winningBid;
    private LocalDateTime auctionEnd;
    private String status;

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getBuyerName() {
        return buyerName;
    }

    public void setBuyerName(String buyerName) {
        this.buyerName = buyerName;
    }

    public double getWinningBid() {
        return winningBid;
    }

    public void setWinningBid(double winningBid) {
        this.winningBid = winningBid;
    }

    public LocalDateTime getAuctionEnd() {
        return auctionEnd;
    }

    public void setAuctionEnd(LocalDateTime auctionEnd) {
        this.auctionEnd = auctionEnd;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}