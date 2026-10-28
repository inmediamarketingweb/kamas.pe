// import { useState, useEffect } from 'react';

// import { Producto } from '../../../../Componentes/Plantillas/Producto/Producto';
// import SpinnerLoading from '../../../../Componentes/SpinnerLoading/SpinnerLoading';

// const BASE_URL = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL) || '/';
// const BASE = BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL;

// function resolveUrl(filePath){
//     if (/^https?:\/\//i.test(filePath)) return filePath;
//     if (filePath.startsWith('/')) return BASE + filePath;
//     return BASE + '/assets/json/' + filePath;
// }

// function getCategoria(producto){
//     return producto['categoría'] ?? producto.categoria;
// }

// function normalizeCategoria(str){
//     if (!str) return '';
//     return String(str)
//         .toLowerCase()
//         .trim()
//         .normalize('NFD')
//         .replace(/[\u0300-\u036f]/g, '')
//         .replace(/\s+/g, '-');
// }

// // 🔹 Detecta si un JSON es un "manifest" (tiene { files: [...] }) o un archivo de productos
// function isManifest(data){
//     return data && Array.isArray(data.files);
// }

// // 🔹 Carga un JSON y, si es un manifest, carga recursivamente todos sus archivos
// async function loadJsonTree(filePath, visited = new Set()){
//     const url = resolveUrl(filePath);

//     if (visited.has(url)) return [];
//     visited.add(url);

//     try {
//         const res = await fetch(url);

//         if (!res.ok){
//             console.warn(`⚠️ [MasProductos] ${res.status} al cargar ${url}`);
//             return [];
//         }

//         const contentType = res.headers.get('content-type') || '';
//         if (!contentType.includes('application/json')){
//             console.warn(`⚠️ [MasProductos] ${url} no es JSON (${contentType})`);
//             return [];
//         }

//         const data = await res.json();

//         // Si es un manifest, cargamos todos sus hijos recursivamente
//         if (isManifest(data)){
//             const childrenResults = await Promise.all(
//                 data.files.map((childPath) => loadJsonTree(childPath, visited))
//             );
//             return childrenResults.flat();
//         }

//         // Si es un archivo de productos, lo devolvemos como un nodo
//         return [data];
//     } catch (err){
//         console.warn(`⚠️ [MasProductos] Error al cargar ${url}:`, err.message);
//         return [];
//     }
// }

// // 🔹 Extrae la lista de productos de un nodo JSON, soportando varios formatos
// function extractProductos(data){
//     if (!data) return [];
//     if (Array.isArray(data.productos)) return data.productos;
//     if (Array.isArray(data)) return data;
//     if (data.sku) return [data];
//     return [];
// }

// export default function MasProductos({ categoriaActual }){
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [refreshTrigger, setRefreshTrigger] = useState(0);

//     useEffect(() => {
//         async function fetchRandomProducts(){
//             try {
//                 // 1. Cargamos el manifest raíz y aplanamos toda la jerarquía
//                 const rootManifestUrl = resolveUrl('/assets/json/manifest.json');
//                 const rootRes = await fetch(rootManifestUrl);

//                 if (!rootRes.ok){
//                     throw new Error(
//                         `Manifest raíz no encontrado (${rootRes.status}) en ${rootManifestUrl}`
//                     );
//                 }

//                 const rootContentType = rootRes.headers.get('content-type') || '';
//                 if (!rootContentType.includes('application/json')){
//                     const preview = await rootRes.text();
//                     console.error(
//                         '❌ [MasProductos] El manifest raíz NO es JSON. Primeros 200 caracteres:',
//                         preview.slice(0, 200)
//                     );
//                     throw new Error(`El manifest raíz no es JSON. Content-Type: ${rootContentType}`);
//                 }

//                 const rootManifest = await rootRes.json();
//                 const rootFiles = Array.isArray(rootManifest.files) ? rootManifest.files : [];

//                 // 2. Aplanamos recursivamente toda la jerarquía
//                 const visited = new Set();
//                 const allData = (
//                     await Promise.all(rootFiles.map((f) => loadJsonTree(f, visited)))
//                 ).flat();

//                 const target = normalizeCategoria(categoriaActual);

//                 // 3. Recogemos todas las categorías disponibles (para log)
//                 const categoriasDisponibles = new Set();
//                 allData.forEach((data) => {
//                     extractProductos(data).forEach((p) => {
//                         const c = getCategoria(p);
//                         if (c) categoriasDisponibles.add(c);
//                     });
//                 });

//                 console.log('🧪 [MasProductos] nodos JSON cargados:', allData.length);
//                 console.log('🧪 [MasProductos] primer nodo (keys):', allData[0] ? Object.keys(allData[0]) : 'vacío');
//                 console.log('🧪 [MasProductos] categoriaActual:', JSON.stringify(categoriaActual));
//                 console.log('🧪 [MasProductos] categorías en JSON:', [...categoriasDisponibles]);

//                 // 4. Filtramos productos por categoría (tolerante: igual, contiene o es contenido)
//                 const categoryProducts = allData.reduce((acc, data) => {
//                     const lista = extractProductos(data);
//                     const matches = lista.filter((p) => {
//                         const catProd = normalizeCategoria(getCategoria(p));
//                         if (!catProd || !target) return false;
//                         return (
//                             catProd === target ||
//                             catProd.includes(target) ||
//                             target.includes(catProd)
//                         );
//                     });
//                     return acc.concat(matches);
//                 }, []);

//                 console.log('🧪 [MasProductos] total productos filtrados:', categoryProducts.length);

//                 if (!categoryProducts.length){
//                     setProducts([]);
//                     return;
//                 }

//                 // 5. Mezclamos aleatoriamente
//                 for (let i = categoryProducts.length - 1; i > 0; i--){
//                     const j = Math.floor(Math.random() * (i + 1));
//                     [categoryProducts[i], categoryProducts[j]] = [
//                         categoryProducts[j],
//                         categoryProducts[i]
//                     ];
//                 }

//                 const selected = categoryProducts.slice(0, 20);
//                 setProducts(selected);
//             } catch (err){
//                 console.error('❌ [MasProductos] Error al cargar:', err.message);
//                 setProducts([]);
//             } finally {
//                 setLoading(false);
//             }
//         }

//         if (categoriaActual){
//             setLoading(true);
//             fetchRandomProducts();
//         } else {
//             setLoading(false);
//             setProducts([]);
//         }
//     }, [categoriaActual, refreshTrigger]);

//     const handleRefresh = () => {
//         setRefreshTrigger((prev) => prev + 1);
//     };

//     if (loading){
//         return <SpinnerLoading />;
//     }

//     if (!products.length){
//         return null;
//     }

//     const truncate = (str, maxLength) =>
//         str.length <= maxLength ? str : str.slice(0, maxLength) + '...';

//     return (
//         <div className='block-container pagina-producto-mas-productos-block-container'>
//             <div className='block-content'>
//                 <div className='d-flex-column gap-10'>
//                     <div className="product-page-more-products-container d-flex-column gap-10">
//                         <p className='font-bold uppercase color-color-1'>Productos relacionados</p>

//                         <nav className="product-page-more-products-content">
//                             <ul className='d-grid-5-3-2fr gap-10'>
//                                 {products.map((producto) => (
//                                     <Producto
//                                         key={producto.sku}
//                                         producto={producto}
//                                         truncate={truncate}
//                                     />
//                                 ))}
//                             </ul>
//                         </nav>
//                     </div>

//                     <button
//                         onClick={handleRefresh}
//                         className='button-link button-link-2 margin-left'
//                     >
//                         <p className='button-link-text'>Ver más</p>
//                         <span className="material-symbols-outlined">cached</span>
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

import { useState, useEffect } from 'react';

import { Producto } from '../../../../Componentes/Plantillas/Producto/Producto';
import SpinnerLoading from '../../../../Componentes/SpinnerLoading/SpinnerLoading';

const BASE_URL = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL) || '/';
const BASE = BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL;

function resolveUrl(filePath){
    if (/^https?:\/\//i.test(filePath)) return filePath;
    if (filePath.startsWith('/')) return BASE + filePath;
    return BASE + '/assets/json/' + filePath;
}

function getCategoria(producto){
    return producto['categoría'] ?? producto.categoria;
}

function normalizeCategoria(str){
    if (!str) return '';
    return String(str)
        .toLowerCase()
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-');
}

// 🔹 Detecta si un JSON es un "manifest" (tiene { files: [...] }) o un archivo de productos
function isManifest(data){
    return data && Array.isArray(data.files);
}

// 🔹 Carga un JSON y, si es un manifest, carga recursivamente todos sus archivos
async function loadJsonTree(filePath, visited = new Set()){
    const url = resolveUrl(filePath);

    if (visited.has(url)) return [];
    visited.add(url);

    try {
        const res = await fetch(url);

        if (!res.ok){
            console.warn(`⚠️ [MasProductos] ${res.status} al cargar ${url}`);
            return [];
        }

        const contentType = res.headers.get('content-type') || '';
        if (!contentType.includes('application/json')){
            console.warn(`⚠️ [MasProductos] ${url} no es JSON (${contentType})`);
            return [];
        }

        const data = await res.json();

        if (isManifest(data)){
            const childrenResults = await Promise.all(
                data.files.map((childPath) => loadJsonTree(childPath, visited))
            );
            return childrenResults.flat();
        }

        return [data];
    } catch (err){
        console.warn(`⚠️ [MasProductos] Error al cargar ${url}:`, err.message);
        return [];
    }
}

// 🔹 Extrae la lista de productos de un nodo JSON, soportando varios formatos
function extractProductos(data){
    if (!data) return [];
    if (Array.isArray(data.productos)) return data.productos;
    if (Array.isArray(data)) return data;
    if (data.sku) return [data];
    return [];
}

export default function MasProductos({ categoriaActual }){
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    // 🔍 log de montaje
    console.log('🎬 [MasProductos] montado con categoriaActual:', JSON.stringify(categoriaActual));

    useEffect(() => {
        async function fetchRandomProducts(){
            try {
                // 1. Cargamos el manifest raíz y aplanamos toda la jerarquía
                const rootManifestUrl = resolveUrl('/assets/json/manifest.json');
                const rootRes = await fetch(rootManifestUrl);

                if (!rootRes.ok){
                    throw new Error(
                        `Manifest raíz no encontrado (${rootRes.status}) en ${rootManifestUrl}`
                    );
                }

                const rootContentType = rootRes.headers.get('content-type') || '';
                if (!rootContentType.includes('application/json')){
                    const preview = await rootRes.text();
                    console.error(
                        '❌ [MasProductos] El manifest raíz NO es JSON. Primeros 200 caracteres:',
                        preview.slice(0, 200)
                    );
                    throw new Error(`El manifest raíz no es JSON. Content-Type: ${rootContentType}`);
                }

                const rootManifest = await rootRes.json();
                const rootFiles = Array.isArray(rootManifest.files) ? rootManifest.files : [];

                // 2. Aplanamos recursivamente toda la jerarquía
                const visited = new Set();
                const allData = (
                    await Promise.all(rootFiles.map((f) => loadJsonTree(f, visited)))
                ).flat();

                const target = normalizeCategoria(categoriaActual);

                // 3. Recogemos todas las categorías disponibles (para log)
                const categoriasDisponibles = new Set();
                allData.forEach((data) => {
                    extractProductos(data).forEach((p) => {
                        const c = getCategoria(p);
                        if (c) categoriasDisponibles.add(c);
                    });
                });

                console.log('🧪 [MasProductos] nodos JSON cargados:', allData.length);
                console.log('🧪 [MasProductos] primer nodo (keys):', allData[0] ? Object.keys(allData[0]) : 'vacío');
                console.log('🧪 [MasProductos] categoriaActual:', JSON.stringify(categoriaActual));
                console.log('🧪 [MasProductos] categorías en JSON:', [...categoriasDisponibles]);

                // 4. Filtramos productos por categoría (tolerante)
                const categoryProducts = allData.reduce((acc, data) => {
                    const lista = extractProductos(data);
                    const matches = lista.filter((p) => {
                        const catProd = normalizeCategoria(getCategoria(p));
                        if (!catProd || !target) return false;
                        return (
                            catProd === target ||
                            catProd.includes(target) ||
                            target.includes(catProd)
                        );
                    });
                    return acc.concat(matches);
                }, []);

                console.log('🧪 [MasProductos] total productos filtrados:', categoryProducts.length);

                if (!categoryProducts.length){
                    setProducts([]);
                    return;
                }

                // 5. Mezclamos aleatoriamente
                for (let i = categoryProducts.length - 1; i > 0; i--){
                    const j = Math.floor(Math.random() * (i + 1));
                    [categoryProducts[i], categoryProducts[j]] = [
                        categoryProducts[j],
                        categoryProducts[i]
                    ];
                }

                const selected = categoryProducts.slice(0, 20);
                setProducts(selected);
            } catch (err){
                console.error('❌ [MasProductos] Error al cargar:', err.message);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        }

        if (categoriaActual){
            setLoading(true);
            fetchRandomProducts();
        } else {
            setLoading(false);
            setProducts([]);
        }
    }, [categoriaActual, refreshTrigger]);

    const handleRefresh = () => {
        setRefreshTrigger((prev) => prev + 1);
    };

    if (loading){
        return <SpinnerLoading />;
    }

    // 🔍 TEMPORAL: comentado para ver el título aunque no haya productos
    // if (!products.length){
    //     return null;
    // }

    const truncate = (str, maxLength) =>
        str.length <= maxLength ? str : str.slice(0, maxLength) + '...';

    return (
        <div className='block-container pagina-producto-mas-productos-block-container'>
            <div className='block-content'>
                <div className='d-flex-column gap-10'>
                    <div className="product-page-more-products-container d-flex-column gap-10">
                        <p className='font-bold uppercase color-color-1'>Productos relacionados</p>

                        {products.length === 0 ? (
                            <p style={{ color: '#999', fontSize: '0.9rem' }}>
                                (sin productos para mostrar — revisa los logs 🧪)
                            </p>
                        ) : (
                            <nav className="product-page-more-products-content">
                                <ul className='d-grid-5-3-2fr gap-10'>
                                    {products.map((producto) => (
                                        <Producto
                                            key={producto.sku}
                                            producto={producto}
                                            truncate={truncate}
                                        />
                                    ))}
                                </ul>
                            </nav>
                        )}
                    </div>

                    <button
                        onClick={handleRefresh}
                        className='button-link button-link-2 margin-left'
                    >
                        <p className='button-link-text'>Ver más</p>
                        <span className="material-symbols-outlined">cached</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
