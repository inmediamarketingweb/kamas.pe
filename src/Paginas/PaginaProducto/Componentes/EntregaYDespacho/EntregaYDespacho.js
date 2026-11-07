import './EntregaYDespacho.css';

function EntregaYDespacho(){
    return(
        <div className='en-y-ds-container border-1-component border-r-4 padding-20 d-flex-column gap-10'>
        {/* <div className='en-y-ds-container d-flex-column gap-10'> */}
            <p className='text uppercase font-bold font-13'>Entrega y envío</p>

            <div className='d-flex-column gap-5'>
                {/* <p className='text'>¿Dónde te encuentras?</p> */}
                <p className='text uppercase font-bold font-13'>Destino</p>

                <div className='en-y-ds-container-dp-pr-ds d-grid-3-2-1fr gap-10'>
                    <div className='d-flex-center-left gap-5'>
                        <span class="material-symbols-outlined dot">location_on</span>
                        <div className='d-flex-column'>
                            <span>Departamento</span>
                        </div>
                        <span class="material-symbols-outlined arrow margin-left">keyboard_arrow_down</span>
                    </div>
                    <div className='d-flex-center-left gap-5'>
                        <span class="material-symbols-outlined dot">location_on</span>
                        <div className='d-flex-column'>
                            <span>Provincia</span>
                        </div>
                        <span class="material-symbols-outlined arrow margin-left">keyboard_arrow_down</span>
                    </div>
                    <div className='d-flex-center-left gap-5'>
                        <span class="material-symbols-outlined dot">location_on</span>
                        <div className='d-flex-column'>
                            <span>Distrito</span>
                        </div>
                        <span class="material-symbols-outlined arrow margin-left">keyboard_arrow_down</span>
                    </div>
                </div>
            </div>

            <div className='d-flex-column gap-5'>
                <p className='text uppercase font-bold font-13'>Opciones de despacho</p>

                <div className='envios-tag envios-tag-1'>
                    <input type='checkbox'/>

                    <span class="material-symbols-outlined">delivery_truck_speed</span>

                    <div className='w-100 d-flex-center-between gap-20'>
                        <div className='d-flex-column-center-left'>
                            <p className='text font-bold'>Entrega a domicilio</p>
                            <p className='text text-r'>Consultar disponibilidad de entrega inmediata</p>
                        </div>

                        <p className='envios-tag-pryce gratis'>Gratis</p>
                    </div>
                </div>

                <div className='envios-tag envios-tag-1'>
                    <input type='checkbox'/>

                    <span class="material-symbols-outlined">storefront</span>

                    <div className='w-100 d-flex-center-between gap-20'>
                        <div className='d-flex-column-center-left'>
                            <p className='text font-bold'>Envío por agencia</p>
                            <p className='text text-r'>Lo llevamos a la agencia que elijas o una que te recomendemos</p>
                        </div>

                        <p className='envios-tag-pryce gratis'>Gratis</p>
                    </div>
                </div>

                <div className='envios-tag envios-tag-1'>
                    <input type='checkbox'/>

                    <span class="material-symbols-outlined">storefront</span>

                    <div className='w-100 d-flex-center-between gap-20'>
                        <div className='d-flex-column-center-left'>
                            <p className='text font-bold'>Retiro en tienda</p>
                            <p className='text text-r'>De Lun - Sab de 10am a 3pm</p>
                        </div>

                        <p className='envios-tag-pryce gratis'>Gratis</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EntregaYDespacho;
