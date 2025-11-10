import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener ruta actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rutas de entrada y salida
const inputPath = path.resolve(__dirname, '../../public/words.txt');
const outputPath = path.resolve(__dirname, '../../public/palabrasFiltradas.txt');

try {
  // Leer archivo original
  const content = fs.readFileSync(inputPath, 'utf8');

  // Procesar líneas: limpiar y filtrar
  const filtered = content
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 4); // mantener solo palabras con más de 4 letras

  // Guardar nuevo archivo
  fs.writeFileSync(outputPath, filtered.join('\n'), 'utf8');

  console.log(`✅ Archivo filtrado guardado como wordsFiltered.txt (${filtered.length} palabras).`);
} catch (err) {
  console.error('❌ Error procesando el archivo:', err.message);
}
