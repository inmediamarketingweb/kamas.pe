import { useState, useEffect } from "react";

import './Cotizador.css';

function Cotizador(){
    const [data, setData] = useState(null);
    const [categoria, setCategoria] = useState("");
    const [categoriaLocked, setCategoriaLocked] = useState(false);
    const [tamano, setTamano] = useState("");
    const [tamanoLocked, setTamanoLocked] = useState(false);
    const [linea, setLinea] = useState("");
    const [lineaLocked, setLineaLocked] = useState(false);
    const [cabeceraTipo, setCabeceraTipo] = useState("");
    const [cabeceraTipoLocked, setCabeceraTipoLocked] = useState(false);
    const [cabeceraDiseno, setCabeceraDiseno] = useState("");
    const [cabeceraDisenoLocked, setCabeceraDisenoLocked] = useState(false);
    const [colchon, setColchon] = useState("");
    const [colchonLocked, setColchonLocked] = useState(false);
    const [veladores, setVeladores] = useState("");
    const [veladoresLocked, setVeladoresLocked] = useState(false);
    const [baseEncajonada, setBaseEncajonada] = useState(false);
    const [baseEncajonadaLocked, setBaseEncajonadaLocked] = useState(false);
    const [cantidadCajones, setCantidadCajones] = useState(0);
    const [cantidadCajonesLocked, setCantidadCajonesLocked] = useState(false);
    const [precioFinal, setPrecioFinal] = useState(0);

    useEffect(() => {
        fetch("/assets/json/dormitorios.json").then((res) => res.json()).then((json) => setData(json)).catch((err) => console.error("Error cargando JSON:", err));
    }, []);

    useEffect(() => {
        if (!data) return;
        if (!categoria || !tamano || !linea) {
            setPrecioFinal(0);
            return;
        }

        try{
            const categoriaKey = categoria.replace(/ /g, "-");
            const producto = data.precios[categoriaKey][tamano];
            const lineaData = producto.línea[linea];
            const adicionales = lineaData?.adicionales || {};
            let precioBase = 0;
            precioBase += lineaData?.precio || 0;

            if (baseEncajonada && adicionales["base-encajonada"]) {
                precioBase += adicionales["base-encajonada"];
            }

            if (cantidadCajones && adicionales["cajón"]) {
                precioBase += cantidadCajones * adicionales["cajón"];
            }

            if (cabeceraTipo) {
                precioBase += producto.cabecera?.["tipo-de-cabecera"]?.[cabeceraTipo] || 0;
            }

            if (cabeceraDiseno) {
                precioBase += producto.cabecera?.["diseño"]?.[cabeceraDiseno] || 0;
            }

            if (categoriaKey === "dormitorio" && colchon) {
                precioBase += producto.colchón?.[colchon] || 0;
            }

            if (veladores) {
                precioBase += producto.complementos?.veladores?.[veladores] || 0;
            }

            setPrecioFinal(precioBase);
        } catch (err) {
            console.error("Error calculando precio:", err);
        }
    }, [
        data,
        categoria,
        tamano,
        linea,
        cabeceraTipo,
        cabeceraDiseno,
        colchon,
        veladores,
        baseEncajonada,
        cantidadCajones,
    ]);

    if (!data) return <p>Cargando datos...</p>;

    const producto = categoria && tamano ? data.precios[categoria][tamano] : null;
    const lineaSeleccionada = producto && linea ? producto.línea[linea] : null;
    const adicionales = lineaSeleccionada?.adicionales || {};

    const renderSelectWithLock = (label, value, setValue, locked, setLocked, options) => (
        <div className="cotizador-fieldset">
            <div className="d-flex-column">
                <p className="title">{label}</p>
                <select value={value} onChange={(e) => setValue(e.target.value)} disabled={locked}>
                    <option value="">-- Selecciona --</option>
                    {options.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
            </div>
            <button type="button" onClick={() => setLocked(!locked)} className="lock-button">
                {locked ? (
                    <span className="material-icons">lock</span>
                ) : (
                    <span className="material-icons">lock_open</span>
                )}
            </button>
        </div>
    );

    return(
        <main>
            <section className="block-container">
                <div className="block-content">
                    <div className="d-grid-2-1fr gap-10">
                        <div className="d-flex-column gap-10">
                            {renderSelectWithLock(
                                "Categoría",
                                categoria,
                                setCategoria,
                                categoriaLocked,
                                setCategoriaLocked,
                                Object.keys(data.precios)
                            )}

                            {categoria && renderSelectWithLock(
                                "Tamaño",
                                tamano,
                                setTamano,
                                tamanoLocked,
                                setTamanoLocked,
                                Object.keys(data.precios[categoria])
                            )}

                            {categoria && tamano && producto &&
                            renderSelectWithLock(
                                "Línea",
                                linea,
                                setLinea,
                                lineaLocked,
                                setLineaLocked,
                                Object.keys(producto.línea)
                            )}

                            {lineaSeleccionada && adicionales["base-encajonada"] && (
                                <div className="cotizador-fieldset">
                                    <div className="base-encajonada h-100 bg-white">
                                        <p className="title">Base Encajonada (+S/ {adicionales["base-encajonada"]})</p>
                                        <input type="checkbox" checked={baseEncajonada} onChange={(e) => setBaseEncajonada(e.target.checked)} disabled={baseEncajonadaLocked}/>
                                    </div>

                                    <button type="button" onClick={() => setBaseEncajonadaLocked(!baseEncajonadaLocked)}>
                                        {baseEncajonadaLocked ? (
                                            <span className="material-icons">lock</span>
                                        ) : (
                                            <span className="material-icons">lock_open</span>
                                        )}
                                    </button>
                                </div>
                            )}

                            {lineaSeleccionada && adicionales["cajón"] && (
                                <div className="cotizador-fieldset">
                                    <div className="d-flex-column">
                                        <p className="title">Cantidad de Cajones (+S/ {adicionales["cajón"]} cada uno)</p>
                                        <input type="number" min="0" value={cantidadCajones} onChange={(e) => setCantidadCajones(Number(e.target.value))} disabled={cantidadCajonesLocked}/>
                                    </div>
                                    <button type="button" onClick={() => setCantidadCajonesLocked(!cantidadCajonesLocked)}>
                                        {cantidadCajonesLocked ? (
                                            <span className="material-icons">lock</span>
                                        ) : (
                                            <span className="material-icons">lock_open</span>
                                        )}
                                    </button>
                                </div>
                            )}

                            {categoria === "dormitorio" && producto && producto.colchón && renderSelectWithLock(
                                "Colchón",
                                colchon,
                                setColchon,
                                colchonLocked,
                                setColchonLocked,
                                Object.keys(producto.colchón)
                            )}

                            {producto && producto.cabecera && renderSelectWithLock(
                                "Cabecera Tipo",
                                cabeceraTipo,
                                setCabeceraTipo,
                                cabeceraTipoLocked,
                                setCabeceraTipoLocked,
                                Object.keys(producto.cabecera?.["tipo-de-cabecera"] || {})
                            )}

                            {producto && producto.cabecera && renderSelectWithLock(
                                "Cabecera Diseño",
                                cabeceraDiseno,
                                setCabeceraDiseno,
                                cabeceraDisenoLocked,
                                setCabeceraDisenoLocked,
                                Object.keys(producto.cabecera?.["diseño"] || {})
                            )}

                            {producto && producto.complementos && renderSelectWithLock(
                                "Veladores",
                                veladores,
                                setVeladores,
                                veladoresLocked,
                                setVeladoresLocked,
                                Object.keys(producto.complementos?.veladores || {})
                            )}
                        </div>

                        <div>
                            <p className="precio-final">S/.{precioFinal}</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Cotizador;

