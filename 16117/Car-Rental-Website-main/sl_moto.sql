-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 18, 2024 at 12:07 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sl_moto`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `Id` int(11) NOT NULL,
  `username` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `user_type` text NOT NULL,
  `failed_attempts` int(11) DEFAULT 0,
  `last_failed_attempt` timestamp NULL DEFAULT NULL,
  `last_login` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`Id`, `username`, `email`, `password`, `user_type`, `failed_attempts`, `last_failed_attempt`, `last_login`) VALUES
(1, 'Malinda Geethaka', 'Malinda@gmail.com', '$2y$10$KDLAJVyfrLc4kCBnoTAUHeykkNlTh5aHGyf/GVYJ6y/2rFTzEfV2C', 'user', 0, NULL, NULL),
(2, 'Gihan Bandara', 'Gihan@gmail.com', '$2y$10$Z13hHTzQOt6/Wbfz974XiuD3lpvDLXPpcbUfWxtkM/pyXJh8AVuem', 'user', 0, NULL, NULL),
(3, 'Admin', 'admin@slmoto.com', '$2y$10$b4PNCyrz8FYNe4vY96yUHORIm/ZW/MOsvrmDJkHSIqWSsZS1iBtiK', 'admin', 0, NULL, NULL),
(5, 'Ashen Kalhara', 'Ashen@gmail.com', '$2y$10$CVrM46p4dNZPBFyQosdHb.ihygzpjr2.m4yPg8YuRbSte89f5X/4m', 'user', 0, NULL, NULL),
(6, 'Himesha Ekanayake', 'Himesha@gmail.com', '$2y$10$aafuRRguOpWPqeFx73kPlewEgfzltIB7AAvrwXDNWPTZrQRYPXUdW', 'user', 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `Id` int(11) NOT NULL,
  `Title` text NOT NULL,
  `Description` text NOT NULL,
  `Price` decimal(18,2) NOT NULL,
  `Image` text NOT NULL,
  `Phone_Number` text NOT NULL,
  `Time_Duration` text NOT NULL,
  `User_Name` text NOT NULL,
  `User_Email` text NOT NULL,
  `Location` text NOT NULL,
  `Status` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`Id`, `Title`, `Description`, `Price`, `Image`, `Phone_Number`, `Time_Duration`, `User_Name`, `User_Email`, `Location`, `Status`) VALUES
(1, 'Toyota Camry', 'A reliable sedan with excellent fuel efficiency.', 15000.00, 'uploads/pngwing.com.png', '123-456-7890', '1_day', 'Malinda Geethaka', 'Malinda@gmail.com', 'Colombo', 'Confirmed'),
(2, 'Honda Civic', 'A popular compact car known for its reliability and fuel efficiency.', 17000.00, 'uploads/pngwing.com (1).png', '987-654-3210', '1_week', 'Malinda Geethaka', 'Malinda@gmail.com', 'Colombo', 'not rented yet'),
(3, 'Ford F-150', 'A versatile pickup truck with impressive towing capabilities.', 14000.00, 'uploads/pngwing.com (2).png', '555-123-4567', '1_week', 'Ashen Kalhara', 'Ashen@gmail.com', 'Colombo', 'not rented yet'),
(4, 'Toyota Prius', 'A hybrid car known for its outstanding fuel efficiency and Eco-friendly design', 12000.00, 'uploads/pngwing.com (3).png', '222-444-6666', '3_days', 'Ashen Kalhara', 'Ashen@gmail.com', 'Negombo', 'not rented yet'),
(5, 'BMW 3 Series', 'A luxury sedan known for its dynamic performance and upscale interior.', 25000.00, 'uploads/pngwing.com (4).png', '111-222-3333', '1_week', 'Ashen Kalhara', 'Ashen@gmail.com', 'Wattala', 'not rented yet'),
(6, 'Subaru Outback', 'A versatile crossover SUV with standard all-wheel drive and ample cargo space.', 18000.00, 'uploads/pngwing.com (5).png', '666-555-4444', '1_week', 'Ashen Kalhara', 'Ashen@gmail.com', 'Kiridiwela', 'not rented yet'),
(7, 'Toyota Corolla', 'A reliable and fuel-efficient sedan perfect for city driving and long trips.', 15000.00, 'uploads/pngwing.com (6).png', '077-123-4567', '1_week', 'Himesha Ekanayake', 'Himesha@gmail.com', 'Kurunegala', 'not rented yet'),
(8, ' Nissan X-Trail', 'A versatile SUV with ample space for passengers and cargo, ideal for exploring Sri Lanka\'s diverse terrain.', 14000.00, 'uploads/pngwing.com (7).png', '076-234-5678', '1_week', 'Himesha Ekanayake', 'Himesha@gmail.com', 'Kurunegala', 'not rented yet'),
(9, 'Honda CR-V', 'A comfortable and spacious SUV known for its smooth ride and advanced safety features.', 15000.00, 'uploads/pngwing.com (8).png', '075-345-6789', '1_week', 'Himesha Ekanayake', 'Himesha@gmail.com', 'Kurunegala', 'not rented yet');

-- --------------------------------------------------------

--
-- Table structure for table `vehicle_rental`
--

CREATE TABLE `vehicle_rental` (
  `Id` int(11) NOT NULL,
  `name` text NOT NULL,
  `email` text NOT NULL,
  `phone` text NOT NULL,
  `rental_duration` text NOT NULL,
  `vehicle_id` text NOT NULL,
  `owner_name` text NOT NULL,
  `owner_email` text NOT NULL,
  `owner_phone` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vehicle_rental`
--

INSERT INTO `vehicle_rental` (`Id`, `name`, `email`, `phone`, `rental_duration`, `vehicle_id`, `owner_name`, `owner_email`, `owner_phone`) VALUES
(1, 'Gihan Pasindu', 'Gihan@gmail.com', '076123543', '2', '1', 'Malinda Geethaka', 'Malinda@gmail.com', '123-456-7890');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `vehicle_rental`
--
ALTER TABLE `vehicle_rental`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `vehicle_rental`
--
ALTER TABLE `vehicle_rental`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
