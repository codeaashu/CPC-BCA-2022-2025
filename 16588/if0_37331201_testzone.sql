-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: sql311.byetcluster.com
-- Generation Time: Jul 16, 2025 at 03:55 AM
-- Server version: 11.4.7-MariaDB
-- PHP Version: 7.2.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `if0_37331201_testzone`
--

-- --------------------------------------------------------

--
-- Table structure for table `13706Py_Test27995`
--

CREATE TABLE `13706Py_Test27995` (
  `id` int(11) NOT NULL,
  `question` text NOT NULL,
  `option1` varchar(255) NOT NULL,
  `option2` varchar(255) NOT NULL,
  `option3` varchar(255) NOT NULL,
  `option4` varchar(255) NOT NULL,
  `correct_option` tinyint(4) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `13706Py_Test27995`
--

INSERT INTO `13706Py_Test27995` (`id`, `question`, `option1`, `option2`, `option3`, `option4`, `correct_option`) VALUES
(1, 'What is the output of print(2 ** 3)?', '5', '6', '8', '9', 3),
(2, 'Which of the following is a valid variable name in Python?', '1variable', '_variable', 'variable-name', 'variable name', 2),
(3, 'What is the output of print(type([]))?', 'list', 'tuple', 'dict', 'set', 1),
(4, 'What does the len() function do in Python?', 'Deletes an element', 'Returns the number of items', 'Adds an element', 'Sorts the list', 2),
(5, 'Which keyword is used to create a function in Python?', 'define', 'function', 'def', 'fun', 3),
(6, 'What is the output of print(10 // 3)?', '3.33', '3', '4', '3', 2),
(7, 'Which of the following is immutable in Python?', 'List', 'Dictionary', 'Set', 'Tuple', 4),
(8, 'Which operator is used for string concatenation in Python?', '*', '+', '&', '%', 2),
(9, 'Which of these is not a core data type in Python?', 'Tuples', 'Lists', 'Class', 'Dictionary', 3),
(10, 'How do you start a comment in Python?', '//', '#', '/*', '!--', 2);

-- --------------------------------------------------------

--
-- Table structure for table `14268test_0327995`
--

CREATE TABLE `14268test_0327995` (
  `id` int(11) NOT NULL,
  `question` text NOT NULL,
  `option1` varchar(255) NOT NULL,
  `option2` varchar(255) NOT NULL,
  `option3` varchar(255) NOT NULL,
  `option4` varchar(255) NOT NULL,
  `correct_option` tinyint(4) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `14268test_0327995`
--

INSERT INTO `14268test_0327995` (`id`, `question`, `option1`, `option2`, `option3`, `option4`, `correct_option`) VALUES
(1, '20+2', '42', '22', '32', '31', 2),
(2, '26-9', '17', '64', '68', '40', 1),
(3, '33-3', '28', '30', '33', '31', 2),
(4, '40-6', '34', '43', '22', '21', 1),
(5, '79-9', '70', '80', '89', '27', 1);

-- --------------------------------------------------------

--
-- Table structure for table `17496Test_0527995`
--

CREATE TABLE `17496Test_0527995` (
  `id` int(11) NOT NULL,
  `question` text NOT NULL,
  `option1` varchar(255) NOT NULL,
  `option2` varchar(255) NOT NULL,
  `option3` varchar(255) NOT NULL,
  `option4` varchar(255) NOT NULL,
  `correct_option` tinyint(4) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `17496Test_0527995`
--

INSERT INTO `17496Test_0527995` (`id`, `question`, `option1`, `option2`, `option3`, `option4`, `correct_option`) VALUES
(1, 'Who is the president of Russia?', 'putin', 'modi', 'meloni', 'trump', 1),
(2, 'Prime Minister of India?', 'modi', 'putin', 'trump', 'meloni', 1),
(3, 'highest mountain?', 'Mt. Averest', 'Mt. MDH', 'Mt. Abu', 'Mt. Gabba', 1),
(4, '2+\\\"2\\\" in javascript?', '22', '4', '2\\\"2\\\"', '\\\"2\\\"2', 1),
(5, 'console.log(null);', 'object', 'number', 'string', 'BigInt', 1);

-- --------------------------------------------------------

--
-- Table structure for table `32975test_0127995`
--

CREATE TABLE `32975test_0127995` (
  `id` int(11) NOT NULL,
  `question` text NOT NULL,
  `option1` varchar(255) NOT NULL,
  `option2` varchar(255) NOT NULL,
  `option3` varchar(255) NOT NULL,
  `option4` varchar(255) NOT NULL,
  `correct_option` tinyint(4) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `32975test_0127995`
--

INSERT INTO `32975test_0127995` (`id`, `question`, `option1`, `option2`, `option3`, `option4`, `correct_option`) VALUES
(1, '	500 was invested at 12% per annum simple interest and a certain sum of money invested at 10% per annum simple interest. If the sum of the interest on both the sum after 4 years is 480, the latter sum of money is ?', '450', '750', '600', '550', 3),
(2, 'A man took a loan from a bank at the rate of 12% per annum at simple interest. After 3 years he had to pay 5,400 as interest only for the period. The principal amount borrowed by him was ?', '2000', '10000', '20000', '15000', 4),
(3, 'In simple interest rate per annum a certain sum amounts to Rs. 5,182 in 2 years and Rs. 5,832 in 3 years. The principal in rupees is ?', 'Rs 2882', 'Rs 5000', 'Rs 3882', 'Rs 4000', 3),
(4, '	If the simple interest for 6 years be equal to 30% of the principal, it will be equal to the principal after ?', '20 years', '30 years', '10 years', '22 years', 1),
(5, 'The rate of simple interest per annum at which a sum of money doubles itself in 16 and 2/3 years is ?', '4%', '5%', '6%', '7%', 3),
(6, '6,000 becomes 7,200 in 4 years at a certain rate of simple interest. If the rate becomes 1.5 times of itself, the amount of the same principal in 5 years will be ?', '8000', '8250', '9250', '9000', 2),
(7, 'In how many years a sum of Rs. 3000 will yield an interest of Rs. 1080 at 12% per annum simple interest ?', '4 years', '3 years', '5 years', '6 years', 2),
(8, 'If the simple interest on Re. 1 for 1 month is 1 paisa, then the rate per cent per annum will be ?', '10%', '8%', '12%', '6%', 3),
(9, 'The sum lent at 5% per annum (i.e. 365 days) simple interest, that produces interest, of 2.00 a day, is ?', '1400', '14700', '14600', '7300', 3),
(10, 'In how many years will a sum of 3,000 yield a simple interest of 1,080 at 12% per annum ?', '3 years', '2 and 1/2 years', '2 years', '3 and 1/2 years', 1);

-- --------------------------------------------------------

--
-- Table structure for table `57924test_0427995`
--

CREATE TABLE `57924test_0427995` (
  `id` int(11) NOT NULL,
  `question` text NOT NULL,
  `option1` varchar(255) NOT NULL,
  `option2` varchar(255) NOT NULL,
  `option3` varchar(255) NOT NULL,
  `option4` varchar(255) NOT NULL,
  `correct_option` tinyint(4) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `57924test_0427995`
--

INSERT INTO `57924test_0427995` (`id`, `question`, `option1`, `option2`, `option3`, `option4`, `correct_option`) VALUES
(1, 'What is the capital of France?', 'Berlin', 'Madrid', 'Paris', 'Rome', 0),
(2, 'Which planet is known as the Red Planet?', 'Earth', 'Mars', 'Jupiter', 'Saturn', 0),
(3, 'Who wrote \'Hamlet\'?', 'Leo Tolstoy', 'Charles Dickens', 'Mark Twain', 'William Shakespeare', 0),
(4, 'What is the boiling point of water at sea level?', '90Â°C', '100Â°C', '120Â°C', '80Â°C', 0);

-- --------------------------------------------------------

--
-- Table structure for table `73098Jr_Scientist27995`
--

CREATE TABLE `73098Jr_Scientist27995` (
  `id` int(11) NOT NULL,
  `question` text NOT NULL,
  `option1` varchar(255) NOT NULL,
  `option2` varchar(255) NOT NULL,
  `option3` varchar(255) NOT NULL,
  `option4` varchar(255) NOT NULL,
  `correct_option` tinyint(4) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `73098Jr_Scientist27995`
--

INSERT INTO `73098Jr_Scientist27995` (`id`, `question`, `option1`, `option2`, `option3`, `option4`, `correct_option`) VALUES
(1, 'Which part of the plant conducts photosynthesis?', 'Root', 'Stem', 'Leaf', 'Flower', 3),
(2, 'What is the boiling point of water at sea level?', '50Â°C', '100Â°C', '150Â°C', '200Â°C', 2),
(3, 'Which gas is essential for respiration?', 'Nitrogen', 'Oxygen', 'Carbon dioxide', 'Hydrogen', 2),
(4, 'How many legs does an insect have?', '4', '6', '8', '10', 2),
(5, 'What is the primary source of energy for Earth?', 'Wind', 'Water', 'Sun', 'Coal', 3),
(6, 'Which of these is a non-renewable resource?', 'Solar energy', 'Wind energy', 'Petroleum', 'Hydroelectric power', 3),
(7, 'What is the function of the heart?', 'Thinking', 'Digestion', 'Pumping blood', 'Breathing', 3),
(8, 'Which organ is responsible for breathing?', 'Heart', 'Liver', 'Lungs', 'Kidneys', 3),
(9, 'What causes day and night?', 'Moonâ€™s rotation', 'Earthâ€™s revolution', 'Earthâ€™s rotation', 'Sunâ€™s movement', 3),
(10, 'What is the unit of force?', 'Watt', 'Pascal', 'Joule', 'Newton', 4);

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`id`, `name`, `email`, `message`, `created_at`) VALUES
(33, 'Abhay Rana', 'abhayrana9608@gmail.com', 'its nice project', '2024-09-12 08:05:57'),
(34, 'Ashish Kumar singh', 'mavericashish4303@gmail.com', 'Hey rana how are you ', '2024-09-18 16:32:54'),
(35, 'Abhay Rana', 'abhayrana9608@gmail.com', 'hii this the nice peroject i have ever seen\r\n', '2024-10-19 06:45:35'),
(36, 'alert(1)', 'akus@gmail.com', 'dkasfj', '2024-12-28 09:34:56'),
(37, 'raj', 'raj123@gmail.com', 'hiii', '2025-01-04 12:31:24'),
(38, '25456', 'abhayrana9608@gmail.com', 'ghhjgjhjhjhgjhgjhhj', '2025-07-05 05:53:56'),
(39, '25456', 'abhayrana9608@gmail.com', 'ghhjgjhjhjhgjhgjhhj', '2025-07-05 05:56:39'),
(40, '25456', 'abhayrana9608@gmail.com', 'ghhjgjhjhjhgjhgjhhj', '2025-07-05 05:58:29'),
(41, '25456', 'abhayrana9608@gmail.com', 'ghhjgjhjhjhgjhgjhhj', '2025-07-05 06:00:34'),
(42, 'Sashi Singh', 'sashiranjnakumarsingh3716@gmail.com', 'Kya BE KYA HAAL', '2025-07-09 04:07:26');

-- --------------------------------------------------------

--
-- Table structure for table `publish`
--

CREATE TABLE `publish` (
  `teacher_id` int(11) NOT NULL,
  `test_id` int(11) NOT NULL,
  `test_name` varchar(255) NOT NULL,
  `subject` varchar(100) NOT NULL,
  `total_questions` int(11) NOT NULL,
  `total_marks` int(11) NOT NULL,
  `total_time` int(11) NOT NULL,
  `published_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `publish`
--

INSERT INTO `publish` (`teacher_id`, `test_id`, `test_name`, `subject`, `total_questions`, `total_marks`, `total_time`, `published_at`) VALUES
(27995, 17496, 'Test-05', 'Testing', 5, 10, 10, '2025-03-19 09:57:34'),
(27995, 13706, 'Py Test', 'Python', 10, 20, 10, '2025-06-10 11:22:04'),
(27995, 73098, 'Jr_Scientist', 'Science', 10, 20, 10, '2025-07-04 03:35:27');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `s_id` int(11) NOT NULL,
  `s_name` varchar(100) NOT NULL,
  `test_id` int(11) NOT NULL,
  `test_name` varchar(100) NOT NULL,
  `subject` varchar(100) NOT NULL,
  `total_questions` int(11) NOT NULL,
  `total_time` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `test_date` date DEFAULT curdate(),
  `total_marks` int(11) NOT NULL,
  `correct_answer` int(11) DEFAULT NULL,
  `not_attempt` int(11) DEFAULT NULL,
  `incorrect_answer` int(11) DEFAULT NULL,
  `obtained_marks` int(11) DEFAULT 0,
  `status` enum('pass','fail') DEFAULT 'fail',
  `reg_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `percentage` decimal(5,2) DEFAULT NULL,
  `answer` varchar(255) DEFAULT NULL,
  `activity` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`s_id`, `s_name`, `test_id`, `test_name`, `subject`, `total_questions`, `total_time`, `teacher_id`, `test_date`, `total_marks`, `correct_answer`, `not_attempt`, `incorrect_answer`, `obtained_marks`, `status`, `reg_date`, `percentage`, `answer`, `activity`) VALUES
(16152, 'punit', 32975, 'test-01', 'Aptitude', 10, 10, 27995, '2024-09-26', 10, 2, 7, 1, 2, 'fail', '2024-09-26 09:49:03', '20.00', 'no,4,no,no,no,no,2,4,no,no', ''),
(123458, 'raja', 14268, 'test-03', 'math', 5, 2, 27995, '2024-10-01', 10, 2, 0, 3, 4, 'pass', '2024-10-01 10:11:47', '40.00', '2,2,4,1,4', ''),
(16588, 'abhay', 32975, 'test-01', 'Aptitude', 10, 10, 27995, '2024-10-18', 10, 1, 0, 9, 1, 'fail', '2024-10-19 05:02:07', '10.00', '2,2,1,4,3,1,4,4,2,4', ''),
(16588, 'abhay', 14268, 'test-03', 'math', 5, 2, 27995, '2024-10-18', 10, 5, 0, 0, 10, 'pass', '2024-10-19 05:03:55', '100.00', '2,1,2,1,1', ''),
(12456, 'Rekha kumari', 14268, 'test-03', 'math', 5, 2, 27995, '2024-11-09', 10, 4, 1, 0, 8, 'pass', '2024-11-09 12:09:19', '80.00', '2,1,2,no,1', ''),
(1234567890, 'Rakhi kumari', 14268, 'test-03', 'math', 5, 2, 27995, '2024-11-09', 10, 5, 0, 0, 10, 'pass', '2024-11-09 12:11:02', '100.00', '2,1,2,1,1', ''),
(16516, 'Saurav Kumar ', 32975, 'test-01', 'Aptitude', 10, 10, 27995, '2024-11-13', 10, 0, 9, 1, 0, 'fail', '2024-11-14 07:59:24', '0.00', 'no,2,no,no,no,no,no,no,no,no', ''),
(124578, 'RAHUL', 14268, 'test-03', 'math', 5, 2, 27995, '2024-11-19', 10, 1, 0, 4, 2, 'fail', '2024-11-20 07:47:05', '20.00', '4,3,2,4,3', ''),
(35657, 'Dgh', 14268, 'test-03', 'math', 5, 2, 27995, '2024-11-21', 10, 1, 4, 0, 2, 'fail', '2024-11-21 08:19:58', '20.00', 'no,no,2,no,no', ''),
(17456, 'ram', 14268, 'test-03', 'math', 5, 2, 27995, '2024-12-30', 10, 0, 4, 1, 0, 'fail', '2024-12-30 11:47:03', '0.00', 'no,no,no,no,2', ''),
(16588, 'abhay rana', 17496, 'Test-05', 'Testing', 5, 10, 27995, '2025-01-03', 10, 3, 0, 2, 6, 'pass', '2025-01-03 15:47:40', '60.00', '4,2,1,1,1', ''),
(976375, 'rahul', 17496, 'Test-05', 'Testing', 5, 10, 27995, '2025-01-03', 10, 0, 4, 1, 0, 'fail', '2025-01-03 18:57:57', '0.00', '4,no,no,no,no', ''),
(79896, 'aakash', 17496, 'Test-05', 'Testing', 5, 10, 27995, '2025-01-03', 10, 1, 3, 1, 2, 'fail', '2025-01-03 18:58:49', '20.00', 'no,1,4,no,no', ''),
(466759, 'rohan raj', 17496, 'Test-05', 'Testing', 5, 10, 27995, '2025-01-03', 10, 0, 3, 2, 0, 'fail', '2025-01-03 19:03:46', '0.00', '2,2,no,no,no', ''),
(125469, 'roushni', 17496, 'Test-05', 'Testing', 5, 10, 27995, '2025-01-03', 10, 2, 3, 0, 4, 'pass', '2025-01-03 19:13:14', '40.00', 'no,1,1,no,no', ''),
(125468, 'rohit', 17496, 'Test-05', 'Testing', 5, 10, 27995, '2025-01-03', 10, 1, 3, 1, 2, 'fail', '2025-01-03 19:14:33', '20.00', '4,1,no,no,no', 'Verified activity'),
(125467, 'amritansu', 17496, 'Test-05', 'Testing', 5, 10, 27995, '2025-01-03', 10, 1, 3, 1, 2, 'fail', '2025-01-03 19:16:45', '20.00', '4,no,1,no,no', 'Suspicious Activity'),
(16459, 'raman', 17496, 'Test-05', 'Testing', 5, 10, 27995, '2025-01-04', 10, 2, 3, 0, 4, 'pass', '2025-01-04 12:07:45', '40.00', 'no,no,1,1,no', 'Verified activity'),
(16460, 'raman', 17496, 'Test-05', 'Testing', 5, 10, 27995, '2025-01-04', 10, 1, 4, 0, 2, 'fail', '2025-01-04 12:08:50', '20.00', 'no,no,1,no,no', 'Suspicious Activity : Tab Switched'),
(16461, 'raman', 17496, 'Test-05', 'Testing', 5, 10, 27995, '2025-01-04', 10, 3, 2, 0, 6, 'pass', '2025-01-04 12:12:43', '60.00', 'no,no,1,1,1', 'Suspicious Activity : Opening Developer Tool'),
(784456, 'saurav', 17496, 'Test-05', 'Testing', 5, 10, 27995, '2025-01-04', 10, 1, 4, 0, 2, 'fail', '2025-01-04 12:21:40', '20.00', 'no,no,no,1,no', 'Suspicious Activity : Tab Switched'),
(11111, 'gggg', 17496, 'Test-05', 'Testing', 5, 10, 27995, '2025-01-04', 10, 1, 4, 0, 2, 'fail', '2025-01-04 13:30:03', '20.00', 'no,no,no,no,1', 'Suspicious Activity : Tab Switched'),
(15649, 'rohan', 17496, 'Test-05', 'Testing', 5, 10, 27995, '2025-01-09', 10, 1, 4, 0, 2, 'fail', '2025-01-09 14:17:29', '20.00', 'no,1,no,no,no', 'Suspicious Activity : Tab Switched'),
(1444, 'rohan', 17496, 'Test-05', 'Testing', 5, 10, 27995, '2025-01-09', 10, 0, 4, 1, 0, 'fail', '2025-01-09 14:23:39', '0.00', '2,no,no,no,no', 'Suspicious Activity : Tab Switched'),
(16554, 'donaap', 17496, 'Test-05', 'Testing', 5, 10, 27995, '2025-01-09', 10, 0, 4, 1, 0, 'fail', '2025-01-09 14:26:23', '0.00', 'no,no,no,no,2', 'Suspicious Activity : Tab Switched'),
(165894, 'raj', 17496, 'Test-05', 'Testing', 5, 10, 27995, '2025-01-09', 10, 2, 3, 0, 4, 'pass', '2025-01-09 14:29:32', '40.00', '1,no,no,no,1', 'Suspicious Activity : Tab Switched'),
(16546, 'raj', 17496, 'Test-05', 'Testing', 5, 10, 27995, '2025-01-09', 10, 2, 3, 0, 4, 'pass', '2025-01-09 14:30:32', '40.00', 'no,1,no,no,1', 'Suspicious Activity : Tab Switched'),
(16558, 'ram', 17496, 'Test-05', 'Testing', 5, 10, 27995, '2025-01-09', 10, 1, 4, 0, 2, 'fail', '2025-01-09 14:42:55', '20.00', 'no,1,no,no,no', 'Suspicious Activity : Tab Switched'),
(14563, 'ram', 17496, 'Test-05', 'Testing', 5, 10, 27995, '2025-01-09', 10, 2, 3, 0, 4, 'pass', '2025-01-09 14:44:59', '40.00', 'no,no,1,no,1', 'Suspicious Activity : Tab Switched'),
(16497, 'roushan', 17496, 'Test-05', 'Testing', 5, 10, 27995, '2025-01-09', 10, 0, 4, 1, 0, 'fail', '2025-01-09 15:00:44', '0.00', '3,no,no,no,no', 'Verified activity'),
(16342, 'raman', 17496, 'Test-05', 'Testing', 5, 10, 27995, '2025-01-09', 10, 1, 4, 0, 2, 'fail', '2025-01-09 15:17:47', '20.00', 'no,no,no,1,no', 'Verified activity'),
(14789, 'hari', 17496, 'Test-05', 'Testing', 5, 10, 27995, '2025-01-09', 10, 1, 4, 0, 2, 'fail', '2025-01-09 15:18:27', '20.00', 'no,no,no,1,no', 'Suspicious Activity : Tab Switched'),
(12369, 'raj', 17496, 'Test-05', 'Testing', 5, 10, 27995, '2025-01-09', 10, 1, 4, 0, 2, 'fail', '2025-01-09 15:22:25', '20.00', 'no,no,no,1,no', 'Suspicious Activity : Opening Developer Tool'),
(15963, 'rohan', 17496, 'Test-05', 'Testing', 5, 10, 27995, '2025-01-09', 10, 2, 3, 0, 4, 'pass', '2025-01-09 15:23:42', '40.00', '1,no,no,1,no', 'Verified activity'),
(15964, 'rohan', 17496, 'Test-05', 'Testing', 5, 10, 27995, '2025-01-09', 10, 1, 4, 0, 2, 'fail', '2025-01-09 15:25:27', '20.00', 'no,no,no,no,1', 'Suspicious Activity : leaving test'),
(15965, 'rohan', 17496, 'Test-05', 'Testing', 5, 10, 27995, '2025-01-09', 10, 2, 2, 1, 4, 'pass', '2025-01-09 15:27:22', '40.00', 'no,1,4,no,1', 'Suspicious Activity : Tab Switched'),
(1234587, 'rohan', 17496, 'Test-05', 'Testing', 5, 10, 27995, '2025-01-09', 10, 2, 2, 1, 4, 'pass', '2025-01-09 15:28:24', '40.00', 'no,no,4,1,1', 'Suspicious Activity : Opening Developer Tool'),
(12580, 'anjali', 17496, 'Test-05', 'Testing', 5, 10, 27995, '2025-01-09', 10, 5, 0, 0, 10, 'pass', '2025-01-10 03:03:53', '100.00', '1,1,1,1,1', 'Verified activity'),
(1000, 'kriti', 17496, 'Test-05', 'Testing', 5, 10, 27995, '2025-01-16', 10, 2, 2, 1, 4, 'pass', '2025-01-16 12:11:12', '40.00', 'no,1,4,no,1', 'Suspicious Activity : Tab Switched'),
(12589, 'FRANKLIN', 17496, 'Test-05', 'Testing', 5, 10, 27995, '2025-01-18', 10, 1, 4, 0, 2, 'fail', '2025-01-18 10:56:25', '20.00', 'no,no,no,no,1', 'Suspicious Activity : Tab Switched'),
(49567, 'abhay', 17496, 'Test-05', 'Testing', 5, 10, 27995, '2025-01-24', 10, 1, 4, 0, 2, 'fail', '2025-01-25 06:57:55', '20.00', 'no,1,no,no,no', 'Suspicious Activity : Tab Switched'),
(45782, 'rammm', 17496, 'Test-05', 'Testing', 5, 10, 27995, '2025-03-19', 10, 2, 3, 0, 4, 'pass', '2025-03-19 09:59:10', '40.00', 'no,1,1,no,no', 'Suspicious Activity : Tab Switched'),
(16588, 'Abhay', 13706, 'Py Test', 'Python', 10, 10, 27995, '2025-06-10', 20, 8, 0, 2, 16, 'pass', '2025-06-10 11:24:45', '80.00', '3,2,4,2,3,2,4,2,3,4', 'Verified activity'),
(16168, 'Manu', 13706, 'Py Test', 'Python', 10, 10, 27995, '2025-06-24', 20, 4, 5, 1, 8, 'pass', '2025-06-24 10:58:47', '40.00', '3,no,no,no,3,2,no,2,4,no', 'Suspicious Activity : Tab Switched'),
(78945, 'Ram', 13706, 'Py Test', 'Python', 10, 10, 27995, '2025-06-26', 20, 1, 9, 0, 2, 'fail', '2025-06-26 08:19:04', '10.00', 'no,no,no,no,no,no,no,no,3,no', 'Suspicious Activity : Tab Switched'),
(46791, 'Akshar', 73098, 'Jr_Scientist', 'Science', 10, 10, 27995, '2025-07-03', 20, 9, 0, 1, 18, 'pass', '2025-07-04 03:40:39', '90.00', '3,2,2,2,4,3,3,3,3,4', 'Verified activity');

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE `teachers` (
  `teacher_id` int(11) NOT NULL,
  `teacher_name` varchar(255) NOT NULL,
  `teacher_pass` varchar(255) NOT NULL,
  `teacher_gender` enum('male','female') NOT NULL,
  `teacher_email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`teacher_id`, `teacher_name`, `teacher_pass`, `teacher_gender`, `teacher_email`) VALUES
(27995, 'Abhay Rana', '$2y$10$U2ELP08pZeWGEkztlGTv3uUOsd4VJ6Y0yvzrw9rFUCNvn7wj7nGGu', 'male', 'abhayrana9608@gmail.com'),
(40710, 'Rana', '$2y$10$4sk3VPZzpN07HgHa0yDhgO3t7j7rxb.YBS.P/WNiLqJssG.7Sb9te', 'male', 'techguru3588@gmail.com'),
(48608, 'Raushan soni', '$2y$10$DpaJTn/t9e78lEjIqNtaO.cC7BFQGGyIOsxRX7YwTxXVKZ9eh6YYe', 'male', NULL),
(50868, 'Sashi Singh', '$2y$10$NH/GNTBrB2LW.5I/6FHOGeKSbVGwgly6R0BRfRmLrBjGq31EP/g9W', 'male', 'sashiranjankumarsingh3716@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `teacher_test`
--

CREATE TABLE `teacher_test` (
  `teacher_id` int(11) DEFAULT NULL,
  `teacher_name` varchar(255) DEFAULT NULL,
  `test_id` int(11) NOT NULL,
  `test_name` varchar(255) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `test_date` date DEFAULT NULL,
  `total_marks` int(11) DEFAULT NULL,
  `total_questions` int(11) DEFAULT NULL,
  `total_time` int(11) DEFAULT NULL,
  `reg_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teacher_test`
--

INSERT INTO `teacher_test` (`teacher_id`, `teacher_name`, `test_id`, `test_name`, `subject`, `test_date`, `total_marks`, `total_questions`, `total_time`, `reg_date`) VALUES
(27995, 'Abhay Rana', 13706, 'Py Test', 'Python', '0000-00-00', 20, 10, 10, '2025-06-10 11:15:17'),
(27995, 'Abhay Rana', 14268, 'test-03', 'math', '0000-00-00', 10, 5, 2, '2024-09-26 09:49:40'),
(27995, 'Abhay Rana', 17496, 'Test-05', 'Testing', '0000-00-00', 10, 5, 10, '2025-01-03 15:40:53'),
(27995, 'Abhay Rana', 32975, 'test-01', 'Aptitude', '0000-00-00', 10, 10, 10, '2024-09-24 04:51:24'),
(27995, 'Abhay Rana', 57924, 'test-04', 'mTH', '0000-00-00', 45, 4, 4, '2025-01-18 10:52:39'),
(27995, 'Abhay Rana', 73098, 'Jr_Scientist', 'Science', '0000-00-00', 20, 10, 10, '2025-07-04 03:33:25');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `13706Py_Test27995`
--
ALTER TABLE `13706Py_Test27995`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `14268test_0327995`
--
ALTER TABLE `14268test_0327995`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `17496Test_0527995`
--
ALTER TABLE `17496Test_0527995`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `32975test_0127995`
--
ALTER TABLE `32975test_0127995`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `57924test_0427995`
--
ALTER TABLE `57924test_0427995`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `73098Jr_Scientist27995`
--
ALTER TABLE `73098Jr_Scientist27995`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `publish`
--
ALTER TABLE `publish`
  ADD KEY `test_id` (`test_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD KEY `fk_test` (`test_id`),
  ADD KEY `fk_teacher` (`teacher_id`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`teacher_id`),
  ADD UNIQUE KEY `teacher_email` (`teacher_email`);

--
-- Indexes for table `teacher_test`
--
ALTER TABLE `teacher_test`
  ADD PRIMARY KEY (`test_id`),
  ADD KEY `teacher_id` (`teacher_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `13706Py_Test27995`
--
ALTER TABLE `13706Py_Test27995`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `14268test_0327995`
--
ALTER TABLE `14268test_0327995`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `17496Test_0527995`
--
ALTER TABLE `17496Test_0527995`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `32975test_0127995`
--
ALTER TABLE `32975test_0127995`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `57924test_0427995`
--
ALTER TABLE `57924test_0427995`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `73098Jr_Scientist27995`
--
ALTER TABLE `73098Jr_Scientist27995`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `teachers`
--
ALTER TABLE `teachers`
  MODIFY `teacher_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98141;

--
-- AUTO_INCREMENT for table `teacher_test`
--
ALTER TABLE `teacher_test`
  MODIFY `test_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98567;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `publish`
--
ALTER TABLE `publish`
  ADD CONSTRAINT `publish_ibfk_1` FOREIGN KEY (`test_id`) REFERENCES `teacher_test` (`test_id`);

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `fk_teacher` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`teacher_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_test` FOREIGN KEY (`test_id`) REFERENCES `teacher_test` (`test_id`) ON DELETE CASCADE;

--
-- Constraints for table `teacher_test`
--
ALTER TABLE `teacher_test`
  ADD CONSTRAINT `teacher_test_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`teacher_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
