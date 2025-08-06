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
                <meta property="og:image" content="https://kamas.pe/assets/imagenes/paginas/pagina-principal/homepage-video.jpg"/>
            </Helmet>

            <main>
                <div className="block-container">
                    <section className="block-content">
                        <div className="d-flex-column gap-20">
                            <img src="/assets/imagenes/paginas/nosotros/banner.jpg" alt="" className="page-banner-img"/>

                            <h1 className="block-title d-flex margin-right">Nosotros</h1>

                            <div className="d-flex-column gap-10">
                                <p className="title">Nuestra empresa</p>
                                <p className="text">En KAMAS, diseñamos y fabricamos experiencias de descanso con pasión, calidad y compromiso.</p>
                                <p className="text">Con más de 15 años en el mercado, somos fabricantes especializados en camas, colchones y muebles de dormitorio totalmente personalizados, elaborados con materiales de primera y un enfoque artesanal moderno.</p>
                                <p className="text">Nuestra empresa se sustenta en tres pilares: alianzas estratégicas con proveedores nacionales e internacionales de materia prima, personal altamente capacitado, y maquinaria de última tecnología.</p>
                                <p className="text">Esta combinación nos permite trabajar con un norte claro de calidad en todas las etapas de producción, desde el diseño hasta el servicio postventa.</p>
                                <p className="text">Trabajamos con maderas certificadas como pino americano, pino radiata, pino Oregón, madera tornillo y cedro, seleccionadas por su resistencia, estética y durabilidad.</p>
                                <p className="text">Esto garantiza estructuras sólidas y productos que elevan el nivel de cualquier espacio.</p>
                                <p className="text">Contamos con un portafolio de más de 1,000 modelos en más de 48 colores, incluyendo acabados en madera natural y diseños exclusivos que no encontrarás en otro lugar.</p>
                                <p className="text">Además, gracias a nuestro sistema ágil de producción, realizamos entregas en menos de 24 horas en el 95 % de los casos.</p>
                                <p className="text">Cada producto es adaptable y personalizable, permitiendo a nuestros clientes elegir diseños, medidas, colores y acabados según su estilo de vida.</p>
                                <p className="text">KAMAS no solo fabrica productos de dormitorio.</p>
                                <p className="text">Creamos piezas únicas pensadas para transformar espacios y elevar la experiencia de descanso de cada hogar.</p>
                            </div>

                            <div className="d-grid-2-1fr gap-20">
                                <div className="d-flex-column gap-10">
                                    <p className="title">Nuestra visión</p>
                                    <p className="text">Ser la marca peruana líder en descanso premium, reconocida por su calidad, diseño exclusivo y capacidad de personalización, con presencia en todo el país y proyección internacional.</p>
                                </div>
                                <div className="d-flex-column gap-10">
                                    <p className="title">Nuestra misión</p>
                                    <p className="text">Crear experiencias de descanso excepcionales a través de productos de alta calidad, fabricados con precisión, estilo y compromiso, garantizando rapidez en la atención y satisfacción total del cliente.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}

export default Nosotros;
