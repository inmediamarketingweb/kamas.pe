import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import "./PaginaDeCategoria.css";

import Filtros from "./Componentes/Filtros/Filtros";
import Top from '../../Componentes/Filtros/Componentes/Top/Top.js';
import { Producto } from '../../Componentes/Plantillas/Producto/Producto.js';
// import LazyImage from '../../Componentes/Plantillas/LazyImage.js';

function shuffleArray(array){
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function PaginaDeCategoria(){
    const { categoria, subcategoria } = useParams();
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

    useEffect(() => {
        const favStorage = JSON.parse(localStorage.getItem("favoritos")) || [];
        setFavorites(favStorage);
    }, []);

    useEffect(() => {
        fetch(`/assets/json/categorias/${categoria}/metadatos.json`)
            .then((response) => response.json())
            .then((data) => setMetadatos(data || { title: "", description: "" }))
            .catch(() => setMetadatos({ title: "", description: "" }));

        if (subcategoria) {
            const subcatNombre = subcategoria.toLowerCase().replace(/\s+/g, "-");
            fetch(`/assets/json/categorias/${categoria}/sub-categorias/${subcatNombre}.json`)
                .then((response) => response.json())
                .then((data) => {
                    const productosMezclados = shuffleArray(data.productos || []);
                    setProductos(productosMezclados);
                    setProductosFiltradosPorFiltros(productosMezclados);
                })
                .catch(() => {
                    setProductos([]);
                    setProductosFiltradosPorFiltros([]);
                });
        } else {
            fetch(`/assets/json/categorias/${categoria}/sub-categorias/sub-categorias.json`)
                .then((response) => response.json())
                .then(async (data) => {
                    if (!Array.isArray(data.subcategorias)) return;

                    const promesas = data.subcategorias.map((subcat) => {
                        const subcatNombre = subcat.subcategoria.toLowerCase().replace(/\s+/g, "-");
                        return fetch(`/assets/json/categorias/${categoria}/sub-categorias/${subcatNombre}.json`)
                            .then((response) => response.json())
                            .then((data) => data.productos || [])
                            .catch(() => []);
                    });

                    const productosPorSubcategoria = await Promise.all(promesas);
                    const todosLosProductos = productosPorSubcategoria.flat();
                    const productosMezclados = shuffleArray(todosLosProductos);

                    setProductos(productosMezclados);
                    setProductosFiltradosPorFiltros(productosMezclados);
                })
                .catch(() => {
                    setProductos([]);
                    setProductosFiltradosPorFiltros([]);
                });
        }
    }, [categoria, subcategoria]);

    useEffect(() => {
        let resultado = [...productosFiltradosPorFiltros];
        
        if (envioGratis) {
            resultado = resultado.filter(producto => producto["tipo-de-envio"] === "Gratis");
        }

        if (enOferta) {
            resultado = resultado.filter(producto => producto.oferta === "si");
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
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 600);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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
                                <Filtros productos={productos} setProductosFiltrados={setProductosFiltradosPorFiltros} filtersActive={filtersActive} onClose={handleCloseFilters}/>
                            </div>

                            <div className="category-page-right">
                                <Top envioGratis={envioGratis} setEnvioGratis={setEnvioGratis} enOferta={enOferta} setEnOferta={setEnOferta} sortOption={sortOption} setSortOption={setSortOption} />

                                <div className="category-page-right-top">
                                    <button type="button" className="d-flex-center-center gap-5 open-filters" onClick={handleToggleFilters} >
                                        <p className="text">Filtrar</p>
                                        <span className="material-icons text">tune</span>
                                    </button>
                                </div>

                                {productosFiltrados.length > 0 ? (
                                    <>
                                        <ul className="category-page-products">
                                            {currentProducts.map((producto) => {
                                                const isFavorite = favorites.some((fav) => fav.sku === producto.sku);
                                                return(
                                                    <Producto key={producto.sku} producto={producto} truncate={truncate} onToggleFavorite={toggleFavorite} isFavorite={isFavorite}/>
                                                );
                                            })}
                                        </ul>

                                        <div className="pagination-controls">
                                            <button className="pagination-arrow" onClick={handlePreviousPage} disabled={currentPage === 1} >
                                                <span className="material-icons">chevron_left</span>
                                            </button>

                                            <div className="d-flex-center-center gap-10">
                                                {getVisiblePages().map((page, index) => typeof page === 'number' ? (
                                                        <button key={index} className={`pagination-page ${ currentPage === page ? 'active' : '' }`} onClick={() => handlePageChange(page)}>{page}</button>
                                                    ) : (
                                                        <span key={index} className="pagination-ellipsis">...</span>
                                                    )
                                                )}
                                            </div>

                                            <button className="pagination-arrow" onClick={handleNextPage} disabled={currentPage === totalPages} >
                                                <span className="material-icons">chevron_right</span>
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="category-loading-container">
                                        <span className="loader"></span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}

export default PaginaDeCategoria;
