CREATE DATABASE  IF NOT EXISTS `task` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `task`;
-- MySQL dump 10.13  Distrib 8.0.31, for macos12 (x86_64)
--
-- Host: 127.0.0.1    Database: task
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `tbBoard`
--

DROP TABLE IF EXISTS `tbBoard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbBoard` (
  `board_seq` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT '' COMMENT '게시판 제목',
  `content` varchar(500) DEFAULT '' COMMENT '게시판 내용',
  `writer` varchar(50) DEFAULT '' COMMENT '작성자',
  `passwd` varchar(100) DEFAULT '' COMMENT '게시판 비밀번호',
  `is_delete` tinyint(1) DEFAULT '0' COMMENT '삭제여부',
  `create_dt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '생성일시',
  `update_dt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '수정일시',
  PRIMARY KEY (`board_seq`),
  KEY `idx_title` (`title`),
  KEY `idx_writer` (`writer`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tbComment`
--

DROP TABLE IF EXISTS `tbComment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbComment` (
  `comment_seq` int NOT NULL AUTO_INCREMENT COMMENT '댓글 seq',
  `board_seq` int NOT NULL COMMENT '게시판 seq',
  `parent_comment_seq` int DEFAULT NULL COMMENT '부모 댓글 seq',
  `content` varchar(500) DEFAULT '' COMMENT '댓글 내용',
  `writer` varchar(50) DEFAULT '' COMMENT '작성자',
  `create_dt` datetime(6) DEFAULT CURRENT_TIMESTAMP(6) COMMENT '작성일',
  PRIMARY KEY (`comment_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-15 17:38:13
