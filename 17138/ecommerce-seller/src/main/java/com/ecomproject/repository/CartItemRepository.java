package com.ecomproject.repository;

import com.ecomproject.model.Cart;
import com.ecomproject.model.CartItem;
import com.ecomproject.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    CartItem findByCartAndProductAndSize(Cart cart, Product product, String size);
}
