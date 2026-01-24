import { useState, useEffect } from "react";

import './Cotizador.css';

function Cotizador() {
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
    const [modeloEspecial, setModeloEspecial] = useState("");
    const [modeloEspecialLocked, setModeloEspecialLocked] = useState(false);
    const [colchon, setColchon] = useState("");
    const [colchonLocked, setColchonLocked] = useState(false);
    const [veladores, setVeladores] = useState("");
    const [veladoresLocked, setVeladoresLocked] = useState(false);
    const [baseEncajonada, setBaseEncajonada] = useState(false);
    const [baseEncajonadaLocked, setBaseEncajonadaLocked] = useState(false);
    const [cantidadCajones, setCantidadCajones] = useState(0);
    const [cantidadCajonesLocked, setCantidadCajonesLocked] = useState(false);
    const [tresCuerpos, setTresCuerpos] = useState(false);
    const [tresCuerposLocked, setTresCuerposLocked] = useState(false);
    const [precioFinal, setPrecioFinal] = useState(0);

    useEffect(() => {
        fetch("/assets/json/precios.json")
            .then((res) => res.json())
            .then((json) => setData(json))
            .catch((err) => console.error("Error cargando JSON:", err));
    }, []);

    useEffect(() => {
        if (!data) return;
        if (!categoria || !tamano || !linea) {
            setPrecioFinal(0);
            return;
        }

        try {
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

            if (tresCuerpos && adicionales["3-cuerpos"]) {
                precioBase += adicionales["3-cuerpos"];
            }

            if (cabeceraTipo) {
                precioBase += producto.cabecera?.["tipo-de-cabecera"]?.[cabeceraTipo] || 0;
            }

            if (cabeceraDiseno) {
                precioBase += producto.cabecera?.["diseño"]?.[cabeceraDiseno] || 0;
            }

            if (modeloEspecial) {
                precioBase += producto.cabecera?.["modelos-especiales"]?.[modeloEspecial] || 0;
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
        modeloEspecial,
        colchon,
        veladores,
        baseEncajonada,
        cantidadCajones,
        tresCuerpos,
    ]);

    const incrementarCajones = () => {
        setCantidadCajones(prev => prev + 1);
    };

    const decrementarCajones = () => {
        setCantidadCajones(prev => (prev > 0 ? prev - 1 : 0));
    };

    if (!data) return <p>Cargando datos...</p>;

    const producto = categoria && tamano ? data.precios[categoria][tamano] : null;
    const lineaSeleccionada = producto && linea ? producto.línea[linea] : null;
    const adicionales = lineaSeleccionada?.adicionales || {};

    const renderSelectWithLock = (label, value, setValue, locked, setLocked, options) => (
        <div className="cotizador-fieldset">
            <p className="title">{label}</p>
            <div className="d-flex gap-10 w-100 cotizador-fieldset-select-content">
                <select value={value} onChange={(e) => setValue(e.target.value)} disabled={locked}>
                    <option value="">-- Selecciona --</option>
                    {options.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
                <button type="button" onClick={() => setLocked(!locked)} className="d-flex-center-center h-100">
                    {locked ? (
                        <span className="material-icons">lock</span>
                    ) : (
                        <span className="material-icons">lock_open</span>
                    )}
                </button>
            </div>
        </div>
    );

    return (
        <main>
            <section className="block-container">
                <div className="block-content">
                    <div className="d-grid-2-1fr gap-10">
                        <div className="d-grid-2-1fr gap-10">
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
                                <div className="cotizador-fieldset cotizador-fieldset-4">
                                    <p className="title">Base Encajonada</p>
                                    <div className="d-flex-center-left gap-20">
                                        <div className="d-flex-center-center gap-10">
                                            <input type="checkbox" checked={baseEncajonada} onChange={(e) => setBaseEncajonada(e.target.checked)} disabled={baseEncajonadaLocked} />
                                            <p className="text">+S/{adicionales["base-encajonada"]}</p>
                                        </div>
                                        <button type="button" onClick={() => setBaseEncajonadaLocked(!baseEncajonadaLocked)} className="margin-left d-flex-center-center">
                                            {baseEncajonadaLocked ? (
                                                <span className="material-icons">lock</span>
                                            ) : (
                                                <span className="material-icons">lock_open</span>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {lineaSeleccionada && adicionales["cajón"] && (
                                <div className="cotizador-fieldset cotizador-fieldset-5">
                                    <p className="title">Cajones +S/ {adicionales["cajón"]} c/u</p>
                                    <div className="d-flex gap-20">
                                        <div className="d-grid-auto-1fr-auto gap-5">
                                            <button type="button" onClick={decrementarCajones}>-</button>
                                            <p className="d-flex-center-center w-100 border-1-gray h-40-px border-r-4">{cantidadCajones}</p>
                                            <button type="button" onClick={incrementarCajones}>+</button>
                                        </div>
                                        <button type="button" onClick={() => setCantidadCajonesLocked(!cantidadCajonesLocked)} className="d-flex-center-center margin-auto">
                                            {cantidadCajonesLocked ? (
                                                <span className="material-icons">lock</span>
                                            ) : (
                                                <span className="material-icons">lock_open</span>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {lineaSeleccionada && adicionales["3-cuerpos"] && (
                                <div className="cotizador-fieldset cotizador-fieldset-6">
                                    <p className="title">Tres Cuerpos</p>
                                    <div className="d-flex-center-left gap-20">
                                        <div className="d-flex-center-center gap-10">
                                            <input type="checkbox" checked={tresCuerpos} onChange={(e) => setTresCuerpos(e.target.checked)} disabled={tresCuerposLocked} />
                                            <p className="text">+S/{adicionales["3-cuerpos"]}</p>
                                        </div>
                                        <button type="button" onClick={() => setTresCuerposLocked(!tresCuerposLocked)} className="margin-left d-flex-center-center">
                                            {tresCuerposLocked ? (
                                                <span className="material-icons">lock</span>
                                            ) : (
                                                <span className="material-icons">lock_open</span>
                                            )}
                                        </button>
                                    </div>
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
                                "Tipo de cabecera",
                                cabeceraTipo,
                                setCabeceraTipo,
                                cabeceraTipoLocked,
                                setCabeceraTipoLocked,
                                Object.keys(producto.cabecera?.["tipo-de-cabecera"] || {})
                            )}

                            {producto && producto.cabecera && renderSelectWithLock(
                                "Diseño de cabecera",
                                cabeceraDiseno,
                                setCabeceraDiseno,
                                cabeceraDisenoLocked,
                                setCabeceraDisenoLocked,
                                Object.keys(producto.cabecera?.["diseño"] || {})
                            )}

                            {producto && producto.cabecera && producto.cabecera["modelos-especiales"] && renderSelectWithLock(
                                "Cabeceras especiales",
                                modeloEspecial,
                                setModeloEspecial,
                                modeloEspecialLocked,
                                setModeloEspecialLocked,
                                Object.keys(producto.cabecera["modelos-especiales"] || {})
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

                        <div className="d-flex-center-center">
                            <p className="margin-auto block-title precio-final">S/.{precioFinal}</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Cotizador;
