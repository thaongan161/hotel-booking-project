-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: booking_db
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking` (
  `booking_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `room_id` int DEFAULT NULL,
  `check_in_date` date DEFAULT NULL,
  `check_out_date` date DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `room_number` int NOT NULL,
  PRIMARY KEY (`booking_id`),
  KEY `user_id` (`user_id`),
  KEY `booking_ibfk_2` (`room_id`),
  CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking`
--

LOCK TABLES `booking` WRITE;
/*!40000 ALTER TABLE `booking` DISABLE KEYS */;
INSERT INTO `booking` VALUES (1,1,2,'2025-07-01','2025-07-05','confirmed','2025-06-26 13:06:00',0),(2,1,5,'2025-07-10','2025-07-12','pending','2025-06-26 13:06:00',0),(3,1,12,'2025-08-01','2025-08-03','confirmed','2025-06-26 13:06:00',0),(4,1,15,'2025-08-05','2025-08-08','cancelled','2025-06-26 13:06:00',0),(5,1,18,'2025-09-10','2025-09-12','confirmed','2025-06-26 13:06:00',0),(6,1,1,'2025-07-25','2025-07-27','pending','2025-07-24 15:45:01',0),(7,1,1,'2025-07-25','2025-07-27','pending','2025-07-24 15:54:07',0),(8,1,1,'2025-07-25','2025-07-27','pending','2025-07-24 15:54:43',0),(9,1,1,'2025-07-25','2025-07-27','pending','2025-07-24 15:55:00',0),(10,1,1,'2025-07-25','2025-07-27','pending','2025-07-24 16:01:46',0),(11,1,1,'2025-07-25','2025-07-27','pending','2025-07-24 16:02:12',0),(12,2,1,'2025-07-25','2025-07-27','pending','2025-07-25 10:17:33',0),(13,2,1,'2025-07-25','2025-07-27','pending','2025-07-25 10:31:33',0),(14,2,1,'2025-07-25','2025-07-27','pending','2025-07-25 10:31:36',0),(15,1,1,'2025-07-30','2025-07-31','pending','2025-07-30 14:21:14',0),(16,1,1,'2025-08-06','2025-08-09','pending','2025-07-30 14:26:54',0),(17,1,1,'2025-08-06','2025-08-09','pending','2025-07-30 14:26:58',0),(18,1,1,'2025-07-31','2025-08-02','pending','2025-07-30 14:30:38',0),(19,1,2,'2025-07-30','2025-07-31','pending','2025-07-30 14:32:17',0),(20,1,1,'2025-07-30','2025-07-31','pending','2025-08-01 03:50:47',0),(21,1,1,'2025-07-30','2025-07-31','pending','2025-08-01 03:51:05',0),(22,1,1,'2025-07-30','2025-07-31','pending','2025-08-01 03:51:17',0);
/*!40000 ALTER TABLE `booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hotel`
--

DROP TABLE IF EXISTS `hotel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hotel` (
  `hotel_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `address` varchar(500) DEFAULT NULL,
  `city` varchar(20) NOT NULL DEFAULT 'HCM',
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `description` text,
  `user_id` int DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`hotel_id`),
  KEY `fk_hotel_user` (`user_id`),
  CONSTRAINT `fk_hotel_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hotel`
--

LOCK TABLES `hotel` WRITE;
/*!40000 ALTER TABLE `hotel` DISABLE KEYS */;
INSERT INTO `hotel` VALUES (1,'Mường Thanh Luxury Cần Thơ','Khu E1, Cồn Cái Khế, P. Cái Khế, Q. Ninh Kiều, TP. Cần Thơ','Cần Thơ','0292 376 9679','cantho@muongthanh.vn','Khách sạn 5 sao tọa lạc tại trung tâm thành phố Cần Thơ, bên dòng sông Hậu thơ mộng.',3,'/images/muongthanh_637024250701309058.jpg'),(2,'Sheraton Saigon Hotel & Towers','88 Đồng Khởi, P. Bến Nghé, Quận 1, TP. Hồ Chí Minh','Cần Thơ','028 3827 2828','info@sheratonsaigon.com','Khách sạn cao cấp nằm ở trung tâm Sài Gòn, gần các điểm tham quan nổi tiếng và khu thương mại.',3,'/images/sheraton.jpg'),(3,'Melia Hanoi Hotel','44B Ly Thuong Kiet, Hoan Kiem, Hanoi','Hà Nội','024 3943 8888','hanoi@melia.com','Khách sạn 5 sao sang trọng, nằm ngay trung tâm Hà Nội, gần hồ Hoàn Kiếm.',3,'/images/melia_hanoi.jpg'),(4,'Vinpearl Resort & Spa Phu Quoc','Bai Dai, Phu Quoc, Kien Giang','Phú Quốc','0297 3999 999','phuquoc@vinpearl.com','Resort cao cấp ven biển với khu spa và tiện ích sang trọng.',3,'/images/vinpearl_phuquoc.jpg'),(5,'Pullman Saigon Centre','148 Tran Hung Dao, District 1, Ho Chi Minh City','TP. Hồ Chí Minh','028 3925 8888','saigon@pullman.com','Khách sạn sang trọng, gần các trung tâm thương mại và khu vui chơi.',3,'/images/pullman_saigon.jpg'),(6,'Ana Mandara Hue Hotel','12 Le Loi, Hue','Huế','0234 3822 888','hue@anahotel.com','Khách sạn cổ điển 4 sao với kiến trúc Pháp, gần sông Hương.',3,'/images/ana_mandara_hue.jpg'),(7,'Mia Resort Nha Trang','Nguyen Tat Thanh, Nha Trang','Nha Trang','0258 3567 888','nhatrang@miaresort.com','Resort 5 sao hướng biển, phong cách hiện đại và tiện nghi.',3,'/images/mia_nhatrang.jpg'),(8,'Liberty Central Saigon Riverside','17-19 Ton Duc Thang, District 1, Ho Chi Minh City','TP. Hồ Chí Minh','028 3827 1111','saigon@libertycentral.com','Khách sạn 4 sao ven sông Sài Gòn, gần các điểm tham quan nổi tiếng.',3,'/images/liberty_saigon.jpg'),(9,'The Anam Cam Ranh','Bai Dai, Cam Ranh, Khanh Hoa','Cam Ranh','0258 3950 888','camranh@theanam.com','Resort 5 sao sang trọng ven biển, nhiều tiện ích nghỉ dưỡng cao cấp.',3,'/images/the_anam_camranh.jpg');
/*!40000 ALTER TABLE `hotel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `room_id` int NOT NULL AUTO_INCREMENT,
  `hotel_id` int NOT NULL,
  `room_number` varchar(255) DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  `price` decimal(38,2) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`room_id`),
  UNIQUE KEY `uq_hotel_room` (`hotel_id`,`room_id`),
  CONSTRAINT `FKdosq3ww4h9m2osim6o0lugng8` FOREIGN KEY (`hotel_id`) REFERENCES `hotel` (`hotel_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (1,1,'001','Deluxe Twin',1200000.00,'available','Phòng 2 giường đơn, tầng 3, view sông.'),(2,1,'002','Deluxe King',1300000.00,'booked','Phòng giường đôi lớn, tầng 4, có ban công.'),(3,1,'003','Suite',2500000.00,'available','Phòng suite rộng rãi, tầng 5, phòng khách riêng.'),(4,1,'004','Single',900000.00,'maintenance','Phòng đơn nhỏ, tầng 2, thích hợp cho công tác.'),(5,1,'005','Family Room',1800000.00,'available','Phòng gia đình, 2 giường lớn, tầng 6.'),(6,1,'006','Superior Twin',1100000.00,'booked','Phòng 2 giường đơn, tầng 3, gần thang máy.'),(7,1,'007','Executive Suite',3000000.00,'available','Phòng VIP tầng cao, view thành phố.'),(8,1,'008','Double',1000000.00,'available','Phòng 2 người, thiết kế hiện đại, tầng 2.'),(9,1,'009','Twin Standard',950000.00,'available','Phòng tiêu chuẩn 2 giường đơn.'),(10,1,'101','King View',1350000.00,'maintenance','Phòng giường lớn, view hồ bơi.'),(11,2,'001','Double',155.00,'available','2 beds, garden view'),(12,2,'002','Executive Suite',5000000.00,'booked','Phòng suite VIP, phòng khách riêng, tầng 10.'),(13,2,'003','Junior Suite',4200000.00,'available','Phòng suite nhỏ, nội thất sang trọng.'),(14,2,'004','Grand Deluxe',3500000.00,'available','Phòng rộng, view nhà thờ Đức Bà.'),(15,2,'005','Premium Double',3200000.00,'maintenance','Phòng đôi cao cấp, tầng 7.'),(16,2,'006','Standard Twin',2800000.00,'available','Phòng 2 giường, thiết kế hiện đại.'),(17,2,'007','Luxury King',3800000.00,'booked','Phòng giường lớn, nội thất gỗ cao cấp.'),(18,2,'008','Family Suite',4500000.00,'available','Phòng cho gia đình, 2 giường lớn, tầng 8.'),(19,2,'009','Panoramic View',5200000.00,'available','Phòng view toàn cảnh thành phố, tầng cao.'),(20,2,'101','Studio Room',2700000.00,'available','Phòng studio tiện nghi, phù hợp khách công tác.');
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room_image`
--

DROP TABLE IF EXISTS `room_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room_image` (
  `id` int NOT NULL AUTO_INCREMENT,
  `room_id` int DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKcme41omxvwoj00bhqk7fwt70v` (`room_id`),
  CONSTRAINT `FKcme41omxvwoj00bhqk7fwt70v` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room_image`
--

LOCK TABLES `room_image` WRITE;
/*!40000 ALTER TABLE `room_image` DISABLE KEYS */;
INSERT INTO `room_image` VALUES (1,1,'/images/mt_DeluxeTwin.jpg'),(2,1,'/images/mt_DeluxeTwin2.jpg'),(3,1,'/images/mt_DeluxeTwin3.jpg'),(4,2,'/images/mt_DeluxeKing.jpg'),(5,2,'/images/mt_DeluxeKing2.jpg'),(6,2,'/images/mt_DeluxeKing3.jpg'),(7,10,'/images/sheraton_double.jpg'),(8,10,'/images/sheraton_double2.jpg'),(9,11,'/images/sheraton_ExecutiveSuite.jpg'),(10,11,'/images/sheraton_ExecutiveSuite2.jpg');
/*!40000 ALTER TABLE `room_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `role` varchar(20) DEFAULT 'customer',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Alice Edward','aliceedward@gmail.com','$2a$10$tVyKaNb1lyBoxbrt.pYjhOaWTMqfT/HPz1CdrbH74KfM/KGDdMFgq','0901234567','customer'),(2,'Bob Ethan','bodethan@gmail.com','$2a$10$dI9zB3DDXOLt9NulBVMtR.Z5Sm0P1BhjTqC7OY8/7PmojfZrjimCe','0902345678','customer'),(3,'Celica Ethan','celicaethan@gmail.com','$2a$10$vZaxOUDVZ5WFEF1tcdsRdOaUOEoIVbkTZDOsKvyVEBpTXY/8eysJm','0902345679','hotel_admin'),(16,'test1','test1@gmail.com','$2a$10$9fB0Wjo0jsPnKz0gF7FclOUhMpHQL7jQYj5gx/MJyTguxKkIJlu8C','0123456789','customer'),(17,'test2','tes2t@gmail.com','$2a$10$fsSVgbO/yStpeVPslJpfFeBuOLhfWPuv2FmBA2/YNQOdZ5ORSEas2','0123456789','customer'),(18,'test','test@gmail.com','$2a$10$DZxcIxRoTWZG7CNmrOJQy.bTa1UfuipRxqgdq/xN.5dlE4.xByrGm','0123456789','customer');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-01 13:36:24
