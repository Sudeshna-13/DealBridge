package com.example.dealbridge.service;

import com.example.dealbridge.dto.BidDTO;
import com.example.dealbridge.dto.BidResponseDTO;
import com.example.dealbridge.dto.WinnerResponseDTO;
import com.example.dealbridge.dto.BidHistoryDTO;
import com.example.dealbridge.dto.BuyerBidDTO;
import com.example.dealbridge.dto.BuyerDashboardStatsDTO;
import com.example.dealbridge.dto.SellerDashboardStatsDTO;

import com.example.dealbridge.entity.Bid;
import com.example.dealbridge.entity.Product;
import com.example.dealbridge.entity.User;

import com.example.dealbridge.enums.ProductStatus;
import com.example.dealbridge.enums.Role;

import com.example.dealbridge.repository.BidRepository;
import com.example.dealbridge.repository.ProductRepository;
import com.example.dealbridge.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class BidService {

    @Autowired
    private BidRepository bidRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductService productService;

    @Autowired
    private EmailService emailService;


    // =========================================================
    // PLACE BID
    // =========================================================

    public String placeBid(BidDTO dto) {

        // Close expired auctions before accepting a new bid
        productService.closeExpiredAuctions();


        User buyer = userRepository.findByEmail(dto.getBuyerEmail())
                .orElseThrow(() ->
                        new RuntimeException("Buyer not found"));


        if (buyer.getRole() != Role.BUYER) {

            return "Only Buyers can place bids.";

        }


        Product product = productRepository.findById(dto.getProductId())
                .orElseThrow(() ->
                        new RuntimeException("Product not found"));


        if (product.getStatus() == ProductStatus.SOLD) {

            return "Auction already completed.";

        }


        if (product.getSeller().getId().equals(buyer.getId())) {

            return "Seller cannot bid on own product.";

        }


        if (product.getAuctionStart() != null
                && LocalDateTime.now().isBefore(product.getAuctionStart())) {

            return "Auction has not started yet.";

        }


        if (product.getAuctionEnd() != null
                && LocalDateTime.now().isAfter(product.getAuctionEnd())) {

            return "Auction has already ended.";

        }


        double highestBid = product.getStartingBid();


        List<Bid> bids =
                bidRepository.findByProductProductIdOrderByBidAmountDesc(
                        product.getProductId()
                );


        if (!bids.isEmpty()) {

            highestBid =
                    bids.get(0).getBidAmount();

        }


        if (dto.getBidAmount() <= highestBid) {

            return "Bid must be greater than ₹" + highestBid;

        }


        Bid bid = new Bid();

        bid.setBuyer(buyer);
        bid.setProduct(product);
        bid.setBidAmount(dto.getBidAmount());
        bid.setBidTime(LocalDateTime.now());


        bidRepository.save(bid);


        // =====================================================
        // BUYER - BID PLACED EMAIL
        // =====================================================

        emailService.sendMail(

                buyer.getEmail(),

                "Bid Placed Successfully",

                "Hello " + buyer.getName()
                        + ",\n\n"
                        + "Your bid of ₹"
                        + bid.getBidAmount()
                        + " has been placed successfully.\n\n"
                        + "Product : "
                        + product.getProductName()
                        + "\n\n"
                        + "Good Luck!\n\n"
                        + "DealBridge Team"
        );


        // =====================================================
        // SELLER - NEW BID EMAIL
        // =====================================================

        emailService.sendMail(

                product.getSeller().getEmail(),

                "New Bid Received",

                "Hello "
                        + product.getSeller().getName()
                        + ",\n\n"

                        + "A new bid has been placed on your product.\n\n"

                        + "Product : "
                        + product.getProductName()
                        + "\n"

                        + "Bid Amount : ₹"
                        + bid.getBidAmount()
                        + "\n"

                        + "Buyer : "
                        + buyer.getName()
                        + "\n"

                        + "Buyer Email : "
                        + buyer.getEmail()
                        + "\n\n"

                        + "DealBridge Team"
        );


        return "Bid Placed Successfully!";
    }


    // =========================================================
    // GET BIDS BY PRODUCT
    // =========================================================

    public List<BidResponseDTO> getBidsByProduct(Long productId) {

        List<Bid> bids =
                bidRepository.findByProductProductIdOrderByBidAmountDesc(
                        productId
                );


        List<BidResponseDTO> response =
                new ArrayList<>();


        for (Bid bid : bids) {

            BidResponseDTO dto =
                    new BidResponseDTO();

            dto.setBidId(bid.getBidId());

            dto.setBuyerName(
                    bid.getBuyer().getName()
            );

            dto.setBuyerEmail(
                    bid.getBuyer().getEmail()
            );

            dto.setBidAmount(
                    bid.getBidAmount()
            );

            dto.setBidTime(
                    bid.getBidTime()
            );

            response.add(dto);
        }


        return response;
    }


    // =========================================================
    // GET WINNER - MANUAL
    // =========================================================

    public WinnerResponseDTO getWinner(Long productId) {

        Product product =
                productRepository.findById(productId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Product not found"
                                ));


        List<Bid> bids =
                bidRepository.findByProductProductIdOrderByBidAmountDesc(
                        productId
                );


        if (bids.isEmpty()) {

            throw new RuntimeException(
                    "No bids placed"
            );

        }


        Bid highestBid = bids.get(0);


        // Prevent duplicate winner processing
        if (product.getStatus() == ProductStatus.SOLD) {

            throw new RuntimeException(
                    "Auction already completed"
            );

        }


        product.setStatus(ProductStatus.SOLD);

        productRepository.save(product);


        // =====================================================
        // SEND WINNER + LOSER + SELLER EMAILS
        // =====================================================

        sendAuctionResultEmails(
                product,
                highestBid
        );


        WinnerResponseDTO dto =
                new WinnerResponseDTO();


        dto.setProductId(
                product.getProductId()
        );

        dto.setProductName(
                product.getProductName()
        );

        dto.setWinnerName(
                highestBid.getBuyer().getName()
        );

        dto.setWinnerEmail(
                highestBid.getBuyer().getEmail()
        );

        dto.setWinningBid(
                highestBid.getBidAmount()
        );

        dto.setStatus(
                product.getStatus().name()
        );


        return dto;
    }


    // =========================================================
    // GET BUYER BIDS
    // =========================================================

    public List<BidResponseDTO> getBuyerBids(String email) {

        User buyer =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Buyer not found"
                                ));


        List<Bid> bids =
                bidRepository.findByBuyer(buyer);


        List<BidResponseDTO> response =
                new ArrayList<>();


        for (Bid bid : bids) {

            BidResponseDTO dto =
                    new BidResponseDTO();


            dto.setBidId(
                    bid.getBidId()
            );

            dto.setBuyerName(
                    bid.getBuyer().getName()
            );

            dto.setBuyerEmail(
                    bid.getBuyer().getEmail()
            );

            dto.setBidAmount(
                    bid.getBidAmount()
            );

            dto.setBidTime(
                    bid.getBidTime()
            );

            dto.setProductName(
                    bid.getProduct().getProductName()
            );

            dto.setProductImage(
                    bid.getProduct().getImagePath()
            );

            dto.setProductStatus(
                    bid.getProduct().getStatus().name()
            );


            response.add(dto);
        }


        return response;
    }


    // =========================================================
    // BID HISTORY
    // =========================================================

    public List<BidHistoryDTO> getBidHistory() {

        List<Bid> bids =
                bidRepository.findAllByOrderByBidTimeDesc();


        List<BidHistoryDTO> response =
                new ArrayList<>();


        for (Bid bid : bids) {

            BidHistoryDTO dto =
                    new BidHistoryDTO();


            dto.setBidId(
                    bid.getBidId()
            );


            dto.setBuyerName(
                    bid.getBuyer().getName()
            );

            dto.setBuyerEmail(
                    bid.getBuyer().getEmail()
            );


            dto.setSellerName(
                    bid.getProduct()
                            .getSeller()
                            .getName()
            );

            dto.setSellerEmail(
                    bid.getProduct()
                            .getSeller()
                            .getEmail()
            );


            dto.setProductName(
                    bid.getProduct()
                            .getProductName()
            );


            dto.setBidAmount(
                    bid.getBidAmount()
            );


            dto.setBidTime(
                    bid.getBidTime()
            );


            dto.setStatus(
                    bid.getProduct()
                            .getStatus()
                            .name()
            );


            response.add(dto);
        }


        return response;
    }


    // =========================================================
    // BUYER DASHBOARD
    // =========================================================

    public List<BuyerBidDTO> getBuyerDashboard(String email) {

        User buyer =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Buyer not found"
                                ));


        List<Bid> bids =
                bidRepository.findByBuyer(buyer);


        List<BuyerBidDTO> response =
                new ArrayList<>();


        for (Bid bid : bids) {

            BuyerBidDTO dto =
                    new BuyerBidDTO();


            Product product =
                    bid.getProduct();


            dto.setProductId(
                    product.getProductId()
            );


            dto.setProductName(
                    product.getProductName()
            );


            dto.setProductImage(
                    product.getImagePath()
            );


            dto.setMyBid(
                    bid.getBidAmount()
            );


            dto.setAuctionEnd(
                    product.getAuctionEnd()
            );


            dto.setStatus(
                    product.getStatus().name()
            );


            List<Bid> highest =
                    bidRepository
                            .findByProductProductIdOrderByBidAmountDesc(
                                    product.getProductId()
                            );


            if (!highest.isEmpty()) {

                dto.setHighestBid(
                        highest.get(0).getBidAmount()
                );


                if (product.getStatus() == ProductStatus.SOLD
                        && highest.get(0)
                        .getBuyer()
                        .getId()
                        .equals(buyer.getId())) {

                    dto.setWinner(true);

                } else {

                    dto.setWinner(false);

                }

            } else {

                dto.setWinner(false);

            }


            response.add(dto);
        }


        return response;
    }


    // =========================================================
    // BUYER STATISTICS
    // =========================================================

    public BuyerDashboardStatsDTO getBuyerStatistics(
            String email) {

        List<BuyerBidDTO> bids =
                getBuyerDashboard(email);


        BuyerDashboardStatsDTO stats =
                new BuyerDashboardStatsDTO();


        stats.setTotalAuctions(
                bids.size()
        );


        int live = 0;
        int won = 0;
        int lost = 0;


        for (BuyerBidDTO bid : bids) {

            if ("AVAILABLE".equals(
                    bid.getStatus())) {

                live++;

            }

            else if (bid.isWinner()) {

                won++;

            }

            else {

                lost++;

            }
        }


        stats.setLiveAuctions(live);

        stats.setWonAuctions(won);

        stats.setLostAuctions(lost);


        return stats;
    }


    // =========================================================
    // SEND AUCTION RESULT EMAILS
    // =========================================================

    private void sendAuctionResultEmails(
            Product product,
            Bid winningBid) {


        List<Bid> allBids =
                bidRepository.findByProductProductId(
                        product.getProductId()
                );


        // =====================================================
        // WINNER EMAIL
        // =====================================================

        emailService.sendMail(

                winningBid.getBuyer().getEmail(),

                "Congratulations! You Won the Auction",

                "Hello "
                        + winningBid.getBuyer().getName()
                        + ",\n\n"

                        + "Congratulations! You have won the auction.\n\n"

                        + "Product : "
                        + product.getProductName()
                        + "\n"

                        + "Winning Bid : ₹"
                        + winningBid.getBidAmount()
                        + "\n\n"

                        + "Thank you for using DealBridge.\n\n"

                        + "DealBridge Team"
        );


        // =====================================================
        // LOSER EMAILS
        // =====================================================

        for (Bid bid : allBids) {

            if (!bid.getBuyer()
                    .getId()
                    .equals(
                            winningBid
                                    .getBuyer()
                                    .getId()
                    )) {


                emailService.sendMail(

                        bid.getBuyer().getEmail(),

                        "Auction Closed - You Did Not Win",

                        "Hello "
                                + bid.getBuyer().getName()
                                + ",\n\n"

                                + "The auction for the following product has ended.\n\n"

                                + "Product : "
                                + product.getProductName()
                                + "\n\n"

                                + "Unfortunately, your bid was not the winning bid.\n\n"

                                + "Winning Bid : ₹"
                                + winningBid.getBidAmount()
                                + "\n\n"

                                + "Thank you for participating in DealBridge.\n\n"

                                + "DealBridge Team"
                );
            }
        }


        // =====================================================
        // SELLER EMAIL
        // =====================================================

        emailService.sendMail(

                product.getSeller().getEmail(),

                "Auction Completed - Product Sold",

                "Hello "
                        + product.getSeller().getName()
                        + ",\n\n"

                        + "Your auction has been completed successfully.\n\n"

                        + "Product : "
                        + product.getProductName()
                        + "\n"

                        + "Winning Buyer : "
                        + winningBid.getBuyer().getName()
                        + "\n"

                        + "Buyer Email : "
                        + winningBid.getBuyer().getEmail()
                        + "\n"

                        + "Winning Amount : ₹"
                        + winningBid.getBidAmount()
                        + "\n\n"

                        + "Thank you for using DealBridge.\n\n"

                        + "DealBridge Team"
        );
    }


    // =========================================================
    // AUTOMATICALLY CLOSE EXPIRED AUCTIONS
    // =========================================================

    public void closeExpiredAuctions() {

        List<Product> products =
                productRepository.findByStatus(
                        ProductStatus.AVAILABLE
                );


        for (Product product : products) {

            if (product.getAuctionEnd() != null
                    && product.getAuctionEnd()
                    .isBefore(LocalDateTime.now())) {


                Bid highestBid =
                        bidRepository
                                .findTopByProductProductIdOrderByBidAmountDesc(
                                        product.getProductId()
                                );


                if (highestBid != null) {

                    product.setStatus(
                            ProductStatus.SOLD
                    );

                    productRepository.save(product);


                    // =================================================
                    // WINNER + LOSER + SELLER EMAILS
                    // =================================================

                    sendAuctionResultEmails(
                            product,
                            highestBid
                    );
                }
            }
        }
    }


    // =========================================================
    // SELLER STATISTICS
    // =========================================================

    public SellerDashboardStatsDTO getSellerStatistics(
            String email) {

        User seller =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Seller Not Found"
                                ));


        List<Product> products =
                productRepository.findBySeller(seller);


        SellerDashboardStatsDTO stats =
                new SellerDashboardStatsDTO();


        stats.setTotalProducts(
                products.size()
        );


        int live = 0;
        int sold = 0;

        double earnings = 0;


        for (Product product : products) {

            if (product.getStatus()
                    == ProductStatus.AVAILABLE) {

                live++;
            }


            if (product.getStatus()
                    == ProductStatus.SOLD) {

                sold++;


                Bid highestBid =
                        bidRepository
                                .findTopByProductProductIdOrderByBidAmountDesc(
                                        product.getProductId()
                                );


                if (highestBid != null) {

                    earnings +=
                            highestBid.getBidAmount();

                }
            }
        }


        stats.setLiveAuctions(live);

        stats.setSoldProducts(sold);

        stats.setTotalEarnings(earnings);


        return stats;
    }


    // =========================================================
    // SELLER SALES
    // =========================================================

    public List<com.example.dealbridge.dto.SellerSaleDTO>
    getSellerSales(String email) {

        User seller =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Seller Not Found"
                                ));


        List<Product> products =
                productRepository.findBySeller(seller);


        List<com.example.dealbridge.dto.SellerSaleDTO>
                response =
                new ArrayList<>();


        for (Product product : products) {

            if (product.getStatus()
                    == ProductStatus.SOLD) {


                Bid highestBid =
                        bidRepository
                                .findTopByProductProductIdOrderByBidAmountDesc(
                                        product.getProductId()
                                );


                if (highestBid != null) {

                    com.example.dealbridge.dto.SellerSaleDTO dto =
                            new com.example.dealbridge.dto.SellerSaleDTO();


                    dto.setProductName(
                            product.getProductName()
                    );


                    dto.setBuyerName(
                            highestBid
                                    .getBuyer()
                                    .getName()
                    );


                    dto.setWinningBid(
                            highestBid
                                    .getBidAmount()
                    );


                    dto.setAuctionEnd(
                            product.getAuctionEnd()
                    );


                    dto.setStatus(
                            product.getStatus().name()
                    );


                    response.add(dto);
                }
            }
        }


        return response;
    }

}