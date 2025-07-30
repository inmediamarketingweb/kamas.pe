import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import './Productos.css';

import Header from '../../Componentes/Header/Header';

import SpinnerLoading from '../../Componentes/SpinnerLoading/SpinnerLoading';
import {Producto} from '../../Componentes/Plantillas/Producto/Producto';

import Footer from '../../Componentes/Footer/Footer';

function Productos(){
    const [categorias, setCategorias] = useState([]);
    const [productosPorCategoria, setProductosPorCategoria] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [allProducts, setAllProducts] = useState([]);

    const truncate = (str, maxLength) => {
        if (str.length <= maxLength) return str;
        return str.substring(0, maxLength) + '...';
    };

    const normalize = (str) => {
        return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
    };

    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    useEffect(() => {
        const loadAllData = async () => {
            try{
                const manifestResponse = await fetch('/assets/json/manifest.json');
                if (!manifestResponse.ok) throw new Error('Error al cargar manifest');
                const manifestData = await manifestResponse.json();

                const productFiles = manifestData.files;
                const products = [];

                for (const filePath of productFiles) {
                    try {
                        const response = await fetch(filePath);
                        if (!response.ok) continue;
                        const data = await response.json();
                        if (data.productos && Array.isArray(data.productos)) {
                            const productosConSku = data.productos.map(p => ({
                                ...p,
                                sku: p.sku
                            }));
                            products.push(...productosConSku);
                        }
                    } catch (error) {
                        console.error(`Error cargando ${filePath}:`, error);
                    }
                }

                setAllProducts(products);

                const categoriasResponse = await fetch('/assets/json/categorias/categorias.json');
                if (!categoriasResponse.ok) throw new Error('Error al cargar categorías');
                const categoriasData = await categoriasResponse.json();

                const categoriasFiltradas = categoriasData.categorias.filter(
                    cat => cat.id !== 8 && cat.subCategorias
                );

                setCategorias(categoriasFiltradas);

                const productosMap = {};

                for (const categoria of categoriasFiltradas) {
                    const categoriaNormalizada = normalize(categoria.categoria);
                    const productosCategoria = products.filter(
                        p => normalize(p.categoria) === categoriaNormalizada
                    );
                    productosMap[categoria.id] = productosCategoria;
                }

                setProductosPorCategoria(productosMap);
            } catch (err) {
                setError(err.message);
                console.error('Error general:', err);
            } finally {
                setIsLoading(false);
            }
        };

        loadAllData();
    }, []);

    if (isLoading) {
        return (
            <SpinnerLoading/>
        );
    }

    if (error) {
        return(
            <div className="error-container">
                <div className="error-icon">!</div>
                <h3>Error al cargar los productos</h3>
                <p>{error}</p>
                <button onClick={() => window.location.reload()}>Reintentar</button>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>Productos | Kamas</title>
                <meta name="description" content="Contamos con una amplia variedad de productos." />
            </Helmet>

            <Header/>

            <main>
                <div className='block-container'>
                    <section className='block-content'>
                        <div className='block-title-container'>
                            <h1 className='block-title'>Productos</h1>
                        </div>

                        <div className='d-flex-column gap-20'>
                            {categorias.length === 0 ? (
                                <div className="no-products">
                                    <span className="material-icons">inventory_2</span>
                                    <h3>No se encontraron productos</h3>
                                    <p>Por favor, inténtalo más tarde</p>
                                </div>
                            ) : (
                                <ul className="d-flex-column gap-20">
                                    {categorias.map((categoria) => {
                                        const productos = productosPorCategoria[categoria.id] || [];
                                        const productosAleatorios = shuffleArray([...productos]).slice(0, 8);

                                        return (
                                            <li key={categoria.sku} className="products-page-target">
                                                <div className='d-flex-column gap-20'>
                                                    <div className='d-flex-column gap-10'>
                                                        <p className='title'>{categoria.categoria}</p>
                                                        <p className='text'>{categoria.menuMensaje[0].text}</p>
                                                    </div>

                                                    <div className='d-flex gap-10'>
                                                        <a href='/contacto/' className='button-link button-link-3'>
                                                            <span className="material-icons">store</span>
                                                            <p className='button-link-text'>Al por mayor</p>
                                                        </a>

                                                        <a href={categoria.ruta} className='button-link button-link-2'>
                                                            <p className='button-link-text'>Ver todo</p>
                                                            <span className="material-icons">arrow_forward</span>
                                                        </a>
                                                    </div>
                                                </div>

                                                <div className='products-page-target-products'>
                                                    {productosAleatorios.length > 0 ? (
                                                        <div>
                                                            <ul className='d-flex gap-10'>
                                                                {productosAleatorios.map((producto) => (
                                                                    <Producto key={producto.sku} producto={producto} truncate={truncate} />
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ) : (
                                                        <div className="no-products-categoria">
                                                            <span className="material-icons">inventory_2</span>
                                                            <p>Próximamente más productos en esta categoría</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                    </section>
                </div>
            </main>

            <Footer/>
        </>
    );
}

export default Productos;
