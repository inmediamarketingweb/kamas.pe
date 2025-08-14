import { Helmet } from "react-helmet-async";
import { useForm } from '@formspree/react';

import './Contacto.css';

function Contacto(){
    const [state, handleSubmit] = useForm("xanoeplr");

    if(state.succeeded) {
        return <p>Thanks for joining!</p>;
    }

    return(
        <>
            <Helmet>
                <title>Contacto | Kamas</title>
            </Helmet>

            <main>
                <div className='block-container'>
                    <section className='block-content'>
                        <div className='block-title-container'>
                            <h1 className='block-title'>Contáctanos</h1>
                        </div>

                        <div className="d-grid-2-1fr gap-20">
                            <div className="d-flex-column gap-20">
                                <div className="d-flex-column gap-10">
                                    <p className="text">¿Problemas con algún producto?</p>
                                    <p className="text">¿Desear cotizar un dormitorio personalizado?</p>
                                    <p className="text">¿Buscas asesoría para tu compra?</p>
                                </div>

                                <div className="d-flex-column">
                                    <p className="text">En KAMAS estamos listos para ayudarte.</p>
                                    <p className="text">Nuestro equipo de atención al cliente está disponible de lunes a sábado de 8:00 a.m. a 8:00 p.m.</p>
                                </div>

                                <div className="d-flex-column gap-10">
                                    <p className="title">Canales de atención</p>
                                    <ul className="d-flex-center-left gap-10">
                                        <li className="button-icon button-icon-1">
                                            <img src="/assets/imagenes/iconos/telefono-blanco.svg" alt="" />
                                        </li>
                                        <li className="d-flex-column gap-10">
                                            <div>
                                                <a href="tel: +51917013610" title="Teléfono | Kamas" className="">
                                                    <p className="text">917013610</p>
                                                </a>
                                            </div>
                                            <div>
                                                <a href="tel: +51943469911" title="Teléfono | Kamas" className="">
                                                    <p className="text">943469911</p>
                                                </a>
                                            </div>
                                        </li>
                                    </ul>

                                    <ul className="d-flex-center-left gap-10">
                                        <li className="button-icon button-icon-1">
                                            <img src="/assets/imagenes/iconos/correo-blanco.svg" alt="" />
                                        </li>
                                        <li>
                                            <a href="mailto: consultas@kamas.pe" title="" className="">
                                                <p className="text">consultas@kamas.pe</p>
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                <div className="d-flex-column gap-20">
                                    <p className="title">Siguenos</p>

                                    <ul className="contact-social-networks">
                                        <li>
                                            <a href="https://www.facebook.com/KAMAS.pe" target="_blank" rel="noopener noreferrer" title="Facebook | Kamas">
                                                <img src="/assets/imagenes/iconos/facebook-blanco.svg" alt="facebook"/>
                                                <p>Facebook</p>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://www.instagram.com/kamas.pe/" target="_blank" rel="noopener noreferrer" title="Instagram | Kamas">
                                                <img src="/assets/imagenes/iconos/instagram-blanco.svg" alt="instagram"/>
                                                <p>Instagram</p>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://www.tiktok.com/@kamas.pe" target="_blank" rel="noopener noreferrer" title="Tik tok| Kamas">
                                                <img src="/assets/imagenes/iconos/tiktok-blanco.svg" alt="tik tok"/>
                                                <p>Tik Tok</p>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://www.youtube.com/@Kamas_Peru" target="_blank" rel="noopener noreferrer" title="Facebook | Kamas">
                                                <img src="/assets/imagenes/iconos/youtube-blanco.svg" alt="youtube"/>
                                                <p>You Tube</p>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="contact-form">
                                <fieldset>
                                    <label>Nombres:</label>
                                    <input type="text" placeholder="" name="Nombres"></input>
                                    <span></span>
                                </fieldset>
                                <fieldset>
                                    <label>Teléfono:</label>
                                    <input type="text" placeholder="" name="Teléfono"></input>
                                    <span></span>
                                </fieldset>
                                <fieldset>
                                    <label>Correo electrónico:</label>
                                    <input type="text" placeholder="" name="Correo"></input>
                                    <span></span>
                                </fieldset>
                                <fieldset>
                                    <label>Ciudad:</label>
                                    <input type="text" placeholder="" name="Ciudad"></input>
                                    <span></span>
                                </fieldset>
                                <fieldset>
                                    <label>Mensaje:</label>
                                    <textarea placeholder="" name="Mensaje"></textarea>
                                    <span></span>
                                </fieldset>

                                <div className="d-flex">
                                    <button type="submit" className="form-submit margin-left button-link button-link-2 gap-10">
                                        <p className="button-link-text">Enviar</p>
                                        <span className="material-icons">mail</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}

export default Contacto;
