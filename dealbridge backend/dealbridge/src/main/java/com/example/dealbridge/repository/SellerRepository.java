package com.example.dealbridge.repository;

import com.example.dealbridge.entity.User;
import com.example.dealbridge.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SellerRepository extends JpaRepository<User, Long> {

    List<User> findByRole(Role role);

}