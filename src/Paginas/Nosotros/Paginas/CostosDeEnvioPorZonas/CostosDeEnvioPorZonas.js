import { Helmet } from 'react-helmet';

import './CostosDeEnvioPorZonas.css';

function CostosDeEnvioPorZonas(){
    return(
        <>
            <Helmet>
                <title>Costos de envios por zonas | Kamas</title>
            </Helmet>

            <main>
                <div className="block-container">
                    <section className="block-content">
                        <img src="/assets/imagenes/paginas/servicio-al-cliente/costos-de-envio-por-zona/costos-de-envio-por-zona.jpg" alt="Costos de envio por zona | Kamas" className='page-banner-img'/>
                    </section>
                </div>
            </main>
        </>
    )
}

export default CostosDeEnvioPorZonas;
