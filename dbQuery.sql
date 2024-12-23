DROP DATABASE TTAN_DB;
CREATE DATABASE TTAN_DB;
USE TTAN_DB;


CREATE TABLE Person (
	personId INT AUTO_INCREMENT PRIMARY KEY,
	personName VARCHAR(255) NOT NULL,
  personEmail VARCHAR(255) UNIQUE NOT NULL,
  personAvatar TEXT NULL,
  personPassword VARCHAR(255) NOT NULL,
  personType INT NOT NULL,
  personStatus INT NOT NULL
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
    playlistType INT NOT NULL,
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


--Test data
INSERT INTO Person (personName, personEmail, personPassword, personType, personStatus) 
VALUES ('admin', 'admin@example.july','$2a$10$m5lUV2PxFJ/mqMgiavH1VuntpwUJrUG1SwIOXwadGYchpf/jWbcnG',1,0);

INSERT INTO Song (songName, songImage, songPath, songDuration, songArtist) 
VALUES ('Ngay that dep de noi loi chia tay', 'example\\eg-file001.jpg', 'example\\eg-file001.mp3', 100, 1)
,('Co em', 'example\\eg-file002.jpg', 'example\\eg-file002.mp3', 100, 1)
,('Anh phai lam gi de em', 'example\\eg-file003.jpg', 'example\\eg-file003.mp3', 100, 1)
,('Dung lam trai tim anh dau', 'example\\eg-file004.jpg', 'example\\eg-file004.mp3', 100, 1)
,('Gio thi', 'example\\eg-file005.jpg', 'example\\eg-file005.mp3', 100, 1);





--CREATE TABLE FavouriteList (
	--favouriterId INT NOT NULL,
    --songId INT NOT NULL,
    -- PRIMARY KEY (favouriterId, songId),
    -- FOREIGN KEY (favouriterId) REFERENCES Person(personId),
    -- FOREIGN KEY (songId) REFERENCES Song(songId)
-- );


