import readline from "readline";

const leer = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

leer.question("¿Cuál es tu nombre? ", (nombre) => {
    console.log(`Hola, ${nombre}!`);
    leer.close(); 
});

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