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
    return String(str).toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-');
}

export default function MasProductos({ categoriaActual }){
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    useEffect(() => {
        async function fetchRandomProducts(){
            try {
                const manifestUrl = resolveUrl('/assets/json/manifest.json');
                const manifestRes = await fetch(manifestUrl);

                if (!manifestRes.ok){
                    throw new Error(
                        `Manifest no encontrado (${manifestRes.status}) en ${manifestUrl}`
                    );
                }

                const manifestContentType = manifestRes.headers.get('content-type') || '';
                if (!manifestContentType.includes('application/json')){
                    const preview = await manifestRes.text();
                    console.error(
                        '❌ [MasProductos] El manifest NO es JSON. Primeros 200 caracteres:',
                        preview.slice(0, 200)
                    );
                    throw new Error(`El manifest no es JSON. Content-Type: ${manifestContentType}`);
                }

                const manifest = await manifestRes.json();
                const files = Array.isArray(manifest.files) ? manifest.files : [];

                const allData = await Promise.all(
                    files.map(async (filePath) => {
                        const url = resolveUrl(filePath);
                        const res = await fetch(url);

                        if (!res.ok){
                            console.warn(`⚠️ [MasProductos] ${res.status} al cargar ${url}`);
                            return { productos: [] };
                        }

                        const contentType = res.headers.get('content-type') || '';
                        if (!contentType.includes('application/json')){
                            console.warn(
                                `⚠️ [MasProductos] ${url} no es JSON (${contentType})`
                            );
                            return { productos: [] };
                        }

                        return res.json();
                    })
                );

                const target = normalizeCategoria(categoriaActual);

                const categoriasDisponibles = new Set();
                allData.forEach((data) => {
                    if (Array.isArray(data.productos)){
                        data.productos.forEach((p) => {
                            const c = getCategoria(p);
                            if (c) categoriasDisponibles.add(c);
                        });
                    }
                });

                console.log('🧪 [MasProductos] categoriaActual:', JSON.stringify(categoriaActual));
                console.log('🧪 [MasProductos] categorías en JSON:', [...categoriasDisponibles]);

                const categoryProducts = allData.reduce((acc, data) => {
                    if (Array.isArray(data.productos)){
                        const matches = data.productos.filter((p) => {
                            const catProd = getCategoria(p);
                            return normalizeCategoria(catProd) === target;
                        });
                        return acc.concat(matches);
                    }
                    return acc;
                }, []);

                if (!categoryProducts.length){
                    setProducts([]);
                    return;
                }

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

    const truncate = (str, maxLength) =>
        str.length <= maxLength ? str : str.slice(0, maxLength) + '...';

    return (
        <div className='block-container pagina-producto-mas-productos-block-container'>
            <div className='block-content'>
                <div className='d-flex-column gap-10'>
                    <div className="product-page-more-products-container d-flex-column gap-10">
                        <p className='font-bold uppercase color-color-1'>Productos relacionados</p>

                        <nav className="product-page-more-products-content">
                            <ul className='d-grid-5-3-2fr gap-10'>
                                {products.map((producto) => (
                                    <Producto key={producto.sku} producto={producto} truncate={truncate}/>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    <button onClick={handleRefresh} className='button-link button-link-2 margin-left'>
                        <p className='button-link-text'>Ver más</p>
                        <span className="material-symbols-outlined">cached</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
