package com.example.dealbridge.repository;

import com.example.dealbridge.entity.Product;
import com.example.dealbridge.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.dealbridge.enums.ProductStatus;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findBySeller(User seller);
    long countByStatus(ProductStatus status);
    List<Product> findByProductNameContainingIgnoreCase(String productName);

    List<Product> findByCategoryIgnoreCase(String category);
    List<Product> findByStatus(ProductStatus status);

    List<Product> findByProductNameContainingIgnoreCaseAndCategoryIgnoreCase(
            String productName,
            String category
    );

}