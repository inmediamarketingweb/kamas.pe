import { useState, useEffect } from 'react';
import './Descripcion.css';

import {
    formatearEtiqueta,
    formatearModelo,
    limpiarTitulo,
    obtenerTamanoDeNombre,
    normalizar,
} from './utils';

function Colchones({ producto }) {
    const [medidasData, setMedidasData] = useState([]);
    const [descripcionesData, setDescripcionesData] = useState([]);

    const [seccionesAbiertas, setSeccionesAbiertas] = useState({
        descripcion: true,
        medidas: false,
    });

    const toggleSeccion = (seccion) => {
        setSeccionesAbiertas((prev) => ({
            ...prev,
            [seccion]: !prev[seccion],
        }));
    };

    const nombre = producto?.nombre || '';
    const detalles =
        Array.isArray(producto?.descripcion) && producto.descripcion[0]
            ? producto.descripcion[0]
            : {};
    const modeloColchon =
        detalles['modelo-de-colchón'] ||
        detalles['modelo-de-colchon'] ||
        detalles['nombre-de-colchón'] ||
        detalles['nombre-de-colchon'] ||
        detalles['modelo'] ||
        '';

    useEffect(() => {
        const cargarJson = async () => {
            try {
                const [resMedidas, resDesc] = await Promise.all([
                    fetch('/assets/json/medidas.json'),
                    fetch('/assets/json/descripciones.json'),
                ]);
                const dataMedidas = await resMedidas.json();
                const dataDesc = await resDesc.json();
                setMedidasData(dataMedidas.descripciones || []);
                setDescripcionesData(dataDesc.descripciones || []);
            } catch (err) {
                console.error('Error cargando JSON:', err);
            }
        };
        cargarJson();
    }, []);

    if (!producto) return null;

    const mensajes = Array.isArray(producto.mensajes) ? producto.mensajes : [];
    const titulo = limpiarTitulo(nombre);

    const tamanoDetectado = obtenerTamanoDeNombre(nombre);
    const medidasEncontradas = tamanoDetectado
        ? medidasData.find(
              (item) => normalizar(Object.keys(item)[0]) === normalizar(tamanoDetectado)
          )
        : null;
    const listaMedidas = medidasEncontradas ? Object.values(medidasEncontradas)[0] : [];

    const obtenerDescripcion = (palabra) => {
        if (!palabra) return [];
        const norm = normalizar(palabra);
        const encontrado = descripcionesData.find(
            (item) => normalizar(Object.keys(item)[0]) === norm
        );
        return encontrado ? Object.values(encontrado)[0] : [];
    };

    const lineaValor = detalles['línea'] || detalles['linea'] || '';
    const lineaDescripcion = obtenerDescripcion(lineaValor);
    const cabeceraValor = detalles['tipo-de-cabecera'] || detalles['cabecera'] || '';
    const cabeceraDescripcion = obtenerDescripcion(cabeceraValor);

    return (
        <div className="pd-pg-description d-flex-column gap-10">
            <div className="d-flex-column gap-10 border-r-4 border-1-component padding-20">
                <p className="title font-bold">{titulo}</p>

                <ul className="d-flex-column gap-5">
                    {mensajes.map((msg, i) => (
                        <li key={i}>
                            <p className="text">{msg}</p>
                        </li>
                    ))}
                </ul>
            </div>

            <div
                className={`description-tag d-flex-column border-r-4 border-1-component ${
                    seccionesAbiertas.descripcion ? '' : 'active'
                }`}
            >
                <div
                    className="description-title d-flex-center-between gap-20"
                    onClick={() => toggleSeccion('descripcion')}
                    role="button"
                    aria-expanded={seccionesAbiertas.descripcion}
                    style={{ cursor: 'pointer' }}
                >
                    <p className="title upperase font-bold uppercase">Descripción</p>

                    <span className='material-symbols-outlined'>keyboard_arrow_down</span>
                </div>

                <ul className="chr-list">
                    {Object.entries(detalles).map(([clave, valor]) => (
                        <li key={clave}>
                            <div>
                                <b className="color-black font-weight first-uppercase">
                                    {formatearEtiqueta(clave)}
                                </b>
                            </div>

                            <div>
                                <p className="text first-uppercase margin-right">{valor}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div
                className={`description-tag d-flex-column border-r-4 border-1-component ${
                    seccionesAbiertas.medidas ? 'active' : ''
                }`}
            >
                <div
                    className="description-title d-flex-center-between gap-20"
                    onClick={() => toggleSeccion('medidas')}
                    role="button"
                    aria-expanded={seccionesAbiertas.medidas}
                    style={{ cursor: 'pointer' }}
                >
                    <p className="title font-bold">MEDIDAS {tamanoDetectado ? tamanoDetectado.toUpperCase() : ''}</p>

                    <span className='material-symbols-outlined'>keyboard_arrow_down</span>
                </div>

                <ul className="chr-list">
                    {listaMedidas.length > 0 ? (
                        listaMedidas.map((grupo, idx) =>
                            Object.entries(grupo).map(([clave, valor]) => (
                                <li key={`${idx}-${clave}`} className="d-flex w-100">
                                    <div>
                                        <b className="color-black font-weight first-uppercase">
                                            {formatearEtiqueta(clave)}:
                                        </b>
                                    </div>
                                    <div>
                                        <p className="text first-uppercase margin-right">{valor}</p>
                                    </div>
                                </li>
                            ))
                        )
                    ) : (
                        <li>
                            <p className="text">Medidas no disponibles para este tamaño.</p>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Colchones;
