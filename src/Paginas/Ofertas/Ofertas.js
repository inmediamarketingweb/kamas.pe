import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

import './Ofertas.css';

// import Categorias from './Componentes/Categorias/Categorias';
// import Filtros from '../../Paginas/Productos/Componentes/Filtros/Filtros';
import Filtros from './Componentes/FIltros/Filtros';
import ConteoRegresivo from '../../Componentes/ConteoRegresivo/ConteoRegresivo';
import { Producto } from '../../Componentes/Plantillas/Producto/Producto';

function Ofertas() {
    const [filtrosPrecio, setFiltrosPrecio] = useState([]);
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [favoritos, setFavoritos] = useState([]);
    const [tiempoAgotado, setTiempoAgotado] = useState(false);
    const [isOfferActive, setIsOfferActive] = useState(true);
    const [skusOfertas, setSkusOfertas] = useState([]);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const categoriaParam = searchParams.get('categoria');
    const categoria = categoriaParam ? categoriaParam.replace(/-/g, ' ') : null;

    const filtrosDetalles = {};
    searchParams.forEach((value, key) => {
        if (key !== 'categoria') {
            filtrosDetalles[key] = value.replace(/-/g, ' ');
        }
    });

    const handleExpire = () => setIsOfferActive(false);
    const handleActivate = () => setIsOfferActive(true);

    // Favoritos: cargar una vez
    useEffect(() => {
        const favoritosGuardados = localStorage.getItem('favoritos');
        if (favoritosGuardados) {
            try {
                setFavoritos(JSON.parse(favoritosGuardados));
            } catch {
                setFavoritos([]);
            }
        }
    }, []);

    // Favoritos: guardar cuando cambian
    useEffect(() => {
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
    }, [favoritos]);

    // Cargar SKUs de oferta + todos los productos del manifest
    useEffect(() => {
        let cancelado = false;

        const cargarOfertasYProductos = async () => {
            try {
                setLoading(true);
                setError(null);

                // 1) Lista de SKUs en oferta (RUTA CORREGIDA)
                const ofertasResponse = await fetch('/assets/json/productos/ofertas.json');
                if (!ofertasResponse.ok) {
                    throw new Error(`No se pudo cargar ofertas.json (${ofertasResponse.status})`);
                }

                const ofertasData = await ofertasResponse.json();
                const rawSkus = Array.isArray(ofertasData) ? ofertasData : (ofertasData.skus || []);

                const skus = rawSkus
                    .map(s => (typeof s === 'object' && s !== null ? s.sku : s))
                    .filter(s => s !== undefined && s !== null)
                    .map(String);

                if (cancelado) return;
                setSkusOfertas(skus);

                if (skus.length === 0) {
                    setProductos([]);
                    setLoading(false);
                    return;
                }

                const skusBuscados = new Set(skus);

                // 2) Manifest raíz
                const manifestResponse = await fetch('/assets/json/manifest.json');
                if (!manifestResponse.ok) {
                    throw new Error(`No se pudo cargar manifest.json (${manifestResponse.status})`);
                }

                const manifestData = await manifestResponse.json();
                const archivosRaiz = manifestData.files || [];

                // 2b) Aplanar sub-manifests (colchones.json, camas.json, etc.)
                const archivosAplanados = (
                    await Promise.all(
                        archivosRaiz.map(async (url) => {
                            try {
                                const res = await fetch(url);
                                if (!res.ok) return [url];
                                const data = await res.json();
                                if (data && Array.isArray(data.files)) {
                                    return data.files; // Es un sub-manifest
                                }
                                return [url]; // Es un archivo de productos
                            } catch {
                                return [url];
                            }
                        })
                    )
                ).flat();

                const archivos = archivosAplanados;

                // 3) Filtrar productos por SKU en cada archivo
                const productosPromesas = archivos.map(async (url) => {
                    try {
                        const response = await fetch(url);
                        if (!response.ok) return [];
                        const data = await response.json();

                        let lista = [];
                        if (Array.isArray(data)) {
                            lista = data;
                        } else if (data.productos && Array.isArray(data.productos)) {
                            lista = data.productos;
                        }

                        // Compara el sku del producto con los buscados
                        return lista.filter(p => p && skusBuscados.has(String(p.sku)));
                    } catch (err) {
                        console.error(`Error cargando ${url}:`, err);
                        return [];
                    }
                });

                const productosPorArchivo = await Promise.all(productosPromesas);
                const productosFiltrados = productosPorArchivo.flat();

                if (cancelado) return;
                setProductos(productosFiltrados);
                setLoading(false);
            } catch (err) {
                console.error('Error cargando productos:', err);
                if (cancelado) return;
                setError(err.message);
                setLoading(false);
            }
        };

        cargarOfertasYProductos();

        return () => {
            cancelado = true;
        };
    }, []);

    const toggleFavorite = (producto) => {
        setFavoritos(prevFavoritos => {
            const existe = prevFavoritos.some(fav => fav.sku === producto.sku);
            if (existe) {
                return prevFavoritos.filter(fav => fav.sku !== producto.sku);
            }
            return [...prevFavoritos, producto];
        });
    };

    const truncate = (str, maxLength) => {
        if (typeof str !== 'string') return '';
        return str.length > maxLength ? str.slice(0, maxLength - 3) + '...' : str;
    };

    const productosFiltrados = productos.filter(producto => {
        // Filtro por categoría
        if (categoria && producto.categoria !== categoria) {
            return false;
        }

        // Filtro por "descripcion" (buscando coincidencia de texto)
        for (const [key, value] of Object.entries(filtrosDetalles)) {
            const descripcion = String(producto.descripcion || '').toLowerCase();
            const valor = value.toString().toLowerCase().trim();

            if (!descripcion.includes(valor)) {
                return false;
            }
        }

        // Filtro por rango de precio
        if (filtrosPrecio.length > 0) {
            const precio = parseFloat(producto.precioVenta);
            if (isNaN(precio)) return false;

            const cumplePrecio = filtrosPrecio.some(rango => {
                const [min, max] = rango.split('-').map(Number);
                return precio >= min && precio <= max;
            });

            if (!cumplePrecio) {
                return false;
            }
        }

        return true;
    });

    if (loading) {
        return (
            <div className="cargando">
                <p>Cargando ofertas...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error">
                <p>Error: {error}</p>
                <p>Por favor intenta recargar la página.</p>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>Ofertas | Kamas</title>
                <meta name="description" content="Descubre los mejores descuentos en productos solo por horas en Kamas." />
            </Helmet>

            <main className="ofertas-main d-flex-column">
                <section className="block-container ofertas-container">
                    <div className="block-content ofertas-content">
                        <ConteoRegresivo
                            onExpire={handleExpire}
                            onActivate={handleActivate}
                            onTerminar={() => setTiempoAgotado(true)}
                        />

                        {/* <Categorias/> */}
                        <Filtros onCambiarPrecio={setFiltrosPrecio} />

                        <div className="d-flex-column gap-10 ofertas-productos">
                            <div className="d-flex-center-between banner-top-ofertas gap-20">
                                <div className="d-flex-column">
                                    <p className="block-title text-left color-white">Ofertas Kamas</p>
                                    <p className="title color-white">
                                        Aprovecha hasta el <b className="font-bold color-red">30% de descuento</b> en dormitorios seleccionados
                                    </p>
                                </div>
                            </div>

                            {tiempoAgotado ? (
                                <div className="d-flex-center-center gap-10 w-100 h-70-px bg-white border-r-6">
                                    <p className="title text">El tiempo se agotó, pero más ofertas están en camino.</p>
                                    <a href="/ofertas/" className="button-link button-link-5" title="Ofertas | Kamas">
                                        <p className="button-link-text">Ver más</p>
                                    </a>
                                </div>
                            ) : productosFiltrados.length === 0 ? (
                                <div className="d-flex-center-center gap-10 w-100 h-70-px bg-white border-r-6">
                                    <p className="title text">
                                        Lo sentimos no contamos ofertas disponibles para la categoría seleccionada.
                                    </p>
                                    <a href="/ofertas/" className="button-link button-link-5" title="Ofertas | Kamas">
                                        <p className="button-link-text">Ver más</p>
                                    </a>
                                </div>
                            ) : (
                                <ul className="products-list">
                                    {productosFiltrados.map(producto => (
                                        <Producto
                                            key={producto.sku}
                                            producto={producto}
                                            truncate={truncate}
                                            onToggleFavorite={toggleFavorite}
                                            isFavorite={favoritos.some(fav => fav.sku === producto.sku)}
                                            skusOfertas={skusOfertas}
                                            isOfferActive={isOfferActive}
                                        />
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Ofertas;
