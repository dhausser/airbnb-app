USE mydb;

CREATE TABLE User (
  id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE Post (
  id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT now(),
  content TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  authorId INTEGER NOT NULL,
  FOREIGN KEY (authorId) REFERENCES User(id)
);

CREATE TABLE Profile (
  id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
  bio TEXT,
  userId INTEGER UNIQUE NOT NULL,
  FOREIGN KEY (userId) REFERENCES User(id)
);