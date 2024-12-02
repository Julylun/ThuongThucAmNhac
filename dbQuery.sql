DROP DATABASE TTAN_DB;
CREATE DATABASE TTAN_DB;
USE TTAN_DB;


CREATE TABLE Person (
	personId INT AUTO_INCREMENT PRIMARY KEY,
	personName VARCHAR(255) NOT NULL,
  personEmail VARCHAR(255) UNIQUE NOT NULL,
  personAvatar TEXT NULL,
  personPassword VARCHAR(255) NOT NULL,
  personType INT NOT NULL
);

CREATE TABLE AccessToken (
  tokenId INT AUTO_INCREMENT PRIMARY KEY,
  personId INT NOT NULL,
  jwtToken TEXT NOT NULL,
  FOREIGN KEY(personId) REFERENCES Person(personId) ON DELETE CASCADE
);

CREATE TABLE RefreshToken (
  tokenId INT AUTO_INCREMENT PRIMARY KEY,
  personId INT NOT NULL,
  jwtString TEXT NOT NULL,
  FOREIGN KEY(personId) REFERENCES Person(personId) ON DELETE CASCADE
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
    songImage VARCHAR(255) NOT NULL,
    songPath VARCHAR(255) NOT NULL,
    songDuration INT NOT NULL,
    songArtist INT NOT NULL,
    listenTimes INT DEFAULT 0,
    FOREIGN KEY (songArtist) REFERENCES Person(personId) ON DELETE CASCADE
    -- FOREIGN KEY (songArtist) REFERENCES Person(personId) ON DELETE CASCADE
);

CREATE TABLE Playlist_Song (
	playlistId INT NOT NULL,
    songId INT NOT NULL,
    PRIMARY KEY (playlistId, songId),
    FOREIGN KEY (playlistId) REFERENCES Playlist (playlistId) ON DELETE CASCADE,
    FOREIGN KEY (songId) REFERENCES Song (songId) ON DELETE CASCADE
);

--CREATE TABLE FavouriteList (
	--favouriterId INT NOT NULL,
    --songId INT NOT NULL,
    PRIMARY KEY (favouriterId, songId),
    FOREIGN KEY (favouriterId) REFERENCES Person(personId),
    FOREIGN KEY (songId) REFERENCES Song(songId)
);


