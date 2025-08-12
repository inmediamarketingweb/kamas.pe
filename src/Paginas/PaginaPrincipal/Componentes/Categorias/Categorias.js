import './Categorias.css';

function Categorias(){
    return(
        <section className='block-container'>
            <div className='block-content categories-block-content'>
                <nav className='categories'>
                    <li>
                        <a href='/productos/dormitorios/' className='' title=''>
                            <img src='/assets/imagenes/paginas/pagina-principal/categorias/dormitorios.webp' alt='' />
                            <div className='p-absolute-left-bottom-20'>
                                <p className='title'>Dormitorios</p>
                                <p className='text color-white'>La mejor variedad en dormitorios americanos, europeos, con cajones, en tamaños 1 plz, 1 plz y media, 2 plz, queen, king y 4 plz.</p>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href='/productos/colchones/' className='' title=''>
                            <img src='/assets/imagenes/paginas/pagina-principal/categorias/colchones.webp' alt='' />
                            <p className='title'>Colchones</p>
                        </a>
                    </li>
                    <li>
                        <a href='/productos/camas-box-tarimas/' className='' title=''>
                            <img src='/assets/imagenes/paginas/pagina-principal/categorias/camas-box-tarimas.webp' alt='' />
                            <p className='title'>Camas box tarimas</p>
                        </a>
                    </li>
                    <li>
                        <a href='/productos/camas-funcionales/' className='' title=''>
                            <img src='/assets/imagenes/paginas/pagina-principal/categorias/camas-funcionales.webp' alt='' />
                            <p className='title'>Camas funcionales</p>
                        </a>
                    </li>
                    <li>
                        <a href='/productos/cabeceras/' className='' title=''>
                            <img src='/assets/imagenes/paginas/pagina-principal/categorias/cabeceras.webp' alt='' />
                            <p className='title'>Cabeceras</p>
                        </a>
                    </li>
                    <li>
                        <a href='/productos/sofas/' className='' title=''>
                            <img src='/assets/imagenes/paginas/pagina-principal/categorias/sofas.webp' alt='' />
                            <p className='title'>Sofás</p>
                        </a>
                    </li>
                    <li>
                        <a href='/productos/complementos/' className='' title=''>
                            <img src='/assets/imagenes/paginas/pagina-principal/categorias/complementos.webp' alt='' />
                            <p className='title'>Complementos</p>
                        </a>
                    </li>
                </nav>
            </div>
        </section>
    )
}

export default Categorias;
