import logo from "./logo.svg";
import search_icon from "./search_icon.svg";
import remove_icon from "./remove_icon.svg";
import arrow_right_icon_colored from "./arrow_right_icon_colored.svg";
import star_icon from "./star_icon.svg";
import star_dull_icon from "./star_dull_icon.svg";
import cart_icon from "./cart_icon.svg";
import nav_cart_icon from "./nav_cart_icon.svg";
import add_icon from "./add_icon.svg";
import refresh_icon from "./refresh_icon.svg";
import product_list_icon from "./product_list_icon.svg";
import order_icon from "./order_icon.svg";
import upload_area from "./upload_area.png";
import profile_icon from "./profile_icon.png";
import menu_icon from "./menu_icon.svg";
import delivery_truck_icon from "./delivery_truck_icon.svg";
import leaf_icon from "./leaf_icon.svg";
import coin_icon from "./coin_icon.svg";
import box_icon from "./box_icon.svg";
import trust_icon from "./trust_icon.svg";
import black_arrow_icon from "./black_arrow_icon.svg";
import white_arrow_icon from "./white_arrow_icon.svg";
import main_banner_bg from "./main_banner_bg.png";
import main_banner_bg_sm from "./main_banner_bg_sm.png";
import bottom_banner_image from "./bottom_banner_image.png";
import bottom_banner_image_sm from "./bottom_banner_image_sm.png";
import add_address_iamge from "./add_address_image.svg";
import organic_vegitable_image from "./organic_vegitable_image.png";
import fresh_fruits_image from "./fresh_fruits_image.png";
import bottles_image from "./bottles_image.png";
import maggi_image from "./maggi_image.png";
import dairy_product_image from "./dairy_product_image.png";
import bakery_image from "./bakery_image.png";
import grain_image from "./grain_image.png";
import potato_image_1 from "./potato_image_1.png";
import potato_image_2 from "./potato_image_2.png";
import potato_image_3 from "./potato_image_3.png";
import potato_image_4 from "./potato_image_4.png";
import tomato_image from "./tomato_image.png";
import carrot_image from "./carrot_image.png";
import apple_image from "./apple_image.png";
import amul_milk_image from "./amul_milk_image.png";
import coca_cola_image from "./coca_cola_image.png";
import brown_bread_image from "./brown_bread_image.png";
import basmati_rice_image from "./basmati_rice_image.png";
import paneer_image from "./paneer_image.png";
import orange_image from "./orange_image.png";
import pepsi_image from "./pepsi_image.png";
import wheat_flour_image from "./wheat_flour_image.png";
import cheese_image from "./cheese_image.png";
import eggs_image from "./eggs_image.png";
import spinach_image_1 from "./spinach_image_1.png";
import onion_image_1 from "./onion_image_1.png";
import banana_image_1 from "./banana_image_1.png";
import mango_image_1 from "./mango_image_1.png";
import grapes_image_1 from "./grapes_image_1.png";
import paneer_image_2 from "./paneer_image_2.png";
import sprite_image_1 from "./sprite_image_1.png";
import fanta_image_1 from "./fanta_image_1.png";
import seven_up_image_1 from "./seven_up_image_1.png";
import top_ramen_image from "./top_ramen_image.png";
import knorr_soup_image from "./knorr_soup_image.png";
import yippee_image from "./yippee_image.png";
import maggi_oats_image from "./maggi_oats_image.png";
import butter_croissant_image from "./butter_croissant_image.png";
import chocolate_cake_image from "./chocolate_cake_image.png";
import whole_wheat_bread_image from "./whole_wheat_bread_image.png";
import vanilla_muffins_image from "./vanilla_muffins_image.png";
import quinoa_image from "./quinoa_image.png";
import brown_rice_image from "./brown_rice_image.png";
import barley_image from "./barley_image.png";

export const assets = {
  logo,
  search_icon,
  remove_icon,
  arrow_right_icon_colored,
  star_icon,
  star_dull_icon,
  cart_icon,
  nav_cart_icon,
  add_icon,
  refresh_icon,
  product_list_icon,
  order_icon,
  upload_area,
  profile_icon,
  menu_icon,
  delivery_truck_icon,
  leaf_icon,
  coin_icon,
  trust_icon,
  black_arrow_icon,
  white_arrow_icon,
  main_banner_bg,
  main_banner_bg_sm,
  bottom_banner_image,
  bottom_banner_image_sm,
  add_address_iamge,
  box_icon,
};

export const categories = [
  {
    text: "Organic veggies",
    path: "Vegetables",
    image: organic_vegitable_image,
    bgColor: "#FEF6DA",
  },
  {
    text: "Fresh Fruits",
    path: "Fruits",
    image: fresh_fruits_image,
    bgColor: "#FEE0E0",
  },
  {
    text: "Cold Drinks",
    path: "Drinks",
    image: bottles_image,
    bgColor: "#F0F5DE",
  },
  {
    text: "Instant Food",
    path: "Instant",
    image: maggi_image,
    bgColor: "#E1F5EC",
  },
  {
    text: "Dairy Products",
    path: "Dairy",
    image: dairy_product_image,
    bgColor: "#FEE6CD",
  },
  {
    text: "Bakery & Breads",
    path: "Bakery",
    image: bakery_image,
    bgColor: "#E0F6FE",
  },
  {
    text: "Grains & Cereals",
    path: "Grains",
    image: grain_image,
    bgColor: "#F1E3F9",
  },
];

export const footerLinks = [
  {
    title: "Quick Links",
    links: [
      { text: "Home", url: "#" },
      { text: "Best Sellers", url: "#" },
      { text: "Offers & Deals", url: "#" },
      { text: "Contact Us", url: "#" },
      { text: "FAQs", url: "#" },
    ],
  },
  {
    title: "Need help?",
    links: [
      { text: "Delivery Information", url: "#" },
      { text: "Return & Refund Policy", url: "#" },
      { text: "Payment Methods", url: "#" },
      { text: "Track your Order", url: "#" },
      { text: "Contact Us", url: "#" },
    ],
  },
  {
    title: "Follow Us",
    links: [
      { text: "Instagram", url: "#" },
      { text: "Twitter", url: "#" },
      { text: "Facebook", url: "#" },
      { text: "YouTube", url: "#" },
    ],
  },
];

export const features = [
  {
    icon: delivery_truck_icon,
    title: "Fastest Delivery",
    description: "Groceries delivered in under 30 minutes.",
  },
  {
    icon: leaf_icon,
    title: "Freshness Guaranteed",
    description: "Fresh produce straight from the source.",
  },
  {
    icon: coin_icon,
    title: "Affordable Prices",
    description: "Quality groceries at unbeatable prices.",
  },
  {
    icon: trust_icon,
    title: "Trusted by Thousands",
    description: "Loved by 10,000+ happy customers.",
  },
];

export const dummyProducts = [
  // Vegetables
  {
    _id: "gd46g23h",
    name: "Potato 500g",
    category: "Vegetables",
    price: 25,
    offerPrice: 20,
    image: [potato_image_1, potato_image_2, potato_image_3, potato_image_4],
    description: [
      "Fresh and organic",
      "Rich in carbohydrates",
      "Ideal for curries and fries",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
  {
    _id: "gd47g34h",
    name: "Tomato 1 kg",
    category: "Vegetables",
    price: 40,
    offerPrice: 35,
    image: [tomato_image],
    description: [
      "Juicy and ripe",
      "Rich in Vitamin C",
      "Perfect for salads and sauces",
      "Farm fresh quality",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
  {
    _id: "gd48g45h",
    name: "Carrot 500g",
    category: "Vegetables",
    price: 30,
    offerPrice: 28,
    image: [carrot_image],
    description: [
      "Sweet and crunchy",
      "Good for eyesight",
      "Ideal for juices and salads",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
  {
    _id: "gd49g56h",
    name: "Spinach 500g",
    category: "Vegetables",
    price: 18,
    offerPrice: 15,
    image: [spinach_image_1],
    description: [
      "Rich in iron",
      "High in vitamins",
      "Perfect for soups and salads",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
  {
    _id: "gd50g67h",
    name: "Onion 500g",
    category: "Vegetables",
    price: 22,
    offerPrice: 19,
    image: [onion_image_1],
    description: [
      "Fresh and pungent",
      "Perfect for cooking",
      "A kitchen staple",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },

  // Fruits
  {
    _id: "ek51j12k",
    name: "Apple 1 kg",
    category: "Fruits",
    price: 120,
    offerPrice: 110,
    image: [apple_image],
    description: [
      "Crisp and juicy",
      "Rich in fiber",
      "Boosts immunity",
      "Perfect for snacking and desserts",
      "Organic and farm fresh",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
  {
    _id: "ek52j23k",
    name: "Orange 1 kg",
    category: "Fruits",
    price: 80,
    offerPrice: 75,
    image: [orange_image],
    description: [
      "Juicy and sweet",
      "Rich in Vitamin C",
      "Perfect for juices and salads",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
  {
    _id: "ek53j34k",
    name: "Banana 1 kg",
    category: "Fruits",
    price: 50,
    offerPrice: 45,
    image: [banana_image_1],
    description: [
      "Sweet and ripe",
      "High in potassium",
      "Great for smoothies and snacking",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
  {
    _id: "ek54j45k",
    name: "Mango 1 kg",
    category: "Fruits",

    price: 150,
    offerPrice: 140,
    image: [mango_image_1],
    description: [
      "Sweet and flavorful",
      "Perfect for smoothies and desserts",
      "Rich in Vitamin A",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
  {
    _id: "ek55j56k",
    name: "Grapes 500g",
    category: "Fruits",
    price: 70,
    offerPrice: 65,
    image: [grapes_image_1],
    description: [
      "Fresh and juicy",
      "Rich in antioxidants",
      "Perfect for snacking and fruit salads",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },

  // Dairy
  {
    _id: "ek56j67k",
    name: "Amul Milk 1L",
    category: "Dairy",
    price: 60,
    offerPrice: 55,
    image: [amul_milk_image],
    description: [
      "Pure and fresh",
      "Rich in calcium",
      "Ideal for tea, coffee, and desserts",
      "Trusted brand quality",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
  {
    _id: "ek57j78k",
    name: "Paneer 200g",
    category: "Dairy",
    price: 90,
    offerPrice: 85,
    image: [paneer_image],
    description: [
      "Soft and fresh",
      "Rich in protein",
      "Ideal for curries and snacks",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
  {
    _id: "ek58j89k",
    name: "Eggs 12 pcs",
    category: "Dairy",
    price: 90,
    offerPrice: 85,
    image: [eggs_image],
    description: [
      "Farm fresh",
      "Rich in protein",
      "Ideal for breakfast and baking",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
  {
    _id: "ek59j90k",
    name: "Paneer 200g",
    category: "Dairy",
    price: 90,
    offerPrice: 85,
    image: [paneer_image_2],
    description: [
      "Soft and fresh",
      "Rich in protein",
      "Ideal for curries and snacks",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
  {
    _id: "ek60j01k",
    name: "Cheese 200g",
    category: "Dairy",
    price: 140,
    offerPrice: 130,
    image: [cheese_image],
    description: [
      "Creamy and delicious",
      "Perfect for pizzas and sandwiches",
      "Rich in calcium",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },

  // Drinks
  {
    _id: "ek61j12k",
    name: "Coca-Cola 1.5L",
    category: "Drinks",
    price: 80,
    offerPrice: 75,
    image: [coca_cola_image],
    description: [
      "Refreshing and fizzy",
      "Perfect for parties and gatherings",
      "Best served chilled",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
  {
    _id: "ek62j23k",
    name: "Pepsi 1.5L",
    category: "Drinks",
    price: 78,
    offerPrice: 73,
    image: [pepsi_image],
    description: [
      "Chilled and refreshing",
      "Perfect for celebrations",
      "Best served cold",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
  {
    _id: "ek63j34k",
    name: "Sprite 1.5L",
    category: "Drinks",
    price: 79,
    offerPrice: 74,
    image: [sprite_image_1],
    description: [
      "Refreshing citrus taste",
      "Perfect for hot days",
      "Best served chilled",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
  {
    _id: "ek64j45k",
    name: "Fanta 1.5L",
    category: "Drinks",
    price: 77,
    offerPrice: 72,
    image: [fanta_image_1],
    description: [
      "Sweet and fizzy",
      "Great for parties and gatherings",
      "Best served cold",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
  {
    _id: "ek65j56k",
    name: "7 Up 1.5L",
    category: "Drinks",
    price: 76,
    offerPrice: 71,
    image: [seven_up_image_1],
    description: [
      "Refreshing lemon-lime flavor",
      "Perfect for refreshing",
      "Best served chilled",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },

  // Grains
  {
    _id: "ek66j67k",
    name: "Basmati Rice 5kg",
    category: "Grains",
    price: 550,
    offerPrice: 520,
    image: [basmati_rice_image],
    description: [
      "Long grain and aromatic",
      "Perfect for biryani and pulao",
      "Premium quality",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
  {
    _id: "ek67j78k",
    name: "Wheat Flour 5kg",
    category: "Grains",
    price: 250,
    offerPrice: 230,
    image: [wheat_flour_image],
    description: [
      "High-quality whole wheat",
      "Soft and fluffy rotis",
      "Rich in nutrients",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
  {
    _id: "ek68j89k",
    name: "Organic Quinoa 500g",
    category: "Grains",
    price: 450,
    offerPrice: 420,
    image: [quinoa_image],
    description: [
      "High in protein and fiber",
      "Gluten-free",
      "Rich in vitamins and minerals",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
  {
    _id: "ek69j90k",
    name: "Brown Rice 1kg",
    category: "Grains",
    price: 120,
    offerPrice: 110,
    image: [brown_rice_image],
    description: [
      "Whole grain and nutritious",
      "Helps in weight management",
      "Good source of magnesium",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
  {
    _id: "ek70j01k",
    name: "Barley 1kg",
    category: "Grains",
    price: 150,
    offerPrice: 140,
    image: [barley_image],
    description: [
      "Rich in fiber",
      "Helps improve digestion",
      "Low in fat and cholesterol",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },

  // Bakery
  {
    _id: "bk01a24z",
    name: "Brown Bread 400g",
    category: "Bakery",
    price: 40,
    offerPrice: 35,
    image: [brown_bread_image],
    description: [
      "Soft and healthy",
      "Made from whole wheat",
      "Ideal for breakfast and sandwiches",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
  {
    _id: "bk02b30y",
    name: "Butter Croissant 100g",
    category: "Bakery",
    price: 50,
    offerPrice: 45,
    image: [butter_croissant_image],
    description: [
      "Flaky and buttery",
      "Freshly baked",
      "Perfect for breakfast or snacks",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
  {
    _id: "bk03c31x",
    name: "Chocolate Cake 500g",
    category: "Bakery",
    price: 350,
    offerPrice: 325,
    image: [chocolate_cake_image],
    description: [
      "Rich and moist",
      "Made with premium cocoa",
      "Ideal for celebrations and parties",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
  {
    _id: "bk04d32w",
    name: "Whole Bread 400g",
    category: "Bakery",
    price: 45,
    offerPrice: 40,
    image: [whole_wheat_bread_image],
    description: [
      "Healthy and nutritious",
      "Made with whole wheat flour",
      "Ideal for sandwiches and toast",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
  {
    _id: "bk05e33v",
    name: "Vanilla Muffins 6 pcs",
    category: "Bakery",
    price: 100,
    offerPrice: 90,
    image: [vanilla_muffins_image],
    description: [
      "Soft and fluffy",
      "Perfect for a quick snack",
      "Made with real vanilla",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },

  // Instant
  {
    _id: "in01f25u",
    name: "Maggi Noodles 280g",
    category: "Instant",

    price: 55,
    offerPrice: 50,
    image: [maggi_image],
    description: [
      "Instant and easy to cook",
      "Delicious taste",
      "Popular among kids and adults",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
  {
    _id: "in02g26t",
    name: "Top Ramen 270g",
    category: "Instant",
    price: 45,
    offerPrice: 40,
    image: [top_ramen_image],
    description: [
      "Quick and easy to prepare",
      "Spicy and flavorful",
      "Loved by college students and families",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
  {
    _id: "in03h27s",
    name: "Knorr Cup Soup 70g",
    category: "Instant",
    price: 35,
    offerPrice: 30,
    image: [knorr_soup_image],
    description: [
      "Convenient for on-the-go",
      "Healthy and nutritious",
      "Variety of flavors",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
  {
    _id: "in04i28r",
    name: "Yippee Noodles 260g",
    category: "Instant",
    price: 50,
    offerPrice: 45,
    image: [yippee_image],
    description: [
      "Non-fried noodles for healthier choice",
      "Tasty and filling",
      "Convenient for busy schedules",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
  {
    _id: "in05j29q",
    name: "Oats Noodles 72g",
    category: "Instant",
    price: 40,
    offerPrice: 35,
    image: [maggi_oats_image],
    description: [
      "Healthy alternative with oats",
      "Good for digestion",
      "Perfect for breakfast or snacks",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
];

export const dummyAddress = [
  {
    _id: "67b5b9e54ea97f71bbc196a0",
    userId: "67b5880e4d09769c5ca61644",
    firstName: "Great",
    lastName: "Stack",
    email: "user.greatstack@gmail.com",
    street: "Street 123",
    city: "Main City",
    state: "New State",
    zipcode: 123456,
    country: "IN",
    phone: "1234567890",
  },
];

export const dummyOrders = [
  {
    _id: "67e2589a8f87e63366786400",
    userId: "67b5880e4d09769c5ca61644",
    items: [
      {
        product: dummyProducts[3],
        quantity: 2,
        _id: "67e2589a8f87e63366786401",
      },
    ],
    amount: 89,
    address: dummyAddress[0],
    status: "Order Placed",
    paymentType: "Online",
    isPaid: true,
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
  },
  {
    _id: "67e258798f87e633667863f2",
    userId: "67b5880e4d09769c5ca61644",
    items: [
      {
        product: dummyProducts[0],
        quantity: 1,
        _id: "67e258798f87e633667863f3",
      },
      {
        product: dummyProducts[1],
        quantity: 1,
        _id: "67e258798f87e633667863f4",
      },
    ],
    amount: 43,
    address: dummyAddress[0],
    status: "Order Placed",
    paymentType: "COD",
    isPaid: false,
    createdAt: "2025-03-25T07:17:13.068Z",
    updatedAt: "2025-03-25T07:17:13.068Z",
  },
];
