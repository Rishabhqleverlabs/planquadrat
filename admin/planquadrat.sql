-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 19, 2018 at 07:15 PM
-- Server version: 10.1.25-MariaDB
-- PHP Version: 7.1.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `planquadrat`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `uname` varchar(50) NOT NULL,
  `passwd` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `uname`, `passwd`) VALUES
(1, 'admin', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `id` int(11) NOT NULL,
  `blogtitle` longtext NOT NULL,
  `dates` date NOT NULL,
  `images` varchar(250) NOT NULL,
  `headertext` longtext NOT NULL,
  `bodytext` longtext NOT NULL,
  `contractor` text,
  `projecttype` text,
  `relatedprojects` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`id`, `blogtitle`, `dates`, `images`, `headertext`, `bodytext`, `contractor`, `projecttype`, `relatedprojects`) VALUES
(51, 'sadfjkl;ewruiop', '2016-11-30', ' 1523862411-csm_11010-titelbild-01_62a0f9f6f33510.jpg', '<p>sadfgjkl;euio</p>', 'resdfgjkl;fjkl', 'contractor', 'project type', ''),
(53, 'jdfhkjsdhfkjsdhfjsdhj', '2012-08-27', ' 1523864898-csm_chronik-2011-03-thumbnail_7840155d768888.jpg', '<p>jhdkjhfkjsdhfskjdh</p>', 'kjhkjdhfkjsdhfkjsdh', 'contractor', 'project type', ''),
(54, 'asdfghjkl', '2016-10-29', ' 1523867470-csm_chronik-2009-03_fb255c88767770.jpg 1523867470-csm_jasmin-winter-03_02c903f2da9d57.jpg 1523867470-csm_sabrina_stelz-03_c4d393fbdfff92.jpg 1523867470-csm_chronik-2009-03_fb255c88767770.jpg', '<p>wertyuio</p>', 'ertgyhjkl;', 'contractor', 'project type', ''),
(55, 'asdfghjklertyui', '2016-11-30', ' 1523871467-csm_boys_day_2017_4a5354ae963485.jpg 1523871467-csm_chronik-2009-03_1b9186df247770.jpg 1523871467-csm_chronik-2011-03-thumbnail_7840155d768888.jpg', '<p>sedghjkl;dfghjkl</p>', 'fghjkl;dfgh', 'building contractor', 'project type', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
