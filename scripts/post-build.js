const fs = require('fs');
const path = require('path');
const glob = require('glob'); // Necesitarás instalarlo: npm install glob

const buildDir = path.join(__dirname, '../build');

console.log('🔧 Iniciando post-build script...');

// 1. Crear directorio /css si no existe
const cssDir = path.join(buildDir, 'css');
if (!fs.existsSync(cssDir)) {
  fs.mkdirSync(cssDir, { recursive: true });
}

// 2. Buscar archivos CSS en build/static/css/
const cssFiles = glob.sync(path.join(buildDir, 'static/css/*.css'));

if (cssFiles.length === 0) {
  console.error('❌ No se encontraron archivos CSS en build/static/css/');
  process.exit(1);
}

// 3. Copiar el primer archivo CSS a /css/main.css
const mainCssFile = cssFiles[0];
const targetCssPath = path.join(cssDir, 'main.css');

fs.copyFileSync(mainCssFile, targetCssPath);
console.log(`✅ CSS copiado: ${path.basename(mainCssFile)} → /css/main.css`);

// 4. Buscar archivos JS en build/static/js/
const jsFiles = glob.sync(path.join(buildDir, 'static/js/*.js'));
const jsMainFile = jsFiles.find(file => file.includes('main.') || file.includes('runtime-'));
const jsChunkFiles = jsFiles.filter(file => !file.includes('main.') && !file.includes('runtime-'));

// 5. Crear directorio /js si no existe
const jsDir = path.join(buildDir, 'js');
if (!fs.existsSync(jsDir)) {
  fs.mkdirSync(jsDir, { recursive: true });
}

// 6. Copiar archivos JS manteniendo sus nombres originales (con hash)
if (jsMainFile) {
  const jsMainTarget = path.join(jsDir, path.basename(jsMainFile));
  fs.copyFileSync(jsMainFile, jsMainTarget);
  console.log(`✅ JS copiado: ${path.basename(jsMainFile)}`);
}

jsChunkFiles.forEach(file => {
  const target = path.join(jsDir, path.basename(file));
  fs.copyFileSync(file, target);
  console.log(`✅ JS chunk copiado: ${path.basename(file)}`);
});

// 7. Actualizar index.html para apuntar a las nuevas rutas
const indexPath = path.join(buildDir, 'index.html');
if (fs.existsSync(indexPath)) {
  let html = fs.readFileSync(indexPath, 'utf8');
  
  // Reemplazar rutas CSS
  cssFiles.forEach(cssFile => {
    const oldPath = `static/css/${path.basename(cssFile)}`;
    const newPath = `css/main.css`;
    html = html.replace(new RegExp(oldPath, 'g'), newPath);
  });
  
  // Reemplazar rutas JS
  jsFiles.forEach(jsFile => {
    const oldPath = `static/js/${path.basename(jsFile)}`;
    const newPath = `js/${path.basename(jsFile)}`;
    html = html.replace(new RegExp(oldPath, 'g'), newPath);
  });
  
  fs.writeFileSync(indexPath, html);
  console.log('✅ index.html actualizado con nuevas rutas');
}

// 8. Eliminar las carpetas static/ originales (opcional)
try {
  fs.rmSync(path.join(buildDir, 'static'), { recursive: true, force: true });
  console.log('🗑️  Carpeta static/ eliminada');
} catch (err) {
  console.log('⚠️  No se pudo eliminar static/, pero no hay problema');
}

console.log('🎉 Post-build completado exitosamente!');