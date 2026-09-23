import { useState, useEffect } from 'react';

import LazyImage from '../../../../Componentes/Plantillas/LazyImage';
import Colores from '../Colores/Colores';

import './Imagenes.css';

function Imagenes({ imagenes, producto, onSelectColor, skusOfertas, selectedShipping, shippingInfo, quantity, precioFinal }){
    const estaEnOfertas = skusOfertas.includes(producto.sku);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartX, setDragStartX] = useState(0);

    const [zoomActive, setZoomActive] = useState(false);
    const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });

    const navigateTo = (idx) => {
        if (idx >= 0 && idx < imagenes.length) setCurrentIndex(idx);
    };
    const handlePrev = () => navigateTo((currentIndex - 1 + imagenes.length) % imagenes.length);
    const handleNext = () => navigateTo((currentIndex + 1) % imagenes.length);

    const handleMouseDown = (e) => { setDragStartX(e.clientX); setIsDragging(true); };
    const handleMouseUp = (e) => {
        if (!isDragging) return;
        const deltaX = e.clientX - dragStartX;
        setIsDragging(false);
        Math.abs(deltaX) > 50 && (deltaX > 0 ? handlePrev() : handleNext());
    };

    const handleMouseEnter = () => setZoomActive(true);
    const handleMouseLeave = () => setZoomActive(false);
    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.pageX - left) / width) * 100;
        const y = ((e.pageY - top) / height) * 100;
        setZoomPos({ x, y });
    };

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

    const descuento = Math.round(((producto.precioNormal - producto.precioVenta) * 100) / producto.precioNormal);

    // Función que determina si se deben mostrar los colores basándose en "detalles-del-producto"
    const debeMostrarColores = (producto) => {
        if (!producto) return true;

        const detalles = producto['detalles-del-producto'];
        if (!Array.isArray(detalles) || detalles.length === 0) return true;

        // Tomamos el primer objeto de detalles (normalmente solo hay uno)
        const detalle = detalles[0];

        // Helper para normalizar strings (minúsculas, sin tildes, sin espacios extra)
        const normalizar = (str) => {
            if (!str) return '';
            return String(str)
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '') // quitar tildes
                .trim();
        };

        // 1. Excluir categoría "colchones"
        //    Ojo: la clave en detalles es "categoría" con tilde
        const categoria = normalizar(detalle['categoría'] || detalle['categoria'] || producto.categoria);
        if (categoria === 'colchones') return false;

        // 2. Excluir línea "clásica", "clásicos", etc.
        const linea = normalizar(detalle['línea'] || detalle['linea'] || producto.linea);
        const lineasExcluidas = ['clasica', 'clasicas', 'clasico', 'clasicos'];
        if (lineasExcluidas.includes(linea)) return false;

        // 3. Excluir si el producto ES un velador
        //    Buscamos en las claves y valores de detalles que indiquen que es un velador
        const clavesDetalle = Object.keys(detalle);
        const valoresDetalle = Object.values(detalle);

        // Si alguna clave contiene "velador" y su valor no está vacío, es un velador
        const tieneClaveVelador = clavesDetalle.some(clave => 
            normalizar(clave).includes('velador')
        );

        // Si el modelo es "velador" o el tipo es "velador"
        const modelo = normalizar(detalle['modelo'] || detalle['modelo-de-velador'] || producto.modelo);
        const tipo = normalizar(detalle['tipo'] || detalle['tipo-de-producto'] || producto.tipo);
        const categoriaDetalle = normalizar(detalle['categoría'] || detalle['categoria']);

        if (modelo === 'velador' || tipo === 'velador' || categoriaDetalle === 'veladores') return false;
        if (modelo.includes('velador') && modelo.split(' ').length <= 3) return false;

        // Si hay una clave "velador" en detalles, es un velador
        if (tieneClaveVelador) {
            // Verificamos que no sea un dormitorio que incluye velador
            // Si la categoría es "dormitorios" pero tiene clave "velador", probablemente es un conjunto
            // Solo excluimos si la categoría NO es dormitorios/camas
            if (categoria !== 'dormitorios' && categoria !== 'camas') {
                return false;
            }
        }

        return true;
    };

    const mostrarColores = debeMostrarColores(producto);

    return(
        <div className={`position-relative product-page-images-global ${producto.stock === 0 ? 'sin-stock' : ''}`}>
            <span className="product-page-discount">-{descuento}%</span>

            <div className='sin-stock-message'>Agotado</div>

            <div className="product-page-images-container">
                <div className="product-page-images-content" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseLeave={(e) => { handleMouseUp(e) }}>
                    <ul className="product-page-images" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                        {imagenes.map((src, i) => (
                            <li key={i}>
                                <div className="zoom-wrapper" onMouseEnter={handleMouseEnter} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                                    <img width={isSmallScreen ? 280 : 540} height={isSmallScreen ? 280 : 540} src={src} alt={producto.nombre}/>
                                    {zoomActive && i === currentIndex && (
                                        <div className="zoom-lens" style={{ backgroundImage: `url(${src})`, backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`}}/>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>

                    <button className="product-page-images-button product-page-images-button-1" onClick={handlePrev}>
                        <span className="material-symbols-outlined">chevron_left</span>
                    </button>

                    <button className="product-page-images-button product-page-images-button-2" onClick={handleNext}>
                        <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                </div>
            </div>

            <div className="product-page-images-miniatures-container">
                <ul className="product-page-images-miniatures">
                    {imagenes.map((img, i) => (
                        <li key={i} className={i === currentIndex ? 'active' : ''} onClick={() => navigateTo(i)}>
                            <LazyImage width={isSmallScreen ? 54 : 80} height={isSmallScreen ? 54 : 80} src={img} alt={producto.nombre}/>
                        </li>
                    ))}
                </ul>
            </div>

            {mostrarColores && (
                <Colores
                    onSelectColor={onSelectColor}
                    producto={producto}
                    selectedShipping={selectedShipping}
                    shippingInfo={shippingInfo}
                    quantity={quantity}
                    precioFinal={precioFinal}
                />
            )}
        </div>
    );
}

export default Imagenes;
