import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { isSunday, setHours, setMinutes, addDays } from 'date-fns';
import { es } from 'date-fns/locale';

import 'react-datepicker/dist/react-datepicker.css';

import './Citas.css';

function Citas() {
    const [formData, setFormData] = useState({
        nombres: '',
        telefono: '',
        dni: '',
        datetime: null
    });

    const [mensajeError, setMensajeError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'nombres' && !/^[a-zA-Z\s]*$/.test(value)) return;
        if (name === 'telefono' && value.length > 9) return;
        if (name === 'dni' && value.length > 8) return;
        setFormData({ ...formData, [name]: value });
    };

    const handleDateTimeChange = (date) => {
        if (isSunday(date)) {
            setMensajeError('No se atiende los domingos.');
        } else {
            setMensajeError('');
            setFormData({ ...formData, datetime: date });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.datetime) {
            return alert('Selecciona una fecha y hora válida.');
        }

        if (mensajeError) {
            return alert(mensajeError);
        }

        const fechaFormateada = formData.datetime.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        const horaFormateada = formData.datetime.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });

        const mensaje = `Hola, quiero agendar una cita:\n\n` +
                        `👤 *Nombres:* ${formData.nombres}\n` +
                        `📞 *Teléfono:* ${formData.telefono}\n` +
                        `🆔 *DNI:* ${formData.dni}\n` +
                        `📅 *Fecha:* ${fechaFormateada}\n` +
                        `🕒 *Hora:* ${horaFormateada}`;

        const numero = '+51917013610';
        const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
        window.open(url, '_blank');
    };

    const hoy = new Date();
    const maxFecha = addDays(hoy, 7);

    return(
        <>
            <main className='main'>
                <section className='block-container mapa-block-container'>
                    <div className='block-content mapa-block-content'>
                        <div className='cita-content'>
                            <div className='d-flex-column gap-20'>
                                <div className='bg-white padding-10 border-r-6 border-1-gray d-flex-column gap-10'>
                                    <p className='block-title text-left color-color-1'>Agenda una visita con nosotros y descubre la variedad de productos y modelos que tenemos para ofrecerte</p>
                                    <p className='title'>En nuestra sala de exhibición podrás armar el dormitorio con el que tanto sueñas, contamos con alta variedad de modelos en box, colchones y más de 100 modelos en cabeceras que puedes escoger a tu gusto. </p>
                                    <p className='text font-13'>Debido a la situación de seguridad actual de nuestra capital solo estamos atendiendo visitas de exhibición bajo previa elavuación, gracias por su compresión.</p>
                                </div>
                            </div>

                            <div className='d-flex-column gap-20'>
                                <p className='block-title color-white'>Agenda una visita</p>
                                <form className='cita-formulario d-flex-column gap-20' onSubmit={handleSubmit}>
                                    <fieldset>
                                        <span>Nombres<b className='color-red'>*</b></span>
                                        <input type='text' placeholder='Nombres' name='nombres' required value={formData.nombres} onChange={handleChange}/>
                                    </fieldset>
                                    <fieldset>
                                        <span>Teléfono<b className='color-red'>*</b></span>
                                        <input type='number' placeholder='Teléfono' name='telefono' required value={formData.telefono} onChange={handleChange}/>
                                    </fieldset>
                                    <fieldset>
                                        <span>DNI<b className='color-red'>*</b></span>
                                        <input type='number' placeholder='DNI' name='dni' required value={formData.dni} onChange={handleChange}/>
                                    </fieldset>
                                    <fieldset>
                                        <span>Fecha y hora<b className='color-red'>*</b></span>
                                        <DatePicker
                                            selected={formData.datetime}
                                            onChange={handleDateTimeChange}
                                            minDate={hoy}
                                            maxDate={maxFecha}
                                            filterDate={date => !isSunday(date)}
                                            showTimeSelect
                                            timeFormat="h:mm aa"
                                            timeIntervals={60}
                                            minTime={setHours(setMinutes(new Date(0), 0), 8)}
                                            maxTime={setHours(setMinutes(new Date(0), 0), 16)}
                                            dateFormat="dd/MM/yyyy h:mm aa"
                                            placeholderText="Selecciona fecha y hora"
                                            className="custom-datepicker"
                                            locale={es}
                                            timeCaption="Hora"
                                            monthCaption="Mes"
                                            calendarClassName='citas-fecha-hora cursor-pointer'
                                        />
                                        {mensajeError && (
                                            <p className="color-red font-13">{mensajeError}</p>
                                        )}
                                    </fieldset>
                                    <fieldset>
                                        <button type='submit' className='button-link button-link-2'>
                                            <span className='button-link-text'>Agendar</span>
                                            <span className="material-symbols-outlined">calendar_today</span>
                                        </button>
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>           
            </main>
        </>
    );
}

export default Citas;
