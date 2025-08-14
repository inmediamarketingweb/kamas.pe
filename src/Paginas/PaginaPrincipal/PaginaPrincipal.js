import { Helmet } from 'react-helmet';

import Slider from './Componentes/Slider/Slider';
import Categorias from './Componentes/Categorias/Categorias';
import SoloPorHoras from './Componentes/SoloPorHoras/SoloPorHoras';
import UltimasNovedades from './Componentes/UltimasNovedades/UltimasNovedades';
import SobreNosotros from './Componentes/SobreNosotros/SobreNosotros';
import Perfiles from './Componentes/Perfiles/Perfiles';
import ModalDatos from './Componentes/ModalDatos/ModalDatos';

import Promocion from './Componentes/Promocion/Promocion';

import './PaginaPrincipal.css';

function PaginaPrincipal(){
    return(
        <>
            <Helmet>
                <title>Kamas | Fabricantes de colchones, camas y dormitorios.</title>
                <meta name="description" content="Fabricantes de colchones, camas, box tarimas y juegos de dormitorios con más de 15 años en el mercado peruano ofreciendo calidad y confort para tu descanso." />

                <meta property="og:title" content="Kamas | Fabricantes de colchones, camas y dormitorios."/>
                <meta property="og:description" content="Meta descripción"/>
                <meta property="og:type" content="website"/>
                <meta property="og:url" content="https://www.kamas.pe/"/>
                <meta property="og:image" content="/assets/imagenes/paginas/pagina-principal/homepage-video.jpg"/>
                <meta property="og:site_name" content="Kamas"/>

                <link rel="preload" as="image" href="https://kamas.pe/assets/imagenes/paginas/pagina-principal/slider/slider-1.webp"/>
                <link rel="preload" as="image" href="https://kamas.pe/assets/imagenes/paginas/pagina-principal/slider/thumb/slider-1.webp"/>
            </Helmet>

            <main className='main-pagina-principal d-flex-column gap-10'>
                <Slider/>

                <Categorias/>

                <UltimasNovedades/>

                <SoloPorHoras/>

                <Promocion/>

                <SobreNosotros/>

                <section className='block-container'>
                    <div className='homepage-banners block-content d-flex-column gap-10'>
                        <div className='d-grid-2-1fr gap-10'>
                            <a className='d-flex' href='/productos/dormitorios/?línea=europea&tamaño=2-plazas&cajones=si' title='Oferta en dormitorios europeos 2 plazas | Kamas'>
                                <img src="/assets/imagenes/paginas/pagina-principal/banner-1.webp" alt="Ofertas en dormitorios europeos 2 plazas | Kamas" className='page-banner-img'/>
                            </a>

                            <a className='d-flex' href='/productos/dormitorios/?línea=americana&tamaño=queen' title='Oferta en dormitorios queen americanos | Kamas'>
                                <img src="/assets/imagenes/paginas/pagina-principal/banner-2.webp" alt="Ofertas en dormitorios queen americanos | Kamas" className='page-banner-img'/>
                            </a>
                        </div>

                        <a className='d-flex w-100' href='/productos/dormitorios/?modelo-de-colch%C3%B3n=der-prinz%2Bthameo-pocket%2Bramat%2Bkonig%2Byurmale%2Bthaleo-pocket%2Bsafynnte' title='Dormitorios confort premium | Kamas'>
                            <img src="/assets/imagenes/paginas/pagina-principal/banner-3.webp" alt="Dormitorios confort premium | Kamas" className='page-banner-img'/>
                        </a>

                        <div className='d-grid-2-1fr gap-10'>
                            <a className='d-flex' href='/productos/dormitorios/?línea=europea&tamaño=king' title='Oferta en dormitorios king europeos | Kamas'>
                                <img src="/assets/imagenes/paginas/pagina-principal/banner-4.webp" alt="Ofertas en dormitorios king europeos | Kamas" className='page-banner-img'/>
                            </a>

                            <a className='d-flex' href='/productos/complementos/?sub-categoría=veladores' title='Oferta en veladores | Kamas'>
                                <img src="/assets/imagenes/paginas/pagina-principal/banner-5.webp" alt="" className='page-banner-img'/>
                            </a>
                        </div>
                    </div>
                </section>

                <Perfiles/>

                <ModalDatos/>
            </main>
        </>
    );
}

export default PaginaPrincipal;
