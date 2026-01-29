#!/bin/bash

echo "🚀 Iniciando despliegue de Kamas.pe..."
cd /var/www/kamas.pe || { echo "❌ Error: No se pudo acceder al directorio"; exit 1; }

# 1. Actualizar código
echo "📥 Actualizando código desde Git..."
git fetch origin
git reset --hard origin/main

# 2. Instalar dependencias
echo "📦 Instalando dependencias..."
npm install --production

# 3. Limpiar build anterior
echo "🧹 Limpiando build anterior..."
rm -rf build

# 4. Construir proyecto
echo "🏗️  Construyendo proyecto..."
if npm run build; then
    echo "✅ Build exitoso"
else
    echo "❌ Build falló"
    exit 1
fi

# 5. Versión para cache
COMMIT_HASH=$(git rev-parse --short HEAD)
echo "🏷️  Versión: $COMMIT_HASH"

# 6. Permisos
echo "🔒 Ajustando permisos..."
chown -R www-data:www-data build
chmod -R 755 build

echo "✅ ¡Despliegue completado!"
echo "🌐 https://kamas.pe (v$COMMIT_HASH)"