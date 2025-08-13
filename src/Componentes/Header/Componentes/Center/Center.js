import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from "uuid";

import './Center.css';

import Spinner from '../../../Elementos/Spinner/Spinner';
import SearchBar from '../SearchBar/SearchBar';

function Center(){
    const [categories, setCategories] = useState(null);
    const [error, setError] = useState(null);
    const [activeCategory, setActiveCategory] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try{
                const response = await fetch('/assets/json/categorias/categorias.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const data = await response.json();
                setCategories(data);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching categories:', err);
            }
        };

        fetchCategories();
    }, []);

    if(error){
        return <div className="error-message">Error al cargar el menú: {error}</div>;
    }

    if(!categories){
        return(
            <div className="d-flex-center-center w-100 h-70-px bg-loading position-relative">
                <Spinner/>
            </div>
        )
    }

    const handleCategoryClick = (categoryId) => {
        setActiveCategory(prev => prev === categoryId ? null : categoryId);
    };

    const handleMenuClick = () => {
        setIsMenuOpen(prev => !prev);
    };

    return(
        <div className='header-center-container d-flex w-100'>
            <section className='header-center'>
                <div className='d-flex-center-left gap-20'>
                    <a href='https://kamas.pe' title='Kamas | Fabricantes de camas' className='header-logo'>
                        <img src="/assets/imagenes/kamas/logo-principal-kamas.jpg" width={185} height={42} alt="Kamas"/>
                    </a>

                    <button type='button' className={`menu-button ${isMenuOpen ? 'active' : ''}`} onClick={handleMenuClick}>
                        <p>Menu</p>
                        <div>
                            <span className="material-icons">menu</span>
                            <span className="material-icons">close</span>
                        </div>
                    </button>

                    <nav className={`menu-container ${isMenuOpen ? 'active' : ''}`}>
                        <ul className='menu'>
                            {categories.categorias.map((categoria) => (
                                <li key={uuidv4()} className={`menu-li ${activeCategory === categoria.id ? 'active' : ''}`} onClick={() => categoria.subCategorias && handleCategoryClick(categoria.id)}>
                                    <div className='menu-li-div'>
                                        <a href={categoria.ruta} title={categoria.categoria} className='menu-link'>
                                            {categoria.icono === "sell" ? (
                                                <span className="material-icons">{categoria.icono}</span>
                                            ) : (
                                                <img src={categoria.icono} alt={categoria.iconoAlt}/>
                                            )}
                                            <h2>{categoria.categoria}</h2>
                                        </a>

                                        {categoria.subCategorias && (
                                            <button type='button' className='menu-link-button'>
                                                <span className="material-icons">keyboard_arrow_down</span>
                                            </button>
                                        )}
                                    </div>

                                    {categoria.subCategorias && (
                                        <div className={`submenu-container ${activeCategory === categoria.id ? 'active' : ''}`}>
                                            <nav className='submenu'>
                                                {categoria.menuMensaje && (
                                                    <div className='submenu-target submenu-target-1'>
                                                        <h3 className='submenu-target-title'>{categoria.categoria}</h3>
                                                        <p className='text'>{categoria.menuMensaje[0]?.text}</p>
                                                    </div>
                                                )}

                                                {categoria.subCategorias && (
                                                    <div className='submenu-target submenu-target-2'>
                                                        <h3 className='submenu-target-title'>{categoria.subCategoriasTitulo?.[0]?.text || 'Subcategorías'}:</h3>
                                                        <ul>
                                                            {categoria.subCategorias.map((sub) => (
                                                                <li key={uuidv4()}>
                                                                    <a href={sub.ruta} title={sub.subcategoria}>
                                                                        <h4>{sub.subcategoria}</h4>
                                                                    </a>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                {categoria.medidas && (
                                                    <div className='submenu-target submenu-target-3'>
                                                        <h3 className='submenu-target-title'>Medidas:</h3>
                                                        <ul>
                                                            {categoria.medidas.map((medida) => (
                                                                <li key={uuidv4()}>
                                                                    <a href={medida.ruta} title={medida.medida}>
                                                                        <h4>{medida.medida}</h4>
                                                                    </a>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                {categoria.menuImg && (
                                                    <div className='submenu-target submenu-target-4'>
                                                        <img width={280} height={280} loading='lazy' src={categoria.menuImg[0]?.imgSrc} alt={categoria.menuImg[0]?.imgAlt || categoria.categoria}/>
                                                    </div>
                                                )}
                                            </nav>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                <SearchBar/>
            </section>
        </div>
    )
}

export default Center;
