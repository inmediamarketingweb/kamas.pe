import { useState, useEffect } from 'react';
import './Top.css';

function Top({
    envioGratis = false,
    setEnvioGratis = () => {},
    enOferta = false,
    setEnOferta = () => {},
    sortOption = '',
    setSortOption = () => {},
    currentPage = 1,
    totalPages = 1,
    onPageChange = () => {},
    getVisiblePages = () => [],
    onToggleFilters = () => {},
}) {
    const [isOrderMenuOpen, setIsOrderMenuOpen] = useState(false);
    const [isScrollActive, setIsScrollActive] = useState(false);

    const handleSortChange = (value) => {
        setSortOption(value);
        setIsOrderMenuOpen(false);
    };

    const getSortLabel = () => {
        switch(sortOption) {
            case 'precio-desc':
                return 'Mayor a menor precio';
            case 'precio-asc':
                return 'Menor a mayor precio';
            default:
                return 'Más relevantes';
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrollActive(true);
            } else {
                setIsScrollActive(false);
            }
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

                <button type='button' className={`delivery-free-button d-flex filter-button ${envioGratis ? 'active' : ''}`} onClick={() => setEnvioGratis(!envioGratis)}>
                    <span className="material-symbols-outlined">delivery_truck_speed</span>
                    <span className="material-symbols-outlined check">close</span>
                    <p>Envío gratis</p>
                </button>

                <button type='button' className={`sale-button d-flex filter-button ${enOferta ? 'active' : ''}`} onClick={() => setEnOferta(!enOferta)}>
                    <span className="material-symbols-outlined">local_offer</span>
                    <span className="material-symbols-outlined check">close</span>
                    <p>En oferta</p>
                </button>

                <div className='filters-order-container'>
                    <button 
                        className={`filters-order-button ${isOrderMenuOpen ? 'active' : ''}`}
                        onClick={() => setIsOrderMenuOpen(!isOrderMenuOpen)}
                    >
                        <div className='d-flex-center-center'>
                            <span className="material-symbols-outlined sync_alt">sync_alt</span>
                            <p>{getSortLabel()}</p>
                        </div>

                        <span className="material-symbols-outlined">keyboard_arrow_down</span>
                    </button>

                    {isOrderMenuOpen && (
                        <ul className={`filters-order-list ${isOrderMenuOpen ? 'active' : ''}`}>
                            <li>
                                <button 
                                    type='button' 
                                    className={sortOption === '' ? 'active' : ''}
                                    onClick={() => handleSortChange('')}
                                >
                                    <p>Más relevantes</p>
                                </button>
                            </li>
                            <li>
                                <button 
                                    type='button' 
                                    className={sortOption === 'precio-desc' ? 'active' : ''}
                                    onClick={() => handleSortChange('precio-desc')}
                                >
                                    <p>Mayor a menor precio</p>
                                </button>
                            </li>
                            <li>
                                <button 
                                    type='button' 
                                    className={sortOption === 'precio-asc' ? 'active' : ''}
                                    onClick={() => handleSortChange('precio-asc')}
                                >
                                    <p>Menor a mayor precio</p>
                                </button>
                            </li>
                        </ul>
                    )}
                </div>

                {totalPages > 1 && (
                    <div className="pagination-controls">
                        <div className="d-flex-center-center gap-5">
                            <button 
                                className="pagination-arrow" 
                                onClick={() => onPageChange(currentPage - 1)} 
                                disabled={currentPage === 1}
                            >
                                <span className="material-symbols-outlined">chevron_left</span>
                                <p>Anterior</p>
                            </button>

                            {getVisiblePages().map((page, index) => 
                                typeof page === 'number' ? (
                                    <button 
                                        key={index} 
                                        className={`pagination-page ${currentPage === page ? 'active' : ''}`} 
                                        onClick={() => onPageChange(page)}
                                    >
                                        {page}
                                    </button>
                                ) : (
                                    <span key={index} className="pagination-ellipsis">...</span>
                                )
                            )}

                            <button 
                                className="pagination-arrow" 
                                onClick={() => onPageChange(currentPage + 1)} 
                                disabled={currentPage === totalPages}
                            >
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
