// import { useEffect, useState, useMemo, useCallback } from 'react';
// import { Helmet } from 'react-helmet-async';
// import { useLocation } from 'react-router-dom';

// import './Productos.css';

// import Header from '../../Componentes/Header/Header';
// import Filtros from '../../Componentes/Plantillas/Filtros/Filtros';
// import { Producto } from '../../Componentes/Plantillas/Producto/Producto';
// import Footer from '../../Componentes/Footer/Footer';

// function Productos(){
//     const [filtrosPrecio, setFiltrosPrecio] = useState([]);
//     const [productos, setProductos] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [productsPerPage] = useState(24);
//     const [sortOption, setSortOption] = useState('');
//     const [envioGratis, setEnvioGratis] = useState(false);
//     const [enOferta, setEnOferta] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const location = useLocation();
//     const searchParams = new URLSearchParams(location.search);
//     const categoriaParam = searchParams.get('categoria');
//     const categoria = useMemo(() => categoriaParam ? categoriaParam.replace(/-/g, ' ') : null, [categoriaParam]);
//     const detallesParam = searchParams.get('detalles-del-producto');
//     const detalles = useMemo(() => {
//         try {
//             return detallesParam ? JSON.parse(detallesParam) : {};
//         } catch(e) {
//             console.error("Error parsing detalles:", e);
//             return {};
//         }
//     }, [detallesParam]);

//     const cargarProductos = useCallback(async () => {
//         try {
//             setLoading(true);
//             const manifestResponse = await fetch('/assets/json/manifest.json');
//             const manifestData = await manifestResponse.json();
//             const archivos = manifestData.files || [];
//             const archivosIniciales = archivos.slice(0, 3);
//             const archivosRestantes = archivos.slice(3);

//             const productosPromesas = archivosIniciales.map(async (url) => {
//                 const response = await fetch(url);
//                 const data = await response.json();
//                 return data.productos;
//             });

//             const productosPorArchivo = await Promise.all(productosPromesas);
//             const todosProductos = productosPorArchivo.flat();

//             setProductos(todosProductos);
//             setLoading(false);

//             if (archivosRestantes.length > 0) {
//                 const restantesPromesas = archivosRestantes.map(async (url) => {
//                     const response = await fetch(url);
//                     const data = await response.json();
//                     return data.productos;
//                 });

//                 const restantesProductos = await Promise.all(restantesPromesas);
//                 const productosCompletos = [...todosProductos, ...restantesProductos.flat()];
//                 setProductos(productosCompletos);
//             }
//         } catch (error) {
//             console.error("Error cargando productos:", error);
//             setLoading(false);
//         }
//     }, []);

//     useEffect(() => {
//         cargarProductos();
//     }, [cargarProductos]);

//     const productosFiltrados = useMemo(() => {
//         if (productos.length === 0) return [];

//         const rangosPrecio = filtrosPrecio.map(rango => {
//             const [min, max] = rango.split('-').map(Number);
//             return { min, max };
//         });

//         const normalizarTexto = (texto) => {
//             if (typeof texto !== 'string') return '';
//             return texto
//                 .toLowerCase()
//                 .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
//                 .replace(/\s+/g, ' ')
//                 .replace(/[^a-z0-9 ]/g, '')
//                 .trim();
//         };

//         const cumpleDetalles = (producto) => {
//             if (!detalles || Object.keys(detalles).length === 0) return true;

//             const detallesProducto = producto['detalles-del-producto'];
//             if (!detallesProducto || detallesProducto.length === 0) return false;

//             const detallesPlano = {};
//             detallesProducto.forEach(detalleObj => {
//                 Object.entries(detalleObj).forEach(([key, value]) => {
//                     const claveNormalizada = normalizarTexto(key);
//                     detallesPlano[claveNormalizada] = normalizarTexto(value);
//                 });
//             });

//             for (const [claveFiltro, valorFiltro] of Object.entries(detalles)) {
//                 const claveNormalizada = normalizarTexto(claveFiltro);
//                 const valorNormalizado = normalizarTexto(valorFiltro);

//                 const valoresCoincidentes = Object.entries(detallesPlano)
//                     .filter(([clave]) => clave.includes(claveNormalizada) || claveNormalizada.includes(clave))
//                     .map(([, valor]) => valor);
                
//                 if (!valoresCoincidentes.includes(valorNormalizado)) {
//                     return false;
//                 }
//             }

//             return true;
//         };

//         return productos.filter(producto => {
//             if (categoria && normalizarTexto(producto.categoria) !== normalizarTexto(categoria)) {
//                 return false;
//             }

//             if (!cumpleDetalles(producto)) {
//                 return false;
//             }

//             if (rangosPrecio.length > 0) {
//                 const precio = parseFloat(producto.precioVenta);
//                 if (isNaN(precio)) return false;
                
//                 const cumplePrecio = rangosPrecio.some(({ min, max }) => 
//                     precio >= min && precio <= max
//                 );
//                 if (!cumplePrecio) return false;
//             }

//             if (envioGratis && normalizarTexto(producto["tipo-de-envio"]) !== "gratis") {
//                 return false;
//             }

//             if (enOferta) {
//                 const oferta = normalizarTexto(producto.oferta || '');
//                 const soloPorHoras = normalizarTexto(producto["solo-por-horas"] || '');
//                 if (oferta !== "si" && soloPorHoras !== "si") {
//                     return false;
//                 }
//             }

//             return true;
//         });
//     }, [productos, categoria, detalles, filtrosPrecio, envioGratis, enOferta]);

//     const productosOrdenados = useMemo(() => {
//         if (sortOption === 'precio-asc') {
//             return [...productosFiltrados].sort((a, b) => 
//                 parseFloat(a.precioVenta) - parseFloat(b.precioVenta)
//             );
//         } else if (sortOption === 'precio-desc') {
//             return [...productosFiltrados].sort((a, b) => 
//                 parseFloat(b.precioVenta) - parseFloat(a.precioVenta)
//             );
//         }
//         return productosFiltrados;
//     }, [productosFiltrados, sortOption]);

//     const indexOfLastProduct = currentPage * productsPerPage;
//     const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//     const currentProducts = useMemo(() => 
//         productosOrdenados.slice(indexOfFirstProduct, indexOfLastProduct),
//         [productosOrdenados, indexOfFirstProduct, indexOfLastProduct]
//     );

//     const totalPages = Math.ceil(productosOrdenados.length / productsPerPage);

//     const paginate = useCallback((pageNumber) => {
//         setCurrentPage(pageNumber);
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//     }, []);

//     const getPageNumbers = useCallback(() => {
//         const pageNumbers = [];
//         const maxPagesToShow = 3;

//         let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
//         let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

//         if (endPage - startPage < maxPagesToShow - 1) {
//             startPage = Math.max(1, endPage - maxPagesToShow + 1);
//         }

//         for (let i = startPage; i <= endPage; i++) {
//             pageNumbers.push(i);
//         }

//         return pageNumbers;
//     }, [currentPage, totalPages]);

//     const truncate = useCallback((str, maxLength) => {
//         return str.length > maxLength ? str.slice(0, maxLength - 3) + "..." : str;
//     }, []);

//     useEffect(() => {
//         setCurrentPage(1);
//     }, [categoria, detalles, filtrosPrecio, envioGratis, enOferta, sortOption]);

//     return(
//         <>
//             <Helmet>
//                 <title>Productos | Kamas</title>
//                 <meta name="description" content="Explora nuestra amplia selección de productos" />
//             </Helmet>

//             <Header/>

//             <main>
//                 <section className="block-container pagina-productos-container">
//                     <div className="block-content pagina-productos-content">
//                         <Filtros onCambiarPrecio={setFiltrosPrecio}/>

//                         <div className='d-flex-column gap-10 pagina-productos-productos'>
//                             <div className='filters-top d-flex-center-between bg-loading w-100 h-70-px'>
//                                 <div className='d-flex gap-10'>
//                                     <button type='button' className={`d-flex filter-button ${envioGratis ? 'active' : ''}`} onClick={() => setEnvioGratis(!envioGratis)}>
//                                         <span className="material-icons">local_shipping</span>
//                                         <p>Envío gratis</p>
//                                     </button>

//                                     <button type='button' className={`d-flex filter-button ${enOferta ? 'active' : ''}`} onClick={() => setEnOferta(!enOferta)} >
//                                         <span className="material-icons">local_offer</span>
//                                         <p>En oferta</p>
//                                     </button>
//                                 </div>

//                                 <div>
//                                     <select className='filters-orden' value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
//                                         <option value="">Ordenar por</option>
//                                         <option value="precio-asc">Precio de menor a mayor</option>
//                                         <option value="precio-desc">Precio de mayor a menor</option>
//                                     </select>
//                                 </div>
//                             </div>

//                             {loading ? (
//                                 <div className="loading-products d-flex-center-center d-flex-column gap-10">
//                                     <div className="spinner"></div>
//                                 </div>
//                             ) : (
//                                 <div className='d-flex-column gap-10'>
//                                     <button type='button' className='filter-button-open'>
//                                         <span class="material-icons">tune</span>
//                                         <p>Filtros</p>
//                                     </button>

//                                     <ul className="products-list">
//                                         {currentProducts.length === 0 ? (
//                                             <div className='no-hay-productos d-flex-column w-100'>
//                                                 <p className='text'>Lo sentimos, no encontramos productos con esos filtros 😢</p>
//                                                 <button className="btn-reset-filtros" onClick={() => {
//                                                         setFiltrosPrecio([]);
//                                                         setSortOption('');
//                                                         setEnvioGratis(false);
//                                                         setEnOferta(false);
//                                                     }}
//                                                 >
//                                                     Reiniciar filtros
//                                                 </button>
//                                             </div>
//                                         ) : (
//                                             currentProducts.map(producto => (
//                                                 <Producto key={producto.sku} producto={producto} truncate={truncate}/>
//                                             ))
//                                         )}
//                                     </ul>

//                                     {productosOrdenados.length > productsPerPage && (
//                                         <nav className='pagina-productos-navigation'>
//                                             <ul>
//                                                 <li>
//                                                     <button type='button' className='pagina-productos-navigation-button-arrow' onClick={() => paginate(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>
//                                                         <span className='material-icons'>chevron_left</span>
//                                                     </button>
//                                                 </li>
                                                
//                                                 {currentPage > 2 && totalPages > 3 && (
//                                                     <li>
//                                                         <button type='button' className='pagina-productos-navigation-button' onClick={() => paginate(1)}>
//                                                             <span>1</span>
//                                                         </button>
//                                                     </li>
//                                                 )}

//                                                 {currentPage > 3 && totalPages > 4 && (
//                                                     <li className='pagina-productos-navigation-ellipsis'>...</li>
//                                                 )}
                                                
//                                                 {getPageNumbers().map(number => (
//                                                     <li key={number}>
//                                                         <button type='button' className={`pagina-productos-navigation-button ${currentPage === number ? 'active' : ''}`} onClick={() => paginate(number)}>
//                                                             <span>{number}</span>
//                                                         </button>
//                                                     </li>
//                                                 ))}

//                                                 {currentPage < totalPages - 2 && totalPages > 4 && (
//                                                     <li className='pagina-productos-navigation-ellipsis'>...</li>
//                                                 )}

//                                                 {currentPage < totalPages - 1 && totalPages > 2 && (
//                                                     <li>
//                                                         <button type='button' className='pagina-productos-navigation-button' onClick={() => paginate(totalPages)}>
//                                                             <span>{totalPages}</span>
//                                                         </button>
//                                                     </li>
//                                                 )}

//                                                 <li>
//                                                     <button type='button' className='pagina-productos-navigation-button-arrow' onClick={() => paginate(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}>
//                                                         <span className='material-icons'>chevron_right</span>
//                                                     </button>
//                                                 </li>
//                                             </ul>
//                                         </nav>
//                                     )}
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </section>
//             </main>

//             <Footer />
//         </>
//     );
// }

// export default Productos;

import { useEffect, useState, useMemo, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

import './Productos.css';

import Header from '../../Componentes/Header/Header';
import Filtros from '../../Componentes/Plantillas/Filtros/Filtros';
import { Producto } from '../../Componentes/Plantillas/Producto/Producto';
import Footer from '../../Componentes/Footer/Footer';

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
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const categoriaParam = searchParams.get('categoria');
    const categoria = useMemo(() => categoriaParam ? categoriaParam.replace(/-/g, ' ') : null, [categoriaParam]);
    const detallesParam = searchParams.get('detalles-del-producto');
    const detalles = useMemo(() => {
        try {
            return detallesParam ? JSON.parse(detallesParam) : {};
        } catch(e) {
            console.error("Error parsing detalles:", e);
            return {};
        }
    }, [detallesParam]);

    const cargarProductos = useCallback(async () => {
        try {
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

        const cumpleDetalles = (producto) => {
            if (!detalles || Object.keys(detalles).length === 0) return true;

            const detallesProducto = producto['detalles-del-producto'];
            if (!detallesProducto || detallesProducto.length === 0) return false;

            const detallesPlano = {};
            detallesProducto.forEach(detalleObj => {
                Object.entries(detalleObj).forEach(([key, value]) => {
                    const claveNormalizada = normalizarTexto(key);
                    detallesPlano[claveNormalizada] = normalizarTexto(value);
                });
            });

            for (const [claveFiltro, valorFiltro] of Object.entries(detalles)) {
                const claveNormalizada = normalizarTexto(claveFiltro);
                const valorNormalizado = normalizarTexto(valorFiltro);

                const valoresCoincidentes = Object.entries(detallesPlano)
                    .filter(([clave]) => clave.includes(claveNormalizada) || claveNormalizada.includes(clave))
                    .map(([, valor]) => valor);
                
                if (!valoresCoincidentes.includes(valorNormalizado)) {
                    return false;
                }
            }

            return true;
        };

        return productos.filter(producto => {
            if (categoria && normalizarTexto(producto.categoria) !== normalizarTexto(categoria)) {
                return false;
            }

            if (!cumpleDetalles(producto)) {
                return false;
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
                const oferta = normalizarTexto(producto.oferta || '');
                const soloPorHoras = normalizarTexto(producto["solo-por-horas"] || '');
                if (oferta !== "si" && soloPorHoras !== "si") {
                    return false;
                }
            }

            return true;
        });
    }, [productos, categoria, detalles, filtrosPrecio, envioGratis, enOferta]);

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

    const getPageNumbers = useCallback(() => {
        const pageNumbers = [];
        const maxPagesToShow = 3;

        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        if (endPage - startPage < maxPagesToShow - 1) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    }, [currentPage, totalPages]);

    const truncate = useCallback((str, maxLength) => {
        return str.length > maxLength ? str.slice(0, maxLength - 3) + "..." : str;
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [categoria, detalles, filtrosPrecio, envioGratis, enOferta, sortOption]);

    return(
        <>
            <Helmet>
                <title>Productos | Kamas</title>
                <meta name="description" content="Explora nuestra amplia selección de productos" />
            </Helmet>

            <Header/>

            <main>
                <section className="block-container pagina-productos-container">
                    <div className="block-content pagina-productos-content">
                        <Filtros 
                            onCambiarPrecio={setFiltrosPrecio}
                            isOpen={filtrosOpen}
                            onClose={() => setFiltrosOpen(false)}
                        />

                        <div className='d-flex-column gap-10 pagina-productos-productos'>
                            <div className='filters-top d-flex-center-between bg-loading w-100 h-70-px'>
                                <div className='d-flex gap-10'>
                                    <button type='button' className={`d-flex filter-button ${envioGratis ? 'active' : ''}`} onClick={() => setEnvioGratis(!envioGratis)}>
                                        <span className="material-icons">local_shipping</span>
                                        <p>Envío gratis</p>
                                    </button>

                                    <button type='button' className={`d-flex filter-button ${enOferta ? 'active' : ''}`} onClick={() => setEnOferta(!enOferta)} >
                                        <span className="material-icons">local_offer</span>
                                        <p>En oferta</p>
                                    </button>
                                </div>

                                <div>
                                    <select className='filters-orden' value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                                        <option value="">Ordenar por</option>
                                        <option value="precio-asc">Precio de menor a mayor</option>
                                        <option value="precio-desc">Precio de mayor a menor</option>
                                    </select>
                                </div>
                            </div>

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
                                        <span className="material-icons">tune</span>
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
                                                    }}
                                                >
                                                    Reiniciar filtros
                                                </button>
                                            </div>
                                        ) : (
                                            currentProducts.map(producto => (
                                                <Producto key={producto.sku} producto={producto} truncate={truncate}/>
                                            ))
                                        )}
                                    </ul>

                                    {productosOrdenados.length > productsPerPage && (
                                        <nav className='pagina-productos-navigation'>
                                            <ul>
                                                <li>
                                                    <button type='button' className='pagina-productos-navigation-button-arrow' onClick={() => paginate(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>
                                                        <span className='material-icons'>chevron_left</span>
                                                    </button>
                                                </li>
                                                
                                                {currentPage > 2 && totalPages > 3 && (
                                                    <li>
                                                        <button type='button' className='pagina-productos-navigation-button' onClick={() => paginate(1)}>
                                                            <span>1</span>
                                                        </button>
                                                    </li>
                                                )}

                                                {currentPage > 3 && totalPages > 4 && (
                                                    <li className='pagina-productos-navigation-ellipsis'>...</li>
                                                )}
                                                
                                                {getPageNumbers().map(number => (
                                                    <li key={number}>
                                                        <button type='button' className={`pagina-productos-navigation-button ${currentPage === number ? 'active' : ''}`} onClick={() => paginate(number)}>
                                                            <span>{number}</span>
                                                        </button>
                                                    </li>
                                                ))}

                                                {currentPage < totalPages - 2 && totalPages > 4 && (
                                                    <li className='pagina-productos-navigation-ellipsis'>...</li>
                                                )}

                                                {currentPage < totalPages - 1 && totalPages > 2 && (
                                                    <li>
                                                        <button type='button' className='pagina-productos-navigation-button' onClick={() => paginate(totalPages)}>
                                                            <span>{totalPages}</span>
                                                        </button>
                                                    </li>
                                                )}

                                                <li>
                                                    <button type='button' className='pagina-productos-navigation-button-arrow' onClick={() => paginate(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}>
                                                        <span className='material-icons'>chevron_right</span>
                                                    </button>
                                                </li>
                                            </ul>
                                        </nav>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

export default Productos;
