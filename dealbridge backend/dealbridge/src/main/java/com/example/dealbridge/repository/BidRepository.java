package com.example.dealbridge.repository;

import com.example.dealbridge.entity.Bid;
import com.example.dealbridge.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BidRepository extends JpaRepository<Bid, Long> {

    List<Bid> findByProductProductId(Long productId);

    List<Bid> findByProductProductIdOrderByBidAmountDesc(Long productId);

    Bid findTopByProductProductIdOrderByBidAmountDesc(Long productId);

    List<Bid> findByBuyer(User buyer);
    List<Bid> findAll();
    List<Bid> findAllByOrderByBidTimeDesc();

}