import './Complementos.css';

function Complementos(){
    return(
        <div className='block-container'>
            <section className='block-content'>
                <div className='block-title-container'>
                    <h2 className='block-title'>Complementa tu espacio</h2>
                    <p className='text'>Cojines, baúles, veladores, juegos de sábanas y mucho más</p>
                </div>

                <ul className='pg-index-list-prds'>
                    <li>
                        <a href='/productos/complementos/?línea=cojines' title='Cojines | Kamas'>
                            <img src='/assets/imagenes/pag-principal/complementos/cojines.png' alt='Cojines' />
                            <p className='text'>Cojines</p>
                        </a>
                    </li>
                    <li>
                        <a href='/productos/complementos/?línea=cojines-decorativos' title='Cojines decorativos | Kamas'>
                            <img src='/assets/imagenes/pag-principal/complementos/cojines-decorativos.png' alt='Cojines decorativos' />
                            <p className='text'>Cojines decorativos</p>
                        </a>
                    </li>
                    <li>
                        <a href='/productos/complementos/?subcategoría=baúles' title='Baúles | Kamas'>
                            <img src='/assets/imagenes/pag-principal/complementos/baules.png' alt='imagen bául clasico 2 plazas kamas' />
                            <p className='text'>Baúles</p>
                        </a>
                    </li>
                    <li>
                        <a href='/productos/complementos/?subcategoría=veladores' title='Veladores | Kamas'>
                            <img src='/assets/imagenes/pag-principal/complementos/veladores.png' alt='imagen velador de madera pino americano' />
                            <p className='text'>Veladores</p>
                        </a>
                    </li>
                    <li>
                        <a href='/productos/complementos/?subcategoría=almohadas' title='Almohadas | Kamas'>
                            <img src='/assets/imagenes/pag-principal/complementos/almohadas.png' alt='imagen de dos almohadas' />
                            <p className='text'>Almohadas</p>
                        </a>
                    </li>
                    <li>
                        <a href='/productos/complementos/?subcategoría=sábanas-y-juegos-de-camas' title='Sábanas y juegos de camas | Kamas'>
                            <img src='/assets/imagenes/pag-principal/complementos/sabanas.png' alt='imagen de sabanas' />
                            <p className='text'>Sábanas y juegos de camas</p>
                        </a>
                    </li>
                    <li>
                        <a href='/productos/complementos/?subcategoría=edredones-y-plumones' title='Edredones y plumones | Kamas'>
                            <img src='/assets/imagenes/pag-principal/complementos/edredones.png' alt='imagen de edredones y plumones' />
                            <p className='text'>Edredones y plumones</p>
                        </a>
                    </li>
                    <li>
                        <a href='/productos/complementos/?subcategoría=protectores-de-colchon' title='Protectores de colchón | Kamas'>
                            <img src='/assets/imagenes/pag-principal/complementos/protectores-de-colchon.png' alt='imagen de protector de colchón' />
                            <p className='text'>Protectores de colchón</p>
                        </a>
                    </li>
                    <li>
                        <a href='/productos/complementos/?subcategoría=protectores-de-almohadas' title='Protectores de almohadas | Kamas'>
                            <img src='/assets/imagenes/pag-principal/complementos/protectores-de-almohadas.png' alt='imagen de protector de almohada' />
                            <p className='text'>Protectores de almohadas</p>
                        </a>
                    </li>
                    <li>
                        <a href='/productos/complementos/?subcategoría=pieceras' title='Pieceras | Kamas'>
                            <img src='/assets/imagenes/pag-principal/complementos/protectores-de-almohadas.png' alt='imagen de protector de almohada' />
                            <p className='text'>Pieceras</p>
                        </a>
                    </li>
                    <li>
                        <a href='/productos/complementos/?subcategoría=espejos-y-decoración' title='Espejos | Kamas'>
                            <img src='/assets/imagenes/pag-principal/complementos/espejos.png' alt='imagen de un espejo' />
                            <p className='text'>Espejos</p>
                        </a>
                    </li>
                    <li>
                        <a href='/productos/complementos/' title='Complementos | Kamas'>
                            <img src='/assets/imagenes/pag-principal/complementos/puff.png' alt='imagen de un asiento puff' />
                            <p className='text'>Ver más</p>
                        </a>
                    </li>
                </ul>
            </section>
        </div>
    )
}

export default Complementos;
