import { useEffect, useState, useCallback } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import "./PaginaDeCategoria.css";

import Filtros from "./Filtros/Filtros";
import Top from '../../Componentes/Filtros/Componentes/Top/Top.js';
import ConteoRegresivo from '../../Componentes/ConteoRegresivo/ConteoRegresivo';
import { Producto } from '../../Componentes/Plantillas/Producto/Producto.js';

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function PaginaDeCategoria(){
    const { categoria, subcategoria, subsubcategoria } = useParams();
    const [searchParams] = useSearchParams();
    const [metadatos, setMetadatos] = useState({ title: "", description: "" });
    const [productos, setProductos] = useState([]);
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [filtersActive, setFiltersActive] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 40;
    const [productosFiltradosPorFiltros, setProductosFiltradosPorFiltros] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [skusOfertas, setSkusOfertas] = useState([]);
    const [isOfferActive, setIsOfferActive] = useState(true);
    const [productosOriginales, setProductosOriginales] = useState([]);

    // Leer filtros de la URL
    const envioGratis = searchParams.get('envio-gratis') === 'si';
    const enOferta = searchParams.get('en-oferta') === 'si';
    const sortOption = searchParams.get('orden') || '';
    const pageFromUrl = parseInt(searchParams.get('page')) || 1;

    const handleExpire = () => setIsOfferActive(false);
    const handleActivate = () => setIsOfferActive(true);

    useEffect(() => {
        try {
            const stored = localStorage.getItem("favoritos");
            let favStorage = [];
            
            if (stored) {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) {
                    favStorage = parsed;
                }
            }
            setFavorites(favStorage);
        } catch (error) {
            console.error("Error parsing favorites:", error);
            setFavorites([]);
        }
    }, []);

    const cargarOfertas = useCallback(async () => {
        try {
            const response = await fetch('/assets/json/ofertas.json');
            const data = await response.json();
            setSkusOfertas(data);
        } catch (error) {
            console.error("Error cargando ofertas:", error);
            setSkusOfertas([]);
        }
    }, []);

    useEffect(() => {
        cargarOfertas();
    }, [cargarOfertas]);

    const cargarProductos = useCallback(async () => {
        setIsLoading(true);
        try {
            let productosCargados = [];

            if (subsubcategoria) {
                const subcatNombre = subcategoria.toLowerCase().replace(/\s+/g, "-");
                const subsubcatNombre = subsubcategoria.toLowerCase().replace(/\s+/g, "-");
                const productResponse = await fetch(`/assets/json/categorias/${categoria}/sub-categorias/${subcatNombre}/${subsubcatNombre}.json`);
                const productData = await productResponse.json();
                productosCargados = shuffleArray(productData.productos || []);
            } else if (subcategoria) {
                const subcatNombre = subcategoria.toLowerCase().replace(/\s+/g, "-");
                const subcatResponse = await fetch(`/assets/json/categorias/${categoria}/sub-categorias/${subcatNombre}/sub-categorias.json`);
                const subcatData = await subcatResponse.json();

                if (Array.isArray(subcatData.subcategorias)) {
                    const promesas = subcatData.subcategorias.map(async (subsubcat) => {
                        const subsubcatNombre = subsubcat.subcategoria.toLowerCase().replace(/\s+/g, "-");
                        try {
                            const response = await fetch(`/assets/json/categorias/${categoria}/sub-categorias/${subcatNombre}/${subsubcatNombre}.json`);
                            const data = await response.json();
                            return data.productos || [];
                        } catch (error) {
                            return [];
                        }
                    });

                    const productosPorSubsubcategoria = await Promise.all(promesas);
                    productosCargados = shuffleArray(productosPorSubsubcategoria.flat());
                }
            } else {
                const subcatResponse = await fetch(`/assets/json/categorias/${categoria}/sub-categorias/sub-categorias.json`);
                const subcatData = await subcatResponse.json();

                if (Array.isArray(subcatData.subcategorias)) {
                    const promesas = subcatData.subcategorias.map(async (subcat) => {
                        const subcatNombre = subcat.subcategoria.toLowerCase().replace(/\s+/g, "-");
                        try {
                            const subsubResponse = await fetch(`/assets/json/categorias/${categoria}/sub-categorias/${subcatNombre}/sub-categorias.json`);
                            const subsubData = await subsubResponse.json();

                            if (Array.isArray(subsubData.subcategorias)) {
                                const subPromesas = subsubData.subcategorias.map(async (subsubcat) => {
                                    const subsubcatNombre = subsubcat.subcategoria.toLowerCase().replace(/\s+/g, "-");
                                    try {
                                        const response = await fetch(`/assets/json/categorias/${categoria}/sub-categorias/${subcatNombre}/${subsubcatNombre}.json`);
                                        const data = await response.json();
                                        return data.productos || [];
                                    } catch (error) {
                                        return [];
                                    }
                                });
                                return (await Promise.all(subPromesas)).flat();
                            }
                            return [];
                        } catch (error) {
                            try {
                                const response = await fetch(`/assets/json/categorias/${categoria}/sub-categorias/${subcatNombre}.json`);
                                const data = await response.json();
                                return data.productos || [];
                            } catch (error) {
                                return [];
                            }
                        }
                    });

                    const productosPorSubcategoria = await Promise.all(promesas);
                    productosCargados = shuffleArray(productosPorSubcategoria.flat(2));
                }
            }

            console.log('Productos cargados:', productosCargados.length);
            setProductosOriginales(productosCargados);
            setProductos(productosCargados);
            setProductosFiltradosPorFiltros(productosCargados);
            
            try {
                const metaResponse = await fetch(`/assets/json/categorias/${categoria}/metadatos.json`);
                const metaData = await metaResponse.json();
                setMetadatos(metaData || { title: "", description: "" });
            } catch (error) {
                console.error("Error cargando metadatos:", error);
            }

        } catch (error) {
            console.error("Error cargando datos:", error);
            setProductosOriginales([]);
            setProductos([]);
            setProductosFiltradosPorFiltros([]);
        } finally {
            setIsLoading(false);
        }
    }, [categoria, subcategoria, subsubcategoria]);

    useEffect(() => {
        cargarProductos();
    }, [cargarProductos]);

    // Aplicar filtros y ordenamiento
    useEffect(() => {
        // Usar productosFiltradosPorFiltros si tiene datos, si no usar productosOriginales
        const productosBase = productosFiltradosPorFiltros.length > 0 
            ? productosFiltradosPorFiltros 
            : productosOriginales;

        if (!productosBase.length) {
            setProductosFiltrados([]);
            return;
        }

        let resultado = [...productosBase];
        
        // Aplicar filtro de envío gratis
        if (envioGratis) {
            resultado = resultado.filter(producto => {
                const tipoEnvio = producto["tipo-de-envio"] || '';
                return tipoEnvio.toLowerCase() === "gratis";
            });
        }

        // Aplicar filtro de oferta
        if (enOferta) {
            resultado = resultado.filter(producto => {
                const oferta = producto.oferta || '';
                return oferta.toLowerCase() === "si" || skusOfertas.includes(producto.sku);
            });
        }

        // Aplicar ordenamiento
        if (sortOption && resultado.length > 0) {
            if (sortOption === 'menor-a-mayor') {
                resultado.sort((a, b) => {
                    const precioA = parseFloat(a.precioVenta) || parseFloat(a.precio) || parseFloat(a.precioNormal) || 0;
                    const precioB = parseFloat(b.precioVenta) || parseFloat(b.precio) || parseFloat(b.precioNormal) || 0;
                    return precioA - precioB;
                });
            } else if (sortOption === 'mayor-a-menor') {
                resultado.sort((a, b) => {
                    const precioA = parseFloat(a.precioVenta) || parseFloat(a.precio) || parseFloat(a.precioNormal) || 0;
                    const precioB = parseFloat(b.precioVenta) || parseFloat(b.precio) || parseFloat(b.precioNormal) || 0;
                    return precioB - precioA;
                });
            }
        }

        setProductosFiltrados(resultado);
    }, [productosFiltradosPorFiltros, productosOriginales, envioGratis, enOferta, sortOption, skusOfertas]);

    // Sincronizar página con URL
    useEffect(() => {
        setCurrentPage(pageFromUrl);
    }, [pageFromUrl]);

    const totalItems = productosFiltrados.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

    const getVisiblePages = () => {
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
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(Math.max(1, Math.min(totalPages, newPage)));
    };

    const handlePreviousPage = () => handlePageChange(currentPage - 1);
    const handleNextPage = () => handlePageChange(currentPage + 1);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    const currentProducts = productosFiltrados.slice(startIndex, endIndex);
    const handleToggleFilters = () => setFiltersActive((prev) => !prev);
    const handleCloseFilters = () => setFiltersActive(false);

    const toggleFavorite = (producto) => {
        const exists = favorites.some((fav) => fav.ruta === producto.ruta);
        const updatedFavorites = exists ? favorites.filter((fav) => fav.ruta !== producto.ruta) : [...favorites, producto];
        setFavorites(updatedFavorites);
        localStorage.setItem("favoritos", JSON.stringify(updatedFavorites));
    };

    const truncate = (str, maxLength) => str.length <= maxLength ? str : str.slice(0, maxLength) + "...";

    return (
        <>
            <Helmet>
                <title>{metadatos.title}</title>
            </Helmet>

            <main className="main-category">
                <div className="block-container">
                    <section className="block-content">
                        <div className="category-page-container">
                            <div className="category-page-left">
                                <Filtros 
                                    productos={productos} 
                                    setProductosFiltrados={setProductosFiltradosPorFiltros} 
                                    filtersActive={filtersActive} 
                                    onClose={handleCloseFilters}
                                />
                            </div>

                            <div className="category-page-right">
                                <Top 
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                    getVisiblePages={getVisiblePages}
                                    onToggleFilters={handleToggleFilters}
                                />

                                {isLoading ? (
                                    <div className="category-loading-container">
                                        <span className="loader"></span>
                                    </div>
                                ) : productosFiltrados.length > 0 ? (
                                    <>
                                        <ul className="category-page-products">
                                            {currentProducts.map((producto) => {
                                                const isFavorite = Array.isArray(favorites) && favorites.some((fav) => fav.sku === producto.sku);
                                                return(
                                                    <Producto 
                                                        key={producto.sku} 
                                                        producto={producto} 
                                                        truncate={truncate} 
                                                        onToggleFavorite={toggleFavorite} 
                                                        isFavorite={isFavorite} 
                                                        skusOfertas={skusOfertas}
                                                        isOfferActive={isOfferActive}
                                                    />
                                                );
                                            })}
                                        </ul>

                                        {totalPages > 1 && (
                                            <div className="pagination-controls">
                                                <button className="pagination-arrow" onClick={handlePreviousPage} disabled={currentPage === 1}>
                                                    <span className="material-symbols-outlined">chevron_left</span>
                                                    <p>Anterior</p>
                                                </button>

                                                <div className="d-flex-center-center gap-5">
                                                    {getVisiblePages().map((page, index) => 
                                                        typeof page === 'number' ? (
                                                            <button 
                                                                key={index} 
                                                                className={`pagination-page ${currentPage === page ? 'active' : ''}`} 
                                                                onClick={() => handlePageChange(page)}
                                                            >
                                                                {page}
                                                            </button>
                                                        ) : (
                                                            <span key={index} className="pagination-ellipsis">...</span>
                                                        )
                                                    )}
                                                </div>

                                                <button className="pagination-arrow" onClick={handleNextPage} disabled={currentPage === totalPages}>
                                                    <p>Siguiente</p>
                                                    <span className="material-symbols-outlined">chevron_right</span>
                                                </button>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="no-products-message">
                                        <p className="title text">Lo sentimos, no hay productos disponibles en este momento.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                </div>

                <ConteoRegresivo onExpire={handleExpire} onActivate={handleActivate}/>
            </main>
        </>
    );
}

export default PaginaDeCategoria;
