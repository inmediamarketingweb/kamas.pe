// src/utils/loadProductos.js
let cachePromise = null;

const fetchJSON = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`HTTP ${res.status} en ${url}`);
    }
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
        throw new Error(`Respuesta no-JSON en ${url} (content-type: ${contentType})`);
    }
    return res.json();
};

// Recorre cualquier nodo del manifest:
// - si tiene "productos" -> los devuelve
// - si tiene "files" -> baja un nivel recursivamente
const recolectar = async (url, depth = 0) => {
    if (depth > 5) {
        console.warn(`⚠️ Profundidad máxima alcanzada en: ${url}`);
        return [];
    }

    let data;
    try {
        data = await fetchJSON(url);
    } catch (err) {
        console.error(`❌ Error cargando ${url}:`, err.message);
        return [];
    }

    if (Array.isArray(data.productos)) {
        return data.productos;
    }

    if (Array.isArray(data.files)) {
        const resultados = await Promise.allSettled(
            data.files.map((hijo) => recolectar(hijo, depth + 1))
        );
        return resultados
            .filter((r) => r.status === 'fulfilled')
            .flatMap((r) => r.value);
    }

    console.warn(`⚠️ Archivo sin "productos" ni "files": ${url}`);
    return [];
};

export const cargarTodosLosProductos = () => {
    if (!cachePromise) {
        cachePromise = recolectar('/assets/json/manifest.json')
            .then((productos) => {
                console.log(`✅ loadProductos: ${productos.length} productos cargados`);
                return productos;
            })
            .catch((err) => {
                console.error('💥 Error crítico cargando productos:', err);
                cachePromise = null; // permite reintentar
                return [];
            });
    }
    return cachePromise;
};

// Útil si en algún momento quieres forzar recarga
export const resetProductosCache = () => {
    cachePromise = null;
};
