-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: biocan
-- ------------------------------------------------------
-- Server version	8.0.41

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
-- Table structure for table `multimedia`
--

DROP TABLE IF EXISTS `multimedia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `multimedia` (
  `id` int NOT NULL AUTO_INCREMENT,
  `producto_id` int NOT NULL,
  `url` text NOT NULL,
  `tipo` enum('imagen','video') NOT NULL DEFAULT 'imagen',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `producto_id` (`producto_id`),
  CONSTRAINT `multimedia_ibfk_1` FOREIGN KEY (`producto_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `multimedia`
--

LOCK TABLES `multimedia` WRITE;
/*!40000 ALTER TABLE `multimedia` DISABLE KEYS */;
INSERT INTO `multimedia` VALUES (19,42,'file-1746788515692-936177414.jpg','imagen','2025-05-09 11:01:55','2025-05-09 11:01:55'),(20,43,'file-1746788544574-994474175.jpg','imagen','2025-05-09 11:02:24','2025-05-09 11:02:24'),(21,44,'file-1746788582114-633532607.jpg','imagen','2025-05-09 11:03:02','2025-05-09 11:03:02'),(22,45,'file-1746788611727-253830088.jpg','imagen','2025-05-09 11:03:31','2025-05-09 11:03:31'),(23,46,'file-1746788646439-396600548.jpg','imagen','2025-05-09 11:04:06','2025-05-09 11:04:06');
/*!40000 ALTER TABLE `multimedia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderdetails`
--

DROP TABLE IF EXISTS `orderdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderdetails` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pedido_id` int NOT NULL,
  `producto_id` int NOT NULL,
  `cantidad` int NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `pedido_id` (`pedido_id`),
  KEY `producto_id` (`producto_id`),
  CONSTRAINT `orderdetails_ibfk_1` FOREIGN KEY (`pedido_id`) REFERENCES `orders` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `orderdetails_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderdetails`
--

LOCK TABLES `orderdetails` WRITE;
/*!40000 ALTER TABLE `orderdetails` DISABLE KEYS */;
INSERT INTO `orderdetails` VALUES (6,6,46,1,2.50,'2025-05-09 11:07:30','2025-05-09 11:07:30'),(7,7,43,2,0.50,'2025-05-12 07:13:56','2025-05-12 07:13:56'),(8,8,42,5,2.00,'2025-05-13 07:29:16','2025-05-13 07:29:16');
/*!40000 ALTER TABLE `orderdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `comprador_id` int NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `estado` enum('pendiente','confirmado','enviado','entregado','cancelado') NOT NULL DEFAULT 'pendiente',
  `direccion_envio` varchar(255) NOT NULL,
  `metodo_pago` enum('transferencia','tarjeta') NOT NULL,
  `fecha_pedido` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `comprador_id` (`comprador_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`comprador_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,1,59.80,'pendiente','','transferencia','2025-05-05 10:01:51','2025-05-05 10:01:51','2025-05-05 10:01:51'),(2,1,80.00,'pendiente','C/ Luis Martínez 21','transferencia','2025-05-05 11:01:39','2025-05-05 11:01:39','2025-05-05 11:01:39'),(3,1,80.00,'pendiente','C/ Luis Martínez 21','transferencia','2025-05-05 11:44:51','2025-05-05 11:44:51','2025-05-05 11:44:51'),(4,1,2.00,'pendiente','C/ Luis Martínez 21','transferencia','2025-05-05 14:14:37','2025-05-05 14:14:37','2025-05-05 14:14:37'),(5,1,2.00,'pendiente','C/ Luis Martínez 21','transferencia','2025-05-05 14:30:29','2025-05-05 14:30:29','2025-05-05 14:30:29'),(6,1,2.50,'pendiente','C/ Luis Martínez 21','transferencia','2025-05-09 11:07:30','2025-05-09 11:07:30','2025-05-09 11:07:30'),(7,1,1.00,'pendiente','C/ Luis Martínez 21','transferencia','2025-05-12 07:13:56','2025-05-12 07:13:56','2025-05-12 07:13:56'),(8,1,10.00,'pendiente','C/ Luis Martínez 21','transferencia','2025-05-13 07:29:16','2025-05-13 07:29:16','2025-05-13 07:29:16');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text,
  `precio` decimal(10,2) NOT NULL,
  `unidad_medida` enum('kg','unidad') NOT NULL DEFAULT 'unidad',
  `stock` int unsigned NOT NULL DEFAULT '1',
  `categoria` enum('frutas','verduras','granos','otros') NOT NULL,
  `ubicacion` varchar(255) DEFAULT NULL,
  `estado` enum('disponible','agotado','poco stock') DEFAULT 'disponible',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (42,2,'Aguacates','Caja de Aguacates',2.00,'unidad',10,'verduras',NULL,'poco stock','2025-05-09 11:01:55','2025-05-14 14:03:32'),(43,2,'Cerezas','Caja de Cerezas',0.50,'unidad',18,'frutas',NULL,'disponible','2025-05-09 11:02:24','2025-05-12 07:13:56'),(44,2,'Naranjas','Caja de Naranjas',0.99,'kg',100,'frutas',NULL,'disponible','2025-05-09 11:03:02','2025-05-09 11:03:02'),(45,2,'Pepinos','Caja de Pepinos',2.00,'unidad',20,'verduras',NULL,'disponible','2025-05-09 11:03:31','2025-05-09 11:03:31'),(46,2,'Tomates','Tomates variados',2.50,'kg',20,'frutas',NULL,'disponible','2025-05-09 11:04:06','2025-05-09 11:07:30');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ratings`
--

DROP TABLE IF EXISTS `ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ratings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `agricultor_id` int NOT NULL,
  `comprador_id` int NOT NULL,
  `pedido_id` int NOT NULL,
  `puntuacion` int NOT NULL,
  `comentario` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `agricultor_id` (`agricultor_id`),
  KEY `comprador_id` (`comprador_id`),
  KEY `pedido_id` (`pedido_id`),
  CONSTRAINT `ratings_ibfk_1` FOREIGN KEY (`agricultor_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ratings_ibfk_2` FOREIGN KEY (`comprador_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ratings_ibfk_3` FOREIGN KEY (`pedido_id`) REFERENCES `orders` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ratings`
--

LOCK TABLES `ratings` WRITE;
/*!40000 ALTER TABLE `ratings` DISABLE KEYS */;
/*!40000 ALTER TABLE `ratings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `tipo` enum('agricultor','comprador','admin') NOT NULL,
  `password` varchar(255) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `ubicacion` varchar(255) DEFAULT NULL,
  `descripcion` text,
  `web` varchar(255) DEFAULT NULL,
  `redes_sociales` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Jorge','comprador','$2b$10$j84qFfnM5vv5Kpqezn8ge.cPwE9JLpomJpgKDtFwxGsjBwgmmQpo.','693601413','C/ Luis Martínez 21','','','','','2025-04-09 13:16:42','2025-05-16 08:55:12'),(2,'Javier','agricultor','$2b$10$J0sqUNIhAkL88BkqBzyKvOev1erORRlYUgzea15pMilQTQ4m7mGHS','658631412','','Padierniga','Ganadero de fin de semana','www.lomoplateado.es','','2025-04-09 13:35:41','2025-05-16 08:54:44'),(5,'admin1','admin','$2b$10$7nL6FQRt1QTY7srhzI7SOOzSzOOk2/AYxTppJ5fvIa4cGeE39Qxye',NULL,NULL,NULL,NULL,NULL,NULL,'2025-04-16 11:13:06','2025-04-16 11:13:06');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-16 14:52:09
