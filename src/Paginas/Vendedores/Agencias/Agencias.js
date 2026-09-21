import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useSearchParams } from 'react-router-dom';

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

const normalizeText = (text) => {
    if (!text) return '';
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim();
};

const getDistritoByNombre = (datos, nombre) => {
    if (!datos || !nombre) return null;

    const nombreNormalizado = normalizeText(nombre);

    for (const depto of datos.departamentos) {
        for (const prov of depto.provincias) {
            for (const dist of prov.distritos) {
                const distritoNormalizado = normalizeText(dist.distrito);
                if (distritoNormalizado === nombreNormalizado) {
                    return {
                        ...dist,
                        departamento: depto.departamento,
                        provincia: prov.provincia
                    };
                }
            }
        }
    }
    return null;
};

const buscarDistritos = (datos, term) => {
    if (!datos || !term || term.length < 1) return [];

    const termNormalizado = normalizeText(term);
    const resultados = [];
    const seen = new Set();

    datos.departamentos.forEach(depto => {
        depto.provincias.forEach(prov => {
            prov.distritos.forEach(dist => {
                const distritoNormalizado = normalizeText(dist.distrito);
                const provinciaNormalizado = normalizeText(prov.provincia);
                const departamentoNormalizado = normalizeText(depto.departamento);

                if (
                    distritoNormalizado.includes(termNormalizado) ||
                    provinciaNormalizado.includes(termNormalizado) ||
                    departamentoNormalizado.includes(termNormalizado)
                ) {
                    const key = `${dist.distrito}-${prov.provincia}-${depto.departamento}`;
                    if (!seen.has(key)) {
                        seen.add(key);

                        let priority = 0;
                        if (distritoNormalizado === termNormalizado) {
                            priority = 3;
                        } else if (distritoNormalizado.startsWith(termNormalizado)) {
                            priority = 2;
                        } else if (provinciaNormalizado === termNormalizado) {
                            priority = 1;
                        } else if (departamentoNormalizado === termNormalizado) {
                            priority = 1;
                        }

                        resultados.push({
                            ...dist,
                            departamento: depto.departamento,
                            provincia: prov.provincia,
                            priority: priority,
                            distritoNormalizado: distritoNormalizado
                        });
                    }
                }
            });
        });
    });

    resultados.sort((a, b) => b.priority - a.priority);
    return resultados.slice(0, 10);
};

const highlightText = (text, highlight) => {
    if (!highlight || highlight.length < 1 || !text) return text;
    const highlightLower = highlight.toLowerCase();
    const textLower = text.toLowerCase();
    const highlightIndex = textLower.indexOf(highlightLower);

    if (highlightIndex === -1) return text;

    return (
        <>
            {text.substring(0, highlightIndex)}
            <span className='highlight'>{text.substring(highlightIndex, highlightIndex + highlight.length)}</span>
            {text.substring(highlightIndex + highlight.length)}
        </>
    );
};

const hasAgencias = (distrito) => {
    if (!distrito || !distrito['agencias-recomendadas']) return false;
    return distrito['agencias-recomendadas'].some(
        (agencia) => agencia.sedes && agencia.sedes.length > 0
    );
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
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                setLoading(true);
                const response = await fetch('/assets/json/costos-de-envio.json');

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

    // ==================== LÓGICA DE RUTAS (query params) ====================
    useEffect(() => {
        if (datos) {
            const queryDistrito = searchParams.get('distrito');
            if (queryDistrito) {
                const distritoEncontrado = getDistritoByNombre(datos, queryDistrito);
                if (distritoEncontrado) {
                    setSelectedDistrito(distritoEncontrado);
                    setSearchTerm(distritoEncontrado.distrito);
                }
            }
        }
    }, [datos, searchParams]);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value !== selectedDistrito?.distrito) {
            setSelectedDistrito(null);
            setSelectedAgencia(null);
        }

        if (value.length >= 1) {
            const resultados = buscarDistritos(datos, value);
            setSearchResults(resultados);
            setShowSearchResults(true);
        } else {
            setShowSearchResults(false);
            setSearchResults([]);
            setSelectedDistrito(null);
            setSelectedAgencia(null);
            setSearchParams({});
        }
    };

    // Busca y muestra resultados (o selecciona si hay uno solo)
    const ejecutarBusqueda = () => {
        if (searchTerm.length < 1) return;

        const resultados = buscarDistritos(datos, searchTerm);
        setSearchResults(resultados);

        if (resultados.length === 1) {
            seleccionarDistrito(resultados[0]);
            setShowSearchResults(false);
        } else {
            setShowSearchResults(true);
        }
    };

    const handleSearchClick = () => {
        ejecutarBusqueda();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            ejecutarBusqueda();
        }
    };

    const seleccionarDistrito = (dist) => {
        setSelectedDistrito(dist);
        setSelectedAgencia(null);
        setSearchTerm(dist.distrito);
        setShowSearchResults(false);
        setExpandedAgencias({});
        setSearchParams({ distrito: dist.distrito });
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
        if (!distrito) return false;
        const provinciasLimaCallao = [
            "Lima metropolitana",
            "Provincia constitucional del Callao"
        ];
        return provinciasLimaCallao.includes(distrito.provincia);
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
        return (
            <SpinnerLoading />
        );
    }

    if (error) {
        return (
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

    return (
        <>
            <Helmet>
                <title>Agencias recomendadas | Kamas</title>
                <meta name="description" content="Te ayudamos a encontrar la mejor alternativa para llevar tu dormitorio a tu distrito." />

                <link rel="preload" as="image" href="https://inmedia.pe/Proyectos/JSON/agencias.json" />

                <meta property="og:title" content="Agencias recomendadas | Kamas" />
                <meta property="og:site_name" content="Agencias recomendadas | Kamas" />
                <meta property="og:description" content="Te ayudamos a encontrar la mejor alternativa para llevar tu dormitorio a tu distrito." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://kamas.pe/agencias-recomendadas/" />
                <link rel="canonical" href="https://kamas.pe/agencias-recomendadas/" />
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
                                        <input
                                            type='text'
                                            placeholder='Busca tu distrito'
                                            value={searchTerm}
                                            onChange={handleSearchChange}
                                            onKeyDown={handleKeyDown}
                                        />
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
                                                                    <p className='margin-right title color-black'>
                                                                        {highlightText(dist.distrito, searchTerm)}
                                                                    </p>
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
                                        {selectedDistrito && hasAgencias(selectedDistrito) ? (
                                            selectedDistrito['agencias-recomendadas'].map((agencia, index) => (
                                                agencia.sedes && agencia.sedes.map((sede, sedeIndex) => {
                                                    const agenciaKey = `${index}-${sedeIndex}`;
                                                    const isExpanded = expandedAgencias[agenciaKey];

                                                    return (
                                                        <li key={`${index}-${sedeIndex}`} className='d-flex-column gap-10'>
                                                            <div className='d-flex w-100'>
                                                                <button type='button' className='d-flex-center-between w-100' onClick={() => {
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
                                                                            <p className='text'>✔ Sede:</p>
                                                                            <p className='text'>{sede.sede}</p>
                                                                        </div>
                                                                        <div className='d-flex-center-left gap-5'>
                                                                            {/* <p className='text'>✔ Dirección:</p> */}
                                                                            {/* <p className='text'>{sede.direccion || 'No disponible'}</p> */}
                                                                        </div>
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

                                    <div className='d-flex-column gap-10'>
                                        {selectedAgencia ? (
                                            <div className='agencia-details'>
                                                <div className='d-flex-column gap-20'>
                                                    <div className='d-flex-column'>
                                                        <p className='block-title d-flex'>{selectedAgencia.agencia.agencia}</p>

                                                        <div className='d-flex-column gap-5'>
                                                            <div className='d-flex-center-left gap-5'>
                                                                <p className='text'>✔ Sede:</p>
                                                                <p className='text'>{selectedAgencia.sede.sede}</p>
                                                            </div>

                                                            <div className='d-flex-center-left gap-5'>
                                                                {/* <p className='text'>✔ Dirección:</p> */}
                                                                {/* <p className='text'>{selectedAgencia.sede.direccion || 'No disponible'}</p> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : selectedDistrito ? (
                                            <div className='distrito-details'>
                                                <div className='d-flex-column gap-20'>
                                                    <div className='d-flex-column gap-10'>
                                                        <p className='block-title d-flex'>{selectedDistrito.distrito}</p>

                                                        {isLimaOrCallao(selectedDistrito) ? (
                                                            <div className="message message-note">
                                                                <span className="material-symbols-outlined">check_circle</span>
                                                                <p>Envío gratis para Lima y Callao</p>
                                                            </div>
                                                        ) : !hasAgencias(selectedDistrito) ? (
                                                            <div className="message message-warning">
                                                                <span className="material-symbols-outlined">sentiment_dissatisfied</span>
                                                                <p>Lo sentimos, no conocemos agencias recomendadas para este distrito, sin embargo podemos ayudarte a encontrar la mejor.</p>
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

                            <div className='d-flex-column gap-20'>
                                <img src="/assets/imagenes/paginas/envios-a-nivel-nacional.png" alt="Envíos a provincia | Kamas" className='page-banner-img' />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Agencias;
