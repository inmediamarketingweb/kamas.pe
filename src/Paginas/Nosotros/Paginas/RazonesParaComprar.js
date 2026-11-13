import { Helmet } from 'react-helmet';

function RazonesParaComprar(){
    return(
        <>
            <Helmet>
                <title>Razones para comprar | Kamas</title>
            </Helmet>

            <main className="d-flex-column gap-20">
                <div className="block-container">
                    <section className="block-content">
                        <div className="d-flex-center-left gap-10">
                            <p className="text">Inicio</p>
                            <p className="text">/</p>
                            <p className="text">Nosotros</p>
                            <p className="text">/</p>
                            <p className="text color-color-2">Razones para comprar</p>
                        </div>
                    </section>
                </div>

                <div className="block-container">
                    <section className="block-content d-flex-center-center mn-h-350-unset">
                        <div className="h-100 d-flex-columm-left margin-right mx-w-30-then-100">
                            <h1 className="block-title">10 razones para elegir KAMAS</h1>
                            <p className="text">Fabricamos tu dormitorio a tu gusto y hacemos que comprarlo sea práctico.</p>
                        </div>

                        <img src="/assets/imagenes/pag-principal/slider/C.png" alt="" className="img-trapecio-bg"/>
                    </section>
                </div>

                <div className="block-container">
                    <section className="block-content">
                        <div className="d-grid-2-1fr gap-20">
                            <div className="d-grid-1-1-full-row">
                                <div className="d-flex-center-left gap-20 bg-light-color-2 padding-20 border-r-4">
                                    <span className="big-number-2 color-color-2">01</span>
                                    <span class="material-symbols-outlined super-icon">calendar_today</span>

                                    <div className="w-100 d-flex-column gap-10">
                                        <p className="block-title">Reserva con s/100 y paga el saldo contraentrega</p>

                                        <div className="d-grid-2-1fr w-100 gap-10 bg-white padding-20 border-r-4">
                                            <div className="d-flex-column">
                                                <p className="title-outfit color-color-2">Lima y Callao</p>
                                                <p className="text">Paga el saldo al recibir tu pedido</p>
                                            </div>

                                            <div className="d-flex-column">
                                                <p className="title-outfit color-color-2">Provincias</p>
                                                <p className="text">Paga el saldo cuando entreguemos tu pedido a la agencia elegida en Lima o Callao</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex-center-left gap-20 border-1-component padding-20 border-r-4">
                                <span className="big-number-2 color-color-2">02</span>
                                <span class="material-symbols-outlined super-icon">design_services</span>

                                <div className="w-100 d-flex-column gap-10">
                                    <p className="block-title">Tu dormitorio, 100% personalizado</p>

                                    <p className="text">Elige diseño, medidas, telas y acabados. Coordinamos contigo cada detalle de fabricación.</p>
                                </div>
                            </div>

                            <div className="d-flex-center-left gap-20 border-1-component padding-20 border-r-4">
                                <span className="big-number-2 color-color-2">03</span>
                                <span class="material-symbols-outlined super-icon">style</span>

                                <div className="w-100 d-flex-column gap-10">
                                    <p className="block-title">Más de 2500 modelos y 120 colores</p>

                                    <p className="text">Descubre diseños, colores, y texturas para crear un dormitorio con tu propio estilo.</p>
                                </div>
                            </div>

                            <div className="d-flex-center-left gap-20 border-1-component padding-20 border-r-4">
                                <span className="big-number-2 color-color-2">04</span>
                                <span class="material-symbols-outlined super-icon">delivery_truck_speed</span>

                                <div className="w-100 d-flex-column gap-10">
                                    <p className="block-title">Entregas en menos de 24 horas</p>

                                    <p className="text">Disponible en pedidos y zonas elegibles. Confirma el plazo con tu asesor; provincias y productos especiales tienen otros tiempos.</p>
                                </div>
                            </div>

                            <div className="d-flex-center-left gap-20 border-1-component padding-20 border-r-4">
                                <span className="big-number-2 color-color-2">05</span>
                                <span class="material-symbols-outlined super-icon">box</span>

                                <div className="w-100 d-flex-column gap-10">
                                    <p className="block-title">Más de 50 dormitorios al día a provincias</p>

                                    <p className="text">Despachamos por la agencia que prefieras. Traslado a la agencia y embalaje protector gratis. Flete a destino por separado, lo asume el cliente.</p>
                                </div>
                            </div>

                            <div className="d-flex-center-left gap-20 border-1-component padding-20 border-r-4">
                                <span className="big-number-2 color-color-2">06</span>
                                <span class="material-symbols-outlined super-icon">forest</span>

                                <div className="w-100 d-flex-column gap-10">
                                    <p className="block-title">Insumos de primera calidad</p>

                                    <p className="text">Importamos directamente insumos y seleccionamos madera, espumas y telas para cuidad cada acabado.</p>
                                </div>
                            </div>

                            <div className="d-flex-center-left gap-20 border-1-component padding-20 border-r-4">
                                <span className="big-number-2 color-color-2">07</span>
                                <span class="material-symbols-outlined super-icon">factory</span>

                                <div className="w-100 d-flex-column gap-10">
                                    <p className="block-title">Tecnología e infraestructura propias</p>

                                    <p className="text">Plantas de camas y colchones, maquinaria y capacidad para atender pedidos personalizados y de mayor volumen.</p>
                                </div>
                            </div>

                            <div className="d-flex-center-left gap-20 border-1-component padding-20 border-r-4">
                                <span className="big-number-2 color-color-2">08</span>
                                <span class="material-symbols-outlined super-icon">database</span>

                                <div className="w-100 d-flex-column gap-10">
                                    <p className="block-title">Precios competitivos de fábrica</p>

                                    <p className="text">Fabricación propia e importación directa para ofrecerte alternativas que se adapten a tu presupuesto.</p>
                                </div>
                            </div>
                            
                            <div className="d-flex-center-left gap-20 border-1-component padding-20 border-r-4">
                                <span className="big-number-2 color-color-2">09</span>
                                <span class="material-symbols-outlined super-icon">storefront</span>

                                <div className="w-100 d-flex-column gap-10">
                                    <p className="block-title">Asesoría personalizada y showroom</p>
                                    <p className="text">Te acompañamos en tu elección. Vísitanos: aproximadamente 500m2 de exhibición y más de 75 dormitorios armados.</p>
                                </div>
                            </div>

                            <div className="d-grid-1-1-full-row">
                                <div className="d-flex-center-left gap-20 border-1-component padding-20 border-r-4">
                                    <span className="big-number-2 color-color-2">10</span>
                                    <span class="material-symbols-outlined super-icon">shield</span>

                                    <div className="d-flex-column gap-10">
                                        <p className="block-title">Experiencia y respaldo posventa</p>
                                        <p className="text">Más de 15 años fabricando. Te atendemos después de la entrega y gestionamos garantías según la cobertura de cada producto.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="block-container bg-color-2 padding-20">
                    <section className="block-content">
                        <div className="block-title-container">
                            <p className="block-title color-white">Elige tu diseño, personalízalo NOSOTROS LO FABRICAMOS</p>
                        </div>

                        <div className="d-flex-center-center gap-10">
                            <a href="/" title="" className="button-link button-link-11">
                                <p className="button-link-text">Cotizar mi dormitorio</p>
                            </a>

                            <a href="/" title="" className="button-link button-link-12">
                                <p className="button-link-text">Agendar mi visita</p>
                            </a>
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}

export default RazonesParaComprar;
