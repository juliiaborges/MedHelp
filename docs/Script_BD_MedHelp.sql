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
CREATE SCHEMA IF NOT EXISTS `mydb` ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`agendamento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`agendamento` (
  `id_agendamento` INT NOT NULL AUTO_INCREMENT,
  `data_agendamento` DATE NOT NULL,
  `horario_agendamento` TIME NOT NULL,
  PRIMARY KEY (`id_agendamento`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`medicos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`medicos` (
  `id_medicos` INT NOT NULL AUTO_INCREMENT,
  `email_medico` CHAR(45) CHARACTER SET 'utf8mb3' NOT NULL,
  `especialidade_medico` VARCHAR(225) COLLATE 'utf8mb3_unicode_ci' NOT NULL,
  `nome_medico` VARCHAR(225) CHARACTER SET 'utf8mb3' NOT NULL,
  `telefone_medico` CHAR(20) CHARACTER SET 'utf8mb3' NOT NULL,
  `uf_medico` CHAR(22) CHARACTER SET 'utf8mb3' NOT NULL,
  `crm_medico` CHAR(12) CHARACTER SET 'utf8mb3' NOT NULL,
  `situacao_medico` CHAR(20) CHARACTER SET 'utf8mb3' NOT NULL,
  `agendamento_id_agendamento` INT NULL DEFAULT NULL,
  `dia_disponivel` VARCHAR(45) COLLATE 'utf8mb3_unicode_ci' NULL DEFAULT NULL,
  `horario_disponivel_inicio` TIME NULL DEFAULT NULL,
  `horario_disponivel_fim` TIME NULL DEFAULT NULL,
  PRIMARY KEY (`id_medicos`))
ENGINE = InnoDB
AUTO_INCREMENT = 21;


-- -----------------------------------------------------
-- Table `mydb`.`pacientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`pacientes` (
  `cpf_paciente` VARCHAR(11) NOT NULL,
  `nome_paciente` VARCHAR(50) NULL DEFAULT NULL,
  `data_nascimento_paciente` VARCHAR(50) NULL DEFAULT NULL,
  `alergias_paciente` VARCHAR(45) NULL DEFAULT NULL,
  `cirurgias_paciente` VARCHAR(45) NULL DEFAULT NULL,
  `telefone_paciente` VARCHAR(20) NULL DEFAULT NULL,
  `possui_plano` VARCHAR(5) NULL DEFAULT NULL,
  `observacoes_paciente` VARCHAR(150) NULL DEFAULT NULL,
  `prontuario_id_prontuario` INT NULL DEFAULT NULL,
  PRIMARY KEY (`cpf_paciente`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`consulta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`consulta` (
  `id_consulta` INT NOT NULL AUTO_INCREMENT,
  `medicos_id_medicos` INT NOT NULL,
  `historico_consultas` VARCHAR(45) NULL DEFAULT NULL,
  `data_pagamento` VARCHAR(45) NULL DEFAULT NULL,
  `paciente_cpf_paciente` VARCHAR(11) NOT NULL,
  PRIMARY KEY (`id_consulta`),
  INDEX `fk_consulta_medicos1_idx` (`medicos_id_medicos` ASC) VISIBLE,
  INDEX `fk_consulta_paciente1_idx` (`paciente_cpf_paciente` ASC) VISIBLE,
  CONSTRAINT `fk_consulta_medicos1`
    FOREIGN KEY (`medicos_id_medicos`)
    REFERENCES `mydb`.`medicos` (`id_medicos`),
  CONSTRAINT `fk_consulta_paciente1`
    FOREIGN KEY (`paciente_cpf_paciente`)
    REFERENCES `mydb`.`pacientes` (`cpf_paciente`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`estoques`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`estoques` (
  `id_equipamento` INT NOT NULL AUTO_INCREMENT,
  `nome_equipamento` VARCHAR(45) NULL DEFAULT NULL,
  `quant_Equipamento` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id_equipamento`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`funcionario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`funcionario` (
  `id_funcionario` INT NOT NULL AUTO_INCREMENT,
  `cpf_funcionario` INT NOT NULL,
  `nome_funcionario` CHAR(20) NOT NULL,
  `funcao_funcionario` CHAR(20) NULL DEFAULT NULL,
  `telefone_funcionario` INT NULL DEFAULT NULL,
  `email_funcionario` CHAR(45) NULL DEFAULT NULL,
  `agendamento_id_agendamento` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id_funcionario`),
  INDEX `agendamento_id_agendamento` (`agendamento_id_agendamento` ASC) VISIBLE,
  CONSTRAINT `agendamento_id_agendamento`
    FOREIGN KEY (`agendamento_id_agendamento`)
    REFERENCES `mydb`.`agendamento` (`id_agendamento`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`funcionario_estoque`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`funcionario_estoque` (
  `quant_retirada` INT NULL DEFAULT NULL,
  `funcionario_id_funcionario` INT NOT NULL,
  `estoque_id_equipamento` INT NOT NULL,
  INDEX `fk_funcionario_estoque_funcionario1_idx` (`funcionario_id_funcionario` ASC) VISIBLE,
  INDEX `fk_funcionario_estoque_estoque1_idx` (`estoque_id_equipamento` ASC) VISIBLE,
  CONSTRAINT `fk_funcionario_estoque_estoque1`
    FOREIGN KEY (`estoque_id_equipamento`)
    REFERENCES `mydb`.`estoques` (`id_equipamento`),
  CONSTRAINT `fk_funcionario_estoque_funcionario1`
    FOREIGN KEY (`funcionario_id_funcionario`)
    REFERENCES `mydb`.`funcionario` (`id_funcionario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`medicamentos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`medicamentos` (
  `idMedicamento` INT NOT NULL AUTO_INCREMENT,
  `nome_medicamentos` VARCHAR(45) NULL DEFAULT NULL,
  `tempo_de_uso` VARCHAR(45) NULL DEFAULT NULL,
  `dose_medicamento` VARCHAR(45) NULL DEFAULT NULL,
  `frequencia_medicamento` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idMedicamento`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`prontuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`prontuario` (
  `id_prontuario` INT NOT NULL AUTO_INCREMENT,
  `quant_cirurgias` INT NULL DEFAULT NULL,
  `medicos_id_medicos` INT NOT NULL,
  `paciente_cpf_paciente` VARCHAR(11) NOT NULL,
  `nome_paciente` VARCHAR(50) NULL DEFAULT NULL,
  `telefone_paciente` INT NULL DEFAULT NULL,
  `email_paciente` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id_prontuario`),
  INDEX `fk_prontuario_medicos1_idx` (`medicos_id_medicos` ASC) VISIBLE,
  INDEX `fk_prontuario_paciente1_idx` (`paciente_cpf_paciente` ASC) VISIBLE,
  CONSTRAINT `fk_prontuario_medicos1`
    FOREIGN KEY (`medicos_id_medicos`)
    REFERENCES `mydb`.`medicos` (`id_medicos`),
  CONSTRAINT `fk_prontuario_paciente1`
    FOREIGN KEY (`paciente_cpf_paciente`)
    REFERENCES `mydb`.`pacientes` (`cpf_paciente`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`prontuario_medicamento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`prontuario_medicamento` (
  `prontuario_id_prontuario` INT NOT NULL,
  `medicamentos_idMedicamento` INT NOT NULL,
  PRIMARY KEY (`prontuario_id_prontuario`, `medicamentos_idMedicamento`),
  INDEX `fk_prontuario_medicamento_medicamentos1_idx` (`medicamentos_idMedicamento` ASC) VISIBLE,
  CONSTRAINT `fk_prontuario_medicamento_medicamentos1`
    FOREIGN KEY (`medicamentos_idMedicamento`)
    REFERENCES `mydb`.`medicamentos` (`idMedicamento`),
  CONSTRAINT `fk_prontuario_medicamento_prontuario1`
    FOREIGN KEY (`prontuario_id_prontuario`)
    REFERENCES `mydb`.`prontuario` (`id_prontuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
