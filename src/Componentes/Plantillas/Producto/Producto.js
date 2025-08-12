import PropTypes from 'prop-types';
import { useState, useEffect } from "react";

import './Producto.css';
import './CSS/Favorite.css';

import LazyImage from '../LazyImage';

export function Producto({ producto, truncate, onToggleFavorite, isFavorite, skusOfertas }){
    const [secondImageError, setSecondImageError] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);
    const estaEnOfertas = skusOfertas.includes(producto.sku);

    const calcularPrecioAjustado = () => {
        if (!estaEnOfertas) return producto.precioVenta;

        const precioConDescuento = producto.precioVenta * 0.9;

        const precioRedondeado = Math.round(precioConDescuento);
        return Math.floor(precioRedondeado / 10) * 10 + 9;
    };

    const precioFinal = calcularPrecioAjustado();

    const descuentoOriginal = Math.round(
        ((producto.precioNormal - producto.precioVenta) * 100 / producto.precioNormal
    ));

    const descuentoTotal = estaEnOfertas 
        ? Math.round(((producto.precioNormal - precioFinal) * 100) / producto.precioNormal)
        : descuentoOriginal;

    useEffect(() => {
        const handleResize = () => setIsSmallScreen(window.innerWidth < 600);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const imageSize = isSmallScreen ? 140 : 200;

    const tipoEnvioClase = 
    producto["tipo-de-envio"] === "Gratis" ? "envio-gratis" :
    producto["tipo-de-envio"] === "Envío preferente" ? "envio-preferente" :
    producto["tipo-de-envio"] === "Envío aplicado" ? "envio-aplicado" : "";

    return(
        <li className='product-card-li'>
            <div className={`product-card ${producto.stock === 0 ? "agotado" : ""}`}>
                <div className="product-card-images">
                    {descuentoTotal > 0 && (
                        <span className="product-card-discount">-{descuentoTotal}%</span>
                    )}

                    <a href={producto.ruta} title={producto.nombre}>
                        <LazyImage width={imageSize} height={imageSize} src={`${producto.fotos}1.jpg`} alt={producto.nombre} className="product-image"/>
                        <img width={imageSize} height={imageSize} src={`${producto.fotos}2.jpg`} alt={producto.nombre} className="product-image"
                            onError={(e) => {
                                if (!secondImageError) {
                                    e.target.src = `${producto.fotos}1.jpg`;
                                    setSecondImageError(true);
                                }
                            }}
                            loading="lazy"
                        />
                    </a>

                    <button type="button" className={`product-card-favorite ${isFavorite ? "active" : ""}`}
                        onClick={() => {
                            if (typeof onToggleFavorite === 'function') {
                                onToggleFavorite(producto);
                            } else {
                                console.error("onToggleFavorite no es una función válida");
                            }
                        }}
                        title="Agregar a favoritos"
                    >
                        <span className="material-icons">favorite</span>
                    </button>
                </div>

                <a href={producto.ruta} title={producto.nombre} className="product-card-content">
                    {producto.stock === 0 ? (
                        <div className="product-card-agotado product-card-target">
                            <span>Sin stock 😥</span>
                        </div>
                    ) : (
                        <>
                            {(producto.oferta === "si" || estaEnOfertas) && (
                                <>
                                    <div className="product-card-ofert">
                                        <span>Oferta ⏰</span>
                                    </div>

                                    <div className='d-flex-center-left margin-right product-card-separar'>
                                        <span className="material-icons">sell</span>
                                        <p>Separa con <b>S/.100</b></p>
                                    </div>
                                </>
                            )}

                            {producto.novedades !== "si" && 
                             producto["solo-por-horas"] !== "si" && 
                             producto.oferta !== "si" && 
                             !estaEnOfertas && (
                                <div className={`product-card-tipo-de-envio ${tipoEnvioClase}`}>
                                    <span>
                                        {producto["tipo-de-envio"] === "Gratis" 
                                            ? "Envío gratis" 
                                            : producto["tipo-de-envio"] || "No especificado"
                                        }
                                    </span>
                                </div>
                            )}
                        </>
                    )}

                    <div className='d-flex-column'>
                        <span className="product-card-brand">KAMAS</span>
                        <h4 className="product-card-name">{truncate(producto.nombre, 56)}</h4>
                    </div>

                    <div className="product-card-prices">
                        <div className="d-flex-column">
                            <span className="product-card-regular-price">S/.{producto.precioRegular}</span>
                            <span className="product-card-normal-price">S/.{producto.precioNormal}</span>
                        </div>
                        <div className='d-flex-column'>
                            {estaEnOfertas ? (
                                <div className='d-flex-column'>
                                    <span className="product-card-sale-price product-card-sale-price-offer">S/.{producto.precioVenta}</span>
                                    <span className="product-card-sale-price-final">S/.{precioFinal}</span>
                                </div>
                            ) : (
                                <span className="product-card-sale-price">S/.{precioFinal}</span>
                            )}
                        </div>
                    </div>
                </a>
            </div>
        </li>
    );
}

Producto.propTypes = {
    producto: PropTypes.shape({
        sku: PropTypes.string.isRequired,
        nombre: PropTypes.string.isRequired,
        ruta: PropTypes.string.isRequired,
        fotos: PropTypes.string.isRequired,
        precioRegular: PropTypes.number.isRequired,
        precioNormal: PropTypes.number.isRequired,
        precioVenta: PropTypes.number.isRequired,
        stock: PropTypes.number.isRequired,
        "tipo-de-envio": PropTypes.string,
        novedades: PropTypes.string,
        oferta: PropTypes.string,
        "solo-por-horas": PropTypes.string,
    }).isRequired,
    truncate: PropTypes.func.isRequired,
    onToggleFavorite: PropTypes.func.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    skusOfertas: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Producto.defaultProps = {
    skusOfertas: [],
};
