package com.example.dealbridge.controller;

import com.example.dealbridge.dto.ProductDTO;
import com.example.dealbridge.entity.Product;
import com.example.dealbridge.service.BidService;
import com.example.dealbridge.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.dealbridge.dto.ProductResponseDTO;
import java.util.List;
import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
import com.example.dealbridge.dto.SellerDashboardStatsDTO;
import com.example.dealbridge.dto.SellerSaleDTO;

import java.nio.file.Path;
import java.nio.file.Paths;
@RestController
@RequestMapping("/api/products")
@CrossOrigin("*")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Autowired
    private BidService bidService;

    @PostMapping(value="/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String addProduct(
            @RequestPart("product") ProductDTO dto,
            @RequestPart("image") MultipartFile image) throws IOException {
        System.out.println("===== ADD PRODUCT API HIT =====");
        return productService.addProduct(dto, image);
    }
    @GetMapping("/image/{fileName}")
    public ResponseEntity<Resource> getImage(
            @PathVariable String fileName) throws Exception {

        Path path = Paths.get(uploadDir).resolve(fileName);

        Resource resource = new UrlResource(path.toUri());

        return ResponseEntity.ok(resource);
    }

    @GetMapping
    public List<ProductResponseDTO> getAllProducts() {

        return productService.getAllProducts();
    }
    @GetMapping("/seller/{email}")
    public List<ProductResponseDTO> getSellerProducts(
            @PathVariable String email) {

        return productService.getSellerProducts(email);

    }

    @GetMapping("/seller-sales/{email}")
    public List<SellerSaleDTO> sellerSales(
            @PathVariable String email) {

        return productService.getSellerSales(email);

    }
    @DeleteMapping("/{id}")
    public String deleteProduct(
            @PathVariable Long id) {

        return productService.deleteProduct(id);

    }
    @GetMapping("/{id}")
    public ProductResponseDTO getProductById(
            @PathVariable Long id) {

        return productService.getProductById(id);

    }

    @PutMapping("/update/{id}")
    public String updateProduct(
            @PathVariable Long id,
            @RequestBody ProductDTO dto) {

        return productService.updateProduct(id, dto);

    }
    @GetMapping("/search")
    public List<ProductResponseDTO> searchProducts(
            @RequestParam String keyword) {

        return productService.searchProducts(keyword);

    }

    @GetMapping("/category")
    public List<ProductResponseDTO> filterCategory(
            @RequestParam String category) {

        return productService.filterCategory(category);

    }
    @GetMapping("/live")
    public List<ProductResponseDTO> liveProducts(){

        return productService.getLiveProducts();

    }
    @GetMapping("/closed")
    public List<ProductResponseDTO> closedProducts(){

        return productService.getClosedProducts();

    }

    @GetMapping("/search-filter")
    public List<ProductResponseDTO> searchFilter(

            @RequestParam String keyword,

            @RequestParam String category) {

        return productService.searchFilter(keyword, category);

    }
    @GetMapping("/seller/statistics/{email}")
    public SellerDashboardStatsDTO getSellerStatistics(
            @PathVariable String email) {

        return productService.getSellerStatistics(email);

    }

}