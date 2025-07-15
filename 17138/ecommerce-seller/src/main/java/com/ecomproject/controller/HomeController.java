package com.ecomproject.controller;

import com.ecomproject.response.ApiResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping
    public ApiResponse HomeControllerHandler()
    {
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setMessage("Welcome to My Ecommerce Project API");
        return apiResponse ;
    }
}
