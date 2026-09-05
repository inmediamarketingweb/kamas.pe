import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import './Top.css';

function Top({
    currentPage = 1,
    totalPages = 1,
    onPageChange = () => {},
    getVisiblePages = () => [],
    onToggleFilters = () => {},
}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isOrderMenuOpen, setIsOrderMenuOpen] = useState(false);
    const [isScrollActive, setIsScrollActive] = useState(false);
    const envioGratis = searchParams.get('envio-gratis') === 'si';
    const enOferta = searchParams.get('en-oferta') === 'si';
    const sortOption = searchParams.get('orden') || '';

    const updateFilter = (key, value) => {
        const newParams = new URLSearchParams(searchParams);
        
        if (value === '' || value === false) {
            newParams.delete(key);
        } else {
            if (value === true) {
                newParams.set(key, 'si');
            } else {
                newParams.set(key, value);
            }
        }

        // Eliminar página al cambiar filtros
        newParams.delete('page');
        setSearchParams(newParams);
        onPageChange(1);
    };

    const handleSortChange = (value) => {
        updateFilter('orden', value);
        setIsOrderMenuOpen(false);
    };

    const toggleEnvioGratis = () => {
        updateFilter('envio-gratis', !envioGratis);
    };

    const toggleEnOferta = () => {
        updateFilter('en-oferta', !enOferta);
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            // Solo cambiamos la página en el estado, no en la URL
            onPageChange(page);
        }
    };

    const getSortLabel = () => {
        switch(sortOption) {
            case 'mayor-a-menor':
                return 'Mayor a menor precio';
            case 'menor-a-mayor':
                return 'Menor a mayor precio';
            default:
                return 'Ordenar por';
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrollActive(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`filters-top-container ${isScrollActive ? 'active' : ''}`}>
            <div className='filters-top'>
                <button type='button' className='open-filters' onClick={onToggleFilters}>
                    <span className="material-symbols-outlined">tune</span>
                </button>

                <button type='button' className={`delivery-free-button d-flex filter-button ${envioGratis ? 'active' : ''}`} onClick={toggleEnvioGratis}>
                    <span className="material-symbols-outlined">delivery_truck_speed</span>
                    <span className="material-symbols-outlined check">close</span>
                    <p>Envío gratis</p>
                </button>

                <button type='button' className={`sale-button d-flex filter-button ${enOferta ? 'active' : ''}`} onClick={toggleEnOferta}>
                    <span className="material-symbols-outlined">local_offer</span>
                    <span className="material-symbols-outlined check">close</span>
                    <p>En oferta</p>
                </button>

                <div className='filters-order-container'>
                    <button className={`filters-order-button ${isOrderMenuOpen ? 'active' : ''}`} onClick={() => setIsOrderMenuOpen(!isOrderMenuOpen)}>
                        <div className='d-flex-center-center'>
                            <span className="material-symbols-outlined sync_alt">sync_alt</span>
                            <p>{getSortLabel()}</p>
                        </div>

                        <span className="material-symbols-outlined">keyboard_arrow_down</span>
                    </button>

                    {isOrderMenuOpen && (
                        <ul className={`filters-order-list ${isOrderMenuOpen ? 'active' : ''}`}>
                            <li>
                                <button type='button' className={sortOption === '' ? 'active' : ''} onClick={() => handleSortChange('')}>
                                    <p>Ordenar por</p>
                                </button>
                            </li>
                            <li>
                                <button type='button' className={sortOption === 'mayor-a-menor' ? 'active' : ''} onClick={() => handleSortChange('mayor-a-menor')}>
                                    <p>Mayor a menor precio</p>
                                </button>
                            </li>
                            <li>
                                <button type='button' className={sortOption === 'menor-a-mayor' ? 'active' : ''} onClick={() => handleSortChange('menor-a-mayor')}>
                                    <p>Menor a mayor precio</p>
                                </button>
                            </li>
                        </ul>
                    )}
                </div>

                {totalPages > 1 && (
                    <div className="pagination-controls">
                        <div className="d-flex-center-center gap-5">
                            <button className="pagination-arrow" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                                <span className="material-symbols-outlined">chevron_left</span>
                                <p>Anterior</p>
                            </button>

                            {getVisiblePages().map((page, index) => 
                                typeof page === 'number' ? (
                                    <button key={index} className={`pagination-page ${currentPage === page ? 'active' : ''}`} onClick={() => handlePageChange(page)}>
                                        {page}
                                    </button>
                                ) : (
                                    <span key={index} className="pagination-ellipsis">...</span>
                                )
                            )}

                            <button className="pagination-arrow" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                                <p>Siguiente</p>
                                <span className="material-symbols-outlined">chevron_right</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Top;
