package com.ecomproject.service;

import com.ecomproject.model.Product;
import com.ecomproject.model.Review;
import com.ecomproject.model.User;
import com.ecomproject.request.CreateReviewRequest;

import java.util.List;

public interface ReviewService {

    Review createReview(CreateReviewRequest req,
                        User user,
                        Product product);

    List<Review> getReviewByProductId(Long productId);

    Review updateReview(Long reviewId,String reviewText,double rating,Long userId) throws Exception;

    void deleteReview(Long reviewId,Long userId) throws Exception;

    Review getReviewById(Long reviewId) throws Exception;
}
