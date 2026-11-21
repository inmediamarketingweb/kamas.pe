function Envios(){
    return(
        <>
            <main className="d-flex-column gap-20">
                <div className="block-container">
                    <section className="block-content">
                        <div className="d-flex-center-left gap-10">
                            <p className="text">Inicio</p>
                            <p className="text">/</p>
                            <p className="text">Servicio al cliente</p>
                            <p className="text">/</p>
                            <p className="text">Envíos</p>
                        </div>
                    </section>
                </div>

                <div className="block-container">
                    <section className="block-content">
                        <img src="/assets/imagenes/pag-principal/slider/C.png" alt="" className="w-100 d-flex border-r-4"/>
                    </section>
                </div>

                <div className="block-container">
                    <section className="block-content">
                        <div className="d-flex-column gap-10 border-1-component padding-20">
                            <p className="block-title">Consulta el envío de tu zona</p>

                            <div className="d-flex-column gap-20">
                                <div className="d-flex-center-left gap-10">
                                    <button type="button" className="button-link button-link-13">
                                        <p className="button-link-text font-bold">Lima y Callao</p>
                                    </button>

                                    <button type="button" className="button-link button-link-2">
                                        <p className="button-link-text">Provincias</p>
                                    </button>
                                </div>

                                <div className="d-grid-4-2-1 gap-20">
                                    <div className="d-flex-column gap-5">
                                        <p className="title">Departamento</p>

                                        <select>
                                            <option>Selecciona</option>
                                        </select>
                                    </div>

                                    <div className="d-flex-column gap-5">
                                        <p className="title">Provincia</p>

                                        <select>
                                            <option>Selecciona</option>
                                        </select>
                                    </div>

                                    <div className="d-flex-column gap-5">
                                        <p className="title">Distrito</p>

                                        <select>
                                            <option>Selecciona</option>
                                        </select>
                                    </div>

                                    <div className="d-flex-column gap-5">
                                        <p className="title">Zona o localidad</p>

                                        <select>
                                            <option>Selecciona</option>
                                        </select>
                                    </div>
                                </div>

                                <p className="text">Selecciona tu ubicación para conocer las opciones disponibles.</p>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="block-container">
                    <section className="block-content">
                        <div className="d-flex-column gap-10">
                            <p className="block-title">Opciones de envío a tu destino</p>
                            <div className="bg-light-green padding-10-20">
                                <p className="text">La cobertura se confirma según tu ubicación y el producto</p>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="block-container">
                    <section className="block-content d-flex-column gap-20">
                        <div className="d-grid-3-2-1fr gap-20">
                            <div className="d-flex-center-left gap-10 border-1-component padding-20 border-r-4">
                                <span class="material-symbols-outlined super-icon">box</span>

                                <div className="d-flex-column gap-5">
                                    <p className="title">Embalaje y traslado a la agencia</p>
                                    <p className="block-title">Gratis</p>
                                    <p className="text">Hasta la agencia en Lima y Callao</p>
                                </div>
                            </div>

                            <div className="d-flex-center-left gap-10 border-1-component padding-20 border-r-4">
                                <span class="material-symbols-outlined super-icon">delivery_truck_speed</span>

                                <div className="d-flex-column gap-5">
                                    <p className="title">Flete interprovincial</p>
                                    <p className="block-title">Por cotizar</p>
                                    <p className="text">Según producto, volumen y destino</p>
                                </div>
                            </div>

                            <div className="d-flex-center-left gap-10 border-1-component padding-20 border-r-4">
                                <span class="material-symbols-outlined super-icon">box</span>

                                <div className="d-flex-column gap-5">
                                    <p className="title">Entrega a domicilio</p>
                                    <p className="block-title">Por confirmar</p>
                                    <p className="text">Depende del servicio de la agencia</p>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex-center-left gap-5 padding-10-20 border-r-4 bg-light-color-2">
                            <span class="material-symbols-outlined super-icon">info</span>
                            <b className="font-bold title">Importante:</b>
                            <p className="text">El traslado gratuito a la agencia en Lima y Callao no implica la entrega gratuita a provincia.</p>
                        </div>
                    </section>
                </div>

                <div className="block-container">
                    <section className="block-content">
                        <div className="d-grid-2-1fr gap-20">
                            <div className="d-grid-1-1-full-row">
                                <p className="block-title">También entregamos en Lima y Callao</p>
                            </div>

                            <div className="border-r-4 border-1-component padding-20">
                                <div className="d-flex gap-10">
                                    <span class="material-symbols-outlined super-icon">local_shipping</span>

                                    <div className="d-flex-column">
                                        <p className="block-title">Envío regular</p>
                                        <p className="text margin-bottom-10">Consulta la tarifa o gratuidad según distrito y zona, los días de reparto y el rango horario disponible</p>

                                        <a href="/" title="" className="button-link button-link-10 margin-right">
                                            <p className="button-link-text">Consultar mi zona</p>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="border-r-4 border-1-component padding-20 bg-color-2">
                                <div className="d-flex gap-10">
                                    <span class="material-symbols-outlined super-icon color-white">calendar_today</span>

                                    <div className="d-flex-column">
                                        <p className="block-title color-white">Envío regular</p>
                                        <p className="text margin-bottom-10 color-white">Consulta la tarifa o gratuidad según distrito y zona, los días de reparto y el rango horario disponible</p>

                                        <a href="/" title="" className="button-link button-link-7 margin-right">
                                            <p className="button-link-text">Consultar mi zona</p>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="block-container">
                    <section className="block-content">
                        <div className="block-title-container">
                            <p className="block-title margin-right">Así coordinamos tu envío</p>
                        </div>

                        <div className="d-flex-center-between gap-20">
                            <div className="d-flex-center-left gap-20">
                                <span className="big-number">01</span>
                                <p className="title color-black-2">Elige tu destino</p>
                            </div>

                            <div className="d-flex-center-left gap-20">
                                <span className="big-number">02</span>
                                <p className="title color-black-2">Confirma tu producto y costo</p>
                            </div>

                            <div className="d-flex-center-left gap-20">
                                <span className="big-number">03</span>
                                <p className="title color-black-2">Coordina el despacho</p>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="block-container">
                    <section className="block-content">
                        <div className="block-title-container">
                            <p className="block-title margin-right">Antes de coordinar tu entrega</p>
                        </div>

                        <div className="d-flex-column border-1-component border-r-4">
                            <div className="d-flex-column w-100">
                                <div className="d-flex-center-between padding-10-20 w-100">
                                    <p className="title">¿Que incluye el envío gratuito?</p>
                                    <span class="material-symbols-outlined">keyboard_arrow_down</span>
                                </div>

                                <div className="bg-component padding-10-20 w-100">
                                    <p className="text">El beneficio depende de la zona y de las condiciones del pedido. Para provincias, el traslado gratuito hasta la agencia no incluye el flete interprovincial.</p>
                                </div>
                            </div>

                            <div className="d-flex-column w-100 border-t-1-component border-b-1-component">
                                <div className="d-flex-center-between padding-10-20 w-100">
                                    <p className="title">¿El tiempo de transporte incluye la fabricación?</p>
                                    <span class="material-symbols-outlined">keyboard_arrow_down</span>
                                </div>
                            </div>
                            
                            <div className="d-flex-column w-100">
                                <div className="d-flex-center-between padding-10-20 w-100">
                                    <p className="title">¿Qué debo informar sobre l?</p>
                                    <span class="material-symbols-outlined">keyboard_arrow_down</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="block-container">
                    <section className="block-content">
                        <div className="d-flex-center-left padding-20 bg-light-color-2">
                            <p className="block-title">¿No encuentras tu destino?</p>

                            <div className="d-flex-center-left margin-left gap-10">
                                <p className="text">Cuéntanos dónde necesitas recibir tu pedido y revisaremos las alternativas</p>

                                <a href="/" className="button-link button-link-2">
                                    <p className="button-link-text">Consultar el envío</p>
                                </a>

                                <a href="/" className="button-link button-link-5">
                                    <p className="button-link-text">Ver directorio de agencias</p>
                                </a>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}

export default Envios;
