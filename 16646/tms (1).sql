

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tms`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `UserName` varchar(100) DEFAULT NULL,
  `Name` varchar(250) DEFAULT NULL,
  `EmailId` varchar(250) DEFAULT NULL,
  `MobileNumber` bigint(10) DEFAULT NULL,
  `Password` varchar(100) DEFAULT NULL,
  `updationDate` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `UserName`, `Name`, `EmailId`, `MobileNumber`, `Password`, `updationDate`) VALUES
(1, 'admin', 'rahul', 'rahulkr682002@gmail.com', 6204355635, 'e64b78fc3bc91bcbc7dc232ba8ec59e0', '2024-01-10 11:18:49');

-- --------------------------------------------------------

--
-- Table structure for table `tblbooking`
--

CREATE TABLE `tblbooking` (
  `BookingId` int(11) NOT NULL,
  `PackageId` int(11) DEFAULT NULL,
  `UserEmail` varchar(100) DEFAULT NULL,
  `FromDate` varchar(100) DEFAULT NULL,
  `ToDate` varchar(100) DEFAULT NULL,
  `Comment` mediumtext DEFAULT NULL,
  `RegDate` timestamp NULL DEFAULT current_timestamp(),
  `status` int(11) DEFAULT NULL,
  `CancelledBy` varchar(5) DEFAULT NULL,
  `UpdationDate` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tblbooking`
--

INSERT INTO `tblbooking` (`BookingId`, `PackageId`, `UserEmail`, `FromDate`, `ToDate`, `Comment`, `RegDate`, `status`, `CancelledBy`, `UpdationDate`) VALUES
(1, 1, 'test@gmail.com', '2020-07-11', '2020-07-18', 'I want this package.', '2024-01-16 06:38:36', 2, 'u', '2024-01-30 05:18:29'),
(2, 2, 'test@gmail.com', '2020-07-10', '2020-07-13', 'There is some discount', '2024-01-17 06:43:25', 1, NULL, '2024-01-31 01:21:17'),
(3, 4, 'abir@gmail.com', '2020-07-11', '2020-07-15', 'When I get conformation', '2024-01-17 06:44:39', 2, 'a', '2024-01-30 05:18:52'),
(4, 2, 'test@gmail.com', '2024-02-02', '2024-02-08', 'NA', '2024-01-31 02:03:27', 1, NULL, '2024-01-31 06:35:08'),
(5, 3, 'test@gmail.com', '2024-01-31', '2024-02-05', 'please offer some discount', '2024-01-31 05:21:52', 0, NULL, NULL),
(6, 2, 'garima12@gmail.com', '2024-03-01', '2024-03-05', 'NA', '2024-02-03 13:04:33', 1, NULL, '2024-02-03 13:05:29');

-- --------------------------------------------------------

--
-- Table structure for table `tblenquiry`
--

CREATE TABLE `tblenquiry` (
  `id` int(11) NOT NULL,
  `FullName` varchar(100) DEFAULT NULL,
  `EmailId` varchar(100) DEFAULT NULL,
  `MobileNumber` char(10) DEFAULT NULL,
  `Subject` varchar(100) DEFAULT NULL,
  `Description` mediumtext DEFAULT NULL,
  `PostingDate` timestamp NULL DEFAULT current_timestamp(),
  `Status` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tblenquiry`
--

INSERT INTO `tblenquiry` (`id`, `FullName`, `EmailId`, `MobileNumber`, `Subject`, `Description`, `PostingDate`, `Status`) VALUES
(2, 'Kishan Twaerea', 'kishan@gmail.com', '6797947987', 'Enquiry', 'Any Offer for North Trip', '2024-01-18 06:31:38', NULL),
(3, 'Jacaob', 'Jai@gmail.com', '1646689721', 'Any offer for North', 'Any Offer for north', '2024-01-19 06:32:41', 1),
(5, 'hohn Doe', 'John12@gmail.com', '142536254', 'Test Subject', 'this is for testing', '2024-02-03 13:07:50', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tblissues`
--

CREATE TABLE `tblissues` (
  `id` int(11) NOT NULL,
  `UserEmail` varchar(100) DEFAULT NULL,
  `Issue` varchar(100) DEFAULT NULL,
  `Description` mediumtext DEFAULT NULL,
  `PostingDate` timestamp NULL DEFAULT current_timestamp(),
  `AdminRemark` mediumtext DEFAULT NULL,
  `AdminremarkDate` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tblissues`
--

INSERT INTO `tblissues` (`id`, `UserEmail`, `Issue`, `Description`, `PostingDate`, `AdminRemark`, `AdminremarkDate`) VALUES
(7, 'test@gmail.com', 'Refund', 'I want my refund', '2024-01-25 06:56:29', NULL, '2024-01-30 05:20:14'),
(10, 'test@gmail.com', 'Other', 'Test Sample', '2024-01-31 05:24:40', NULL, NULL),
(13, 'garima12@gmail.com', 'Booking Issues', 'I want some information ragrding booking', '2024-02-03 13:06:00', 'Infromation provided', '2024-02-03 13:06:26');

-- --------------------------------------------------------

--
-- Table structure for table `tblpages`
--

CREATE TABLE `tblpages` (
  `id` int(11) NOT NULL,
  `type` varchar(255) DEFAULT '',
  `detail` longtext DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tblpages`
--

INSERT INTO `tblpages` (`id`, `type`, `detail`) VALUES
(1, 'terms', '																				<p align=\"justify\"><span style=\"color: rgb(153, 0, 0); font-size: small; font-weight: 700;\">terms and condition page</span></p>\r\n										\r\n										'),
(2, 'privacy', '										<span style=\"color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px; text-align: justify;\">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat</span>\r\n										'),
(3, 'aboutus', '										<div><span style=\"color: rgb(0, 0, 0); font-family: Georgia; font-size: 15px; text-align: justify; font-weight: bold;\">Welcome to Tourism Management System!!!</span></div><span style=\"font-family: &quot;courier new&quot;;\"><span style=\"color: rgb(0, 0, 0); font-size: 15px; text-align: justify;\">Since then, our courteous and committed team members have always ensured a pleasant and enjoyable tour for the clients. This arduous effort has enabled TMS to be recognized as a dependable Travel Solutions provider with three offices Delhi.</span><span style=\"color: rgb(80, 80, 80); font-size: 13px;\">&nbsp;We have got packages to suit the discerning traveler\'s budget and savor. Book your dream vacation online. Supported quality and proposals of our travel consultants, we have a tendency to welcome you to decide on from holidays packages and customize them according to your plan.</span></span>\r\n										'),
(11, 'contact', '																				<span style=\"color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px; text-align: justify;\">Address------J-890 Dwarka House New Delhi-110096</span>');

-- --------------------------------------------------------

--
-- Table structure for table `tbltourpackages`
--

CREATE TABLE `tbltourpackages` (
  `PackageId` int(11) NOT NULL,
  `PackageName` varchar(200) DEFAULT NULL,
  `PackageType` varchar(150) DEFAULT NULL,
  `PackageLocation` varchar(100) DEFAULT NULL,
  `PackagePrice` int(11) DEFAULT NULL,
  `PackageFetures` varchar(255) DEFAULT NULL,
  `PackageDetails` mediumtext DEFAULT NULL,
  `PackageImage` varchar(100) DEFAULT NULL,
  `Creationdate` timestamp NULL DEFAULT current_timestamp(),
  `UpdationDate` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tbltourpackages`
--

INSERT INTO `tbltourpackages` (`PackageId`, `PackageName`, `PackageType`, `PackageLocation`, `PackagePrice`, `PackageFetures`, `PackageDetails`, `PackageImage`, `Creationdate`, `UpdationDate`) VALUES
(1, 'Swiss Paris Delight Premium 2020 (Group Package)', 'Group Package', 'Paris and Switzerland', 6000, ' Round trip Economy class airfare valid for the duration of the holiday - Airport taxes - Accommodation for 3 nights in Paris and 3 nights in scenic Switzerland - Enjoy continental breakfasts every morning - Enjoy 5 Indian dinners in Mainland Europe - Exp', 'Pick this holiday for a relaxing vacation in Paris and Switzerland. Your tour embarks from Paris. Enjoy an excursion to popular attractions like the iconic Eiffel Tower. After experiencing the beautiful city, you will drive past mustard fields through Burgundy to reach Switzerland. While there, you can opt for a tour to Interlaken and then to the Trummelbach Falls. Photostop at Zurich Lake and a cable car ride to Mt. Titlis are the main highlights of the holiday.', '1581490262_2_1.jpg', '2024-07-15 05:21:58', '2024-01-30 05:20:49'),
(2, 'Bhutan Holidays - Thimphu and Paro Special', 'Family Package', 'Bhutan', 3000, 'Free Wi-fi, Free Breakfast, Free Pickup and drop facility ', 'Visit to Tiger\'s Nest Monastery | Complimentary services of a Professional Guide', 'BHUTAN-THIMPU-PARO-PUNAKHA-TOUR-6N-7D.jpeg', '2024-07-15 05:21:58', '2024-01-30 05:20:56'),
(3, 'Soulmate Special Bali - 7 Nights', 'Couple Package', 'Indonesia(Bali)', 5000, 'Free Pickup and drop facility, Free Wi-fi , Free professional guide', 'Airport transfers by private car | Popular Sightseeing included | Suitable for Couple and budget travelers', '1583140977_5_11.jpg', '2024-07-15 05:21:58', '2024-01-30 05:20:56'),
(4, 'Kerala - A Lovers Paradise - Value Added', 'Family Package', 'Kerala', 1000, 'Free Wi-fi, Free pick up and drop facility,', 'Visit Matupetty Dam, tea plantation and a spice garden | View sunset in Kanyakumari | AC Car at disposal for 2hrs extra (once per city)', 'images (2).jpg', '2024-07-15 05:21:58', '2024-01-30 05:20:56'),
(5, 'Short Trip To Dubai', 'Family', 'Dubai', 4500, 'Free pick up and drop facility, Free Wi-fi, Free breakfast', 'A Holiday Package for the entire family.', 'unnamed.jpg', '2024-07-15 05:21:58', '2024-01-30 05:20:56'),
(6, 'Sikkim Delight with Darjeeling (customizable)', 'Group', 'Sikkim', 3500, 'Free Breakfast, Free Pick up drop facility', 'Changu Lake and New Baba Mandir excursion | View the sunrise from Tiger Hill | Get Blessed at the famous Rumtek Monastery', 'download (2).jpg', '2024-07-15 05:21:58', '2024-01-30 05:20:56'),
(7, '6 Days in Guwahati and Shillong With Cherrapunji Excursion', 'Family Package', 'Guwahati(Sikkim)', 4500, 'Breakfast,  Accommodation » Pick-up » Drop » Sightseeing', 'After arrival at Guwahati airport meet our representative & proceed for Shillong. Shillong is the capital and hill station of Meghalaya, also known as Abode of Cloud, one of the smallest states in India. En route visit Barapani lake. By afternoon reach at Shillong. Check in to the hotel. Evening is leisure. Spent time as you want. Visit Police bazar. Overnight stay at Shillong.', '95995.jpg', '2024-07-15 05:21:58', '2024-01-30 05:20:56'),
(8, 'Grand Week in North East - Lachung, Lachen and Gangtok', 'Domestic Packages', 'Sikkim', 4500, 'Free Breakfast, Free Wi-fi', 'Changu Lakeand New Baba Mandir excursion | Yumthang Valley tour | Gurudongmar Lake excursion | Night stay in Lachen', 'download (3).jpg', '2024-07-15 05:21:58', '2024-01-30 05:20:56'),
(9, 'Gangtok & Darjeeling Holiday (Without Flights)', 'Family Package', 'Sikkim', 1000, 'Free Wi-fi, Free pickup and drop facility', 'Ideal tour for Family | Sightseeing in Gangtok and Darjeeling | Full day excursion to idyllic Changu Lake | Visit to Ghoom Monastery', '1540382781_shutterstock_661867435.jpg.jpg', '2024-07-15 05:21:58', '2024-01-30 05:20:56');

-- --------------------------------------------------------

--
-- Table structure for table `tblusers`
--

CREATE TABLE `tblusers` (
  `id` int(11) NOT NULL,
  `FullName` varchar(100) DEFAULT NULL,
  `MobileNumber` char(10) DEFAULT NULL,
  `EmailId` varchar(70) DEFAULT NULL,
  `Password` varchar(100) DEFAULT NULL,
  `RegDate` timestamp NULL DEFAULT current_timestamp(),
  `UpdationDate` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tblusers`
--

INSERT INTO `tblusers` (`id`, `FullName`, `MobileNumber`, `EmailId`, `Password`, `RegDate`, `UpdationDate`) VALUES
(5, 'rahul kumar', '6204355625', 'rahulkr682002@gmail.com ', 'ebaaba27b32928a25f2ad6185fc0cc74', '2024-01-16 06:33:20', '2025-03-06 08:11:51');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tblbooking`
--
ALTER TABLE `tblbooking`
  ADD PRIMARY KEY (`BookingId`);

--
-- Indexes for table `tblenquiry`
--
ALTER TABLE `tblenquiry`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tblissues`
--
ALTER TABLE `tblissues`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tblpages`
--
ALTER TABLE `tblpages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbltourpackages`
--
ALTER TABLE `tbltourpackages`
  ADD PRIMARY KEY (`PackageId`);

--
-- Indexes for table `tblusers`
--
ALTER TABLE `tblusers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `EmailId` (`EmailId`),
  ADD KEY `EmailId_2` (`EmailId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tblbooking`
--
ALTER TABLE `tblbooking`
  MODIFY `BookingId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tblenquiry`
--
ALTER TABLE `tblenquiry`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tblissues`
--
ALTER TABLE `tblissues`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `tblpages`
--
ALTER TABLE `tblpages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `tbltourpackages`
--
ALTER TABLE `tbltourpackages`
  MODIFY `PackageId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `tblusers`
--
ALTER TABLE `tblusers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
