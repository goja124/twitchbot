mysql -uroot -p

CREATE DATABASE 해해;

USE 해해;

CREATE TABLE `meireigo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `meireigo` TEXT NULL,
  `naiyou` TEXT NULL,
  PRIMARY KEY (`id`)
) default character set utf8 collate utf8_general_ci;

INSERT INTO `meireigo` VALUES (1, "!능지", "100");
