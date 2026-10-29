// import PropTypes from "prop-types";
// import { useState, useEffect, useMemo, useCallback } from "react";

// import LazyImage from "../LazyImage";

// import "./Producto.css";
// import "./CSS/Favorite.css";

// function slugify(str = "") {
//     return String(str)
//         .toLowerCase()
//         .normalize("NFD")
//         .replace(/[\u0300-\u036f]/g, "")
//         .trim()
//         .replace(/\s+/g, "-")
//         .replace(/[^a-z0-9-]/g, "")
//         .replace(/-+/g, "-")
//         .replace(/^-|-$/g, "");
// }

// function construirRutaProducto(producto) {
//     const categoriaOriginal = producto.categoría || producto.categoria || "";
//     const categoriaSlug = slugify(categoriaOriginal);
//     const sku = producto.sku || "";

//     if (categoriaSlug.includes("colchon")) {
//         if (producto.ruta && typeof producto.ruta === "string") {
//             return producto.ruta;
//         }

//         const tamaño = producto.tamaño || producto["tamaño"] || producto.medida || "";
//         const formato = producto.formato || producto["línea"] || producto.linea || "";
//         const modelo =
//             producto["modelo-de-colchón"] ||
//             producto["modelo-de-colchon"] ||
//             producto.modelo ||
//             "";
//         const partes = [
//             "productos",
//             categoriaSlug,
//             tamaño ? slugify(tamaño) : "",
//             formato ? slugify(formato) : "",
//             modelo ? slugify(modelo) : "",
//         ].filter(Boolean);

//         return "/" + partes.join("/") + "/";
//     }

//     if (categoriaSlug.includes("dormitorio")) {
//         const tamaño = producto.tamaño || producto["tamaño"] || producto.medida || "";
//         const modelo =
//             producto["modelo-de-colchón"] ||
//             producto["modelo-de-colchon"] ||
//             producto.modelo ||
//             "";
//         const linea = producto["línea"] || producto.linea || "";
//         const partes = [
//             "productos",
//             categoriaSlug,
//             tamaño ? slugify(tamaño) : "",
//             modelo ? slugify(modelo) : "",
//             linea ? slugify(linea) : "",
//             sku ? String(sku).trim() : "",
//         ].filter(Boolean);

//         return "/" + partes.join("/") + "/";
//     }

//     if (categoriaSlug.includes("cabecera")) {
//         const desc0 = Array.isArray(producto.descripcion) ? producto.descripcion[0] : null;
//         const tamaño =
//             producto["tamaño"] ||
//             producto["tamano"] ||
//             producto.tamaño ||
//             desc0?.["tamaño"] ||
//             desc0?.["tamano"] ||
//             "";
//         const linea =
//             producto["línea"] ||
//             producto["linea"] ||
//             producto.linea ||
//             desc0?.["línea"] ||
//             desc0?.["linea"] ||
//             "";
//         const tipoCabecera =
//             producto["tipo-de-cabecera"] ||
//             producto.tipoDeCabecera ||
//             desc0?.["tipo-de-cabecera"] ||
//             "";

//         const partes = [
//             "productos",
//             categoriaSlug,
//             tamaño ? slugify(tamaño) : "",
//             linea ? slugify(linea) : "",
//             tipoCabecera ? slugify(tipoCabecera) : "",
//             sku ? String(sku).trim() : "",
//         ].filter(Boolean);

//         return "/" + partes.join("/") + "/";
//     }

//     const tamaño = producto.tamaño || producto["tamaño"] || producto.medida || "";
//     const linea = producto["línea"] || producto.linea || producto.formato || "";

//     const partes = [
//         "productos",
//         categoriaSlug,
//         tamaño ? slugify(tamaño) : "",
//         linea ? slugify(linea) : "",
//         sku ? String(sku).trim() : "",
//     ].filter(Boolean);

//     return "/" + partes.join("/") + "/";
// }

// // 👇 Devuelve true si estamos antes de las 11:00 am (hora local del navegador)
// function esAntesDeLas11() {
//     const ahora = new Date();
//     const hora = ahora.getHours();
//     return hora < 11;
// }

// // 👇 Normaliza un SKU para comparaciones robustas
// function normalizarSku(sku) {
//     return String(sku || "").trim().toUpperCase();
// }

// // 👇 Extensiones soportadas, en orden de preferencia
// const EXTENSIONES_IMAGEN = ["webp", "jpg", "png", "jfif"];

// export function Producto({
//     producto,
//     truncate,
//     onToggleFavorite,
//     isFavorite,
//     skusOfertas = [],
//     isOfferActive = true,
//     skusParaHoy = [],
// }) {
//     useEffect(() => {
//         if (
//             process.env.NODE_ENV === "development" &&
//             isOfferActive === undefined
//         ) {
//             console.warn(
//                 "Producto: isOfferActive fue undefined, usando valor por defecto true"
//             );
//         }
//     }, [isOfferActive]);

//     const [secondImageError, setSecondImageError] = useState(false);

//     // 👇 Estado que se recalcula cada minuto para reflejar el cambio de hora
//     const [esAntes11, setEsAntes11] = useState(() => esAntesDeLas11());

//     useEffect(() => {
//         const intervalId = setInterval(() => {
//             setEsAntes11(esAntesDeLas11());
//         }, 60 * 1000);

//         const handleVisibility = () => {
//             if (!document.hidden) setEsAntes11(esAntesDeLas11());
//         };
//         document.addEventListener("visibilitychange", handleVisibility);

//         return () => {
//             clearInterval(intervalId);
//             document.removeEventListener("visibilitychange", handleVisibility);
//         };
//     }, []);

//     const { estaEnOfertas, precioFinal, descuentoTotal, tipoEnvioClase } =
//         useMemo(() => {
//             const skuNorm = normalizarSku(producto.sku);

//             const enOfertas =
//                 isOfferActive &&
//                 skusOfertas.some((s) => normalizarSku(s) === skuNorm);

//             const finalPrice = enOfertas
//                 ? Math.round(producto.precioVenta * 0.95)
//                 : producto.precioVenta;

//             const descuentoOrig = Math.round(
//                 ((producto.precioRegular - producto.precioVenta) * 100) /
//                     producto.precioRegular
//             );

//             const totalDiscount = enOfertas
//                 ? Math.round(
//                       ((producto.precioRegular - finalPrice) * 100) /
//                           producto.precioRegular
//                   )
//                 : descuentoOrig;

//             const envioClase =
//                 producto["tipo-de-envio"] === "Gratis"
//                     ? "envio-gratis"
//                     : producto["tipo-de-envio"] === "Envío preferente"
//                     ? "envio-preferente"
//                     : producto["tipo-de-envio"] === "Envío aplicado"
//                     ? "envio-aplicado"
//                     : "";

//             return {
//                 estaEnOfertas: enOfertas,
//                 precioFinal: finalPrice,
//                 descuentoTotal: totalDiscount,
//                 tipoEnvioClase: envioClase,
//             };
//         }, [producto, isOfferActive, skusOfertas]);

//     const esParaHoy = useMemo(() => {
//         const skuNorm = normalizarSku(producto.sku);
//         return skusParaHoy.some((s) => normalizarSku(s) === skuNorm);
//     }, [producto.sku, skusParaHoy]);

//     const [imageSize, setImageSize] = useState(200);

//     useEffect(() => {
//         let timeoutId;

//         const handleResize = () => {
//             clearTimeout(timeoutId);
//             timeoutId = setTimeout(() => {
//                 setImageSize(window.innerWidth < 600 ? 140 : 200);
//             }, 100);
//         };

//         handleResize();

//         window.addEventListener("resize", handleResize);
//         return () => {
//             window.removeEventListener("resize", handleResize);
//             clearTimeout(timeoutId);
//         };
//     }, []);

//     const handleFavoriteClick = useCallback(() => {
//         if (typeof onToggleFavorite === "function") {
//             onToggleFavorite(producto);
//         } else {
//             console.error("onToggleFavorite no es una función válida");
//         }
//     }, [onToggleFavorite, producto]);

//     // 👇 Construimos las candidatas de imagen con todas las extensiones
//     const { mainImageSrc, fallbackSrcs } = useMemo(() => {
//         let basePath = producto.fotos;

//         if (!basePath.endsWith("/")) {
//             basePath += "/";
//         }

//         // Genera: /ruta/1.webp, /ruta/1.jpg, /ruta/1.png, /ruta/1.jfif
//         const candidates = EXTENSIONES_IMAGEN.map(
//             (ext) => `${basePath}1.${ext}`
//         );

//         return {
//             mainImageSrc: candidates[0], // intenta primero .webp
//             fallbackSrcs: candidates.slice(1), // el resto como fallback
//         };
//     }, [producto.fotos]);

//     const rutaProducto = useMemo(
//         () => construirRutaProducto(producto),
//         [producto]
//     );

//     return (
//         <li className="product-card-li">
//             <div
//                 className={`product-card ${
//                     producto.stock === 0 ? "agotado" : ""
//                 }`}
//             >
//                 <div className="product-card-images">
//                     {descuentoTotal > 0 && (
//                         <span className="product-card-discount">
//                             -{descuentoTotal}%
//                         </span>
//                     )}

//                     <a href={rutaProducto} title={producto.nombre}>
//                         <LazyImage
//                             width={imageSize}
//                             height={imageSize}
//                             src={mainImageSrc}
//                             srcs={fallbackSrcs}
//                             alt={producto.nombre}
//                             className="product-image"
//                             fetchPriority="low"
//                         />
//                     </a>

//                     <button
//                         type="button"
//                         className={`product-card-favorite ${
//                             isFavorite ? "active" : ""
//                         }`}
//                         onClick={handleFavoriteClick}
//                         title="Agregar a favoritos"
//                         aria-label={
//                             isFavorite
//                                 ? "Quitar de favoritos"
//                                 : "Agregar a favoritos"
//                         }
//                     >
//                         <span
//                             className="material-symbols-outlined"
//                             aria-hidden="true"
//                         >
//                             favorite
//                         </span>
//                     </button>

//                     {isOfferActive && estaEnOfertas && (
//                         <div className="prd-card-offert">
//                             <div className="product-card-ofert">
//                                 <span>Oferta ⏰</span>
//                             </div>

//                             <div className="product-card-separar">
//                                 <span className="material-symbols-outlined">
//                                     sell
//                                 </span>
//                                 <p>
//                                     Separa con <b>S/100</b>
//                                 </p>
//                             </div>
//                         </div>
//                     )}
//                 </div>

//                 <a
//                     href={rutaProducto}
//                     title={producto.nombre}
//                     className="product-card-content"
//                 >
//                     {producto.stock === 0 && (
//                         <div className="product-card-agotado product-card-target">
//                             <span>Sin stock 😥</span>
//                         </div>
//                     )}

//                     <div className="d-flex-column">
//                         <span className="product-card-brand">KAMAS</span>

//                         <div className="prd-stars-small">
//                             <span className="material-symbols-outlined">star</span>
//                             <span className="material-symbols-outlined">star</span>
//                             <span className="material-symbols-outlined">star</span>
//                             <span className="material-symbols-outlined">star</span>
//                             <span className="material-symbols-outlined">star_half</span>
//                         </div>

//                         <p className="product-card-name">
//                             {truncate(producto.nombre, 100)}
//                         </p>
//                     </div>

//                     <div className="product-card-prices">
//                         <div className="d-flex-column">
//                             <span className="product-card-regular-price">
//                                 S/.{producto.precioRegular}
//                             </span>
//                             <span className="product-card-normal-price">
//                                 S/.{producto.precioNormal}
//                             </span>
//                         </div>

//                         <div className="d-flex-column">
//                             {isOfferActive && estaEnOfertas ? (
//                                 <div className="d-flex-column">
//                                     <span className="product-card-sale-price product-card-sale-price-offer">
//                                         S/.{producto.precioVenta}
//                                     </span>
//                                     <span className="product-card-sale-price-final">
//                                         S/.{precioFinal}
//                                     </span>
//                                 </div>
//                             ) : (
//                                 <span className="product-card-sale-price">
//                                     S/.{precioFinal}
//                                 </span>
//                             )}
//                         </div>
//                     </div>

//                     <div className="w-100 d-flex-center-left gap-5">
//                         {esParaHoy && (
//                             <div className="delivery-today-tomorrow">
//                                 <span className="material-symbols-outlined">
//                                     schedule
//                                 </span>
//                                 <p className="text">
//                                     {esAntes11
//                                         ? "Recíbelo hoy"
//                                         : "Entrega mañana"}
//                                 </p>

//                                 <div className="dtt-message">
//                                     {esAntes11
//                                         ? "Confirma tu pedido antes de las 11:00 am y recibelo hoy mismo"
//                                         : "Confirma tu pedido hoy y recíbelo mañana mismo"}
//                                 </div>
//                             </div>
//                         )}

//                         <div
//                             className={`product-card-tipo-de-envio ${tipoEnvioClase}`}
//                         >
//                             <span>
//                                 {producto["tipo-de-envio"] === "Gratis"
//                                     ? "Envío gratis"
//                                     : producto["tipo-de-envio"] ||
//                                       "No especificado"}
//                             </span>
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
//         ruta: PropTypes.string,
//         fotos: PropTypes.string.isRequired,
//         precioRegular: PropTypes.number.isRequired,
//         precioNormal: PropTypes.number.isRequired,
//         precioVenta: PropTypes.number.isRequired,
//         stock: PropTypes.number.isRequired,
//         categoría: PropTypes.string,
//         categoria: PropTypes.string,
//         tamaño: PropTypes.string,
//         medida: PropTypes.string,
//         línea: PropTypes.string,
//         formato: PropTypes.string,
//         "modelo-de-colchón": PropTypes.string,
//         "modelo-de-colchon": PropTypes.string,
//         modelo: PropTypes.string,
//         "tipo-de-cabecera": PropTypes.string,
//         tipoDeCabecera: PropTypes.string,
//         "tipo-de-envio": PropTypes.string,
//         novedades: PropTypes.string,
//         oferta: PropTypes.string,
//         "solo-por-horas": PropTypes.string,
//     }).isRequired,
//     truncate: PropTypes.func.isRequired,
//     onToggleFavorite: PropTypes.func.isRequired,
//     isFavorite: PropTypes.bool.isRequired,
//     skusOfertas: PropTypes.arrayOf(PropTypes.string),
//     isOfferActive: PropTypes.bool,
//     skusParaHoy: PropTypes.arrayOf(PropTypes.string),
// };

import PropTypes from "prop-types";
import { useState, useEffect, useMemo, useCallback } from "react";

import LazyImage from "../LazyImage";

import "./Producto.css";
import "./CSS/Favorite.css";

function slugify(str = "") {
    return String(str)
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
}

function construirRutaProducto(producto) {
    const categoriaOriginal = producto.categoría || producto.categoria || "";
    const categoriaSlug = slugify(categoriaOriginal);
    const sku = producto.sku || "";

    if (categoriaSlug.includes("colchon")) {
        if (producto.ruta && typeof producto.ruta === "string") {
            return producto.ruta;
        }

        const tamaño = producto.tamaño || producto["tamaño"] || producto.medida || "";
        const formato = producto.formato || producto["línea"] || producto.linea || "";
        const modelo =
            producto["modelo-de-colchón"] ||
            producto["modelo-de-colchon"] ||
            producto.modelo ||
            "";
        const partes = [
            "productos",
            categoriaSlug,
            tamaño ? slugify(tamaño) : "",
            formato ? slugify(formato) : "",
            modelo ? slugify(modelo) : "",
        ].filter(Boolean);

        return "/" + partes.join("/") + "/";
    }

    if (categoriaSlug.includes("dormitorio")) {
        const tamaño = producto.tamaño || producto["tamaño"] || producto.medida || "";
        const modelo =
            producto["modelo-de-colchón"] ||
            producto["modelo-de-colchon"] ||
            producto.modelo ||
            "";
        const linea = producto["línea"] || producto.linea || "";
        const partes = [
            "productos",
            categoriaSlug,
            tamaño ? slugify(tamaño) : "",
            modelo ? slugify(modelo) : "",
            linea ? slugify(linea) : "",
            sku ? String(sku).trim() : "",
        ].filter(Boolean);

        return "/" + partes.join("/") + "/";
    }

    if (categoriaSlug.includes("cabecera")) {
        const desc0 = Array.isArray(producto.descripcion) ? producto.descripcion[0] : null;
        const tamaño =
            producto["tamaño"] ||
            producto["tamano"] ||
            producto.tamaño ||
            desc0?.["tamaño"] ||
            desc0?.["tamano"] ||
            "";
        const linea =
            producto["línea"] ||
            producto["linea"] ||
            producto.linea ||
            desc0?.["línea"] ||
            desc0?.["linea"] ||
            "";
        const tipoCabecera =
            producto["tipo-de-cabecera"] ||
            producto.tipoDeCabecera ||
            desc0?.["tipo-de-cabecera"] ||
            "";

        const partes = [
            "productos",
            categoriaSlug,
            tamaño ? slugify(tamaño) : "",
            linea ? slugify(linea) : "",
            tipoCabecera ? slugify(tipoCabecera) : "",
            sku ? String(sku).trim() : "",
        ].filter(Boolean);

        return "/" + partes.join("/") + "/";
    }

    // ✅ NUEVA RAMA: COMPLEMENTOS
    // Estructura: /productos/complementos/{subcategoría}/{línea}/{sku}/
    if (categoriaSlug.includes("complemento")) {
        const subcategoria =
            producto.subcategoría ||
            producto.subcategoria ||
            producto["subcategoría"] ||
            producto["subcategoria"] ||
            "";
        const linea =
            producto["línea"] ||
            producto.linea ||
            producto.material ||
            "";
        const partes = [
            "productos",
            categoriaSlug,
            subcategoria ? slugify(subcategoria) : "",
            linea ? slugify(linea) : "",
            sku ? String(sku).trim() : "",
        ].filter(Boolean);

        return "/" + partes.join("/") + "/";
    }

    // Fallback general
    const tamaño = producto.tamaño || producto["tamaño"] || producto.medida || "";
    const linea = producto["línea"] || producto.linea || producto.formato || "";

    const partes = [
        "productos",
        categoriaSlug,
        tamaño ? slugify(tamaño) : "",
        linea ? slugify(linea) : "",
        sku ? String(sku).trim() : "",
    ].filter(Boolean);

    return "/" + partes.join("/") + "/";
}

// 👇 Devuelve true si estamos antes de las 11:00 am (hora local del navegador)
function esAntesDeLas11() {
    const ahora = new Date();
    const hora = ahora.getHours();
    return hora < 11;
}

// 👇 Normaliza un SKU para comparaciones robustas
function normalizarSku(sku) {
    return String(sku || "").trim().toUpperCase();
}

// 👇 Extensiones soportadas, en orden de preferencia
const EXTENSIONES_IMAGEN = ["webp", "jpg", "png", "jfif"];

export function Producto({
    producto,
    truncate,
    onToggleFavorite,
    isFavorite,
    skusOfertas = [],
    isOfferActive = true,
    skusParaHoy = [],
}) {
    useEffect(() => {
        if (
            process.env.NODE_ENV === "development" &&
            isOfferActive === undefined
        ) {
            console.warn(
                "Producto: isOfferActive fue undefined, usando valor por defecto true"
            );
        }
    }, [isOfferActive]);

    const [secondImageError, setSecondImageError] = useState(false);

    // 👇 Estado que se recalcula cada minuto para reflejar el cambio de hora
    const [esAntes11, setEsAntes11] = useState(() => esAntesDeLas11());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setEsAntes11(esAntesDeLas11());
        }, 60 * 1000);

        const handleVisibility = () => {
            if (!document.hidden) setEsAntes11(esAntesDeLas11());
        };
        document.addEventListener("visibilitychange", handleVisibility);

        return () => {
            clearInterval(intervalId);
            document.removeEventListener("visibilitychange", handleVisibility);
        };
    }, []);

    const { estaEnOfertas, precioFinal, descuentoTotal, tipoEnvioClase } =
        useMemo(() => {
            const skuNorm = normalizarSku(producto.sku);

            const enOfertas =
                isOfferActive &&
                skusOfertas.some((s) => normalizarSku(s) === skuNorm);

            const finalPrice = enOfertas
                ? Math.round(producto.precioVenta * 0.95)
                : producto.precioVenta;

            const descuentoOrig = Math.round(
                ((producto.precioRegular - producto.precioVenta) * 100) /
                    producto.precioRegular
            );

            const totalDiscount = enOfertas
                ? Math.round(
                      ((producto.precioRegular - finalPrice) * 100) /
                          producto.precioRegular
                  )
                : descuentoOrig;

            const envioClase =
                producto["tipo-de-envio"] === "Gratis"
                    ? "envio-gratis"
                    : producto["tipo-de-envio"] === "Envío preferente"
                    ? "envio-preferente"
                    : producto["tipo-de-envio"] === "Envío aplicado"
                    ? "envio-aplicado"
                    : "";

            return {
                estaEnOfertas: enOfertas,
                precioFinal: finalPrice,
                descuentoTotal: totalDiscount,
                tipoEnvioClase: envioClase,
            };
        }, [producto, isOfferActive, skusOfertas]);

    const esParaHoy = useMemo(() => {
        const skuNorm = normalizarSku(producto.sku);
        return skusParaHoy.some((s) => normalizarSku(s) === skuNorm);
    }, [producto.sku, skusParaHoy]);

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

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            clearTimeout(timeoutId);
        };
    }, []);

    const handleFavoriteClick = useCallback(() => {
        if (typeof onToggleFavorite === "function") {
            onToggleFavorite(producto);
        } else {
            console.error("onToggleFavorite no es una función válida");
        }
    }, [onToggleFavorite, producto]);

    // 👇 Construimos las candidatas de imagen con todas las extensiones
    const { mainImageSrc, fallbackSrcs } = useMemo(() => {
        let basePath = producto.fotos;

        if (!basePath.endsWith("/")) {
            basePath += "/";
        }

        // Genera: /ruta/1.webp, /ruta/1.jpg, /ruta/1.png, /ruta/1.jfif
        const candidates = EXTENSIONES_IMAGEN.map(
            (ext) => `${basePath}1.${ext}`
        );

        return {
            mainImageSrc: candidates[0], // intenta primero .webp
            fallbackSrcs: candidates.slice(1), // el resto como fallback
        };
    }, [producto.fotos]);

    const rutaProducto = useMemo(
        () => construirRutaProducto(producto),
        [producto]
    );

    return (
        <li className="product-card-li">
            <div
                className={`product-card ${
                    producto.stock === 0 ? "agotado" : ""
                }`}
            >
                <div className="product-card-images">
                    {descuentoTotal > 0 && (
                        <span className="product-card-discount">
                            -{descuentoTotal}%
                        </span>
                    )}

                    <a href={rutaProducto} title={producto.nombre}>
                        <LazyImage
                            width={imageSize}
                            height={imageSize}
                            src={mainImageSrc}
                            srcs={fallbackSrcs}
                            alt={producto.nombre}
                            className="product-image"
                            fetchPriority="low"
                        />
                    </a>

                    <button
                        type="button"
                        className={`product-card-favorite ${
                            isFavorite ? "active" : ""
                        }`}
                        onClick={handleFavoriteClick}
                        title="Agregar a favoritos"
                        aria-label={
                            isFavorite
                                ? "Quitar de favoritos"
                                : "Agregar a favoritos"
                        }
                    >
                        <span
                            className="material-symbols-outlined"
                            aria-hidden="true"
                        >
                            favorite
                        </span>
                    </button>

                    {isOfferActive && estaEnOfertas && (
                        <div className="prd-card-offert">
                            <div className="product-card-ofert">
                                <span>Oferta ⏰</span>
                            </div>

                            <div className="product-card-separar">
                                <span className="material-symbols-outlined">
                                    sell
                                </span>
                                <p>
                                    Separa con <b>S/100</b>
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <a
                    href={rutaProducto}
                    title={producto.nombre}
                    className="product-card-content"
                >
                    {producto.stock === 0 && (
                        <div className="product-card-agotado product-card-target">
                            <span>Sin stock 😥</span>
                        </div>
                    )}

                    <div className="d-flex-column">
                        <span className="product-card-brand">KAMAS</span>

                        <div className="prd-stars-small">
                            <span className="material-symbols-outlined">star</span>
                            <span className="material-symbols-outlined">star</span>
                            <span className="material-symbols-outlined">star</span>
                            <span className="material-symbols-outlined">star</span>
                            <span className="material-symbols-outlined">star_half</span>
                        </div>

                        <p className="product-card-name">
                            {truncate(producto.nombre, 100)}
                        </p>
                    </div>

                    <div className="product-card-prices">
                        <div className="d-flex-column">
                            <span className="product-card-regular-price">
                                S/.{producto.precioRegular}
                            </span>
                            <span className="product-card-normal-price">
                                S/.{producto.precioNormal}
                            </span>
                        </div>

                        <div className="d-flex-column">
                            {isOfferActive && estaEnOfertas ? (
                                <div className="d-flex-column">
                                    <span className="product-card-sale-price product-card-sale-price-offer">
                                        S/.{producto.precioVenta}
                                    </span>
                                    <span className="product-card-sale-price-final">
                                        S/.{precioFinal}
                                    </span>
                                </div>
                            ) : (
                                <span className="product-card-sale-price">
                                    S/.{precioFinal}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="w-100 d-flex-center-left gap-5">
                        {esParaHoy && (
                            <div className="delivery-today-tomorrow">
                                <span className="material-symbols-outlined">
                                    schedule
                                </span>
                                <p className="text">
                                    {esAntes11
                                        ? "Recíbelo hoy"
                                        : "Entrega mañana"}
                                </p>

                                <div className="dtt-message">
                                    {esAntes11
                                        ? "Confirma tu pedido antes de las 11:00 am y recibelo hoy mismo"
                                        : "Confirma tu pedido hoy y recíbelo mañana mismo"}
                                </div>
                            </div>
                        )}

                        <div
                            className={`product-card-tipo-de-envio ${tipoEnvioClase}`}
                        >
                            <span>
                                {producto["tipo-de-envio"] === "Gratis"
                                    ? "Envío gratis"
                                    : producto["tipo-de-envio"] ||
                                      "No especificado"}
                            </span>
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
        ruta: PropTypes.string,
        fotos: PropTypes.string.isRequired,
        precioRegular: PropTypes.number.isRequired,
        precioNormal: PropTypes.number.isRequired,
        precioVenta: PropTypes.number.isRequired,
        stock: PropTypes.number.isRequired,
        categoría: PropTypes.string,
        categoria: PropTypes.string,
        subcategoría: PropTypes.string,
        subcategoria: PropTypes.string,
        tamaño: PropTypes.string,
        medida: PropTypes.string,
        línea: PropTypes.string,
        linea: PropTypes.string,
        formato: PropTypes.string,
        material: PropTypes.string,
        "modelo-de-colchón": PropTypes.string,
        "modelo-de-colchon": PropTypes.string,
        modelo: PropTypes.string,
        "tipo-de-cabecera": PropTypes.string,
        tipoDeCabecera: PropTypes.string,
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
    skusParaHoy: PropTypes.arrayOf(PropTypes.string),
};
