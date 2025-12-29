-- ============================================================
-- Schéma MySQL/MariaDB - Projet Géolocalisation Véhicules (GPS+GSM)
-- Base : Coordonnee
-- Table : Valeur (positions reçues via SMS)
-- ============================================================

-- Crée la base si elle n'existe pas
CREATE DATABASE IF NOT EXISTS `Coordonnee`
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_general_ci;

USE `Coordonnee`;

-- Supprime la table si elle existe (réinstallation propre)
DROP TABLE IF EXISTS `Valeur`;

-- Table des coordonnées / positions
CREATE TABLE `Valeur` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `annee` INT(4) NOT NULL,
  `mois` INT(2) NOT NULL,
  `jour` INT(2) NOT NULL,
  `heure` TIME NOT NULL,
  `latitude` FLOAT NOT NULL,
  `longitude` FLOAT NOT NULL,
  `altitude` INT(8) NOT NULL,
  `vitesse` INT(4) NOT NULL,

  PRIMARY KEY (`id`),

  -- Index utile pour les recherches par date/heure (historique)
  INDEX `idx_date` (`annee`, `mois`, `jour`, `heure`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- Exemple d'import :
--   mysql -u root -p < schema.sql
-- ============================================================
