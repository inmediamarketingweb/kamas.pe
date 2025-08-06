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
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const categoriaParam = searchParams.get('categoria');
    const categoria = categoriaParam ? categoriaParam.replace(/-/g, ' ') : null;
    const detallesParam = searchParams.get('detalles-del-producto');
    const detalles = detallesParam ? JSON.parse(detallesParam) : {};

    useEffect(() => {
        const cargarProductos = async () => {
            try{
                const manifestResponse = await fetch('/assets/json/manifest.json');
                const manifestData = await manifestResponse.json();
                const archivos = manifestData.files || [];
                const productosPromesas = archivos.map(async (url) => {
                    const response = await fetch(url);
                    const data = await response.json();
                    return data.productos.filter(p => p["oferta"] === "si");
                });

                const productosPorArchivo = await Promise.all(productosPromesas);
                const productosFiltrados = productosPorArchivo.flat();

                setProductos(productosFiltrados);
            } catch (error) {
                console.error("Error cargando productos:", error);
            }
        };

        cargarProductos();
    }, []);

    const truncate = (str, maxLength) => {
        return str.length > maxLength ? str.slice(0, maxLength - 3) + "..." : str;
    };

    const productosFiltrados = productos.filter(producto => {
        if (categoria && producto.categoria !== categoria) {
            return false;
        }
        for (const [key, value] of Object.entries(detalles)) {
            const valorBuscado = value.replace(/-/g, ' ');
            const detalleEncontrado = producto['detalles-del-producto'].some(detalle => {
                return detalle[key] === valorBuscado;
            });
            
            if (!detalleEncontrado) {
                return false;
            }
        }
        if (filtrosPrecio.length > 0) {
            const precio = parseFloat(producto.precioVenta);
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

    return(
        <>
            <Helmet>
                <title>¡Ofertas ⏰! | Kamas</title>
                <meta name="description" content="Descubre los mejores descuentos en productos solo por horas en Kamas." />
            </Helmet>

            <main className="solo-por-horas-page-main d-flex-column">
                <section className="block-container solo-por-horas-page-container">
                    <div className="block-content solo-por-horas-page-content">
                        <Categorias/>

                        <Filtros onCambiarPrecio={setFiltrosPrecio} />

                        <div className='d-flex-column gap-10 solo-por-horas-productos'>
                            <div className='d-flex-center-between banner-top-ofertas gap-20'>
                                <div className='d-flex-column'>
                                    <p className='block-title text-left color-white'>Cyber Kamas</p>
                                    <p className='title color-white'>¡Aprovecha hasta el <b className='font-bold color-red'>35% de descuento</b> en dormitorios seleccionados! 🔥</p>
                                </div>

                                <ConteoRegresivo/>
                            </div>

                            <ul className="products-list">
                                {productosFiltrados.length === 0 ? (
                                    <div className='no-hay-productos d-flex-column w-100'>
                                        <p className='text'>Lo sentimos, las ofertas para esta categoría se han agotado 😢</p>
                                    </div>
                                ) : (
                                    productosFiltrados.map(producto => (
                                        <Producto key={producto.sku} producto={producto} truncate={truncate} />
                                    ))
                                )}
                            </ul>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Ofertas;
