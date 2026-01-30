import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Helmet from 'react-helmet';

import './Busqueda.css';

import { Producto } from '../../Componentes/Plantillas/Producto/Producto';

function PaginaBusqueda() {
    const [productos, setProductos] = useState([]);
    const [filteredProductos, setFilteredProductos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query') || '';

    const normalizeStr = (str = '') => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

    useEffect(() => {
        const fetchProductos = async () => {
            try{
                const manifestResponse = await fetch('/assets/json/manifest.json');
                const manifestData = await manifestResponse.json();
                const archivos = manifestData.files || [];

                const productosArrays = await Promise.all(
                    archivos.map(async (archivo) => {
                        const response = await fetch(archivo);
                        const data = await response.json();
                        return data.productos || [];
                    })
                );

                const productosUnificados = productosArrays.flat();
                setProductos(productosUnificados);
            } catch (error){
                console.error('Error al cargar los productos:', error);
            }
        };

        fetchProductos();
    }, []);

    useEffect(() => {
        if (!query.trim()) {
            setFilteredProductos([]);
            return;
        }

        const tokens = normalizeStr(query).split(' ').filter(Boolean);

        const filtered = productos.filter(producto => {
            const normalizedNombre = normalizeStr(String(producto.nombre ?? ''));
            const normalizedSKU = normalizeStr(String(producto.sku ?? ''));
            const normalizedCategoria = normalizeStr(String(producto.categoria ?? ''));
            const normalizedSubCategoria = normalizeStr(String(producto.subCategoria ?? ''));

            return tokens.every(token => 
                normalizedNombre.includes(token) || 
                normalizedSKU.includes(token) || 
                normalizedCategoria.includes(token) || 
                normalizedSubCategoria.includes(token)
            );
        });

        setFilteredProductos(filtered);
        setCurrentPage(1);
    }, [query, productos]);

    const totalItems = filteredProductos.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const getVisiblePages = () => {
        if (totalPages <= 5) {
            return Array.from({length: totalPages}, (_, i) => i + 1);
        }
        
        if (currentPage <= 3) { 
            return [1, 2, 3, 4, '...', totalPages];
        } 
        
        if (currentPage >= totalPages - 2) {
            return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
        }
        
        return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(Math.max(1, Math.min(totalPages, newPage)));
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = filteredProductos.slice(startIndex, endIndex);

    const truncate = (str, maxLength) => {
        return str.length <= maxLength ? str : str.slice(0, maxLength) + "...";
    };

    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem('favoritos');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });

    useEffect(() => {
        localStorage.setItem('favoritos', JSON.stringify(favorites));
    }, [favorites]);

    const handleToggleFavorite = (producto) => {
        if (favorites.some(fav => fav.sku === producto.sku)) {
            setFavorites(favorites.filter(fav => fav.sku !== producto.sku));
        } else {
            setFavorites([...favorites, producto]);
        }
    };

    return(
        <>
            <Helmet>
                <title>{query} | Kamas</title>
                <meta name='description' content="Resultados de búsqueda" />
            </Helmet>

            <main>
                <div className='block-container'>
                    <section className='block-content'>
                        <div className='block-title-container d-flex-column-left gap-10'>
                            <p className='block-title text-left'>Resultados para: {query}</p>
                            {filteredProductos.length > 0 && (
                                <p className="title text-left">{totalItems} productos encontrados</p>
                            )}
                        </div>

                        <div className='search-products-content gap-10'>
                            {filteredProductos.length > 0 ? (
                                <div className='d-flex-column gap-10'>
                                    <ul className='search-products d-grid-5-3-2fr'>
                                        {currentProducts.map(producto => (
                                            <Producto key={producto.sku} producto={producto} truncate={truncate} onToggleFavorite={handleToggleFavorite} isFavorite={favorites.some(fav => fav.sku === producto.sku)}/>
                                        ))}
                                    </ul>

                                    {totalPages > 1 && (
                                        <div className="pagination-controls d-grid-column-2-3">
                                            <button className="pagination-arrow" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                                                <span className="material-symbols-outlined">chevron_left</span>
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

                                            <button className="pagination-arrow" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                                                <span className="material-symbols-outlined">chevron_right</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <p>No se encontraron productos. Intenta con otros términos de búsqueda.</p>
                            )}
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}

export default PaginaBusqueda;
