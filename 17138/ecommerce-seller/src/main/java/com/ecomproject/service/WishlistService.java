package com.ecomproject.service;

import com.ecomproject.model.Product;
import com.ecomproject.model.User;
import com.ecomproject.model.Wishlist;

public interface WishlistService {

    Wishlist createWishlist(User user);
    Wishlist getWishlistUserId(User user );
    Wishlist addProductToWishlist(User user, Product product);
}
