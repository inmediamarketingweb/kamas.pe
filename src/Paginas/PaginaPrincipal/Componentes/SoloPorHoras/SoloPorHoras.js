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

function SoloPorHoras(){
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        fetch('/assets/json/ofertas.json')
            .then(res => res.json())
            .then(skus => {
                const skusAleatorios = [...skus]
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 3);

                return fetch('/assets/json/manifest.json')
                    .then(res => res.json())
                    .then(manifest =>
                        Promise.all(
                            manifest.files.map(fileUrl => fetch(fileUrl).then(res => res.json()).then(json => json.productos || []).catch(() => [])
                            )
                        )
                    )
                    .then(listaProductos => {
                        const todos = listaProductos.flat();
                        const productosFiltrados = skusAleatorios.map(sku => todos.find(p => p.sku === sku)).filter(Boolean);
                        setProductos(productosFiltrados);
                    });
            })
            .catch(err => console.error('Error:', err));
    }, []);

    const renderizarElementos = () => {
        const elementos = [];

        if (productos.length > 0) {
            elementos.push(
                <Producto key={`dinamico-1-${productos[0].sku}`} producto={productos[0]} truncate={truncate}  />
            );
        }

        elementos.push(
            <li key="colchones">
                <a href='/ofertas/?categoria=colchones' title='Colchones | Kamas' className='product-card-miniature'>
                    <ul>
                        <li><img src='/assets/imagenes/paginas/pagina-principal/solo-por-horas/colchones-1.webp' alt='Colchones | Kamas'/></li>
                        <li><img src='/assets/imagenes/paginas/pagina-principal/solo-por-horas/colchones-2.webp' alt='Colchones | Kamas'/></li>
                    </ul>
                    <p className='text'>Colchones</p>
                </a>
            </li>
        );

        elementos.push(
            <li key="sofas">
                <a href='/ofertas/?categoria=sofás' title='Sofás | Kamas' className='product-card-miniature product-card-miniature-2'>
                    <ul>
                        <li><img src='/assets/imagenes/paginas/pagina-principal/solo-por-horas/sofas-1.webp' alt='Sofás | Kamas'/></li>
                        <li><img src='/assets/imagenes/paginas/pagina-principal/solo-por-horas/sofas-2.webp' alt='Sofás | Kamas'/></li>
                    </ul>
                    <p className='text'>Sofás</p>
                </a>
            </li>
        );
        
        if (productos.length > 1) {
            elementos.push(
                <Horizontal key={`dinamico-2-${productos[1].sku}`} producto={productos[1]} truncate={truncate} />
            );
        }

        elementos.push(
            <li key="veladores">
                <a href='/ofertas/?categoria=complementos&detalles-del-producto=%7B"subcategoría"%3A"Veladores"%7D' className='product-card-miniature product-card-miniature-2'>
                    <ul>
                        <li><img src='/assets/imagenes/paginas/pagina-principal/solo-por-horas/veladores-1.webp' alt='Veladores | Kamas'/></li>
                        <li><img src='/assets/imagenes/paginas/pagina-principal/solo-por-horas/veladores-2.webp' alt='Veladores | Kamas'/></li>
                    </ul>
                    <p className='text'>Veladores</p>
                </a>
            </li>
        );

        elementos.push(
            <li key="cabeceras">
                <a href='/ofertas/?categoria=cabeceras' className='product-card-miniature'>
                    <ul>
                        <li><img src='/assets/imagenes/paginas/pagina-principal/solo-por-horas/cabeceras-1.webp' alt='Cabeceras | Kamas'/></li>
                        <li><img src='/assets/imagenes/paginas/pagina-principal/solo-por-horas/cabeceras-2.webp' alt='Cabeceras | Kamas'/></li>
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

    return(
        <section className="block-container block-container-solo-por-horas">
            <div className="block-content block-content-solo-por-horas d-flex-column gap-20">
                <div className="block-title-container d-flex d-flex-center-between">
                    <div className='d-flex-column gap-5'>
                        <h2 className="block-title text-left text-transform-unset">Por pocos días 🔥</h2>
                        <p className='color-white'>Ofertas invatibles en productos seleccionados, solo aquí en Kamas</p>
                        <a href='/ofertas/' className='margin-right w-auto button-link button-link-5'>
                            <p className='button-link-text color-white'>Ver todas las ofertas</p>
                        </a>
                    </div>

                    <ConteoRegresivo />
                </div>

                <ul className='solo-por-horas-productos'>
                    {renderizarElementos()}
                </ul>
            </div>
        </section>
    );
}

export default SoloPorHoras;
