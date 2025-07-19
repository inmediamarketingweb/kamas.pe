import { useEffect, useRef, useState } from 'react';

import ConteoRegresivo from '../../../../Componentes/ConteoRegresivo/ConteoRegresivo';
import LazyImage from '../../../../Componentes/Plantillas/LazyImage';

import './SoloPorHoras.css';

const CHUNK_SIZE = 20;

function SoloPorHoras() {
    const [productos, setProductos] = useState([]);
    const [visibleProductos, setVisibleProductos] = useState([]);
    const [expired, setExpired] = useState(false);

    const scrollRef = useRef(null);
    const autoSlideIntervalRef = useRef(null);
    const autoSlideTimeoutRef = useRef(null);
    const autoDirRef = useRef("right");

    useEffect(() => {
        fetch('/assets/json/manifest.json')
            .then((res) => res.json())
            .then((manifest) => {
                return Promise.all(
                    manifest.files.map((fileUrl) =>
                        fetch(fileUrl)
                            .then((res) => res.json())
                            .then((jsonData) => {
                                const match = fileUrl.match(/\/assets\/json\/categorias\/([^/]+)\/sub-categorias\//);
                                const categoria = match ? match[1] : null;

                                if (jsonData.productos && Array.isArray(jsonData.productos)) {
                                    jsonData.productos = jsonData.productos.map((producto) => ({
                                        ...producto,
                                        categoria,
                                    }));
                                }
                                return jsonData;
                            })
                            .catch((err) => {
                                console.error(`Error cargando ${fileUrl}:`, err);
                                return { productos: [] };
                            })
                    )
                );
            })
            .then((jsonFilesData) => {
                const todosProductos = jsonFilesData.reduce((acum, jsonData) => {
                    if (jsonData.productos && Array.isArray(jsonData.productos)) {
                        return acum.concat(jsonData.productos);
                    }
                    return acum;
                }, []);

                const productosSoloPorHoras = todosProductos.filter(
                    (producto) => producto["solo-por-horas"] === "si"
                );
                setProductos(productosSoloPorHoras);
                setVisibleProductos(productosSoloPorHoras.slice(0, CHUNK_SIZE));
            })
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        const handleScroll = () => {
            if (
                container.scrollLeft + container.clientWidth >= container.scrollWidth - 100 &&
                visibleProductos.length < productos.length
            ) {
                const nextChunk = productos.slice(visibleProductos.length, visibleProductos.length + CHUNK_SIZE);
                setVisibleProductos((prev) => [...prev, ...nextChunk]);
            }
        };

        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
    }, [productos, visibleProductos]);

    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        let isDown = false;
        let startX;
        let scrollLeft;

        const handleMouseDown = (e) => {
            isDown = true;
            container.classList.add('dragging');
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        };

        const handleMouseLeave = () => {
            isDown = false;
            container.classList.remove('dragging');
        };

        const handleMouseUp = () => {
            isDown = false;
            container.classList.remove('dragging');
        };

        const handleMouseMove = (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 1.5;
            container.scrollLeft = scrollLeft - walk;
        };

        container.addEventListener('mousedown', handleMouseDown);
        container.addEventListener('mouseleave', handleMouseLeave);
        container.addEventListener('mouseup', handleMouseUp);
        container.addEventListener('mousemove', handleMouseMove);

        return () => {
            container.removeEventListener('mousedown', handleMouseDown);
            container.removeEventListener('mouseleave', handleMouseLeave);
            container.removeEventListener('mouseup', handleMouseUp);
            container.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const scrollSmooth = (direction) => {
        const container = scrollRef.current;
        if (!container) return;

        const scrollAmount = 290;
        container.scrollBy({
            left: direction === 'right' ? scrollAmount : -scrollAmount,
            behavior: 'smooth',
        });
    };

    const autoScroll = () => {
        const container = scrollRef.current;
        if (!container) return;

        if (autoDirRef.current === "right" && container.scrollLeft >= container.scrollWidth - container.clientWidth) {
            autoDirRef.current = "left";
        }
        else if (autoDirRef.current === "left" && container.scrollLeft <= 0) {
            autoDirRef.current = "right";
        }
        scrollSmooth(autoDirRef.current);
    };

    const startAutoSlide = () => {
        if (autoSlideIntervalRef.current) clearInterval(autoSlideIntervalRef.current);
        autoSlideIntervalRef.current = setInterval(() => {
            autoScroll();
        }, 2000);
    };

    const pauseAutoSlide = () => {
        if (autoSlideIntervalRef.current) {
            clearInterval(autoSlideIntervalRef.current);
            autoSlideIntervalRef.current = null;
        }
        if (autoSlideTimeoutRef.current) clearTimeout(autoSlideTimeoutRef.current);
        autoSlideTimeoutRef.current = setTimeout(() => {
            startAutoSlide();
        }, 2000);
    };

    const handleLeftButtonClick = () => {
        autoDirRef.current = "left";
        scrollSmooth("left");
        pauseAutoSlide();
    };

    const handleRightButtonClick = () => {
        autoDirRef.current = "right";
        scrollSmooth("right");
        pauseAutoSlide();
    };

    useEffect(() => {
        startAutoSlide();
        return () => {
            if (autoSlideIntervalRef.current) clearInterval(autoSlideIntervalRef.current);
            if (autoSlideTimeoutRef.current) clearTimeout(autoSlideTimeoutRef.current);
        };
    }, []);

    const truncate = (str, maxLength) => {
        return str.length <= maxLength ? str : str.slice(0, maxLength) + '...';
    };

    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);
    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 600);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return(
        <div className="block-container block-container-sale">
            <section className="block-content block-content-sale">
                <div className="block-title-container">
                    <h2 className="block-title text-left">¡ Solo por horas ⏰ !</h2>
                    <ConteoRegresivo onExpire={() => setExpired(true)} />
                </div>

                <div className="sale-products-container" ref={scrollRef}>
                    <div className="sale-products-content">
                        <ul className="sale-products">
                            {visibleProductos.map((producto) => {
                                const { ruta, nombre, fotos, precioRegular, precioNormal, precioVenta, stock } = producto;
                                const agotado = stock <= 0;
                                const descuento = Math.round(((precioNormal - precioVenta) * 100) / precioNormal);
                                const cardClass = `product-card ${agotado ? 'agotado' : expired ? 'expired' : ''}`;

                                return (
                                    <li key={ruta}>
                                        <a href={ruta} className={cardClass} title={nombre}>
                                            <div className="product-card-images">
                                                <span className="product-card-discount">-{descuento}%</span>
                                                <LazyImage width={isSmallScreen ? 140 : 200} height={isSmallScreen ? 140 : 200} src={`https://kamas.pe/${fotos}1.jpg`} alt={nombre}/>
                                            </div>
                                            <div className="product-card-content">
                                                <div className="product-card-stock">
                                                    {agotado ? (
                                                        <span>Agotado 😥</span>
                                                    ) : (
                                                        <span>¡ Solo quedan <b>{stock}</b> 🔥 !</span>
                                                    )}
                                                </div>
                                                <span className="product-card-brand">KAMAS</span>
                                                <h4 className="product-card-name">{truncate(nombre, 50)}</h4>
                                                <div className="product-card-prices">
                                                    <span className="product-card-regular-price">S/.{precioRegular}</span>
                                                    <span className="product-card-normal-price">S/.{precioNormal}</span>
                                                    <span className="product-card-sale-price">S/.{precioVenta}</span>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>

                <button type="button" onClick={handleLeftButtonClick} className="solo-por-horas-button solo-por-horas-button-1">
                    <span className="material-icons solo-por-horas-left">chevron_left</span>
                </button>

                <button type="button" onClick={handleRightButtonClick} className="solo-por-horas-button solo-por-horas-button-2">
                    <span className="material-icons solo-por-horas-right">chevron_right</span>
                </button>
            </section>
        </div>
    );
}

export default SoloPorHoras;
