var options = {
    "key": "rzp_test_1a2b3c4d5e6f7g", // Your actual Razorpay Key ID
    "amount": "100000", // 100000 paise = ₹1000
    "currency": "INR",
    "name": "Shivam Enterprises",
    "description": "Car Rental Payment",
    "handler": function (response){
        alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
    },
    "prefill": {
        "name": "Shivam Kumar",
        "email": "shivam@example.com",
        "contact": "9876543210"
    },
    "theme": {
        "color": "#3399cc"
    }
};
