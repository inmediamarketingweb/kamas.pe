import { Helmet } from "react-helmet";

function MediosDePago(){
    return(
        <>
            <Helmet>
                <title>Medios de pagos | Kamas</title>
                <meta name="description" content="Encuentra acá nuestros medios de pago oficionales"/>
            </Helmet>

            <main className="d-flex-column gap-20">
                <div className="block-container">
                    <section className="block-content">
                        <div className="d-flex-center-left gap-10">
                            <p className="text">Inicio</p>
                            <p className="text">/</p>
                            <p className="text">Servicio al cliente</p>
                            <p className="text">/</p>
                            <p className="text">Medios de pago</p>
                        </div>
                    </section>
                </div>

                <div className="block-container">
                    <section className="block-content">
                        <img src="/assets/imagenes/pag-principal/slider/C.png" alt="" className="w-100 d-flex border-r-4" />
                    </section>
                </div>

                <div className="block-container">
                    <section className="block-content">
                        <div className="w-100 d-flex-center-center padding-20 border-r-4 bg-light-color-2 gap-10">
                            <span class="material-symbols-outlined super-icon">calendar_today</span>

                            <div className="d-flex-column">
                                <p className="block-title">Reserva tu pedido con s/100</p>
                                <p className="title text">El saldo se paga según el destino de tu compra</p>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="block-container">
                    <section className="block-content">
                        <div className="d-grid-2-1fr gap-20">
                            <div className="d-flex-center-left gap-10 padding-20 border-r-4 border-1-component">
                                <span class="material-symbols-outlined super-icon">home</span>

                                <div className="d-flex-column">
                                    <p className="block-title">Lima y Callao</p>
                                    <p className="text font-bold">Paga el saldo al recibir tu pedido</p>
                                    <p className="text">Confirma la cobertura y el medio de pago con tu asesor</p>
                                </div>
                            </div>

                            <div className="d-flex-center-left gap-10 padding-20 border-r-4 border-1-component">
                                <span class="material-symbols-outlined super-icon">delivery_truck_speed</span>

                                <div className="d-flex-column">
                                    <p className="block-title">Envíos a provincia</p>
                                    <p className="text font-bold">Paga el saldo al despachar tu pedido en la agencia de Lima o Callao</p>
                                    <p className="text">Antes del traslado a tu ciudad de destino</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="block-container">
                    <section className="block-content">
                        <div className="block-title-container">
                            <p className="block-title">Transferencias y depósitos bancarios</p>
                        </div>

                        <div className="d-flex-center-left gap-20 padding-20 border-r-4 border-1-component">
                            <svg width="140" height="auto" viewBox="6 19 454.5 119.2" xmlns="http://www.w3.org/2000/svg"><path d="m161.6 76.1c11.1 3.7 17.4 10.1 18.2 21.2.9 12.3-4.4 21.5-14.3 28.3-5.7 4-12.2 6.4-19 7.6-12.9 2.4-25.9 2.5-38.8.4-13-2.1-18.7-10-15.9-23 5.8-26.8 12-53.6 18.1-80.3.5-2.1 1.1-3.7 3.8-3.9 14.6-1.3 29.1-3.5 43.8-1 5.4.9 10.6 2.2 15.4 4.6 16.6 8.2 18.3 28 3.6 39.1-4.2 3.1-8.9 5.1-14.9 7zm-38.2 10.2c-1.9 8.7-3.7 16.7-5.5 24.6-.7 3-.3 5.4 3.3 5.6 8.4.4 16.8 0 24.3-4.4 5.7-3.3 8.1-8.5 7.3-15.1-.8-6.3-5.3-8.8-10.8-10.5-6.1-1.8-12 1.2-18.6-.2zm18.5-43.7c-2.6 1.7-7.5-2.4-9.1 3-1.7 6-2.9 12.2-4.3 18.4-.5 2.1.2 4 2.5 4.1 9 .5 18 .6 25.3-5.8 7.1-6.2 4.9-15.8-4.1-18.7-3.2-.9-6.5-.9-10.3-1zm236.8 1.5c-5.1-14-18-17.3-31.2-18.6-12.2-1.2-24.5-.6-36.7.8-4.2.5-6.3 2.1-7.3 6.5-7.2 32.8-14.7 65.6-22 98.4-.3 1.2-.9 2.5.7 4h9.6c12.2 0 15.8-2.9 18.5-14.7 1.6-7 3.2-14.1 4.7-20.9 2.5-.9 4.5-.2 6.5-.1 17.6.6 34.3-2.3 47.2-15.5 11-11.2 15.6-24.8 10-39.9zm-22 17.5c-2.4 11.4-12.2 18.5-25.7 18.6-8.8 0-9.6-1-7.7-9.9 1.6-7.3 3.3-14.5 4.6-21.8.6-3.6 2.4-5 5.9-5 3.7-.1 7.4-.3 11.1.4 9.6 1.8 13.8 8.1 11.8 17.7zm-76.7-34.2c-23.1-8.4-45.3-6.9-64.4 9.6-18.3 15.8-24.1 36.8-21.8 60.4 1.3 13.5 7 24.8 19.1 31.7 15.4 8.8 31.9 9.1 48.5 4.2 3.7-1.1 6.5-3.7 7.5-7.6 1.5-5.9 2.8-11.8 4.3-18.5-5.2 2.8-9.4 5.4-14.2 6.9-15.1 4.7-30.2-1.1-35.5-13.7-7.3-17.4 3.1-44.8 20.4-52.8 14.2-6.5 27.9-3.6 41.6 4 .8-3 1.6-5.7 2.3-8.4 2-8.3.3-12.8-7.8-15.8z" fill="#004192"/><path d="m48 35.6c13.6 6.9 24.5 16.8 32.5 29.6 4.9 7.9 4.3 16.6-1.2 24.2-11.3 15.8-26.3 27.4-43.7 35.4-11.7 5.4-24.6-.9-29.6-13.6 7-3.7 14-7.5 20.4-12.2 9.6-7 17.9-15.1 22-26.6 5.6-12.3 6.1-24.6-.4-36.8zm375 0c13.6 6.8 24.5 16.9 32.6 29.6 4.9 7.7 4.5 16.2-.8 23.7-11.4 16.2-26.7 28-44.5 36.1-11.6 5.2-24.2-1.2-29.1-13.6 6.6-3.6 13.3-7.2 19.4-11.7 9.9-7.2 18.7-15.4 22.9-27.3 5.7-12.4 6.1-24.7-.5-36.8z" fill="#f96a53"/><path d="m48 35.6c6.5 12.2 5.9 24.4.3 36.7-8.5-9.2-19.1-15.5-30.3-20.5 5.9-15.9 19.3-22.9 30-16.2zm375 0c6.6 12.2 6.2 24.4.4 36.8-8.4-9.2-18.9-15.4-30.7-20.7 3.9-8.8 9.5-15.2 18.3-18.5 4.5-1.8 8.4-.5 12 2.4z" fill="#004192"/></svg>

                            <div className="d-flex-column">
                                <p className="text text-bold">Número de cuenta</p>
                                <p className="block-title color-color-2">191-2175472-0-63</p>
                            </div>

                            <div className="d-flex-column">
                                <p className="text text-bold">Títular</p>
                                <p className="block-title color-black-2 uppercase">Productos Kamas del Perú</p>
                            </div>

                            <button type="button" className="button-link button-link-10 margin-left">
                                <span class="material-symbols-outlined">content_copy</span>
                                <p className="button-link-text">Copiar cuenta</p>
                            </button>
                        </div>
                    </section>
                </div>

                <div className="block-container">
                    <section className="block-content">
                        <div className="d-grid-2-1fr gap-20 bg-component padding-20 border-r-4">
                            <div className="d-flex-column">
                                <p className="block-title">¿Prefieres pagar desde otro banco?</p>
                                <p className="text">Consulta las opciones disponibles con un asesor</p>
                            </div>

                            <div className="d-flex w-100 h-100">
                                <a href="/" className="button-link button-link-10 margin-auto">
                                    <p className="button-link-text">Consultar opciones de pago</p>
                                </a>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="block-container">
                    <section className="block-content">
                        <div className="block-title-container">
                            <p className="block-title margin-right">Yape o Plin</p>
                        </div>

                        <div className="d-grid-2-1fr gap-20">
                            <div className="d-flex-center-left gap-20 padding-20 border-1-component border-r-4">
                                <svg width="160" height="auto" data-name="Capa 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 542.42 645.71"><g data-name="Capa 3"><path d="M491.35 442.62c-4.08-1.53-8.33-1.51-12.59-1.45-26.74.37-108.78 7-132.41 9.71-6.25.72-12.5 1.43-19.17 2.19 3.76-13.01 7.39-25.63 11.19-38.85 4.32 6.41 9.77 9.7 16.61 10.56 5.32.66 30.78-.33 52.08-29.22 20.14-27.32 27.81-58.49 26.82-92.02-.46-15.5-7.29-34.83-25.37-37.09-13.26-1.66-23.6 3.43-31.78 13.59-1.33 1.65-2.46 3.45-4.14 5.83 0-2.89.19-5.04-.04-7.15-.51-4.69-3.7-7.25-8.36-6.67-10.43 1.3-18.38 5.92-21.61 16.62-.66 2.19-1.45 4.34-2.06 6.54-6.78 24.44-23 84.62-26.15 93.39-1.79 4.97-4.5 9.24-9.55 11.47-10.11 4.47-7.8-10.43-6.53-18.18 3.54-21.56 9.99-42.36 16.31-63.2 2.55-8.44 5.9-16.64 7.82-25.25 2.63-11.77-9.87-13.69-13.14-13.93-8.49-.63-12.45 1.83-15.6 9.68-.3.75-.26 1.78-1.27 2.13-11.66-12.13-28.59-12.48-42.15-3.73-7.33 4.72-13.53 10.65-18.92 17.44-25.8 32.47-37.48 80.15-32.24 108.16 3.47 18.56 16.16 28.49 34.61 26.68 22.16-2.17 30.14-22.09 31.98-23.1 1.41 11.59 9.29 17.63 20.75 16.28 6.04-.7 11.64-2.62 17.13-5.29.05.43.18.77.12 1.05-2.4 8.83-4.86 17.64-7.18 26.49-.48 1.81-1.74 1.98-3.15 2.18-7.37 1.06-127.54 20.08-136.26 21.62.32-1.12 26.45-86.76 52.01-170.42 1.21-3.97 2.37-7.95 2.36-12.15 0-5.72-2.58-8.38-8.31-7.85-13.46 1.28-24.71 6.19-30.32 19.68-.88 2.11-1.92 4.16-2.7 6.3-3.93 10.84-7.63 21.78-11.74 32.56-17.21 45.24-34.34 71.56-48.13 71.93-5.43.15-7.36-1.73-7.14-7.2.16-4.05 1-8 2.03-11.9 4.32-16.34 10.61-32.03 15.61-48.14 2.59-8.31 5.35-16.6 5.68-25.43.28-7.67-11.42-15.28-26.24-12.55-6.25 1.15-8.45 4.4-7.05 10.91 2.38 11.12-3.65 21.89-5.03 25.77-6.27 17.62-14.22 34.67-17.71 53.22-2.89 15.37-8.84 51.63 21.72 51.89 15.65.14 30.58-7.27 42.26-20.29-.17 1.41-.15 1.96-.31 2.44-5.07 15.41-10.18 30.8-15.19 46.22-.53 1.62-1.49 2.08-2.96 2.52C54.18 505.16-2.75 556.4.1 612.87c.8 15.92 9.81 27.08 25.29 30.91 20.05 4.95 37.98.19 54.02-12.39 37.92-29.75 61.24-100.77 61.24-100.77l5.26-13.83s90.63-18.66 138.36-25.97c2.73-.42 2.52.33 2.01 2.4-1.34 5.39-2.65 10.82-2.14 16.46.34 3.78 2.07 6 5.8 6.4 10.49 1.11 19.06-2.13 22.5-11.9 1.82-5.14 3.31-10.37 4.65-15.64.45-1.8 1.23-2.61 3.25-2.82 9.17-.97 97.33-10.34 149.09-14.41 6.51-.51 13.06-.72 19.43-2.44 3.84-1.04 6.8-3.05 7.8-7.09.7-2.85 1.34-5.75 1.6-8.66.47-5.33-1.8-8.58-6.89-10.48Zm-144.85-53.9c6.04-21.94 11.67-44.01 21.46-64.68 2.53-5.33 5.6-10.36 9.8-14.59 3.1-3.12 6.78-5.05 11.11-5.81 5.32-.93 9.15 1.13 11.26 6.12 1.11 2.63 1.79 6.78 1.72 11.3-.65 13.91-5.4 27.44-11.24 40.65-3.46 7.8-7.55 15.25-13.14 21.75-5 5.81-10.63 10.71-18.67 11.66-4.07.48-7.75-.56-11.07-3.01-1.23-.9-1.62-1.94-1.23-3.37Zm-62.85-67.31c-.47 9.93-3.57 19.25-6.9 28.45-4.4 12.18-9.23 24.2-15.32 35.67-2.51 4.73-5.3 9.28-9.16 13.05-2.54 2.47-5.38 4.43-9.03 4.86-6.42.75-10.82-2.02-12.68-8.21-2.31-7.69-1.08-15.37.66-22.94 4.17-18.17 11.03-35.09 23.9-49.04 3.71-4.03 7.74-7.69 12.59-10.31 1.42-.77 2.94-1.45 4.5-1.89 7.25-2 11.18.92 11.44 8.4.02.65 0 1.3 0 1.96M98.93 543.51c-8.03 18.46-17.65 35.97-30.95 51.24-5.49 6.29-11.79 11.65-19.1 15.69-3.33 1.83-7.01 3.92-10.72 1.44-3.56-2.39-3.21-6.49-2.83-10.18 1.44-13.86 7.29-25.83 15.97-36.57 13.87-17.17 30.52-30.67 51.1-39.05.8-.33 1.63-.61 2.46-.89.2-.07.42-.04 1.17-.08-2.06 6.45-4.51 12.45-7.1 18.39Z" fill="#9117a0"/><path d="m465.67 354.8 5.41-.58c24.98-2.84 65.14-20.84 70.8-57.72 3.07-19.99-7.09-35.05-26.94-38.7-11.98-2.2-22.9 1.17-32.92 7.67-12.32 7.99-42.22 34.59-46.66 106.45-.39 6.35-.58 37.68 26.95 42.8 21.25 3.95 50.7-10.03 60.8-29.25 3.4-6.48 5.09-13.5 3.16-20.86-1.58-6.02-5.61-7.53-10.89-4.24-3.47 2.18-5.99 5.36-8.82 8.22-7.62 7.71-16.18 13.98-27.13 16.08-7.26 1.39-13.27-2.4-15.3-9.51s1.53-20.35 1.53-20.35Zm7.8-28.71c4.25-15.02 10.07-29.21 21.6-40.32a20.6 20.6 0 0 1 3.9-2.93c7.1-4.08 13.51-.3 13.57 8.29-.13 1.82-.34 4.01-1.19 6.02-6.89 16.18-18.5 26.81-35.99 30.49-1.48.32-2.42.36-1.88-1.56Z" fill="#9117a0"/><path d="M417.53 111.63c0 61.65-52.05 111.63-116.26 111.63-6.84 0-13.55-.57-20.07-1.65-3.22-.54-6.4-1.21-9.52-2-3.38-.85-6.7-1.84-9.95-2.97-2.69-.36-5.25.33-7.79 1.87-4.56 2.76-25.16 16.17-30.4 18.68-1.55.72-3.16 1.19-4.78 1.52-2.92.58-4.98-1.6-5.14-5.05-.29-5.94 4.24-36.15 3.96-40.12-.37-2.72-1.39-5.06-2.71-7.21-18.56-19.79-29.85-45.97-29.85-74.69C185.02 49.97 237.07 0 301.27 0c.62 0 1.23 0 1.84.01 4.26.07 8.45.35 12.58.84 5.87.7 11.61 1.81 17.18 3.32.07 0 .16.04.23.06 20.45 5.58 38.61 16.4 52.79 30.86 19.61 19.99 31.63 46.91 31.63 76.54Z" fill="#00ccb4"/><path d="M322.03 165.57a6.562 6.562 0 0 1-5.75-9.68l45.42-83.5a6.54 6.54 0 0 1 8.88-2.62 6.553 6.553 0 0 1 2.63 8.88l-45.42 83.5a6.56 6.56 0 0 1-5.76 3.42m-47.76-98.61c-27.77-2.04-43.75 34.58-17.16 48.82 10.75 7.19 30.48 8.23 37.16 20.03 4.51 13.16-10.4 20.94-21.9 18.39-8.32-1.16-16.01-5.68-19.19-13.52-2.29-3.93.08-10.13-2.8-14.06-1.33-1.67-3.39-2.65-5.54-2.65-13.35 1.39-5.82 25.08.15 31.23 23.18 27.51 79.41 9.74 60.48-29.53-8.29-13.03-26.44-15.48-39.34-21.95-15.83-6.17-7.05-24.28 7.79-23.04 9.35-.61 19.78 6.19 19.86 17.05-.97 8.63 12.09 10.72 13.98 2.35l.05-.03c3.14-19.36-15.5-33.98-33.55-33.09Z" fill="#9117a0"/></g></svg>

                                <div className="d-flex-center-left gap-10 w-100">
                                    <div className="d-flex-column w-100">
                                        <p className="text">Número de celular</p>
                                        <p className="block-title color-color-2 margin-bottom-10">+51 912072797</p>
                                        <p className="text">Títular</p>
                                        <p className="text font-bold uppercase">Productos Kamas del Perú</p>
                                    </div>

                                    <button type="button" className="button-link button-link-10 margin-left min-w-180">
                                        <span class="material-symbols-outlined">content_copy</span>
                                        <p className="button-link-text">Copiar número</p>
                                    </button>
                                </div>
                            </div>

                            <div className="d-flex-center-left gap-20 padding-20 border-1-component border-r-4">
                                <img src="/assets/imagenes/logos/plin.png" width={140} height="auto" alt="" />

                                <div className="d-flex-center-left gap-10 w-100">
                                    <div className="d-flex-column w-100">
                                        <p className="text">Número de celular</p>
                                        <p className="block-title color-color-2 margin-bottom-10">+51 912072797</p>
                                        <p className="text">Títular</p>
                                        <p className="text font-bold uppercase">Productos Kamas del Perú</p>
                                    </div>

                                    <button type="button" className="button-link button-link-10 margin-left min-w-180">
                                        <span class="material-symbols-outlined">content_copy</span>
                                        <p className="button-link-text">Copiar número</p>
                                    </button>
                                </div>
                            </div>

                            <div className="bg-component d-flex padding-20 border-r-4 d-grid-1-1-full-row">
                                <p className="margin-auto text font-bold">Verificar el titular y el importe antes de confirmar tu pago</p>
                            </div>

                            <div className="d-flex-center-left gap-20 padding-20 border-1-component border-r-4">
                                <span class="material-symbols-outlined super-icon">credit_card</span>

                                <div className="d-flex-column gap-5 w-100">
                                    <p className="block-title">Tarjetas de crédito y débito</p>

                                    <svg width="110" height="auto" viewBox="0.5 0.5 999 323.684" xmlns="http://www.w3.org/2000/svg"><path d="M651.185.5c-70.933 0-134.322 36.766-134.322 104.694 0 77.9 112.423 83.28 112.423 122.415 0 16.478-18.884 31.229-51.137 31.229-45.773 0-79.984-20.611-79.984-20.611l-14.638 68.547s39.41 17.41 91.734 17.41c77.552 0 138.576-38.572 138.576-107.66 0-82.316-112.89-87.537-112.89-123.86 0-12.91 15.501-27.053 47.662-27.053 36.286 0 65.892 14.99 65.892 14.99l14.326-66.204S696.614.5 651.185.5zM2.218 5.497L.5 15.49s29.842 5.461 56.719 16.356c34.606 12.492 37.072 19.765 42.9 42.353l63.51 244.832h85.138L379.927 5.497h-84.942L210.707 218.67l-34.39-180.696c-3.154-20.68-19.13-32.477-38.685-32.477H2.218zm411.865 0L347.449 319.03h80.999l66.4-313.534h-80.765zm451.759 0c-19.532 0-29.88 10.457-37.474 28.73L709.699 319.03h84.942l16.434-47.468h103.483l9.994 47.468H999.5L934.115 5.497h-68.273zm11.047 84.707l25.178 117.653h-67.454z" fill="#1434cb"/></svg>

                                    <p className="text">Pago por la web o con POS, según disponibilidad y coordinación previa</p>

                                    <div className="padding-10 border-r-4 bg-beige-claro w-100">
                                        <p className="text font-bold">Tarjetas: Incremento del 5% sobre el valor de la compra</p>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex-center-left gap-20 padding-20 border-1-component border-r-4">
                                <span class="material-symbols-outlined super-icon">payments</span>

                                <div className="d-flex-column gap-5 w-100">
                                    <p className="block-title">Efectivo y pago en tienda</p>

                                    <p className="text">Coordina el pago en soles en nuestro <b className="font-bold">Showroom</b> o al recibir el producto en zonas con cobertura.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="block-container">
                    <section className="block-content">
                        <div className="d-flex gap-20">
                            <div className="d-flex-center-left">
                                <p className="block-title">Completa tu pago en 3 pasos</p>
                            </div>

                            <div className="d-flex-center-left gap-20">
                                <div className="d-flex-center-center gap-10">
                                    <span className="big-number">01</span>

                                    <div className="d-flex-column gap-5">
                                        <p className="title-outfit">Confirma tu pedido</p>
                                        <p className="text">Producto, importe y modalidad</p>
                                    </div>
                                </div>

                                <span class="material-symbols-outlined color-color-1">chevron_right</span>

                                <div className="d-flex-center-center gap-10">
                                    <span className="big-number">02</span>

                                    <div className="d-flex-column gap-5">
                                        <p className="title-outfit">Realiza tu pago</p>
                                        <p className="text">Verificar los datos del destinatario</p>
                                    </div>
                                </div>

                                <span class="material-symbols-outlined color-color-1">chevron_right</span>

                                <div className="d-flex-center-center gap-10">
                                    <span className="big-number">03</span>

                                    <div className="d-flex-column gap-5">
                                        <p className="title-outfit">Envía tu comprobante</p>
                                        <p className="text">Tu asesor validará el abono</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="block-container">
                    <section className="block-content padding-20 border-r-4 bg-light-color-2">
                        <div className="d-flex-column d-flex-center-center gap-10">
                            <p className="block-title">¿Ya realizaste tu pago?</p>
                            <p className="title">Envía tu comprobante a tu asesor para validar el abono y continuar con tu pedido</p>

                            <div className="d-flex-center-center gap-20">
                                <a href="/" className="button-link button-link-2">
                                    <p className="button-link-text">Enviar comprobante</p>
                                </a>

                                <a href="/" className="button-link button-link-4">
                                    <p className="button-link-text">Necesito ayuda</p>
                                </a>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}

export default MediosDePago;
