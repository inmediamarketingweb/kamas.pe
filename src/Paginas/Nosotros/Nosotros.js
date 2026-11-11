import { Helmet } from "react-helmet-async";

function Nosotros(){
    return(
        <>
            <Helmet>
                <title>Nosotros | Kamas</title>
                <meta name="description" content="Sobre nosotros"/>

                <meta property="og:title" content="Nosotros | Kamas"/>
                <meta property="og:site_name" content="Nosotros"/>
                <meta property="og:description" content="Sobre nosotros"/>
                <meta property="og:type" content="website"/>
                <meta property="og:url" content="https://www.kamas.pe/nosotros/"/>
                <meta property="og:image" content="https://kamas.pe/assets/imagenes/paginas/pagina-principal/homepage-video.webp"/>
            </Helmet>

            <main className="d-flex-column gap-20">
                <div className="block-container">
                    <div className="block-content">
                        <div className="d-flex gap-10">
                            <p className="text">Inicio</p>
                            <p className="text font-13">/</p>
                            <p className="text">Nosotros</p>
                        </div>
                    </div>
                </div>

                <div className="block-container">
                    <div className="block-content">
                        <img src="/assets/imagenes/pag-principal/slider/C.png" alt="" className="d-flex w-100"/>
                    </div>
                </div>

                <div className="block-container">
                    <section className="block-content">
                        <div className="d-grid-2-1fr gap-20">
                            <div className="d-flex-column gap-10">
                                <p className="block-title">Una empresa peruana que fabrica confianza</p>

                                <div className="d-flex-column">
                                    <p className="text">Diseñamos y fabricamos camas, colchones y muebles de dormitorio, combinando experiencia, tecnología y trabajo artesanal.</p>
                                    <p className="text">Cada pieza nace de un equipo comprometido con la calidad y se adapta a las necesidades, los espacios y estilo de cada cliente.</p>
                                </div>
                            </div>

                            <div className="d-flex w-100">
                                <img src="/assets/imagenes/pag-principal/slider/C.png" alt="" className="d-flex w-100"/>
                            </div>

                            <div className="d-grid-1-1-full-row w-100 bg-component padding-20 border-1-component">
                                <ul className="d-grid-4-2 gap-10 w-100">
                                    <li className="d-flex-center-center gap-10 w-100">
                                        <span class="material-symbols-outlined super-icon">calendar_today</span>
                                        <p className="text">Más de 15 años</p>
                                    </li>
                                    <li className="d-flex-center-center gap-10 w-100">
                                        <span class="material-symbols-outlined super-icon">factory</span>
                                        <p className="text">Fabricación propia</p>
                                    </li>
                                    <li className="d-flex-center-center gap-10 w-100">
                                        <span class="material-symbols-outlined super-icon">diversity_3</span>
                                        <p className="text">Equipo especializado</p>
                                    </li>
                                    <li className="d-flex-center-center gap-10 w-100">
                                        <span class="material-symbols-outlined super-icon">design_services</span>
                                        <p className="text">Diseños a medida</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="block-container">
                    <section className="block-content">
                        <div className="block-title-container">
                            <h2 className="block-title">Así damos vida a cada producto</h2>
                        </div>

                        <div className="d-grid-3-2-1fr gap-20">
                            <div className="d-flex-column gap-10">
                                <img src="/assets/imagenes/pag-principal/slider/C.png" alt="" className="d-flex w-100" />
                                
                                <div className="d-flex-column gap-10">
                                    <p className="title-outfit color-color-2">Materiales seleccionados</p>
                                    <p className="text">Elegimos materiales para crear estructuras sólidas y duraderas.</p>
                                </div>
                            </div>

                            <div className="d-flex-column gap-10">
                                <img src="/assets/imagenes/pag-principal/slider/C.png" alt="" className="d-flex w-100" />
                                
                                <div className="d-flex-column gap-10">
                                    <p className="title-outfit color-color-2">Experiencia y tecnología</p>
                                    <p className="text">Unimos el trabajo de nuestro equipo con procesos de producción especializados.</p>
                                </div>
                            </div>

                            <div className="d-flex-column gap-10">
                                <img src="/assets/imagenes/pag-principal/slider/C.png" alt="" className="d-flex w-100" />
                                
                                <div className="d-flex-column gap-10">
                                    <p className="title-outfit color-color-2">Cuidado con cada detalle</p>
                                    <p className="text">Acompañamos cada etapa, desde el diseño hasta el acabado final.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="block-container">
                    <section className="block-content">
                        <div className="d-grid-2-1fr gap-20">
                            <div className="d-grid-auto-1fr gap-20 padding-20 bg-component">
                                <div className="d-flex w-100 h-100">
                                    <span class="material-symbols-outlined super-icon">target</span>
                                </div>

                                <div className="d-flex-left-center d-flex-column w-100">
                                    <p className="title-outfit color-color-2">Nuestra misión</p>
                                    <p className="text">Crear experiencias de descanso con productos de calidad, diseño personalizado y atención cercana.</p>
                                </div>
                            </div>

                            <div className="d-grid-auto-1fr gap-20 padding-20 bg-component">
                                <div className="d-flex w-100 h-100">
                                    <span class="material-symbols-outlined super-icon">mountain_flag</span>
                                </div>

                                <div className="d-flex-left-center d-flex-column w-100">
                                    <p className="title-outfit color-color-2">Nuestra visión</p>
                                    <p className="text">Ser una marca peruana referente en descanso, reconocida por su calidad y capacidad de personalización.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="block-container">
                    <section className="block-content">
                        <div className="d-grid-2-1fr gap-20">
                            <div className="d-flex w-100">
                                <img src="/assets/imagenes/pag-principal/slider/C.png" alt="" className="d-flex w-100"/>
                            </div>

                            <div className="d-flex-column gap-10">
                                <p className="font-bold uppercase text color-color-1 font-13 underline">Conócenos de cerca</p>

                                <div className="d-flex-column">
                                    <p className="title-outfit color-color-1">Un espacio para inspirarte</p>
                                    <p className="text">Visita nuestro showroom en Carabayllo y conoce de cerca de nuestros diseños, materiales y acabados</p>
                                </div>

                                <div className="d-grid-2 gap-10">
                                    <div className="d-flex-column">
                                        <p className="block-title">500m2</p>
                                        <p className="text">de exhibición</p>
                                    </div>

                                    <div className="d-flex-column">
                                        <p className="block-title">+75</p>
                                        <p className="text">dormitorios armados</p>
                                    </div>
                                </div>

                                <p className="text">Un catálogo de más de 2500 modelos y más de 120 colores para personalizar tu dormitorio.</p>

                                <a href="/" className="button-link button-link-10 margin-right" title="Ver el mapa">
                                    <p className="button-link-text">Cómo llegar al showroom</p>
                                </a>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}

export default Nosotros;
