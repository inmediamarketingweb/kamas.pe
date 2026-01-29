#!/bin/bash

echo "🚀 Iniciando despliegue de Kamas.pe..."
cd /var/www/kamas.pe || { echo "❌ Error: No se pudo acceder al directorio"; exit 1; }

# 1. Actualizar código
echo "📥 Actualizando código desde Git..."
git reset --hard
git clean -fd
git pull origin main

# 2. Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

# 3. Limpiar build anterior
echo "🧹 Limpiando build anterior..."
sudo rm -rf /var/www/kamas.pe/build

# 4. Construir proyecto
echo "🏗️  Construyendo proyecto..."
npm run build

# 5. Obtener hash del commit para cache busting
COMMIT_HASH=$(git rev-parse --short HEAD)
echo "🏷️  Versión del commit: $COMMIT_HASH"

# 6. Reemplazar en el CSS la versión (query parameter)
echo "🔄 Agregando versión al CSS..."
sed -i "s|href=\"/css/main.css\"|href=\"/css/main.css?v=$COMMIT_HASH\"|g" /var/www/kamas.pe/build/index.html

# 7. Mover a directorio de producción (AJUSTA ESTA RUTA)
echo "📤 Moviendo a producción..."
# Si tu servidor sirve desde /var/www/kamas.pe/build/
# O si necesitas copiar a otro directorio:
# sudo cp -r /var/www/kamas.pe/build/* /var/www/html/kamas.pe/

# 8. Ajustar permisos
echo "🔒 Ajustando permisos..."
sudo chown -R www-data:www-data /var/www/kamas.pe/build
sudo chmod -R 755 /var/www/kamas.pe/build

# 9. Limpiar cache del navegador (Opcional - para CDN/Cloudflare)
echo "🧼 Limpiando caché..."
# curl -X POST "https://api.cloudflare.com/client/v4/zones/TU_ZONA_ID/purge_cache" \
#      -H "Authorization: Bearer TU_API_TOKEN" \
#      -H "Content-Type: application/json" \
#      --data '{"files":["https://kamas.pe/css/main.css"]}'

echo "✅ ¡Despliegue completado exitosamente!"
echo "🌐 Visita: https://kamas.pe"
echo "📊 CSS: /css/main.css?v=$COMMIT_HASH"