DROP DATABASE IF EXISTS lfgamers_db;
CREATE DATABASE lfgamers_db;
USE lfgamers_db;

CREATE TABLE users (
	id INT AUTO_INCREMENT NOT NULL,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    xbox_tag VARCHAR(50) NULL,
    ps4_tag VARCHAR(50) NULL,
    steam_tag VARCHAR(50) NULL,
    PRIMARY KEY(id),
    INDEX(username)
);