import { Helmet } from "react-helmet";

import '../GarantiaDeProductos/GarantiaDeProductos.css';

function RecomendacionesDeUso(){
    return(
        <>
            <Helmet>
                <title>Recomendaciones de uso | Kamas</title>
            </Helmet>

            <main>
                <div className='block-container'>
                    <section className='block-content'>
                        <div className='block-title-container'>
                            <h1 className='block-title margin-auto'>Recomendaciones de uso</h1>
                        </div>

                        <ul className="garantia-ul d-flex-center-center d-flex-wrap gap-20">
                            <li>
                                <a href="/servicio-al-cliente/recomendaciones-de-uso/colchones/" title="Recomendaciones de uso - Colchones | Kamas">
                                    <img src="/assets/imagenes/paginas/servicio-al-cliente/garantia-de-productos/colchones.png"  alt="Colchones"/>
                                    <p className="text">Colchones</p>
                                </a>
                            </li>
                            <li>
                                <a href="/servicio-al-cliente/recomendaciones-de-uso/box-tarimas/" title="Recomendaciones de uso - Box tarimas | Kamas">
                                    <img src="/assets/imagenes/paginas/servicio-al-cliente/garantia-de-productos/box-tarimas.png"  alt="Box tarimas"/>
                                    <p className="text">Box tarimas</p>
                                </a>
                            </li>
                            <li>
                                <a href="/servicio-al-cliente/recomendaciones-de-uso/cabeceras/" title="Recomendaciones de uso - Cabeceras | Kamas">
                                    <img src="/assets/imagenes/paginas/servicio-al-cliente/garantia-de-productos/cabeceras.png"  alt="Cabeceras"/>
                                    <p className="text">Cabeceras</p>
                                </a>
                            </li>
                        </ul>
                    </section>
                </div>
            </main>
        </>
    )
}

export default RecomendacionesDeUso;
