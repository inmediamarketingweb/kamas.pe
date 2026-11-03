export const normalizar = (str) => {
    if (!str) return '';
    return String(str)
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim();
};

export const aSlug = (str) => normalizar(str).replace(/\s+/g, '-');

export const formatearEtiqueta = (clave) => {
    return clave
        .replace(/-/g, ' ')
        .trim()
        .split(' ')
        .map((palabra, i) => {
            const lower = palabra.toLowerCase();
            if (i > 0 && ['de', 'del', 'la', 'el', 'y', 'en', 'con'].includes(lower)) {
                return lower;
            }
            return lower.charAt(0).toUpperCase() + lower.slice(1);
        })
        .join(' ');
};

export const formatearModelo = (str) => {
    if (!str) return '';
    return String(str).trim().toUpperCase();
};

let archivosCache = null;

export const cargarArchivosDelManifest = async () => {
    if (archivosCache) return archivosCache;

    try {
        const raiz = await fetch('/assets/json/manifest.json').then((r) => r.json());
        const subManifests = raiz.files || [];

        const todos = [];
        for (const sub of subManifests) {
            try {
                const data = await fetch(sub).then((r) => r.json());
                const files = data.files || [];
                todos.push(...files);
            } catch {
                continue;
            }
        }
        archivosCache = todos;
        return todos;
    } catch (err) {
        console.error('Error cargando manifest:', err);
        archivosCache = [];
        return [];
    }
};

export const FIRMEZA_POR_MODELO = {
    adel: 'suave',
    rucay: 'suave',
    sarki: 'suave',
    safynnte: 'medio-suave',
    'der-prinz': 'intermedio',
    'thameo-pocket': 'intermedio',
    ramat: 'intermedio',
    nesie: 'firme',
    norole: 'muy firme',
    'thaleo pocket': 'muy firme',
    konig: 'muy firme',
    yurmale: 'muy firme',
};

export const NIVELES_VALIDOS = [
    'muy suave',
    'suave',
    'intermedio',
    'firme',
    'muy firme',
];

export const TAMANOS_POSIBLES = [
    '1 plaza y media',
    '2 plazas',
    '4 plazas',
    '1 plaza',
    'queen',
    'king',
];

export const obtenerTamanoDeNombre = (nombre) => {
    const nombreNorm = normalizar(nombre);
    return TAMANOS_POSIBLES.find((t) => nombreNorm.includes(normalizar(t))) || null;
};

export const limpiarTitulo = (nombre) => {
    if (!nombre) return '';
    return nombre
        .replace(/\s+\d+\s*plaza(s)?(\s+y\s+media)?/i, '')
        .replace(/\s+(king|queen|full|twin)/i, '')
        .trim();
};
