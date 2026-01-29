import PropTypes from 'prop-types';
import { useState, useEffect, useMemo, useCallback } from "react";

import LazyImage from '../LazyImage';

import './Producto.css';
import './CSS/Favorite.css';

export function Producto({ producto, truncate, onToggleFavorite, isFavorite, skusOfertas = [], isOfferActive = true}) {
    useEffect(() => {
        if (process.env.NODE_ENV === 'development' && isOfferActive === undefined) {
            console.warn('Producto: isOfferActive fue undefined, usando valor por defecto true');
        }
    }, [isOfferActive]);

    const [secondImageError, setSecondImageError] = useState(false);

    const { estaEnOfertas, precioFinal, descuentoTotal, tipoEnvioClase } = useMemo(() => {
        const enOfertas = isOfferActive && skusOfertas.includes(producto.sku);
        const finalPrice = enOfertas ? Math.round(producto.precioVenta * 0.95) : producto.precioVenta;

        const descuentoOrig = Math.round(
            ((producto.precioNormal - producto.precioVenta) * 100 / producto.precioNormal)
        );

        const totalDiscount = enOfertas ? Math.round(((producto.precioNormal - finalPrice) * 100) / producto.precioNormal) : descuentoOrig;

        const envioClase = producto["tipo-de-envio"] === "Gratis" ? "envio-gratis" 
            : producto["tipo-de-envio"] === "Envío preferente" ? "envio-preferente" 
            : producto["tipo-de-envio"] === "Envío aplicado" ? "envio-aplicado" 
            : "";

        return {
            estaEnOfertas: enOfertas,
            precioFinal: finalPrice,
            descuentoTotal: totalDiscount,
            tipoEnvioClase: envioClase
        };
    }, [producto, isOfferActive, skusOfertas]);

    const [imageSize, setImageSize] = useState(200);

    useEffect(() => {
        let timeoutId;
        
        const handleResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setImageSize(window.innerWidth < 600 ? 140 : 200);
            }, 100);
        };

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timeoutId);
        };
    }, []);

    const handleFavoriteClick = useCallback(() => {
        if (typeof onToggleFavorite === 'function') {
            onToggleFavorite(producto);
        } else {
            console.error("onToggleFavorite no es una función válida");
        }
    }, [onToggleFavorite, producto]);

    const { mainImageSrc, secondImageSrc } = useMemo(() => {
        let basePath = producto.fotos;

        if (!basePath.endsWith('/')) {
            basePath += '/';
        }

        const firstImage = `${basePath}1.jpg`;
        const secondImage = `${basePath}2.jpg`;

        return {
            mainImageSrc: firstImage,
            secondImageSrc: secondImage
        };
    }, [producto.fotos]);

    const handleSecondImageError = useCallback((e) => {
        if (!secondImageError) {
            setSecondImageError(true);
            e.target.style.display = 'none';
        }
    }, [secondImageError]);

    return(
        <li className='product-card-li'>
            <div className={`product-card ${producto.stock === 0 ? "agotado" : ""}`}>
                <div className="product-card-images">
                    {descuentoTotal > 0 && (
                        <span className="product-card-discount">-{descuentoTotal}%</span>
                    )}

                    <a href={producto.ruta} title={producto.nombre}>
                        <LazyImage width={imageSize} height={imageSize} src={mainImageSrc} alt={producto.nombre} className="product-image" fetchPriority="low"/>

                        {!secondImageError && (
                            <img width={imageSize} height={imageSize} src={secondImageSrc} alt={producto.nombre} className="product-image product-image-hover" loading="lazy" decoding="async" onError={handleSecondImageError} style={{ display: 'none' }}/>
                        )}
                    </a>

                    <button type="button" className={`product-card-favorite ${isFavorite ? "active" : ""}`} onClick={handleFavoriteClick} title="Agregar a favoritos" aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}>
                        <span className="material-icons" aria-hidden="true">favorite</span>
                    </button>
                </div>

                <a href={producto.ruta} title={producto.nombre} className="product-card-content">
                    {producto.stock === 0 ? (
                        <div className="product-card-agotado product-card-target">
                            <span>Sin stock 😥</span>
                        </div>
                    ) : (
                        <>
                            {isOfferActive && (producto.oferta === "si" || estaEnOfertas) && (
                                <>
                                    <div className="product-card-ofert">
                                        <span>Oferta ⏰</span>
                                    </div>

                                    <div className='d-flex-center-left margin-right product-card-separar'>
                                        <span className="material-icons">sell</span>
                                        <p>Separa con <b>S/100</b></p>
                                    </div>
                                </>
                            )}

                            {producto.novedades !== "si" && producto["solo-por-horas"] !== "si" && producto.oferta !== "si" && !estaEnOfertas && (
                                <div className={`product-card-tipo-de-envio ${tipoEnvioClase}`}>
                                    <span>
                                        {producto["tipo-de-envio"] === "Gratis" ? "Envío gratis" : producto["tipo-de-envio"] || "No especificado"}
                                    </span>
                                </div>
                            )}
                        </>
                    )}

                    <div className='d-flex-column'>
                        <span className="product-card-brand">KAMAS</span>
                        <p className="product-card-name">{truncate(producto.nombre, 56)}</p>
                    </div>

                    <div className="product-card-prices">
                        <div className="d-flex-column">
                            <span className="product-card-regular-price">S/.{producto.precioRegular}</span>
                            <span className="product-card-normal-price">S/.{producto.precioNormal}</span>
                        </div>

                        <div className='d-flex-column'>
                            {isOfferActive && estaEnOfertas ? (
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
    skusOfertas: PropTypes.arrayOf(PropTypes.string),
    isOfferActive: PropTypes.bool,
};
