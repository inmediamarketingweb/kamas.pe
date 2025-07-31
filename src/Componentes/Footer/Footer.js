import './Footer.css';

function Footer(){
    return(
        <>
            <a href='https://wa.link/b7ml1d' target='_blank' rel="noopener noreferrer" className='whatsapp-button'>
                <img src="/assets/imagenes/iconos/whatsapp-blanco.svg" alt="icono de whatsapp"/>
            </a>

            <footer className='w-100 d-flex-column gap-20'>
                <div className='footer-block-container'>
                    <section className='footer-block-content'>
                        <div className='block-title-container'>
                            <p className='block-title'>En KAMAS diseñamos tus sueños</p>
                        </div>

                        <nav className='footer-targets'>
                            <div className='footer-target footer-target-1'>
                                <p className='title'>Acerca de KAMAS</p>
                                <p className='text color-white'>Más información sobre la empresa, un breve resumen del rubro, historia o mensaje promocional y redes sociales.</p>
                                
                                <div className='d-flex-column gap-10'>
                                    <p className='title color-white'>Suscribete</p>

                                    <div className='form-suscribe-container'>
                                        <form className='form-suscribe'>
                                            <input type='mail' placeholder='Suscribete con tu correo electrónico'></input>
                                            <button type='submit' className='button-link button-link-2'>
                                                <p className='button-link-text'>Enviar</p>
                                                <span className="material-icons">outgoing_mail</span>
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className='footer-target footer-target-4'>
                                <p className='title'>Nosotros</p>

                                <ul className='footer-list'>
                                    <li>
                                        <a href='/nosotros/' title='Nosotros | Kamas'>
                                            <p>Nosotros</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href='/nosotros/razones-para-comprar/' title='Razones para comprar | Kamas'>
                                            <p>Razones para comprar</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href='/nosotros/propiedad-intelectual/' title='Propiedad intelectual | Kamas'>
                                            <p>Propiedad intelectual</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href='/paleta-de-colores/' title='Paleta de colores | Kamas'>
                                            <p>Paleta de colores</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href='/agencias-recomendadas/' title='Agencias recomendadas | Kamas'>
                                            <p>Agencias recomendadas</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href='/envios/envios-a-lima-y-callao/' title='Envios a Lima y Callao | Kamas'>
                                            <p>Envios a Lima y Callao</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href='/envios/envios-a-provincia/' title='Envios a provincia | Kamas'>
                                            <p>Envios a provincia</p>
                                        </a>
                                    </li>
                                </ul>

                                <a className='complaints-book' href='/contacto/libro-de-reclamaciones/' title="Libro de reclamaciones | Kamas">
                                    <span className="material-icons">menu_book</span>
                                    <p className='text'>Libro de reclamaciones</p>
                                </a>
                            </div>
                            <div className='footer-target footer-target-2'>
                                <p className='title'>Servicio al cliente</p>
                                <ul className='footer-list'>
                                    <li>
                                        <a href='/agendar-visita/' title='Agendar visita | Kamas'>
                                            <p>Agendar visita</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href='/servicio-al-cliente/costos-de-envio-por-zona/' title='Costos de envio por zona | Kamas'>
                                            <p>Costos de envío por zona</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href='/servicio-al-cliente/medios-de-pago/' title='Medios de pago | Kamas'>
                                            <p>Medios de pago</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href='/servicio-al-cliente/garantia-de-productos/' title=''>
                                            <p>Garantía de productos</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href='/servicio-al-cliente/recomendaciones-de-uso/' title=''>
                                            <p>Recomendaciones de uso</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href='/servicio-al-cliente/politica-de-cambios-y-devoluciones/' title=''>
                                            <p>Política de cambios y devoluciones</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href='/servicio-al-cliente/privacidad-y-seguridad/' title=''>
                                            <p>Privacidad y seguridad</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href='/servicio-al-cliente/terminos-y-condiciones/' title=''>
                                            <p>Términos y condiciones</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href='/servicio-al-cliente/horarios-de-entrega-y-envios/' title=''>
                                            <p>Horarios de entrega y envíos</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href='/servicio-al-cliente/manual-de-instalacion/' title=''>
                                            <p>Manual de instalación</p>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className='footer-target footer-target-3'>
                                <div className='d-flex-column gap-10'>
                                    <p className='title'>Novedades</p>
                                    <ul className='footer-list'>
                                        <li>
                                            <a href='/ofertas/' title='Ofertas | Kamas'>
                                                <p>Ofertas</p>
                                            </a>
                                        </li>
                                        <li>
                                            <a href='/novedades/programa-de-influencers/' title='Programa de influencers | Kamas'>
                                                <p>Programa influencers</p>
                                            </a>
                                        </li>
                                        <li>
                                            <a href='/novedades/programa-de-referencias/' title='Progama de referencias | Kamas'>
                                                <p>Programa de referencias</p>
                                            </a>
                                        </li>
                                        <li>
                                            <a href='https://blog.kamas.pe' title='Blog | Kamas'>
                                                <p>Blog</p>
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                <div className='d-flex-column gap-10'>
                                    <p className='title'>Siguenos:</p>
                                    
                                    <ul className='d-flex-center-left gap-5 social-networks'>
                                        <li>
                                            <a href='https://www.facebook.com/KAMAS.pe?locale=es_LA' target='_blank' rel="noopener noreferrer" title='Facebook | Kamas'>
                                                <img src="/assets/imagenes/iconos/facebook-blanco.svg" width={20} height={20} alt="Visita nuestro perfil en Facebook" title="Facebook"/>
                                            </a>
                                        </li>
                                        <li>
                                            <a href='https://www.instagram.com/kamas.pe/' target='_blank' rel="noopener noreferrer" title='Instagram | Kamas'>
                                                <img src="/assets/imagenes/iconos/instagram-blanco.svg" width={20} height={20} alt="Visita nuestro perfil en Instagram" title="instagram"/>
                                            </a>
                                        </li>
                                        <li>
                                            <a href='https://www.tiktok.com/@kamas.pe' target='_blank' rel="noopener noreferrer" title='Tik Tok | Kamas'>
                                                <img src="/assets/imagenes/iconos/tiktok-blanco.svg" width={20} height={20} alt="Visita nuestro perfil en TikTok" title="Tik Tok"/>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </section>
                </div>

                <div className='footer-bottom-container'>
                    <section className='footer-bottom'>
                        <ul className='d-flex-center-center gap-10'>
                            <li>
                                <img src="/assets/imagenes/componentes/footer/visa.svg" width={20} height={20} alt="Visa | Kamas" />
                            </li>
                            <li>
                                <img src="/assets/imagenes/componentes/footer/mastercard.svg" width={20} height={20} alt="Mastercard | Kamas" />
                            </li>
                            <li>
                                <img src="/assets/imagenes/componentes/footer/bcp.svg" width={58} height={20} alt="BCP | Kamas" />
                            </li>
                            <li>
                                <img src="/assets/imagenes/componentes/footer/interbank.svg" width={110} height={20} alt="Interbank | Kamas" />
                            </li>
                            <li>
                                <img src="/assets/imagenes/componentes/footer/bbva.svg" width={66} height={20} alt="BBVA | Kamas" />
                            </li>
                            <li>
                                <img src="/assets/imagenes/componentes/footer/scotiabank.svg" width={80} height={20} alt="Scotiabank | Kamas" />
                            </li>
                            <li>
                                <img src="/assets/imagenes/componentes/footer/banco-de-la-nacion.svg" width={97} height={20} alt="Banco de la nación | Kamas" />
                            </li>
                        </ul>

                        <p className='text color-white'>&copy; Todos los derechos reservados para <a href='https://kamas.pe/' title='Kamas | Fabricantes de colchones, camas y dormitorios' className='color-white'>kamas.pe</a></p>
                    </section>
                </div>
            </footer>
        </>
    );
}

export default Footer;
