import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import './Galeria.css';

const TARGET_ROW_HEIGHT = 420;
const GAP = 8;

function Galeria({ categoriaForzada = null, titulo = null, descripcionSeo = null }){
    const { categoria: categoriaUrl } = useParams();
    const categoria = categoriaForzada || categoriaUrl || null;
    const [galeria, setGaleria] = useState([]);
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selected, setSelected] = useState(null);
    const [containerWidth, setContainerWidth] = useState(0);
    const containerRef = useRef(null);

    useEffect(() => {
        if (!categoria) {
            setError('Categoría no especificada.');
            setLoading(false);
            return;
        }

        let cancelado = false;
        setLoading(true);
        setError(null);

        const fetchGaleria = async () => {
            try {
                const url = `/assets/json/categorias/${categoria}/galeria.json`;
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(
                        `No se encontró la galería para "${categoria}" (${response.status})`
                    );
                }

                const data = await response.json();
                const lista = Array.isArray(data?.galeria) ? data.galeria : [];

                if (!cancelado) setGaleria(lista);
            } catch (err) {
                if (!cancelado) setError(err.message);
            } finally {
                if (!cancelado) setLoading(false);
            }
        };

        fetchGaleria();
        return () => {
            cancelado = true;
        };
    }, [categoria]);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') setSelected(null);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        let timeoutId = null;
        const update = () => setContainerWidth(el.clientWidth);

        const onResize = () => {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(update, 150);
        };

        update();
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [loading]);

    useEffect(() => {
        if (!galeria.length || !containerWidth) {
            setRows([]);
            return;
        }

        let cancelado = false;

        const loadImages = galeria.map((item) => {
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = () =>
                    resolve({
                        ...item,
                        ratio: img.naturalWidth / img.naturalHeight,
                    });
                img.onerror = () => resolve({ ...item, ratio: 1 });
                img.src = item.image;
            });
        });

        Promise.all(loadImages).then((items) => {
            if (cancelado) return;

            const computedRows = [];
            let currentRow = [];
            let currentRowRatioSum = 0;

            items.forEach((item, index) => {
                currentRow.push(item);
                currentRowRatioSum += item.ratio;

                const gapsWidth = GAP * (currentRow.length - 1);
                const availableWidth = containerWidth - gapsWidth;
                const idealRowHeight = availableWidth / currentRowRatioSum;
                const esUltimo = index === items.length - 1;

                if (idealRowHeight <= TARGET_ROW_HEIGHT || esUltimo) {
                    computedRows.push({
                        items: [...currentRow],
                        height: idealRowHeight,
                    });
                    currentRow = [];
                    currentRowRatioSum = 0;
                }
            });

            setRows(computedRows);
        });

        return () => {
            cancelado = true;
        };
    }, [galeria, containerWidth]);

    const openModal = (item) => setSelected(item);
    const closeModal = () => setSelected(null);
    const formatear = (slug = '') => slug.split('-').map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');

    const tituloFinal = titulo || `Galería de ${formatear(categoria || '')}`;
    const descripcionFinal = descripcionSeo || `Explora la galería de ${formatear(categoria || '')} en Kamas.`;
    const canonical = `/productos/${categoria}/galeria/`;

    return (
        <>
            <Helmet>
                <title>{tituloFinal} | Kamas</title>
                <meta name="description" content={descripcionFinal} />
                <link rel="canonical" href={`https://kamas.pe${canonical}`} />
            </Helmet>

            <main className='main padding-10'>
                <div className='block-container' ref={containerRef}>
                    <div className='block-content'>
                        {loading && <p>Cargando galería...</p>}

                        {error && !loading && (
                            <div className="gallery-empty">
                                <p className="text">{error}</p>
                                <Link to={`/productos/${categoria}/`} className="button-link button-link-2">
                                    <p className="button-link-text">Volver a {formatear(categoria || 'productos')}</p>
                                </Link>
                            </div>
                        )}

                        {!loading && !error && galeria.length === 0 && (
                            <p className="text">No hay imágenes en esta galería.</p>
                        )}

                        {!loading && !error && rows.length > 0 && (
                            <div className='gallery-main'>
                                {rows.map((row, rowIndex) => (
                                    <div key={rowIndex} className='gallery-row' style={{ height: `${row.height}px` }}>
                                        {row.items.map((item, i) => (
                                            <div key={i} className='gallery-item' style={{ flexGrow: item.ratio, flexBasis: 0, }} onClick={() => openModal(item)}>
                                                <img src={item.image} alt={ item['image-alt'] || item['product-name'] || '' } loading="lazy" />
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <div className={`gallery-pd-pg-layer ${selected ? 'active' : ''}`} onClick={closeModal}></div>

            <div className={`gallery-pd-pg-content ${selected ? 'active' : ''}`}>
                <span className="material-symbols-outlined" onClick={closeModal} style={{ cursor: 'pointer' }} >close</span>

                {selected && (
                    <>
                        <img src={selected.image} alt={ selected['image-alt'] || selected['product-name'] || '' }/>
                        <p className='text'>{selected['product-name']}</p>
                        <a href={selected['image-link'] || '/'} className='button-link button-link-2'>
                            <p className='button-link-text'>Ver producto</p>
                        </a>
                    </>
                )}
            </div>
        </>
    );
}

export default Galeria;
