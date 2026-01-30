import { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet';

import Categorias from './Componentes/Categorias/Categorias';

import './PaginaPrincipal.css';

const Slider = lazy(() => import('./Componentes/Slider/Slider'));
// const Banners = lazy(() => import('./Componentes/Banners/Banners'));
const Ofertas = lazy(() => import('./Componentes/Ofertas/Ofertas'));
const UltimasNovedades = lazy(() => import('./Componentes/UltimasNovedades/UltimasNovedades'));
const SobreNosotros = lazy(() => import('./Componentes/SobreNosotros/SobreNosotros'));
const Promocion = lazy(() => import('./Componentes/Promocion/Promocion'));
const Perfiles = lazy(() => import('./Componentes/Perfiles/Perfiles'));
const ModalDatos = lazy(() => import('./Componentes/ModalDatos/ModalDatos'));

function PaginaPrincipal() {
    return (
        <>
            <Helmet>
                <title>Kamas | Fabricantes de colchones, camas y juegos de dormitorios.</title>
                <meta name="description" content="Fabricantes de colchones, camas, box tarimas y juegos de dormitorios con más de 15 años en el mercado peruano ofreciendo calidad y confort para tu descanso."/>
                <meta property="og:title" content="Kamas | Fabricantes de colchones, camas y juegos de dormitorios." />
                <meta property="og:description" content="Meta descripción" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.kamas.pe/" />
                <meta property="og:image" content="/assets/imagenes/paginas/pagina-principal/homepage-video.jpg" />
                <meta property="og:site_name" content="Kamas" />

                <style>{`
                    body { margin: 0; }
                    main { display: block; }

                    .main-pagina-principal { padding: 0 !important; }

                    .main-hero-container {
                        width: 100%;
                        position: relative;
                        min-height: 480px;
                        overflow: hidden;
                    }

                    .main-hero-container img {
                        position: absolute;
                        inset: 0;
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        z-index: -2;
                    }

                    .main-hero-container::before {
                        content: '';
                        position: absolute;
                        inset: 0;
                        background: rgba(0, 0, 0, 0.75);
                        z-index: -1;
                    }

                    .main-hero-content {
                        margin: auto;
                        width: 100%;
                        max-width: 1600px;
                        height: 480px;
                        padding: 20px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .main-hero-content-target {
                        width: 100%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                        gap: 10px;
                        text-align: center;
                    }

                    .main-hero-content-target-1 h1 {
                        font-size: 44px;
                        font-weight: 900;
                        text-transform: uppercase;
                        color: #fff;
                        margin: 0;
                    }

                    .main-hero-content-target-1 p {
                        color: #fff;
                        margin: 0;
                    }

                    .d-flex-center-left {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 10px;
                    }
                `}</style>
            </Helmet>

            <main className="main-pagina-principal d-flex-column gap-10">
                <div className="main-hero-container">
                    <img src="/assets/imagenes/paginas/pagina-principal/hero-bg.webp" alt="Kamas | Fabricantes de colchones, camas y juegos de dormitorios" fetchpriority="high" loading="eager" decoding="async" width="1920" height="1080"/>

                    <section className="main-hero-content">
                        <div className="main-hero-content-target main-hero-content-target-1 gap-20">
                            <h1 className="text-center">Juegos de dormitorios</h1>

                            <div className="d-flex-column">
                                <p className="color-white text-center">
                                    Fabricantes de colchones, camas, juegos de dormitorio, box espacio,
                                    camarotes, muebles, veladores y demás complementos para el descanso.
                                </p>
                                <p className="color-white text-center">
                                    Realizamos envíos de manera gratuita a toda Lima y Callao. Y envíos
                                    inmediatos a provincia. Llegamos a todo el Perú.
                                </p>
                            </div>

                            <div className="d-flex-center-left gap-10">
                                <a href="/nosotros/" title="Nosotros | Kamas" className="button-link button-link-2">
                                    <p className="button-link-text">Más de nosotros</p>
                                </a>

                                <a href="/productos/" title="Producto | Kamas" className="button-link button-link-7">
                                    <p className="button-link-text">Ver productos</p>
                                </a>
                            </div>
                        </div>
                    </section>
                </div>

                <Categorias />

                <Suspense fallback={null}>
                    <Slider />
                    <UltimasNovedades />
                    <Ofertas />
                    <Promocion />
                    <SobreNosotros />
                    {/* <Banners/> */}
                    <Perfiles/>
                    <ModalDatos />
                </Suspense>
            </main>
        </>
    );
}

export default PaginaPrincipal;
