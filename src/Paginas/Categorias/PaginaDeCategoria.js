import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
    const [metadatos, setMetadatos] = useState({ title: "", description: "" });
    const [productos, setProductos] = useState([]);
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [filtersActive, setFiltersActive] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;
    const [envioGratis, setEnvioGratis] = useState(false);
    const [enOferta, setEnOferta] = useState(false);
    const [sortOption, setSortOption] = useState('');
    const [productosFiltradosPorFiltros, setProductosFiltradosPorFiltros] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [skusOfertas, setSkusOfertas] = useState([]);
    const [isOfferActive, setIsOfferActive] = useState(true);
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

    useEffect(() => {
        const fetchData = async () => { 
            setIsLoading(true);

            try{
                const metaResponse = await fetch(`/assets/json/categorias/${categoria}/metadatos.json`);
                const metaData = await metaResponse.json();
                setMetadatos(metaData || { title: "", description: "" });

                // Nueva lógica para cargar productos según la estructura de carpetas
                if (subsubcategoria) {
                    // Cargar productos de sub-subcategoría específica
                    const subcatNombre = subcategoria.toLowerCase().replace(/\s+/g, "-");
                    const subsubcatNombre = subsubcategoria.toLowerCase().replace(/\s+/g, "-");
                    const productResponse = await fetch(`/assets/json/categorias/${categoria}/sub-categorias/${subcatNombre}/${subsubcatNombre}.json`);
                    const productData = await productResponse.json();
                    const productosMezclados = shuffleArray(productData.productos || []);
                    setProductos(productosMezclados);
                    setProductosFiltradosPorFiltros(productosMezclados);
                } else if (subcategoria) {
                    // Cargar todas las sub-subcategorías de una subcategoría
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
                        const todosLosProductos = productosPorSubsubcategoria.flat();
                        const productosMezclados = shuffleArray(todosLosProductos);

                        setProductos(productosMezclados);
                        setProductosFiltradosPorFiltros(productosMezclados);
                    }
                } else {
                    // Cargar todas las subcategorías principales
                    const subcatResponse = await fetch(`/assets/json/categorias/${categoria}/sub-categorias/sub-categorias.json`);
                    const subcatData = await subcatResponse.json();

                    if (Array.isArray(subcatData.subcategorias)) {
                        const promesas = subcatData.subcategorias.map(async (subcat) => {
                            const subcatNombre = subcat.subcategoria.toLowerCase().replace(/\s+/g, "-");
                            try {
                                // Intentar cargar sub-subcategorías primero
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
                                    return await Promise.all(subPromesas);
                                }
                                return [];
                            } catch (error) {
                                // Si no hay sub-subcategorías, cargar directamente la subcategoría
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
                        const todosLosProductos = productosPorSubcategoria.flat(2);
                        const productosMezclados = shuffleArray(todosLosProductos);

                        setProductos(productosMezclados);
                        setProductosFiltradosPorFiltros(productosMezclados);
                    }
                }
            } catch (error) {
                console.error("Error cargando datos:", error);
                setMetadatos({ title: "", description: "" });
                setProductos([]);
                setProductosFiltradosPorFiltros([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [categoria, subcategoria, subsubcategoria]);

    useEffect(() => {
        let resultado = [...productosFiltradosPorFiltros];
        
        if (envioGratis) {
            resultado = resultado.filter(producto => producto["tipo-de-envio"] === "Gratis");
        }

        if (sortOption === 'precio-asc') {
            resultado.sort((a, b) => a.precioVenta - b.precioVenta);
        } else if (sortOption === 'precio-desc') {
            resultado.sort((a, b) => b.precioVenta - a.precioVenta);
        }

        setProductosFiltrados(resultado);
        setCurrentPage(1);
    }, [productosFiltradosPorFiltros, envioGratis, enOferta, sortOption]);

    const totalItems = productosFiltrados.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

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
                                <Filtros productos={productos} setProductosFiltrados={setProductosFiltradosPorFiltros} filtersActive={filtersActive} onClose={handleCloseFilters}/>
                            </div>

                            <div className="category-page-right">
                                <Top envioGratis={envioGratis} setEnvioGratis={setEnvioGratis} enOferta={enOferta} setEnOferta={setEnOferta} sortOption={sortOption} setSortOption={setSortOption} />

                                <div className="category-page-right-top">
                                    <button type="button" className="d-flex-center-center gap-5 open-filters" onClick={handleToggleFilters}>
                                        <p className="text">Filtrar</p>
                                        <span className="material-icons text">tune</span>
                                    </button>
                                </div>

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
                                                        key={producto.sku} producto={producto} truncate={truncate} onToggleFavorite={toggleFavorite} 
                                                        isFavorite={isFavorite} skusOfertas={skusOfertas} isOfferActive={isOfferActive}
                                                    />
                                                );
                                            })}
                                        </ul>

                                        {totalPages > 1 && (
                                            <div className="pagination-controls">
                                                <button className="pagination-arrow" onClick={handlePreviousPage} disabled={currentPage === 1}>
                                                    <span className="material-icons">chevron_left</span>
                                                </button>

                                                <div className="d-flex-center-center gap-5">
                                                    {getVisiblePages().map((page, index) => 
                                                        typeof page === 'number' ? (
                                                            <button key={index} className={`pagination-page ${currentPage === page ? 'active' : ''}`} onClick={() => handlePageChange(page)}>{page}</button>
                                                        ) : (
                                                            <span key={index} className="pagination-ellipsis">...</span>
                                                        )
                                                    )}
                                                </div>

                                                <button className="pagination-arrow" onClick={handleNextPage} disabled={currentPage === totalPages}>
                                                    <span className="material-icons">chevron_right</span>
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
