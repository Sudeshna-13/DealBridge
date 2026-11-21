package com.example.dealbridge.dto;

public class AuctionAnalyticsDTO {

    private long totalRevenue;

    private double highestBid;

    private long liveAuctions;

    private long completedAuctions;

    private String topBuyer;

    private String topSeller;

    public AuctionAnalyticsDTO() {
    }

    public long getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(long totalRevenue) {
        this.totalRevenue = totalRevenue;
    }

    public double getHighestBid() {
        return highestBid;
    }

    public void setHighestBid(double highestBid) {
        this.highestBid = highestBid;
    }

    public long getLiveAuctions() {
        return liveAuctions;
    }

    public void setLiveAuctions(long liveAuctions) {
        this.liveAuctions = liveAuctions;
    }

    public long getCompletedAuctions() {
        return completedAuctions;
    }

    public void setCompletedAuctions(long completedAuctions) {
        this.completedAuctions = completedAuctions;
    }

    public String getTopBuyer() {
        return topBuyer;
    }

    public void setTopBuyer(String topBuyer) {
        this.topBuyer = topBuyer;
    }

    public String getTopSeller() {
        return topSeller;
    }

    public void setTopSeller(String topSeller) {
        this.topSeller = topSeller;
    }

}