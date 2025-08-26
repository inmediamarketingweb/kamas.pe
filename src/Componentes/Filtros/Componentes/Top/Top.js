import './Top.css';

function Top({
        envioGratis = false,
        setEnvioGratis = () => {},
        enOferta = false,
        setEnOferta = () => {},
        sortOption = '',
        setSortOption = () => {},
    }){
    return(
        <div className='filters-top d-flex-center-between w-100 gap-10'>
            <div className='d-flex gap-10'>
                <button type='button' className={`d-flex filter-button ${envioGratis ? 'active' : ''}`} onClick={() => setEnvioGratis(!envioGratis)}>
                    <span className="material-icons">local_shipping</span>
                    <p>Envío gratis</p>
                </button>

                <button type='button' className={`d-flex filter-button ${enOferta ? 'active' : ''}`} onClick={() => setEnOferta(!enOferta)}>
                    <span className="material-icons">local_offer</span>
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
        </div>
    );
}

export default Top;
