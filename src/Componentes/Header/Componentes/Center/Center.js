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
                const response = await fetch('/assets/json/categorias/categorias-2.json');
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
        return(
            <div className="d-flex-center-center w-100 h-70-px bg-loading">
                <p className='text'>Error al cargar el menú: <b className='color-color-1'>{error}</b></p>
            </div>
        )
    }

    if(!categories){
        return(
            <div className="d-flex-center-center w-100 h-70-px bg-loading position-relative">
                <Spinner/>
            </div>
        )
    }

    const categorias = Array.isArray(categories) ? categories : (Array.isArray(categories.categorias) ? categories.categorias : []);
    const handleCategoryClick = (categoryId) => { setActiveCategory(prev => prev === categoryId ? null : categoryId); };
    const handleMenuClick = () => { setIsMenuOpen(prev => !prev); };
    const hasSubmenu = (categoria) => { return Array.isArray(categoria.listas) && categoria.listas.length > 0; };
    const toArray = (val) => Array.isArray(val) ? val : (val ? [val] : []);

    const renderLinkList = (items) => {
        const list = toArray(items);
        if (list.length === 0) return null;

        return (
            <ul className='submenu-list'>
                {list.map((item) => (
                    <li key={uuidv4()}>
                        <a href={item.link} title={item.texto} className='submenu-list-link'>
                            {item.image ? (
                                <img className='submenu-list-link-img' src={item.image} alt={item['image-alt'] || item.texto} />
                            ) : null}
                            <div className='position-relative'>
                                <h4 className='text font-bold first-uppercase'>{item.texto}</h4>
                                <span className="material-symbols-outlined">chevron_right</span>
                                {item.estado && <span className='submenu-list-link-status'>{item.estado}</span>}
                            </div>
                        </a>
                    </li>
                ))}
            </ul>
        );
    };

    const renderLinkSuelto = (item) => (
        <a href={item.link} title={item.titulo} className='d-flex-center-between gap-10'>
            {item.image ? (
                <img className='submenu-list-link-img' src={item.image} alt={item['image-alt'] || item.titulo} />
            ) : null}
            <div className='w-100 d-flex-center-between'>
                <div className='d-flex-column'>
                    <h4 className='color-color-1 font-bold first-uppercase'>{item.titulo}</h4>
                    <p className='text first-uppercase'>{item.texto}</p>
                </div>

                <span className="material-symbols-outlined text">chevron_right</span>
            </div>
        </a>
    );

    const renderListaGroup = (listaObj) => {
        if (!listaObj || typeof listaObj !== 'object') return null;

        const entries = Object.entries(listaObj);

        return entries.map(([key, value]) => {
            const title = key.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

            if (key === 'link-suelto') {
                return (
                    <div key={uuidv4()} className='submenu-lista-group submenu-lista-group-link-suelto'>
                        {toArray(value).map((item) => (
                            <div key={uuidv4()}>{renderLinkSuelto(item)}</div>
                        ))}
                    </div>
                );
            }

            return (
                <div key={uuidv4()} className='submenu-lista-group'>
                    <h4 className='color-color-1 uppercase font-bold'>{title}</h4>
                    {renderLinkList(value)}
                </div>
            );
        });
    };

    return(
        <div className='header-center-container d-flex w-100'>
            <section className='header-center'>
                <a href='https://kamas.pe' title='Kamas | Fabricantes de camas' className='header-logo'>
                    <img src="/assets/imagenes/kamas/logo-principal-kamas.jpg" width={185} height={42} alt="Kamas"/>
                </a>

                <div className='search-bar-tablet'>
                    <SearchBar/>
                </div>

                <button type='button' className={`menu-button ${isMenuOpen ? 'active' : ''}`} onClick={handleMenuClick}>
                    <p>Menu</p>
                    <div>
                        <span className="material-symbols-outlined">menu</span>
                        <span className="material-symbols-outlined">close</span>
                    </div>
                </button>

                <nav className={`menu-container ${isMenuOpen ? 'active' : ''}`}>
                    <ul className='menu'>
                        {categorias.map((categoria, index) => {
                            const submenu = hasSubmenu(categoria);
                            const icono = toArray(categoria.icono)[0];
                            const image1 = toArray(categoria['image-1'])[0];
                            const image2 = toArray(categoria['image-2'])[0];

                            return(
                                <li key={categoria.id ?? uuidv4()}
                                    className={`menu-li ${activeCategory === categoria.id ? 'active' : ''}`}
                                    onClick={() => submenu && handleCategoryClick(categoria.id)}
                                >
                                    <div className='menu-li-div'>
                                        <a href={categoria.link} title={`${categoria.categoría} | Kamas`} className='menu-link'>
                                            {icono?.src ? (
                                                <img src={icono.src} alt={icono.alt || categoria.categoría}/>
                                            ) : null}
                                            <h2 className='first-uppercase'>{categoria.categoría}</h2>
                                        </a>

                                        {submenu && (
                                            <button type='button' className='menu-link-button'>
                                                <span className="material-symbols-outlined">keyboard_arrow_down</span>
                                            </button>
                                        )}
                                    </div>

                                    {submenu && (
                                        <div className={`submenu-container submenu-container-${index + 1} ${activeCategory === categoria.id ? 'active' : ''}`}>
                                            <nav className='submenu'>
                                                <div className='submenu-lista-group submenu-lista-group-1'>
                                                    <p className='block-title text-left color-color-1'>{categoria.categoría}</p>

                                                    {toArray(categoria.textos).map((txt) => (
                                                        <p key={uuidv4()} className='text first-uppercase'>{txt}</p>
                                                    ))}

                                                    <a className='margin-left button-link button-link-2' href={categoria.link}>
                                                        <p className='button-link-text'>Ver todo</p>
                                                        <span className="material-symbols-outlined">arrow_right_alt</span>
                                                    </a>

                                                    {image1?.src && (
                                                        <img src={image1.src} alt={image1.alt || categoria.categoría}/>
                                                    )}
                                                </div>

                                                {toArray(categoria.listas).map((listaObj, listaIndex) => {
                                                    const isLinkSuelto = listaObj && typeof listaObj === 'object' && Object.prototype.hasOwnProperty.call(listaObj, 'link-suelto');

                                                    return (
                                                        <div key={uuidv4()} className={`submenu-lista-group submenu-lista-group-${listaIndex + 2} ${isLinkSuelto ? 'submenu-lista-group-link-suelto' : ''}`}>
                                                            {renderListaGroup(listaObj)}
                                                        </div>
                                                    );
                                                })}

                                                {image2?.src && (
                                                    <div className='submenu-lista-group submenu-lista-group-image-right'>
                                                        <img loading='lazy' className='submenu-img-large' src={image2.src} alt={image2.alt || categoria.categoría}/>
                                                    </div>
                                                )}
                                            </nav>
                                        </div>
                                    )}
                                </li>
                            );
                        })}

                        <li className='menu-li menu-li-ofert'>
                            <div className='menu-li-div'>
                                <a className='menu-link-ofert' href='/ofertas/' title='Ofertas | Kamas'>
                                    <span className="material-symbols-outlined">sell</span>
                                    <h2 className='first-uppercase'>Ofertas</h2>
                                </a>
                            </div>
                        </li>
                    </ul>
                </nav>

                <SearchBar/>
            </section>
        </div>
    )
}

export default Center;
