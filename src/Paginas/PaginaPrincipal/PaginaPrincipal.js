import { Helmet } from 'react-helmet';

import Header from '../../Componentes/Header/Header';

import Slider from './Componentes/Slider/Slider';
import Categorias from './Componentes/Categorias/Categorias';
import SoloPorHoras from './Componentes/SoloPorHoras/SoloPorHoras';
import UltimasNovedades from './Componentes/UltimasNovedades/UltimasNovedades';
// import Ofertas from './Componentes/Ofertas/Ofertas';
import SobreNosotros from './Componentes/SobreNosotros/SobreNosotros';
import Distribuidores from '../../Componentes/Distribuidores/Distribuidores';
import ModalDatos from './Componentes/ModalDatos/ModalDatos';

import Footer from '../../Componentes/Footer/Footer';

import Promocion from './Componentes/Promocion/Promocion';
// import CategoriasNew from './Componentes/CategoriasNew/Categorias';

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

                <link rel="preload" as="image" href="https://kamas.pe/assets/imagenes/paginas/pagina-principal/slider/slider-1.webp" />
                <link rel="preload" as="image" href="https://kamas.pe/assets/imagenes/paginas/pagina-principal/slider/thumb/slider-1.webp" />
            </Helmet>

            <Header/>

            <main className='main-pagina-principal d-flex-column gap-10'>
                <Slider/>

                <Categorias/>

                {/* <CategoriasNew/> */}

                <UltimasNovedades/>

                <SoloPorHoras/>
                
                {/* <Ofertas/> */}

                <Promocion/>

                <SobreNosotros/>

                <section className='block-container'>
                    <div className='block-content d-flex-column gap-10'>
                        <div className='d-grid-2-1fr gap-10'>
                            <img src="/assets/imagenes/paginas/pagina-principal/banner-1.webp" alt="" className='page-banner-img'/>
                            <img src="/assets/imagenes/paginas/pagina-principal/banner-2.webp" alt="" className='page-banner-img'/>
                            {/* <img src="/assets/imagenes/paginas/pagina-principal/banner-1.webp" alt="" className='page-banner-img'/> */}
                        </div>
                        <img src="/assets/imagenes/paginas/pagina-principal/banner-3.webp" alt="" className='page-banner-img'/>
                    </div>
                </section>

                <Distribuidores/>

                <ModalDatos/>
            </main>

            <Footer/>
        </>
    );
}

export default PaginaPrincipal;
