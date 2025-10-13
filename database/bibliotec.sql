-- Active: 1759334537505@@127.0.0.1@3306@mysql
drop database if exists biblioteca;
create DATABASE biblioteca;

use biblioteca;

CREATE TABLE material (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Tipo ENUM(
        'Libro',
        'Revista',
        'Pelicula'
    ),
    ejemplares INT,
    titulo VARCHAR(50)
);

CREATE TABLE Libro (
    ISBN_material INT PRIMARY KEY AUTO_INCREMENT,
    autor VARCHAR(50),
    FOREIGN KEY(ISBN_material)REFERENCES material(ID)
);

CREATE TABLE Revista (
    ID_material INT PRIMARY KEY AUTO_INCREMENT,
    autor VARCHAR(50),
    fecha_publicacion VARCHAR(20),
    FOREIGN KEY(ID_material)REFERENCES material(ID)
);

CREATE TABLE Pelicula (
    ID_material INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(50),
    director VARCHAR(50),
    genero VARCHAR(50),
    FOREIGN KEY(ID_material)REFERENCES material(ID)
);

CREATE TABLE Socio (
    ID INT PRIMARY KEY,
    nombre VARCHAR(50),
    DNI CHAR(9) UNIQUE
);

CREATE TABLE Administrador (
    ID INT PRIMARY KEY,
    nombre VARCHAR(50),
    DNI CHAR(9) UNIQUE
);

CREATE TABLE Prestamo (
    ID_prestamo INT PRIMARY KEY AUTO_INCREMENT,
    ID_socio int,
    ID_material int,
    Fecha_prestamo DATE NOT NULL,
    Fecha_devolucion DATE,
    FOREIGN KEY (ID_socio) REFERENCES Socio (ID),
    FOREIGN KEY (ID_material) REFERENCES material (ID)
);

INSERT INTO material (ID, Tipo, ejemplares, titulo) VALUES
(1, 'Pelicula', 5, 'El Señor de los Anillos'),
(2, 'Revista', 10, 'National Geographic - Octubre'),
(3, 'Libro', 3, 'Cien Años de Soledad'),
(4, 'Pelicula', 7, 'Matrix');