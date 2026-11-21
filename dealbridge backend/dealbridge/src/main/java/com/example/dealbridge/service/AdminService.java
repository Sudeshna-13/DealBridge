package com.example.dealbridge.service;

import com.example.dealbridge.dto.AdminDashboardDTO;
import com.example.dealbridge.entity.Product;
import com.example.dealbridge.entity.User;
import com.example.dealbridge.enums.Role;
import com.example.dealbridge.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.dealbridge.dto.BidMonitorDTO;
import com.example.dealbridge.entity.Bid;
import java.util.List;
import java.util.ArrayList;
import com.example.dealbridge.dto.AuctionAnalyticsDTO;
import com.example.dealbridge.entity.Bid;
import com.example.dealbridge.enums.ProductStatus;

import java.util.HashMap;
import java.util.Map;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BidRepository bidRepository;

    @Autowired
    private ProductRepository productRepository;



    @Autowired
    private BuyerRepository buyerRepository;

    @Autowired
    private SellerRepository sellerRepository;


    public List<User> getAllBuyers() {

        return buyerRepository.findByRole(Role.BUYER);

    }

    public List<User> getAllSellers() {

        return sellerRepository.findByRole(Role.SELLER);

    }

    public AdminDashboardDTO dashboard() {

        AdminDashboardDTO dto = new AdminDashboardDTO();

        dto.setTotalUsers(userRepository.count());

        dto.setTotalBuyers(
                userRepository.countByRole(Role.BUYER)
        );

        dto.setTotalSellers(
                userRepository.countByRole(Role.SELLER)
        );

        dto.setTotalProducts(
                productRepository.count()
        );

        dto.setTotalBids(
                bidRepository.count()
        );

        return dto;
    }

    public List<User> allUsers() {

        return userRepository.findAll();

    }

    public List<Product> allProducts() {

        return productRepository.findAll();

    }

    public void deleteUser(Long id) {

        userRepository.deleteById(id);

    }
    public AuctionAnalyticsDTO getAnalytics() {

        AuctionAnalyticsDTO dto = new AuctionAnalyticsDTO();

        List<Bid> bids = bidRepository.findAll();

        double revenue = 0;
        double highestBid = 0;

        Map<String,Integer> buyerCount = new HashMap<>();
        Map<String,Integer> sellerCount = new HashMap<>();

        for(Bid bid : bids){

            revenue += bid.getBidAmount();

            if(bid.getBidAmount() > highestBid){
                highestBid = bid.getBidAmount();
            }

            String buyer =
                    bid.getBuyer().getName();

            buyerCount.put(
                    buyer,
                    buyerCount.getOrDefault(buyer,0)+1
            );

            String seller =
                    bid.getProduct()
                            .getSeller()
                            .getName();

            sellerCount.put(
                    seller,
                    sellerCount.getOrDefault(seller,0)+1
            );

        }

        dto.setTotalRevenue((long) revenue);

        dto.setHighestBid(highestBid);

        dto.setLiveAuctions(
                productRepository.countByStatus(ProductStatus.AVAILABLE)
        );

        dto.setCompletedAuctions(
                productRepository.countByStatus(ProductStatus.SOLD)
        );

        String topBuyer = "";
        int maxBuyer = 0;

        for(Map.Entry<String,Integer> entry : buyerCount.entrySet()){

            if(entry.getValue() > maxBuyer){

                maxBuyer = entry.getValue();

                topBuyer = entry.getKey();

            }

        }

        dto.setTopBuyer(topBuyer);

        String topSeller = "";
        int maxSeller = 0;

        for(Map.Entry<String,Integer> entry : sellerCount.entrySet()){

            if(entry.getValue() > maxSeller){

                maxSeller = entry.getValue();

                topSeller = entry.getKey();

            }

        }

        dto.setTopSeller(topSeller);

        return dto;

    }

    public void deleteProduct(Long id) {

        productRepository.deleteById(id);

    }
    public List<BidMonitorDTO> monitorBids() {

        List<Product> products = productRepository.findAll();

        List<BidMonitorDTO> response = new ArrayList<>();

        for (Product product : products) {

            List<Bid> bids =
                    bidRepository.findByProductProductIdOrderByBidAmountDesc(
                            product.getProductId()
                    );

            if (bids.isEmpty()) {
                continue;
            }

            Bid highestBid = bids.get(0);

            BidMonitorDTO dto = new BidMonitorDTO();

            dto.setProductId(
                    product.getProductId()
            );

            dto.setProductName(
                    product.getProductName()
            );

            dto.setSellerName(
                    product.getSeller().getName()
            );

            dto.setBuyerName(
                    highestBid.getBuyer().getName()
            );

            dto.setHighestBid(
                    highestBid.getBidAmount()
            );

            dto.setStatus(
                    product.getStatus().name()
            );

            dto.setAuctionEnd(
                    product.getAuctionEnd()
            );

            response.add(dto);
        }

        return response;
    }
}