package com.ecomproject.controller;

import com.ecomproject.exceptions.ProductException;
import com.ecomproject.model.Cart;
import com.ecomproject.model.CartItem;
import com.ecomproject.model.Product;
import com.ecomproject.model.User;
import com.ecomproject.request.AddItemRequest;
import com.ecomproject.response.ApiResponse;
import com.ecomproject.service.CartItemService;
import com.ecomproject.service.CartService;
import com.ecomproject.service.ProductService;
import com.ecomproject.service.UserService;
import jdk.jshell.spi.ExecutionControl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;
    private final CartItemService cartItemService;
    private final UserService userService;
    private final ProductService productService;


    @GetMapping
    public ResponseEntity<Cart> findUserCartHandler(
            @RequestHeader("Authorization") String jwt) throws Exception{

        User user = userService.findUserByJwtToken(jwt);

        Cart cart = cartService.findCartUser(user);

        return new ResponseEntity<Cart>(cart, HttpStatus.OK);
    }

    @PutMapping("/add")
    public ResponseEntity<CartItem> addItemToCart(
            @RequestBody AddItemRequest req,
            @RequestHeader("Authorization") String jwt) throws
             ProductException, Exception{

        User user = userService.findUserByJwtToken(jwt);
        Product product = productService.findProductById(req.getProductId());

        CartItem item = cartService.addCartItem(user,
                product,
                req.getSize(),
                req.getQuantity());

        ApiResponse response = new ApiResponse();
        response.setMessage("Successfully added item to the cart");

        return new ResponseEntity<>(item, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/item/{cartItemId}")
    public ResponseEntity<ApiResponse> deleteCartItemHandler(
            @PathVariable Long cartItemId,
            @RequestHeader("Authorization") String jwt)
        throws Exception{

        User user = userService.findUserByJwtToken(jwt);
        cartItemService.removeCartItem(user.getId(), cartItemId);

        ApiResponse response = new ApiResponse();
        response.setMessage("Successfully deleted item from the cart");

        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @PutMapping("/item/{cartItemId}")
    public ResponseEntity<CartItem> updateCartItemHandler(
            @PathVariable Long cartItemId,
            @RequestBody CartItem cartItem,
            @RequestHeader("Authorization") String jwt)
        throws Exception{

        User user = userService.findUserByJwtToken(jwt);

        CartItem updatedCartItem = null;

        if(cartItem.getQuantity() > 0){
            updatedCartItem=cartItemService.updateCartItem(user.getId(),
                    cartItemId,cartItem);
        }

        return new ResponseEntity<>(updatedCartItem, HttpStatus.ACCEPTED);

    }

}
