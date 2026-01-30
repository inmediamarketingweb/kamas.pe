import { useState, useEffect } from 'react';

import { Producto } from '../../../../Componentes/Plantillas/Producto/Producto';
import SpinnerLoading from '../../../../Componentes/SpinnerLoading/SpinnerLoading';

export default function MasProductos({ categoriaActual }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    useEffect(() => {
        async function fetchRandomProducts(){
            try {
                const manifestRes = await fetch('/assets/json/manifest.json');
                const manifest = await manifestRes.json();
                const files = manifest.files;

                const allData = await Promise.all(
                    files.map(async (filePath) => {
                        const res = await fetch(filePath);
                        return res.json();
                    })
                );

                const categoryProducts = allData.reduce((acc, data) => {
                    if (Array.isArray(data.productos)) {
                        const matches = data.productos.filter(
                            (p) => p.categoria === categoriaActual
                        );
                        return acc.concat(matches);
                    }
                    return acc;
                }, []);

                if (!categoryProducts.length) {
                    setProducts([]);
                    return;
                }

                for (let i = categoryProducts.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [categoryProducts[i], categoryProducts[j]] = [
                        categoryProducts[j],
                        categoryProducts[i]
                    ];
                }

                const selected = categoryProducts.slice(0, 20);

                setProducts(selected);
            } catch (err) {
                console.error('Error al cargar:', err);
            } finally {
                setLoading(false);
            }
        }

        if (categoriaActual) {
            setLoading(true);
            fetchRandomProducts();
        } else {
            setLoading(false);
        }
    }, [categoriaActual, refreshTrigger]);

    const handleRefresh = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    if (loading) {
        return <SpinnerLoading />;
    }

    const truncate = (str, maxLength) => str.length <= maxLength ? str : str.slice(0, maxLength) + '...';

    return (
        <div className='block-container pagina-producto-mas-productos-block-container'>
            <div className='block-content'>
                <div className='d-flex-column gap-10'>
                    <div className="product-page-more-products-container d-flex-column gap-10">
                        <p className='block-title w-auto margin-right'>Productos relacionados</p>

                        <nav className="product-page-more-products-content">
                            <ul className='d-grid-5-3-2fr gap-10'>
                                {products.map((producto) => (
                                    <Producto key={producto.sku} producto={producto} truncate={truncate} />
                                ))}
                            </ul>
                        </nav>
                    </div>

                    <button onClick={handleRefresh} className='button-link button-link-2 margin-left'>
                        <p className='button-link-text'>Ver más</p>
                        <span className="material-symbols-outlined">cached</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
