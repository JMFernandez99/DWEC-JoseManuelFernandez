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
    constructor(nombre, dni, prestados = []) {
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
        if (cargo.toLowerCase() !== "administrador" && cargo.toLowerCase() !== "ayudante") {
            throw new Error(`El cargo de un Admin ha de ser "Administrador" o "Ayudante".`);
        }
    }

    get cargo() {return this._cargo;}
    set cargo(newCargo) {
        if (newCargo.toLowerCase() !== "administrador" && newCargo.toLowerCase() !== "ayudante") {
            throw new Error(`El cargo de un Admin ha de ser "Administrador" o "Ayudante".`);
        }
        this._cargo = newCargo;
    }
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

    addSocio(nombre, dni) {
        const socioAdded = new Socio(nombre, dni, []);
        this._listaMiembros.push(socioAdded);
        console.log(`${nombre} añadido con éxito.`);
    }

    addAdmin(nombre, dni, cargo) {
        const adminAdded = new Admin(nombre, dni, cargo);
        this._listaAdmin.push(adminAdded);
        console.log(`${nombre} añadido con éxito.`);
    }

    // Métodos Prestar/Devolver

    prestarMaterial(dniSocio, tipo, titulo) {
        
        // 1. Busco el socio

        const socio = this._listaMiembros.find(soci => soci.dni === dniSocio);
        if (!socio) {
            console.log(`No se encontró ningún socio con DNI ${dniSocio}`);
            return;
        }

        // 2. Compruebo límite de préstamos

        if (socio.prestados.length >= 3) {
            console.log(`El socio ${socio.nombre} ya tiene 3 artículos prestados.`);
            return;
        }

        // 3. Buscar material según el tipo.

        let lista;
        if (tipo.toLowerCase() === "libro") {
            lista = this._listaLibros;

        } else if (tipo.toLowerCase() === "pelicula") {
            lista = this._listaPeliculas;

        } else if (tipo.toLowerCase() === "revista") {
            lista = this._listaRevistas;

        } else {
            console.log("Tipo de material inválido.");
            return;
        }

        const material = lista.find(mater => mater.titulo  === titulo);
        if (!material) {
            console.log(`No se encontró ${tipo} con título "${titulo}".`);
            return;
        }

        // 4. Verifico que esté disponible

        if (material.numEjemplares <= 0) {
            console.log(`No quedan ejemlares disponibles actualmente de "${titulo}".`);
            return;
        }

        // 5. Prestar

        material.numEjemplares -= 1;
        socio.prestados.push(material);
        console.log(`"${titulo}" prestado a ${socio.nombre} con éxito.`);
    }

    devolverMaterial(dniSocio, titulo) {

        // 1. Busco socio

        const socio = this._listaMiembros.find(soci => soci.dni === dniSocio);
        if (!socio) {
            console.log(`No se encontró ningún socio con DNI ${dniSocio}`);
            return;
        }

        // 2. Compruebo que el material está dentro de socio

        const indice = socio.prestados.findIndex(mater => mater.titulo === titulo);
        if (indice === -1) {
            console.log(`El socio ${socio.nombre} no tiene prestado "${titulo}.`);
            return;
        }

        // 3. Guardo en una variable la ubicación del material en el inventario del socio

        const material = socio.prestados[indice];

        // 4. Devuelvo el material a la biblioteca y lo retiro del inventario del socio

        material.numEjemplares += 1;
        socio.prestados.splice(indice, 1);

        console.log(`"${titulo}" devuelto con éxito por ${socio.nombre}.`);
    }

    // Métodos para Mostrar Artículos/Personas

    menuMostrarArticulos() {

        console.log("\n------- Menú Artículos -------\n");

        console.log("1. Mostrar todos los artículos");
        console.log("2. Mostrar Libros");
        console.log("3. Mostrar Películas");
        console.log("4. Mostrar Revistas");
        console.log("5. Salir");

    }

    mostrarArticulos(tipo = null, filtroExtra = null) {
        let lista = [];

        if (!tipo) {
            // Mostrar todos los Artículos

            lista = [...this._listaLibros, ...this._listaPeliculas, ...this._listaRevistas];

        } else if (tipo.toLowerCase() === "libro") {
            lista = this._listaLibros;

        } else if (tipo.toLowerCase() === "revista") {
            lista = this._listaRevistas;
            if (filtroExtra) {
                lista = lista.filter(revis => revis.publicacion.toString() === filtroExtra.toString());
            }

        } else if (tipo.toLowerCase() === "pelicula") {
            lista = this._listaPeliculas;
            if (filtroExtra) {
                lista = lista.filter(peli => peli.genero.toLowerCase() === filtroExtra.toLowerCase());
            }
        } else {
            console.log("Tipo inválido.");
            return;
        }

        if (lista.length === 0) {
            console.log("\nNo hay artículos disponibles con esos filtros.");
            return;
        }

        console.log("\nArtículos disponibles:");
        lista.forEach(artic => {
            let info = `${artic.titulo} (${artic.numEjemplares} ejemplares disponibles)`;
            if (artic instanceof Libros) info += ` - Autor: ${artic.autor}`;
            if (artic instanceof Peliculas) info += ` - Género: ${artic.genero} - Director: ${artic.director}`;
            if (artic instanceof Revistas) info += ` - Año de Publicación: ${artic.publicacion}`;
            
            console.log(info);
        });

    }

    mostrarSocios() {
    this._listaMiembros.forEach(soci => {
            console.log(`- Nombre: ${soci.nombre} - DNI: ${soci.dni}`)
        });
    }

    mostrarAdmins() {
        this._listaAdmin.forEach(admi => {
            console.log(`- Nombre: ${admi.nombre} - DNI: ${admi.dni} - Cargo: ${admi.cargo}`)
        });
    }

    mostrarPrestamosSocio() {
        this._listaMiembros.forEach(soci => {
            console.log(`- Nombre: ${soci.nombre}\nPréstamos: ${soci.prestados}`)
        });
    }
}

// Sintaxis que se utiliza para poder usar Biblioteca fuera de este archivo

module.exports = Biblioteca;