import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';

import './Agencias.css';

import SpinnerLoading from '../../../Componentes/SpinnerLoading/SpinnerLoading';

const useMobile = () => {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        return () => {
            window.removeEventListener('resize', checkIfMobile);
        };
    }, []);

    return isMobile;
};

function Agencias(){
    const [datos, setDatos] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [selectedDistrito, setSelectedDistrito] = useState(null);
    const [selectedAgencia, setSelectedAgencia] = useState(null);
    const [error, setError] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedAgencias, setExpandedAgencias] = useState({});
    const searchRef = useRef(null);
    const isMobile = useMobile();

    useEffect(() => {
        const cargarDatos = async () => {
            try{
                setLoading(true);
                const proxyUrl = 'https://corsproxy.io/?';
                const targetUrl = 'https://inmedia.pe/Proyectos/JSON/agencias.json';
                const response = await fetch(proxyUrl + encodeURIComponent(targetUrl));

                if (!response.ok) {
                    throw new Error('No se pudo cargar el archivo JSON');
                }
                const data = await response.json();
                setDatos(data);
                setError(null);
            } catch (err) {
                console.error('Error al cargar los datos:', err);
                setError('Error al cargar los datos. Intente recargar la página.');
            } finally {
                setLoading(false);
            }
        };
        cargarDatos();
    }, []);

    const buscarDistritos = (term) => {
        if (!datos) return [];
        const termLower = term.toLowerCase();
        const resultados = [];
        datos.departamentos.forEach(depto => {
            depto.provincias.forEach(prov => {
                prov.distritos.forEach(dist => {
                    if (dist.distrito.toLowerCase().includes(termLower)) {
                        resultados.push({
                            ...dist,
                            departamento: depto.departamento,
                            provincia: prov.provincia
                        });
                    }
                });
            });
        });
        setSearchResults(resultados);
        return resultados;
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value.length >= 2) {
            buscarDistritos(value);
            setShowSearchResults(true);
        } else {
            setShowSearchResults(false);
            setSearchResults([]);
        }
    };

    const handleSearchClick = () => {
        if (searchTerm.length >= 2) {
            const resultados = buscarDistritos(searchTerm);
            setShowSearchResults(true);
            
            if (resultados.length === 1) {
                seleccionarDistrito(resultados[0]);
                setShowSearchResults(false);
            }
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (searchResults.length === 1) {
                seleccionarDistrito(searchResults[0]);
                setShowSearchResults(false);
            } else {
                handleSearchClick();
            }
        }
    };

    const seleccionarDistrito = (dist) => {
        setSelectedDistrito(dist);
        setSelectedAgencia(null);
        setSearchTerm(dist.distrito);
        setShowSearchResults(false);
        setExpandedAgencias({});
    };

    const seleccionarAgencia = (agencia, sede) => {
        setSelectedAgencia({ agencia, sede });
    };

    const toggleAgenciaInfo = (agenciaKey) => {
        setExpandedAgencias(prev => ({
            ...prev,
            [agenciaKey]: !prev[agenciaKey]
        }));
    };

    const isLimaOrCallao = (distrito) => {
        const provinciasLimaCallao = [
            "Lima metropolitana", 
            "Provincia constitucional del Callao"
        ];
        return provinciasLimaCallao.includes(distrito.provincia);
    };

    const hasEnvioDirecto = (distrito) => {
        return distrito['envio-directo'] && parseFloat(distrito['envio-directo']) > 0;
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSearchResults(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    if (loading) {
        return(
            <SpinnerLoading/>
        );
    }

    if(error){
        return(
            <div className="error-container">
                <div className="message message-error">
                    <span className="material-symbols-outlined">error</span>
                    <p>{error}</p>
                    <div className="error-details">
                        <p>Posibles causas:</p>
                        <ul>
                            <li>Problemas de conexión a internet</li>
                            <li>El recurso solicitado no está disponible</li>
                            <li>Restricciones de seguridad del navegador</li>
                        </ul>
                    </div>
                    <button className="reload-button" onClick={() => window.location.reload()}>
                        <span className="material-symbols-outlined">refresh</span>
                        Recargar página
                    </button>
                </div>
            </div>
        );
    }

    return(
        <>
            <Helmet>
                <title>Agencias recomendadas | Kamas</title>
                <meta name="description" content="Te ayudamos a encontrar la mejor alternativa para llevar tu dormitorio a tu distrito."/>

                <link rel="preload" as="image" href="https://inmedia.pe/Proyectos/JSON/agencias.json" />

                <meta property="og:title" content="Agencias recomendadas | Kamas"/>
                <meta property="og:site_name" content="Agencias recomendadas | Kamas"/>
                <meta property="og:description" content="Te ayudamos a encontrar la mejor alternativa para llevar tu dormitorio a tu distrito."/>
                <meta property="og:type" content="website"/>
                <meta property="og:url" content="https://kamas.pe/agencias-recomendadas/"/>
                <link rel="canonical" href="https://kamas.pe/agencias-recomendadas/"/>
            </Helmet>

            <main>
                <section className='block-container'>
                    <div className='block-content'>
                        <div className='block-title-container'>
                            <h1 className='block-title'>Agencias recomendadas</h1>
                        </div>

                        <div className='d-grid-2-1fr gap-20'>
                            <div className='d-flex-column gap-10'>
                                <div className='position-relative' ref={searchRef}>
                                    <div className='agencias-search-bar-container'>
                                        <input type='text' placeholder='Busca tu distrito'value={searchTerm} onChange={handleSearchChange} onKeyDown={handleKeyDown}/>
                                        <button type='button' onClick={handleSearchClick}>
                                            <span className="material-symbols-outlined">search</span>
                                        </button>
                                    </div>

                                    {showSearchResults && (
                                        <div className='agencias-resultados'>
                                            <ul>
                                                {searchResults.length > 0 ? (
                                                    searchResults.map((dist, index) => (
                                                        <li key={index}>
                                                            <button type='button' onClick={() => seleccionarDistrito(dist)}>
                                                                <div className='d-flex-column'>
                                                                    <div className='d-flex gap-5'>
                                                                        <p className='color-gray italic font-13'>{dist.departamento},</p>
                                                                        <p className='color-gray italic font-13'>{dist.provincia}</p>
                                                                    </div>
                                                                    <p className='margin-right title color-black'>{dist.distrito}</p>
                                                                </div>
                                                                <span className="material-symbols-outlined">arrow_forward</span>
                                                            </button>
                                                        </li>
                                                    ))
                                                ) : (
                                                <li>
                                                    <button type='button'>
                                                        <p>No se encontraron resultados</p>
                                                    </button>
                                                </li>
                                                )}
                                            </ul>
                                        </div>
                                    )}
                                </div>

                                <div className='agencias-resultados-2 d-flex-column gap-10'>
                                    <p className='Text'>✔ Selecciona una agencia</p>
                                        <ul className='d-flex-column gap-10'>
                                            {selectedDistrito && selectedDistrito.agencias ? (
                                                selectedDistrito.agencias.map((agencia, index) => (
                                                    agencia.sedes.map((sede, sedeIndex) => {
                                                        const agenciaKey = `${index}-${sedeIndex}`;
                                                        const isExpanded = expandedAgencias[agenciaKey];
                                                        
                                                        return(
                                                            <li key={`${index}-${sedeIndex}`} className='d-flex-column gap-10'>
                                                                <div className='d-flex w-100'>
                                                                    <button type='button' className='d-flex-center-between w-100'onClick={() => {
                                                                            if (isMobile) {
                                                                                toggleAgenciaInfo(agenciaKey);
                                                                            }
                                                                            else {
                                                                                seleccionarAgencia(agencia, sede);
                                                                            }
                                                                        }}
                                                                    >
                                                                        <div className='d-flex-center-left'>
                                                                            <span className="material-symbols-outlined margin-top margin-bottom">location_on</span>
                                                                            <div className='d-flex-column'>
                                                                                <p className='title'>{agencia.agencia}</p>
                                                                                <p className='text italic'>{sede.sede}</p>
                                                                            </div>
                                                                        </div>
                                                                        
                                                                        {isMobile && (
                                                                            <span className="material-symbols-outlined expand-icon">
                                                                                {isExpanded ? 'expand_less' : 'expand_more'}
                                                                            </span>
                                                                        )}
                                                                    </button>
                                                                </div>
                                                                
                                                                {isMobile && isExpanded && (
                                                                    <div className='agencia-mobile-details'>
                                                                        <div className='d-flex-column gap-10'>
                                                                            <div className='d-flex-center-left gap-5'>
                                                                                <p className='text'>✔ Costo flete:</p>
                                                                                <div className='d-flex gap-5'>
                                                                                    <p className='title color-color-1'>S/.{sede['envio-por-agencia'] || '00.00'}</p>
                                                                                    <p className=''>aprox.</p>
                                                                                </div>
                                                                            </div>
                                                                            
                                                                            {hasEnvioDirecto(selectedDistrito) && (
                                                                                <div className='tipo-de-envio envío-directo'>
                                                                                    <div className='d-flex-column'>
                                                                                        <span className="material-symbols-outlined">local_shipping</span>
                                                                                        <p className='tipo-envio-title'>Envío directo</p>
                                                                                    </div>

                                                                                    <p className='tipo-de-envio-price'>
                                                                                        {isLimaOrCallao(selectedDistrito) ? (
                                                                                           <div className='message message-note'>
                                                                                               <span className="material-symbols-outlined">local_shipping</span>
                                                                                               <p className="text">Envío gratis para Lima y Callao</p>
                                                                                            </div>
                                                                                        ) : (
                                                                                            `S/.${selectedDistrito['envio-directo']}`
                                                                                        )}
                                                                                    </p>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </li>
                                                        );
                                                    })
                                                ))
                                            ) : selectedDistrito ? (
                                                isLimaOrCallao(selectedDistrito) ? (
                                                    <li>
                                                        <div className="message message-note">
                                                            <span className="material-symbols-outlined">check_circle</span>
                                                            <p>¿Vives en Lima o Callao? El envío de tu dormitorio king es gratis.</p>
                                                        </div>
                                                    </li>
                                                ) : (
                                                    <li>
                                                        <div className="message message-warning">
                                                            <span className="material-symbols-outlined">error</span>
                                                            <p>Lo sentimos, no conocemos agencias recomendadas para este distrito, sin embargo podemos ayudarte a encontrar la mejor.</p>
                                                        </div>
                                                    </li>
                                                )
                                            ) : (
                                                <div className='message message-note'>
                                                    <span className="material-symbols-outlined">search</span>
                                                    <p>Busca tu distrito para ver las agencias recomendadas.</p>
                                                </div>
                                            )}
                                        </ul>
                                </div>
                            </div>

                            <div className='d-flex-column gap-20'>
                                <img src="/assets/imagenes/paginas/envios/envios-a-provincia.jpg" alt="Envíos a provincia" className='page-banner-img' />

                                {selectedAgencia ? (
                                    <div className='agencia-details'>
                                        <div className='d-flex-column gap-20'>
                                            <div className='d-flex-column'>
                                                <p className='block-title d-flex'>{selectedAgencia.agencia.agencia}</p>

                                                <div className='d-flex-center-between'>
                                                    <div className='d-flex-column'>
                                                        <div className='d-flex-center-left gap-5'>
                                                            <p className='text'>✔ Sede:</p>
                                                            <p className='text'>{selectedAgencia.sede.sede}</p>
                                                        </div>

                                                        <div className='d-flex-center-left gap-5'>
                                                            <p className='text'>✔ Dirección:</p>
                                                            <p className='text'>{selectedAgencia.sede.direccion || 'No disponible'}</p>
                                                        </div> 
                                                    </div>

                                                    <a href={selectedAgencia.sede.link || '#'} title='Ir' target='_blank' rel="noopener noreferrer" className='direction-link'>
                                                        <span className="material-symbols-outlined">directions</span>
                                                        <p>Ir</p>
                                                    </a>
                                                </div>
                                            </div>

                                            <div className='d-grid-2-1fr gap-10'>
                                                <div className='d-flex-column gap-10'>
                                                    <div className='d-flex-center-left gap-5'>
                                                        <p className='title'>✔ Costo flete:</p>
                                                        <p className='block-title color-color-1'>S/.{selectedAgencia.sede['envio-por-agencia'] || '00.00'}</p>
                                                        <p className='text font-13'>aprox.</p>
                                                    </div>

                                                    <div className="message message-warning margin-right">
                                                        <span className="material-symbols-outlined">warning</span>
                                                        <p>El precio mostrado es un aproximado por el envío de un dormitorio completo tamaño king. El precio será confirmado por la agencia al momento de realizar el envío.</p>
                                                    </div>
                                                </div>

                                                {hasEnvioDirecto(selectedDistrito) && (
                                                    <div className='d-flex-column gap-10'>
                                                        <div className='tipo-de-envio envío-directo'>
                                                            <div className='d-flex-column'>
                                                                <span className="material-symbols-outlined">local_shipping</span>
                                                                <p className='tipo-envio-title'>Envío directo</p>
                                                            </div>
                                                            <p className='tipo-de-envio-price'>
                                                                {isLimaOrCallao(selectedDistrito) ? (
                                                                    <div className='message message-note'>
                                                                        <span className="material-symbols-outlined">local_shipping</span>
                                                                        <p className="text">Envío gratis para Lima y Callao</p>
                                                                    </div>
                                                                ) : (
                                                                    `S/.${selectedDistrito['envio-directo']}`
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ) : selectedDistrito ? (
                                    <div className='distrito-details'>
                                        <div className='d-flex-column gap-20'>
                                            <div className='d-flex-column gap-10'>
                                                <p className='block-title d-flex'>{selectedDistrito.distrito}</p>

                                                {!isLimaOrCallao(selectedDistrito) && hasEnvioDirecto(selectedDistrito) && (
                                                    <div className='d-flex-column'>
                                                        <p className='text'>Contamos con envío directo para {selectedDistrito.distrito}. Llevamos tus productos a tu domicilio el día y a la hora que lo necesites.</p>
                                                    </div>
                                                )}

                                                {hasEnvioDirecto(selectedDistrito) && (
                                                    <div className='tipo-de-envio envío-directo'>
                                                        <div className='d-flex-column'>
                                                            <span className="material-symbols-outlined">local_shipping</span>
                                                            <p className='tipo-envio-title'>Envío directo</p>
                                                        </div>
                                                        <p className='tipo-de-envio-price'>
                                                            {isLimaOrCallao(selectedDistrito) ? (
                                                                <div className='message message-note'>
                                                                    <span className="material-symbols-outlined">local_shipping</span>
                                                                    <p>Envío gratis para Lima y Callao</p>
                                                                </div>
                                                            ) : (
                                                                `S/.${selectedDistrito['envio-directo']}`
                                                            )}
                                                        </p>
                                                    </div>
                                                )}

                                                {isLimaOrCallao(selectedDistrito) ? (
                                                    <div className="message message-note">
                                                        <span className="material-symbols-outlined">check_circle</span>
                                                        <p>Envío gratis para Lima y Callao</p>
                                                    </div>
                                                ) : !selectedDistrito.agencias && !hasEnvioDirecto(selectedDistrito) ? (
                                                    <div className="message message-warning">
                                                        <span className="material-symbols-outlined">sentiment_dissatisfied</span>
                                                        <p>Lo sentimos, no conocemos agencias recomendadas para este distrito, sin embargo podemos ayudarte a encontrar la mejor.</p>
                                                    </div>
                                                ) : !selectedDistrito.agencias ? (
                                                    <div className="message message-note">
                                                        <span className="material-symbols-outlined">local_shipping</span>
                                                        <p>Contamos con envío directo a este distrito</p>
                                                    </div>
                                                ) : (
                                                    <div className="message message-note">
                                                        <span className="material-symbols-outlined">sentiment_satisfied</span>
                                                        <p>Realizamos envíos inmediatos a provincia a traves de la agencia de tu preferencia.</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className='message message-note'>
                                        <span className="material-symbols-outlined">search</span>
                                        <p>Busca y selecciona una agencia para ver los detalles.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Agencias;
