package com.example.dealbridge.controller;

import com.example.dealbridge.dto.AdminDashboardDTO;
import com.example.dealbridge.dto.AuctionAnalyticsDTO;
import com.example.dealbridge.dto.BidMonitorDTO;
import com.example.dealbridge.entity.Product;
import com.example.dealbridge.entity.User;
import com.example.dealbridge.service.AdminService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("*")
public class AdminController {

    @Autowired
    private AdminService adminService;


    // =========================
    // ADMIN DASHBOARD
    // =========================

    @GetMapping("/dashboard")
    public AdminDashboardDTO dashboard() {

        return adminService.dashboard();

    }


    // =========================
    // ALL USERS
    // =========================

    @GetMapping("/users")
    public List<User> allUsers() {

        return adminService.allUsers();

    }


    // =========================
    // BUYERS
    // =========================

    @GetMapping("/buyers")
    public List<User> getAllBuyers() {

        return adminService.getAllBuyers();

    }


    // =========================
    // SELLERS
    // =========================

    @GetMapping("/sellers")
    public List<User> getAllSellers() {

        return adminService.getAllSellers();

    }


    // =========================
    // PRODUCTS
    // =========================

    @GetMapping("/products")
    public List<Product> allProducts() {

        return adminService.allProducts();

    }


    // =========================
    // DELETE USER
    // =========================

    @DeleteMapping("/users/{id}")
    public String deleteUser(
            @PathVariable Long id) {

        adminService.deleteUser(id);

        return "User Deleted Successfully";

    }


    // =========================
    // DELETE PRODUCT
    // =========================

    @DeleteMapping("/products/{id}")
    public String deleteProduct(
            @PathVariable Long id) {

        adminService.deleteProduct(id);

        return "Product Deleted Successfully";

    }


    // =========================
    // ANALYTICS
    // =========================

    @GetMapping("/analytics")
    public AuctionAnalyticsDTO analytics() {

        return adminService.getAnalytics();

    }


    // =========================
    // BID MONITOR
    // =========================

    @GetMapping("/bid-monitor")
    public List<BidMonitorDTO> monitorBids() {

        return adminService.monitorBids();

    }

}