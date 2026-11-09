import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { Helmet } from "react-helmet";
import { useSearchParams, useLocation } from "react-router-dom";

import "./Productos.css";

import { Producto } from "../../Componentes/Plantillas/Producto/Producto";
import Filtros, { slugify, productoCumpleGrupo, formatearRangoPrecio } from "./Componentes/Filtros/Filtros";
import Paginacion from "./Componentes/Paginacion/Paginacion";

const PRODUCTOS_POR_PAGINA = 40;

const normalizar = (str = "") =>
    String(str).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

const shuffleArray = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};

function Productos({
    categoriaForzada = null,
    medida = null,
    formato = null,
    paramsRuta = null,
    titulo = "Productos",
    descripcionSeo = "Descubre todos nuestros productos Kamas.",
}) {
    const [productos, setProductos] = useState([]);
    const [skusOfertas, setSkusOfertas] = useState([]);
    const [skusParaHoy, setSkusParaHoy] = useState([]);
    const [favoritos, setFavoritos] = useState([]);
    const [isOfferActive] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    const [categorias, setCategorias] = useState([]);
    const [paginaActual, setPaginaActual] = useState(1);
    const [isOrderOpen, setIsOrderOpen] = useState(false);
    const orderRef = useRef(null);
    const [filtrosAbiertos, setFiltrosAbiertos] = useState(false);
    const [ordenAleatorio, setOrdenAleatorio] = useState([]);
    const origenKeyRef = useRef(null);
    const abrirFiltros = useCallback(() => setFiltrosAbiertos(true), []);
    const cerrarFiltros = useCallback(() => setFiltrosAbiertos(false), []);

    useEffect(() => {
        let cancelado = false;
        (async () => {
            try {
                const res = await fetch("/assets/json/categorias/categorias-2.json");
                if (!res.ok) return;
                const data = await res.json();
                if (!cancelado) {
                    setCategorias(Array.isArray(data?.categorias) ? data.categorias : []);
                }
            } catch (err) {
                console.error("Error cargando categorías:", err);
            }
        })();
        return () => { cancelado = true; };
    }, []);

    useEffect(() => {
        let cancelado = false;
        (async () => {
            try {
                const res = await fetch("/assets/json/productos/ofertas.json");
                if (!cancelado) {
                    setSkusOfertas(res.ok ? await res.json() : []);
                }
            } catch {
                if (!cancelado) setSkusOfertas([]);
            }
        })();
        return () => { cancelado = true; };
    }, []);

    useEffect(() => {
        let cancelado = false;
        (async () => {
            try {
                const res = await fetch("/assets/json/productos/para-hoy.json");
                if (!cancelado) {
                    setSkusParaHoy(res.ok ? await res.json() : []);
                }
            } catch {
                if (!cancelado) setSkusParaHoy([]);
            }
        })();
        return () => { cancelado = true; };
    }, []);

    useEffect(() => {
        try {
            const favs = JSON.parse(localStorage.getItem("favoritos") || "[]");
            setFavoritos(Array.isArray(favs) ? favs : []);
        } catch {
            setFavoritos([]);
        }
    }, []);

    const { slugCategoria, segmentosExtra } = useMemo(() => {
        const partes = location.pathname.split("/").filter(Boolean);
        const idx = partes.indexOf("productos");
        if (idx === -1) return { slugCategoria: null, segmentosExtra: [] };
        return {
            slugCategoria: categoriaForzada ? normalizar(categoriaForzada) : (partes[idx + 1] || null),
            segmentosExtra: partes.slice(idx + 2),
        };
    }, [location.pathname, categoriaForzada]);

    const categoriaActual = useMemo(() => {
        if (!slugCategoria || categorias.length === 0) return null;
        const target = normalizar(slugCategoria);
        return categorias.find(
            (cat) => normalizar(cat.categoría || cat.categoria) === target
        ) || null;
    }, [categorias, slugCategoria]);

    const origenKey = useMemo(
        () =>
            [
                categoriaForzada || slugCategoria || "",
                medida || "",
                formato || "",
                JSON.stringify(paramsRuta || {}),
                segmentosExtra.join("/"),
            ].join("|"),
        [categoriaForzada, slugCategoria, medida, formato, paramsRuta, segmentosExtra]
    );

    useEffect(() => {
        let cancelado = false;

        const esProducto = (item) =>
            item && typeof item === "object" && typeof item.sku === "string" && item.sku.length > 0;

        const cargarRutas = async (rutas) => {
            const resultados = await Promise.all(
                rutas.map(async (ruta) => {
                    try {
                        const res = await fetch(ruta);
                        if (!res.ok) return [];
                        const contentType = res.headers.get("content-type") || "";
                        if (!contentType.includes("application/json")) return [];

                        let data;
                        try { data = await res.json(); } catch { return []; }

                        if (Array.isArray(data)) {
                            if (data.length > 0 && esProducto(data[0])) return data;
                            const hijas = data.filter((x) => typeof x === "string");
                            return hijas.length > 0 ? await cargarRutas(hijas) : [];
                        }

                        if (data && typeof data === "object") {
                            if (Array.isArray(data.productos)) return data.productos;
                            if (Array.isArray(data.files)) return await cargarRutas(data.files);
                            if (esProducto(data)) return [data];

                            for (const key of Object.keys(data)) {
                                const val = data[key];
                                if (Array.isArray(val) && val.length > 0) {
                                    if (esProducto(val[0])) return val;
                                    const hijas = val.filter((x) => typeof x === "string");
                                    if (hijas.length > 0) return await cargarRutas(hijas);
                                }
                            }
                        }
                        return [];
                    } catch {
                        return [];
                    }
                })
            );
            return resultados.flat();
        };

        (async () => {
            try {
                const indexRes = await fetch("/assets/json/manifest.json");
                if (!indexRes.ok) { if (!cancelado) setProductos([]); return; }
                const indexData = await indexRes.json();
                const manifiestos = indexData.files || [];

                const catEfectiva = categoriaForzada || slugCategoria;
                let manifiestosFiltrados = manifiestos;
                if (catEfectiva) {
                    const cat = normalizar(catEfectiva);
                    manifiestosFiltrados = manifiestos.filter((m) =>
                        normalizar(m).includes(`/manifest/${cat}.json`)
                    );
                }
                if (manifiestosFiltrados.length === 0) {
                    if (!cancelado) setProductos([]);
                    return;
                }

                const todos = await cargarRutas(manifiestosFiltrados);

                let filtrados = todos;
                if (paramsRuta) {
                    const entradas = Object.entries(paramsRuta).filter(([, v]) => Boolean(v));
                    const eq = (a, b) => slugify(a || "") === slugify(b || "");
                    filtrados = filtrados.filter((p) => {
                        const desc = Array.isArray(p.descripcion) ? p.descripcion[0] : null;
                        if (!desc && entradas.length > 0) return false;
                        for (const [clave, valor] of entradas) {
                            const claveSinGuiones = clave.replace(/-/g, "");
                            const valorProd =
                                desc?.[clave] ?? desc?.[claveSinGuiones] ??
                                p[clave] ?? p[claveSinGuiones] ?? "";
                            if (!eq(valorProd, valor)) return false;
                        }
                        return true;
                    });
                } else if (medida || formato) {
                    const mSlug = medida ? slugify(medida) : null;
                    const fSlug = formato ? slugify(formato) : null;
                    filtrados = todos.filter((p) => {
                        if (!p.ruta) return false;
                        const r = p.ruta.toLowerCase();
                        if (mSlug && !r.includes(`/${mSlug}/`)) return false;
                        if (fSlug && !r.includes(`/${fSlug}/`)) return false;
                        return true;
                    });
                } else if (segmentosExtra.length > 0) {
                    const segsSlug = segmentosExtra.map(slugify);
                    filtrados = todos.filter((p) => {
                        if (!p.ruta) return false;
                        const r = p.ruta.toLowerCase();
                        return segsSlug.every((s) => r.includes(`/${s}/`));
                    });
                }

                if (!cancelado) setProductos(filtrados);
            } catch (err) {
                console.error("❌ Error general:", err);
                if (!cancelado) setProductos([]);
            }
        })();

        return () => { cancelado = true; };
    }, [categoriaForzada, slugCategoria, medida, formato, paramsRuta, segmentosExtra]);

    useEffect(() => {
        if (productos.length > 0 && origenKeyRef.current !== origenKey) {
            setOrdenAleatorio(shuffleArray(productos));
            origenKeyRef.current = origenKey;
        }
    }, [productos, origenKey]);

    const productosFiltrados = useMemo(() => {
        const grupos = {};
        for (const [clave, valor] of searchParams.entries()) {
            if (clave === "orden") continue;
            (grupos[clave] ||= []).push(slugify(valor));
        }
        const claves = Object.keys(grupos);
        if (claves.length === 0) return productos;

        return productos.filter((prod) => {
            for (const clave of claves) {
                if (!productoCumpleGrupo(prod, clave, grupos[clave])) return false;
            }
            return true;
        });
    }, [productos, searchParams]);

    const ordenActual = searchParams.get("orden");

    const productosOrdenados = useMemo(() => {
        if (!ordenActual) {
            const filtradosMap = new Map(productosFiltrados.map(p => [p.sku, p]));
            const ordenados = [];
            
            ordenAleatorio.forEach(p => {
                if (filtradosMap.has(p.sku)) {
                    ordenados.push(filtradosMap.get(p.sku));
                    filtradosMap.delete(p.sku);
                }
            });

            ordenados.push(...filtradosMap.values());
            return ordenados;
        }

        const lista = [...productosFiltrados];
        if (ordenActual === "menor-a-mayor") {
            return lista.sort((a, b) => Number(a.precioVenta || 0) - Number(b.precioVenta || 0));
        }
        if (ordenActual === "mayor-a-menor") {
            return lista.sort((a, b) => Number(b.precioVenta || 0) - Number(a.precioVenta || 0));
        }
        if (ordenActual === "mayor-descuento") {
            const descuento = (p) => {
                const precio = Number(p.precioVenta || 0);
                const precioAntes = Number(p.precioAntes || p.precioNormal || 0);
                if (!precioAntes || precioAntes <= precio) return 0;
                return (precioAntes - precio) / precioAntes;
            };
            return lista.sort((a, b) => descuento(b) - descuento(a));
        }
        return lista;
    }, [productosFiltrados, ordenAleatorio, ordenActual]);

    const totalPaginas = Math.max(
        1,
        Math.ceil(productosOrdenados.length / PRODUCTOS_POR_PAGINA)
    );

    useEffect(() => {
        setPaginaActual(1);
    }, [searchParams, categoriaForzada, slugCategoria, medida, formato, paramsRuta]);

    useEffect(() => {
        if (paginaActual > totalPaginas) setPaginaActual(totalPaginas);
    }, [paginaActual, totalPaginas]);

    const productosPaginados = useMemo(() => {
        const inicio = (paginaActual - 1) * PRODUCTOS_POR_PAGINA;
        return productosOrdenados.slice(inicio, inicio + PRODUCTOS_POR_PAGINA);
    }, [productosOrdenados, paginaActual]);

    const handleToggleFavorite = useCallback((prod) => {
        setFavoritos((prev) => {
            const existe = prev.includes(prod.sku);
            const nuevos = existe ? prev.filter((s) => s !== prod.sku) : [...prev, prod.sku];
            localStorage.setItem("favoritos", JSON.stringify(nuevos));
            return nuevos;
        });
    }, []);

    const truncate = useCallback((str = "", n = 50) => {
        if (!str) return "";
        return str.length > n ? `${str.slice(0, n).trim()}…` : str;
    }, []);

    const handleCambiarPagina = useCallback((nuevaPagina) => {
        setPaginaActual((prev) => {
            if (nuevaPagina < 1 || nuevaPagina > totalPaginas) return prev;
            return nuevaPagina;
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [totalPaginas]);

    const eliminarFiltro = useCallback((clave, valor) => {
        const slugValor = slugify(valor);
        const nuevosParams = new URLSearchParams();
        for (const [k, v] of searchParams.entries()) {
            if (k === clave && slugify(v) === slugValor) continue;
            nuevosParams.append(k, v);
        }
        setSearchParams(nuevosParams, { replace: true });
    }, [searchParams, setSearchParams]);

    const handleCambiarOrden = useCallback((valor) => {
        const nuevosParams = new URLSearchParams(searchParams);
        if (valor === "relevancia") nuevosParams.delete("orden");
        else nuevosParams.set("orden", valor);
        setSearchParams(nuevosParams, { replace: true });
        setIsOrderOpen(false);
    }, [searchParams, setSearchParams]);

    const toggleOrderMenu = useCallback(() => setIsOrderOpen((p) => !p), []);

    useEffect(() => {
        if (!isOrderOpen) return;
        const handleClickOutside = (e) => {
            if (orderRef.current && !orderRef.current.contains(e.target)) {
                setIsOrderOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOrderOpen]);

    const breadcrumb = ["Inicio", "Productos"];
    if (categoriaActual) breadcrumb.push(categoriaActual.categoría || categoriaActual.categoria);
    segmentosExtra.forEach((seg) => breadcrumb.push(seg.replace(/-/g, " ")));

    const textosCategoria = Array.isArray(categoriaActual?.textos) ? categoriaActual.textos : [];
    const galeriaCategoria = categoriaActual?.galeria?.[0] || null;

    const filtrosActivosChips = [...searchParams.entries()]
        .filter(([clave]) => clave !== "orden")
        .map(([clave, valor]) => ({ clave, valor }));

    const canonicalPath =
        ["productos", slugCategoria, ...segmentosExtra.map(slugify)]
            .filter(Boolean)
            .join("/") + "/";

    const textoOrden =
        ordenActual === "menor-a-mayor" ? "Menor a mayor precio"
        : ordenActual === "mayor-a-menor" ? "Mayor a menor precio"
        : ordenActual === "mayor-descuento" ? "Con mayor descuento"
        : "Ordenar por:";

    return(
        <>
            <Helmet>
                <title>{titulo} | Kamas</title>
                <meta name="description" content={descripcionSeo} />
                <link rel="canonical" href={`https://kamas.pe/${canonicalPath}`} />
            </Helmet>

            <main className="productos-main d-flex-column gap-20">
                <div className="block-container">
                    <section className="block-content">
                        <div className="pagina-productos-content">
                            <div className="pg-prds-top-container d-flex-column">
                                <div className="d-flex-center-left gap-10 margin-left-menos-10">
                                    {breadcrumb.map((item, i) => (
                                        <div key={i} className="d-flex-center-center gap-10">
                                            <span className="text color-color-1">{i > 0 && " > "}</span>
                                            <span className="text first-uppercase">{item}</span>
                                        </div>
                                    ))}
                                </div>

                                <p className="super-title text-left first-uppercase">
                                    {categoriaActual?.categoría || categoriaActual?.categoria || "Productos"}
                                </p>

                                {textosCategoria.map((txt, i) => (
                                    <p key={i} className="text first-uppercase">{txt}</p>
                                ))}

                                <button type="button" className="filters-bnt-open" onClick={abrirFiltros}>
                                    <span className="material-symbols-outlined">filter_alt</span>
                                    <p className="text">Filtros</p>
                                </button>
                            </div>

                            {galeriaCategoria && (
                                <a href={galeriaCategoria.link || "/"} className="pg-prd-banner-gallery" title={galeriaCategoria.alt}>
                                    <img className="d-flex w-100" src={galeriaCategoria.image} alt={galeriaCategoria.alt || ""} />
                                </a>
                            )}

                            <Filtros categoriaForzada={categoriaForzada || slugCategoria} productos={productos} abierto={filtrosAbiertos} onCerrar={cerrarFiltros} />

                            <div className="d-flex-column gap-20-to-10">
                                <div className="prd-order">
                                    <div className="d-flex-column gap-10">
                                        <div className="d-flex gap-5">
                                            <p className="font-bold text">{productosOrdenados.length}{" "}productos</p>
                                        </div>

                                        {filtrosActivosChips.length > 0 && (
                                            <div className="gap-10 d-flex-wrap">
                                                {filtrosActivosChips.map(({ clave, valor }, i) => {
                                                    const slugValor = slugify(valor);
                                                    const label = clave === "precio"
                                                        ? formatearRangoPrecio(slugValor)
                                                        : valor.replace(/-/g, " ");
                                                    return (
                                                        <button
                                                            key={`${clave}-${valor}-${i}`}
                                                            type="button"
                                                            className="button-link button-link-8"
                                                            onClick={() => eliminarFiltro(clave, valor)}
                                                        >
                                                            <p className="button-link-text first-uppercase">{label}</p>
                                                            <span className="material-symbols-outlined">close</span>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>

                                    <div className="filters-order margin-bottom" ref={orderRef}>
                                        <button type="button" className={`filters-order-button ${isOrderOpen ? "active" : ""}`} onClick={toggleOrderMenu}>
                                            <span className="material-symbols-outlined">list_alt</span>
                                            <p className="text">{textoOrden}</p>
                                        </button>

                                        <ul className={`filters-order-list ${isOrderOpen ? "active" : ""}`}>
                                            <li>
                                                <button type="button" onClick={() => handleCambiarOrden("menor-a-mayor")} className={ordenActual === "menor-a-mayor" ? "active" : ""}>
                                                    <span className="material-symbols-outlined">arrow_warm_up</span>
                                                    <p>Menor a mayor precio</p>
                                                </button>
                                            </li>
                                            <li>
                                                <button type="button" onClick={() => handleCambiarOrden("mayor-a-menor")} className={ordenActual === "mayor-a-menor" ? "active" : ""}>
                                                    <span className="material-symbols-outlined">arrow_cool_down</span>
                                                    <p>Mayor a menor precio</p>
                                                </button>
                                            </li>
                                            <li>
                                                <button type="button" onClick={() => handleCambiarOrden("mayor-descuento")} className={ordenActual === "mayor-descuento" ? "active" : ""}>
                                                    <span className="material-symbols-outlined">percent</span>
                                                    <p>Con mayor descuento</p>
                                                </button>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="visible-on-desktop-no-mobile w-100">
                                        <Paginacion paginaActual={paginaActual} totalPaginas={totalPaginas} onChange={handleCambiarPagina} />
                                    </div>
                                </div>

                                {productosOrdenados.length === 0 ? (
                                    <p className="productos-vacio">No se encontraron productos con estos filtros.</p>
                                ) : (
                                    <ul className="products-list">
                                        {productosPaginados.map((prod, i) => (
                                            <Producto
                                                key={`${prod.sku}-${i}`}
                                                producto={prod}
                                                truncate={truncate}
                                                onToggleFavorite={handleToggleFavorite}
                                                isFavorite={favoritos.includes(prod.sku)}
                                                skusOfertas={skusOfertas}
                                                isOfferActive={isOfferActive}
                                                skusParaHoy={skusParaHoy}
                                            />
                                        ))}
                                    </ul>
                                )}

                                <Paginacion paginaActual={paginaActual} totalPaginas={totalPaginas} onChange={handleCambiarPagina} />
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}

export default Productos;
