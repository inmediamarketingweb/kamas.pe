import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

import "./PaginaProducto.css";

import Jerarquia from "./Componentes/Jerarquia/Jerarquia";
import Imagenes from "./Componentes/Imagenes/Imagenes";
import Regalos from "./Componentes/Regalos/Regalos";
import Video from "./Componentes/Video/Video";
import Medidas from "./Componentes/Medidas/Medidas";
import Sellers from "./Componentes/Sellers/Sellers";
import WhatsApp from "./Componentes/WhatsApp/WhatsApp";
import Descripcion from "./Componentes/Descripcion/Descripcion";
import MasProductos from "./Componentes/MasProductos/MasProductos";
import Precios from "./Componentes/Precios/Precios";
import Complementarios from "./Componentes/Complementarios/Complementarios";
import EntregaYDespacho from "./Componentes/EntregaYDespacho/EntregaYDespacho";

function PaginaProducto() {
    const [shippingInfo, setShippingInfo] = useState(null);
    const [selectedShipping, setSelectedShipping] = useState({ tipo: null, precio: null });
    const location = useLocation();
    const [producto, setProducto] = useState(null);
    const [error, setError] = useState(false);
    const [imagenes, setImagenes] = useState([]);
    const [selectedColor, setSelectedColor] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [mostrarComplementarios, setMostrarComplementarios] = useState(false);
    const [esMobile, setEsMobile] = useState(
        typeof window !== "undefined" ? window.innerWidth < 600 : false
    );

    const normalizePath = (path = "") => path.replace(/\/$/, "").toLowerCase();

    useEffect(() => {
        const mq = window.matchMedia("(max-width: 599px)");
        const handler = (e) => setEsMobile(e.matches);
        handler(mq);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    useEffect(() => {
        let cancelado = false;

        const fetchProducto = async () => {
            try {
                const partes = location.pathname.split("/").filter(Boolean);

                if (partes.length < 4 || partes[0] !== "productos") {
                    console.error("❌ URL no válida:", location.pathname);
                    if (!cancelado) setError(true);
                    return;
                }

                const categoria = partes[1];
                const esColchon = categoria.toLowerCase().includes("colchon");
                const skuFinal = partes[partes.length - 1];
                const paramsFiltro = partes.slice(2, partes.length - 1);

                const manifestRes = await fetch(`/assets/json/manifest/${categoria}.json`);
                if (!manifestRes.ok) {
                    console.error("❌ Manifest no encontrado:", categoria);
                    if (!cancelado) setError(true);
                    return;
                }
                const manifestData = await manifestRes.json();
                const rutasJson = manifestData.files || [];

                const rutasCandidatas = rutasJson.filter((r) => {
                    const rNorm = r.toLowerCase();
                    return paramsFiltro.every((p) => {
                        const pNorm = p.toLowerCase();
                        return (
                            rNorm.includes(`/${pNorm}/`) ||
                            rNorm.endsWith(`/${pNorm}.json`)
                        );
                    });
                });

                let productoEncontrado = null;
                const skuFinalLower = skuFinal.toLowerCase();

                for (const ruta of rutasCandidatas) {
                    try {
                        const res = await fetch(ruta);
                        if (!res.ok) continue;

                        const contentType = res.headers.get("content-type") || "";
                        if (!contentType.includes("application/json")) continue;

                        const data = await res.json();
                        const lista = Array.isArray(data.productos)
                            ? data.productos
                            : Array.isArray(data)
                            ? data
                            : data.sku
                            ? [data]
                            : [];

                        if (esColchon) {
                            productoEncontrado = lista.find((p) => {
                                const modelo = (
                                    p["modelo-de-colchón"] ||
                                    p["modelo-de-colchon"] ||
                                    p.modelo ||
                                    ""
                                ).toLowerCase();
                                if (modelo) {
                                    const modeloSlug = modelo
                                        .normalize("NFD")
                                        .replace(/[\u0300-\u036f]/g, "")
                                        .replace(/\s+/g, "-")
                                        .replace(/[^a-z0-9-]/g, "");
                                    if (modeloSlug === skuFinalLower) return true;
                                }
                                if (p.ruta) {
                                    const segs = p.ruta.split("/").filter(Boolean);
                                    const ultimo = segs[segs.length - 1]?.toLowerCase();
                                    if (ultimo === skuFinalLower) return true;
                                }
                                return false;
                            });
                        } else {
                            productoEncontrado = lista.find(
                                (p) => (p.sku || "").toLowerCase() === skuFinalLower
                            );
                        }

                        if (productoEncontrado) break;
                    } catch {
                        continue;
                    }
                }

                if (!productoEncontrado) {
                    console.error("❌ No se encontró producto con:", skuFinal);
                    if (!cancelado) setError(true);
                    return;
                }

                if (!cancelado) {
                    setProducto(productoEncontrado);
                    cargarImagenes(productoEncontrado);
                }
            } catch (err) {
                console.error("❌ Error al buscar producto:", err);
                if (!cancelado) setError(true);
            }
        };

        // ===== Imágenes =====
        const cargarImagenes = async (prod) => {
            let carpetaFotos = prod.fotos || "";
            if (carpetaFotos && !carpetaFotos.endsWith("/")) {
                carpetaFotos += "/";
            }

            const EXTENSIONES = ["webp", "jpg", "png", "jfif"];

            const cargarImg = (path) =>
                new Promise((resolve) => {
                    const img = new Image();
                    img.onload = () => resolve(path);
                    img.onerror = () => resolve(null);
                    img.src = path;
                });

            const cargarConFallback = async (baseSinExt) => {
                for (const ext of EXTENSIONES) {
                    const path = `${baseSinExt}.${ext}`;
                    const ok = await cargarImg(path);
                    if (ok) return path;
                }
                return null;
            };

            const categoriaProd = (prod.categoría || prod.categoria || "").toLowerCase();
            const esColchon = categoriaProd.includes("colchon");

            const promesas = [];
            for (let i = 1; i <= 10; i++) {
                promesas.push(cargarConFallback(`${carpetaFotos}${i}`));
            }
            const resultados = (await Promise.all(promesas)).filter(Boolean);

            if (esColchon) {
                const normalizar = (str) => {
                    if (!str) return "";
                    return String(str)
                        .toLowerCase()
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")
                        .trim();
                };
                const aSlug = (str) => normalizar(str).replace(/\s+/g, "-");

                const detalles = prod["detalles-del-producto"];
                const candidatos = [];
                if (Array.isArray(detalles)) {
                    for (const d of detalles) {
                        if (!d || typeof d !== "object") continue;
                        for (const val of [
                            d["modelo-de-colchón"],
                            d["modelo-de-colchon"],
                            d["modelo"],
                            d["modelo-de-velador"],
                        ]) {
                            if (typeof val === "string" && val.trim()) {
                                candidatos.push(val.trim());
                            }
                        }
                    }
                }

                if (typeof prod.nombre === "string") {
                    const n = normalizar(prod.nombre);
                    const m1 = n.match(/colchon\s+kamas\s+(.+?)(?:\s+\d|\s*\+|\s*$)/);
                    if (m1?.[1]) candidatos.push(m1[1].trim());
                    const m2 = n.match(/kamas\s+([a-z][a-z\s]*?)(?:\s+\d|\s*\+|\s*$)/);
                    if (m2?.[1]) candidatos.push(m2[1].trim());
                    const m3 = n.match(/colchon\s+([a-z][a-z\s]*?)(?:\s+\d|\s*\+|\s*$)/);
                    if (m3?.[1]) candidatos.push(m3[1].trim());
                }

                const stopWords = new Set([
                    "semi", "ortopedico", "ortopedica", "kamas", "colchon",
                    "plaza", "plazas", "y", "media", "de", "del", "con",
                    "americano", "americana", "dormitorio", "cama", "camas",
                ]);
                const modelosCandidatos = new Set();
                for (const c of candidatos) {
                    if (!c) continue;
                    const palabras = c.split(/\s+/).filter(Boolean);
                    modelosCandidatos.add(palabras.join("-"));
                    for (const p of palabras) {
                        if (!stopWords.has(p) && p.length > 2) {
                            modelosCandidatos.add(p);
                            break;
                        }
                    }
                    const filtradas = palabras.filter(
                        (p) => !stopWords.has(p) && p.length > 2
                    );
                    if (filtradas.length >= 2) {
                        modelosCandidatos.add(`${filtradas[0]}-${filtradas[1]}`);
                    }
                }

                let modeloPath = null;
                let modeloSlug = null;
                for (const s of modelosCandidatos) {
                    if (!s) continue;
                    const base = `/assets/imagenes/modelos-de-colchones/${s}`;
                    const path = await cargarConFallback(base);
                    if (path) {
                        modeloPath = path;
                        modeloSlug = s;
                        break;
                    }
                }

                const nivelesValidos = [
                    "muy suave", "suave", "intermedio", "firme", "muy firme",
                ];
                const FIRMEZA_POR_MODELO = {
                    adel: "suave",
                    rucay: "suave",
                    sarki: "medio-suave",
                    safynnte: "medio-suave",
                    "der-prinz": "firme",
                    "thameo-pocket": "intermedio",
                    ramat: "intermedio",
                    nesie: "firme",
                    norole: "muy firme",
                    "thaleo pocket": "muy firme",
                    konig: "muy firme",
                    yurmale: "muy firme",
                };

                let nivelFirmeza = null;
                const buscarFirmeza = (arr) => {
                    if (!Array.isArray(arr)) return;
                    for (const item of arr) {
                        if (!item || typeof item !== "object") continue;
                        const v = item["nivel-de-confort"] || item["firmeza"];
                        if (typeof v === "string") {
                            const n = normalizar(v);
                            if (nivelesValidos.includes(n)) {
                                nivelFirmeza = n.replace(/\s+/g, "-");
                                return;
                            }
                        }
                    }
                };
                buscarFirmeza(prod.descripcion);
                if (!nivelFirmeza) buscarFirmeza(detalles);

                if (!nivelFirmeza) {
                    let modeloDetectado = null;
                    if (Array.isArray(detalles)) {
                        for (const d of detalles) {
                            const m =
                                d["modelo-de-colchón"] ||
                                d["modelo-de-colchon"] ||
                                d["modelo"];
                            if (typeof m === "string" && m.trim()) {
                                modeloDetectado = aSlug(m);
                                break;
                            }
                        }
                    }
                    if (!modeloDetectado && modeloSlug) modeloDetectado = modeloSlug;
                    if (modeloDetectado && FIRMEZA_POR_MODELO[modeloDetectado]) {
                        nivelFirmeza = FIRMEZA_POR_MODELO[modeloDetectado];
                    }
                }

                if (nivelFirmeza) {
                    const base = `/assets/imagenes/niveles-de-firmeza/${nivelFirmeza}`;
                    const fp = await cargarConFallback(base);
                    if (fp) resultados.push(fp);
                }
                if (modeloPath) resultados.push(modeloPath);
            }

            if (!cancelado) setImagenes(resultados);
        };

        fetchProducto();
        return () => {
            cancelado = true;
        };
    }, [location.pathname]);

    useEffect(() => {
        if (producto) document.title = producto.nombre;
    }, [producto]);

    if (error) {
        return (
            <>
                <Helmet>
                    <meta name="robots" content="noindex, follow" />
                </Helmet>
                <div style={{ padding: 40, textAlign: "center" }}>
                    <h1>Producto no encontrado</h1>
                    <p>La ruta no coincide con ningún producto.</p>
                </div>
            </>
        );
    }

    if (!producto) return null;

    const precioFinal = producto.precioVenta;

    const precioRegular = Number(producto.precioRegular) || 0;
    const ahorro = precioRegular > 0 ? precioRegular - precioFinal : 0;
    const porcentajeDescuento =
        precioRegular > 0
            ? Math.round(((precioRegular - precioFinal) / precioRegular) * 100)
            : 0;

    const handleRemove = () => quantity > 1 && setQuantity(quantity - 1);
    const handleAdd = () => quantity < 10 && setQuantity(quantity + 1);

    const cleanPrice = (price) => {
        if (typeof price === "number" && price > 0) return price;
        if (!price) return null;
        const parsed = parseFloat(
            String(price).replace("S/.", "").replace(/,/g, "").trim()
        );
        return parsed > 0 ? parsed : null;
    };

    const getValidUntilDate = () => {
        const d = new Date();
        d.setFullYear(d.getFullYear() + 1);
        return d.toISOString().split("T")[0];
    };

    const precioSchema = cleanPrice(precioFinal);
    const shouldRenderSchema =
        producto && precioSchema && typeof precioSchema === "number";

    const canonicalUrl = `https://kamas.pe${normalizePath(location.pathname)}`;

    const productSchema = {
        "@context": "https://schema.org/",
        "@type": "Product",
        name: producto.nombre,
        image: [`https://kamas.pe${producto.fotos}1.jpg`],
        description: producto["resumen-del-producto"]
            ? producto["resumen-del-producto"]
                  .map((d) => Object.values(d)[0])
                  .join(" – ")
            : producto.nombre,
        sku: producto.sku,
        brand: { "@type": "Brand", name: "Kamas" },
        offers: {
            "@type": "Offer",
            url: canonicalUrl,
            priceCurrency: "PEN",
            price: precioSchema.toFixed(2),
            priceValidUntil: getValidUntilDate(),
            itemCondition: "https://schema.org/NewCondition",
            availability:
                producto.stock > 0
                    ? "https://schema.org/InStock"
                    : "https://schema.org/OutOfStock",
        },
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.8",
            reviewCount: "127",
        },
    };

    const categoriaActual = producto["categoría"] || producto.categoria || "";

    return (
        <>
            <Helmet>
                <title>{producto.nombre}</title>
                <meta name="description" content={producto.nombre} />
                <link
                    rel="preload"
                    as="image"
                    href={`https://kamas.pe${producto.fotos}1.jpg`}
                />
                <meta property="og:image" content={`https://kamas.pe${producto.fotos}1.jpg`} />
                <meta property="og:title" content={producto.nombre} />
                <meta property="og:site_name" content={producto.nombre} />
                <meta property="og:description" content={producto.nombre} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={canonicalUrl} />
                <link rel="canonical" href={canonicalUrl} />
                {shouldRenderSchema && (
                    <script type="application/ld+json">
                        {JSON.stringify(productSchema)}
                    </script>
                )}
            </Helmet>

            <main className="pagina-producto-main d-flex-column gap-10">
                <div className="block-container product-page-block-container">
                    <section className="block-content product-page-block-content">
                        <Jerarquia producto={producto} />

                        <div className="product-page-container">
                            <div className="product-page-target product-page-target-1">
                                <div className="d-flex-column gap-20">
                                    <Imagenes
                                        imagenes={imagenes}
                                        producto={producto}
                                        onSelectColor={setSelectedColor}
                                        selectedShipping={selectedShipping}
                                        shippingInfo={shippingInfo}
                                        quantity={quantity}
                                        precioFinal={precioFinal}
                                    />
                                    <Descripcion producto={producto} />
                                </div>
                            </div>

                            <div className="product-page-target product-page-target-2">
                                <div className="product-page-sub-target product-page-sub-target-1 d-flex-column gap-10">
                                    <div className="d-flex-column gap-20 border-1-component padding-20 border-r-4">
                                        <div className="product-page-top-info">
                                            <p className="product-page-category color-color-1">
                                                {producto.categoría}
                                            </p>
                                            <h1 className="product-page-name">{producto.nombre}</h1>

                                            <div className="stars">
                                                <div className="d-flex-center-center">
                                                    <span className="material-symbols-outlined">star</span>
                                                    <span className="material-symbols-outlined">star</span>
                                                    <span className="material-symbols-outlined">star</span>
                                                    <span className="material-symbols-outlined">star</span>
                                                    <span className="material-symbols-outlined">star_half</span>
                                                </div>
                                                4.5 (3)
                                            </div>
                                        </div>

                                        <Precios
                                            producto={producto}
                                            precioFinal={precioFinal}
                                            porcentajeDescuento={porcentajeDescuento}
                                            ahorro={ahorro}
                                        />
                                        <Regalos producto={producto} />
                                        <Video producto={producto} />
                                    </div>

                                    <Medidas producto={producto} />
                                    <Sellers producto={producto} />
                                    <EntregaYDespacho />
                                </div>

                                <div className="product-page-sub-target product-page-sub-target-2 d-flex-column gap-10">
                                    {esMobile && (
                                        <button
                                            type="button"
                                            className={`prd-pg-tg-2-visible ${
                                                mostrarComplementarios ? "active" : ""
                                            }`}
                                            onClick={() =>
                                                setMostrarComplementarios((prev) => !prev)
                                            }
                                            aria-expanded={mostrarComplementarios}
                                            aria-controls="complementarios-panel"
                                        >
                                            <span className="material-symbols-outlined">
                                                keyboard_arrow_up
                                            </span>
                                        </button>
                                    )}

                                    {(!esMobile || mostrarComplementarios) && (
                                        <div id="complementarios-panel">
                                            <Complementarios producto={producto} />
                                        </div>
                                    )}

                                    <div className="prd-pg-buy border-1-component border-r-4 d-flex-column gap-10 padding-20">
                                        <p className="text font-bold font-13 uppercase">Cantidad</p>

                                        <div className="quantity bg-white">
                                            <button
                                                type="button"
                                                onClick={handleRemove}
                                                disabled={quantity <= 1}
                                            >
                                                <span className="material-symbols-outlined">remove</span>
                                            </button>
                                            <div className="quantity-input">{quantity}</div>
                                            <button
                                                type="button"
                                                onClick={handleAdd}
                                                disabled={quantity >= 10}
                                            >
                                                <span className="material-symbols-outlined">add</span>
                                            </button>
                                        </div>

                                        <WhatsApp
                                            producto={producto}
                                            selectedShipping={selectedShipping}
                                            shippingInfo={shippingInfo}
                                            selectedColor={selectedColor}
                                            quantity={quantity}
                                            precioFinal={precioFinal}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <MasProductos categoriaActual={categoriaActual} />
            </main>
        </>
    );
}

export default PaginaProducto;
