import { Helmet } from "react-helmet";

function GarantiaDeProductos(){
    return(
        <>
            <Helmet>
                <title>Garantía de productos | Kamas</title>
            </Helmet>

            <main className="d-flex-column gap-20">
                <div className='block-container'>
                    <section className='block-content'>
                        <div className="d-flex-center-left gap-10">
                            <p className="text">Inicio</p>
                            <p className="text">/</p>
                            <p className="text">Atención al cliente</p>
                            <p className="text">/</p>
                            <p className="text">Garantía de productos</p>
                        </div>
                    </section>
                </div>

                <div className="block-container">
                    <section className="block-content">
                        <img src="/assets/imagenes/pag-principal/slider/C.png" alt="" className="d-flex w-100 border-r-4"/>
                    </section>
                </div>

                <div className="block-container">
                    <section className="block-content">
                        <div className="block-title-container">
                            <p className="block-title">Condiciones generales</p>
                        </div>

                        <div className="d-flex-column gap-20">
                            <div className="d-grid-2-1fr gap-20">
                                <div className="d-flex-center-left gap-20 padding-20 border-r-4 border-1-component">
                                    <span class="material-symbols-outlined super-icon">assignment</span>

                                    <div className="d-flex-column">
                                        <p className="block-title color-color-2">¿Que atiende la garantía?</p>
                                        <p className="text">Posibles defectos de fabricación y diferencias respecto de lo ofrecido o acordado al comprar.</p>
                                    </div>
                                </div>

                                <div className="d-flex-center-left gap-20 padding-20 border-r-4 border-1-component">
                                    <span class="material-symbols-outlined super-icon">assignment</span>

                                    <div className="d-flex-column">
                                        <p className="block-title color-color-2">¿Cuánto dura?</p>
                                        <p className="text">El plazo varía según la marca, el modelo y el componente. Consulta la información de tu compra.</p>
                                    </div>
                                </div>

                                <div className="padding-20 bg-light-color-2 border-r-4 gap-20 d-grid-1-1-full-row">
                                    <div className="d-grid-2-1fr gap-20 w-100">
                                        <div className="d-flex-center-center gap-10">
                                            <span class="material-symbols-outlined super-icon">bed</span>
                                            <p className="block-title color-color-2">¿Compraste un dormitorio completo?</p>
                                        </div>
                                        <p className="text">Cada componente conserva sus propias condiciones. Puedes presentar uns sola solicitud indicando qué parte requiere atención.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="block-container">
                    <section className="block-content">
                        <div className="block-title-container">
                            <p className="block-title">Consulta según tu producto</p>
                        </div>

                        <div className="d-grid-1-auto gap-20">
                            <div className="d-flex-column gap-10">
                                <p className="text">Selecciona una categoría para ver sus condiciones y cuidados.</p>

                                <div className="d-flex-column gap-10">
                                    <div className="d-flex-column">
                                        <div className="w-100 bg-color-2 d-flex-center-between padding-10-20">
                                            <div className="d-flex-center-center gap-10">
                                                <span class="material-symbols-outlined color-white">bed</span>
                                                <p className="color-white">Colchones</p>
                                            </div>

                                            <span class="material-symbols-outlined color-white">remove</span>
                                        </div>

                                        <ul className="list-simple padding-10-20">
                                            <li>
                                                <div className="d-flex gap-5">
                                                    <p className="font-bold">Evaluación:</p>
                                                    <p className="text">Núcleo, resortes, espumas, costuras y otros componentes, según el modelo</p>
                                                </div>
                                            </li>
                                            <li>
                                                <p className="text">Si observas deformaciones, comparte fotos del colchón y de su base</p>
                                            </li>
                                            <li>
                                                <div className="d-flex gap-5">
                                                    <p className="font-bold">Cuidados:</p>
                                                    <p className="text">Usa una base compatible y no lo dobles si no fue diseñado para ello.</p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="w-100 border-1-component d-flex-center-between padding-10-20 border-r-4">
                                        <div className="d-flex-center-center gap-10">
                                            <span class="material-symbols-outlined color-color-2">bed</span>
                                            <p className="text font-bold color-color-2">Colchones</p>
                                        </div>

                                        <span class="material-symbols-outlined color-color-2">add</span>
                                    </div>

                                    <div className="w-100 border-1-component d-flex-center-between padding-10-20 border-r-4">
                                        <div className="d-flex-center-center gap-10">
                                            <span class="material-symbols-outlined color-color-2">bed</span>
                                            <p className="text font-bold color-color-2">Cabeceras</p>
                                        </div>

                                        <span class="material-symbols-outlined color-color-2">add</span>
                                    </div>

                                    <div className="w-100 border-1-component d-flex-center-between padding-10-20 border-r-4">
                                        <div className="d-flex-center-center gap-10">
                                            <span class="material-symbols-outlined color-color-2">bed</span>
                                            <p className="text font-bold color-color-2">Sofás</p>
                                        </div>

                                        <span class="material-symbols-outlined color-color-2">add</span>
                                    </div>

                                    <div className="w-100 border-1-component d-flex-center-between padding-10-20 border-r-4">
                                        <div className="d-flex-center-center gap-10">
                                            <span class="material-symbols-outlined color-color-2">bed</span>
                                            <p className="text font-bold color-color-2">Muebles a medidas</p>
                                        </div>

                                        <span class="material-symbols-outlined color-color-2">add</span>
                                    </div>

                                    <div className="w-100 border-1-component d-flex-center-between padding-10-20 border-r-4">
                                        <div className="d-flex-center-center gap-10">
                                            <span class="material-symbols-outlined color-color-2">bed</span>
                                            <p className="text font-bold color-color-2">Productos para mascotas</p>
                                        </div>

                                        <span class="material-symbols-outlined color-color-2">add</span>
                                    </div>

                                    <div className="w-100 border-1-component d-flex-center-between padding-10-20 border-r-4">
                                        <div className="d-flex-center-center gap-10">
                                            <span class="material-symbols-outlined color-color-2">bed</span>
                                            <p className="text font-bold color-color-2">Complementos</p>
                                        </div>

                                        <span class="material-symbols-outlined color-color-2">add</span>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex-column gap-20">
                                <div className="d-flex-column bg-light-color-2 padding-20 border-r-4 gap-10">
                                    <span class="material-symbols-outlined super-icon">support_agent</span>
                                    <p className="title color-color-2">¿Necesitas atención?</p>

                                    <p className="text">Ten a mano los datos de tu compra y cuéntanos qué ocurrió</p>

                                    <a href="/" title="" className="button-link button-link-2 w-100">
                                        <p className="button-link-text">Solicitar atención de garantía</p>
                                    </a>

                                    <a href="/" title="" className="button-link button-link-5 w-100 d-flex-center-between">
                                        <p className="button-link-text">Cambios y devoluciones</p>
                                        <span class="material-symbols-outlined">chevron_right</span>
                                    </a>

                                    <a href="/" title="" className="button-link button-link-5 w-100 d-flex-center-between">
                                        <p className="button-link-text">Libro de reclamaciones</p>
                                        <span class="material-symbols-outlined">chevron_right</span>
                                    </a>
                                </div>

                                <div className="d-flex-center-left gap-10 border-1-component border-r-4 padding-20">
                                    <span class="material-symbols-outlined super-icon">info</span>

                                    <div className="d-flex-column">
                                        <p className="font-bold color-color-2">Productos de otras marcas</p>
                                        <p className="text">Si compraste KAMAS, contáctanos para gestionar tu atención</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="block-container">
                    <section className="block-content">
                        <div className="block-title-container">
                            <p className="block-title margin-right">Cómo solicitar atención</p>
                        </div>

                        <div className="d-grid-4-2-1 gap-20">
                            <div className="d-flex-column d-flex-center-center gap-5">
                                <span class="material-symbols-outlined super-icon-2">list_alt</span>
                                <span className="big-number-3">1</span>
                                <p className="font-bold">Indentifica tu compra</p>
                                <p className="text">Nombre, pedido o comprobante</p>
                            </div>

                            <div className="d-flex-column d-flex-center-center gap-5">
                                <span class="material-symbols-outlined super-icon-2">list_alt</span>
                                <span className="big-number-3">2</span>
                                <p className="font-bold">Describe el inconveniente</p>
                                <p className="text">Indica que ocurre y adjunta fotos si es posible</p>
                            </div>

                            <div className="d-flex-column d-flex-center-center gap-5">
                                <span class="material-symbols-outlined super-icon-2">list_alt</span>
                                <span className="big-number-3">3</span>
                                <p className="font-bold">Coordina la revisión</p>
                                <p className="text">Te indicaremos los siguientes pasos</p>
                            </div>

                            <div className="d-flex-column d-flex-center-center gap-5">
                                <span class="material-symbols-outlined super-icon-2">list_alt</span>
                                <span className="big-number-3">4</span>
                                <p className="font-bold">Recibe una respuesta</p>
                                <p className="text">Conoce el resultado y la solución aplicable</p>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="block-container">
                    <section className="block-content">
                        <div className="block-title-container">
                            <p className="block-title">Más información</p>
                        </div>

                        <div className="d-flex-column gap-10">
                            <div className="d-flex-center-between border-1-component padding-10-20 border-r-4">
                                <div className="d-flex-center-center gap-10">
                                    <span class="material-symbols-outlined super-icon">list</span>
                                    <p className="font-bold text color-color-2">Situaciones que requieren evaluación</p>
                                </div>

                                <span class="material-symbols-outlined color-color-2">add</span>
                            </div>

                            <div className="d-flex-center-between border-1-component padding-10-20 border-r-4">
                                <div className="d-flex-center-center gap-10">
                                    <span class="material-symbols-outlined super-icon">local_shipping</span>
                                    <p className="font-bold text color-color-2">Revisión y traslado del producto</p>
                                </div>

                                <span class="material-symbols-outlined color-color-2">add</span>
                            </div>

                            <div className="d-flex-center-between border-1-component padding-10-20 border-r-4">
                                <div className="d-flex-center-center gap-10">
                                    <span class="material-symbols-outlined super-icon">autorenew</span>
                                    <p className="font-bold text color-color-2">Cambios por preferencia personal</p>
                                </div>

                                <span class="material-symbols-outlined color-color-2">add</span>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="block-container">
                    <section className="block-content bg-color-2 padding-20 border-r-4">
                        <div className="d-flex-center-between">
                            <div className="d-flex-center-center gap-10">
                                <span class="material-symbols-outlined super-icon color-white">forum</span>
                                <p className="block-title color-white">Estamos para orientarte</p>
                            </div>

                            <a href="/" className="button-link button-link-11">
                                <p className="button-link-text">Contactar con postventa y garantías</p>
                            </a>
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}

export default GarantiaDeProductos;
