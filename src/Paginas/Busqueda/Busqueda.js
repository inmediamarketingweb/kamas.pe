// import { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import Helmet from 'react-helmet';

// import './Busqueda.css';

// import { Producto } from '../../Componentes/Plantillas/Producto/Producto';
// import { cargarTodosLosProductos } from '../../utils/loadProductos';

// function PaginaBusqueda() {
//     const [productos, setProductos] = useState([]);
//     const [filteredProductos, setFilteredProductos] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const itemsPerPage = 50;
//     const location = useLocation();
//     const queryParams = new URLSearchParams(location.search);
//     const query = queryParams.get('query') || '';

//     const normalizeStr = (str = '') =>
//         String(str).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

//     useEffect(() => {
//         let cancelado = false;

//         const fetchProductos = async () => {
//             try {
//                 setLoading(true);
//                 setError(null);

//                 const todos = await cargarTodosLosProductos();

//                 if (!cancelado) {
//                     console.log(`📦 PáginaBusqueda: ${todos.length} productos disponibles`);
//                     setProductos(todos);
//                     setLoading(false);
//                 }
//             } catch (err) {
//                 if (!cancelado) {
//                     console.error('💥 Error cargando productos:', err);
//                     setError(err.message || 'Error desconocido');
//                     setLoading(false);
//                     setProductos([]);
//                 }
//             }
//         };

//         fetchProductos();

//         return () => {
//             cancelado = true;
//         };
//     }, []);

//     // Filtrado
//     useEffect(() => {
//         if (!query.trim()) {
//             setFilteredProductos([]);
//             setCurrentPage(1);
//             return;
//         }

//         const tokens = normalizeStr(query).split(' ').filter(Boolean);

//         const filtered = productos.filter((producto) => {
//             const normalizedNombre = normalizeStr(String(producto.nombre ?? ''));
//             const normalizedSKU = normalizeStr(String(producto.sku ?? ''));
//             const normalizedCategoria = normalizeStr(String(producto.categoria ?? ''));
//             const normalizedSubCategoria = normalizeStr(
//                 String(producto.subcategoria ?? producto.subCategoria ?? '')
//             );

//             return tokens.every(
//                 (token) =>
//                     normalizedNombre.includes(token) ||
//                     normalizedSKU.includes(token) ||
//                     normalizedCategoria.includes(token) ||
//                     normalizedSubCategoria.includes(token)
//             );
//         });

//         console.log(`✅ Resultados encontrados: ${filtered.length}`);
//         setFilteredProductos(filtered);
//         setCurrentPage(1);
//     }, [query, productos]);

//     const totalItems = filteredProductos.length;
//     const totalPages = Math.ceil(totalItems / itemsPerPage);

//     const getVisiblePages = () => {
//         if (totalPages <= 5) {
//             return Array.from({ length: totalPages }, (_, i) => i + 1);
//         }
//         if (currentPage <= 3) {
//             return [1, 2, 3, 4, '...', totalPages];
//         }
//         if (currentPage >= totalPages - 2) {
//             return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
//         }
//         return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
//     };

//     const handlePageChange = (newPage) => {
//         setCurrentPage(Math.max(1, Math.min(totalPages, newPage)));
//     };

//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     const currentProducts = filteredProductos.slice(startIndex, endIndex);

//     const truncate = (str, maxLength) => {
//         return str.length <= maxLength ? str : str.slice(0, maxLength) + '...';
//     };

//     const [favorites, setFavorites] = useState(() => {
//         const savedFavorites = localStorage.getItem('favoritos');
//         return savedFavorites ? JSON.parse(savedFavorites) : [];
//     });

//     useEffect(() => {
//         localStorage.setItem('favoritos', JSON.stringify(favorites));
//     }, [favorites]);

//     const handleToggleFavorite = (producto) => {
//         if (favorites.some((fav) => fav.sku === producto.sku)) {
//             setFavorites(favorites.filter((fav) => fav.sku !== producto.sku));
//         } else {
//             setFavorites([...favorites, producto]);
//         }
//     };

//     return (
//         <>
//             <Helmet>
//                 <title>{query || 'Búsqueda'} | Kamas</title>
//                 <meta name="description" content="Resultados de búsqueda" />
//             </Helmet>

//             <main>
//                 <div className="block-container">
//                     <section className="block-content">
//                         <div className="block-title-container d-flex-column-left gap-10">
//                             <p className="block-title text-left">
//                                 {query ? `Resultados para: ${query}` : 'Buscar productos'}
//                             </p>
//                             {!loading && !error && filteredProductos.length > 0 && (
//                                 <p className="title text-left">
//                                     {totalItems} productos encontrados
//                                 </p>
//                             )}
//                         </div>

//                         <div className="search-products-content gap-10">
//                             {loading ? (
//                                 <div style={{ textAlign: 'center', padding: '40px' }}>
//                                     <p>Cargando productos...</p>
//                                 </div>
//                             ) : error ? (
//                                 <div style={{ textAlign: 'center', padding: '40px', color: '#d32f2f' }}>
//                                     <p>❌ {error}</p>
//                                     <p style={{ fontSize: '14px', color: '#666' }}>
//                                         Revisa la consola del navegador para más detalles.
//                                     </p>
//                                 </div>
//                             ) : filteredProductos.length > 0 ? (
//                                 <div className="d-flex-column gap-10">
//                                     <ul className="search-products d-grid-5-3-2fr">
//                                         {currentProducts.map((producto) => (
//                                             <Producto
//                                                 key={producto.sku}
//                                                 producto={producto}
//                                                 truncate={truncate}
//                                                 onToggleFavorite={handleToggleFavorite}
//                                                 isFavorite={favorites.some(
//                                                     (fav) => fav.sku === producto.sku
//                                                 )}
//                                             />
//                                         ))}
//                                     </ul>

//                                     {totalPages > 1 && (
//                                         <div className="pagination-controls d-grid-column-2-3">
//                                             <button
//                                                 className="pagination-arrow"
//                                                 onClick={() => handlePageChange(currentPage - 1)}
//                                                 disabled={currentPage === 1}
//                                             >
//                                                 <span className="material-symbols-outlined">
//                                                     chevron_left
//                                                 </span>
//                                             </button>

//                                             <div className="d-flex-center-center gap-5">
//                                                 {getVisiblePages().map((page, index) =>
//                                                     typeof page === 'number' ? (
//                                                         <button
//                                                             key={index}
//                                                             className={`pagination-page ${
//                                                                 currentPage === page ? 'active' : ''
//                                                             }`}
//                                                             onClick={() => handlePageChange(page)}
//                                                         >
//                                                             {page}
//                                                         </button>
//                                                     ) : (
//                                                         <span key={index} className="pagination-ellipsis">
//                                                             ...
//                                                         </span>
//                                                     )
//                                                 )}
//                                             </div>

//                                             <button
//                                                 className="pagination-arrow"
//                                                 onClick={() => handlePageChange(currentPage + 1)}
//                                                 disabled={currentPage === totalPages}
//                                             >
//                                                 <span className="material-symbols-outlined">
//                                                     chevron_right
//                                                 </span>
//                                             </button>
//                                         </div>
//                                     )}
//                                 </div>
//                             ) : (
//                                 <div style={{ textAlign: 'center', padding: '40px' }}>
//                                     <p>
//                                         No se encontraron productos. Intenta con otros términos de
//                                         búsqueda.
//                                     </p>
//                                     {query && productos.length === 0 && (
//                                         <p style={{ fontSize: '14px', color: '#666' }}>
//                                             ⚠️ No hay productos cargados. Revisa la consola para
//                                             más información.
//                                         </p>
//                                     )}
//                                 </div>
//                             )}
//                         </div>
//                     </section>
//                 </div>
//             </main>
//         </>
//     );
// }

// export default PaginaBusqueda;

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Helmet from 'react-helmet';

import './Busqueda.css';

import { Producto } from '../../Componentes/Plantillas/Producto/Producto';
import { cargarTodosLosProductos } from '../../utils/loadProductos';
import Paginacion from '../Productos/Componentes/Paginacion/Paginacion';

function PaginaBusqueda() {
    const [productos, setProductos] = useState([]);
    const [filteredProductos, setFilteredProductos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const itemsPerPage = 20;

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query') || '';

    const normalizeStr = (str = '') =>
        String(str).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

    // Carga de productos (usa caché compartida con SearchBar)
    useEffect(() => {
        let cancelado = false;

        const fetchProductos = async () => {
            try {
                setLoading(true);
                setError(null);

                const todos = await cargarTodosLosProductos();

                if (!cancelado) {
                    console.log(`📦 PáginaBusqueda: ${todos.length} productos disponibles`);
                    setProductos(todos);
                    setLoading(false);
                }
            } catch (err) {
                if (!cancelado) {
                    console.error('💥 Error cargando productos:', err);
                    setError(err.message || 'Error desconocido');
                    setLoading(false);
                    setProductos([]);
                }
            }
        };

        fetchProductos();

        return () => {
            cancelado = true;
        };
    }, []);

    // Filtrado
    useEffect(() => {
        if (!query.trim()) {
            setFilteredProductos([]);
            setCurrentPage(1);
            return;
        }

        console.log(`🔍 Buscando: "${query}" en ${productos.length} productos`);
        const tokens = normalizeStr(query).split(' ').filter(Boolean);

        const filtered = productos.filter((producto) => {
            const normalizedNombre = normalizeStr(String(producto.nombre ?? ''));
            const normalizedSKU = normalizeStr(String(producto.sku ?? ''));
            const normalizedCategoria = normalizeStr(String(producto.categoria ?? ''));
            const normalizedSubCategoria = normalizeStr(
                String(producto.subcategoria ?? producto.subCategoria ?? '')
            );

            return tokens.every(
                (token) =>
                    normalizedNombre.includes(token) ||
                    normalizedSKU.includes(token) ||
                    normalizedCategoria.includes(token) ||
                    normalizedSubCategoria.includes(token)
            );
        });

        console.log(`✅ Resultados encontrados: ${filtered.length}`);
        setFilteredProductos(filtered);
        setCurrentPage(1);
    }, [query, productos]);

    const totalItems = filteredProductos.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = filteredProductos.slice(startIndex, endIndex);

    // Al cambiar de página, subir al top de la sección de resultados
    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const truncate = (str, maxLength) => {
        return str.length <= maxLength ? str : str.slice(0, maxLength) + '...';
    };

    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem('favoritos');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });

    useEffect(() => {
        localStorage.setItem('favoritos', JSON.stringify(favorites));
    }, [favorites]);

    const handleToggleFavorite = (producto) => {
        if (favorites.some((fav) => fav.sku === producto.sku)) {
            setFavorites(favorites.filter((fav) => fav.sku !== producto.sku));
        } else {
            setFavorites([...favorites, producto]);
        }
    };

    return (
        <>
            <Helmet>
                <title>{query || 'Búsqueda'} | Kamas</title>
                <meta name="description" content="Resultados de búsqueda" />
            </Helmet>

            <main>
                <div className="block-container">
                    <section className="block-content">
                        <div className="w-100 d-flex-column gap-10">
                            <p className="text font-bold">{query ? `Resultados para: ${query}` : 'Buscar productos'}</p>

                            <div className='w-100 d-flex-center-between gap-20'>
                                {!loading && !error && filteredProductos.length > 0 && (
                                    <p className="text margin-right">{totalItems} productos encontrados</p>
                                )}

                                <div className='d-flex margin-left'>
                                    <Paginacion paginaActual={currentPage} totalPaginas={totalPages} onChange={handlePageChange} />
                                </div>
                            </div>
                        </div>

                        <div className="search-products-content gap-10">
                            {loading ? (
                                <div style={{ textAlign: 'center', padding: '40px' }}>
                                    <p>Cargando productos...</p>
                                </div>
                            ) : error ? (
                                <div style={{ textAlign: 'center', padding: '40px', color: '#d32f2f' }}>
                                    <p>❌ {error}</p>
                                    <p style={{ fontSize: '14px', color: '#666' }}>
                                        Revisa la consola del navegador para más detalles.
                                    </p>
                                </div>
                            ) : filteredProductos.length > 0 ? (
                                <div className="d-flex-column gap-10">
                                    <ul className="search-products d-grid-5-3-2fr">
                                        {currentProducts.map((producto) => (
                                            <Producto
                                                key={producto.sku}
                                                producto={producto}
                                                truncate={truncate}
                                                onToggleFavorite={handleToggleFavorite}
                                                isFavorite={favorites.some(
                                                    (fav) => fav.sku === producto.sku
                                                )}
                                            />
                                        ))}
                                    </ul>

                                    <Paginacion paginaActual={currentPage} totalPaginas={totalPages} onChange={handlePageChange} />
                                </div>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '40px' }}>
                                    <p>
                                        No se encontraron productos. Intenta con otros términos de
                                        búsqueda.
                                    </p>
                                    {query && productos.length === 0 && (
                                        <p style={{ fontSize: '14px', color: '#666' }}>
                                            ⚠️ No hay productos cargados. Revisa la consola para
                                            más información.
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}

export default PaginaBusqueda;
