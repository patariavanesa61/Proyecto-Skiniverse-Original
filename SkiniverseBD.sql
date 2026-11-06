-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         8.4.3 - MySQL Community Server - GPL
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para skiniverse
CREATE DATABASE IF NOT EXISTS `skiniverse` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `skiniverse`;

-- Volcando estructura para tabla skiniverse.consejos
CREATE TABLE IF NOT EXISTS `consejos` (
  `IdConsejo` int NOT NULL AUTO_INCREMENT,
  `Titulo` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `Contenido` text COLLATE utf8mb4_general_ci NOT NULL,
  `ImagenUrl` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `FechaPublicacion` datetime NOT NULL DEFAULT (now()),
  PRIMARY KEY (`IdConsejo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla skiniverse.detallepedido
CREATE TABLE IF NOT EXISTS `detallepedido` (
  `IdDetalle` int NOT NULL AUTO_INCREMENT,
  `IdPedido` int NOT NULL,
  `IdProducto` int NOT NULL,
  `Cantidad` int NOT NULL,
  `PrecioUnitario` decimal(10,2) NOT NULL,
  PRIMARY KEY (`IdDetalle`),
  KEY `FK__pedidos` (`IdPedido`),
  KEY `FK__pedido_productos` (`IdProducto`),
  CONSTRAINT `FK__pedido_productos` FOREIGN KEY (`IdProducto`) REFERENCES `productos` (`IdProducto`) ON DELETE CASCADE,
  CONSTRAINT `FK__pedidos` FOREIGN KEY (`IdPedido`) REFERENCES `pedidos` (`IdPedido`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla skiniverse.favoritos
CREATE TABLE IF NOT EXISTS `favoritos` (
  `IdFavorito` int NOT NULL AUTO_INCREMENT,
  `IdUsuario` int NOT NULL,
  `IdProducto` int NOT NULL,
  `FechaAgregado` datetime NOT NULL DEFAULT (now()),
  PRIMARY KEY (`IdFavorito`),
  KEY `FK1_favorito_usuario` (`IdUsuario`),
  KEY `FK2_favorito_producto` (`IdProducto`),
  CONSTRAINT `FK1_favorito_usuario` FOREIGN KEY (`IdUsuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE,
  CONSTRAINT `FK2_favorito_producto` FOREIGN KEY (`IdProducto`) REFERENCES `productos` (`IdProducto`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla skiniverse.mensajecontacto
CREATE TABLE IF NOT EXISTS `mensajecontacto` (
  `IdMensaje` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Correo` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Asunto` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Mensaje` text COLLATE utf8mb4_general_ci,
  `FechaEnvio` datetime DEFAULT NULL,
  PRIMARY KEY (`IdMensaje`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla skiniverse.pedidos
CREATE TABLE IF NOT EXISTS `pedidos` (
  `IdPedido` int NOT NULL AUTO_INCREMENT,
  `IdUsuario` int NOT NULL,
  `Total` decimal(10,2) NOT NULL,
  `Estado` varchar(50) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Pendiente',
  `FechaPedido` datetime NOT NULL DEFAULT (now()),
  PRIMARY KEY (`IdPedido`),
  KEY `IdUsuario` (`IdUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla skiniverse.productos
CREATE TABLE IF NOT EXISTS `productos` (
  `IdProducto` int NOT NULL AUTO_INCREMENT,
  `NombreProducto` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Categoria` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `TipoPielRecomendada` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Ingredientes Activos` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `PrecioRegular` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `StockActual` int DEFAULT NULL,
  `ImagenUrl` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`IdProducto`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla skiniverse.reseñas
CREATE TABLE IF NOT EXISTS `reseñas` (
  `IdReseña` int NOT NULL AUTO_INCREMENT,
  `IdProducto` int NOT NULL,
  `Usuario` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `Calificacion` int NOT NULL,
  `Comentario` text COLLATE utf8mb4_general_ci NOT NULL,
  `FechaCreacion` datetime NOT NULL DEFAULT (now()),
  PRIMARY KEY (`IdReseña`),
  KEY `FK__productos` (`IdProducto`),
  CONSTRAINT `FK__productos` FOREIGN KEY (`IdProducto`) REFERENCES `productos` (`IdProducto`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla skiniverse.resultadostest
CREATE TABLE IF NOT EXISTS `resultadostest` (
  `IdTest` int NOT NULL AUTO_INCREMENT,
  `IdUsuario` int DEFAULT NULL,
  `TipoPiel` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `Recomendaciones` text COLLATE utf8mb4_general_ci NOT NULL,
  `FechaTest` datetime NOT NULL DEFAULT (now()),
  PRIMARY KEY (`IdTest`),
  KEY `FK1_test_usuario` (`IdUsuario`),
  CONSTRAINT `FK1_test_usuario` FOREIGN KEY (`IdUsuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla skiniverse.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `idUsuario` int NOT NULL,
  `Correo` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Contraseña` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Rol` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `FechaDeRegistro` datetime DEFAULT NULL,
  PRIMARY KEY (`idUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- La exportación de datos fue deseleccionada.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
