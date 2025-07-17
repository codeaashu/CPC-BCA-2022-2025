-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 30, 2024 at 01:29 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `onlineshop`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_info`
--

CREATE TABLE `admin_info` (
  `admin_id` int(10) NOT NULL,
  `admin_name` varchar(100) NOT NULL,
  `admin_email` varchar(300) NOT NULL,
  `admin_password` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `admin_info`
--

INSERT INTO `admin_info` (`admin_id`, `admin_name`, `admin_email`, `admin_password`) VALUES
(1, 'admin', 'admin@gmail.com', '25f9e794323b453885f5181f1b624d0b');

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE `brands` (
  `brand_id` int(100) NOT NULL,
  `brand_title` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `brands`
--

INSERT INTO `brands` (`brand_id`, `brand_title`) VALUES
(1, 'HP'),
(2, 'Samsung'),
(3, 'Apple'),
(4, 'LG'),
(5, 'Cloth Brand'),
(6, 'Bic'),
(7, 'Nike'),
(8, 'foods');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(10) NOT NULL,
  `p_id` int(10) NOT NULL,
  `ip_add` varchar(250) NOT NULL,
  `user_id` int(10) DEFAULT NULL,
  `qty` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `p_id`, `ip_add`, `user_id`, `qty`) VALUES
(272, 72, '::1', 12, 1),
(281, 1, '::1', 12, 1),
(282, 8, '::1', 12, 3),
(289, 0, '127.0.0.1', 28, 1),
(296, 12, '127.0.0.1', 1, 1),
(297, 11, '127.0.0.1', 1, 1),
(298, 15, '127.0.0.1', 1, 1),
(299, 4, '127.0.0.1', 1, 1),
(309, 6, '127.0.0.1', 26, 0),
(315, 9, '::1', 31, 5),
(321, 19, '::1', 31, 4),
(322, 7, '::1', 31, 5),
(323, 5, '::1', 31, 3);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `cat_id` int(100) NOT NULL,
  `cat_title` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`cat_id`, `cat_title`) VALUES
(1, 'Electronics'),
(2, 'Ladies Wears'),
(3, 'Mens Wear'),
(4, 'Furnitures'),
(5, 'Home Appliances'),
(6, 'Electronics Gadgets'),
(7, 'Stationery'),
(8, 'Food Stuff');

-- --------------------------------------------------------

--
-- Table structure for table `email_info`
--

CREATE TABLE `email_info` (
  `email_id` int(100) NOT NULL,
  `email` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `email_info`
--

INSERT INTO `email_info` (`email_id`, `email`) VALUES
(3, 'admin@gmail.com'),
(4, 'puneethreddy951@gmail.com'),
(5, 'supportreddy@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `logs`
--

CREATE TABLE `logs` (
  `id` int(11) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `action` varchar(50) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `trx_id` varchar(255) NOT NULL,
  `p_status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `product_id`, `qty`, `trx_id`, `p_status`) VALUES
(1, 12, 7, 1, '07M47684BS5725041', 'Completed'),
(2, 14, 2, 1, '07M47684BS5725041', 'Completed');

-- --------------------------------------------------------

--
-- Table structure for table `orders_info`
--

CREATE TABLE `orders_info` (
  `order_id` int(10) NOT NULL,
  `user_id` int(11) NOT NULL,
  `f_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `zip` int(10) NOT NULL,
  `cardname` varchar(255) NOT NULL,
  `cardnumber` varchar(20) NOT NULL,
  `expdate` varchar(255) NOT NULL,
  `prod_count` int(15) DEFAULT NULL,
  `total_amt` int(15) DEFAULT NULL,
  `cvv` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `orders_info`
--

INSERT INTO `orders_info` (`order_id`, `user_id`, `f_name`, `email`, `address`, `city`, `state`, `zip`, `cardname`, `cardnumber`, `expdate`, `prod_count`, `total_amt`, `cvv`) VALUES
(5, 26, 'Natalie Mwaka', 'nataliemwaka497@gmail.com', '635', 'Voi', 'Taveta', 784, 'master card', '7894587496587421', '12/22', 3, 31900, 879),
(6, 26, 'Natalie Mwaka', 'nataliemwaka497@gmail.com', '635', 'Voi', 'Taveta', 458, 'master card', '5458 7854 2154 9865', '12/34', 2, 90000, 458),
(7, 27, 'Ira Judith', 'irajudith22@gmail.com', '635', 'Voi', 'Kenya', 245, 'VISA', '3456 764256 78467', '12/29', 1, 1500, 345),
(8, 28, 'Serita Muyaza', 'smmwangovya@gmail.com', 'Voi', 'Voi', 'Kenya', 256, 'VISA', '5634 2568 9032 4789', '12/30', 1, 1500, 421),
(9, 29, 'Susan  Wairimu', 'susangachoka@gmail.com', '635', 'Voi', 'Kenya', 345, 'VISA', '2467235286414425', '12/34', 2, 36500, 425),
(10, 27, 'Ira Judith', 'irajudith22@gmail.com', '635', 'Voi', 'Kenya', 803000, 'Visa', '1784567648753678', '12/30', 2, 41200, 234);

-- --------------------------------------------------------

--
-- Table structure for table `order_products`
--

CREATE TABLE `order_products` (
  `order_pro_id` int(10) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `qty` int(15) DEFAULT NULL,
  `amt` int(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `order_products`
--

INSERT INTO `order_products` (`order_pro_id`, `order_id`, `product_id`, `qty`, `amt`) VALUES
(73, 1, 1, 1, 5000),
(74, 1, 4, 2, 64000),
(75, 1, 8, 1, 40000),
(76, 5, 23, 1, 1900),
(77, 5, 1, 1, 5000),
(78, 5, 2, 1, 25000),
(79, 6, 8, 1, 40000),
(80, 6, 7, 1, 50000),
(81, 7, 15, 1, 1500),
(82, 8, 12, 1, 1500),
(83, 9, 15, 1, 1500),
(84, 9, 6, 1, 35000),
(85, 10, 13, 1, 1200),
(86, 10, 8, 1, 40000);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(100) NOT NULL,
  `product_cat` int(100) NOT NULL,
  `product_brand` int(100) NOT NULL,
  `product_title` varchar(255) NOT NULL,
  `product_price` int(100) NOT NULL,
  `product_desc` text NOT NULL,
  `product_image` text NOT NULL,
  `product_keywords` text NOT NULL,
  `product_quantity` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `product_cat`, `product_brand`, `product_title`, `product_price`, `product_desc`, `product_image`, `product_keywords`, `product_quantity`) VALUES
(5, 1, 2, 'iPad 2', 10000, 'samsung ipad', 'iPad-air.png', 'ipad tablet samsung', 2),
(6, 1, 1, 'samsung Laptop r series', 35000, 'samsung Black combination Laptop', 'laptop_PNG5939.png', 'samsung laptop ', 15),
(7, 1, 1, 'Laptop Pavillion', 50000, 'Laptop Hp Pavillion', 'laptop_PNG5930.png', 'Laptop Hp Pavillion', 44),
(8, 1, 5, 'Sony', 40000, 'Sony Mobile', '530201353846AM_635_sony_xperia_z.png', 'sony mobile', 12),
(9, 1, 3, 'iPhone New', 12000, 'iphone', 'iphone-hd-png-iphone-apple-png-file-550.png', 'iphone apple mobile', 9),
(11, 2, 5, 'Blue Heave dress', 1200, 'Blue dress', 'images.jpg', 'blue dress cloths', 5),
(12, 2, 5, 'Ladies Casual Cloths', 1500, 'ladies casual summer two colors pleted', '7475-ladies-casual-dresses-summer-two-colors-pleated.jpg', 'girl dress cloths casual', 9),
(13, 2, 5, 'SpringAutumnDress', 1200, 'girls dress', 'Spring-Autumn-Winter-Young-Ladies-Casual-Wool-Dress-Women-s-One-Piece-Dresse-Dating-Clothes-Medium.jpg_640x640.jpg', 'girl dress', 5),
(14, 2, 5, 'Casual Dress', 1400, 'girl dress', 'download.jpg', 'ladies cloths girl', 10),
(15, 2, 5, 'Formal Look', 1500, 'girl dress', 'shutterstock_203611819.jpg', 'ladies wears dress girl', 29),
(16, 3, 5, 'Sweter for men', 600, '2012-Winter-Sweater-for-Men-for-better-outlook', '2012-Winter-Sweater-for-Men-for-better-outlook.jpg', 'black sweter cloth winter', 15),
(17, 3, 5, 'Gents formal', 1000, 'gents formal look', 'gents-formal-250x250.jpg', 'gents wear cloths', 20),
(19, 3, 5, 'Formal Coat', 3000, 'ad', 'images (1).jpg', 'coat blazer gents', 11),
(20, 3, 5, 'Mens Sweeter', 1600, 'jg', 'Winter-fashion-men-burst-sweater.png', 'sweeter gents ', 20),
(21, 3, 5, 'T shirt', 800, 'ssds', 'IN-Mens-Apparel-Voodoo-Tiles-09._V333872612_.jpg', 'formal t shirt black', 5),
(22, 5, 5, 'Yellow T shirt ', 1300, 'yello t shirt with pant', '1.0x0.jpg', 'kids yellow t shirt', 19),
(23, 5, 5, 'Girls cloths', 1900, 'sadsf', 'GirlsClothing_Widgets.jpg', 'formal kids wear dress', 6),
(24, 5, 5, 'Blue T shirt', 700, 'g', 'images.jpg', 'kids dress', 3),
(25, 5, 5, 'Yellow girls dress', 750, 'as', 'images (3).jpg', 'yellow kids dress', 20),
(27, 5, 5, 'Formal look', 690, 'sd', 'image28.jpg', 'formal kids dress', 10),
(32, 4, 0, 'Book Shelf', 2500, 'book shelf', 'furniture-book-shelf-250x250.jpg', 'book shelf furniture', 12),
(33, 6, 2, 'Refrigerator', 35000, 'Refrigerator', 'CT_WM_BTS-BTC-AppliancesHome_20150723.jpg', 'refrigerator samsung', 3),
(34, 6, 6, 'Emergency Light', 1000, 'Emergency Light', 'emergency light.JPG', 'emergency light', 23),
(35, 6, 0, 'Vaccum Cleaner', 6000, 'Vaccum Cleaner', 'images (2).jpg', 'Vaccum Cleaner', 4),
(36, 6, 5, 'Iron', 1500, 'gj', 'iron.JPG', 'iron', 20),
(37, 6, 4, 'LED TV', 20000, 'LED TV', 'images (4).jpg', 'led tv lg', 15),
(38, 6, 5, 'Microwave Oven', 3500, 'Microwave Oven', 'images.jpg', 'Microwave Oven', 25),
(39, 6, 5, 'Mixer Grinder', 2500, 'Mixer Grinder', 'singer-mixer-grinder-mg-46-medium_4bfa018096c25dec7ba0af40662856ef.jpg', 'Mixer Grinder', 21),
(47, 5, 4, 'Laptop', 650, 'nbk', 'product01.png', 'Dell Laptop', 15),
(48, 1, 5, 'Headphones', 250, 'Headphones', 'product05.png', 'Headphones Sony', 18),
(50, 3, 5, 'boys shirts', 350, 'shirts', 'pm1.JPG', 'suit boys shirts', 30),
(51, 3, 5, 'boys shirts', 270, 'shirts', 'pm2.JPG', 'suit boys shirts', 15),
(52, 3, 5, 'boys shirts', 453, 'shirts', 'pm3.JPG', 'suit boys shirts', 25),
(53, 3, 5, 'boys shirts', 220, 'shirts', 'ms1.JPG', 'suit boys shirts', 32),
(54, 3, 5, 'boys shirts', 290, 'shirts', 'ms2.JPG', 'suit boys shirts', 21),
(55, 3, 5, 'boys shirts', 259, 'shirts', 'ms3.JPG', 'suit boys shirts', 14),
(57, 3, 5, 'boys shirts', 260, 'shirts', 'i3.JPG', 'suit boys shirts', 29),
(58, 3, 5, 'boys shirts', 350, 'shirts', 'pm9.JPG', 'suit boys shirts', 10),
(59, 3, 5, 'boys shirts', 855, 'shirts', 'a2.JPG', 'suit boys shirts', 15),
(60, 3, 5, 'boys shirts', 150, 'shirts', 'pm11.JPG', 'suit boys shirts', 18),
(61, 3, 5, 'boys shirts', 215, 'shirts', 'pm12.JPG', 'suit boys shirts', 22),
(62, 3, 5, 'boys shirts', 299, 'shirts', 'pm13.JPG', 'suit boys shirts', 40),
(63, 3, 5, 'boys Jeans Pant', 550, 'Pants', 'pt1.JPG', 'boys Jeans Pant', 35),
(64, 3, 5, 'boys Jeans Pant', 460, 'pants', 'pt2.JPG', 'boys Jeans Pant', 30),
(65, 3, 5, 'boys Jeans Pant', 470, 'pants', 'pt3.JPG', 'boys Jeans Pant', 12),
(66, 3, 5, 'boys Jeans Pant', 480, 'pants', 'pt4.JPG', 'boys Jeans Pant', 31),
(67, 3, 5, 'boys Jeans Pant', 360, 'pants', 'pt5.JPG', 'boys Jeans Pant', 24),
(68, 3, 5, 'boys Jeans Pant', 550, 'pants', 'pt6.JPG', 'boys Jeans Pant', 19),
(69, 3, 5, 'boys Jeans Pant', 390, 'pants', 'pt7.JPG', 'boys Jeans Pant', 16),
(70, 3, 5, 'boys Jeans Pant', 399, 'pants', 'pt8.JPG', 'boys Jeans Pant', 14),
(71, 1, 2, 'Samsung galaxy s7', 5000, 'Samsung galaxy s7', 'product07.png', 'samsung mobile electronics', 23),
(72, 6, 2, 'sony Headphones', 3500, 'sony Headphones', 'product02.png', 'sony Headphones electronics gadgets', 18),
(73, 6, 2, 'samsung Headphones', 3500, 'samsung Headphones', 'product05.png', 'samsung Headphones electronics gadgets', 36),
(74, 1, 1, 'HP i5 laptop', 5500, 'HP i5 laptop', 'product01.png', 'HP i5 laptop electronics', 39),
(75, 1, 1, 'HP i7 laptop 8gb ram', 5500, 'HP i7 laptop 8gb ram', 'product03.png', 'HP i7 laptop 8gb ram electronics', 17),
(76, 1, 5, 'sony note 6gb ram', 4500, 'sony note 6gb ram', 'product04.png', 'sony note 6gb ram mobile electronics', 42),
(77, 1, 4, 'MSV laptop 16gb ram NVIDEA Graphics', 5499, 'MSV laptop 16gb ram', 'product06.png', 'MSV laptop 16gb ram NVIDEA Graphics electronics', 15),
(78, 1, 4, 'dell laptop 8gb ram intel integerated Graphics', 4579, 'dell laptop 8gb ram intel integerated Graphics', 'product08.png', 'dell laptop 8gb ram intel integerated Graphics electronics', 25),
(79, 6, 2, 'camera with 3D pixels', 2569, 'camera with 3D pixels', 'product09.png', 'camera with 3D pixels camera electronics gadgets', 29),
(81, 5, 5, 'Kids blue dress', 300, 'blue dress', '1543993724_pg4.jpg', 'kids blue dress', 17),
(82, 7, 6, 'pencil', 35, 'a good product', '1711801450_penc.jpg', 'pencil', 32),
(83, 7, 6, 'pencil', 399, 'a good product', '1711801430_pencil.png', 'pencil', 21),
(84, 3, 5, 'shirt', 36885, 'a good quality', '1711795106_men1.png', 'shirt', 20),
(86, 3, 5, 'shirts', 950, 'quality official shirts for official purposes  ', '1711795237_men2.png', 'White shirt ', 18),
(88, 3, 5, 'Shirt', 600, 'official shirts for official purposes', '1711794875_mens-shirt.png', 'white shirt', 50),
(89, 3, 5, 'shirt', 900, 'white shirt ', '1711795029_men_s.png', 'white', 30),
(90, 3, 7, 'Nike shoes', 4500, 'Long lasting and affordable shoes', '1711794905_nike.jpg', 'shoes', 13),
(91, 3, 7, 'Nike Airforce 1', 5500, 'Comfortable air force one shoes original from Nike', '1711795602_air.jpg', 'nike shoes', 10),
(92, 8, 8, '1kg Bismat Rice', 300, 'Testy and healthy rice from India', '1711800165_rice.png', 'rice', 200);

-- --------------------------------------------------------

--
-- Table structure for table `product_quantity`
--

CREATE TABLE `product_quantity` (
  `product_id` int(11) NOT NULL,
  `Product_quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `review_id` int(100) NOT NULL,
  `product_id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `review` varchar(255) NOT NULL,
  `datetime` datetime NOT NULL,
  `rating` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_info`
--

CREATE TABLE `user_info` (
  `user_id` int(10) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(300) NOT NULL,
  `password` varchar(300) NOT NULL,
  `mobile` varchar(10) NOT NULL,
  `address1` varchar(300) NOT NULL,
  `address2` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `user_info`
--

INSERT INTO `user_info` (`user_id`, `first_name`, `last_name`, `email`, `password`, `mobile`, `address1`, `address2`) VALUES
(26, 'Natalie', 'Mwaka', 'nataliemwaka497@gmail.com', 'Joseph900', '0795027712', '635', 'Voi'),
(27, 'Ira', 'Judith', 'irajudith22@gmail.com', 'Mwabingu@22', '0113709541', '635', 'Voi'),
(29, 'Susan ', 'Wairimu', 'susangachoka@gmail.com', 'Wairimu@2024', '0758789321', 'Voi', '635'),
(30, 'Linda', 'Makau', 'makaulinda@gmail.com', 'Landia@2024', '0723811478', 'Voi', '635'),
(31, 'jose i', 'Joseph', 'test@test.com', 'Joseph900', '0713214564', '2344', 'Kisumu');

--
-- Triggers `user_info`
--
DELIMITER $$
CREATE TRIGGER `after_user_info_insert` AFTER INSERT ON `user_info` FOR EACH ROW BEGIN 
INSERT INTO user_info_backup VALUES(new.user_id,new.first_name,new.last_name,new.email,new.password,new.mobile,new.address1,new.address2);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `user_info_backup`
--

CREATE TABLE `user_info_backup` (
  `user_id` int(10) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(300) NOT NULL,
  `password` varchar(300) NOT NULL,
  `mobile` varchar(10) NOT NULL,
  `address1` varchar(300) NOT NULL,
  `address2` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `user_info_backup`
--

INSERT INTO `user_info_backup` (`user_id`, `first_name`, `last_name`, `email`, `password`, `mobile`, `address1`, `address2`) VALUES
(25, 'otheruser', 'user', 'otheruser@gmail.com', 'puneet', '1234446576', 'New York', 'Kumbalagodu'),
(26, 'Natalie', 'Mwaka', 'nataliemwaka497@gmail.com', 'Joseph900', '0795027712', '635', 'Voi'),
(27, 'Ira', 'Judith', 'irajudith22@gmail.com', 'Mwabingu@22', '0113709541', '635', 'Voi'),
(28, 'Serita', 'Muyaza', 'smmwangovya@gmail.com', 'Marvel@2012', '0740568956', 'Voi', '633'),
(29, 'Susan ', 'Wairimu', 'susangachoka@gmail.com', 'Wairimu@2024', '0758789321', 'Voi', '635'),
(30, 'Linda', 'Makau', 'makaulinda@gmail.com', 'Landia@2024', '0723811478', 'Voi', '635'),
(31, 'jose i', 'Joseph', 'test@test.com', 'Joseph900', '0713214564', '2344', 'Kisumu');

-- --------------------------------------------------------

--
-- Table structure for table `wishlist`
--

CREATE TABLE `wishlist` (
  `id` int(10) NOT NULL,
  `p_id` int(10) NOT NULL,
  `ip_add` varchar(250) NOT NULL,
  `user_id` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `wishlist`
--

INSERT INTO `wishlist` (`id`, `p_id`, `ip_add`, `user_id`) VALUES
(0, 82, '127.0.0.1', 27),
(224, 0, '::1', -1),
(282, 3, '::1', -1),
(283, 73, '::1', 12),
(284, 74, '::1', 12),
(285, 0, '::1', 12);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_info`
--
ALTER TABLE `admin_info`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`brand_id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`cat_id`);

--
-- Indexes for table `email_info`
--
ALTER TABLE `email_info`
  ADD PRIMARY KEY (`email_id`);

--
-- Indexes for table `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `orders_info`
--
ALTER TABLE `orders_info`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `order_products`
--
ALTER TABLE `order_products`
  ADD PRIMARY KEY (`order_pro_id`),
  ADD KEY `order_products` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `product_quantity`
--
ALTER TABLE `product_quantity`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`review_id`);

--
-- Indexes for table `user_info`
--
ALTER TABLE `user_info`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `user_info_backup`
--
ALTER TABLE `user_info_backup`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_info`
--
ALTER TABLE `admin_info`
  MODIFY `admin_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `brands`
--
ALTER TABLE `brands`
  MODIFY `brand_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=324;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `cat_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `order_products`
--
ALTER TABLE `order_products`
  MODIFY `order_pro_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

--
-- AUTO_INCREMENT for table `user_info`
--
ALTER TABLE `user_info`
  MODIFY `user_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
