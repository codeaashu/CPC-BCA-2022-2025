package com.ecomproject.controller;

import com.ecomproject.exceptions.ProductException;
import com.ecomproject.model.Product;
import com.ecomproject.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;

    @GetMapping("{productId}")
    public ResponseEntity<Product> getProductById(
            @PathVariable long productId)
    throws ProductException
    {
        Product product = productService.findProductById(productId);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProduct(
            @RequestParam(required = false) String query) {
        List<Product> products = productService.searchProduct(query);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Page<Product>> getAllProducts(
           @RequestParam(required = false) String category,
           @RequestParam(required = false) String brand,
           @RequestParam(required = false) String color,
           @RequestParam(required = false) String size,
           @RequestParam(required = false) Integer minPrice,
           @RequestParam(required = false) Integer maxPrice,
           @RequestParam(required = false) Integer minDiscount,
           @RequestParam(required = false) String sort,
           @RequestParam(required = false) String stock,
           @RequestParam(defaultValue = "0") Integer pageNumber) {

        return new ResponseEntity<>(
                productService.getAllProducts(category,brand,
                        color,size,minPrice,
                        maxPrice,minDiscount,sort,
                        stock,pageNumber), HttpStatus.OK);
    }
}
