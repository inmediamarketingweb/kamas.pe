import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

import NoProducto from '../../Paginas/NoProducto/NoProducto';
import SpinnerLoading from '../../Componentes/SpinnerLoading/SpinnerLoading';
import Jerarquia from './Componentes/Jerarquia/Jerarquia';
import Sku from './Componentes/Sku/Sku';
import Imagenes from './Componentes/Imagenes/Imagenes';
import Regalos from './Componentes/Regalos/Regalos';
import Resumen from './Componentes/Resumen/Resumen';
import Video from './Componentes/Video/Video';
import Medidas from './Componentes/Medidas/Medidas';
import Beneficios from './Componentes/Beneficios/Beneficios';
import Envios from './Componentes/Envios/Envios';
import TiposDeEnvio from './Componentes/TiposDeEnvio/TiposDeEnvio';
import WhatsApp from './Componentes/WhatsApp/WhatsApp';
import Descripcion from './Componentes/Descripcion/Descripcion';

import MasProductos from './Componentes/MasProductos/MasProductos';

import './PaginaProducto.css';

function PaginaProducto(){
    const [shippingInfo, setShippingInfo] = useState(null);
    const [shippingOptions, setShippingOptions] = useState([]);
    const [selectedShipping, setSelectedShipping] = useState({ tipo: null, precio: null });
    const location = useLocation();
    const [producto, setProducto] = useState(null);
    const [error, setError] = useState(false);
    const [imagenes, setImagenes] = useState([]);
    const [selectedColor, setSelectedColor] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const [userName, setUserName] = useState(
        typeof window !== 'undefined' ? localStorage.getItem('nombre') || '' : ''
    );

    useEffect(() => {
        const fetchProducto = async () => {
            try{
                const categorias = ["colchones", "camas-box-tarimas", "dormitorios", "camas-funcionales", "cabeceras", "sofas", "complementos"];
                let productoEncontrado = null;

                for (const categoria of categorias){
                    const subcategorias = await fetch(`/assets/json/categorias/${categoria}/sub-categorias/sub-categorias.json`)
                        .then(response => response.json())
                        .catch(() => ({ subcategorias: [] }));

                    for (const subcat of subcategorias.subcategorias || []){
                        const subcatNombre = subcat.subcategoria.toLowerCase().replace(/\s+/g, "-");
                        const jsonPath = `/assets/json/categorias/${categoria}/sub-categorias/${subcatNombre}.json`;

                        const data = await fetch(jsonPath).then(response => response.json()).catch(() => null);

                        if (data && data.productos){
                            const prod = data.productos.find(p => p.ruta === location.pathname);
                            if (prod) {
                                productoEncontrado = prod;
                                break;
                            }
                        }
                    }

                    if (productoEncontrado) break;
                }

                if (productoEncontrado) {
                    setProducto(productoEncontrado);
                    cargarImagenes(productoEncontrado.fotos);
                } else {
                    setError(true);
                }
            } catch (error) {
                console.error("Error al buscar el producto:", error);
                setError(true);
            }
        };

        const cargarImagenes = (carpetaFotos) => {
            const imgs = [];
            for (let i = 1; i <= 10; i++){
                const path = `${carpetaFotos}${i}.jpg`;
                const img = new Image();
                img.src = path;
                img.onload = () => {
                    imgs.push(path);
                    setImagenes([...imgs]);
                };
            }
        };

        fetchProducto();

    }, [location.pathname]);

    useEffect(() => {
        if (producto){
            document.title = producto.nombre;
        }
    }, [producto]);

    useEffect(() => {
        const handleStorageChange = () => {
            setUserName(localStorage.getItem('nombre') || '');
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    if (error){
        return(
            <NoProducto/>
        )
    }

    if (!producto){
        return(
            <SpinnerLoading/>
        );
    }

    const handleContinuarClick = (e) => {
        if(!selectedShipping.tipo){
            e.preventDefault();
        }
    };

    const handleRemove = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };

    const handleAdd = () => {
        if (quantity < 10) {
            setQuantity(quantity + 1);
        }
    };

    const cleanPrice = (price) => {
        if (typeof price === 'number') return price;

        const cleaned = price.toString()
            .replace('S/.', '')
            .replace(/,/g, '')
            .trim();
        
        return parseFloat(cleaned) || 0;
    };

    const getValidUntilDate = () => {
        const date = new Date();
        date.setFullYear(date.getFullYear() + 1);
        return date.toISOString().split('T')[0];
    };

    const productSchema = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": producto.nombre,
        "image": [
            `https://kamas.pe${producto.fotos}1.jpg`
        ],
        "description": producto["resumen-del-producto"].map(d => Object.values(d)[0]).join(' – '),
        "sku": producto.sku,
        "brand": {
            "@type": "Brand",
            "name": "Kamas"
        },
        "offers": {
            "@type": "Offer",
            "url": `https://kamas.pe${producto.ruta}`,
            "priceCurrency": "PEN",
            "price": cleanPrice(producto.precioVenta),
            "priceValidUntil": getValidUntilDate(),
            "itemCondition": "https://schema.org/NewCondition",
            "availability": producto.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
        }
    };

    return(
        <>
            <Helmet>
                <title>{producto.nombre}</title>
                <meta name="description" content={producto.nombre}/>

                <link rel="preload" as="image" href={`https://kamas.pe${producto.fotos}1.jpg`} />

                <meta property="og:image" content={`https://kamas.pe${producto.fotos}1.jpg`}/>
                <meta property="og:title" content={producto.nombre}/>
                <meta property="og:site_name" content={producto.nombre}/>
                <meta property="og:description" content={producto.nombre}/>
                <meta property="og:type" content="website"/>
                <meta property="og:url" content={`https://kamas.pe${producto.ruta}`}/>
                <link rel="canonical" href={`https://kamas.pe${producto.ruta}`} />

                <script type="application/ld+json">{JSON.stringify(productSchema)}</script>
            </Helmet>

            <main className='pagina-producto-main'>
                <div className='block-container product-page-block-container'>
                    <section className='block-content product-page-block-content'>
                        <Jerarquia producto={producto} />

                        <div className='product-page-container'>
                            <div className='product-page-target product-page-target-1'>
                                <Imagenes imagenes={imagenes} producto={producto} onSelectColor={setSelectedColor} />
                            </div>

                            <div className='product-page-target product-page-target-2 d-flex-column gap-20'>
                                <div className='product-page-top-info'>
                                    <p className='product-page-category'>{producto.categoria}</p>
                                    <h1 className='product-page-name'>{producto.nombre}</h1>
                                    <Sku producto={producto} />
                                </div>

                                <div className='d-grid-2-1fr gap-20'>
                                    <div className='d-flex-column gap-20'>
                                        <div className='page-product-prices'>
                                            <p className='page-product-normal-price'>Antes: S/.{producto.precioNormal}</p>
                                            <p className='page-product-sale-price'>Ahora: S/.{producto.precioVenta}</p>
                                        </div>

                                        <Regalos producto={producto} />

                                        <div className='d-grid-2-1fr gap-20'>
                                            <Resumen producto={producto} />
                                            <Medidas producto={producto} />
                                        </div>

                                        <Video producto={producto} />

                                        <div className='d-flex-column'>
                                            <div className='d-flex-start gap-5'>
                                                <span className='color-red'>*</span>
                                                <p className='text font-14'>Realizamos envios inmediatos a provincia</p>
                                            </div>
                                            <div className='d-flex-start gap-5'>
                                                <span className='color-red'>*</span>
                                                <p className='text font-14'>Entregas el mismo día para Lima y Callao</p>
                                            </div>
                                        </div>

                                        <Beneficios/>
                                    </div>

                                    <div className='d-flex-column gap-20'>
                                        <Envios producto={producto} onConfirm={(data) => {
                                            setShippingInfo(data); setShippingOptions(data.shippingOptions);

                                            if (data.shippingOptions.length === 1) {setSelectedShipping({
                                                    tipo: data.shippingOptions[0].tipo,
                                                    precio: data.shippingOptions[0].precio
                                                });
                                            }
                                        }}/>

                                        <TiposDeEnvio shippingOptions={shippingOptions} provincia={shippingInfo?.locationData?.provincia || ''} distrito={shippingInfo?.locationData?.distrito || ''} hasAgency={shippingInfo?.hasAgency} selectedTipo={selectedShipping.tipo} onSelect={(tipo, precio) => setSelectedShipping({ tipo, precio })} />

                                        <div className='product-page-user-name-container d-flex-column gap-5'>
                                            <p className='text'><b className='color-red'>*</b> Nombres</p>
                                            <input type='text' placeholder='Nombres' className='product-page-user-name' value={userName}onChange={(e) => {setUserName(e.target.value);localStorage.setItem('nombre', e.target.value);}} />
                                        </div>

                                        <div className='d-flex-column gap-5'>
                                            <p className='title text'>Detalles:</p>

                                            {!selectedColor ? (
                                                <p className='d-flex gap-5'><b className='color-red'>*</b>Sin variación de color</p>
                                            ) : (
                                                <div className='d-flex-column gap-5'>
                                                    <p className='bold color-black d-flex gap-5'><b className='color-red'>*</b>Color seleccionado:</p>
                                                    <div className='d-flex-center-left gap-5'>
                                                        <span className='first-uppercase'>{selectedColor.color}</span>
                                                        <img width={26} height={18} src={selectedColor.img} alt={selectedColor.color} loading="lazy" style={{ borderRadius: '10%' }} />
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className='d-flex-center-center gap-10'>
                                            <div className='d-flex-column gap-10'>
                                                <div className='quantity'>
                                                    <button type="button" onClick={handleRemove} disabled={quantity <= 1}>
                                                        <span className="material-icons">remove</span>
                                                    </button>
                                                    <div className="quantity-input">{quantity}</div>
                                                    <button type="button" onClick={handleAdd} disabled={quantity >= 10}>
                                                        <span className="material-icons">add</span>
                                                    </button>
                                                </div>
                                            </div>

                                            <WhatsApp producto={producto} selectedShipping={selectedShipping} shippingInfo={shippingInfo} selectedColor={selectedColor} quantity={quantity} handleContinuarClick={handleContinuarClick}/>
                                        </div>

                                        <div className='whatsapp-message d-flex d-flex-column gap-5'>
                                            <span className="material-icons">info</span>
                                            <p>La información solicitada se utilizará para agilizar el proceso de compra.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Descripcion producto={producto}/>
                    </section>
                </div>

                <MasProductos categoriaActual={producto.categoria}/>
            </main>
        </>
    );
}

export default PaginaProducto;
