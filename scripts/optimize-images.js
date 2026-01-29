// scripts/optimize-images.js
const sharp = require('sharp');
const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

// Configuración
const CONFIG = {
  quality: {
    webp: 80,
    jpeg: 75,
    avif: 70
  },
  sizes: [140, 200, 400, 800, 1200], // Los tamaños que necesitas
  formats: ['webp', 'jpg'] // También podrías añadir 'avif'
};

async function optimizeImage(inputPath, outputDir) {
  const filename = path.basename(inputPath, path.extname(inputPath));
  
  for (const size of CONFIG.sizes) {
    for (const format of CONFIG.formats) {
      const outputPath = path.join(outputDir, `${filename}-${size}.${format}`);
      
      // Si ya existe, saltar
      if (await fs.pathExists(outputPath)) {
        continue;
      }
      
      try {
        let pipeline = sharp(inputPath)
          .resize(size, size, {
            fit: 'cover',
            withoutEnlargement: true,
            fastShrinkOnLoad: true
          });
        
        switch (format) {
          case 'webp':
            pipeline = pipeline.webp({ 
              quality: CONFIG.quality.webp,
              effort: 4 // Balance entre calidad y velocidad
            });
            break;
          case 'jpg':
            pipeline = pipeline.jpeg({ 
              quality: CONFIG.quality.jpeg,
              mozjpeg: true 
            });
            break;
          case 'avif':
            pipeline = pipeline.avif({ 
              quality: CONFIG.quality.avif,
              effort: 5 
            });
            break;
        }
        
        await pipeline.toFile(outputPath);
        console.log(`✓ Generado: ${path.basename(outputPath)}`);
        
      } catch (error) {
        console.error(`✗ Error procesando ${inputPath}:`, error.message);
      }
    }
  }
}

async function optimizeAllImages() {
  console.log('🔄 Iniciando optimización de imágenes...\n');
  
  // Patrones a buscar
  const patterns = [
    'public/assets/imagenes/productos/**/*.jpg',
    'public/assets/imagenes/productos/**/*.jpeg',
    'public/assets/imagenes/productos/**/*.png',
    'public/assets/imagenes/pagina-principal/**/*.jpg',
    'public/assets/imagenes/pagina-principal/**/*.png',
    'public/assets/imagenes/categorias/**/*.jpg',
    'public/assets/imagenes/categorias/**/*.png'
  ];
  
  let processedCount = 0;
  const startTime = Date.now();
  
  for (const pattern of patterns) {
    const files = glob.sync(pattern);
    
    for (const file of files) {
      const relativePath = path.relative(process.cwd(), file);
      console.log(`📁 Procesando: ${relativePath}`);
      
      const parsed = path.parse(file);
      const optimizedDir = path.join(parsed.dir, 'optimized');
      
      // Crear directorio optimized si no existe
      await fs.ensureDir(optimizedDir);
      
      await optimizeImage(file, optimizedDir);
      processedCount++;
    }
  }
  
  const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`\n✅ Proceso completado!`);
  console.log(`📊 Total imágenes procesadas: ${processedCount}`);
  console.log(`⏱️  Tiempo total: ${elapsedTime} segundos`);
}

// Ejecutar si se llama directamente
if (require.main === module) {
  optimizeAllImages().catch(console.error);
}

module.exports = { optimizeAllImages };
