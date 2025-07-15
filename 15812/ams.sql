-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 06, 2025 at 08:06 AM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ams`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `Id` int(11) NOT NULL,
  `EmployeeId` int(100) NOT NULL,
  `AttendanceDate` date NOT NULL,
  `EntryTime` varchar(100) NOT NULL,
  `ExitTime` varchar(100) NOT NULL,
  `EntryTimePic` varchar(500) NOT NULL,
  `ExitTimePic` varchar(500) NOT NULL,
  `DeviceInfo` varchar(200) NOT NULL,
  `DeviceMatch` varchar(50) NOT NULL,
  `latitude` varchar(500) NOT NULL,
  `longitude` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`Id`, `EmployeeId`, `AttendanceDate`, `EntryTime`, `ExitTime`, `EntryTimePic`, `ExitTimePic`, `DeviceInfo`, `DeviceMatch`, `latitude`, `longitude`) VALUES
(6, 18, '2023-05-10', '12:37:17', '12:37:27', '645b42a5397aa.png', '645b42af04b66.png', '::1', 'Yes', '', ''),
(7, 18, '2025-05-22', '21:54:45', '', '682f4fcd5fccd.png', '', '::1', 'Yes', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `dept_no` int(100) NOT NULL,
  `dept_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`dept_no`, `dept_name`) VALUES
(1, 'Finance'),
(2, 'IT'),
(3, 'HR');

-- --------------------------------------------------------

--
-- Table structure for table `emp-login`
--

CREATE TABLE `emp-login` (
  `EmployeeId` int(11) NOT NULL,
  `Username` varchar(100) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `Usertype` varchar(50) NOT NULL,
  `Date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `emp-login`
--

INSERT INTO `emp-login` (`EmployeeId`, `Username`, `Password`, `Usertype`, `Date`) VALUES
(2, 'aa@gmail.com', 'Aabi@123', 'Employee', '2025-05-22'),
(0, 'admin@123', '12345', 'Admin', '2023-03-01'),
(17, 'hello12@gmail.com', 'Sami@123', 'Employee', '2023-05-03'),
(18, 'samizain26@gmail.com', 'Sami@12345', 'Employee', '2023-05-04');

-- --------------------------------------------------------

--
-- Table structure for table `empdetail`
--

CREATE TABLE `empdetail` (
  `Id` int(11) NOT NULL,
  `EmployeeId` int(100) NOT NULL,
  `Aadhar` varchar(50) NOT NULL,
  `Department` varchar(50) NOT NULL,
  `Address` varchar(100) NOT NULL,
  `DOB` date NOT NULL,
  `IFSC` varchar(200) NOT NULL,
  `Bank` varchar(100) NOT NULL,
  `Father` varchar(150) NOT NULL,
  `Pan` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `empdetail`
--

INSERT INTO `empdetail` (`Id`, `EmployeeId`, `Aadhar`, `Department`, `Address`, `DOB`, `IFSC`, `Bank`, `Father`, `Pan`) VALUES
(3, 1, '12345678', 'HR', 'Aiims Road', '1999-10-26', '1259', '6507125004791', 'abdul', 'DGh67');

-- --------------------------------------------------------

--
-- Table structure for table `emp_leave`
--

CREATE TABLE `emp_leave` (
  `Id` int(11) NOT NULL,
  `EmployeeId` int(11) NOT NULL,
  `Applied_on` date NOT NULL,
  `From` date NOT NULL,
  `To` date NOT NULL,
  `Reason` varchar(500) NOT NULL,
  `Status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `emp_leave`
--

INSERT INTO `emp_leave` (`Id`, `EmployeeId`, `Applied_on`, `From`, `To`, `Reason`, `Status`) VALUES
(1, 18, '2023-05-04', '2023-05-04', '2023-05-06', 'out of station', 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `emp_reg`
--

CREATE TABLE `emp_reg` (
  `EmployeeId` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Mobile` varchar(20) NOT NULL,
  `Photo` varchar(500) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Gender` varchar(20) NOT NULL,
  `Date` date NOT NULL,
  `Password` varchar(150) NOT NULL,
  `DeviceInfo` varchar(200) NOT NULL,
  `Status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `emp_reg`
--

INSERT INTO `emp_reg` (`EmployeeId`, `Name`, `Mobile`, `Photo`, `Email`, `Gender`, `Date`, `Password`, `DeviceInfo`, `Status`) VALUES
(2, 'Aabgina', '8888888', 'assets/empphoto/avatar1.jpg', 'aa@gmail.com', 'Female', '2023-03-16', 'Aabi@123', '::1', 'Approve'),
(17, 'hello', '88888', 'assets/empphoto/645202e1e9b81my_photo.JPG', 'hello12@gmail.com', 'Female', '2023-05-03', 'Sami@123', '::1', 'Approve'),
(18, 'sumreen aziz', '56789876', 'assets/empphoto/64536cf8ba3e36394.jpg', 'samizain26@gmail.com', 'Female', '2023-05-04', 'Sami@12345', '::1', 'Approve');

-- --------------------------------------------------------

--
-- Table structure for table `holidayinfo`
--

CREATE TABLE `holidayinfo` (
  `Id` int(11) NOT NULL,
  `MonthandYear` varchar(20) NOT NULL,
  `HolidayFor` varchar(100) NOT NULL,
  `NumberofDays` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `holidayinfo`
--

INSERT INTO `holidayinfo` (`Id`, `MonthandYear`, `HolidayFor`, `NumberofDays`) VALUES
(1, '2023-03-08', 'holi', 1);

-- --------------------------------------------------------

--
-- Table structure for table `monthinfo`
--

CREATE TABLE `monthinfo` (
  `Id` int(11) NOT NULL,
  `MonthandYear` varchar(50) NOT NULL,
  `NumberofWorkingDays` int(100) NOT NULL,
  `NumberofSundays` int(10) NOT NULL,
  `NumberofHolidays` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `monthinfo`
--

INSERT INTO `monthinfo` (`Id`, `MonthandYear`, `NumberofWorkingDays`, `NumberofSundays`, `NumberofHolidays`) VALUES
(1, '2023-03', 26, 4, 1),
(2, '2023-04', 26, 3, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`dept_no`);

--
-- Indexes for table `emp-login`
--
ALTER TABLE `emp-login`
  ADD PRIMARY KEY (`Username`),
  ADD UNIQUE KEY `Username` (`Username`);

--
-- Indexes for table `empdetail`
--
ALTER TABLE `empdetail`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `emp_leave`
--
ALTER TABLE `emp_leave`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `emp_reg`
--
ALTER TABLE `emp_reg`
  ADD PRIMARY KEY (`EmployeeId`);

--
-- Indexes for table `holidayinfo`
--
ALTER TABLE `holidayinfo`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `monthinfo`
--
ALTER TABLE `monthinfo`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `dept_no` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `empdetail`
--
ALTER TABLE `empdetail`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `emp_leave`
--
ALTER TABLE `emp_leave`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `emp_reg`
--
ALTER TABLE `emp_reg`
  MODIFY `EmployeeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `holidayinfo`
--
ALTER TABLE `holidayinfo`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `monthinfo`
--
ALTER TABLE `monthinfo`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
