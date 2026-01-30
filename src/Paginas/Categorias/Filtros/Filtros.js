import { useCallback, useEffect, useState, useMemo } from "react";
import { useSearchParams, useParams } from "react-router-dom";

function Filtros({ productos, setProductosFiltrados, filtersActive, onClose }){
    const { categoria } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [filtros, setFiltros] = useState([]);
    const [filtrosSeleccionados, setFiltrosSeleccionados] = useState({});
    const [rangoDePrecioSeleccionado, setRangoDePrecioSeleccionado] = useState(null);
    const [rangoPrecios, setRangoPrecios] = useState([0, 0]);
    const [valorThumb, setValorThumb] = useState(0);
    const [envioGratisSeleccionado, setEnvioGratisSeleccionado] = useState(false);

    const rangosDePrecio = useMemo(() => [
        { id: "rango-1", titulo: "S/.0 - S/500", min: 0, max: 500 },
        { id: "rango-2", titulo: "S/.500 - S/1000", min: 500, max: 1000 },
        { id: "rango-3", titulo: "S/.1000 - S/2000", min: 1000, max: 2000 },
        { id: "rango-4", titulo: "Desde S/ 2000", min: 2000, max: Infinity },
    ], []);

    const handleClearFilterCategory = (categoriaFiltro) => {
        setFiltrosSeleccionados(prev => {
            const nuevoEstado = { ...prev };
            if (nuevoEstado[categoriaFiltro]) {
                delete nuevoEstado[categoriaFiltro];
            }
            actualizarURL(nuevoEstado);
            return nuevoEstado;
        });
    };

    useEffect(() => {
        if (!categoria) return;

        const controller = new AbortController();
        const signal = controller.signal;

        const url = "/assets/json/filtros.json";
        fetch(url, { signal })
            .then((response) => response.ok ? response.json() : Promise.reject(`Error ${response.status}`))
            .then((data) => {
                const normalizarNombre = (str) => 
                    str.toLowerCase().replace(/\s+/g, '-').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                
                const categoriaNormalizada = normalizarNombre(categoria);
                
                const categoriaData = data.find(item => 
                    normalizarNombre(item.categoria) === categoriaNormalizada
                );

                if (categoriaData && Array.isArray(categoriaData.filtros)) {
                    const filtrosTransformados = categoriaData.filtros.map((filtro, index) => {
                        const clave = Object.keys(filtro)[0];
                        const opciones = filtro[clave];
                        
                        const titulo = clave.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()).replace(/De|Del|Y|En/g, match => match.toLowerCase());
                        
                        return {
                            id: index + 1,
                            titulo: titulo,
                            nombre: clave,
                            lista: Array.isArray(opciones) ? opciones.map((op, idx) => {
                                const valor = op[clave];
                                return {
                                    id: idx + 1,
                                    nombre: typeof valor === 'string' ? valor : Object.values(valor)[0]
                                };
                            }) : []
                        };
                    });
                    
                    setFiltros(filtrosTransformados);
                } else {
                    setFiltros([]);
                }
            })
            .catch((error) => {
                if (error.name !== 'AbortError') {
                    console.error("Error al cargar filtros:", error);
                    setFiltros([]);
                }
            });

        return () => controller.abort();
    }, [categoria]);

    useEffect(() => {
        if (!searchParams) return;

        const filtrosDesdeURL = {};
        searchParams.forEach((value, key) => {
            const opcion = decodeURIComponent(value).toLowerCase();
            filtrosDesdeURL[key] = new Set([opcion]);
        });
        setFiltrosSeleccionados(filtrosDesdeURL);
    }, [searchParams]);

    useEffect(() => {
        if (productos && productos.length > 0) {
            const precios = productos.map(
                (producto) => producto.precioVenta || producto.precioNormal || producto.precioRegular || 0
            );
            const minPrice = Math.min(...precios);
            const maxPrice = Math.max(...precios);
            setRangoPrecios([minPrice, maxPrice]);
            setValorThumb(maxPrice);
        }
    }, [productos]);

    const filtrarProductos = useCallback((filtrosActuales, precioMaximo, rangoSeleccionado, envioGratis) => {
        if (!productos || productos.length === 0) return;

        const filtrados = productos.filter((producto) => {
            const cumpleFiltros = Object.keys(filtrosActuales).every((categoriaFiltro) =>
                producto["detalles-del-producto"]?.some((detalle) =>
                    filtrosActuales[categoriaFiltro].has(
                        detalle[categoriaFiltro]?.toLowerCase().replace(/\s+/g, "-")
                    )
                )
            );

            const rango = rangosDePrecio.find((r) => r.id === rangoSeleccionado);
            const cumpleRangoPrecio = rango ? producto.precioVenta >= rango.min && producto.precioVenta <= rango.max : true;
            const cumplePrecio = producto.precioVenta >= rangoPrecios[0] && producto.precioVenta <= precioMaximo;
            const cumpleEnvioGratis = envioGratis ? producto["tipo-de-envio"]?.toLowerCase() === "gratis" : true;
            return cumpleFiltros && cumpleRangoPrecio && cumplePrecio && cumpleEnvioGratis;
        });

        setProductosFiltrados(filtrados);
    }, [productos, rangoPrecios, rangosDePrecio, setProductosFiltrados]);

    useEffect(() => {
        if (productos && productos.length > 0) {
            filtrarProductos(
                filtrosSeleccionados, 
                valorThumb, 
                rangoDePrecioSeleccionado, 
                envioGratisSeleccionado
            );
        }
    }, [filtrarProductos, filtrosSeleccionados, productos, valorThumb, rangoDePrecioSeleccionado, envioGratisSeleccionado]);

    const handleFiltroChange = (categoriaFiltro, opcion) => {
        const opcionNormalizada = opcion.toLowerCase().replace(/\s+/g, "-");

        setFiltrosSeleccionados((prev) => {
            const nuevoEstado = { ...prev };

            if (nuevoEstado[categoriaFiltro] && nuevoEstado[categoriaFiltro].has(opcionNormalizada)) {
                delete nuevoEstado[categoriaFiltro];
            } else {
                nuevoEstado[categoriaFiltro] = new Set([opcionNormalizada]);
            }

            actualizarURL(nuevoEstado);
            return nuevoEstado;
        });
    };

    const handleCambioRangoPrecio = (rangoId) => {
        setRangoDePrecioSeleccionado((prev) => prev === rangoId ? null : rangoId);
    };

    const actualizarURL = useCallback((filtrosActuales) => {
        const params = new URLSearchParams();
        Object.keys(filtrosActuales).forEach((categoriaFiltro) => {
            const valor = [...filtrosActuales[categoriaFiltro]][0];
            params.set(categoriaFiltro, valor);
        });
        setSearchParams(params);
    }, [setSearchParams]);

    const handleClearFilters = () => {
        setFiltrosSeleccionados({});
        setRangoDePrecioSeleccionado(null);
        setEnvioGratisSeleccionado(false);
        setSearchParams(new URLSearchParams());
    };

    return(
        <>
            <div className={`filtros-layer ${filtersActive ? "active" : ""}`} onClick={onClose} aria-hidden={!filtersActive}/>

            <div className={`filtros-container-global d-flex-column ${filtersActive ? "active" : ""}`}>
                <div className="filtros-container">
                    <div className="filtros-top d-flex-column">
                        <button type="button" className="filtros-button-close margin-left" onClick={onClose} aria-label="Cerrar filtros">
                            <span className="material-symbols-outlined">close</span>
                        </button>

                        <p className='block-title d-flex color-color-1'>Kamas</p>
                        <p className='title uppercase'>Las mejores ofertas en muebles para el hogar 🛌</p>
                    </div>

                    <div className="filtros-content">
                        <div className="filtros-prices-container d-flex-column gap-10">
                            <p className="title">Precio</p>
                            <ul className="filtro-items">
                                {rangosDePrecio.map((rango) => (
                                    <li key={rango.id}>
                                        <button type="button" className={rangoDePrecioSeleccionado === rango.id ? "active" : ""} onClick={() => handleCambioRangoPrecio(rango.id)}>
                                            <span>{rango.titulo}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {filtros.length > 0 ? (
                            <div className="filtros-detalles-container d-flex-column gap-10 margin-top-20">
                                <p className="title">Detalles</p>
                                
                                {filtros.map((filtro) => (
                                    <div key={filtro.nombre} className="d-flex-column">
                                        <p className="filtro-detalle-title first-uppercase">{filtro.titulo}</p>
                                        <ul className="filtro-items">
                                            {Array.isArray(filtro.lista) ? (
                                                filtro.lista.map((opcion) => {
                                                    const isActive = filtrosSeleccionados[filtro.nombre]?.has(
                                                        opcion.nombre.toLowerCase().replace(/\s+/g, "-")
                                                    );
                                                    return (
                                                        <li key={opcion.id}>
                                                            <button type="button" className={isActive ? "active" : ""} onClick={() => handleFiltroChange(filtro.nombre, opcion.nombre)}>
                                                                <span className="first-uppercase">{opcion.nombre}</span>
                                                            </button>
                                                        </li>
                                                    );
                                                })
                                            ) : (
                                                <p>Sin opciones disponibles</p>
                                            )}

                                            <li>
                                                <button type="button" className='' onClick={() => handleClearFilterCategory(filtro.nombre)}>
                                                    <span className="first-uppercase">Ver todos</span>
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="sin-filtros">No se encontraron filtros para esta categoría.</p>
                        )}
                    </div>

                    <button type="button" className="button-link button-link-2" onClick={handleClearFilters}>
                        <span className="material-symbols-outlined">delete</span>
                        <p className="button-link-text">Limpiar filtros</p>
                    </button>
                </div>
            </div>
        </>
    );
}

export default Filtros;
