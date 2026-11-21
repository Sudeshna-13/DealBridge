package com.example.dealbridge.dto;

public class AdminDashboardStatsDTO {

    private long totalUsers;
    private long totalProducts;
    private long liveAuctions;
    private long closedAuctions;
    private double totalRevenue;

    public long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }

    public long getTotalProducts() {
        return totalProducts;
    }

    public void setTotalProducts(long totalProducts) {
        this.totalProducts = totalProducts;
    }

    public long getLiveAuctions() {
        return liveAuctions;
    }

    public void setLiveAuctions(long liveAuctions) {
        this.liveAuctions = liveAuctions;
    }

    public long getClosedAuctions() {
        return closedAuctions;
    }

    public void setClosedAuctions(long closedAuctions) {
        this.closedAuctions = closedAuctions;
    }

    public double getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(double totalRevenue) {
        this.totalRevenue = totalRevenue;
    }
}