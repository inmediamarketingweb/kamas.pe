import { useCallback, useEffect, useState, useMemo } from "react";
import { useSearchParams, useParams } from "react-router-dom";

import './Filtros.css';

function Filtros({ productos, setProductosFiltrados, filtersActive, onClose }){
    const { categoria } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [filtros, setFiltros] = useState([]);
    const [filtrosSeleccionados, setFiltrosSeleccionados] = useState({});
    const [rangoDePrecioSeleccionado, setRangoDePrecioSeleccionado] = useState(null);
    const [rangoPrecios, setRangoPrecios] = useState([0, 0]);
    const [valorThumb, setValorThumb] = useState(0);
    const [envioGratisSeleccionado, setEnvioGratisSeleccionado] = useState(false);
    const [activeFilter, setActiveFilter] = useState(null);

    const rangosDePrecio = useMemo(() => [
        { id: "rango-1", titulo: "S/.0 - S/500", min: 0, max: 500 },
        { id: "rango-2", titulo: "S/.500 - S/1000", min: 500, max: 1000 },
        { id: "rango-3", titulo: "S/.1000 - S/2000", min: 1000, max: 2000 },
        { id: "rango-4", titulo: "Desde S/ 2000", min: 2000, max: Infinity },
    ], []);

    useEffect(() => {
        if (!categoria) return;
        
        const controller = new AbortController();
        const signal = controller.signal;

        const url = `/assets/json/categorias/${categoria}/filtros.json`;
        fetch(url, { signal })
            .then(
                (response) => response.ok ? response.json() : Promise.reject(`Error ${response.status}`)
            )
            .then((data) => setFiltros(Array.isArray(data) ? data : []))
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
            const opciones = value.split("+").map((op) => decodeURIComponent(op).toLowerCase());
            filtrosDesdeURL[key] = new Set(opciones);
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
    }, [ filtrarProductos,filtrosSeleccionados, productos, valorThumb, rangoDePrecioSeleccionado, envioGratisSeleccionado ]);

    const handleFiltroChange = (categoriaFiltro, opcion) => {
        const opcionNormalizada = opcion.toLowerCase().replace(/\s+/g, "-");
        setFiltrosSeleccionados((prev) => {
            const nuevoEstado = { ...prev };
            const opciones = new Set(nuevoEstado[categoriaFiltro] || []);
            
            if (opciones.has(opcionNormalizada)) {
                opciones.delete(opcionNormalizada);
            } else {
                opciones.add(opcionNormalizada);
            }

            if (opciones.size > 0) {
                nuevoEstado[categoriaFiltro] = opciones;
            } else {
                delete nuevoEstado[categoriaFiltro];
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
            params.set(
                categoriaFiltro,
                [...filtrosActuales[categoriaFiltro]].map((valor) => valor.toLowerCase().replace(/\s+/g, "-")).join("+")
            );
        });
        setSearchParams(params);
    }, [setSearchParams]);

    const handleClearFilters = () => {
        setFiltrosSeleccionados({});
        setRangoDePrecioSeleccionado(null);
        setEnvioGratisSeleccionado(false);
        setSearchParams(new URLSearchParams());
    };

    const handleToggleFilter = (filterName) => {
        setActiveFilter((prev) => (prev === filterName ? null : filterName));
    };

    return (
        <>
            <div className={`filters-layer ${filtersActive ? "active" : ""}`} onClick={onClose} aria-hidden={!filtersActive}/>

            <div className={`filters-container ${filtersActive ? "active" : ""}`}>
                <div className="filters-content">
                    <div className="filters-content-top">
                        <h2 className="title">Filtros:</h2>
                        <button type="button" className="close-filters" onClick={onClose} aria-label="Cerrar filtros">
                            <span className="material-icons">close</span>
                        </button>
                    </div>
                    
                    <div className="d-flex-column">
                        <p className='block-title d-flex color-color-1'>Kamas</p>
                        <p className='title uppercase'>¡Las mejores ofertas en muebles para el hogar 🔥🛌!</p>
                    </div>

                    <div className="price-range d-flex-column">
                        <ul className="d-flex-column">
                            {rangosDePrecio.map((rango) => (
                                <li key={rango.id}>
                                    <input type="radio" id={`rango-${rango.id}`} name="rango-precio" checked={rangoDePrecioSeleccionado === rango.id} onChange={() => handleCambioRangoPrecio(rango.id)} className="radio-input"/>
                                    <label htmlFor={`rango-${rango.id}`} className="radio-label">{rango.titulo}</label>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {filtros.map((filtro) => (
                        <div className="filter d-flex-column gap-10" key={filtro.nombre}>
                            <div className={`filter-title ${activeFilter === filtro.nombre ? "active" : ""}`} onClick={() => handleToggleFilter(filtro.nombre)} role="button" tabIndex="0" aria-expanded={activeFilter === filtro.nombre} >
                                <h3 className="title">{filtro.titulo}:</h3>
                                <span className="material-icons">keyboard_arrow_down</span>
                            </div>

                            <ul className={`${activeFilter === filtro.nombre ? "active" : ""}`}>
                                {Array.isArray(filtro.lista) ? (
                                    filtro.lista.map((opcion) => {
                                        const isActive = filtrosSeleccionados[filtro.nombre]?.has(
                                            opcion.nombre.toLowerCase().replace(/\s+/g, "-")
                                        );
                                        return (
                                            <li key={opcion.id} className={isActive ? "active" : ""} onClick={() => handleFiltroChange(filtro.nombre, opcion.nombre)} role="button" tabIndex="0">
                                                <input type="checkbox" readOnly checked={isActive || false}/>
                                                <label>{opcion.nombre}</label>
                                            </li>
                                        );
                                    })
                                ) : (
                                    <p>Sin opciones disponibles</p>
                                )}
                            </ul>
                        </div>
                    ))}

                    <div className="filters-clear-container">
                        <button type="button" className="d-flex-center-center gap-10 filters-clear" onClick={handleClearFilters}>
                            <span className="material-icons">delete</span>
                            <p>Limpiar filtros</p>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Filtros;
