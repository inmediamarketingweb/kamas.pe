import { useEffect, useState, useMemo, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

import './Productos.css';

import Filtros from '../../Componentes/Filtros/Filtros';
import Categorias from '../Ofertas/Componentes/Categorias/Categorias';
import Top from '../../Componentes/Filtros/Componentes/Top/Top';
import { Producto } from '../../Componentes/Plantillas/Producto/Producto';
import ConteoRegresivo from '../../Componentes/ConteoRegresivo/ConteoRegresivo';

function Productos(){
    const [filtrosPrecio, setFiltrosPrecio] = useState([]);
    const [productos, setProductos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(24);
    const [sortOption, setSortOption] = useState('');
    const [envioGratis, setEnvioGratis] = useState(false);
    const [enOferta, setEnOferta] = useState(false);
    const [loading, setLoading] = useState(true);
    const [filtrosOpen, setFiltrosOpen] = useState(false);
    const [favoritos, setFavoritos] = useState([]);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const categoriaParam = searchParams.get('categoria');
    const categoria = useMemo(() => categoriaParam ? categoriaParam.replace(/-/g, ' ') : null, [categoriaParam]);
    const [isOfferActive, setIsOfferActive] = useState(true);
    const handleExpire = () => setIsOfferActive(false);
    const handleActivate = () => setIsOfferActive(true);

    const filtros = useMemo(() => {
        const searchParams = new URLSearchParams(location.search);
        const filtrosObj = {};
        searchParams.forEach((value, key) => {
            if (key !== 'categoria') {
                filtrosObj[key] = value.replace(/-/g, ' ');
            }
        });
        return filtrosObj;
    }, [location.search]);

    const toggleFavorite = (producto) => {
        setFavoritos(prevFavoritos => {
            const existe = prevFavoritos.some(fav => fav.sku === producto.sku);
            
            if (existe) {
                return prevFavoritos.filter(fav => fav.sku !== producto.sku);
            } else {
                return [...prevFavoritos, producto];
            }
        });
    };

    const [skusOfertas, setSkusOfertas] = useState([]);

    useEffect(() => {
        const cargarOfertas = async () => {
            try {
                const response = await fetch('/assets/json/ofertas.json');
                const data = await response.json();
                setSkusOfertas(data);
            } catch (error) {
                console.error("Error cargando ofertas:", error);
                setSkusOfertas([]);
            }
        };

        cargarOfertas();
    }, []);

    const cargarProductos = useCallback(async () => {
        try{
            setLoading(true);
            const manifestResponse = await fetch('/assets/json/manifest.json');
            const manifestData = await manifestResponse.json();
            const archivos = manifestData.files || [];
            const archivosIniciales = archivos.slice(0, 3);
            const archivosRestantes = archivos.slice(3);

            const productosPromesas = archivosIniciales.map(async (url) => {
                const response = await fetch(url);
                const data = await response.json();
                return data.productos;
            });

            const productosPorArchivo = await Promise.all(productosPromesas);
            const todosProductos = productosPorArchivo.flat();

            setProductos(todosProductos);
            setLoading(false);

            if (archivosRestantes.length > 0) {
                const restantesPromesas = archivosRestantes.map(async (url) => {
                    const response = await fetch(url);
                    const data = await response.json();
                    return data.productos;
                });

                const restantesProductos = await Promise.all(restantesPromesas);
                const productosCompletos = [...todosProductos, ...restantesProductos.flat()];
                setProductos(productosCompletos);
            }
        } catch (error) {
            console.error("Error cargando productos:", error);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        cargarProductos();
    }, [cargarProductos]);

    const productosFiltrados = useMemo(() => {
        if (productos.length === 0) return [];

        const rangosPrecio = filtrosPrecio.map(rango => {
            const [min, max] = rango.split('-').map(Number);
            return { min, max };
        });

        const normalizarTexto = (texto) => {
            if (typeof texto !== 'string') return '';
            return texto
                .toLowerCase()
                .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                .replace(/\s+/g, ' ')
                .replace(/[^a-z0-9 ]/g, '')
                .trim();
        };

        return productos.filter(producto => {
            if (categoria && normalizarTexto(producto.categoria) !== normalizarTexto(categoria)) {
                return false;
            }

            for (const [key, value] of Object.entries(filtros)) {
                const valorFiltro = normalizarTexto(value);
                
                if (producto[key] && normalizarTexto(producto[key]) === valorFiltro) {
                    continue;
                }
                
                if (producto['detalles-del-producto']) {
                    const detalleEncontrado = producto['detalles-del-producto'].find(detalle => {
                        return Object.entries(detalle).some(([detalleKey, detalleValue]) => {
                            return normalizarTexto(detalleKey) === normalizarTexto(key) && 
                                   normalizarTexto(detalleValue) === valorFiltro;
                        });
                    });
                    
                    if (!detalleEncontrado) {
                        return false;
                    }
                } else {
                    return false;
                }
            }

            if (rangosPrecio.length > 0) {
                const precio = parseFloat(producto.precioVenta);
                if (isNaN(precio)) return false;
                
                const cumplePrecio = rangosPrecio.some(({ min, max }) => 
                    precio >= min && precio <= max
                );
                if (!cumplePrecio) return false;
            }

            if (envioGratis && normalizarTexto(producto["tipo-de-envio"]) !== "gratis") {
                return false;
            }

            if (enOferta) {
                if (!skusOfertas.includes(producto.sku)) {
                    return false;
                }
            }

            return true;
        });
    }, [productos, categoria, filtros, filtrosPrecio, envioGratis, enOferta, skusOfertas]);

    const productosOrdenados = useMemo(() => {
        if (sortOption === 'precio-asc') {
            return [...productosFiltrados].sort((a, b) => 
                parseFloat(a.precioVenta) - parseFloat(b.precioVenta)
            );
        } else if (sortOption === 'precio-desc') {
            return [...productosFiltrados].sort((a, b) => 
                parseFloat(b.precioVenta) - parseFloat(a.precioVenta)
            );
        }
        return productosFiltrados;
    }, [productosFiltrados, sortOption]);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = useMemo(() => 
        productosOrdenados.slice(indexOfFirstProduct, indexOfLastProduct),
        [productosOrdenados, indexOfFirstProduct, indexOfLastProduct]
    );

    const totalPages = Math.ceil(productosOrdenados.length / productsPerPage);

    const paginate = useCallback((pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const truncate = useCallback((str, maxLength) => {
        return str.length > maxLength ? str.slice(0, maxLength - 3) + "..." : str;
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [categoria, filtros, filtrosPrecio, envioGratis, enOferta, sortOption]);

    const getVisiblePages = useCallback(() => {
        const visiblePages = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) visiblePages.push(i);
        } else {
            if (currentPage <= 3) { 
                visiblePages.push(1, 2, 3, 4, '...', totalPages); 
            } else if (currentPage >= totalPages - 2) {
                visiblePages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                visiblePages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }
        return visiblePages;
    }, [currentPage, totalPages]);

    return(
        <>
            <Helmet>
                <title>Productos | Kamas</title>
                <meta name="description" content="Explora nuestra amplia selección de productos" />
            </Helmet>

            <main className='productos-main'>
                <section className="block-container pagina-productos-container">
                    <div className="block-content pagina-productos-content">
                        <Categorias/>

                        <Filtros onCambiarPrecio={setFiltrosPrecio} isOpen={filtrosOpen} onClose={() => setFiltrosOpen(false)} />

                        <div className='d-flex-column gap-10 pagina-productos-productos'>
                            <Top envioGratis={envioGratis} setEnvioGratis={setEnvioGratis} enOferta={enOferta} setEnOferta={setEnOferta} sortOption={sortOption} setSortOption={setSortOption} />

                            {loading ? (
                                <div className="loading-products d-flex-center-center d-flex-column gap-10">
                                    <div className="spinner"></div>
                                </div>
                            ) : (
                                <div className='d-flex-column gap-10'>
                                    <button 
                                        type='button' 
                                        className='filter-button-open'
                                        onClick={() => setFiltrosOpen(true)}
                                    >
                                        <span className="material-symbols-outlined">tune</span>
                                        <p>Filtros</p>
                                    </button>

                                    <ul className="products-list">
                                        {currentProducts.length === 0 ? (
                                            <div className='no-hay-productos d-flex-column w-100'>
                                                <p className='text'>Lo sentimos, no encontramos productos con esos filtros 😢</p>
                                                <button className="btn-reset-filtros" onClick={() => {
                                                        setFiltrosPrecio([]);
                                                        setSortOption('');
                                                        setEnvioGratis(false);
                                                        setEnOferta(false);
                                                        window.history.replaceState({}, '', window.location.pathname);
                                                    }}
                                                >
                                                    Reiniciar filtros
                                                </button>
                                            </div>
                                        ) : (
                                            currentProducts.map(producto => (
                                                <Producto key={producto.sku} producto={producto}
                                                truncate={truncate} onToggleFavorite={toggleFavorite}
                                                isFavorite={favoritos.some(fav => fav.sku === producto.sku)}
                                                skusOfertas={skusOfertas}
                                                isOfferActive={isOfferActive}
                                                />
                                            ))
                                        )}
                                    </ul>

                                    {productosOrdenados.length > productsPerPage && (
                                        <div className="pagination-controls">
                                            <button className="pagination-arrow" onClick={() => paginate(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>
                                                <span className="material-symbols-outlined">chevron_left</span>
                                            </button>

                                            <div className="d-flex-center-center gap-5">
                                                {getVisiblePages().map((page, index) => 
                                                    typeof page === 'number' ? (
                                                        <button key={index} className={`pagination-page ${currentPage === page ? 'active' : ''}`} onClick={() => paginate(page)}>{page}</button>
                                                    ) : (
                                                        <span key={index} className="pagination-ellipsis">...</span>
                                                    )
                                                )}
                                            </div>

                                            <button className="pagination-arrow" onClick={() => paginate(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}>
                                                <span className="material-symbols-outlined">chevron_right</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </section>
                
                <ConteoRegresivo onExpire={handleExpire} onActivate={handleActivate}/>
            </main>
        </>
    );
}

export default Productos;
