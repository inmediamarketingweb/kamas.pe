import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import './Filtros.css';

import './Componentes/Top/Top';

function Filtros({ onCambiarPrecio, isOpen, onClose }){
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
    const detallesProductoParam = searchParams.get('detalles-del-producto');
    const detallesSeleccionados = detallesProductoParam ? JSON.parse(detallesProductoParam) : {};

    const opcionesPrecio = [
        { label: 'Hasta S/.500', value: '0-500' },
        { label: 'S/.501 - S/.1000', value: '501-1000' },
        { label: 'S/.1001 - S/.1500', value: '1001-1500' },
        { label: 'S/.1501 - S/.2000', value: '1501-2000' },
        { label: 'Desde S/.2000', value: '2001-99999' }
    ];

    const togglePrecio = (valor) => {
        const yaExiste = rangosSeleccionados.includes(valor);
        const nuevos = yaExiste
            ? rangosSeleccionados.filter(v => v !== valor)
            : [...rangosSeleccionados, valor];

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
        const detallesActuales = { ...detallesSeleccionados };
        
        if (detallesActuales[detalleKey] === valor) {
            delete detallesActuales[detalleKey];
        } else {
            detallesActuales[detalleKey] = valor;
        }

        if (Object.keys(detallesActuales).length === 0) {
            newSearchParams.delete('detalles-del-producto');
        } else {
            newSearchParams.set('detalles-del-producto', JSON.stringify(detallesActuales));
        }

        navigate({
            pathname: location.pathname,
            search: newSearchParams.toString()
        });
    };

    const isDetalleSeleccionado = (detalleKey, valor) => {
        return detallesSeleccionados[detalleKey] === valor;
    };

    const limpiarFiltros = () => {
        const newSearchParams = new URLSearchParams();
        if(categoriaSeleccionada){
            const transformedCategoria = categoriaSeleccionada.replace(/\s+/g, '-');
            newSearchParams.set('categoria', transformedCategoria);
        }
        navigate({
            pathname: location.pathname,
            search: newSearchParams.toString()
        });
    };

    return(
        <>
            <div 
                className={`filtros-layer ${isOpen ? 'active' : ''}`} 
                onClick={onClose}
            ></div>

            <div className={`filtros-container-global d-flex-column ${isOpen ? 'active' : ''}`}>
                <div className='filtros-container'>
                    <div className='filtros-top d-flex-column'>
                        <button 
                            type='button' 
                            className='filtros-button-close margin-left'
                            onClick={onClose}
                        >
                            <span className="material-icons">close</span>
                        </button>

                        <p className='block-title d-flex color-color-1'>Kamas</p>
                        <p className='title uppercase'>¡Las mejores ofertas en muebles para el hogar 🔥🛌!</p>
                    </div>

                    <div className='filtros-content'>
                        <div className='filtros-content-categorias d-flex-column gap-10'>
                            <p className='title'>Categorías</p>
                            <ul className='filtro-items'>
                                {categorias.map((categoria, idx) => (
                                    <li key={idx}>
                                        <button type='button' className={categoriaSeleccionada === categoria ? 'active' : ''}  onClick={() => handleSelectCategoria(categoria)}>
                                            <span className='first-uppercase'>{categoria}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className='filtros-prices-container d-flex-column gap-10'>
                            <p className='title'>Precio</p>

                            <div className='d-flex-column gap-5'>
                                {opcionesPrecio.map((rango, idx) => (
                                    <label key={idx} className="d-flex align-center gap-5">
                                        <input type='checkbox' checked={rangosSeleccionados.includes(rango.value)} onChange={() => togglePrecio(rango.value)}/>
                                        <p>{rango.label}</p>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {categoriaSeleccionada && filtros.length === 0 && (
                            <p className='sin-filtros'>No se encontraron filtros para esta categoría.</p>
                        )}

                        {categoriaSeleccionada && filtros.length > 0 && (
                            <div className='filtros-detalles-container d-flex-column margin-top-20'>
                                {/* <p className='title margin-bottom-10'>Detalles del Producto</p> */}
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

                    <button type='button' className='button-link button-link-2'onClick={limpiarFiltros}>
                        <span className="material-icons">delete</span>
                        <p className='button-link-text'>Limpiar filtros</p>
                    </button>
                </div>
            </div>
        </>
    );
}

export default Filtros;
