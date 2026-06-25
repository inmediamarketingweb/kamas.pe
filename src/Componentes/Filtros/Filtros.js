import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import './Filtros.css';

import './Componentes/Top/Top';

function Filtros({ onCambiarPrecio, isOpen, onClose }) {
    const [rangosSeleccionados, setRangosSeleccionados] = useState([]);
    const [filtros, setFiltros] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);

    const parseParam = (param) => {
        return param ? param.replace(/-/g, ' ') : null;
    };

    const categoriaSeleccionada = parseParam(searchParams.get('categoria'));

    const detallesSeleccionados = {};
    searchParams.forEach((value, key) => {
        if (key !== 'categoria') {
            detallesSeleccionados[key] = value;
        }
    });

    const opcionesPrecio = [
        { label: 'Hasta S/.500', value: '0-500' },
        { label: 'S/.501 - S/.1000', value: '501-1000' },
        { label: 'S/.1001 - S/.1500', value: '1001-1500' },
        { label: 'S/.1501 - S/.2000', value: '1501-2000' },
        { label: 'Desde S/.2000', value: '2001-99999' }
    ];

    const togglePrecio = (valor) => {
        const nuevos = rangosSeleccionados.includes(valor) ? [] : [valor];
        setRangosSeleccionados(nuevos);
        onCambiarPrecio(nuevos);
    };

    useEffect(() => {
        fetch('/assets/json/filtros.json')
            .then(response => {
                if (!response.ok) throw new Error('Error en la respuesta');
                return response.json();
            })
            .then(data => {
                const categoriasDisponibles = data.map(item => item.categoria);
                setCategorias(categoriasDisponibles);

                if(categoriaSeleccionada){
                    const categoriaData = data.find(
                        item => item.categoria.toLowerCase() === categoriaSeleccionada.toLowerCase()
                    );

                    if(categoriaData && categoriaData.filtros){
                        setFiltros(categoriaData.filtros);
                    } else {
                        setFiltros([]);
                    }
                }
            })
            .catch(error => {
                console.error('Error fetching filters:', error);
                setFiltros([]);
                setCategorias([]);
            });
    }, [categoriaSeleccionada]);

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    const handleSelectCategoria = (categoria) => {
        const newSearchParams = new URLSearchParams();
        const transformedCategoria = categoria.replace(/\s+/g, '-');
        newSearchParams.set('categoria', transformedCategoria);
        navigate({
            pathname: location.pathname,
            search: newSearchParams.toString()
        });
    };

    const handleSelectDetalle = (detalleKey, valor) => {
        const newSearchParams = new URLSearchParams(location.search);
        const valorFormateado = valor.replace(/\s+/g, '-').toLowerCase();

        if (newSearchParams.get(detalleKey) === valorFormateado) {
            newSearchParams.delete(detalleKey);
        } else {
            newSearchParams.set(detalleKey, valorFormateado);
        }
        
        navigate({
            pathname: location.pathname,
            search: newSearchParams.toString()
        });
    };

    const isDetalleSeleccionado = (detalleKey, valor) => {
        const valorActual = detallesSeleccionados[detalleKey] || '';
        return valorActual.toLowerCase() === valor.replace(/\s+/g, '-').toLowerCase();
    };

    const limpiarFiltros = () => {
        const newSearchParams = new URLSearchParams();

        setRangosSeleccionados([]);
        onCambiarPrecio([]);

        navigate({
            pathname: location.pathname,
            search: newSearchParams.toString()
        });
    };

    return(
        <>
            <div className={`filtros-layer ${isOpen ? 'active' : ''}`} onClick={onClose}></div>

            <div className={`filtros-container-global ${isOpen ? 'active' : ''}`}>
                <div className='filtros-container'>
                    <div className='filtros-top d-flex-column'>
                        <button type='button' className='filtros-button-close margin-left' onClick={onClose}>
                            <span className="material-symbols-outlined">close</span>
                        </button>

                        <p className='block-title d-flex color-color-1'>Kamas</p>
                        <p className='title uppercase'>Las mejores ofertas en muebles para el hogar 🛌</p>
                    </div>

                    <div className='filtros-content'>
                        <div className='filtros-content-categorias d-flex-column gap-10'>
                            <p className='title'>Categorías</p>
                            <ul className='filtro-items'>
                                {categorias.map((categoria, idx) => (
                                    <li key={idx}>
                                        <button type='button' className={categoriaSeleccionada === categoria ? 'active' : ''} onClick={() => handleSelectCategoria(categoria)}>
                                            <span className='first-uppercase'>{categoria}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className='filtros-prices-container d-flex-column gap-10'>
                            <p className='title'>Precio</p>
                            <ul className='filtro-items'>
                                {opcionesPrecio.map((rango, idx) => (
                                    <li key={idx}>
                                        <button type='button' className={rangosSeleccionados.includes(rango.value) ? 'active' : ''} onClick={() => togglePrecio(rango.value)}>
                                            <span>{rango.label}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {categoriaSeleccionada && filtros.length === 0 && (
                            <p className='sin-filtros'>No se encontraron filtros para esta categoría.</p>
                        )}

                        {categoriaSeleccionada && filtros.length > 0 && (
                            <div className='filtros-detalles-container d-flex-column gap-10 margin-top-20'>
                                <p className='title'>Detalles</p>

                                {filtros.map((filtroObj, index) => {
                                    const filtroKey = Object.keys(filtroObj)[0];
                                    const opciones = filtroObj[filtroKey];

                                    return(
                                        <div key={index} className='d-flex-column'>
                                            <p className='filtro-detalle-title first-uppercase'>{filtroKey.replace(/-/g, ' ')}</p>
                                            <ul className='filtro-items'>
                                                {opciones.map((opcion, idx) => {
                                                    const valor = Object.values(opcion)[0];
                                                    return(
                                                        <li key={idx}>
                                                            <button type='button' className={isDetalleSeleccionado(filtroKey, valor) ? 'active' : ''} onClick={() => handleSelectDetalle(filtroKey, valor)}>
                                                                <span className='first-uppercase'>{valor}</span>
                                                            </button>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    <button type='button' className='button-link button-link-2' onClick={limpiarFiltros}>
                        <span className="material-symbols-outlined">delete</span>
                        <p className='button-link-text'>Limpiar filtros</p>
                    </button>

                    <a href='/' title='' className='d-flex w-100'>
                        <img className='d-flex w-100 border-r-6' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLSqMfXCWuQRrMPMrKzGTv2_BbOKgVXCSlNoxfbzgYFG4Mh61HcXrSnKAX&s=10" alt="" />
                    </a>
                </div>
            </div>
        </>
    );
}

export default Filtros;
