package com.example.dealbridge.dto;

public class SellerDashboardStatsDTO {

    private int totalProducts;
    private int liveAuctions;
    private int soldProducts;
    private double totalEarnings;

    public int getTotalProducts() {
        return totalProducts;
    }

    public void setTotalProducts(int totalProducts) {
        this.totalProducts = totalProducts;
    }

    public int getLiveAuctions() {
        return liveAuctions;
    }

    public void setLiveAuctions(int liveAuctions) {
        this.liveAuctions = liveAuctions;
    }

    public int getSoldProducts() {
        return soldProducts;
    }

    public void setSoldProducts(int soldProducts) {
        this.soldProducts = soldProducts;
    }
    public double getTotalEarnings() {
        return totalEarnings;
    }

    public void setTotalEarnings(double totalEarnings) {
        this.totalEarnings = totalEarnings;
    }
}