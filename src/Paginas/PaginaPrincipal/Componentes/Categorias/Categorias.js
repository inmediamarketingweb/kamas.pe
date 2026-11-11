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
                <div className='block-title-container'>
                    <h2 className='block-title'>Dale forma al hogar que imaginas</h2>
                    <p className='text'>Explora más de 2500 modelos y diseños y encuentra los que van contigo</p>
                </div>

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
                                <LazyImage src='/assets/imagenes/pag-principal/categorias-1/colchones.png' width={isSmallScreen ? 198 : 100} height={isSmallScreen ? 200 : 440} alt='Colchones | Kamas'/>
                                <p className='title'>Colchones</p>
                            </a>
                        </li>
                        <li>
                            <a href='/productos/camas/' title='Camas | Kamas'>
                                <LazyImage src='/assets/imagenes/pag-principal/categorias-1/camas.png' width={isSmallScreen ? 198 : 100} height={isSmallScreen ? 200 : 440} alt='Camas | Kamas'/>
                                <p className='title'>Camas</p>
                            </a>
                        </li>
                        <li>
                            <a href='/productos/cabeceras/' title='Cabeceras | Kamas'>
                                <LazyImage src='/assets/imagenes/pag-principal/categorias-1/cabeceras.png' width={isSmallScreen ? 198 : 100} height={isSmallScreen ? 200 : 440} alt='Cabeceras | Kamas'/>
                                <p className='title'>Cabeceras</p>
                            </a>
                        </li>
                        <li>
                            <a href='/productos/sofas/' title='Sofás | Kamas'>
                                <LazyImage src='/assets/imagenes/pag-principal/categorias-1/sofas.png' width={isSmallScreen ? 198 : 100} height={isSmallScreen ? 200 : 440} alt='Sofás | Kamas'/>
                                <p className='title'>Sofás</p>
                            </a>
                        </li>
                        <li>
                            <a href='/productos/pet/' title='Pet | Kamas'>
                                <LazyImage src='/assets/imagenes/pag-principal/categorias-1/pet.png' width={isSmallScreen ? 198 : 100} height={isSmallScreen ? 200 : 440} alt='Pet | Kamas'/>
                                <p className='title'>Pet</p>
                            </a>
                        </li>
                        <li>
                            <a href='/productos/complementos/' title='Complementos | Kamas'>
                                <LazyImage src='/assets/imagenes/pag-principal/categorias-1/complementos.png' width={isSmallScreen ? 198 : 100} height={isSmallScreen ? 200 : 440} alt='Complementos | Kamas'/>
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
