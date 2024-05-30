CREATE DATABASE  IF NOT EXISTS `repse` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `repse`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: repse
-- ------------------------------------------------------
-- Server version	8.3.0

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
-- Table structure for table `declaracionimss`
--

DROP TABLE IF EXISTS `declaracionimss`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `declaracionimss` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Titulo` varchar(45) NOT NULL,
  `LC` varchar(45) NOT NULL,
  `FechaPago` varchar(45) NOT NULL,
  `PeriodoPago` varchar(45) NOT NULL,
  `RazonSocial` varchar(45) NOT NULL,
  `RegistroPatronal` varchar(45) NOT NULL,
  `RFC` varchar(45) NOT NULL,
  `ImporteIMSS` varchar(45) NOT NULL,
  `Total` varchar(45) NOT NULL,
  `Archivo` varchar(45) NOT NULL,
  `FechaProcesamiento` varchar(45) NOT NULL,
  `Remitente` varchar(45) NOT NULL,
  `Asunto` varchar(45) NOT NULL,
  `Ejercicio` varchar(45) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `declaracionimss`
--

LOCK TABLES `declaracionimss` WRITE;
/*!40000 ALTER TABLE `declaracionimss` DISABLE KEYS */;
INSERT INTO `declaracionimss` VALUES (1,'Dec imss','84','12-03-2023','MARZO','Empresa_1','dsouhsod','VMT','2','2','decimss.pdf','28-05-2024','sally','si','');
/*!40000 ALTER TABLE `declaracionimss` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `declaracionisr`
--

DROP TABLE IF EXISTS `declaracionisr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `declaracionisr` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `RFC` varchar(45) NOT NULL,
  `RS` varchar(45) NOT NULL,
  `Ejercicio` varchar(45) NOT NULL,
  `Periodo` varchar(45) NOT NULL,
  `ConceptoIVA` varchar(45) NOT NULL,
  `IVA` varchar(45) NOT NULL,
  `NombreArchivo` varchar(45) NOT NULL,
  `Administracion` varchar(45) NOT NULL,
  `ACargoISR` varchar(45) NOT NULL,
  `ObvservacionISRSyS` varchar(45) NOT NULL,
  `Titulo` varchar(45) NOT NULL,
  `LineaCaptura` varchar(45) NOT NULL,
  `TotalPagado` varchar(45) NOT NULL,
  `TipoDeclaracion` varchar(45) NOT NULL,
  `NumOperacion` varchar(45) NOT NULL,
  `FechaProcesamiento` varchar(45) NOT NULL,
  `Remitente` varchar(45) NOT NULL,
  `Asunto` varchar(45) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `declaracionisr`
--

LOCK TABLES `declaracionisr` WRITE;
/*!40000 ALTER TABLE `declaracionisr` DISABLE KEYS */;
INSERT INTO `declaracionisr` VALUES (1,'VMT','Si','2024','Marzo','no','8','iva.pdf','sat','8','no','dec federales','98','5','ISR','8','25-05-2024','sally','si');
/*!40000 ALTER TABLE `declaracionisr` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pagoimss`
--

DROP TABLE IF EXISTS `pagoimss`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pagoimss` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Folio SUA` varchar(45) NOT NULL,
  `Titulo` varchar(45) NOT NULL,
  `Periodo` varchar(45) NOT NULL,
  `Ejercicio` varchar(45) NOT NULL,
  `LC` varchar(45) NOT NULL,
  `RegistroPatronal` varchar(45) NOT NULL,
  `Importe IMSS` varchar(45) NOT NULL,
  `ImporteRCV` varchar(45) NOT NULL,
  `ImporteVIV` varchar(45) NOT NULL,
  `ImporteACV` varchar(45) NOT NULL,
  `Total a pagar` varchar(45) NOT NULL,
  `Banco` varchar(45) NOT NULL,
  `FechaPago` varchar(45) NOT NULL,
  `Archivo` varchar(45) NOT NULL,
  `FechaProcesamiento` varchar(45) NOT NULL,
  `Remitente` varchar(45) NOT NULL,
  `Asunto` varchar(45) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pagoimss`
--

LOCK TABLES `pagoimss` WRITE;
/*!40000 ALTER TABLE `pagoimss` DISABLE KEYS */;
INSERT INTO `pagoimss` VALUES (1,'9','Si','Marzo','2024','9595','sfousnfduns','95','95','95','955','95559','BBVA','25-05-2024','saijs.pdf','27-05-2024','sally','asa');
/*!40000 ALTER TABLE `pagoimss` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pagoisr`
--

DROP TABLE IF EXISTS `pagoisr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pagoisr` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Titulo` varchar(45) NOT NULL,
  `LineaCaptura` varchar(45) NOT NULL,
  `FechaPago` varchar(45) NOT NULL,
  `TotalAPagar` varchar(45) NOT NULL,
  `Banco` varchar(45) NOT NULL,
  `NombreSolicitante` varchar(45) NOT NULL,
  `NombreArchivo` varchar(45) NOT NULL,
  `FechaProcesamiento` varchar(45) NOT NULL,
  `Remitente` varchar(45) NOT NULL,
  `Asunto` varchar(45) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pagoisr`
--

LOCK TABLES `pagoisr` WRITE;
/*!40000 ALTER TABLE `pagoisr` DISABLE KEYS */;
INSERT INTO `pagoisr` VALUES (1,'federales','9449849','25-05-2024','9898','BBVA','SI','ijij.pdf','27-05-2024','sally','di');
/*!40000 ALTER TABLE `pagoisr` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-29 12:55:51
