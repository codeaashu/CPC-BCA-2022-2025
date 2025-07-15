package com.ecomproject.service.impl;

import com.ecomproject.domain.PaymentOrderStatus;
import com.ecomproject.domain.PaymentStatus;
import com.ecomproject.model.Order;
import com.ecomproject.model.PaymentOrder;
import com.ecomproject.model.User;
import com.ecomproject.repository.OrderRepository;
import com.ecomproject.repository.PaymentOrderRepository;
import com.ecomproject.service.PaymentService;
import com.razorpay.Payment;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private PaymentOrderRepository paymentOrderRepository;
    private OrderRepository orderRepository;
    private String apiKey="apiKey";
    private String apiSecret="apiSecret";
    private String stripeSecretKey="stripeSecretKey";

    @Override
    public PaymentOrder createOrder(User user, Set<Order> orders) {
        Long amount = orders.stream().mapToLong(Order::getTotalSellingPrice).sum();

        PaymentOrder paymentOrder = new PaymentOrder();
        paymentOrder.setAmount(amount);
        paymentOrder.setUser(user);
        paymentOrder.setOrders(orders);
        return paymentOrderRepository.save(paymentOrder);
    }

    @Override
    public PaymentOrder getPaymentOrderById(Long orderId) throws Exception {

        return paymentOrderRepository.findById(orderId).orElseThrow(() ->
                new Exception("Payment Order not found"));
    }

    @Override
    public PaymentOrder getPaymentOrderByPaymentId(String orderId) throws Exception {

        PaymentOrder paymentOrder = paymentOrderRepository.findByPaymentLinkId(orderId);

        if(paymentOrder == null) {
            throw new Exception("Payment Order Not Found with provided payment link Id...!!!");
        }
        return paymentOrder;
    }

    @Override
    public Boolean ProceedPaymentOrder(PaymentOrder paymentOrder,
                                       String paymentId,
                                       String paymentLinkId) throws RazorpayException {

        if(paymentOrder.getStatus().equals(PaymentOrderStatus.PENDING)){
            RazorpayClient razorPay = new RazorpayClient(apiKey,apiSecret);

            Payment payment = razorPay.payments.fetch(paymentId);
            String status= payment.get("status");
            if (status.equals("captured")){
                Set<Order> orders = paymentOrder.getOrders();
                for (Order order : orders) {
                    order.setPaymentStatus(PaymentStatus.COMPLETED);
                    orderRepository.save(order);
                }
                paymentOrder.setStatus(PaymentOrderStatus.SUCCESS);
                paymentOrderRepository.save(paymentOrder);
                return true;
            }
            paymentOrder.setStatus(PaymentOrderStatus.FAILED);
            paymentOrderRepository.save(paymentOrder);
            return false;
        }

        return false;
    }

    @Override
    public PaymentLink createRazorpayPaymentLink(User user,
                                                 Long amount,
                                                 Long orderId) throws RazorpayException {

        amount = amount * 100;

        try {
            RazorpayClient razorPay = new RazorpayClient(apiKey,apiSecret);

            JSONObject paymentLinkRequest = new JSONObject();

            paymentLinkRequest.put("amount", amount);
            paymentLinkRequest.put("currency", "INR" );

            JSONObject customer = new JSONObject();
            customer.put("Name", user.getFullName());
            customer.put("Email", user.getEmail());
            paymentLinkRequest.put("customer", customer );

            JSONObject notification = new JSONObject();
            notification.put("email", true );
            paymentLinkRequest.put("notification", notification);

            paymentLinkRequest.put("callback_url",
                    "https://localhost:5454/payment-success"+orderId);
            paymentLinkRequest.put("callback_method", "get");

            PaymentLink paymentLink = razorPay.paymentLink.create(paymentLinkRequest);

            String paymentLinkUrl= paymentLink.get("short_url");
            String paymentLinkId= paymentLink.get("id");

            return paymentLink;
        }
        catch (Exception e){

            System.out.println(e.getMessage());
            throw new RazorpayException(e.getMessage());
        }

    }

    @Override
    public String createStripePaymentLink(User user,
                                          Long amount,
                                          Long orderId) throws StripeException {

        Stripe.apiKey=stripeSecretKey;

        SessionCreateParams params = SessionCreateParams.builder()
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("https://localhost:5454/payment-success"+orderId)
                .setCancelUrl("https://localhost:5454/payment-cancel")
                .addLineItem(SessionCreateParams.LineItem.builder()
                        .setQuantity(1L)
                        .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                .setCurrency("usd")
                                .setUnitAmount(amount*100)
                                .setProductData(
                                        SessionCreateParams
                                                .LineItem.PriceData.ProductData
                                                .builder().setName("Shubh Ecom Seller PAyment")
                                                .build()
                                ).build()
                        ).build()
                ).build();

        Session session = com.stripe.model.checkout.Session.create(params);

        return session.getUrl();
    }
}
