import { Helmet } from "react-helmet";

function MediosDePago(){
    return(
        <>
            <Helmet>
                <title>Medios de pagos | Kamas</title>
                <meta name="description" content="Encuentra acá nuestros medios de pago oficionales"/>
            </Helmet>

            <main className="main">
                <div className="block-container">
                    <section className="block-content">
                        <img src="/assets/imagenes/paginas/servicio-al-cliente/medios-de-pago/medios-de-pago.jpg" alt="" className="page-banner-img"/>
                    </section>
                </div>

                <div className="block-container">
                    <section className="block-content">
                        <div className="d-grid-2-1fr gap-20">
                            <div className="d-flex-column gap-20">
                                <div className="d-flex-column gap-5">
                                    <p className="title color-black">1.- Depósitos y transferencias bancarias:</p>

                                    <p className="text">Los depósitos y transferencias serán efectuados en las siguientes entidades bancarias Banco de crédito, Scotiabank, Interbank y BBVA Continental</p>
                                </div>

                                <div className="d-flex-column gap-5">
                                    <p className="title color-black">2.- Tarjeta Visa Débito o Crédito:</p>

                                    <p className="text">Los pagos con tarjeta Visa débito o crédito serán efectuados dentro de la misma página en el carrito de compra y la opción pagar con visa.</p>
                                    <p className="text">Asimismo ofrecemos el servicio de pago mediante POS en el domicilio del cliente, para compras en pago contraentrega pero para tal efecto el cliente deberá abonar un adelanto en garantía como seguridad y seriedad en el suceso de la compra, siendo este monto coordinado entre un asesor de Kamas y el cliente.</p>
                                </div>

                                <div className="d-flex-column gap-5">
                                    <p className="title color-black">3.- Pago Contra Rembolso:</p>

                                    <div className="d-flex-column gap-5"></div>
                                        <p className="text">Esta opción de pago es disponible únicamente para los distritos de Ate Vitarte, Barranco, Bellavista, Breña, Callao, Carmen de la Legua Reynoso, Cercado de Lima, Chorrillos, Comas, El Agustino, Independencia, Jesús María, La Molina, La Perla, La Punta, La Victoria, Lince, Los Olivos, Magdalena del Mar, Miraflores, Pueblo Libre, Rimac, San Borja, San Isidro, San Juan de Lurigancho, San Juan de Miraflores, San Luis, San Martin de Porres, San Miguel, Santa Anita, Santiago de Surco, Surquillo, Villa El Salvador, Villa Maria del Triunfo.</p>
                                        <p className="text">El cliente podrá elegir si desea pagar con Efectivo o con Tarjetas VISA al momento de la entrega ( En caso pagar con tarjeta de crédito el precio estará sujeto a un incremento del 5% del valor de la compra, siendo este monto una comisión para los prestadores de servicios efectuados en cada proceso.</p>
                                        <p className="text">El pago en efectivo deberá efectuarse necesariamente en moneda nacional.</p>
                                        <p className="text">Se podrá pagar única y solamente la totalidad de la orden de compra incluyendo el valor del flete. Kamas no asume ningún tipo de responsabilidad por no contar con el cambio necesario para el cliente.</p>
                                        <p className="text">No se podrá realizar un pago menor al monto total de la Orden de Compra.</p>
                                        <p className="text">Todos los productos que aparecen en la web, no aplican necesariamente para Pago Contra Rembolso, verifique la disponibilidad de este medio durante el proceso de compra de sus productos.</p>
                                        <p className="text">Las ofertas de tiempo limitado no aplican para este medio de pago.</p>
                                        <p className="text">El cliente deberá encontrarse en la dirección de despacho al momento de realizar el pago de su orden de lo contrario, se reprogramará la entrega para la fecha más cercana, estando sujeta dicha reprogramación a un costo adicional.</p>
                                </div>

                                <div className="d-flex-column gap-5">
                                    <p className="title color-black">4.- Pago en tienda:</p>

                                    <p className="text">En caso el cliente visite nuestras instalaciones, deberá realizar su compra necesariamente realizando el pago de su compra o en defecto dejando un anticipo para la seguridad y seriedad del proceso de compra.</p>
                                </div>

                                <div className="d-flex-column gap-5">
                                    <p className="title color-black">5.- Yape y plin:</p>

                                    <p className="text">Asimismo aceptamos pagos con yape y plim, asumiendo que el cliente conoce que los pagos máximos por día de yape son de 500 soles y de plim de 1500 soles, quedando fuera de nuestra responsabilidad el desconocimiento del cliente para efectos de realizar el pago.</p>
                                </div>
                            </div>

                            <div className="d-flex">
                                <img src="/assets/imagenes/paginas/servicio-al-cliente/medios-de-pago/medios-de-pago-2.jpg" alt="" className="d-flex w-100"/>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}

export default MediosDePago;
