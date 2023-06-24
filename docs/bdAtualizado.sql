-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: mydb
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `consulta`
--

DROP TABLE IF EXISTS `consulta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consulta` (
  `id_consulta` int NOT NULL AUTO_INCREMENT,
  `fk_id_medicos` int DEFAULT NULL,
  `fk_id_paciente` int DEFAULT NULL,
  `mes_consulta` varchar(15) DEFAULT NULL,
  `dia_consulta` int DEFAULT NULL,
  `horario_consulta` time DEFAULT NULL,
  PRIMARY KEY (`id_consulta`),
  KEY `fk_id_medicos_idx` (`fk_id_medicos`),
  KEY `fk_id_paciente_idx` (`fk_id_paciente`),
  CONSTRAINT `fk_id_medicos` FOREIGN KEY (`fk_id_medicos`) REFERENCES `medicos` (`id_medicos`),
  CONSTRAINT `fk_id_paciente_2` FOREIGN KEY (`fk_id_paciente`) REFERENCES `pacientes` (`id_paciente`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consulta`
--

LOCK TABLES `consulta` WRITE;
/*!40000 ALTER TABLE `consulta` DISABLE KEYS */;
/*!40000 ALTER TABLE `consulta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estoques`
--

DROP TABLE IF EXISTS `estoques`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estoques` (
  `id_estoque` int NOT NULL AUTO_INCREMENT,
  `nome_estoque` varchar(45) DEFAULT NULL,
  `quant_estoque` int DEFAULT NULL,
  PRIMARY KEY (`id_estoque`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estoques`
--

LOCK TABLES `estoques` WRITE;
/*!40000 ALTER TABLE `estoques` DISABLE KEYS */;
/*!40000 ALTER TABLE `estoques` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `funcionario`
--

DROP TABLE IF EXISTS `funcionario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `funcionario` (
  `id_funcionario` int NOT NULL AUTO_INCREMENT,
  `email_funcionario` varchar(45) NOT NULL,
  `senha_funcionario` varchar(45) NOT NULL,
  PRIMARY KEY (`id_funcionario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funcionario`
--

LOCK TABLES `funcionario` WRITE;
/*!40000 ALTER TABLE `funcionario` DISABLE KEYS */;
/*!40000 ALTER TABLE `funcionario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medicos`
--

DROP TABLE IF EXISTS `medicos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medicos` (
  `id_medicos` int NOT NULL AUTO_INCREMENT,
  `email_medico` char(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `senha_medico` varchar(45) DEFAULT NULL,
  `especialidade_medico` varchar(225) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `nome_medico` varchar(225) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `telefone_medico` char(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `uf_medico` char(22) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `crm_medico` char(12) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `situacao_medico` char(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id_medicos`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicos`
--

LOCK TABLES `medicos` WRITE;
/*!40000 ALTER TABLE `medicos` DISABLE KEYS */;
/*!40000 ALTER TABLE `medicos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pacientes`
--

DROP TABLE IF EXISTS `pacientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pacientes` (
  `id_paciente` int NOT NULL AUTO_INCREMENT,
  `email_paciente` varchar(45) NOT NULL,
  `senha_paciente` varchar(45) NOT NULL,
  PRIMARY KEY (`id_paciente`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pacientes`
--

LOCK TABLES `pacientes` WRITE;
/*!40000 ALTER TABLE `pacientes` DISABLE KEYS */;
/*!40000 ALTER TABLE `pacientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `pagamentomaisusado`
--

DROP TABLE IF EXISTS `pagamentomaisusado`;
/*!50001 DROP VIEW IF EXISTS `pagamentomaisusado`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `pagamentomaisusado` AS SELECT 
 1 AS `tipo_pagamento`,
 1 AS `total`,
 1 AS `porcentagem`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `pagamentos`
--

DROP TABLE IF EXISTS `pagamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pagamentos` (
  `id_pagamentos` int NOT NULL AUTO_INCREMENT,
  `fk_id_consulta` int DEFAULT NULL,
  `data_pagamento` date DEFAULT NULL,
  `tipo_pagamento` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `valor_pagamento` double DEFAULT NULL,
  `possui_plano` tinyint DEFAULT NULL,
  PRIMARY KEY (`id_pagamentos`),
  KEY `fk_id_consulta_idx` (`fk_id_consulta`),
  CONSTRAINT `fk_id_consulta` FOREIGN KEY (`fk_id_consulta`) REFERENCES `consulta` (`id_consulta`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pagamentos`
--

LOCK TABLES `pagamentos` WRITE;
/*!40000 ALTER TABLE `pagamentos` DISABLE KEYS */;
INSERT INTO `pagamentos` VALUES (6,NULL,'2023-06-22','Pix',3200,NULL),(7,NULL,'2023-06-21','Pix',3200,NULL),(8,NULL,'2023-06-29','Boleto',423526534,0),(9,NULL,'2023-07-08','Pix',320,1),(10,NULL,'2023-07-12','Boleto',15067,0),(11,NULL,'2023-07-13','Cartão de crédito',204875,1),(12,NULL,'2023-06-26','Boleto',204876,1);
/*!40000 ALTER TABLE `pagamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `pagamentoscomplano`
--

DROP TABLE IF EXISTS `pagamentoscomplano`;
/*!50001 DROP VIEW IF EXISTS `pagamentoscomplano`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `pagamentoscomplano` AS SELECT 
 1 AS `total_pagamentos`,
 1 AS `pagamentos_com_plano`,
 1 AS `porcentagem_com_plano`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `porcentagempacientescirurgia`
--

DROP TABLE IF EXISTS `porcentagempacientescirurgia`;
/*!50001 DROP VIEW IF EXISTS `porcentagempacientescirurgia`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `porcentagempacientescirurgia` AS SELECT 
 1 AS `pacientes_cirurgia`,
 1 AS `total_pacientes`,
 1 AS `porcentagem_cirurgia`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `prontuarios`
--

DROP TABLE IF EXISTS `prontuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prontuarios` (
  `id_prontuario` int NOT NULL AUTO_INCREMENT,
  `fk_id_paciente` int DEFAULT NULL,
  `observacoes_prontuario` varchar(45) DEFAULT NULL,
  `cpf_prontuario` varchar(11) DEFAULT NULL,
  `nome_prontuario` varchar(45) DEFAULT NULL,
  `data_nascimento_prontuario` date DEFAULT NULL,
  `telefone_prontuario` varchar(20) DEFAULT NULL,
  `alergias_prontuario` varchar(45) DEFAULT NULL,
  `cirurgias_prontuario` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_prontuario`),
  KEY `fk_id_paciente_idx` (`fk_id_paciente`),
  CONSTRAINT `fk_id_paciente` FOREIGN KEY (`fk_id_paciente`) REFERENCES `pacientes` (`id_paciente`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prontuarios`
--

LOCK TABLES `prontuarios` WRITE;
/*!40000 ALTER TABLE `prontuarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `prontuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `pagamentomaisusado`
--

/*!50001 DROP VIEW IF EXISTS `pagamentomaisusado`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `pagamentomaisusado` AS select `pagamentos`.`tipo_pagamento` AS `tipo_pagamento`,count(0) AS `total`,((count(0) / (select count(0) from `pagamentos`)) * 100) AS `porcentagem` from `pagamentos` group by `pagamentos`.`tipo_pagamento` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `pagamentoscomplano`
--

/*!50001 DROP VIEW IF EXISTS `pagamentoscomplano`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `pagamentoscomplano` AS select count(0) AS `total_pagamentos`,sum((case when (`pagamentos`.`possui_plano` = 1) then 1 else 0 end)) AS `pagamentos_com_plano`,((sum((case when (`pagamentos`.`possui_plano` = 1) then 1 else 0 end)) / count(0)) * 100) AS `porcentagem_com_plano` from `pagamentos` where (month(`pagamentos`.`data_pagamento`) = 6) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `porcentagempacientescirurgia`
--

/*!50001 DROP VIEW IF EXISTS `porcentagempacientescirurgia`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `porcentagempacientescirurgia` AS select count(0) AS `pacientes_cirurgia`,(select count(0) from `prontuarios`) AS `total_pacientes`,((count(0) / (select count(0) from `prontuarios`)) * 100) AS `porcentagem_cirurgia` from `prontuarios` where (`prontuarios`.`cirurgias_prontuario` is not null) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-23 23:44:17
