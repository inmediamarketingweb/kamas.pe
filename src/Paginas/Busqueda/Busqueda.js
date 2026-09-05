import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Helmet from 'react-helmet';

import './Busqueda.css';

import { Producto } from '../../Componentes/Plantillas/Producto/Producto';

function PaginaBusqueda() {
    const [productos, setProductos] = useState([]);
    const [filteredProductos, setFilteredProductos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const itemsPerPage = 100;

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query') || '';

    const normalizeStr = (str = '') => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                setLoading(true);
                setError(null);
                
                console.log('🚀 Iniciando carga de productos...');
                console.log('📂 Intentando cargar manifest.json desde: /assets/json/manifest.json');
                
                const manifestResponse = await fetch('/assets/json/manifest.json');
                
                if (!manifestResponse.ok) {
                    console.error(`❌ Error al cargar manifest.json: ${manifestResponse.status} - ${manifestResponse.statusText}`);
                    setError(`No se pudo cargar el archivo manifest.json (${manifestResponse.status})`);
                    setLoading(false);
                    setProductos([]);
                    return;
                }
                
                console.log('✅ manifest.json cargado correctamente');
                const manifestData = await manifestResponse.json();
                const archivos = manifestData.files || [];
                
                console.log(`📊 Total de archivos en manifest: ${archivos.length}`);
                
                if (archivos.length === 0) {
                    console.warn('⚠️ El manifest.json está vacío o no tiene archivos');
                    setLoading(false);
                    setProductos([]);
                    return;
                }
                
                // Usar Promise.allSettled para manejar errores individuales
                const resultados = await Promise.allSettled(
                    archivos.map(async (archivo, index) => {
                        try {
                            const response = await fetch(archivo);
                            
                            if (!response.ok) {
                                console.warn(`⚠️ [${index + 1}/${archivos.length}] Archivo NO encontrado: ${archivo} - Status: ${response.status}`);
                                return {
                                    archivo,
                                    success: false,
                                    status: response.status,
                                    error: `HTTP ${response.status}`,
                                    productos: []
                                };
                            }
                            
                            const data = await response.json();
                            const cantidadProductos = data.productos?.length || 0;
                            
                            if (cantidadProductos === 0) {
                                console.warn(`⚠️ [${index + 1}/${archivos.length}] Archivo sin productos: ${archivo}`);
                            } else {
                                console.log(`✅ [${index + 1}/${archivos.length}] Archivo cargado: ${archivo} - ${cantidadProductos} productos`);
                            }
                            
                            return {
                                archivo,
                                success: true,
                                status: 200,
                                productos: data.productos || [],
                                cantidad: cantidadProductos
                            };
                        } catch (error) {
                            console.error(`❌ [${index + 1}/${archivos.length}] Error al procesar ${archivo}:`, error.message);
                            return {
                                archivo,
                                success: false,
                                error: error.message,
                                productos: []
                            };
                        }
                    })
                );
                
                // Procesar resultados
                const productosExitosos = [];
                const archivosFallidos = [];
                let totalArchivosCargados = 0;
                let totalProductos = 0;
                
                resultados.forEach((result, index) => {
                    if (result.status === 'fulfilled') {
                        const data = result.value;
                        if (data.success && data.productos.length > 0) {
                            productosExitosos.push(...data.productos);
                            totalArchivosCargados++;
                            totalProductos += data.productos.length;
                        } else if (!data.success) {
                            archivosFallidos.push({
                                archivo: data.archivo,
                                error: data.error || 'Desconocido'
                            });
                        }
                    } else {
                        // Promise rechazada
                        const archivo = archivos[index] || 'Desconocido';
                        archivosFallidos.push({
                            archivo,
                            error: result.reason?.message || 'Promise rechazada'
                        });
                        console.error(`❌ Promise rechazada para ${archivo}:`, result.reason);
                    }
                });
                
                // Mostrar resumen en consola
                console.log('📊 ===== RESUMEN DE CARGA =====');
                console.log(`✅ Archivos cargados exitosamente: ${totalArchivosCargados}`);
                console.log(`❌ Archivos fallidos: ${archivosFallidos.length}`);
                console.log(`📦 Total de productos: ${totalProductos}`);
                
                if (archivosFallidos.length > 0) {
                    console.log('📋 Archivos fallidos:');
                    archivosFallidos.forEach(({ archivo, error }) => {
                        console.log(`   ❌ ${archivo} - Error: ${error}`);
                    });
                }
                console.log('===============================');
                
                setProductos(productosExitosos);
                setLoading(false);
                
            } catch (error) {
                console.error('💥 Error crítico al cargar los productos:', error);
                setError(`Error crítico: ${error.message}`);
                setLoading(false);
                setProductos([]);
            }
        };
        
        fetchProductos();
    }, []);

    useEffect(() => {
        if (!query.trim()) {
            setFilteredProductos([]);
            return;
        }

        console.log(`🔍 Buscando: "${query}" en ${productos.length} productos`);
        const tokens = normalizeStr(query).split(' ').filter(Boolean);

        const filtered = productos.filter(producto => {
            const normalizedNombre = normalizeStr(String(producto.nombre ?? ''));
            const normalizedSKU = normalizeStr(String(producto.sku ?? ''));
            const normalizedCategoria = normalizeStr(String(producto.categoria ?? ''));
            const normalizedSubCategoria = normalizeStr(String(producto.subCategoria ?? ''));

            const match = tokens.every(token => 
                normalizedNombre.includes(token) || 
                normalizedSKU.includes(token) || 
                normalizedCategoria.includes(token) || 
                normalizedSubCategoria.includes(token)
            );
            
            return match;
        });

        console.log(`✅ Resultados encontrados: ${filtered.length}`);
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
                <title>{query || 'Búsqueda'} | Kamas</title>
                <meta name='description' content="Resultados de búsqueda" />
            </Helmet>

            <main>
                <div className='block-container'>
                    <section className='block-content'>
                        <div className='block-title-container d-flex-column-left gap-10'>
                            <p className='block-title text-left'>
                                {query ? `Resultados para: ${query}` : 'Buscar productos'}
                            </p>
                            {!loading && !error && filteredProductos.length > 0 && (
                                <p className="title text-left">{totalItems} productos encontrados</p>
                            )}
                        </div>

                        <div className='search-products-content gap-10'>
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
                                <div className='d-flex-column gap-10'>
                                    <ul className='search-products d-grid-5-3-2fr'>
                                        {currentProducts.map(producto => (
                                            <Producto 
                                                key={producto.sku} 
                                                producto={producto} 
                                                truncate={truncate} 
                                                onToggleFavorite={handleToggleFavorite} 
                                                isFavorite={favorites.some(fav => fav.sku === producto.sku)}
                                            />
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

                                            <button className="pagination-arrow" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                                                <span className="material-symbols-outlined">chevron_right</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '40px' }}>
                                    <p>No se encontraron productos. Intenta con otros términos de búsqueda.</p>
                                    {query && productos.length === 0 && (
                                        <p style={{ fontSize: '14px', color: '#666' }}>
                                            ⚠️ No hay productos cargados. Revisa la consola para más información.
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
