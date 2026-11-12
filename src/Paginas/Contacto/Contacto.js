import { Helmet } from "react-helmet-async";

import './Contacto.css';

function Contacto(){
    return(
        <>
            <Helmet>
                <title>Contacto | Kamas</title>
            </Helmet>

            <main className="d-flex-column gap-20">
                <div className="block-container">
                    <section className="block-content">
                        <div className="block-title-container">
                            <h1 className="block-title">Contáctanos</h1>
                            <p className="block-title color-black-2">Estamos para ayudarte</p>
                        </div>

                        <div className="d-flex-column d-flex-center-center gap-10">
                            <p className="title-outfit color-black-2">Conversa con nuestro equipo sobre tu compra, pedido o proyecto</p>
                            
                            <div className="d-flex-center-center gap-10">
                                <span class="material-symbols-outlined super-icon">schedule</span>

                                <p className="font-bold text">Atención comercial:</p>
                                <p className="text">Lunes a sábados de 08:00am a 08:00pm</p>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="block-container">
                    <section className="block-content d-flex-column padding-20 bg-light-wsp-1">
                        <div className="block-title-container">
                            <p className="block-title">Ventas y asesoría por WhatsApp</p>
                        </div>

                        <p className="title-outfit margin-auto margin-bottom-20">Elige un asesor para consultar productos y realizar tu compra</p>

                        <div className="d-grid-3-2-1fr gap-20">
                            <a href="/" title="" className="button-link button-link-wsp">
                                <p className="button-link-text">Asesor de ventas 1</p>
                            </a>

                            <a href="/" title="" className="button-link button-link-wsp">
                                <p className="button-link-text">Asesor de ventas 2</p>
                            </a>

                            <a href="/" title="" className="button-link button-link-wsp">
                                <p className="button-link-text">Asesor de ventas 2</p>
                            </a>
                        </div>
                    </section>
                </div>

                <div className="block-container">
                    <section className="block-content">
                        <div className="block-title-container">
                            <p className="block-title">Otras aéreas de atención</p>
                        </div>

                        <div className="d-grid-3-2-1fr gap-20">
                            <div className="d-flex-column d-flex-center-center gap-10 border-1-component padding-20 border-r-4">
                                <span class="material-symbols-outlined super-icon">inventory_2</span>
                                <p className="title-outfit color-color-2">Ventas mayoritas</p>
                                <p className="text text-center">Para distribuidores, tiendas y compras por volumen</p>

                                <a href="/ventas-al-por-mayor/" title="" className="button-link button-link-10">
                                    <p className="button-link-text">Consultar mayoristas</p>
                                </a>
                            </div>

                            <div className="d-flex-column d-flex-center-center gap-10 border-1-component padding-20 border-r-4">
                                <span class="material-symbols-outlined super-icon">factory</span>
                                <p className="title-outfit color-color-2">Proyectos y alianzas</p>
                                <p className="text text-center">Para hoteles, arquitectos y proyectos de equipamiento</p>

                                <a href="/" title="" className="button-link button-link-10">
                                    <p className="button-link-text">Consultar proyectos</p>
                                </a>
                            </div>

                            <div className="d-flex-column d-flex-center-center gap-10 border-1-component padding-20 border-r-4">
                                <span class="material-symbols-outlined super-icon">shield</span>
                                <p className="title-outfit color-color-2">Postventa y garantías</p>
                                <p className="text text-center">Seguimiento de pedidos y atención sobre tu producto o garantía</p>

                                <a href="/" title="" className="button-link button-link-10">
                                    <p className="button-link-text">Contactar con posventa</p>
                                </a>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="block-container">
                    <section className="block-content">
                        <div className="d-grid-2-1fr gap-20">
                            <div className="d-flex-column gap-10 border-1-component padding-20 border-r-4">
                                <p className="block-title">Déjanos tu consulta</p>

                                <p className="text">Completa tus datos y cuéntanos cómo podemos ayudarte</p>

                                <div className="d-flex-column gap-10">
                                    <div className="d-flex-column">
                                        <p className="text font-bold">Nombres y apellidos</p>
                                        <input type="text" className="input-form-comun"></input>
                                    </div>

                                    <div className="d-flex-column">
                                        <p className="text font-bold">WhatsApp</p>
                                        <input type="number" className="input-form-comun"></input>
                                    </div>

                                    <div className="d-flex-column">
                                        <p className="text font-bold">Ciudad o distrito</p>
                                        <input type="text" className="input-form-comun"></input>
                                    </div>

                                    <div className="d-flex-column">
                                        <p className="text font-bold">Correo electrónico (opcional)</p>
                                        <input type="text" className="input-form-comun"></input>
                                    </div>

                                    <div className="d-flex-column">
                                        <p className="text font-bold">Motivo de consulta</p>

                                        <select className="input-form-select">
                                            <option>Selecciona una opción</option>
                                            <option>Opción 2</option>
                                            <option>Opción 3</option>
                                        </select>
                                    </div>

                                    <div className="d-flex-column">
                                        <p className="text font-bold">Mensaje</p>
                                        <textarea className='d-flex w-100 padding-10'></textarea>
                                    </div>

                                    <a href="/" title="" className="button-link button-link-2">
                                        <p className="button-link-text">Enviar consulta</p>
                                    </a>

                                    <a href="/" title="" className="button-link button-link-1">
                                        <p className="button-link-text">consultas@kamas.pe</p>
                                    </a>
                                </div>
                            </div>

                            <div className="d-flex-column gap-20">
                                <div className="d-flex-column gap-10 border-1-component padding-20 border-r-4">
                                    <p className="block-title">Visita nuestro showroom</p>
                                    <p className="text">Conoce nuestros modelos y calidad de acabados en persona</p>

                                    <img src="/assets/imagenes/mapas/tienda.png" alt="" className="d-flex w-100"/>

                                    <div className="d-flex-column gap-10">
                                        <div className="d-flex">
                                            <p className="text font-bold">Av. Santo Domingo 801, etapa 12, Carabayllo</p>
                                        </div>

                                        <div className="d-flex">
                                            <p className="text">Visitas: Lunes a sábado de 08:00am a 05:30pm. Atención con cita previa</p>
                                        </div>

                                        <div className="d-grid-2 gap-10">
                                            <a href="/" className="button-link button-link-2">
                                                <p className="button-link-text">Coordinar mi visita</p>
                                            </a>

                                            <a href="/" className="button-link button-link-3">
                                                <p className="button-link-text">Cómo llegar</p>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex-column gap-10 border-1-component padding-20 border-r-4">
                                    <div className="d-flex-center-beetwen">
                                        <div className="d-flex gap-10">
                                            <span class="material-symbols-outlined super-icon">factory</span>
                                            <p className="block-title color-color-2">Nuestras plantas de producción</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="block-container">
                    <section className="block-content">
                        <div className="block-title-container">
                            <p className="block-title">Síguenos y descubre más de KAMAS</p>
                        </div>

                        <div className="d-grid-5-3-2fr gap-10">
                            <a href="/" className="button-link button-link-10">
                                <p className="button-link-text">Facebook</p>
                            </a>

                            <a href="/" className="button-link button-link-10">
                                <p className="button-link-text">Tik Tok</p>
                            </a>

                            <a href="/" className="button-link button-link-10">
                                <p className="button-link-text">Instagram</p>
                            </a>

                            <a href="/" className="button-link button-link-10">
                                <p className="button-link-text">YouTube</p>
                            </a>

                            <a href="/" className="button-link button-link-10">
                                <p className="button-link-text">Pinterest</p>
                            </a>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}

export default Contacto;
