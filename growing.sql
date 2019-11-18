-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Client :  localhost:3306
-- Généré le :  Dim 20 Octobre 2019 à 21:45
-- Version du serveur :  5.7.27-0ubuntu0.18.04.1
-- Version de PHP :  7.2.19-0ubuntu0.18.04.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `growing`
--

-- --------------------------------------------------------

--
-- Structure de la table `booster`
--

CREATE TABLE `booster` (
  `idbooster` int(11) NOT NULL,
  `booster_name` varchar(255) DEFAULT NULL,
  `booster_dose` int(11) DEFAULT NULL,
  `boosterdesc` varchar(255) DEFAULT NULL,
  `booster_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `booster`
--

INSERT INTO `booster` (`idbooster`, `booster_name`, `booster_dose`, `boosterdesc`, `booster_date`) VALUES
(49, 'Canna CannaZym', 4, 'Cannazym déclenche l’activation d’enzymes et ses ingrédients sont essentiels pour la production d’Adenosine Triphosphate (ATP). ATP est une source d’énergie importante pour de nombreux procédés chimiques qui ont lieu dans les problèmes de plantes', '2019-08-01'),
(51, 'Vaalserberg Garden Enzymatrix', 25, 'Cet engrais est en réalité un stimulateur enzymatique, il va permettre l\'assimilation des nutriments par la plante, sa résistance aux stress et aux pathogènes.', '2018-12-29'),
(52, 'Atami Bcuzz Root Stimulator', 2, 'additif qui permet de stimuler le développement racinaire des plantes.', '2018-03-15'),
(53, 'Vaalserberg Garden Phase 4', 3, ' il est est riche en phytohormones minéraux éléments trace vitamines et acides aminés Entièrement biologique, il contient une forte teneur en éliciteurs et phytohormone', '2018-04-25');

-- --------------------------------------------------------

--
-- Structure de la table `culture`
--

CREATE TABLE `culture` (
  `idculture` int(11) NOT NULL,
  `culture_name` varchar(255) NOT NULL,
  `culture_start_date` date NOT NULL,
  `culture_comment` longtext,
  `culture_state` varchar(255) NOT NULL,
  `culture_end_date` date DEFAULT NULL,
  `idculturetype` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `culture`
--

INSERT INTO `culture` (`idculture`, `culture_name`, `culture_start_date`, `culture_comment`, `culture_state`, `culture_end_date`, `idculturetype`) VALUES
(181, 'rtrtr', '2019-10-04', '', 'init', NULL, 2),
(182, 'rerezree', '2019-10-17', '', 'init', NULL, 2);

-- --------------------------------------------------------

--
-- Structure de la table `culturebooster`
--

CREATE TABLE `culturebooster` (
  `idbooster` int(11) NOT NULL,
  `idculture` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `culturebooster`
--

INSERT INTO `culturebooster` (`idbooster`, `idculture`) VALUES
(49, 181),
(51, 181),
(52, 181),
(53, 181),
(49, 182),
(51, 182),
(52, 182),
(53, 182);

-- --------------------------------------------------------

--
-- Structure de la table `culturecycle`
--

CREATE TABLE `culturecycle` (
  `idcycle` int(11) NOT NULL,
  `idculture` int(11) NOT NULL,
  `culture_cycle_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `culturecycle`
--

INSERT INTO `culturecycle` (`idcycle`, `idculture`, `culture_cycle_date`) VALUES
(2, 181, '2019-10-04'),
(6, 182, '2019-10-17');

-- --------------------------------------------------------

--
-- Structure de la table `culturedosebooster`
--

CREATE TABLE `culturedosebooster` (
  `idculturedosebooster` int(11) NOT NULL,
  `idculture` int(11) NOT NULL,
  `idbooster` int(11) NOT NULL,
  `date_dose_booster` date NOT NULL,
  `dose_booster` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `culturejuice`
--

CREATE TABLE `culturejuice` (
  `idjuice` int(11) NOT NULL,
  `idculture` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `culturejuice`
--

INSERT INTO `culturejuice` (`idjuice`, `idculture`) VALUES
(5, 181),
(27, 181),
(5, 182),
(27, 182);

-- --------------------------------------------------------

--
-- Structure de la table `culturestrain`
--

CREATE TABLE `culturestrain` (
  `idstrain` int(11) NOT NULL,
  `idculture` int(11) NOT NULL,
  `strain_base` varchar(255) NOT NULL,
  `strain_quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `culturestrain`
--

INSERT INTO `culturestrain` (`idstrain`, `idculture`, `strain_base`, `strain_quantity`) VALUES
(13, 181, 'Seed', 2),
(55, 181, 'Clone', 6),
(13, 182, 'Seed', 3),
(55, 182, 'Clone', 6),
(10, 182, 'Clone', 3);

-- --------------------------------------------------------

--
-- Structure de la table `culturetype`
--

CREATE TABLE `culturetype` (
  `idculturetype` int(11) NOT NULL,
  `culture_type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `culturetype`
--

INSERT INTO `culturetype` (`idculturetype`, `culture_type`) VALUES
(1, 'Soil'),
(2, 'Hydroponic');

-- --------------------------------------------------------

--
-- Structure de la table `cycle`
--

CREATE TABLE `cycle` (
  `idcycle` int(11) NOT NULL,
  `cycle_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `cycle`
--

INSERT INTO `cycle` (`idcycle`, `cycle_name`) VALUES
(1, 'Germination'),
(2, 'Vegetative'),
(3, 'Stretch'),
(4, 'Flowering'),
(5, 'Flushing'),
(6, 'Cloning');

-- --------------------------------------------------------

--
-- Structure de la table `growuser`
--

CREATE TABLE `growuser` (
  `idgrowuser` int(11) NOT NULL,
  `growuser_name` text,
  `grower_pass` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `growuser`
--

INSERT INTO `growuser` (`idgrowuser`, `growuser_name`, `grower_pass`) VALUES
(1, 'romain', 'enimatek23');

-- --------------------------------------------------------

--
-- Structure de la table `juice`
--

CREATE TABLE `juice` (
  `idjuice` int(11) NOT NULL,
  `juice_name` varchar(255) DEFAULT NULL,
  `juice_origin` varchar(255) DEFAULT NULL,
  `juice_dose` int(11) DEFAULT NULL,
  `juice_date` date NOT NULL,
  `juice_type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `juice`
--

INSERT INTO `juice` (`idjuice`, `juice_name`, `juice_origin`, `juice_dose`, `juice_date`, `juice_type`) VALUES
(5, 'Plagron Alga Grow', 'Culture Indoor', 4, '2018-02-05', 'soil'),
(27, 'ytytytr', 'yttyty', 14, '2000-02-02', 'hyroponic');

-- --------------------------------------------------------

--
-- Structure de la table `measure`
--

CREATE TABLE `measure` (
  `idmeasure` int(11) NOT NULL,
  `measure_ph` double DEFAULT NULL,
  `measure_ec` double DEFAULT NULL,
  `measure_date` date NOT NULL,
  `idculture` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `strain`
--

CREATE TABLE `strain` (
  `idstrain` int(11) NOT NULL,
  `strain_name` varchar(255) DEFAULT NULL,
  `strain_desc` varchar(255) DEFAULT NULL,
  `strain_date` date DEFAULT NULL,
  `strain_genetic` varchar(255) DEFAULT NULL,
  `idstraintype` int(11) NOT NULL,
  `thc_ratio` int(11) DEFAULT NULL,
  `strain_bloom` int(11) DEFAULT NULL,
  `strain_origin` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `strain`
--

INSERT INTO `strain` (`idstrain`, `strain_name`, `strain_desc`, `strain_date`, `strain_genetic`, `idstraintype`, `thc_ratio`, `strain_bloom`, `strain_origin`) VALUES
(10, 'Cheese', 'Effect: Intense musky earthy flavor, very dominant. Strong body stoned, with bursts of mental energy.', '2018-09-17', 'Skunk phénotype sélectionné (Issu des clones originaux du Royaume-Uni).', 3, 19, 60, 'GreenHouse Seeds'),
(13, 'Liberty Haze', 'LIBERTY HAZE™ is a strain created from a crossing of G13 with a fast flowering ChemDawg 91.The buzz is immediate and long lasting, creating a euphoric cerebral effect. This strain has a distinct lime taste and fragrance.', '2018-02-10', 'G13 x ChemDawg 91', 2, 22, 65, 'Barney\'s Farm'),
(50, 'Cheese12', 'Cheese', '1999-12-31', 'Cheese', 2, 2, 2, 'Cheese'),
(55, 'Acapulco23', 'Acapulco', '1110-12-29', 'Acapulco', 1, 1, 1, 'Acapulco');

-- --------------------------------------------------------

--
-- Structure de la table `straintype`
--

CREATE TABLE `straintype` (
  `idstraintype` int(11) NOT NULL,
  `strain_type` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `straintype`
--

INSERT INTO `straintype` (`idstraintype`, `strain_type`) VALUES
(1, 'Indica'),
(2, 'Sativa'),
(3, 'Ind / Sat');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `booster`
--
ALTER TABLE `booster`
  ADD PRIMARY KEY (`idbooster`);

--
-- Index pour la table `culture`
--
ALTER TABLE `culture`
  ADD PRIMARY KEY (`idculture`),
  ADD KEY `id_culture_type` (`idculturetype`);

--
-- Index pour la table `culturebooster`
--
ALTER TABLE `culturebooster`
  ADD KEY `idbooster` (`idbooster`),
  ADD KEY `idculture` (`idculture`);

--
-- Index pour la table `culturecycle`
--
ALTER TABLE `culturecycle`
  ADD KEY `idcycle` (`idcycle`),
  ADD KEY `idculture` (`idculture`);

--
-- Index pour la table `culturedosebooster`
--
ALTER TABLE `culturedosebooster`
  ADD PRIMARY KEY (`idculturedosebooster`),
  ADD KEY `idculture` (`idculture`),
  ADD KEY `idbooster` (`idbooster`);

--
-- Index pour la table `culturejuice`
--
ALTER TABLE `culturejuice`
  ADD KEY `idjuice` (`idjuice`),
  ADD KEY `idculture` (`idculture`);

--
-- Index pour la table `culturestrain`
--
ALTER TABLE `culturestrain`
  ADD KEY `idstrain` (`idstrain`),
  ADD KEY `idculture` (`idculture`);

--
-- Index pour la table `culturetype`
--
ALTER TABLE `culturetype`
  ADD PRIMARY KEY (`idculturetype`);

--
-- Index pour la table `cycle`
--
ALTER TABLE `cycle`
  ADD PRIMARY KEY (`idcycle`);

--
-- Index pour la table `growuser`
--
ALTER TABLE `growuser`
  ADD PRIMARY KEY (`idgrowuser`);

--
-- Index pour la table `juice`
--
ALTER TABLE `juice`
  ADD PRIMARY KEY (`idjuice`);

--
-- Index pour la table `measure`
--
ALTER TABLE `measure`
  ADD PRIMARY KEY (`idmeasure`),
  ADD KEY `idculture` (`idculture`);

--
-- Index pour la table `strain`
--
ALTER TABLE `strain`
  ADD PRIMARY KEY (`idstrain`),
  ADD KEY `id_strain_type` (`idstraintype`);

--
-- Index pour la table `straintype`
--
ALTER TABLE `straintype`
  ADD PRIMARY KEY (`idstraintype`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `booster`
--
ALTER TABLE `booster`
  MODIFY `idbooster` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;
--
-- AUTO_INCREMENT pour la table `culture`
--
ALTER TABLE `culture`
  MODIFY `idculture` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=184;
--
-- AUTO_INCREMENT pour la table `culturedosebooster`
--
ALTER TABLE `culturedosebooster`
  MODIFY `idculturedosebooster` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `culturetype`
--
ALTER TABLE `culturetype`
  MODIFY `idculturetype` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT pour la table `cycle`
--
ALTER TABLE `cycle`
  MODIFY `idcycle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT pour la table `growuser`
--
ALTER TABLE `growuser`
  MODIFY `idgrowuser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT pour la table `juice`
--
ALTER TABLE `juice`
  MODIFY `idjuice` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
--
-- AUTO_INCREMENT pour la table `measure`
--
ALTER TABLE `measure`
  MODIFY `idmeasure` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `strain`
--
ALTER TABLE `strain`
  MODIFY `idstrain` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;
--
-- AUTO_INCREMENT pour la table `straintype`
--
ALTER TABLE `straintype`
  MODIFY `idstraintype` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `culture`
--
ALTER TABLE `culture`
  ADD CONSTRAINT `culture_ibfk_1` FOREIGN KEY (`idculturetype`) REFERENCES `culturetype` (`idculturetype`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Contraintes pour la table `culturebooster`
--
ALTER TABLE `culturebooster`
  ADD CONSTRAINT `culturebooster_ibfk_1` FOREIGN KEY (`idculture`) REFERENCES `culture` (`idculture`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `culturebooster_ibfk_2` FOREIGN KEY (`idbooster`) REFERENCES `booster` (`idbooster`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Contraintes pour la table `culturecycle`
--
ALTER TABLE `culturecycle`
  ADD CONSTRAINT `culturecycle_ibfk_1` FOREIGN KEY (`idculture`) REFERENCES `culture` (`idculture`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `culturecycle_ibfk_2` FOREIGN KEY (`idcycle`) REFERENCES `cycle` (`idcycle`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Contraintes pour la table `culturedosebooster`
--
ALTER TABLE `culturedosebooster`
  ADD CONSTRAINT `culturedosebooster_ibfk_1` FOREIGN KEY (`idculture`) REFERENCES `culture` (`idculture`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `culturedosebooster_ibfk_2` FOREIGN KEY (`idbooster`) REFERENCES `booster` (`idbooster`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Contraintes pour la table `culturejuice`
--
ALTER TABLE `culturejuice`
  ADD CONSTRAINT `culturejuice_ibfk_1` FOREIGN KEY (`idculture`) REFERENCES `culture` (`idculture`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `culturejuice_ibfk_2` FOREIGN KEY (`idjuice`) REFERENCES `juice` (`idjuice`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Contraintes pour la table `culturestrain`
--
ALTER TABLE `culturestrain`
  ADD CONSTRAINT `culturestrain_ibfk_1` FOREIGN KEY (`idculture`) REFERENCES `culture` (`idculture`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `culturestrain_ibfk_2` FOREIGN KEY (`idstrain`) REFERENCES `strain` (`idstrain`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Contraintes pour la table `measure`
--
ALTER TABLE `measure`
  ADD CONSTRAINT `measure_ibfk_1` FOREIGN KEY (`idculture`) REFERENCES `culture` (`idculture`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Contraintes pour la table `strain`
--
ALTER TABLE `strain`
  ADD CONSTRAINT `strain_ibfk_1` FOREIGN KEY (`idstraintype`) REFERENCES `straintype` (`idstraintype`) ON DELETE CASCADE ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
