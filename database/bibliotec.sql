DROP DATABASE IF EXISTS biblioteca;
CREATE DATABASE biblioteca;
USE biblioteca;

CREATE TABLE material (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Tipo ENUM('Libro','Revista','Pelicula'),
    ejemplares INT DEFAULT 1,
    titulo VARCHAR(50)
);

CREATE TABLE Libro (
    ID_material INT PRIMARY KEY,
    autor VARCHAR(50),
    FOREIGN KEY(ID_material) REFERENCES material(ID)
);

CREATE TABLE Revista (
    ID_material INT PRIMARY KEY,
    autor VARCHAR(50),
    fecha_publicacion DATE,
    FOREIGN KEY(ID_material) REFERENCES material(ID)
);

CREATE TABLE Pelicula (
    ID_material INT PRIMARY KEY,
    director VARCHAR(50),
    genero VARCHAR(50),
    FOREIGN KEY(ID_material) REFERENCES material(ID)
);

CREATE TABLE Persona (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50),
    DNI CHAR(9) UNIQUE,
    tipo ENUM('Socio','Administrador'),
    rol_admin ENUM('Admin','Ayudante') NULL
);

CREATE TABLE Prestamo (
    ID_prestamo INT PRIMARY KEY AUTO_INCREMENT,
    ID_socio INT,
    ID_admin INT,
    ID_material INT,
    Fecha_prestamo DATE NOT NULL,
    Fecha_devolucion DATE,
    FOREIGN KEY (ID_socio) REFERENCES Persona (ID),
    FOREIGN KEY (ID_admin) REFERENCES Persona (ID),
    FOREIGN KEY (ID_material) REFERENCES material (ID)
);