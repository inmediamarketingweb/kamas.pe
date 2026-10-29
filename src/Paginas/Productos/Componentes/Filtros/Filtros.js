import { useEffect, useState, useMemo, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";

import "./Filtros.css";

export const slugify = (str = "") => String(str).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-").replace(/^-|-$/g, "");

export const RANGOS_PRECIO = [
    { valor: "0-500",     label: "S/ 0 - 500",     min: 0,    max: 500 },
    { valor: "500-1000",  label: "S/ 500 - 1000",  min: 500,  max: 1000 },
    { valor: "1000-1500", label: "S/ 1000 - 1500", min: 1000, max: 1500 },
    { valor: "1500-2000", label: "S/ 1500 - 2000", min: 1500, max: 2000 },
    { valor: "2000-3000", label: "S/ 2000 - 3000", min: 2000, max: 3000 },
    { valor: "3000-mas",  label: "S/ 3000 a más",  min: 3000, max: Infinity },
];

export const getRangoPrecio = (valor) => RANGOS_PRECIO.find((r) => r.valor === slugify(valor)) || null;

export const formatearRangoPrecio = (valor) => {
    const r = getRangoPrecio(valor);
    return r ? r.label : valor;
};

export const productoCumpleGrupo = (producto, claveGrupo, valoresSlug) => {
    if (!valoresSlug || valoresSlug.length === 0) return true;

    if (claveGrupo === "precio") {
        const precio = Number(producto.precioVenta);
        if (!Number.isFinite(precio)) return false;
        return valoresSlug.some((v) => {
            const r = getRangoPrecio(v);
            if (!r) return false;
            return precio >= r.min && precio <= r.max;
        });
    }

    const descripciones = Array.isArray(producto.descripcion)
        ? producto.descripcion
        : [];

    return descripciones.some((desc) => {
        if (!desc || typeof desc !== "object") return false;
        const v = desc[claveGrupo];
        if (v === undefined || v === null) return false;
        const lista = Array.isArray(v) ? v : [v];
        return lista.some((item) => valoresSlug.includes(slugify(item)));
    });
};

export const productoCumplePrecio = (producto, valoresRango) => productoCumpleGrupo(producto, "precio", valoresRango);

const CLAVES_NO_FILTRO = ["orden"];

function Filtros({ categoriaForzada = null, productos = [], abierto = false, onCerrar = () => {} }) {
    if (!categoriaForzada) {
        return (
            <div className="d-flex-column gap-20">
                <div className="prd-flt-container">
                    <p className="title font-bold padding-10">Categorías</p>

                    <ul className="prd-flt-cat">
                        <li>
                            <Link to="/productos/colchones/" className="prd-flt-cat-link">
                                <div className="d-flex-center-left gap-10">
                                    <img src="/assets/imagenes/componentes/header/colchones.svg" alt="" />
                                    <p className="text">Colchones</p>
                                </div>
                                <span className="material-symbols-outlined">chevron_right</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/productos/camas/" className="prd-flt-cat-link">
                                <div className="d-flex-center-left gap-10">
                                    <img src="/assets/imagenes/componentes/header/camas.svg" alt="" />
                                    <p className="text">Camas</p>
                                </div>
                                <span className="material-symbols-outlined">chevron_right</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/productos/dormitorios/" className="prd-flt-cat-link">
                                <div className="d-flex-center-left gap-10">
                                    <img src="/assets/imagenes/componentes/header/dormitorios.svg" alt="" />
                                    <p className="text">Dormitorios</p>
                                </div>
                                <span className="material-symbols-outlined">chevron_right</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/productos/cabeceras/" className="prd-flt-cat-link">
                                <div className="d-flex-center-left gap-10">
                                    <img src="/assets/imagenes/componentes/header/cabeceras.svg" alt="" />
                                    <p className="text">Cabeceras</p>
                                </div>
                                <span className="material-symbols-outlined">chevron_right</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/productos/sofas/" className="prd-flt-cat-link">
                                <div className="d-flex-center-left gap-10">
                                    <img src="/assets/imagenes/componentes/header/sofas.svg" alt="" />
                                    <p className="text">Sofás</p>
                                </div>
                                <span className="material-symbols-outlined">chevron_right</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/productos/muebles-a-medida/" className="prd-flt-cat-link">
                                <div className="d-flex-center-left gap-10">
                                    <img src="/assets/imagenes/componentes/header/medida.svg" alt="" />
                                    <p className="text">Muebles a medida</p>
                                </div>
                                <span className="material-symbols-outlined">chevron_right</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/productos/pet/" className="prd-flt-cat-link">
                                <div className="d-flex-center-left gap-10">
                                    <img src="/assets/imagenes/componentes/header/pet.svg" alt="" />
                                    <p className="text">Pet</p>
                                </div>
                                <span className="material-symbols-outlined">chevron_right</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/productos/complementos/" className="prd-flt-cat-link">
                                <div className="d-flex-center-left gap-10">
                                    <img src="/assets/imagenes/componentes/header/complementos.svg" alt="" />
                                    <p className="text">Complementos</p>
                                </div>
                                <span className="material-symbols-outlined">chevron_right</span>
                            </Link>
                        </li>
                    </ul>
                </div>

                <ul className="d-flex-column gap-10 w-100">
                    <li className="d-flex w-100">
                        <button type="button" className="filter-button filter-button-checkbox">
                            <div className="d-flex-center-left gap-5">
                                <span className="material-symbols-outlined">sell</span>
                                <p className="text">En oferta</p>
                            </div>

                            <div className="filter-button-switch"></div>
                        </button>
                    </li>

                    <li className="d-flex w-100">
                        <button type="button" className="filter-button filter-button-checkbox">
                            <div className="d-flex-center-left gap-5">
                                <span className="material-symbols-outlined">timer</span>
                                <p className="text">Recíbelo hoy</p>
                            </div>

                            <div className="filter-button-switch"></div>
                        </button>
                    </li>

                    <li className="d-flex w-100">
                        <button type="button" className="filter-button filter-button-checkbox">
                            <div className="d-flex-center-left gap-5">
                                <span className="material-symbols-outlined">delivery_truck_speed</span>
                                <p className="text">Envío gratis</p>
                            </div>

                            <div className="filter-button-switch"></div>
                        </button>
                    </li>
                </ul>

                <img className="w-100 d-flex border-r-4" src="/assets/imagenes/productos/foto-de-filtros.webp" alt=""/>
            </div>
        );
    }

    return (
        <FiltrosDeCategoria
            categoria={categoriaForzada}
            productos={productos}
            abierto={abierto}
            onCerrar={onCerrar}
        />
    );
}

Filtros.propTypes = {
    categoriaForzada: PropTypes.string,
    productos: PropTypes.array,
    abierto: PropTypes.bool,
    onCerrar: PropTypes.func,
};

export default Filtros;

function FiltrosDeCategoria({ categoria, productos, abierto, onCerrar }) {
    const [definicionFiltros, setDefinicionFiltros] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [abiertos, setAbiertos] = useState({});
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        let cancelado = false;
        const cargar = async () => {
            try {
                const res = await fetch("/assets/json/filtros.json");
                if (!res.ok) {
                    if (!cancelado) setDefinicionFiltros([]);
                    return;
                }
                const data = await res.json();
                const cat = slugify(categoria);
                const entrada = data.find((item) => slugify(item.categoría) === cat);
                if (!entrada) {
                    if (!cancelado) setDefinicionFiltros([]);
                    return;
                }
                if (!cancelado) setDefinicionFiltros(entrada.filtros || []);
            } catch (err) {
                console.error("❌ Error cargando filtros.json:", err);
                if (!cancelado) setDefinicionFiltros([]);
            } finally {
                if (!cancelado) setCargando(false);
            }
        };
        cargar();
        return () => { cancelado = true; };
    }, [categoria]);

    const filtrosActivos = useMemo(() => {
        const map = {};
        for (const [clave, valor] of searchParams.entries()) {
            if (CLAVES_NO_FILTRO.includes(clave)) continue;
            if (!map[clave]) map[clave] = [];
            map[clave].push(slugify(valor));
        }
        return map;
    }, [searchParams]);

    const hayFiltrosActivos = Object.keys(filtrosActivos).length > 0;

    const productosQueCumplen = useCallback(
        (exceptoGrupo = null) => {
            return productos.filter((prod) => {
                for (const [clave, valores] of Object.entries(filtrosActivos)) {
                    if (clave === exceptoGrupo) continue;
                    if (!productoCumpleGrupo(prod, clave, valores)) return false;
                }
                return true;
            });
        },
        [productos, filtrosActivos]
    );

    const gruposDisponibles = useMemo(() => {
        if (!productos.length || !definicionFiltros.length) return [];

        const resultado = [];
        const productosRelevantesPrecio = productosQueCumplen("precio");
        const rangosDisponibles = RANGOS_PRECIO.filter((r) =>
            productosRelevantesPrecio.some((p) => {
                const precio = Number(p.precioVenta);
                return Number.isFinite(precio) && precio >= r.min && precio <= r.max;
            })
        );

        const activosPrecio = filtrosActivos["precio"] || [];
        const rangosActivosExtra = activosPrecio.map((v) => getRangoPrecio(v)).filter((r) => r && !rangosDisponibles.some((rd) => rd.valor === r.valor));
        const opcionesPrecio = [...rangosDisponibles, ...rangosActivosExtra];

        if (opcionesPrecio.length > 0) {
            resultado.push({
                nombre: "precio",
                tipo: "precio",
                opciones: opcionesPrecio.map((r) => r.valor),
            });
        }

        for (const grupo of definicionFiltros) {
            const nombreGrupo = Object.keys(grupo)[0];
            const productosRelevantes = productosQueCumplen(nombreGrupo);
            const valoresUnicos = new Map();

            for (const producto of productosRelevantes) {
                const descripciones = Array.isArray(producto.descripcion)
                    ? producto.descripcion
                    : [];
                for (const desc of descripciones) {
                    if (!desc || typeof desc !== "object") continue;
                    const valor = desc[nombreGrupo];
                    if (valor === undefined || valor === null || valor === "") continue;

                    const lista = Array.isArray(valor) ? valor : [valor];
                    for (const v of lista) {
                        const s = slugify(v);
                        if (!s) continue;
                        if (!valoresUnicos.has(s)) {
                            valoresUnicos.set(s, String(v).trim());
                        }
                    }
                }
            }

            const activosDeEsteGrupo = filtrosActivos[nombreGrupo] || [];

            for (const slugActivo of activosDeEsteGrupo) {
                if (!slugActivo) continue;
                if (!valoresUnicos.has(slugActivo)) {
                    valoresUnicos.set(slugActivo, slugActivo.replace(/-/g, " "));
                }
            }

            if (valoresUnicos.size > 0) {
                resultado.push({
                    nombre: nombreGrupo,
                    tipo: "checkbox",
                    opciones: [...valoresUnicos.entries()].map(([slug, original]) => ({
                        slug,
                        original,
                    })),
                });
            }
        }

        return resultado;
    }, [productos, definicionFiltros, productosQueCumplen, filtrosActivos]);

    const estaActivo = (grupo, slugValor) => {
        const lista = filtrosActivos[grupo] || [];
        return lista.includes(slugValor);
    };

    const handleToggle = (grupo, slugValor) => {
        const nuevos = new URLSearchParams(searchParams);
        const actuales = nuevos.getAll(grupo).map((v) => slugify(v));
        const existe = actuales.includes(slugValor);
        nuevos.delete(grupo);

        for (const v of actuales) {
            if (v === slugValor) continue;
            nuevos.append(grupo, v);
        }
        if (!existe) nuevos.append(grupo, slugValor);
        setSearchParams(nuevos, { replace: true });
    };

    const toggleGrupo = (clave) => {
        setAbiertos((prev) => ({ ...prev, [clave]: !prev[clave] }));
    };

    const limpiarFiltros = () => {
        const nuevos = new URLSearchParams();
        for (const clave of CLAVES_NO_FILTRO) {
            const valor = searchParams.get(clave);
            if (valor) nuevos.set(clave, valor);
        }
        setSearchParams(nuevos, { replace: true });
    };

    if (cargando) return <p className="text">Cargando filtros...</p>;
    if (gruposDisponibles.length === 0) return null;

    return (
        <>
            <div className={`prd-flt-filtros ${abierto ? "active" : ""}`}>
                <div className="filtros-title-top-global">
                    <p className="text font-bold">Filtrar por:</p>

                    <button type="button" className={`prd-flt-clear ${hayFiltrosActivos ? "active" : ""}`}
                        onClick={limpiarFiltros}
                        disabled={!hayFiltrosActivos}
                        aria-disabled={!hayFiltrosActivos}
                    >
                        <span className="material-symbols-outlined">delete</span>
                        <p>Limpiar filtros</p>
                    </button>
                </div>

                {gruposDisponibles.map((grupo) => {
                    const abierto = Boolean(abiertos[grupo.nombre]);
                    const esPrecio = grupo.tipo === "precio";

                    return (
                        <div className="d-flex-column w-100" key={grupo.nombre}>
                            <div className="prd-flt-grupo">
                                <button type="button" className={`prd-flt-grupo-header ${abierto ? "active" : ""}`} onClick={() => toggleGrupo(grupo.nombre)}>
                                    <p className="title first-uppercase text">{grupo.nombre.replace(/-/g, " ")}</p>
                                    <span className="material-symbols-outlined">{abierto ? "expand_more" : "expand_less"}</span>
                                </button>

                                <ul className={`prd-flt-grupo-opciones ${abierto ? "active" : ""}`}>
                                    {grupo.opciones.map((op) => {
                                        const esObj = typeof op === "object";
                                        const slugValor = esObj ? op.slug : op;
                                        const label = esPrecio ? formatearRangoPrecio(slugValor) : esObj ? op.original : slugValor;
                                        const checked = estaActivo(grupo.nombre, slugValor);

                                        return (
                                            <li key={`${grupo.nombre}-${slugValor}`}>
                                                <label className="d-flex-center-left gap-5">
                                                    <input
                                                        type="checkbox"
                                                        checked={checked}
                                                        onChange={() => handleToggle(grupo.nombre, slugValor)}
                                                    />
                                                    <span className="first-uppercase">{label}</span>
                                                </label>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    );
                })}
            </div>

            <button
                type="button"
                className={`filter-button-close ${abierto ? "active" : ""}`}
                onClick={onCerrar}
            >
                <span className="material-symbols-outlined">close</span>
            </button>

            <div
                className={`prd-flt-filtros-layer ${abierto ? "active" : ""}`}
                onClick={onCerrar}
            ></div>
        </>
    );
}

FiltrosDeCategoria.propTypes = {
    categoria: PropTypes.string.isRequired,
    productos: PropTypes.array.isRequired,
    abierto: PropTypes.bool,
    onCerrar: PropTypes.func,
};
