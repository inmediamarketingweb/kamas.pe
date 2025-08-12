// import { useEffect, useState } from 'react';
// import ConteoRegresivo from '../../../../Componentes/ConteoRegresivo/ConteoRegresivo';
// import { Producto } from '../../../../Componentes/Plantillas/Producto/Producto';
// import { Horizontal } from '../../../../Componentes/Plantillas/Producto/Horizontal/Horizontal';

// import './SoloPorHoras.css';

// import '../../../../Componentes/Plantillas/Producto/Horizontal/Horizontal';
// import '../../../../Componentes/Plantillas/Producto/Miniatura/Miniatura.css';

// const truncate = (str, maxLength) => {
//     if (!str) return '';
//     return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
// };

// function SoloPorHoras() {
//     const [productos, setProductos] = useState([]);

//     useEffect(() => {
//         const productosDeseados = ['K324233N18', 'K412111N12', 'K324233N29'];

//         fetch('/assets/json/manifest.json')
//             .then(res => res.json())
//             .then(manifest =>
//                 Promise.all(
//                     manifest.files.map(fileUrl =>
//                         fetch(fileUrl)
//                             .then(res => res.json())
//                             .then(json => json.productos || [])
//                             .catch(() => [])
//                     )
//                 )
//             )
//             .then(listaProductos => {
//                 const todos = listaProductos.flat();
//                 const filtrados = productosDeseados
//                     .map(sku => todos.find(p => p.sku === sku))
//                     .filter(Boolean);
//                 setProductos(filtrados);
//             })
//             .catch(err => console.error('Error:', err));
//     }, []);

//     const renderizarElementos = () => {
//         const elementos = [];

//         elementos.push(
//             <li key="colchones">
//                 <a href='/ofertas/?categoria=colchones' className='product-card-miniature'>
//                     <ul>
//                         <li><img src='/assets/imagenes/productos/colchones/norole/1.jpg' alt='Colchones' /></li>
//                         <li><img src='/assets/imagenes/productos/colchones/thameo-pocket/1.jpg' alt='Colchones' /></li>
//                     </ul>
//                     <p className='text'>Colchones</p>
//                 </a>
//             </li>
//         );

//         elementos.push(
//             <li key="sofas">
//                 <a href='/ofertas/?categoria=sofás' className='product-card-miniature product-card-miniature-2'>
//                     <ul>
//                         <li><img src='https://www.kamas.pe/assets/imagenes/productos/sofas/reclinables/3/1.jpg' alt='Sofás' /></li>
//                         <li><img src='https://www.kamas.pe/assets/imagenes/productos/sofas/seccionales/9/2.jpg' alt='Sofás' /></li>
//                     </ul>
//                     <p className='text'>Sofás</p>
//                 </a>
//             </li>
//         );

//         if (productos.length > 0) {
//             elementos.push(
//                 <Producto key={`dinamico-1-${productos[0].sku}`} producto={productos[0]} truncate={truncate} />
//             );
//         }
        
//         if (productos.length > 1) {
//             elementos.push(
//                 <Horizontal key={`dinamico-2-${productos[0].sku}`} producto={productos[1]} truncate={truncate} />
//             );
//         }

//         elementos.push(
//             <li key="veladores">
//                 <a href='/ofertas/' className='product-card-miniature product-card-miniature-2'>
//                     <ul>
//                         <li><img src='/assets/imagenes/productos/complementos/veladores/otros-modelos/15/2.jpg' alt='Veladores' /></li>
//                         <li><img src='/assets/imagenes/productos/complementos/veladores/otros-modelos/4/1.jpg' alt='Veladores' /></li>
//                     </ul>
//                     <p className='text'>Veladores</p>
//                 </a>
//             </li>
//         );

//         elementos.push(
//             <li key="cabeceras">
//                 <a href='/ofertas/?categoria=cabeceras' className='product-card-miniature'>
//                     <ul>
//                         <li><img src='/assets/imagenes/productos/cabeceras/queen/pedestales/americanas/brazos-rectos/emperatriz/3/1.jpg' alt='Cabeceras' /></li>
//                         <li><img src='/assets/imagenes/productos/cabeceras/2-plazas/pedestales/coronas/brazos-rectos/corona/4/1.jpg' alt='Cabeceras' /></li>
//                     </ul>
//                     <p className='text'>Cabeceras</p>
//                 </a>
//             </li>
//         );

//         if (productos.length > 2) {
//             elementos.push(
//                 <Producto key={`dinamico-3-${productos[2].sku}`} producto={productos[2]} truncate={truncate} />
//             );
//         }

//         return elementos;
//     };

//     return (
//         <section className="block-container block-container-solo-por-horas">
//             <div className="block-content block-content-solo-por-horas d-flex-column gap-20">
//                 <div className="block-title-container d-flex d-flex-center-between">
//                     <div className='d-flex-column gap-5'>
//                         <h2 className="block-title text-left lowercase">¡ Por pocos días 🔥 !</h2>
//                         <p className='color-white'>Ofertas invatibles en productos seleccionados, solo en Kamas</p>
//                         <a href='/ofertas/' className='margin-right w-auto button-link button-link-5'>
//                             <p className='button-link-text color-white'>Ver todas las ofertas</p>
//                         </a>
//                     </div>

//                     <ConteoRegresivo />
//                 </div>

//                 <ul className='solo-por-horas-productos'>
//                     {renderizarElementos()}
//                 </ul>
//             </div>
//         </section>
//     );
// }

// export default SoloPorHoras;

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
        // Primero cargamos los SKUs de ofertas.json
        fetch('/assets/json/ofertas.json')
            .then(res => res.json())
            .then(skus => {
                // Seleccionamos 3 SKUs aleatorios
                const skusAleatorios = [...skus]
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 3);

                // Ahora buscamos la info completa de estos productos en manifest.json
                return fetch('/assets/json/manifest.json')
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
                        const productosFiltrados = skusAleatorios
                            .map(sku => todos.find(p => p.sku === sku))
                            .filter(Boolean);
                        setProductos(productosFiltrados);
                    });
            })
            .catch(err => console.error('Error:', err));
    }, []);

    const renderizarElementos = () => {
        const elementos = [];

        elementos.push(
            <li key="colchones">
                <a href='/ofertas/?categoria=colchones' className='product-card-miniature'>
                    <ul>
                        <li><img src='/assets/imagenes/productos/colchones/norole/1.jpg' alt='Colchones' /></li>
                        <li><img src='/assets/imagenes/productos/colchones/thameo-pocket/1.jpg' alt='Colchones' /></li>
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
                <Horizontal key={`dinamico-2-${productos[1].sku}`} producto={productos[1]} truncate={truncate} />
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
                <a href='/ofertas/?categoria=cabeceras' className='product-card-miniature'>
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

    return(
        <section className="block-container block-container-solo-por-horas">
            <div className="block-content block-content-solo-por-horas d-flex-column gap-20">
                <div className="block-title-container d-flex d-flex-center-between">
                    <div className='d-flex-column gap-5'>
                        <h2 className="block-title text-left lowercase">Por pocos días 🔥</h2>
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
