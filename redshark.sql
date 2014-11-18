-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jul 29, 2014 at 09:24 AM
-- Server version: 5.6.16
-- PHP Version: 5.5.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `redshark`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `upC_albums`(p_id_artista int, p_id_album int, p_nb_album varchar(250))
BEGIN
	INSERT INTO albums (id_artista,id_album,nb_album) VALUES (p_id_artista,p_id_album,p_nb_album);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `upC_artistas`(`id_artista` int,`nb_artista` varchar (250))
BEGIN
	INSERT INTO artistas (id_artista,nb_artista) VALUES (id_artista,nb_artista);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `upC_canciones`(`p_id_artista` int,`p_id_album` int,`p_id_cancion` int,`p_nb_cancion` varchar(250),`p_de_archivo` varchar(250))
BEGIN
	insert INTO canciones (id_artista,id_album,nb_cancion,de_Archivo) VALUES (p_id_artista,p_id_album,p_nb_cancion,p_de_Archivo);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `upL_albumsPorNombre`(`p_id_artista` int,`p_nb_album` varchar(250))
BEGIN
	SELECT * FROM albums where id_artista=p_id_artista AND nb_album=IFNULL(p_nb_album,nb_album);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `upL_artistas`()
BEGIN
	SELECT * FROM artistas;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `upL_artistasPorNombre`(p_nb_Artista varchar(250))
BEGIN
	SELECT * FROM artistas WHERE nb_artista=p_nb_Artista;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `upL_canciones`()
BEGIN
	SELECT
		c.*,
		al.nb_album,
		a.nb_artista,
		CONCAT(a.nb_artista,'/',al.nb_album,'/',c.de_archivo) as dir_archivo
	FROM
		canciones c,
		artistas a,
		albums al
	WHERE
		c.id_artista = al.id_artista AND 
		c.id_album = al.id_album AND
		c.id_artista=a.id_Artista;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `upL_cancionPorNombre`(`p_id_artista` int,`p_id_album` int,`p_nb_cancion` varchar(250))
BEGIN
	select * from canciones
	WHERE id_artista=p_id_artista AND
		    id_album=p_id_album AND
				nb_cancion=p_nb_cancion;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `upR_albumsNextId`(`p_id_artista` int)
BEGIN
	SELECT IFNULL(MAX(id_album),0)+1 as NextID FROM albums WHERE id_artista=p_id_artista;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `upR_artistasNextId`()
BEGIN
	SELECT IFNULL(MAX(id_artista),0)+1 as nextID FROM artistas;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `upR_cancionesNextId`(`p_id_artista` int,`p_id_album` int)
BEGIN
	select IFNULL(MAX(id_cancion),0)+1 as nextID FROM Canciones WHERE id_artista=p_id_artista AND id_album=p_id_album;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `albums`
--

CREATE TABLE IF NOT EXISTS `albums` (
  `id_artista` int(11) NOT NULL,
  `id_album` int(11) NOT NULL,
  `nb_album` varchar(250) NOT NULL,
  PRIMARY KEY (`id_artista`,`id_album`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `albums`
--

INSERT INTO `albums` (`id_artista`, `id_album`, `nb_album`) VALUES
(1, 1, 'Voy a pasarmela bien'),
(1, 2, 'Default'),
(2, 1, 'Default'),
(3, 1, 'Finisterra'),
(5, 1, 'Bastardos Sin Gloria'),
(6, 1, 'Bastardos Sin Gloria'),
(7, 1, 'The Wall'),
(8, 1, 'Willy and the Poor Boys');

-- --------------------------------------------------------

--
-- Table structure for table `artistas`
--

CREATE TABLE IF NOT EXISTS `artistas` (
  `id_Artista` int(11) NOT NULL,
  `nb_artista` varchar(250) NOT NULL,
  PRIMARY KEY (`id_Artista`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `artistas`
--

INSERT INTO `artistas` (`id_Artista`, `nb_artista`) VALUES
(1, 'Hombres G'),
(2, 'Liran Roll'),
(3, 'Mago de Oz'),
(4, 'Toreros muertos'),
(5, 'Nick Perito'),
(6, 'Ennio Morricone'),
(7, 'Pink Floyd'),
(8, 'Creedence Clearwater Revival');

-- --------------------------------------------------------

--
-- Table structure for table `canciones`
--

CREATE TABLE IF NOT EXISTS `canciones` (
  `id_artista` int(11) NOT NULL DEFAULT '0',
  `id_album` int(11) NOT NULL DEFAULT '0',
  `id_cancion` int(11) NOT NULL DEFAULT '0',
  `nb_cancion` varchar(250) DEFAULT NULL,
  `de_archivo` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id_artista`,`id_album`,`id_cancion`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `canciones`
--

INSERT INTO `canciones` (`id_artista`, `id_album`, `id_cancion`, `nb_cancion`, `de_archivo`) VALUES
(1, 1, 1, 'Dulce Belen', 'Dulce Belen.mp3'),
(1, 2, 1, 'El ataque de las chicas cocodrilo', 'El ataque de las chicas cocodrilo.mp3'),
(1, 2, 2, 'Encima de Ti', 'Encima de Ti.mp3'),
(1, 2, 3, 'En otro mundo', 'En otro mundo.mp3'),
(2, 1, 1, 'La flaca', 'La flaca.mp3'),
(3, 1, 1, 'Fiesta Pagana', 'Fiesta Pagana.mp3'),
(3, 1, 2, 'Kelpie', 'Kelpie.mp3'),
(5, 1, 1, 'The green leaves of summer', 'The green leaves of summer.mp3'),
(6, 1, 1, 'The_verdict (Dopo la condanna)', 'The_verdict (Dopo la condanna).mp3'),
(6, 1, 2, 'Rabbia e tarantella', 'Rabbia e tarantella.mp3'),
(7, 1, 1, 'The Thin Ice', 'The Thin Ice.mp3'),
(7, 1, 2, 'In the Flesh', 'In the Flesh.mp3'),
(8, 1, 1, 'Cotton Fields', 'Cotton Fields.mp3'),
(8, 1, 2, 'Fortunate Son', 'Fortunate Son.mp3'),
(8, 1, 3, 'Effigy', 'Effigy.mp3'),
(8, 1, 4, 'Poorboy Shuffle', 'Poorboy Shuffle.mp3');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `albums`
--
ALTER TABLE `albums`
  ADD CONSTRAINT `albums_ibfk_1` FOREIGN KEY (`id_artista`) REFERENCES `artistas` (`id_Artista`);

--
-- Constraints for table `canciones`
--
ALTER TABLE `canciones`
  ADD CONSTRAINT `canciones_ibfk_1` FOREIGN KEY (`id_artista`, `id_album`) REFERENCES `albums` (`id_artista`, `id_album`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
