import { useEffect, useMemo, useState, useCallback } from "react";
import { Helmet } from "react-helmet";

import { Producto } from "../../Componentes/Plantillas/Producto/Producto";

import "./Favoritos.css";

const CATEGORIAS = [
    { slug: "colchones",         label: "Colchones" },
    { slug: "camas-box-tarimas", label: "Camas box tarimas" },
    { slug: "dormitorios",       label: "Dormitorios" },
    { slug: "camas-funcionales", label: "Camas funcionales" },
    { slug: "cabeceras",         label: "Cabeceras" },
    { slug: "sofas",             label: "Sofás" },
    { slug: "complementos",      label: "Complementos" },
    { slug: "todos",             label: "Ver todos" }
];

function normalizar(str = "") {
    return str
        .toString()
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-");
}
const PARAM = "categoria";

function useCategoriaFromURL(defaultValue = "todos") {
    const [categoria, setCategoria] = useState(() => {
        if (typeof window === "undefined") return defaultValue;
        const params = new URLSearchParams(window.location.search);
        return params.get(PARAM) || defaultValue;
    });

    useEffect(() => {
        const onPopState = () => {
            const params = new URLSearchParams(window.location.search);
            setCategoria(params.get(PARAM) || defaultValue);
        };
        window.addEventListener("popstate", onPopState);
        return () => window.removeEventListener("popstate", onPopState);
    }, [defaultValue]);

    const updateCategoria = useCallback(
        (nueva) => {
            const params = new URLSearchParams(window.location.search);
            if (!nueva || nueva === defaultValue) {
                params.delete(PARAM);
            } else {
                params.set(PARAM, nueva);
            }
            const query = params.toString();
            const newUrl = `${window.location.pathname}${query ? `?${query}` : ""}`;
            window.history.pushState({}, "", newUrl);
            setCategoria(nueva || defaultValue);
        },
        [defaultValue]
    );

    return [categoria, updateCategoria];
}

function Favoritos(){
    const [favoritos, setFavoritos] = useState([]);
    const [categoria, setCategoria] = useCategoriaFromURL("todos");

    useEffect(() => {
        const favStorage = JSON.parse(localStorage.getItem("favoritos")) || [];
        setFavoritos(favStorage);
    }, []);

    const removeFavorite = (producto) => {
        const updatedFavorites = favoritos.filter((fav) => fav.sku !== producto.sku);
        setFavoritos(updatedFavorites);
        localStorage.setItem("favoritos", JSON.stringify(updatedFavorites));
    };

    const truncate = (str, maxLength) => {
        if (str.length <= maxLength) return str;
        return str.slice(0, maxLength) + "...";
    };

    const favoritosFiltrados = useMemo(() => {
        if (categoria === "todos") return favoritos;
        const slugActivo = normalizar(categoria);

        return favoritos.filter((p) => {
            if (p.categoria && normalizar(p.categoria) === slugActivo) {
                return true;
            }

            const detalles = p["detalles-del-producto"];
            if (Array.isArray(detalles)) {
                return detalles.some((d) => {
                    const candidatos = [
                        d.categoria,
                        d["categoria"],
                        d.linea,
                    ];
                    return candidatos.some(
                        (v) => v && normalizar(v) === slugActivo
                    );
                });
            }

            return false;
        });
    }, [favoritos, categoria]);

    return (
        <>
            <Helmet>
                <title>Mis favoritos | Kamas</title>
                <meta name="description" content="Guarda tus productos favoritos de KAMAS de forma segura y rápida."/>
            </Helmet>

            <main>
                <div className="block-container">
                    <section className="block-content">
                        <div className="block-title-container">
                            <h2 className="block-title">Mis favoritos</h2>
                        </div>

                        <div className="d-grid-auto-1fr-auto-1fr gap-20">
                            <div className="d-flex-column gap-20">
                                <div className="d-flex-column gap-5">
                                    <p className="font-bold color-black">Categorías</p>

                                    <ul className="pg-fav-filters">
                                        {CATEGORIAS.map(({ slug, label }) => (
                                            <li key={slug}>
                                                <button type="button" className={categoria === slug ? "active" : ""} aria-pressed={categoria === slug} onClick={() => setCategoria(slug)}>
                                                    <p className="text">{label}</p>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="favorites-container d-flex-column gap-20">
                                {favoritosFiltrados.length > 0 ? (
                                    <ul className="favorites-products">
                                        {favoritosFiltrados.map((producto) => (
                                            <Producto key={producto.sku} producto={producto} truncate={truncate} onToggleFavorite={removeFavorite} isFavorite={true} skusOfertas={[]} isOfferActive={false}/>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>
                                        {favoritos.length === 0 ? "No tienes productos en favoritos." : "No hay productos en esta categoría."}
                                    </p>
                                )}

                                <div className="d-flex-center-right">
                                    <a href="https://kamas.pe/" title="Inicio | Kamas" className="button-link button-link-2">
                                        <span className="material-symbols-outlined">home</span>
                                        <p className="button-link-text">Volver al inicio</p>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}

export default Favoritos;
