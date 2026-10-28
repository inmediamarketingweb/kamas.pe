import { useState, useEffect } from 'react';

import './Descripcion.css';

const FIRMEZA_POR_MODELO = {
    'adel': 'suave',
    'rucay': 'suave',
    'sarki': 'suave',
    'safynnte': 'medio-suave',
    'der-prinz': 'intermedio',
    'thameo-pocket': 'intermedio',
    'ramat': 'intermedio',
    'nesie': 'firme',
    'norole': 'muy firme',
    'thaleo pocket': 'muy firme',
    'konig': 'muy firme',
    'yurmale': 'muy firme',
};

const normalizar = (str) => {
    if (!str) return '';
    return String(str)
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim();
};
const aSlug = (str) => normalizar(str).replace(/\s+/g, '-');
let archivosCache = null;

const cargarArchivosDelManifest = async () => {
    if (archivosCache) return archivosCache;

    try {
        const raiz = await fetch('/assets/json/manifest.json').then(r => r.json());
        const subManifests = raiz.files || [];

        const todos = [];
        for (const sub of subManifests) {
            try {
                const data = await fetch(sub).then(r => r.json());
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

function Description({ producto }){
    const [medidasData, setMedidasData] = useState([]);
    const [descripcionesData, setDescripcionesData] = useState([]);
    const [colchonData, setColchonData] = useState(null);
    const [modeloImg, setModeloImg] = useState(null);
    const categoria = (producto?.['categoría'] ?? producto?.categoria ?? '').toLowerCase().trim();
    const esColchon = categoria === 'colchones';
    const esDormitorio = categoria === 'dormitorios' || categoria === 'dormitorio';
    const nombre = producto?.nombre || '';
    const detalles = Array.isArray(producto?.descripcion) && producto.descripcion[0] ? producto.descripcion[0] : {};
    const modeloColchon = detalles['modelo-de-colchón'] || detalles['modelo-de-colchon'] || detalles['nombre-de-colchón'] || detalles['nombre-de-colchon'] || detalles['modelo'] || '';
    const modeloSlug = aSlug(modeloColchon);

    useEffect(() => {
        const cargarJson = async () => {
            try {
                const [resMedidas, resDesc] = await Promise.all([
                    fetch('/assets/json/medidas.json'),
                    fetch('/assets/json/descripciones.json'),
                ]);
                const dataMedidas = await resMedidas.json();
                const dataDesc = await resDesc.json();
                setMedidasData(dataMedidas.descripciones || []);
                setDescripcionesData(dataDesc.descripciones || []);
            } catch (err) {
                console.error('Error cargando JSON:', err);
            }
        };
        cargarJson();
    }, []);

    useEffect(() => {
        if (!esDormitorio || !modeloSlug) {
            setColchonData(null);
            return;
        }

        let cancelado = false;

        const buscarColchon = async () => {
            try {
                const archivos = await cargarArchivosDelManifest();
                const nombreNormLocal = normalizar(nombre);
                const tamanos = ['1 plaza y media', '2 plazas', '4 plazas', '1 plaza', 'queen', 'king'];
                const tamanoDom = tamanos.find(t => nombreNormLocal.includes(normalizar(t))) || '';
                let encontrado = null;

                for (const archivo of archivos) {
                    const archivoNorm = normalizar(archivo);
                    if (!archivoNorm.includes('colchones')) continue;
                    if (!archivoNorm.includes(modeloSlug)) continue;
                    if (tamanoDom && !archivoNorm.includes(normalizar(tamanoDom).replace(/\s+/g, '-'))) continue;

                    try {
                        const data = await fetch(archivo).then(r => r.json());
                        if (!data || !Array.isArray(data.productos)) continue;

                        const colchon = data.productos.find(p => {
                            const cat = normalizar(p['categoría'] ?? p.categoria);
                            if (cat !== 'colchones') return false;
                            const d = Array.isArray(p.descripcion) && p.descripcion[0] ? p.descripcion[0] : {};
                            const m = d['modelo-de-colchón'] || d['modelo-de-colchon'] || d['nombre-de-colchón'] || d['nombre-de-colchon'] || d['modelo'] || '';
                            return aSlug(m) === modeloSlug;
                        });

                        if (colchon) { encontrado = colchon; break; }
                    } catch { continue; }
                }

                if (!encontrado) {
                    for (const archivo of archivos) {
                        const archivoNorm = normalizar(archivo);
                        if (!archivoNorm.includes('colchones')) continue;
                        if (!archivoNorm.includes(modeloSlug)) continue;

                        try {
                            const data = await fetch(archivo).then(r => r.json());
                            if (!data || !Array.isArray(data.productos)) continue;

                            const colchon = data.productos.find(p => {
                                const cat = normalizar(p['categoría'] ?? p.categoria);
                                if (cat !== 'colchones') return false;
                                const d = Array.isArray(p.descripcion) && p.descripcion[0] ? p.descripcion[0] : {};
                                const m = d['modelo-de-colchón'] || d['modelo-de-colchon'] || d['nombre-de-colchón'] || d['nombre-de-colchon'] || d['modelo'] || '';
                                return aSlug(m) === modeloSlug;
                            });

                            if (colchon) { encontrado = colchon; break; }
                        } catch { continue; }
                    }
                }

                if (!encontrado) {
                    for (const archivo of archivos) {
                        try {
                            const data = await fetch(archivo).then(r => r.json());
                            if (!data || !Array.isArray(data.productos)) continue;

                            const colchon = data.productos.find(p => {
                                const cat = normalizar(p['categoría'] ?? p.categoria);
                                if (cat !== 'colchones') return false;
                                const d = Array.isArray(p.descripcion) && p.descripcion[0] ? p.descripcion[0] : {};
                                const m = d['modelo-de-colchón'] || d['modelo-de-colchon'] || d['nombre-de-colchón'] || d['nombre-de-colchon'] || d['modelo'] || '';
                                return aSlug(m) === modeloSlug;
                            });

                            if (colchon) { encontrado = colchon; break; }
                        } catch { continue; }
                    }
                }

                if (!cancelado) setColchonData(encontrado);
            } catch (err) {
                console.error('Error buscando colchón:', err);
                if (!cancelado) setColchonData(null);
            }
        };
        buscarColchon();
        return () => { cancelado = true; };
    }, [esDormitorio, modeloSlug, nombre]);

    useEffect(() => {
        if (!esDormitorio || !colchonData?.fotos) {
            setModeloImg(null);
            return;
        }
        const base = colchonData.fotos.replace(/\/?$/, '/');
        const candidatos = [
            `${base}desc.jpg`,
            `${base}desc.jpeg`,
            `${base}desc.png`,
            `${base}desc.webp`,
        ];

        let cancelado = false;
        const probar = (i) => {
            if (i >= candidatos.length || cancelado) {
                if (!cancelado) setModeloImg(null);
                return;
            }
            const img = new Image();
            img.onload = () => { if (!cancelado) setModeloImg(candidatos[i]); };
            img.onerror = () => probar(i + 1);
            img.src = candidatos[i];
        };
        probar(0);

        return () => { cancelado = true; };
    }, [esDormitorio, colchonData]);

    if (!producto) return null;

    const mensajes = Array.isArray(producto.mensajes) ? producto.mensajes : [];
    const titulo = nombre
        .replace(/\s+\d+\s*plaza(s)?(\s+y\s+media)?/i, '')
        .replace(/\s+(king|queen|full|twin)/i, '')
        .trim();

    const mensajesColchon = (() => {
        if (colchonData && Array.isArray(colchonData.mensajes) && colchonData.mensajes.length > 0) {
            return colchonData.mensajes;
        }
        if (colchonData && Array.isArray(colchonData.descripcion) && colchonData.descripcion[0]?.mensajes) {
            return colchonData.descripcion[0].mensajes;
        }
        if (esColchon && mensajes.length > 0) {
            return mensajes;
        }
        return [];
    })();

    const formatearModelo = (str) => {
        if (!str) return '';
        return String(str).trim().toUpperCase();
    };

    const nombreColchonSinMedida = (() => {
        if (colchonData?.nombre) {
            return colchonData.nombre
                .replace(/\s+\d+\s*plaza(s)?(\s+y\s+media)?/i, '')
                .replace(/\s+(king|queen|full|twin)/i, '')
                .trim();
        }
        const matchColchon = nombre.match(/COLCH[ÓO]N\s+KAMAS\s+([A-ZÁÉÍÓÚÑ]+(?:\s+[A-ZÁÉÍÓÚÑ]+)*)/i);
        if (matchColchon && matchColchon[1]) {
            return `COLCHÓN KAMAS ${matchColchon[1].trim().toUpperCase()}`;
        }
        if (modeloColchon) {
            return `COLCHÓN KAMAS ${formatearModelo(modeloColchon)}`;
        }
        return '';
    })();

    const detallesColchon = colchonData && Array.isArray(colchonData.descripcion) && colchonData.descripcion[0]
        ? colchonData.descripcion[0]
        : (esColchon ? detalles : {});

    const modeloColchonFinal =
        detallesColchon['modelo-de-colchón'] ||
        detallesColchon['modelo-de-colchon'] ||
        detallesColchon['nombre-de-colchón'] ||
        detallesColchon['nombre-de-colchon'] ||
        detallesColchon['modelo'] ||
        modeloColchon;

    const modeloSlugFinal = aSlug(modeloColchonFinal);

    const nivelesValidos = ['muy suave', 'suave', 'intermedio', 'firme', 'muy firme'];
    let nivelConfort = detallesColchon['nivel-de-confort'] || detallesColchon['firmeza'] || '';
    let nivelNorm = normalizar(nivelConfort);

    if (!nivelesValidos.includes(nivelNorm) && modeloSlugFinal && FIRMEZA_POR_MODELO[modeloSlugFinal]) {
        nivelConfort = FIRMEZA_POR_MODELO[modeloSlugFinal];
        nivelNorm = normalizar(nivelConfort);
    }

    const firmezaImg = nivelesValidos.includes(nivelNorm)
        ? `/assets/imagenes/niveles-de-firmeza/thumb/${nivelNorm.replace(/\s+/g, '-')}.png`
        : null;

    const nombreNorm = normalizar(nombre);
    const TAMANOS_POSIBLES = ['1 plaza y media', '2 plazas', '4 plazas', '1 plaza', 'queen', 'king'];
    const tamanoDetectado = TAMANOS_POSIBLES.find(t => nombreNorm.includes(normalizar(t))) || null;
    const medidasEncontradas = tamanoDetectado
        ? medidasData.find(item => normalizar(Object.keys(item)[0]) === normalizar(tamanoDetectado))
        : null;
    const listaMedidas = medidasEncontradas ? Object.values(medidasEncontradas)[0] : [];

    const obtenerDescripcion = (palabra) => {
        if (!palabra) return [];
        const norm = normalizar(palabra);
        const encontrado = descripcionesData.find(item =>
            normalizar(Object.keys(item)[0]) === norm
        );
        return encontrado ? Object.values(encontrado)[0] : [];
    };

    const lineaValor = detalles['línea'] || detalles['linea'] || '';
    const lineaDescripcion = obtenerDescripcion(lineaValor);
    const cabeceraValor = detalles['tipo-de-cabecera'] || detalles['cabecera'] || '';
    const cabeceraDescripcion = obtenerDescripcion(cabeceraValor);

    const formatearEtiqueta = (clave) => {
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

    return(
        <div className='pd-pg-description'>
            <section className='block-content'>
                {esColchon && Object.keys(detalles).length > 0 && (
                    <div className='pd-pg-description-content'>
                        <div className='pd-pg-dsp-texts d-flex-column gap-10'>
                            <p className='title font-bold'>{titulo}</p>

                            <ul className='d-flex-column gap-5'>
                                {mensajes.map((msg, i) => (
                                    <li key={i}>
                                        <p className='text'>{msg}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className='d-grid-2-1fr gap-10'>
                            <div className='d-flex-column gap-10'>
                                <p className='title font-bold'>COLCHÓN {formatearModelo(modeloColchon)}</p>

                                <ul className='chr-list'>
                                    {Object.entries(detalles).map(([clave, valor]) => (
                                        <li key={clave} className='d-flex w-100'>
                                            <div className='d-flex-center-left gap-5'>
                                                <b className='color-black font-weight first-uppercase'>{formatearEtiqueta(clave)}:</b>
                                                <p className='text first-uppercase margin-right'>{valor}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className='d-flex-column gap-10'>
                                <p className='title font-bold'>MEDIDAS {tamanoDetectado ? tamanoDetectado.toUpperCase() : ''}</p>

                                <ul className='chr-list'>
                                    {listaMedidas.length > 0 ? (
                                        listaMedidas.map((grupo, idx) =>
                                            Object.entries(grupo).map(([clave, valor]) => (
                                                <li key={`${idx}-${clave}`} className='d-flex w-100'>
                                                    <div className='d-flex-center-left gap-5'>
                                                        <b className='color-black font-weight first-uppercase'>
                                                            {formatearEtiqueta(clave)}:
                                                        </b>
                                                        <p className='text first-uppercase margin-right'>{valor}</p>
                                                    </div>
                                                </li>
                                            ))
                                        )
                                    ) : (
                                        <li>
                                            <p className='text'>Medidas no disponibles para este tamaño.</p>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {esDormitorio && (
                    <div className='pd-pg-description-content'>
                        <div className='pd-pg-dsp-texts d-flex-column gap-20'>
                            <p className='title font-bold'>{nombreColchonSinMedida || titulo}</p>

                            <div className='d-grid-2-1fr gap-10'>
                                {modeloImg && (
                                    <img className='w-100 d-flex' src={modeloImg} alt={modeloColchonFinal} loading="lazy" />
                                )}
                                {firmezaImg && (
                                    <img className='w-100 d-flex' src={firmezaImg} alt={nivelConfort} loading="lazy" />
                                )}
                            </div>

                            <ul className='d-flex-column gap-5'>
                                {mensajesColchon.length > 0 ? (
                                    mensajesColchon.map((msg, i) => (
                                        <li key={i}>
                                            <p className='text'>{msg}</p>
                                        </li>
                                    ))
                                ) : (
                                    <li>
                                        <p className='text'>Sin información del colchón.</p>
                                    </li>
                                )}
                            </ul>
                        </div>

                        <div className='d-flex-column gap-20'>
                            <div className='d-flex-column gap-10'>
                                <p className='title font-bold'>DESCRIPCION DEL PRODUCTO</p>

                                <ul className='chr-list'>
                                    {Object.entries(detalles).map(([clave, valor]) => (
                                        <li key={clave}>
                                            <div className='d-flex gap-5'>
                                                <b className='color-black font-weight first-uppercase'>
                                                    {formatearEtiqueta(clave)}:
                                                </b>
                                                <p className='text first-uppercase'>{valor}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className='d-grid-2-1fr gap-20'>
                                <div className='d-flex-column gap-10'>
                                    <p className='title font-bold'>
                                        {lineaValor ? `LÍNEA ${lineaValor.toUpperCase()}` : 'LÍNEA'}
                                    </p>

                                    <ul className='chr-list'>
                                        {lineaDescripcion.length > 0 ? (
                                            lineaDescripcion.map((grupo, idx) =>
                                                Object.entries(grupo).map(([clave, valor]) => (
                                                    <li key={`${idx}-${clave}`}>
                                                        <div className='d-flex gap-5'>
                                                            <b className='color-black font-weight first-uppercase'>
                                                                {formatearEtiqueta(clave)}:
                                                            </b>
                                                            <p className='text first-uppercase'>{valor}</p>
                                                        </div>
                                                    </li>
                                                ))
                                            )
                                        ) : (
                                            <li><p className='text'>Sin información de línea.</p></li>
                                        )}
                                    </ul>
                                </div>

                                <div className='d-flex-column gap-10'>
                                    <p className='title font-bold'>
                                        {cabeceraValor ? `CABECERA ${cabeceraValor.toUpperCase()}` : 'CABECERA'}
                                    </p>

                                    <ul className='chr-list'>
                                        {cabeceraDescripcion.length > 0 ? (
                                            cabeceraDescripcion.map((grupo, idx) =>
                                                Object.entries(grupo).map(([clave, valor]) => (
                                                    <li key={`${idx}-${clave}`}>
                                                        <div className='d-flex gap-5'>
                                                            <b className='color-black font-weight first-uppercase'>
                                                                {formatearEtiqueta(clave)}:
                                                            </b>
                                                            <p className='text first-uppercase'>{valor}</p>
                                                        </div>
                                                    </li>
                                                ))
                                            )
                                        ) : (
                                            <li><p className='text'>Sin información de cabecera.</p></li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </div>
    )
}

export default Description;
