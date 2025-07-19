import { useForm, ValidationError } from '@formspree/react';

import './Citas.css';

function Citas(){
    const [state, handleSubmit] = useForm("mgvzovnw");
    if (state.succeeded){
        return <p>Thanks for joining!</p>;
    }

    return(
        <section className='block-container mapa-block-container'>
            <div className='block-content mapa-block-content'>
                <div className='cita-content'>
                    <div className='d-flex-column gap-10'>
                        <p className='block-title color-white text-left'>Agenda una cita con nosotros y descubre la variedad de productos y modelos que tenemos para ofrecerte</p>
                        <p className='title color-white'>En nuestra sala de exhibición podrás armar el dormitorio con el que tanto sueñas, contamos con alta variedad de modelos en box, colchones y más de 100 modelos en cabeceras que puedes escoger a tu gusto. </p>
                        <p className='text color-white font-13'>Debido a la situación de seguridad actual de nuestra capital solo estamos atendiendo visitas de exhibición bajo previa elavuación, gracias por su compresión.</p>
                        <img src="/assets/imagenes/paginas/pagina-principal/mapa/mapa.svg" alt="" className='margin-auto' />
                    </div>

                    <div className='d-flex-column gap-10'>
                        <p className='title'>Agenda una cita</p>
                        <p className='text'>Para confianza de nuestros clientes hemos habilitado una sala de exhibición con <b className='color-color-1 font-bold'>cita previa.</b></p>

                        <form className='cita-formulario d-flex-column gap-20' onSubmit={handleSubmit}>
                            <fieldset>
                                <span>Nombres<b className='color-red'>*</b></span>
                                <input type='text' placeholder='Nombres' name='Nombres' required/>
                            </fieldset>
                            <fieldset>
                                <span>Teléfono<b className='color-red'>*</b></span>
                                <input type='number' placeholder='Teléfono' name='Teléfono' required/>
                            </fieldset>
                            <fieldset>
                                <span>DNI<b className='color-red'>*</b></span>
                                <input type='number' placeholder='DNI' name='DNI' required/>
                            </fieldset>
                            <fieldset>
                                <span>Fecha<b className='color-red'>*</b></span>
                                <input type='date' name='Fecha' required></input>
                            </fieldset>
                            <fieldset>
                                <button type='submit' className='button-link button-link-2' disabled={state.submitting}>
                                    <span className='button-link-text'>Agendar</span>
                                    <span class="material-icons">calendar_today</span>
                                </button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Citas;
