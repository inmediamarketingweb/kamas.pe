import { useState, useEffect} from 'react';

import './Categorias.css';

import LazyImage from '../../../../Componentes/Plantillas/LazyImage';

function Categorias(){
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 140);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 140);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return(
        <section className='block-container'>
            <div className='block-content categories-block-content'>
                <nav className="w-100">
                    <ul className='categories'>
                        <li>
                            <a href='/productos/dormitorios/' title='Dormitorios | Kamas'>
                                <div className='homepage-categories-dormitorios'>
                                    <div>
                                        <ul>
                                            <li>
                                                <img src="/assets/imagenes/paginas/pagina-principal/categorias/dormitorios-1.webp" alt=''/>
                                            </li>
                                            <li>
                                                <img src="/assets/imagenes/paginas/pagina-principal/categorias/dormitorios-2.webp" alt=''/>
                                            </li>
                                            <li>
                                                <img src="/assets/imagenes/paginas/pagina-principal/categorias/dormitorios-3.webp" alt=''/>
                                            </li>
                                            <li>
                                                <img src="/assets/imagenes/paginas/pagina-principal/categorias/dormitorios-4.webp" alt=''/>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className='p-absolute-left-bottom-20'>
                                    <p className='title'>Dormitorios</p>
                                    <p className='text color-white'>La mejor variedad en dormitorios americanos, europeos, con cajones, en tamaños 1 plz, 1 plz y media, 2 plz, queen, king y 4 plz.</p>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href='/productos/colchones/' title='Colchones | Kamas'>
                                <LazyImage src='/assets/imagenes/paginas/pagina-principal/categorias/colchones.webp' width={isSmallScreen ? 198 : 100} height={isSmallScreen ? 200 : 440} alt='Colchones | Kamas'/>
                                <p className='title'>Colchones</p>
                            </a>
                        </li>
                        <li>
                            <a href='/productos/camas-box-tarimas/' title='Camas box tarimas | Kamas'>
                                <LazyImage src='/assets/imagenes/paginas/pagina-principal/categorias/camas-box-tarimas.webp' width={isSmallScreen ? 198 : 100} height={isSmallScreen ? 200 : 440} alt='Camas box tarimas | Kamas'/>
                                <p className='title'>Camas box tarimas</p>
                            </a>
                        </li>
                        <li>
                            <a href='/productos/camas-funcionales/' title='Camas funcionales | Kamas'>
                                <LazyImage src='/assets/imagenes/paginas/pagina-principal/categorias/camas-funcionales.webp' width={isSmallScreen ? 198 : 100} height={isSmallScreen ? 200 : 440} alt='Camas funcionales | Kamas'/>
                                <p className='title'>Camas funcionales</p>
                            </a>
                        </li>
                        <li>
                            <a href='/productos/cabeceras/' title='Cabeceras | Kamas'>
                                <LazyImage src='/assets/imagenes/paginas/pagina-principal/categorias/cabeceras.webp' width={isSmallScreen ? 198 : 100} height={isSmallScreen ? 200 : 440} alt='Cabeceras | Kamas'/>
                                <p className='title'>Cabeceras</p>
                            </a>
                        </li>
                        <li>
                            <a href='/productos/sofas/' title='Sofás | Kamas'>
                                <LazyImage src='/assets/imagenes/paginas/pagina-principal/categorias/sofas.webp' width={isSmallScreen ? 198 : 100} height={isSmallScreen ? 200 : 440} alt='Sofás | Kamas'/>
                                <p className='title'>Sofás</p>
                            </a>
                        </li>
                        <li>
                            <a href='/productos/complementos/' title='Complementos | Kamas'>
                                <LazyImage src='/assets/imagenes/paginas/pagina-principal/categorias/complementos.webp' width={isSmallScreen ? 198 : 100} height={isSmallScreen ? 200 : 440} alt='Complementos | Kamas'/>
                                <p className='title'>Complementos</p>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </section>
    )
}

export default Categorias;
