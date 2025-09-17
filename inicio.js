import readline from "readline";

const leer = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


// leer.question("¿Cuál es tu nombre? ", (nombre) => {
    // console.log(`Hola, ${nombre}!`);
    // leer.close();
// });


// Clases

class Material {
    constructor(titulo, numEjemplares) {
        this._titulo = titulo;
        this._numEjemplares = numEjemplares; 
    }

    get titulo() { return this._titulo; }
    get numEjemplares() { return this._numEjemplares; }

    set titulo(newTitulo) { this._titulo = newTitulo; }
    set numEjemplares(newNumEjemplares) { this._numEjemplares = newNumEjemplares; }
    
}

class Libros extends Material{
    constructor(autor, titulo, numEjemplares) {
        super(titulo, numEjemplares);
        this._autor = autor;
    }

    get autor() {return this._autor;}
    set autor(newAutor) {this._autor = newAutor;}
}

class Revistas extends Material {
    constructor(publicacion, titulo, numEjemplares) {
        super(titulo, numEjemplares);
        this._publicacion = publicacion;
    }

    get publicacion() {return this._publicacion;}
    set publicacion(newPublicacion) {this._publicacion = newPublicacion;}
}


class Peliculas extends Material{
    constructor(director, genero, titulo, numEjemplares) {
        super(titulo, numEjemplares);
        this._director = director;
        this._genero = genero;
    }

    get director() {return this._director;}
    get genero() {return this._genero;}
    set director(newDirector) {this._director = newDirector;}
    set genero(newGenero) {this._genero = newGenero;}
}

class Personas {
    constructor(nombre, dni) {
        this._nombre = nombre;
        this._dni = dni;
    }

    get nombre() {return this._nombre;}
    get dni() {return this._dni;}
    set nombre(newNombre) {this._nombre = newNombre;}
    set dni(newdni) {this._dni = newdni;}
}

class Socio extends Personas {
    constructor(nombre, dni, prestados) {
        super(nombre, dni);
        this._prestados = prestados;
    }

    get prestados() {return this._prestados;}
    set prestados(newPrestados) {this._prestados = newPrestados;}
}

class Admin extends Personas {
    constructor(nombre, dni, cargo) {
        super(nombre, dni);
        this._cargo = cargo;
    }

    get cargo() {return this._cargo;}
    set cargo(newCargo) {this._cargo = newCargo;}
}

class Biblioteca {
    constructor(listaLibros = [], listaPeliculas = [], listaRevistas = [], listaMiembros = [], listaAdmin = []) {
        this._listaLibros = listaLibros;
        this._listaPeliculas = listaPeliculas;
        this._listaRevistas = listaRevistas;
        this._listaMiembros = listaMiembros;
        this._listaAdmin = listaAdmin;
    }

    get listaLibros() {return this._listaLibros;}
    get listaPeliculas() {return this._listaPeliculas;}
    get listaRevistas() {return this._listaRevistas;}
    get listaMiembros() {return  this._listaMiembros;}
    get listaAdmin() {return this._listaAdmin;}
    set listaLibros(newListaLibros) {this._listaLibros = newListaLibros;}
    set listaPeliculas(newListaPeliculas) {this._listaPeliculas = newListaPeliculas;}
    set listaRevistas(newListaRevistas) {this._listaRevistas = newListaRevistas;}
    set listaMiembros(newListaMiembros) {this._listaMiembros = newListaMiembros;}
    set listaAdmin(newListaAdmin) {this._listaAdmin = newListaAdmin;}

    // Métodos Add

    addLibro(titulo, autor, numEjemplares) {
        const libroAdded = new Libros(autor, titulo, numEjemplares);
        this._listaLibros.push(libroAdded);
        console.log(`${numEjemplares} ejemplar/es del libro "${titulo}" de ${autor} añadido/s con éxito.`);
    }

    addPelicula(titulo, director, genero, numEjemplares) {
        const peliculaAdded = new Peliculas(director, genero, titulo, numEjemplares);
        this._listaPeliculas.push(peliculaAdded);
        console.log(`${numEjemplares} ejemplar/es de la Película "${titulo}" añadido/s con éxito.`);
    }

    addRevista(publicacion, titulo, numEjemplares) {
        const revistaAdded = new Revistas(publicacion, titulo, numEjemplares);
        this._listaRevistas.push(revistaAdded);
        console.log(`${numEjemplares} ejemplar/es de la revista "${titulo}" añadido/s con éxito.`);
    }
}