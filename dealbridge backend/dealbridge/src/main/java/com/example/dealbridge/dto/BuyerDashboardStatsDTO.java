package com.example.dealbridge.dto;

public class BuyerDashboardStatsDTO {

    private int totalAuctions;
    private int liveAuctions;
    private int wonAuctions;
    private int lostAuctions;

    public int getTotalAuctions() {
        return totalAuctions;
    }

    public void setTotalAuctions(int totalAuctions) {
        this.totalAuctions = totalAuctions;
    }

    public int getLiveAuctions() {
        return liveAuctions;
    }

    public void setLiveAuctions(int liveAuctions) {
        this.liveAuctions = liveAuctions;
    }

    public int getWonAuctions() {
        return wonAuctions;
    }

    public void setWonAuctions(int wonAuctions) {
        this.wonAuctions = wonAuctions;
    }

    public int getLostAuctions() {
        return lostAuctions;
    }

    public void setLostAuctions(int lostAuctions) {
        this.lostAuctions = lostAuctions;
    }
}