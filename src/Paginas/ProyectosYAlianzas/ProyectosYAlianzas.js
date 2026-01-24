import { Helmet } from 'react-helmet';

import './ProyectosYAlianzas.css';

function ProyectosYAlianzas(){
    return(
        <>
            <Helmet>
                <title>Proyectos y alianzas | Kamas</title>
            </Helmet>

            <main>
                <div className='block-container'>
                    <section className='block-content'>
                        <div className='block-title-container'>
                            <h1 className='block-title'>Proyectos y alianzas</h1>
                        </div>

                        <div className='d-flex-column gap-20'>
                            <p className='title'>Soluciones a medida para grandes ideas</p>

                            <div className='d-flex-column gap-10'>
                                <p className='title'>¿Qué ofrecemos?</p>

                                <div className='d-flex-column gap-10'>
                                    <p className='text'>En KAMAS ponemos a disposición nuestra experiencia de más de 15 años en fabricación de muebles de dormitorio y descanso, para aliarnos con proyectos que buscan calidad, diseño y eficiencia. Atendemos necesidades personalizadas para:</p>
                                    <ul className='content-page-list d-flex-column gap-5'>
                                        <li>
                                            <p>🏨 Hoteles & hospedajes</p>
                                        </li>
                                        <li>
                                            <p>🏘️ Constructoras & inmobiliarias</p>
                                        </li>
                                        <li>
                                            <p>🛋️ Estudios de arquitectura y diseño</p>
                                        </li>
                                        <li>
                                            <p>🧱 Empresas de decoración o retail</p>
                                        </li>
                                        <li>
                                            <p>🧑‍💼 Proyectos corporativos o institucionales</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className='d-flex-column gap-10'>
                                <p className='title'>¿Por qué elegirnos?</p>

                                <div className='d-flex-column gap-10'>
                                    <p className='text'>En KAMAS ponemos a disposición nuestra experiencia de más de 15 años en fabricación de muebles de dormitorio y descanso, para aliarnos con proyectos que buscan calidad, diseño y eficiencia. Atendemos necesidades personalizadas para:</p>
                                    <ul className='content-page-list d-flex-column gap-5'>
                                        <li>
                                            <p>Producción a escala con calidad artesanal</p>
                                        </li>
                                        <li>
                                            <p>Amplia variedad de modelos y telas exclusivas</p>
                                        </li>
                                        <li>
                                            <p>Personalización total (medidas, colores, acabados)</p>
                                        </li>
                                        <li>
                                            <p>Tiempos de entrega rápidos </p>
                                        </li>
                                        <li>
                                            <p>Asesoría y seguimiento personalizado</p>
                                        </li>
                                        <li>
                                            <p>Precios preferenciales por volumen</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className='d-flex-column gap-10'>
                                <p className='title'>¿Qué podemos desarrollar contigo?</p>

                                <div className='d-flex-column gap-10'>
                                    <ul className='content-page-list d-flex-column gap-5'>
                                        <li>
                                            <p>Dormitorios completos para proyectos hoteleros</p>
                                        </li>
                                        <li>
                                            <p>Camas personalizadas para residencias o departamentos piloto</p>
                                        </li>
                                        <li>
                                            <p>Cabeceras y box tarimas premium para proyectos boutique</p>
                                        </li>
                                        <li>
                                            <p>Muebles funcionales para coworkings, oficinas o residencias</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className='d-flex-column gap-10'>
                                <div className='d-flex-column'>
                                    <p className='title'>¿Quieres cotizar o iniciar una alianza?</p>
                                    <p className='text'>Déjanos tus datos y un asesor especializado te contactará.</p>
                                </div>

                                <div className='d-flex-column gap-10'>
                                    <ul className='content-page-list d-flex-column gap-5'>
                                        <li>
                                            <p>Dormitorios completos para proyectos hoteleros</p>
                                        </li>
                                        <li>
                                            <p>Camas personalizadas para residencias o departamentos piloto</p>
                                        </li>
                                        <li>
                                            <p>Cabeceras y box tarimas premium para proyectos boutique</p>
                                        </li>
                                        <li>
                                            <p>Muebles funcionales para coworkings, oficinas o residencias</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}

export default ProyectosYAlianzas;
