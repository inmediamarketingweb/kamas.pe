// // import PropTypes from 'prop-types';
// // import { useState, useEffect } from "react";

// // import './Producto.css';
// // import './CSS/Favorite.css';

// // import LazyImage from '../LazyImage';

// // export function Producto({ producto, truncate, onToggleFavorite, isFavorite, skusOfertas = [], isOfferActive }){
// //     const [secondImageError, setSecondImageError] = useState(false);
// //     const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);
// //     const estaEnOfertas = isOfferActive && skusOfertas.includes(producto.sku);
// //     const precioFinal = estaEnOfertas ? Math.round(producto.precioVenta * 0.95) : producto.precioVenta;

// //     const descuentoOriginal = Math.round(
// //         ((producto.precioNormal - producto.precioVenta) * 100 / producto.precioNormal
// //     ));

// //     const descuentoTotal = estaEnOfertas ? Math.round(((producto.precioNormal - precioFinal) * 100) / producto.precioNormal) : descuentoOriginal;

// //     useEffect(() => {
// //         const handleResize = () => setIsSmallScreen(window.innerWidth < 600);
// //         window.addEventListener('resize', handleResize);
// //         return () => window.removeEventListener('resize', handleResize);
// //     }, []);

// //     const imageSize = isSmallScreen ? 140 : 200;

// //     const tipoEnvioClase = producto["tipo-de-envio"] === "Gratis" ? "envio-gratis" : producto["tipo-de-envio"] === "Envío preferente" ? "envio-preferente" : producto["tipo-de-envio"] === "Envío aplicado" ? "envio-aplicado" : "";

// //     return(
// //         <li className='product-card-li'>
// //             <div className={`product-card ${producto.stock === 0 ? "agotado" : ""}`}>
// //                 <div className="product-card-images">
// //                     {descuentoTotal > 0 && (
// //                         <span className="product-card-discount">-{descuentoTotal}%</span>
// //                     )}

// //                     <a href={producto.ruta} title={producto.nombre}>
// //                         <LazyImage width={imageSize} height={imageSize} src={`${producto.fotos}1.jpg`} alt={producto.nombre} className="product-image"/>

// //                         <img width={imageSize} height={imageSize} src={`${producto.fotos}2.jpg`} alt={producto.nombre} className="product-image"
// //                             onError={(e) => {
// //                                 if (!secondImageError) {
// //                                     e.target.src = `${producto.fotos}1.jpg`;
// //                                     setSecondImageError(true);
// //                                 }
// //                             }}
// //                             loading="lazy"
// //                         />
// //                     </a>

// //                     <button type="button" className={`product-card-favorite ${isFavorite ? "active" : ""}`}
// //                         onClick={() => {
// //                             if (typeof onToggleFavorite === 'function') {
// //                                 onToggleFavorite(producto);
// //                             } else {
// //                                 console.error("onToggleFavorite no es una función válida");
// //                             }
// //                         }}
// //                         title="Agregar a favoritos"
// //                     >
// //                         <span className="material-icons">favorite</span>
// //                     </button>
// //                 </div>

// //                 <a href={producto.ruta} title={producto.nombre} className="product-card-content">
// //                     {producto.stock === 0 ? (
// //                         <div className="product-card-agotado product-card-target">
// //                             <span>Sin stock 😥</span>
// //                         </div>
// //                     ) : (
// //                         <>
// //                             {isOfferActive && (producto.oferta === "si" || estaEnOfertas) && (
// //                                 <>
// //                                     <div className="product-card-ofert">
// //                                         <span>Oferta ⏰</span>
// //                                     </div>

// //                                     <div className='d-flex-center-left margin-right product-card-separar'>
// //                                         <span className="material-icons">sell</span>
// //                                         <p>Separa con <b>S/100</b></p>
// //                                     </div>
// //                                 </>
// //                             )}

// //                             {producto.novedades !== "si" && producto["solo-por-horas"] !== "si" && producto.oferta !== "si" && !estaEnOfertas && (
// //                                 <div className={`product-card-tipo-de-envio ${tipoEnvioClase}`}>
// //                                     <span>
// //                                         {
// //                                             producto["tipo-de-envio"] === "Gratis" ? "Envío gratis" : producto["tipo-de-envio"] || "No especificado"
// //                                         }
// //                                     </span>
// //                                 </div>
// //                             )}
// //                         </>
// //                     )}

// //                     <div className='d-flex-column'>
// //                         <span className="product-card-brand">KAMAS</span>
// //                         <p className="product-card-name">{truncate(producto.nombre, 56)}</p>
// //                     </div>

// //                     <div className="product-card-prices">
// //                         <div className="d-flex-column">
// //                             <span className="product-card-regular-price">S/.{producto.precioRegular}</span>
// //                             <span className="product-card-normal-price">S/.{producto.precioNormal}</span>
// //                         </div>

// //                         <div className='d-flex-column'>
// //                             {isOfferActive && estaEnOfertas ? (
// //                                 <div className='d-flex-column'>
// //                                     <span className="product-card-sale-price product-card-sale-price-offer">S/.{producto.precioVenta}</span>
// //                                     <span className="product-card-sale-price-final">S/.{precioFinal}</span>
// //                                 </div>
// //                             ) : (
// //                                 <span className="product-card-sale-price">S/.{precioFinal}</span>
// //                             )}
// //                         </div>
// //                     </div>
// //                 </a>
// //             </div>
// //         </li>
// //     );
// // }

// // Producto.propTypes = {
// //     producto: PropTypes.shape({
// //         sku: PropTypes.string.isRequired,
// //         nombre: PropTypes.string.isRequired,
// //         ruta: PropTypes.string.isRequired,
// //         fotos: PropTypes.string.isRequired,
// //         precioRegular: PropTypes.number.isRequired,
// //         precioNormal: PropTypes.number.isRequired,
// //         precioVenta: PropTypes.number.isRequired,
// //         stock: PropTypes.number.isRequired,
// //         "tipo-de-envio": PropTypes.string,
// //         novedades: PropTypes.string,
// //         oferta: PropTypes.string,
// //         "solo-por-horas": PropTypes.string,
// //     }).isRequired,
// //     truncate: PropTypes.func.isRequired,
// //     onToggleFavorite: PropTypes.func.isRequired,
// //     isFavorite: PropTypes.bool.isRequired,
// //     skusOfertas: PropTypes.arrayOf(PropTypes.string),
// //     isOfferActive: PropTypes.bool.isRequired,
// // };

// // Producto.jsx - Versión optimizada
// import PropTypes from 'prop-types';
// import { useState, useEffect, useMemo, useCallback } from "react";
// import './Producto.css';
// import './CSS/Favorite.css';
// import LazyImage from '../LazyImage';

// const getOptimizedImageUrl = (url, width) => {
//     if (!url) return '';
//     return `${url}?w=${width}`;
// };

// export function Producto({ producto, truncate, onToggleFavorite, isFavorite, skusOfertas = [], isOfferActive }) {
//     const [secondImageError, setSecondImageError] = useState(false);
//     const [isSmallScreen, setIsSmallScreen] = useState(false);
    
//     // Memoizar cálculos costosos
//     const { estaEnOfertas, precioFinal, descuentoTotal, imageSize, tipoEnvioClase } = useMemo(() => {
//         const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1024;
//         const smallScreen = screenWidth < 600;
        
//         const enOfertas = isOfferActive && skusOfertas.includes(producto.sku);
//         const finalPrice = enOfertas ? Math.round(producto.precioVenta * 0.95) : producto.precioVenta;
        
//         const descuentoOrig = Math.round(
//             ((producto.precioNormal - producto.precioVenta) * 100 / producto.precioNormal)
//         );
        
//         const totalDiscount = enOfertas 
//             ? Math.round(((producto.precioNormal - finalPrice) * 100) / producto.precioNormal) 
//             : descuentoOrig;
        
//         const envioClase = producto["tipo-de-envio"] === "Gratis" ? "envio-gratis" 
//             : producto["tipo-de-envio"] === "Envío preferente" ? "envio-preferente" 
//             : producto["tipo-de-envio"] === "Envío aplicado" ? "envio-aplicado" 
//             : "";
        
//         return {
//             estaEnOfertas: enOfertas,
//             precioFinal: finalPrice,
//             descuentoTotal: totalDiscount,
//             imageSize: smallScreen ? 140 : 200,
//             tipoEnvioClase: envioClase
//         };
//     }, [producto, isOfferActive, skusOfertas]);

//     // Resize listener optimizado
//     useEffect(() => {
//         let timeoutId;
//         const handleResize = () => {
//             clearTimeout(timeoutId);
//             timeoutId = setTimeout(() => {
//                 setIsSmallScreen(window.innerWidth < 600);
//             }, 100); // Debounce de 100ms
//         };
        
//         // Inicializar valor
//         setIsSmallScreen(window.innerWidth < 600);
        
//         window.addEventListener('resize', handleResize);
//         return () => {
//             window.removeEventListener('resize', handleResize);
//             clearTimeout(timeoutId);
//         };
//     }, []);

//     // Handler optimizado
//     const handleFavoriteClick = useCallback(() => {
//         if (typeof onToggleFavorite === 'function') {
//             onToggleFavorite(producto);
//         } else {
//             console.error("onToggleFavorite no es una función válida");
//         }
//     }, [onToggleFavorite, producto]);

//     // Generar URLs de imágenes optimizadas
//     const imageBase = useMemo(() => {
//         const base = producto.fotos.replace(/\/[^\/]+$/, '/');
//         const fileName = producto.fotos.split('/').pop();
//         const nameWithoutExt = fileName.replace(/\.[^/.]+$/, '');
//         return { base, nameWithoutExt };
//     }, [producto.fotos]);

//     return(
//         <li className='product-card-li'>
//             <div className={`product-card ${producto.stock === 0 ? "agotado" : ""}`}>
//                 <div className="product-card-images">
//                     {descuentoTotal > 0 && (
//                         <span className="product-card-discount">-{descuentoTotal}%</span>
//                     )}

//                     <a href={producto.ruta} title={producto.nombre}>
//                         {/* Imagen principal con WebP */}
//                         <picture>
//                             {/* <source srcSet={`${imageBase.base}${imageBase.nameWithoutExt}.webp`} type="image/webp"/> */}

//                             <LazyImage width={imageSize} height={imageSize} src={`${producto.fotos}1.jpg`} alt={producto.nombre} className="product-image"/>
//                         </picture>

//                         {/* Imagen secundaria - solo cargar si es necesario */}
//                         {!secondImageError && (
//                             <picture>
//                                 <source 
//                                     srcSet={`${imageBase.base}${imageBase.nameWithoutExt}-hover.webp`}
//                                     type="image/webp"
//                                 />
//                                 <img 
//                                     width={imageSize} 
//                                     height={imageSize} 
//                                     src={`${producto.fotos}2.jpg`} 
//                                     alt={producto.nombre}
//                                     className="product-image product-image-hover"
//                                     loading="lazy"
//                                     decoding="async"
//                                     onError={(e) => {
//                                         if (!secondImageError) {
//                                             setSecondImageError(true);
//                                             // No intentar recargar, simplemente ocultar
//                                             e.target.style.display = 'none';
//                                         }
//                                     }}
//                                     style={{ display: 'none' }} // Oculto por defecto
//                                 />
//                             </picture>
//                         )}
//                     </a>

//                     <button 
//                         type="button" 
//                         className={`product-card-favorite ${isFavorite ? "active" : ""}`}
//                         onClick={handleFavoriteClick}
//                         title="Agregar a favoritos"
//                         aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
//                     >
//                         <span className="material-icons" aria-hidden="true">favorite</span>
//                     </button>
//                 </div>

//                 <a href={producto.ruta} title={producto.nombre} className="product-card-content">
//                     {producto.stock === 0 ? (
//                         <div className="product-card-agotado product-card-target">
//                             <span>Sin stock 😥</span>
//                         </div>
//                     ) : (
//                         <>
//                             {isOfferActive && (producto.oferta === "si" || estaEnOfertas) && (
//                                 <>
//                                     <div className="product-card-ofert">
//                                         <span>Oferta ⏰</span>
//                                     </div>

//                                     <div className='d-flex-center-left margin-right product-card-separar'>
//                                         <span className="material-icons">sell</span>
//                                         <p>Separa con <b>S/100</b></p>
//                                     </div>
//                                 </>
//                             )}

//                             {producto.novedades !== "si" && producto["solo-por-horas"] !== "si" && producto.oferta !== "si" && !estaEnOfertas && (
//                                 <div className={`product-card-tipo-de-envio ${tipoEnvioClase}`}>
//                                     <span>
//                                         {producto["tipo-de-envio"] === "Gratis" ? "Envío gratis" : producto["tipo-de-envio"] || "No especificado"}
//                                     </span>
//                                 </div>
//                             )}
//                         </>
//                     )}

//                     <div className='d-flex-column'>
//                         <span className="product-card-brand">KAMAS</span>
//                         <p className="product-card-name">{truncate(producto.nombre, 56)}</p>
//                     </div>

//                     <div className="product-card-prices">
//                         <div className="d-flex-column">
//                             <span className="product-card-regular-price">S/.{producto.precioRegular}</span>
//                             <span className="product-card-normal-price">S/.{producto.precioNormal}</span>
//                         </div>

//                         <div className='d-flex-column'>
//                             {isOfferActive && estaEnOfertas ? (
//                                 <div className='d-flex-column'>
//                                     <span className="product-card-sale-price product-card-sale-price-offer">S/.{producto.precioVenta}</span>
//                                     <span className="product-card-sale-price-final">S/.{precioFinal}</span>
//                                 </div>
//                             ) : (
//                                 <span className="product-card-sale-price">S/.{precioFinal}</span>
//                             )}
//                         </div>
//                     </div>
//                 </a>
//             </div>
//         </li>
//     );
// }

// Producto.propTypes = {
//     producto: PropTypes.shape({
//         sku: PropTypes.string.isRequired,
//         nombre: PropTypes.string.isRequired,
//         ruta: PropTypes.string.isRequired,
//         fotos: PropTypes.string.isRequired,
//         precioRegular: PropTypes.number.isRequired,
//         precioNormal: PropTypes.number.isRequired,
//         precioVenta: PropTypes.number.isRequired,
//         stock: PropTypes.number.isRequired,
//         "tipo-de-envio": PropTypes.string,
//         novedades: PropTypes.string,
//         oferta: PropTypes.string,
//         "solo-por-horas": PropTypes.string,
//     }).isRequired,
//     truncate: PropTypes.func.isRequired,
//     onToggleFavorite: PropTypes.func.isRequired,
//     isFavorite: PropTypes.bool.isRequired,
//     skusOfertas: PropTypes.arrayOf(PropTypes.string),
//     isOfferActive: PropTypes.bool.isRequired,
// };

import PropTypes from 'prop-types';
import { useState, useEffect, useMemo, useCallback } from "react";
import './Producto.css';
import './CSS/Favorite.css';
import LazyImage from '../LazyImage';

export function Producto({ producto, truncate, onToggleFavorite, isFavorite, skusOfertas = [], isOfferActive }) {
    const [secondImageError, setSecondImageError] = useState(false);
    
    // Memoizar cálculos costosos
    const { estaEnOfertas, precioFinal, descuentoTotal, tipoEnvioClase } = useMemo(() => {
        const enOfertas = isOfferActive && skusOfertas.includes(producto.sku);
        const finalPrice = enOfertas ? Math.round(producto.precioVenta * 0.95) : producto.precioVenta;
        
        const descuentoOrig = Math.round(
            ((producto.precioNormal - producto.precioVenta) * 100 / producto.precioNormal)
        );
        
        const totalDiscount = enOfertas 
            ? Math.round(((producto.precioNormal - finalPrice) * 100) / producto.precioNormal) 
            : descuentoOrig;
        
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

    // Estado para tamaño de pantalla
    const [imageSize, setImageSize] = useState(200);

    // Resize listener optimizado
    useEffect(() => {
        let timeoutId;
        
        const handleResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setImageSize(window.innerWidth < 600 ? 140 : 200);
            }, 100);
        };
        
        // Inicializar valor
        handleResize();
        
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timeoutId);
        };
    }, []);

    // Handler optimizado
    const handleFavoriteClick = useCallback(() => {
        if (typeof onToggleFavorite === 'function') {
            onToggleFavorite(producto);
        } else {
            console.error("onToggleFavorite no es una función válida");
        }
    }, [onToggleFavorite, producto]);

    // Generar URLs de imágenes optimizadas con srcSet
    const { srcSet, fallbackSrc } = useMemo(() => {
        const baseUrl = producto.fotos;
        const basePath = baseUrl.replace(/\/[^/]+$/, '/');
        const fileName = baseUrl.split('/').pop();
        const nameWithoutExt = fileName.replace(/\.[^/.]+$/, '');
        
        // Si tienes imágenes optimizadas en diferentes tamaños
        const sizes = [140, 200, 400, 800];
        const srcSetString = sizes
            .map(size => `${basePath}optimized/${nameWithoutExt}-${size}.webp ${size}w`)
            .join(', ');
        
        return {
            srcSet: srcSetString,
            fallbackSrc: `${baseUrl}1.jpg`
        };
    }, [producto.fotos]);

    // Manejar error de segunda imagen
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
                        {/* Imagen principal optimizada con srcSet */}
                        <LazyImage 
                            width={imageSize} 
                            height={imageSize} 
                            src={fallbackSrc}
                            srcSet={srcSet}
                            sizes={`(max-width: 600px) ${140}px, ${200}px`}
                            alt={producto.nombre}
                            className="product-image"
                            fetchPriority="low"
                        />

                        {/* Imagen secundaria - solo cargar si es necesario */}
                        {!secondImageError && (
                            <img 
                                width={imageSize} 
                                height={imageSize} 
                                src={`${producto.fotos}2.jpg`} 
                                alt={producto.nombre}
                                className="product-image product-image-hover"
                                loading="lazy"
                                decoding="async"
                                onError={handleSecondImageError}
                                style={{ display: 'none' }}
                            />
                        )}
                    </a>

                    <button 
                        type="button" 
                        className={`product-card-favorite ${isFavorite ? "active" : ""}`}
                        onClick={handleFavoriteClick}
                        title="Agregar a favoritos"
                        aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
                    >
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
    isOfferActive: PropTypes.bool.isRequired,
};
