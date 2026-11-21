package com.example.dealbridge.service;

import com.example.dealbridge.dto.ProductDTO;
import com.example.dealbridge.entity.Product;
import com.example.dealbridge.entity.User;
import com.example.dealbridge.enums.ProductStatus;
import com.example.dealbridge.repository.BidRepository;
import com.example.dealbridge.repository.ProductRepository;
import com.example.dealbridge.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.dealbridge.dto.ProductResponseDTO;
import java.util.ArrayList;
import java.util.Optional;
import com.example.dealbridge.entity.Bid;
import com.example.dealbridge.dto.SellerDashboardStatsDTO;
import com.example.dealbridge.dto.SellerSaleDTO;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import java.io.IOException;
import java.util.UUID;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BidRepository bidRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    // Add Product
    public String addProduct(ProductDTO dto, MultipartFile image) throws IOException {

        User seller = userRepository.findByEmail(dto.getSellerEmail())
                .orElseThrow(() -> new RuntimeException("Seller not found"));

        Product product = new Product();

        product.setSeller(seller);
        product.setProductName(dto.getProductName());
        product.setDescription(dto.getDescription());
        product.setCategory(dto.getCategory());
        product.setCondition(dto.getCondition());
        product.setStartingBid(dto.getStartingBid());
        product.setExpectedPrice(dto.getExpectedPrice());
        product.setStatus(ProductStatus.AVAILABLE);

        product.setCreatedAt(LocalDateTime.now());
        product.setAuctionStart(dto.getAuctionStart());
        product.setAuctionEnd(dto.getAuctionEnd());

        // Save Image
        if (!image.isEmpty()) {

            String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();

            Path uploadPath = Paths.get(uploadDir);

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Files.copy(
                    image.getInputStream(),
                    uploadPath.resolve(fileName),
                    StandardCopyOption.REPLACE_EXISTING
            );

            product.setImagePath(fileName);
        }

        productRepository.save(product);

        return "Product Added Successfully!";
    }

    // View All Products
    public List<ProductResponseDTO> getAllProducts() {
        closeExpiredAuctions();

        List<Product> products = productRepository.findAll();


        List<ProductResponseDTO> response = new ArrayList<>();

        for (Product product : products) {

            ProductResponseDTO dto = new ProductResponseDTO();

            dto.setProductId(product.getProductId());
            dto.setProductName(product.getProductName());
            dto.setDescription(product.getDescription());
            dto.setCategory(product.getCategory());
            dto.setCondition(product.getCondition());
            dto.setStartingBid(product.getStartingBid());
            dto.setExpectedPrice(product.getExpectedPrice());
            dto.setImagePath(product.getImagePath());
            dto.setStatus(product.getStatus());
            dto.setCreatedAt(product.getCreatedAt());

            if (product.getSeller() != null) {
                dto.setSellerName(product.getSeller().getName());
                dto.setSellerEmail(product.getSeller().getEmail());
                dto.setSellerCity(product.getSeller().getCity());
            }
            dto.setAuctionStart(product.getAuctionStart());
            dto.setAuctionEnd(product.getAuctionEnd());

            response.add(dto);
        }

        return response;
    }
    public List<ProductResponseDTO> getSellerProducts(String email) {

        User seller = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Seller not found"));

        List<Product> products = productRepository.findBySeller(seller);

        List<ProductResponseDTO> response = new ArrayList<>();

        for (Product product : products) {

            ProductResponseDTO dto = new ProductResponseDTO();

            dto.setProductId(product.getProductId());
            dto.setProductName(product.getProductName());
            dto.setDescription(product.getDescription());
            dto.setCategory(product.getCategory());
            dto.setCondition(product.getCondition());
            dto.setStartingBid(product.getStartingBid());
            dto.setExpectedPrice(product.getExpectedPrice());
            dto.setImagePath(product.getImagePath());
            dto.setStatus(product.getStatus());
            dto.setCreatedAt(product.getCreatedAt());

            dto.setSellerName(product.getSeller().getName());
            dto.setSellerEmail(product.getSeller().getEmail());
            dto.setSellerCity(product.getSeller().getCity());

            dto.setAuctionStart(product.getAuctionStart());
            dto.setAuctionEnd(product.getAuctionEnd());

            response.add(dto);
        }

        return response;
    }
    public String deleteProduct(Long productId) {

        Optional<Product> product = productRepository.findById(productId);

        if (product.isEmpty()) {

            return "Product Not Found";

        }

        productRepository.delete(product.get());

        return "Product Deleted Successfully";
    }
    public ProductResponseDTO getProductById(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Product Not Found"));

        ProductResponseDTO dto = new ProductResponseDTO();

        dto.setProductId(product.getProductId());
        dto.setProductName(product.getProductName());
        dto.setDescription(product.getDescription());
        dto.setCategory(product.getCategory());
        dto.setCondition(product.getCondition());
        dto.setStartingBid(product.getStartingBid());
        dto.setExpectedPrice(product.getExpectedPrice());
        dto.setStatus(product.getStatus());
        dto.setImagePath(product.getImagePath());

        dto.setAuctionStart(product.getAuctionStart());
        dto.setAuctionEnd(product.getAuctionEnd());

        dto.setSellerName(product.getSeller().getName());
        dto.setSellerEmail(product.getSeller().getEmail());
        dto.setSellerCity(product.getSeller().getCity());

        return dto;

    }

    public String updateProduct(Long id, ProductDTO dto) {

        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Product Not Found"));

        product.setProductName(dto.getProductName());
        product.setDescription(dto.getDescription());
        product.setCategory(dto.getCategory());
        product.setCondition(dto.getCondition());

        product.setStartingBid(dto.getStartingBid());
        product.setExpectedPrice(dto.getExpectedPrice());

        product.setAuctionStart(dto.getAuctionStart());
        product.setAuctionEnd(dto.getAuctionEnd());

        productRepository.save(product);

        return "Product Updated Successfully";

    }
    private ProductResponseDTO convert(Product product) {

        ProductResponseDTO dto = new ProductResponseDTO();

        dto.setProductId(product.getProductId());
        dto.setProductName(product.getProductName());
        dto.setDescription(product.getDescription());
        dto.setCategory(product.getCategory());
        dto.setCondition(product.getCondition());
        dto.setStartingBid(product.getStartingBid());
        dto.setExpectedPrice(product.getExpectedPrice());
        dto.setImagePath(product.getImagePath());
        dto.setStatus(product.getStatus());

        dto.setSellerName(product.getSeller().getName());
        dto.setSellerEmail(product.getSeller().getEmail());
        dto.setSellerCity(product.getSeller().getCity());

        dto.setAuctionStart(product.getAuctionStart());
        dto.setAuctionEnd(product.getAuctionEnd());

        return dto;

    }
    public List<ProductResponseDTO> getLiveProducts() {

        closeExpiredAuctions();

        List<Product> products =
                productRepository.findByStatus(ProductStatus.AVAILABLE);

        List<ProductResponseDTO> response = new ArrayList<>();

        for(Product product : products){

            response.add(convert(product));

        }

        return response;
    }
    public List<ProductResponseDTO> getClosedProducts() {

        closeExpiredAuctions();

        List<Product> products =
                productRepository.findByStatus(ProductStatus.SOLD);

        List<ProductResponseDTO> response = new ArrayList<>();

        for(Product product : products){

            response.add(convert(product));

        }

        return response;
    }
    public List<ProductResponseDTO> searchProducts(String keyword) {

        List<Product> products =
                productRepository.findByProductNameContainingIgnoreCase(keyword);

        List<ProductResponseDTO> response = new ArrayList<>();

        for (Product product : products) {

            response.add(convert(product));

        }

        return response;
    }

    public List<ProductResponseDTO> filterCategory(String category) {

        List<Product> products =
                productRepository.findByCategoryIgnoreCase(category);

        List<ProductResponseDTO> response = new ArrayList<>();

        for (Product product : products) {

            response.add(convert(product));

        }

        return response;
    }

    public List<ProductResponseDTO> searchFilter(String keyword,
                                                 String category) {

        List<Product> products =
                productRepository
                        .findByProductNameContainingIgnoreCaseAndCategoryIgnoreCase(
                                keyword,
                                category
                        );

        List<ProductResponseDTO> response = new ArrayList<>();

        for (Product product : products) {

            response.add(convert(product));

        }

        return response;
    }
    public void closeExpiredAuctions() {

        List<Product> products =
                productRepository.findByStatus(ProductStatus.AVAILABLE);

        for (Product product : products) {

            if (product.getAuctionEnd().isBefore(LocalDateTime.now())) {

                Bid highestBid =
                        bidRepository.findTopByProductProductIdOrderByBidAmountDesc(
                                product.getProductId()
                        );

                if (highestBid != null) {

                    product.setStatus(ProductStatus.SOLD);

                    productRepository.save(product);

                }

            }

        }

    }
    public SellerDashboardStatsDTO getSellerStatistics(String email) {

        User seller = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Seller Not Found"));

        List<Product> products =
                productRepository.findBySeller(seller);

        SellerDashboardStatsDTO stats =
                new SellerDashboardStatsDTO();

        stats.setTotalProducts(products.size());

        int live = 0;
        int sold = 0;
        double earnings = 0;

        for (Product product : products) {

            if (product.getStatus() == ProductStatus.AVAILABLE) {

                live++;

            }

            if (product.getStatus() == ProductStatus.SOLD) {

                sold++;

                Bid highestBid =
                        bidRepository.findTopByProductProductIdOrderByBidAmountDesc(
                                product.getProductId());

                if (highestBid != null) {

                    earnings += highestBid.getBidAmount();

                }

            }

        }

        stats.setLiveAuctions(live);
        stats.setSoldProducts(sold);
        stats.setTotalEarnings(earnings);

        return stats;
    }
    public List<SellerSaleDTO> getSellerSales(String email) {

        User seller = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Seller Not Found"));

        List<Product> products =
                productRepository.findBySeller(seller);

        List<SellerSaleDTO> response =
                new ArrayList<>();

        for (Product product : products) {

            if (product.getStatus() == ProductStatus.SOLD) {

                Bid highestBid =
                        bidRepository.findTopByProductProductIdOrderByBidAmountDesc(
                                product.getProductId());

                if (highestBid != null) {

                    SellerSaleDTO dto =
                            new SellerSaleDTO();

                    dto.setProductName(
                            product.getProductName());

                    dto.setBuyerName(
                            highestBid.getBuyer().getName());

                    dto.setWinningBid(
                            highestBid.getBidAmount());

                    dto.setAuctionEnd(
                            product.getAuctionEnd());

                    dto.setStatus(
                            product.getStatus().name());

                    response.add(dto);

                }
            }

        }

        return response;
    }

}