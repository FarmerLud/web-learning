export const traerPalabraAleatoria = async () => {
    const respuesta = await fetch('/palabrasFiltradas.txt')
    const texto = await respuesta.text()
    
    // separar por linea
    const palabras = texto.split('\n').map(p=>p.trim()).filter(Boolean)
    const indiceAleatorio =  Math.floor(Math.random()*palabras.length)
    const palabra = palabras[indiceAleatorio]
    
    return palabra.toUpperCase()
}