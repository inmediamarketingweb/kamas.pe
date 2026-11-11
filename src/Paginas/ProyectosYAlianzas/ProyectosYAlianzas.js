import { Helmet } from 'react-helmet';

import './ProyectosYAlianzas.css';

function ProyectosYAlianzas(){
    return(
        <>
            <Helmet>
                <title>Proyectos y alianzas | Kamas</title>
            </Helmet>

            <main className='d-flex-column gap-20'>
                <div className='block-container'>
                    <section className='block-content'>
                        <div className='d-grid-2-1fr gap-10'>
                            <div className='d-flex-column-left gap-10'>
                                <p className='text-outfit font-bold uppercase font-13 color-color-2'>Proyectos y sugerencias</p>
                                <p className='block-title'>Soluciones a medida para grandes ideas</p>
                                <p className='text'>Fabricamos camas, colchones y muebles para proyectos hoteleros, inmobiliarios y corporativos. Más de 15 años de experiencia al servicio de tu proyecto.</p>

                                <div className='w-100 d-grid-2 gap-10'>
                                    <a href='/' className='button-link button-link-1' title='Cotizar mi proyecto'>
                                        <p className='button-link-text'>Cotizar mi proyecto</p>
                                        <span class="material-symbols-outlined">chevron_right</span>
                                    </a>

                                    <a href='/' className='button-link button-link-3'>
                                        <p className='button-link-text'>Hablar por WhatsApp</p>
                                    </a>
                                </div>
                            </div>

                            <img src='/assets/imagenes/pag-principal/slider/C.png' alt='' className='d-flex w-100' />
                        </div>
                    </section>
                </div>

                <div className='block-container'>
                    <section className='block-content'>
                        <div className='d-grid-4-2 gap-20 bg-component padding-20'>
                            <div className='d-flex-center-center gap-10'>
                                <span class="material-symbols-outlined super-icon">factory</span>
                                <p className='text font-bold'>Fabricación propia</p>
                            </div>

                            <div className='d-flex-center-center gap-10'>
                                <span class="material-symbols-outlined super-icon">design_services</span>
                                <p className='text font-bold'>Personalización a medida</p>
                            </div>

                            <div className='d-flex-center-center gap-10'>
                                <span class="material-symbols-outlined super-icon">box</span>
                                <p className='text font-bold'>Precios por volumen</p>
                            </div>

                            <div className='d-flex-center-center gap-10'>
                                <span class="material-symbols-outlined super-icon">headset_mic</span>
                                <p className='text font-bold'>Asesoría personalizada</p>
                            </div>
                        </div>
                    </section>
                </div>

                <div className='block-container'>
                    <section className='block-content'>
                        <div className='block-title-container'>
                            <p className='block-title'>¿Con quiénes trabajamos?</p>
                        </div>

                        <div className='d-grid-5-3-2fr gap-10'>
                            <div className='w-100 d-flex-center-center d-flex-column gap-10 padding-20 bg-component'>
                                <span class="material-symbols-outlined super-icon">bed</span>
                                <p className='text font-bold'>Hoteles y hospedajes</p>
                            </div>

                            <div className='w-100 d-flex-center-center d-flex-column gap-10 padding-20 bg-component'>
                                <span class="material-symbols-outlined super-icon">domain</span>
                                <p className='text font-bold'>Constructoras e inmobiliarias</p>
                            </div>

                            <div className='w-100 d-flex-center-center d-flex-column gap-10 padding-20 bg-component'>
                                <span class="material-symbols-outlined super-icon">square_foot</span>
                                <p className='text font-bold'>Arquitectura y diseño</p>
                            </div>

                            <div className='w-100 d-flex-center-center d-flex-column gap-10 padding-20 bg-component'>
                                <span class="material-symbols-outlined super-icon">storefront</span>
                                <p className='text font-bold'>Decoración y retail</p>
                            </div>
                            
                            <div className='w-100 d-flex-center-center d-flex-column gap-10 padding-20 bg-component'>
                                <span class="material-symbols-outlined super-icon">groups</span>
                                <p className='text font-bold'>Empresas e instituciones</p>
                            </div>
                        </div>
                    </section>
                </div>

                <div className='block-container'>
                    <section className='block-content'>
                        <div className='block-title-container'>
                            <p className='block-title'>Lo que podemos desarrollar contigo</p>
                        </div>

                        <div className='d-grid-3-1fr gap-10'>
                            <div className='d-flex-column bg-component border-r-4'>
                                <img src='/assets/imagenes/pag-principal/slider/C.png' alt='' className='d-flex w-100 border-r-4' />

                                <div className='d-flex-column padding-20'>
                                    <p className='title-outfit color-color-2'>Dormitorios para hoteles</p>
                                    <p className='text'>Camas, colchones, cabeceras y bases.</p>
                                </div>
                            </div>

                            <div className='d-flex-column bg-component border-r-4'>
                                <img src='/assets/imagenes/pag-principal/slider/C.png' alt='' className='d-flex w-100 border-r-4' />

                                <div className='d-flex-column padding-20'>
                                    <p className='title-outfit color-color-2'>Dormitorios para hoteles</p>
                                    <p className='text'>Dormitorios a medida y departamentos piloto.</p>
                                </div>
                            </div>

                            <div className='d-flex-column bg-component border-r-4'>
                                <img src='/assets/imagenes/pag-principal/slider/C.png' alt='' className='d-flex w-100 border-r-4' />

                                <div className='d-flex-column padding-20'>
                                    <p className='title-outfit color-color-2'>Mobiliario funcional</p>
                                    <p className='text'>Soluciones para oficinas y espacios compartidos</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div className='block-container'>
                    <section className='block-content'>
                        <div className='d-grid-2-1fr'>
                            <img src='/assets/imagenes/pag-principal/slider/C.png' alt='' className='d-flex w-100'/>

                            <div className='bg-component padding-20 d-flex-column gap-20'>
                                <p className='block-title'>Un aliado para llevar tu proyecto a la realidad</p>
                                
                                <ul className='d-flex-column gap-10'>
                                    <li className='d-flex-center-left gap-10'>
                                        <span class="material-symbols-outlined super-icon">settings</span>
                                        <p className='text'>Producción a escala con atención al detalle</p>
                                    </li>

                                    <li className='d-flex-center-left gap-10'>
                                        <span class="material-symbols-outlined super-icon">settings</span>
                                        <p className='text'>Medidas, colores y acabados personalizados</p>
                                    </li>

                                    <li className='d-flex-center-left gap-10'>
                                        <span class="material-symbols-outlined super-icon">settings</span>
                                        <p className='text'>Condiciones comerciales por volumen</p>
                                    </li>

                                    <li className='d-flex-center-left gap-10'>
                                        <span class="material-symbols-outlined super-icon">settings</span>
                                        <p className='text'>Planificación de entregas según tu proyecto</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>

                <div className='block-container'>
                    <section className='block-content'>
                        <div className='block-title-container'>
                            <p className='block-title'>Así trabajamos contigo</p>
                        </div>

                        <div className='work-w-out'>
                            <div className='d-flex-column gap-10 d-flex-center-center w-100'>
                                <span className='big-number color-color-2'>1</span>
                                <p className='text font-bold'>Cuéntamos tu idea</p>
                            </div>

                            <div className='d-flex-column w-100'>
                                <span class="material-symbols-outlined margin-auto">chevron_right</span>
                            </div>

                            <div className='d-flex-column gap-10 d-flex-center-center w-100'>
                                <span className='big-number color-color-2'>2</span>
                                <p className='text font-bold'>Definimos la propuesta</p>
                            </div>

                            <div className='d-flex-column w-100'>
                                <span class="material-symbols-outlined margin-auto">chevron_right</span>
                            </div>

                            <div className='d-flex-column gap-10 d-flex-center-center w-100'>
                                <span className='big-number color-color-2'>3</span>
                                <p className='text font-bold'>Fabricamos a medida</p>
                            </div>

                            <div className='d-flex-column w-100'>
                                <span class="material-symbols-outlined margin-auto">chevron_right</span>
                            </div>

                            <div className='d-flex-column gap-10 d-flex-center-center w-100'>
                                <span className='big-number color-color-2'>4</span>
                                <p className='text font-bold'>Coordinamos la entrega</p>
                            </div>
                        </div>
                    </section>
                </div>

                <div className='block-container'>
                    <section className='block-content'>
                        <div className='d-grid-2-1fr gap-20'>
                            <div className='d-flex-column gap-20'>
                                <p className='block-title'>Hablemos de tu próximo proyecto</p>

                                <p className='title-outfit'>Déjanos tus datos y un asesor se pondrá en contacto contigo.</p>

                                <div className='d-flex-column-left gap-20'>
                                    <a href='/' title='WhastApp | Kamas' className='button-link button-link-wsp'>
                                        <p className='button-link-text'>Contactar por WhatsApp</p>
                                    </a>
                                    
                                    <a href='tel:+51917013620' title='' className='button-link button-link-10'>
                                        <span className="material-symbols-outlined">call</span>
                                        <p className='button-link-text font-bold'>917 013 610</p>
                                    </a>
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
