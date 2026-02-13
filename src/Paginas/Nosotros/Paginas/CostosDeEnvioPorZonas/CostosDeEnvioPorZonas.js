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

                        <div className='d-flex-column gap-10'>
                            <ul className='costos-links'>
                                <li>
                                    <a href='/servicio-al-cliente/costos-de-envio-por-zona/lima-y-callao/' title=''>
                                        <img src='https://media.istockphoto.com/id/2091154491/es/vector/mapa-administrativo-y-de-carreteras-de-la-capital-peruana-lima.jpg?s=612x612&w=0&k=20&c=btD0Td6VOYBbZ19ccYFVdPV7-HgTZC1of23Cg4i7790=' alt=''/>
                                        <p className='text'>Lima y Callao</p>
                                    </a>
                                </li>
                                <li>
                                    <a href='/servicio-al-cliente/costos-de-envio-por-zona/norte-chico/' title=''>
                                        <img src='https://media.istockphoto.com/id/2091154491/es/vector/mapa-administrativo-y-de-carreteras-de-la-capital-peruana-lima.jpg?s=612x612&w=0&k=20&c=btD0Td6VOYBbZ19ccYFVdPV7-HgTZC1of23Cg4i7790=' alt=''/>
                                        <p className='text'>Norte chico</p>
                                    </a>
                                </li>
                                <li>
                                    <a href='/servicio-al-cliente/costos-de-envio-por-zona/sur-chico/' title=''>
                                        <img src='https://media.istockphoto.com/id/2091154491/es/vector/mapa-administrativo-y-de-carreteras-de-la-capital-peruana-lima.jpg?s=612x612&w=0&k=20&c=btD0Td6VOYBbZ19ccYFVdPV7-HgTZC1of23Cg4i7790=' alt=''/>
                                        <p className='text'>Sur chico</p>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}

export default CostosDeEnvioPorZonas;