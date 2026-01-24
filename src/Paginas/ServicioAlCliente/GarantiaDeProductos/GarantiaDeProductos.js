import { Helmet } from "react-helmet";

import './GarantiaDeProductos.css';

function GarantiaDeProductos(){
    return(
        <>
            <Helmet>
                <title>Garantía de productos | Kamas</title>
            </Helmet>

            <main>
                <div className='block-container'>
                    <section className='block-content'>
                        <div className='block-title-container'>
                            <h1 className='block-title margin-auto'>Garantía de productos</h1>
                        </div>

                        <ul className="garantia-ul d-flex-center-center d-flex-wrap gap-20">
                            <li>
                                <a href="/servicio-al-cliente/garantia-de-productos/colchones/" title="" className="">
                                    <img src="/assets/imagenes/paginas/servicio-al-cliente/garantia-de-productos/colchones.png"  alt=""/>
                                    <p className="text">Colchones</p>
                                </a>
                            </li>
                            <li>
                                <a href="/servicio-al-cliente/garantia-de-productos/box-tarimas/" title="" className="">
                                    <img src="/assets/imagenes/paginas/servicio-al-cliente/garantia-de-productos/box-tarimas.png"  alt=""/>
                                    <p className="text">Box tarimas</p>
                                </a>
                            </li>
                            <li>
                                <a href="/servicio-al-cliente/garantia-de-productos/cabeceras/" title="" className="">
                                    <img src="/assets/imagenes/paginas/servicio-al-cliente/garantia-de-productos/cabeceras.png"  alt=""/>
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

export default GarantiaDeProductos;
