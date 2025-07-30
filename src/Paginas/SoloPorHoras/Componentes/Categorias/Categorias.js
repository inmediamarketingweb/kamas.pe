import { useState, useEffect } from 'react';

import './Categorias.css';

import Spinner from '../../../../Componentes/Elementos/Spinner/Spinner';

function Categorias(){
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await fetch('/assets/json/categorias.json');
                if(!response.ok){
                    throw new Error('No se pudieron cargar los datos');
                }
                const data = await response.json();
                setCategorias(data.categorias);
                setLoading(false);
            }catch(err){
                setError(err);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if(loading) return(
        <div className="d-flex-center-center d-grid-column-1-1 bg-loading h-100-px position-relative">
            <Spinner/>
        </div>
    );

    if(error)return(
        <div className="error">Error: {error.message}</div>
    )

    return(
        <nav className="page-top-categories">
            <ul className="categorias-list">
                {categorias.map((categoriaObj, index) => {
                    const nombreCategoria = Object.keys(categoriaObj)[0];
                    const datosCategoria = categoriaObj[nombreCategoria][0];
                    const nombreFormateado = nombreCategoria.split('-')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');

                    return(
                        <li key={index} className="categoria-item">
                            <a href={datosCategoria['link-solo-por-horas']} title={datosCategoria.metatitulo} className="categoria-link">
                                <img src={datosCategoria['foto-1']} alt={datosCategoria['foto-1-alt'] || nombreFormateado} className="categoria-imagen"/>
                                <p className="categoria-nombre">{nombreFormateado}</p>
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

export default Categorias;
