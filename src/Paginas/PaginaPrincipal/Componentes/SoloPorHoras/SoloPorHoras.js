import { useEffect, useState } from 'react';
import ConteoRegresivo from '../../../../Componentes/ConteoRegresivo/ConteoRegresivo';
import { Producto } from '../../../../Componentes/Plantillas/Producto/Producto';
import { Horizontal } from '../../../../Componentes/Plantillas/Producto/Horizontal/Horizontal';

import './SoloPorHoras.css';

import '../../../../Componentes/Plantillas/Producto/Horizontal/Horizontal';
import '../../../../Componentes/Plantillas/Producto/Miniatura/Miniatura.css';

const truncate = (str, maxLength) => {
    if (!str) return '';
    return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
};

function SoloPorHoras() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const productosDeseados = ['K3215211N10', 'K3215211N11', 'K3215211N12'];

        fetch('/assets/json/manifest.json')
            .then(res => res.json())
            .then(manifest =>
                Promise.all(
                    manifest.files.map(fileUrl =>
                        fetch(fileUrl)
                            .then(res => res.json())
                            .then(json => json.productos || [])
                            .catch(() => [])
                    )
                )
            )
            .then(listaProductos => {
                const todos = listaProductos.flat();
                const filtrados = productosDeseados
                    .map(sku => todos.find(p => p.sku === sku))
                    .filter(Boolean);
                setProductos(filtrados);
            })
            .catch(err => console.error('Error:', err));
    }, []);

    const renderizarElementos = () => {
        const elementos = [];

        elementos.push(
            <li key="colchones">
                <a href='/ofertas/?categoria=colchones' className='product-card-miniature'>
                    <ul>
                        <li><img src='/assets/imagenes/productos/colchones/norole/king/1.jpg' alt='Colchones' /></li>
                        <li><img src='/assets/imagenes/productos/colchones/thameo-pocket/king/1.jpg' alt='Colchones' /></li>
                    </ul>
                    <p className='text'>Colchones</p>
                </a>
            </li>
        );

        elementos.push(
            <li key="sofas">
                <a href='/ofertas/?categoria=sofás' className='product-card-miniature product-card-miniature-2'>
                    <ul>
                        <li><img src='https://www.kamas.pe/assets/imagenes/productos/sofas/reclinables/3/1.jpg' alt='Sofás' /></li>
                        <li><img src='https://www.kamas.pe/assets/imagenes/productos/sofas/seccionales/9/2.jpg' alt='Sofás' /></li>
                    </ul>
                    <p className='text'>Sofás</p>
                </a>
            </li>
        );

        if (productos.length > 0) {
            elementos.push(
                <Producto key={`dinamico-1-${productos[0].sku}`} producto={productos[0]} truncate={truncate} />
            );
        }
        
        if (productos.length > 1) {
            elementos.push(
                <Horizontal key={`dinamico-2-${productos[0].sku}`} producto={productos[1]} truncate={truncate} />
            );
        }

        elementos.push(
            <li key="veladores">
                <a href='/ofertas/' className='product-card-miniature product-card-miniature-2'>
                    <ul>
                        <li><img src='/assets/imagenes/productos/complementos/veladores/otros-modelos/15/2.jpg' alt='Veladores' /></li>
                        <li><img src='/assets/imagenes/productos/complementos/veladores/otros-modelos/4/1.jpg' alt='Veladores' /></li>
                    </ul>
                    <p className='text'>Veladores</p>
                </a>
            </li>
        );

        elementos.push(
            <li key="cabeceras">
                <a href='/ofertas/' className='product-card-miniature'>
                    <ul>
                        <li><img src='/assets/imagenes/productos/cabeceras/queen/pedestales/americanas/brazos-rectos/emperatriz/3/1.jpg' alt='Cabeceras' /></li>
                        <li><img src='/assets/imagenes/productos/cabeceras/2-plazas/pedestales/coronas/brazos-rectos/corona/4/1.jpg' alt='Cabeceras' /></li>
                    </ul>
                    <p className='text'>Cabeceras</p>
                </a>
            </li>
        );

        if (productos.length > 2) {
            elementos.push(
                <Producto key={`dinamico-3-${productos[2].sku}`} producto={productos[2]} truncate={truncate} />
            );
        }

        return elementos;
    };

    return (
        <section className="block-container block-container-solo-por-horas">
            <div className="block-content block-content-solo-por-horas d-flex-column gap-20">
                <div className="block-title-container d-flex d-flex-center-between">
                    <h2 className="block-title text-left lowercase">¡¡ Por pocos días !!</h2>
                    <ConteoRegresivo />
                </div>

                <ul>
                    {renderizarElementos()}
                </ul>
            </div>
        </section>
    );
}

export default SoloPorHoras;
