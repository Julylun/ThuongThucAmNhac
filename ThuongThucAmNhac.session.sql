
DROP DATABASE TTAN_DB;
CREATE DATABASE TTAN_DB;
USE TTAN_DB;

CREATE TABLE UserType (
	typeId Int AUTO_INCREMENT PRIMARY KEY,
    typeName VARCHAR(15) NOT NULL UNIQUE
);

CREATE TABLE Person (
	personId INT AUTO_INCREMENT PRIMARY KEY,
	personName VARCHAR(255) NOT NULL,
    personEmail VARCHAR(255) UNIQUE NOT NULL,
    personPassword VARCHAR(255) NOT NULL,
    personType INT NOT NULL,
    FOREIGN KEY (personType) REFERENCES UserType(typeId)
);

CREATE TABLE Playlist (
    playlistId INT AUTO_INCREMENT PRIMARY KEY,
    playlistName VARCHAR(255) NOT NULL,
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES Person(personId)
); 

CREATE TABLE Song (
	songId INT AUTO_INCREMENT PRIMARY KEY,
    songName VARCHAR(255) NOT NULL,
    songPath VARCHAR(255) NOT NULL,
    songArtist INT NOT NULL,
    listenTimes INT DEFAULT 0,
    FOREIGN KEY (songArtist) REFERENCES Person(personId)
);

CREATE TABLE Playlist_Song (
	playlistId INT NOT NULL,
    songId INT NOT NULL,
    PRIMARY KEY (playlistId, songId),
    FOREIGN KEY (playlistId) REFERENCES Playlist (playlistId),
    FOREIGN KEY (songId) REFERENCES Song (songId)
);



CREATE TABLE UserType (
	typeId Int AUTO_INCREMENT PRIMARY KEY,
    typeName VARCHAR(15) NOT NULL UNIQUE
);

CREATE TABLE Person (
	personId INT AUTO_INCREMENT PRIMARY KEY,
	personName VARCHAR(255) NOT NULL,
    personEmail VARCHAR(255) UNIQUE NOT NULL,
    personPassword VARCHAR(255) NOT NULL,
    personType INT NOT NULL,
    FOREIGN KEY (personType) REFERENCES UserType(typeId)
);

CREATE TABLE Playlist (
    playlistId INT AUTO_INCREMENT PRIMARY KEY,
    playlistName VARCHAR(255) NOT NULL,
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES Person(personId)
);

CREATE TABLE Song (
	songId INT AUTO_INCREMENT PRIMARY KEY,
    songName VARCHAR(255) NOT NULL,
    songPath VARCHAR(255) NOT NULL,
    songArtist INT NOT NULL,
    listenTimes INT DEFAULT 0,
    FOREIGN KEY (songArtist) REFERENCES Person(personId)
);

CREATE TABLE Playlist_Song (
	playlistId INT NOT NULL,
    songId INT NOT NULL,
    PRIMARY KEY (playlistId, songId),
    FOREIGN KEY (playlistId) REFERENCES Playlist (playlistId),
    FOREIGN KEY (songId) REFERENCES Song (songId)
);

CREATE TABLE FavouriteList (
	favouriterId INT NOT NULL,
    songId INT NOT NULL,
    PRIMARY KEY (favouriterId, songId),
    FOREIGN KEY (favouriterId) REFERENCES Person(personId),
    FOREIGN KEY (songId) REFERENCES Song(songId)
);

INSERT INTO UserType (typeName) VALUES ('User'), ('Artist'), ('Admin');