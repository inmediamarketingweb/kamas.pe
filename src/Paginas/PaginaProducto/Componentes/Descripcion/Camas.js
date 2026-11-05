import { useState, useEffect } from 'react';

import './Descripcion.css';

import {
    normalizar,
    aSlug,
    formatearEtiqueta,
    limpiarTitulo,
} from './utils';

const ALIAS_LINEA = {
    'americanas':      'bases-y-tarimas',
    'americanas-con-cajones': 'bases-y-tarimas',
    'europeas':        'bases-y-tarimas',
    'clasicas':        'bases-y-tarimas',
    'clasicas-de-madera': 'bases-y-tarimas',
    'bases':           'bases-y-tarimas',
    'tarimas':         'bases-y-tarimas',
    'infantiles':      'infantiles',
    'smart':           'smart',
    'camarotes':       'camarotes'
};

const KEYWORDS_SUBLINEA = [
    { keyword: 'clasica de madera', slug: 'clasica-de-madera' },
    { keyword: 'clasica',           slug: 'clasica-de-madera' },
    { keyword: 'americana',         slug: 'americana' },
    { keyword: 'europea',           slug: 'europea' },
    { keyword: 'infantil',          slug: 'infantil' },
    { keyword: 'smart',             slug: 'smart' },
    { keyword: 'camarote',             slug: 'camarote' }
];

function Camas({ producto }) {
    const [medidasData, setMedidasData] = useState([]);
    const [descripcionesData, setDescripcionesData] = useState({});

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

    useEffect(() => {
        const cargarJson = async () => {
            try {
                const res = await fetch('/assets/json/descripciones/camas.json');
                const data = await res.json();
                setDescripcionesData(data || {});
            } catch (err) {
                console.error('Error cargando camas.json:', err);
                setDescripcionesData({});
            }
        };
        cargarJson();
    }, []);

    if (!producto) return null;

    const mensajes = Array.isArray(producto.mensajes) ? producto.mensajes : [];
    const titulo = limpiarTitulo(nombre);
    const lineaValor = detalles['línea'] || detalles['linea'] || producto?.['línea'] || producto?.linea || '';
    const lineaSlugRaw = aSlug(lineaValor);
    const lineaSlug = ALIAS_LINEA[lineaSlugRaw] || lineaSlugRaw;
    const maderaValor = detalles['madera'] || detalles['tipo-de-madera'] || '';
    const maderaSlug = aSlug(maderaValor);
    const nombreNorm = normalizar(nombre);
    const cajonesValor = normalizar(detalles['cajones'] || '');
    const tieneCajones = cajonesValor === 'si' || cajonesValor === 'sí' || /\bcajon(es)?\b/.test(nombreNorm);

    const sublineaSlug = (() => {
        for (const { keyword, slug } of KEYWORDS_SUBLINEA) {
            if (!nombreNorm.includes(normalizar(keyword))) continue;

            if (slug === 'americana' && tieneCajones) {
                return 'americana-con-cajones';
            }
            return slug;
        }
        return '';
    })();

    const tituloLineaMadera = (() => {
        let lineaTxt = lineaValor.trim().toUpperCase();

        if (sublineaSlug) {
            lineaTxt = sublineaSlug
                .split('-')
                .map(word => word.toUpperCase())
                .join(' ');
        }

        const maderaTxt = (maderaValor || '').trim().toUpperCase();

        if (lineaTxt && maderaTxt) return `${lineaTxt} - ${maderaTxt}`;
        if (lineaTxt) return lineaTxt;
        if (maderaTxt) return maderaTxt;
        return titulo;
    })();

    const mensajeDescripcion = (() => {
        if (!lineaSlug || !sublineaSlug || !maderaSlug) return '';

        const bloqueLinea = descripcionesData?.[lineaSlug];
        if (!Array.isArray(bloqueLinea)) return '';

        const sublineasAProbar = [sublineaSlug];
        if (sublineaSlug === 'americana-con-cajones') {
            sublineasAProbar.push('americana');
        }

        for (const subSlug of sublineasAProbar) {
            for (const item of bloqueLinea) {
                if (!item || typeof item !== 'object') continue;

                const claveSub = Object.keys(item).find(
                    (k) => aSlug(k) === subSlug
                );
                if (!claveSub) continue;

                const listaMaderas = item[claveSub];
                if (!Array.isArray(listaMaderas)) continue;

                const match = listaMaderas.find(
                    (m) =>
                        m &&
                        typeof m === 'object' &&
                        aSlug(m.madera || '') === maderaSlug
                );

                if (match?.mensaje) return match.mensaje;
            }
        }

        return '';
    })();

    return (
        <div className="pd-pg-description d-flex-column gap-10">
            <div className="d-flex-column gap-10 border-r-4 border-1-component padding-20">
                <p className="title font-bold">{tituloLineaMadera}</p>

                {mensajeDescripcion && (
                    <div className="pd-pg-dsp-mensaje">
                        <p className="text">{mensajeDescripcion}</p>
                    </div>
                )}
            </div>

            <div className={`description-tag d-flex-column border-r-4 border-1-component ${ seccionesAbiertas.descripcion ? '' : 'active' }`}>
                <div className="description-title d-flex-center-between gap-20"
                    onClick={() => toggleSeccion('descripcion')}
                    role="button"
                    aria-expanded={seccionesAbiertas.descripcion}
                >
                    <p className="title upperase font-bold uppercase">Descripción</p>

                    <span className='material-symbols-outlined'>keyboard_arrow_down</span>
                </div>

                <ul className="chr-list">
                    {Object.entries(detalles).map(([clave, valor]) => (
                        <li key={clave}>
                            <div className="d-flex gap-5">
                                <b className="color-black font-weight first-uppercase">
                                    {formatearEtiqueta(clave)}:
                                </b>
                                <p className="text first-uppercase">{valor}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Camas;
