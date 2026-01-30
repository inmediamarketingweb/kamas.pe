import { Helmet } from 'react-helmet';

import './NoProducto.css';

function NoProducto(){
    return(
        <>
            <Helmet>
                <title>Producto no encontrado | Kamas</title>
                <meta name="description" content="No hemos encontrado este producto"/>
            </Helmet>

            <main>
                <div className='block-container margin-auto'>
                    <section className='block-content d-flex-center-center d-flex-column gap-20'>
                        <div className='d-flex-column gap-20'>
                            <p className='block-title'>Producto no encontrado</p>
                            <img src="/assets/imagenes/componentes/404/404.svg" alt="Producto no encontrado | Kamas" className='no-product-image' width={320} height={320} />
                        </div>

                        <a href='/productos/' title='Kamas | Fabricantes de dormitorios' className='button-link button-link-2'>
                            <span className="material-symbols-outlined">bed</span>
                            <p className='button-link-text'>Regresar</p>
                        </a>
                    </section>
                </div>
            </main>
        </>
    )
}

export default NoProducto;
