import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

import './Ofertas.css';

import Categorias from './Componentes/Categorias/Categorias';
import Filtros from '../../Componentes/Filtros/Filtros';
import ConteoRegresivo from '../../Componentes/ConteoRegresivo/ConteoRegresivo';
import { Producto } from '../../Componentes/Plantillas/Producto/Producto';

function Ofertas(){
    const [filtrosPrecio, setFiltrosPrecio] = useState([]);
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [favoritos, setFavoritos] = useState([]);
    const [tiempoAgotado, setTiempoAgotado] = useState(false);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const categoriaParam = searchParams.get('categoria');
    const categoria = categoriaParam ? categoriaParam.replace(/-/g, ' ') : null;
    const filtrosDetalles = {};
    const [isOfferActive, setIsOfferActive] = useState(true);
    const handleExpire = () => setIsOfferActive(false);
    const handleActivate = () => setIsOfferActive(true);

    searchParams.forEach((value, key) => {
        if (key !== 'categoria') {
            filtrosDetalles[key] = value.replace(/-/g, ' ');
        }
    });

    const [skusOfertas, setSkusOfertas] = useState([]);

    useEffect(() => {
        const favoritosGuardados = localStorage.getItem('favoritos');
        if (favoritosGuardados) {
            setFavoritos(JSON.parse(favoritosGuardados));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
    }, [favoritos]);

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
        const cargarProductos = async () => {
            try {
                const ofertasResponse = await fetch('/assets/json/ofertas.json');
                if (!ofertasResponse.ok) {
                    throw new Error('No se pudo cargar ofertas.json');
                }

                const skusOfertas = await ofertasResponse.json();

                if (!Array.isArray(skusOfertas)) {
                    throw new Error('El formato de ofertas.json no es válido. Se esperaba un array de SKUs.');
                }

                if (skusOfertas.length === 0) {
                    setProductos([]);
                    setLoading(false);
                    return;
                }

                const skusBuscados = new Set(skusOfertas);

                const manifestResponse = await fetch('/assets/json/manifest.json');
                if (!manifestResponse.ok) {
                    throw new Error('No se pudo cargar manifest.json');
                }

                const manifestData = await manifestResponse.json();
                const archivos = manifestData.files || [];
                
                const productosPromesas = archivos.map(async (url) => {
                    const response = await fetch(url);
                    const data = await response.json();
                    return data.productos.filter(p => skusBuscados.has(p.sku));
                });

                const productosPorArchivo = await Promise.all(productosPromesas);
                const productosFiltrados = productosPorArchivo.flat();

                setProductos(productosFiltrados);
                setLoading(false);
            } catch (error) {
                console.error("Error cargando productos:", error);
                setError(error.message);
                setLoading(false);
            }
        };

        cargarProductos();
    }, []);

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

    const truncate = (str, maxLength) => {
        return str.length > maxLength ? str.slice(0, maxLength - 3) + "..." : str;
    };

    const productosFiltrados = productos.filter(producto => {
        if (categoria && producto.categoria !== categoria) {
            return false;
        }
        
        for (const [key, value] of Object.entries(filtrosDetalles)) {
            const detalleEncontrado = producto['detalles-del-producto'].some(detalleObj => {
                return Object.entries(detalleObj).some(([detalleKey, detalleValue]) => {
                    const normalizedKey = detalleKey.toLowerCase().replace(/[- ]/g, '');
                    const normalizedFilterKey = key.toLowerCase().replace(/[- ]/g, '');
                    
                    if (normalizedKey === normalizedFilterKey) {
                        const normalizedDetalleValue = detalleValue.toString().toLowerCase().trim();
                        const normalizedFilterValue = value.toString().toLowerCase().trim();
                        return normalizedDetalleValue === normalizedFilterValue;
                    }
                    return false;
                });
            });
            
            if (!detalleEncontrado) {
                return false;
            }
        }
        
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

    if (loading){
        return(
            <div className="cargando">
                <p>Cargando ofertas...</p>
            </div>
        );
    }

    if (error){
        return (
            <div className="error">
                <p>Error: {error}</p>
                <p>Por favor intenta recargar la página.</p>
            </div>
        );
    }

    return(
        <>
            <Helmet>
                <title>Ofertas ⏰ | Kamas</title>
                <meta name="description" content="Descubre los mejores descuentos en productos solo por horas en Kamas." />
            </Helmet>

            <main className="ofertas-main d-flex-column">
                <section className="block-container ofertas-container">
                    <div className="block-content ofertas-content">
                        <Categorias/>

                        <Filtros onCambiarPrecio={setFiltrosPrecio} />

                        <div className='d-flex-column gap-10 ofertas-productos'>
                            <div className='d-flex-center-between banner-top-ofertas gap-20'>
                                <div className='d-flex-column'>
                                    <p className='block-title text-left color-white'>Ofertas Kamas</p>
                                    <p className='title color-white'>Aprovecha hasta el <b className='font-bold color-red'>30% de descuento</b> en dormitorios seleccionados</p>
                                </div>

                                <ConteoRegresivo onExpire={handleExpire} onActivate={handleActivate} onTerminar={() => setTiempoAgotado(true)} />
                            </div>

                            {tiempoAgotado ? (
                                <div className='d-flex-center-center gap-10 w-100 h-70-px bg-white border-r-6'>
                                    <p className='title text'>El tiempo se agotó, pero más ofertas están en camino.</p>
                                    <a href='/ofertas/' className='button-link button-link-5' title='Ofertas | Kamas'>
                                        <p className='button-link-text'>Ver más</p>
                                    </a>
                                </div>
                            ) : productosFiltrados.length === 0 ? (
                                <div className='d-flex-center-center gap-10 w-100 h-70-px bg-white border-r-6'>
                                    <p className='title text'>Lo sentimos no contamos ofertas disponibles para la categoría seleccionada.</p>
                                    <a href='/ofertas/' className='button-link button-link-5' title='Ofertas | Kamas'>
                                        <p className='button-link-text'>Ver más</p>
                                    </a>
                                </div>
                            ) : (
                                <ul className="products-list">
                                    {productosFiltrados.map(
                                        producto => (
                                            <Producto key={producto.sku} producto={producto}
                                                truncate={truncate} onToggleFavorite={toggleFavorite}
                                                isFavorite={favoritos.some(fav => fav.sku === producto.sku)}
                                                skusOfertas={skusOfertas}
                                                isOfferActive={isOfferActive}
                                            />
                                        )
                                    )}
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
