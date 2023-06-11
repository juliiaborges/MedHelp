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
  `email_medico` CHAR(45) CHARACTER SET 'utf8mb3' NOT NULL,
  `senha_medico` VARCHAR(45) NULL DEFAULT NULL,
  `especialidade_medico` VARCHAR(225) CHARACTER SET 'utf8mb3' NOT NULL,
  `nome_medico` VARCHAR(225) CHARACTER SET 'utf8mb3' NOT NULL,
  `telefone_medico` CHAR(20) CHARACTER SET 'utf8mb3' NOT NULL,
  `uf_medico` CHAR(22) CHARACTER SET 'utf8mb3' NOT NULL,
  `crm_medico` CHAR(12) CHARACTER SET 'utf8mb3' NOT NULL,
  `situacao_medico` CHAR(20) CHARACTER SET 'utf8mb3' NOT NULL,
  PRIMARY KEY (`id_medicos`))
ENGINE = InnoDB
AUTO_INCREMENT = 26
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
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`consulta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`consulta` (
  `id_consulta` INT NOT NULL AUTO_INCREMENT,
  `fk_id_medicos` INT NULL DEFAULT NULL,
  `fk_id_paciente` INT NULL DEFAULT NULL,
  `mes_consulta` VARCHAR(15) NULL DEFAULT NULL,
  `dia_consulta` INT NULL DEFAULT NULL,
  `horario_consulta` TIME NULL DEFAULT NULL,
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
AUTO_INCREMENT = 12
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
AUTO_INCREMENT = 27
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
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`pagamentos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`pagamentos` (
  `id_pagamentos` INT NOT NULL AUTO_INCREMENT,
  `fk_id_consulta` INT NULL DEFAULT NULL,
  `data_pagamento` DATE NULL DEFAULT NULL,
  `tipo_pagamento` VARCHAR(255) NULL DEFAULT NULL,
  `valor_pagamento` DOUBLE NULL DEFAULT NULL,
  `possui_plano` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id_pagamentos`),
  INDEX `fk_id_consulta_idx` (`fk_id_consulta` ASC) VISIBLE,
  CONSTRAINT `fk_id_consulta`
    FOREIGN KEY (`fk_id_consulta`)
    REFERENCES `mydb`.`consulta` (`id_consulta`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


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
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
