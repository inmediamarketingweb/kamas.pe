// import { useState, useEffect } from 'react';

// import './Categorias.css';

// function Categorias(){

//     const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);
//     useEffect(() => {
//         const handleResize = () => {
//             setIsSmallScreen(window.innerWidth < 600);
//         };
//         window.addEventListener('resize', handleResize);
//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);

//     return(
//         <div className='block-container'>
//             <section className='block-content'>
//                 <div className='block-title-container'>
//                     <p className='block-title margin-auto'>Categorías</p>
//                 </div>

//                 <ul className='homepage-categories'>
//                     <li>
//                         <a href='/productos/colchones/' title='Colchones | Kamas'>
//                             <div>
//                                 <img width={isSmallScreen ? 80 : 160} height={isSmallScreen ? 80 : 160} loading="lazy" src={`/assets/imagenes/paginas/pagina-principal/categorias/${isSmallScreen ? 'thumb/' : ''}1.webp`} alt="Colchones | Kamas" />
//                             </div>
//                             <p className='text'>Colchones</p>
//                         </a>
//                     </li>
//                     <li>
//                         <a href='/productos/camas-box-tarimas/' title='Camas box tarimas | Kamas'>
//                             <div>
//                                 <img width={isSmallScreen ? 80 : 160} height={isSmallScreen ? 80 : 160} loading="lazy" src={`/assets/imagenes/paginas/pagina-principal/categorias/${isSmallScreen ? 'thumb/' : ''}2.webp`} alt="Camas box tarimas | Kamas" />
//                             </div>
//                             <p className='text'>Camas box tarimas</p>
//                         </a>
//                     </li>
//                     <li>
//                         <a href='/productos/dormitorios/' title='Dormitorios | Kamas'>
//                             <div>
//                                 <img width={isSmallScreen ? 80 : 160} height={isSmallScreen ? 80 : 160} loading="lazy" src={`/assets/imagenes/paginas/pagina-principal/categorias/${isSmallScreen ? 'thumb/' : ''}3.webp`} alt="Dormitorios | Kamas" />
//                             </div>
//                             <p className='text'>Dormitorios</p>
//                         </a>
//                     </li>
//                     <li>
//                         <a href='/productos/camas-funcionales/' title='Camas funcionales | Kamas'>
//                             <div>
//                                 <img width={isSmallScreen ? 80 : 160} height={isSmallScreen ? 80 : 160} loading="lazy" src={`/assets/imagenes/paginas/pagina-principal/categorias/${isSmallScreen ? 'thumb/' : ''}4.webp`} alt="Camas funcionales | Kamas" />
//                             </div>
//                             <p className='text'>Camas funcionales</p>
//                         </a>
//                     </li>
//                     <li>
//                         <a href='/productos/cabeceras/' title='Cabeceras | Kamas'>
//                             <div>
//                                 <img width={isSmallScreen ? 80 : 160} height={isSmallScreen ? 80 : 160} loading="lazy" src={`/assets/imagenes/paginas/pagina-principal/categorias/${isSmallScreen ? 'thumb/' : ''}5.webp`} alt="Cabeceras | Kamas" />
//                             </div>
//                             <p className='text'>Cabeceras</p>
//                         </a>
//                     </li>
//                     <li>
//                         <a href='/productos/sofas/' title='Sofás | Kamas'>
//                             <div>
//                                 <img width={isSmallScreen ? 80 : 160} height={isSmallScreen ? 80 : 160} loading="lazy" src={`/assets/imagenes/paginas/pagina-principal/categorias/${isSmallScreen ? 'thumb/' : ''}7.webp`} alt="Sofás | Kamas" />
//                             </div>
//                             <p className='text'>Sofás</p>
//                         </a>
//                     </li>
//                 </ul>
//             </section>
//         </div>
//     )
// }

// export default Categorias;

import './Categorias.css';

function Categorias(){
    return(
        <section className='block-container'>
            <div className='block-content categories-block-content'>
                {/* <div className='block-title-container'>
                    <p className='block-title'>Categorías</p>
                </div> */}

                <nav className='categories'>
                    <li>
                        <a href='/productos/dormitorios/' className='' title=''>
                            <img src='/assets/imagenes/paginas/pagina-principal/categorias/dormitorios-1.jpg' alt='' />
                            <div className='p-absolute-left-bottom-20'>
                                <p className='title'>Dormitorios</p>
                                <p className='text color-white'>La mejor variedad en dormitorios americanos, europeos, con cajones, en tamaños 1 plz, 1 plz y media, 2 plz, queen, king y 4 plz.</p>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href='/productos/colchones/' className='' title=''>
                            <img src='/assets/imagenes/paginas/pagina-principal/categorias/colchones-1.png' alt='' />
                            <p className='title'>Colchones</p>
                        </a>
                    </li>
                    <li>
                        <a href='/productos/camas-box-tarimas/' className='' title=''>
                            <img src='/assets/imagenes/paginas/pagina-principal/categorias/colchones-1.png' alt='' />
                            <p className='title'>Camas box tarimas</p>
                        </a>
                    </li>
                    <li>
                        <a href='/productos/camas-funcionales/' className='' title=''>
                            <img src='/assets/imagenes/paginas/pagina-principal/categorias/colchones-1.png' alt='' />
                            <p className='title'>Camas funcionales</p>
                        </a>
                    </li>
                    <li>
                        <a href='/productos/cabeceras/' className='' title=''>
                            <img src='/assets/imagenes/paginas/pagina-principal/categorias/cabeceras-1.png' alt='' />
                            <p className='title'>Cabeceras</p>
                        </a>
                    </li>
                    <li>
                        <a href='/productos/sofas/' className='' title=''>
                            <img src='/assets/imagenes/paginas/pagina-principal/categorias/colchones-1.png' alt='' />
                            <p className='title'>Sofás</p>
                        </a>
                    </li>
                    <li>
                        <a href='/productos/complementos/' className='' title=''>
                            <img src='/assets/imagenes/paginas/pagina-principal/categorias/colchones-1.png' alt='' />
                            <p className='title'>Complementos</p>
                        </a>
                    </li>
                </nav>
            </div>
        </section>
    )
}

export default Categorias;
