import { useState, useEffect } from 'react';

import './Categorias.css';

function Categorias(){

    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);
    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 600);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return(
        <div className='block-container'>
            <section className='block-content'>
                <div className='block-title-container'>
                    <p className='block-title margin-auto'>Nuestros productos</p>
                </div>

                <ul className='homepage-categories'>
                    <li>
                        <a href='/productos/colchones/' title='Colchones | Kamas'>
                            <div>
                                <img width={isSmallScreen ? 80 : 160} height={isSmallScreen ? 80 : 160} loading="lazy" src={`/assets/imagenes/paginas/pagina-principal/categorias/${isSmallScreen ? 'thumb/' : ''}1.webp`} alt="Colchones | Kamas" />
                            </div>
                            <p className='text'>Colchones</p>
                        </a>
                    </li>
                    <li>
                        <a href='/productos/camas-box-tarimas/' title='Camas box tarimas | Kamas'>
                            <div>
                                <img width={isSmallScreen ? 80 : 160} height={isSmallScreen ? 80 : 160} loading="lazy" src={`/assets/imagenes/paginas/pagina-principal/categorias/${isSmallScreen ? 'thumb/' : ''}2.webp`} alt="Camas box tarimas | Kamas" />
                            </div>
                            <p className='text'>Camas box tarimas</p>
                        </a>
                    </li>
                    <li>
                        <a href='/productos/dormitorios/' title='Dormitorios | Kamas'>
                            <div>
                                <img width={isSmallScreen ? 80 : 160} height={isSmallScreen ? 80 : 160} loading="lazy" src={`/assets/imagenes/paginas/pagina-principal/categorias/${isSmallScreen ? 'thumb/' : ''}3.webp`} alt="Dormitorios | Kamas" />
                            </div>
                            <p className='text'>Dormitorios</p>
                        </a>
                    </li>
                    <li>
                        <a href='/productos/camas-funcionales/' title='Camas funcionales | Kamas'>
                            <div>
                                <img width={isSmallScreen ? 80 : 160} height={isSmallScreen ? 80 : 160} loading="lazy" src={`/assets/imagenes/paginas/pagina-principal/categorias/${isSmallScreen ? 'thumb/' : ''}4.webp`} alt="Camas funcionales | Kamas" />
                            </div>
                            <p className='text'>Camas funcionales</p>
                        </a>
                    </li>
                    <li>
                        <a href='/productos/cabeceras/' title='Cabeceras | Kamas'>
                            <div>
                                <img width={isSmallScreen ? 80 : 160} height={isSmallScreen ? 80 : 160} loading="lazy" src={`/assets/imagenes/paginas/pagina-principal/categorias/${isSmallScreen ? 'thumb/' : ''}5.webp`} alt="Cabeceras | Kamas" />
                            </div>
                            <p className='text'>Cabeceras</p>
                        </a>
                    </li>
                    <li>
                        <a href='/productos/sofas/' title='Sofás | Kamas'>
                            <div>
                                <img width={isSmallScreen ? 80 : 160} height={isSmallScreen ? 80 : 160} loading="lazy" src={`/assets/imagenes/paginas/pagina-principal/categorias/${isSmallScreen ? 'thumb/' : ''}7.webp`} alt="Sofás | Kamas" />
                            </div>
                            <p className='text'>Sofás</p>
                        </a>
                    </li>
                </ul>
            </section>
        </div>
    )
}

export default Categorias;
