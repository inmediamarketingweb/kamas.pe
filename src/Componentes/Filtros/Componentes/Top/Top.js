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
}) {
    return (
        <div className='filters-top d-flex-center-between w-100 gap-10'>
            <div className='d-flex gap-10'>
                <button type='button' className={`d-flex filter-button ${envioGratis ? 'active' : ''}`} onClick={() => setEnvioGratis(!envioGratis)}>
                    <span className="material-symbols-outlined">local_shipping</span>
                    <p>Envío gratis</p>
                </button>

                <button type='button' className={`d-flex filter-button ${enOferta ? 'active' : ''}`} onClick={() => setEnOferta(!enOferta)}>
                    <span className="material-symbols-outlined">local_offer</span>
                    <p>En oferta</p>
                </button>
            </div>

            <div>
                <select id='filters-orden' name='filter-orden' className='filters-orden' value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                    <option value="">Ordenar precios</option>
                    <option value="precio-asc">Menor a mayor</option>
                    <option value="precio-desc">Mayor a menor</option>
                </select>
            </div>

            {totalPages > 1 && (
                <div className="pagination-controls margin-left">
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
    );
}

export default Top;
