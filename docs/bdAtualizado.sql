-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`medicos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`medicos` (
  `id_medicos` INT NOT NULL AUTO_INCREMENT,
  `email_medico` CHAR(45) NULL DEFAULT NULL,
  `senha_medico` VARCHAR(45) NULL DEFAULT NULL,
  `especialidade_medico` VARCHAR(225) CHARACTER SET 'utf8mb3' NULL DEFAULT NULL,
  `nome_medico` VARCHAR(225) CHARACTER SET 'utf8mb3' NULL DEFAULT NULL,
  `telefone_medico` CHAR(20) CHARACTER SET 'utf8mb3' NULL DEFAULT NULL,
  `uf_medico` CHAR(22) CHARACTER SET 'utf8mb3' NULL DEFAULT NULL,
  `crm_medico` CHAR(12) CHARACTER SET 'utf8mb3' NULL DEFAULT NULL,
  `situacao_medico` CHAR(20) CHARACTER SET 'utf8mb3' NULL DEFAULT NULL,
  PRIMARY KEY (`id_medicos`))
ENGINE = InnoDB
AUTO_INCREMENT = 30
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mydb`.`pacientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`pacientes` (
  `id_paciente` INT NOT NULL AUTO_INCREMENT,
  `email_paciente` VARCHAR(45) NOT NULL,
  `senha_paciente` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_paciente`))
ENGINE = InnoDB
AUTO_INCREMENT = 15
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`consulta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`consulta` (
  `id_consulta` INT NOT NULL AUTO_INCREMENT,
  `fk_id_medicos` INT NULL DEFAULT NULL,
  `fk_id_paciente` INT NULL DEFAULT NULL,
  `mes_consulta` VARCHAR(15) NULL DEFAULT NULL,
  `dia_consulta` VARCHAR(15) NULL DEFAULT NULL,
  `horario_consulta` VARCHAR(15) NULL DEFAULT NULL,
  PRIMARY KEY (`id_consulta`),
  INDEX `fk_id_medicos_idx` (`fk_id_medicos` ASC) VISIBLE,
  INDEX `fk_id_paciente_idx` (`fk_id_paciente` ASC) VISIBLE,
  CONSTRAINT `fk_id_medicos`
    FOREIGN KEY (`fk_id_medicos`)
    REFERENCES `mydb`.`medicos` (`id_medicos`),
  CONSTRAINT `fk_id_paciente_2`
    FOREIGN KEY (`fk_id_paciente`)
    REFERENCES `mydb`.`pacientes` (`id_paciente`))
ENGINE = InnoDB
AUTO_INCREMENT = 26
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`estoques`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`estoques` (
  `id_estoque` INT NOT NULL AUTO_INCREMENT,
  `nome_estoque` VARCHAR(45) NULL DEFAULT NULL,
  `quant_estoque` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id_estoque`))
ENGINE = InnoDB
AUTO_INCREMENT = 30
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`funcionario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`funcionario` (
  `id_funcionario` INT NOT NULL AUTO_INCREMENT,
  `email_funcionario` VARCHAR(45) NOT NULL,
  `senha_funcionario` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_funcionario`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`pagamentos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`pagamentos` (
  `id_pagamentos` INT NOT NULL AUTO_INCREMENT,
  `fk_id_consulta` INT NULL DEFAULT NULL,
  `data_pagamento` DATE NULL DEFAULT NULL,
  `tipo_pagamento` VARCHAR(45) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
  `valor_pagamento` DOUBLE NULL DEFAULT NULL,
  `possui_plano` TINYINT NULL DEFAULT NULL,
  PRIMARY KEY (`id_pagamentos`),
  INDEX `fk_id_consulta_idx` (`fk_id_consulta` ASC) VISIBLE,
  CONSTRAINT `fk_id_consulta`
    FOREIGN KEY (`fk_id_consulta`)
    REFERENCES `mydb`.`consulta` (`id_consulta`))
ENGINE = InnoDB
AUTO_INCREMENT = 14
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`prontuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`prontuarios` (
  `id_prontuario` INT NOT NULL AUTO_INCREMENT,
  `fk_id_paciente` INT NULL DEFAULT NULL,
  `observacoes_prontuario` VARCHAR(45) NULL DEFAULT NULL,
  `cpf_prontuario` VARCHAR(11) NULL DEFAULT NULL,
  `nome_prontuario` VARCHAR(45) NULL DEFAULT NULL,
  `data_nascimento_prontuario` DATE NULL DEFAULT NULL,
  `telefone_prontuario` VARCHAR(20) NULL DEFAULT NULL,
  `alergias_prontuario` VARCHAR(45) NULL DEFAULT NULL,
  `cirurgias_prontuario` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id_prontuario`),
  INDEX `fk_id_paciente_idx` (`fk_id_paciente` ASC) VISIBLE,
  CONSTRAINT `fk_id_paciente`
    FOREIGN KEY (`fk_id_paciente`)
    REFERENCES `mydb`.`pacientes` (`id_paciente`))
ENGINE = InnoDB
AUTO_INCREMENT = 20
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

USE `mydb` ;

-- -----------------------------------------------------
-- Placeholder table for view `mydb`.`pagamentomaisusado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`pagamentomaisusado` (`tipo_pagamento` INT, `total` INT, `porcentagem` INT);

-- -----------------------------------------------------
-- Placeholder table for view `mydb`.`pagamentoscomplano`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`pagamentoscomplano` (`total_pagamentos` INT, `pagamentos_com_plano` INT, `porcentagem_com_plano` INT);

-- -----------------------------------------------------
-- Placeholder table for view `mydb`.`porcentagempacientescirurgia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`porcentagempacientescirurgia` (`pacientes_cirurgia` INT, `total_pacientes` INT, `porcentagem_cirurgia` INT);

-- -----------------------------------------------------
-- View `mydb`.`pagamentomaisusado`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`pagamentomaisusado`;
USE `mydb`;
CREATE  OR REPLACE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `mydb`.`pagamentomaisusado` AS select `mydb`.`pagamentos`.`tipo_pagamento` AS `tipo_pagamento`,count(0) AS `total`,((count(0) / (select count(0) from `mydb`.`pagamentos`)) * 100) AS `porcentagem` from `mydb`.`pagamentos` group by `mydb`.`pagamentos`.`tipo_pagamento`;

-- -----------------------------------------------------
-- View `mydb`.`pagamentoscomplano`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`pagamentoscomplano`;
USE `mydb`;
CREATE  OR REPLACE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `mydb`.`pagamentoscomplano` AS select count(0) AS `total_pagamentos`,sum((case when (`mydb`.`pagamentos`.`possui_plano` = 1) then 1 else 0 end)) AS `pagamentos_com_plano`,((sum((case when (`mydb`.`pagamentos`.`possui_plano` = 1) then 1 else 0 end)) / count(0)) * 100) AS `porcentagem_com_plano` from `mydb`.`pagamentos` where (month(`mydb`.`pagamentos`.`data_pagamento`) = 6);

-- -----------------------------------------------------
-- View `mydb`.`porcentagempacientescirurgia`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`porcentagempacientescirurgia`;
USE `mydb`;
CREATE  OR REPLACE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `mydb`.`porcentagempacientescirurgia` AS select count(0) AS `pacientes_cirurgia`,(select count(0) from `mydb`.`prontuarios`) AS `total_pacientes`,((count(0) / (select count(0) from `mydb`.`prontuarios`)) * 100) AS `porcentagem_cirurgia` from `mydb`.`prontuarios` where (`mydb`.`prontuarios`.`cirurgias_prontuario` is not null);

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
