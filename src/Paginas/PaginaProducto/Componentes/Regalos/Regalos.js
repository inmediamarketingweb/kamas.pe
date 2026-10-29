import { useEffect, useState } from "react";

import './Regalos.css';

function Regalos({ producto }) {
    const [regalosDormitorio, setRegalosDormitorio] = useState(null);
    const [cargando, setCargando] = useState(false);
    const categoria = producto?.['categoría'] || producto?.categoria || '';
    const esDormitorio = categoria.toLowerCase() === 'dormitorios';
    const esColchon = categoria.toLowerCase() === 'colchones';

    const normalizar = (str) => {
        if (!str) return '';
        return String(str)
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .trim();
    };

    const obtenerInfoColchon = (prod) => {
        let tamaño = prod?.tamaño || prod?.tamano || null;
        let modelo = prod?.modelo || null;

        if ((!tamaño || !modelo) && Array.isArray(prod?.descripcion)) {
            for (const item of prod.descripcion) {
                if (!item || typeof item !== 'object') continue;
                if (!tamaño) tamaño = item.tamaño || item.tamano || null;
                if (!modelo) {
                    modelo = item['modelo-de-colchón'] || item['modelo-de-colchon'] || item.modelo || null;
                }
                if (tamaño && modelo) break;
            }
        }

        return {
            tamaño: normalizar(tamaño),
            modelo: normalizar(modelo),
        };
    };

    useEffect(() => {
        if (!esDormitorio) return;

        let cancelado = false;

        const buscarRegalosColchon = async () => {
            setCargando(true);
            try {
                const { tamaño, modelo } = obtenerInfoColchon(producto);
                if (!tamaño || !modelo) {
                    if (!cancelado) setRegalosDormitorio([]);
                    return;
                }

                const indexResponse = await fetch('/assets/json/manifest.json');
                const indexData = await indexResponse.json();
                const archivos = indexData.files || [];

                let colchonEncontrado = null;

                for (const archivo of archivos) {
                    try {
                        const data = await fetch(archivo).then(r => r.json());
                        if (!data || !Array.isArray(data.productos)) continue;

                        const colchones = data.productos.filter(
                            p => normalizar(p['categoría'] || p.categoria) === 'colchones'
                        );
                        if (colchones.length === 0) continue;

                        colchonEncontrado = colchones.find(c => {
                            const modeloC = normalizar(
                                c['modelo-de-colchón']
                                || c['modelo-de-colchon']
                                || c.modelo
                            );

                            const tamañoC = normalizar(
                                c.tamaño
                                || c.tamano
                                || (c.nombre && c.nombre.match(/1 plaza y media|2 plazas|1 plaza/i)?.[0])
                            );
                            return modeloC === modelo && tamañoC === tamaño;
                        });

                        if (colchonEncontrado) break;
                    } catch {
                        continue;
                    }
                }

                if (!cancelado) {
                    setRegalosDormitorio(colchonEncontrado?.regalos || []);
                }
            } catch (err) {
                console.error("Error buscando regalos del colchón:", err);
                if (!cancelado) setRegalosDormitorio([]);
            } finally {
                if (!cancelado) setCargando(false);
            }
        };

        buscarRegalosColchon();

        return () => {
            cancelado = true;
        };
    }, [producto, esDormitorio]);

    const listaDeRegalos = (() => {
        if (esDormitorio) return regalosDormitorio || [];
        if (esColchon) return Array.isArray(producto?.regalos) ? producto.regalos : [];
        return Array.isArray(producto?.regalos) ? producto.regalos : [];
    })();

    if (cargando) return null;
    if (!Array.isArray(listaDeRegalos) || listaDeRegalos.length === 0) return null;

    const obtenerRutaImagen = (regalo) => {
        if (!regalo) return null;

        let foto = null;
        if (typeof regalo === 'string') {
            const normalizado = normalizar(regalo);
            if (normalizado === '1 almohada') foto = 'almohada.webp';
            else if (normalizado === '2 almohadas') foto = '2-almohadas.webp';
            else if (normalizado === '4 almohadas') foto = '4-almohadas.webp';
        } else if (typeof regalo === 'object') {
            foto = regalo.foto || null;
        }

        if (!foto) return null;
        if (foto.startsWith('/') || foto.startsWith('http')) return foto;
        return `/assets/imagenes/productos/regalos/${foto}`;
    };

    const obtenerTexto = (regalo) => {
        if (!regalo) return '';
        if (typeof regalo === 'string') return regalo;
        if (typeof regalo === 'object' && typeof regalo.texto === 'string') return regalo.texto;
        return '';
    };

    const handleImageError = (e) => {
        e.target.style.display = 'none';
    };

    return (
        <div className="d-flex-column gap-10 product-page-gifts">
            <div className="d-flex-center-left margin-right gap-5">
                <p className="color-color-1 title">Te regalamos:</p>
            </div>

            <ul>
                {listaDeRegalos.map((regalo, index) => {
                    const rutaImagen = obtenerRutaImagen(regalo);
                    const texto = obtenerTexto(regalo);

                    return (
                        <li key={`${texto}-${index}`}>
                            {rutaImagen && (
                                <img loading="lazy" src={rutaImagen} alt={texto} onError={handleImageError} />
                            )}
                            <p className="text">{texto}</p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Regalos;
