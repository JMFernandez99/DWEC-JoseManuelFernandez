const Biblioteca = require(`./inicio.js`);
let bibliotecaTavernes = new Biblioteca([], [], [], [], []);

// SetUp para leer y mostrar

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function preguntar(propmt) {
    return new Promise((resolve) => {
        rl.question(propmt, resolve);
    });
}

// Clase Main

async function main() {
    let option;
    let out = false;

    do {
        console.log("\n----------------- Menú -----------------\n");

        console.log("1. Mostrar Artículos Disponibles");
        console.log("2. Mostrar Socios");
        console.log("3. Mostrar Admins");
        console.log("4. Mostrar registro de préstamos");
        console.log("5. Prestar Artículo");
        console.log("6. Devolver Artículo");
        console.log("7. Añadir Libro");
        console.log("8. Añadir Revista");
        console.log("9. Añadir Película");
        console.log("10. Añadir Socio");
        console.log("11. Añadir Admin");
        console.log("12. Salir");

        option = await preguntar("\nSeleccione una opción: ");

        switch(option) {

            case "1":
                bibliotecaTavernes.menuMostrarArticulos();
                let opcionArticulos = await preguntar("Selecciona una opción: ");

                switch(opcionArticulos) {
                    case "1":
                        bibliotecaTavernes.mostrarArticulos();
                        break;
                    case "2":
                        bibliotecaTavernes.mostrarArticulos("libro");
                        break;
                    case "3":
                        let genero = await preguntar("Género (dejar vacío para todos): ");
                        bibliotecaTavernes.mostrarArticulos("pelicula", genero || null);
                        break;
                    case "4":
                        let year = await preguntar("Año de Publicación (dejar vacío para todos): ");
                        bibliotecaTavernes.mostrarArticulos("revista", year || null);
                        break;
                    case "5":
                        console.log("\nVolviendo al Menú Principal...");
                        break;
                    default:
                        console.log("\nOpción inválida.");
                }
                break;

            case "2":
                bibliotecaTavernes.mostrarSocios();
                break;

            case "3":
                bibliotecaTavernes.mostrarAdmins();
                break;

            case "4":
                bibliotecaTavernes.mostrarPrestamosSocio();
                break;

            case "5":
                let dniSocio = await preguntar("DNI: ");
                let tipo = await preguntar("Tipo de Artículo: ");
                let titulo = await preguntar("Título del Artículo: ");
                bibliotecaTavernes.prestarMaterial(dniSocio, tipo, titulo);
                break;

            case "6":
                let dniSocio1 = await preguntar("DNI: ");
                let titulo1 = await preguntar("Título del Artículo: ");
                bibliotecaTavernes.devolverMaterial(dniSocio1, titulo1);
                break;

            case "7":
                let titulo2 = await preguntar("Título del Libro: ");
                let autor = await preguntar("Autor: ");
                let numEjemplares = await preguntar("Núm.Ejemplares: ");
                bibliotecaTavernes.addLibro(titulo2, autor, numEjemplares);
                break;

            case "8":
                let titulo3 = await preguntar("Título de la Revista: ");
                let publicacion = await preguntar("Año de Publicación: ");
                let numEjemplares1 = await preguntar("Núm.Ejemplares: ");
                bibliotecaTavernes.addRevista(titulo3, publicacion, numEjemplares1);
                break;

            case "9":
                let titulo4 = await preguntar("Título de la Película: ");
                let director = await preguntar("Director: ");
                let genero = await preguntar("Género de la Película: ");
                let numEjemplares2 = await preguntar("Núm.Ejemplares: ");
                bibliotecaTavernes.addPelicula(titulo4, director, genero, numEjemplares2);
                break;

            case "10":
                let nombre = await preguntar("Nombre: ");
                let dni = await preguntar("DNI: ");
                bibliotecaTavernes.addSocio(nombre, dni);
                break;

            case "11":
                let nombre1 = await preguntar("Nombre: ");
                let dni1 = await preguntar("DNI: ");
                let cargo = await preguntar("Cargo: ");
                bibliotecaTavernes.addAdmin(nombre1, dni1, cargo);
                break;

            case "12":
                console.log("\nSaliendo...\n");
                console.log("---------- Biblioteca de Tavernes ----------");
                out = true;
                break;

            default:
                console.log("Opción inválida.");
        }
    } while(!out);

    rl.close();
}

main();