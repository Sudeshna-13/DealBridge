package com.example.dealbridge.dto;

public class WinnerResponseDTO {

    private Long productId;
    private String productName;

    private String winnerName;
    private String winnerEmail;

    private Double winningBid;

    private String status;

    public WinnerResponseDTO() {
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getWinnerName() {
        return winnerName;
    }

    public void setWinnerName(String winnerName) {
        this.winnerName = winnerName;
    }

    public String getWinnerEmail() {
        return winnerEmail;
    }

    public void setWinnerEmail(String winnerEmail) {
        this.winnerEmail = winnerEmail;
    }

    public Double getWinningBid() {
        return winningBid;
    }

    public void setWinningBid(Double winningBid) {
        this.winningBid = winningBid;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}