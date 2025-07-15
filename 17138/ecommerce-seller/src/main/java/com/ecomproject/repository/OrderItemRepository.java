package com.ecomproject.repository;

import com.ecomproject.model.Order;
import com.ecomproject.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem,Long> {

}
