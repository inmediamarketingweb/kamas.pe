import { useEffect, useState } from 'react';

import { Producto } from '../../../../Componentes/Plantillas/Producto/Producto';

import './UltimasNovedades.css';

function UltimasNovedades() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const skusDeseados = [
            'K147N10',
            'K234223N11',
            'K324236N92',
            'K324235N42',
            'K334233N12',
            'K223123N13',
            'K41212N16',
            'K6122N10',
            'K712N11',
            'K77112N10'
        ];

        fetch('/assets/json/manifest.json').then(res => res.json()).then(
            manifest => Promise.all(
                manifest.files.map(
                    fileUrl => fetch(fileUrl).then(res => res.json()).then(jsonData => {
                        const match = fileUrl.match(/\/assets\/json\/categorias\/([^/]+)\/sub-categorias\//);
                        const categoria = match ? match[1] : null;

                        if (Array.isArray(jsonData.productos) && categoria) {
                            jsonData.productos = jsonData.productos.map(producto => ({
                                ...producto,
                                categoria,
                            }));
                        }

                        return jsonData.productos || [];
                    }).catch(err => {
                        console.error(`Error cargando ${fileUrl}:`, err);
                        return [];
                    })
                )
            )
        ).then(listaDeProductos => {
            const todosLosProductos = listaDeProductos.flat();

            const productosFiltrados = skusDeseados
                .map(sku => todosLosProductos.find(p => p.sku === sku))
                .filter(Boolean);

            setProductos(productosFiltrados);
        }).catch(error => console.error('Error al cargar el manifest o los JSON:', error));
    }, []);

    const truncate = (str, maxLength) => {
        if (!str) return '';
        return str.length <= maxLength ? str : str.slice(0, maxLength) + '...';
    };

    return(
        <div className="block-container ultimas-novedades-block-container">
            <section className="block-content ultimas-novedades-block-content">
                <div className="block-title-container d-flex-column">
                    <h2 className="block-title w-auto margin-right">Últimas novedades</h2>

                    <a href='/productos/' className='button-link button-link-5 margin-right'>
                        <p className='button-link-text'>Ver todos los productos</p>
                    </a>
                </div>

                <div className="ultimas-novedades">
                    <ul className="ultimas-novedades-products">
                        {productos.map(producto => {
                            return(
                                <Producto key={producto.sku} producto={producto} truncate={truncate}/>
                            );
                        })}
                    </ul>
                </div>
            </section>
        </div>
    );
}

export default UltimasNovedades;

