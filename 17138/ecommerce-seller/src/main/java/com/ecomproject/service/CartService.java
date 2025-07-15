package com.ecomproject.service;

import com.ecomproject.model.Cart;
import com.ecomproject.model.CartItem;
import com.ecomproject.model.Product;
import com.ecomproject.model.User;

public interface CartService {

    public CartItem addCartItem(
            User user,
            Product product,
            String size,
            int quantity
    );

    public Cart findCartUser(User user);
}
