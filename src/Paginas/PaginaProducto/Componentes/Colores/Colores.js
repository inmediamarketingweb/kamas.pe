// import{ useEffect, useState } from 'react';

// import './Colores.css';

// import LazyImage from '../../../../Componentes/Plantillas/LazyImage';

// function Colores({ onSelectColor, producto, selectedShipping, shippingInfo, quantity, precioFinal }){
//     const [data, setData] = useState(null);
//     const [telas, setTelas] = useState([]);
//     const [activeTelaIndex, setActiveTelaIndex] = useState(0);
//     const [isColorsActive, setIsColorsActive] = useState(false);
//     const [activeColorIndex, setActiveColorIndex] = useState(null);
//     const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);
//     const [showContinue, setShowContinue] = useState(false);
//     const [showAllTelas, setShowAllTelas] = useState(false);
//     const [selectedColorData, setSelectedColorData] = useState(null);

//     useEffect(() =>{
//         fetch('/assets/json/colores.json').then((response) =>{
//                 if (!response.ok) throw new Error('Network response was not ok');
//                 return response.json();
//             }).then((json) =>{
//                 setData(json);
//                 const lineasObj = json?.telas?.[0];
                
//                 if (!lineasObj){
//                     setTelas([]);
//                     return;
//                 }
                
//                 const categoriasKeys = Object.keys(lineasObj);
//                 const todasLasTelas = categoriasKeys.flatMap(categoriaKey =>{
//                     const grupo = lineasObj[categoriaKey];
                    
//                     let costosAdicionales = [];
                    
//                     if (grupo && grupo['costos-adicionales'] !== undefined){
//                         costosAdicionales = grupo['costos-adicionales'];
//                     } else if (grupo && grupo['costo-adicional'] !== undefined){
//                         costosAdicionales = [{
//                             producto: 'Costo adicional',
//                             'costo-adicional': grupo['costo-adicional']
//                         }];
//                     }

//                     return grupo?.telas?.map(tela => ({
//                         ...tela,
//                         categoria: categoriaKey,
//                         costosAdicionales
//                     })) || [];
//                 });

//                 setTelas(todasLasTelas);
//             })
//             .catch((error) =>{
//                 console.error('Error al obtener el JSON:', error);
//                 setTelas([]);
//             });
//     }, []);

//     useEffect(() =>{
//         setActiveColorIndex(null);
//         setShowContinue(false);
//         setSelectedColorData(null);
//         if (onSelectColor){
//             onSelectColor(null);
//         }
//     }, [activeTelaIndex, showAllTelas, onSelectColor]);

//     useEffect(() =>{
//         const handleResize = () =>{
//             setIsSmallScreen(window.innerWidth < 600);
//         };
//         window.addEventListener('resize', handleResize);
//         return () => window.removeEventListener('resize', handleResize);
//     }, []);

//     const getWhatsAppLink = () =>{
//         if (!producto) return '#';

//         const numeroWhatsApp = "+51917013610";
//         const userName = localStorage.getItem('nombre') || '';
//         let mensaje = `Hola Kamas, estoy interesad@ en adquirir este/os producto/s:\n` + `*${producto.nombre}*\n` + `https://kamas.pe${producto.ruta}\n`;

//         if (selectedColorData){
//             mensaje += `Tela: ${selectedColorData.tela || 'Sin variación'}\n`;
//             mensaje += `Color: ${selectedColorData.color || 'Sin variación'}\n`;
//         } else{
//             mensaje += `Tela: Sin variación\n`;
//             mensaje += `Color: Sin variación\n`;
//         }

//         mensaje += `Precio: S/.${precioFinal || producto.precioVenta || 0}\n\n`;
//         mensaje += `Cantidad: ${quantity || 1}\n\n`;

//         if (userName.trim()){
//             mensaje += `Cliente: ${userName}\n`;
//         }

//         const departamento = shippingInfo?.locationData?.departamento || '';
//         const provincia = shippingInfo?.locationData?.provincia || '';
//         const distrito = shippingInfo?.locationData?.distrito || '';

//         if (departamento || provincia || distrito){
//             mensaje += `Departamento: ${departamento}\n`;
//             mensaje += `Provincia: ${provincia}\n`;
//             mensaje += `Distrito: ${distrito}\n\n`;
//         }

//         if (shippingInfo?.selectedAgency){
//             mensaje += `Agencia seleccionada: ${shippingInfo.selectedAgency}\n`;
//         }
//         if (shippingInfo?.selectedSede){
//             mensaje += `Sede de agencia: ${shippingInfo.selectedSede}\n`;
//         }

//         if (selectedShipping?.tipo){
//             mensaje += `Tipo de envío seleccionado: ${selectedShipping.tipo}\n`;
//             mensaje += `Costo de envío: S/.${selectedShipping.precio || 0}`;
//         } else{
//             mensaje += `Tipo de envío: No seleccionado\n`;
//             mensaje += `Costo de envío: Por definir`;
//         }

//         return `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
//     };

//     if (!data){
//         return <div>Cargando colores...</div>;
//     }

//     if (telas.length === 0){
//         return <div>No hay colores disponibles</div>;
//     }

//     const activeTela = telas[activeTelaIndex];

//     const coloresMostrados = showAllTelas
//         ? telas.flatMap((tela, telaIdx) =>
//             tela.colores.map((color, colorIdx) => ({
//                 ...color,
//                 tela: tela.tela,
//                 categoria: tela.categoria,
//                 costosAdicionales: tela.costosAdicionales,
//                 _key: `${telaIdx}-${colorIdx}-${color.color}`
//             }))
//         )
//         : activeTela.colores.map((color, index) => ({
//             ...color,
//             tela: activeTela.tela,
//             categoria: activeTela.categoria,
//             costosAdicionales: activeTela.costosAdicionales,
//             _key: `${activeTela.tela}-${index}-${color.color}`
//         }));

//     return(
//         <>
//             <div className="product-page-colors-button" onClick={() => setIsColorsActive(true)}>
//                 <div className="d-flex-column gap-5">
//                     <p className="text title text-center">+80 colores</p>
//                     <ul className="product-page-colors-button-miniatures">
//                         <li><LazyImage width={20} height={20} src='/assets/imagenes/colores/piel-de-potro/thumb/acero.png' alt='Acero'/></li>
//                         <li><LazyImage width={20} height={20} src='/assets/imagenes/colores/piel-de-potro/thumb/rojo.png' alt='Azul noche'/></li>
//                         <li><LazyImage width={20} height={20} src='/assets/imagenes/colores/iker/thumb/gris-raton.png' alt='Gris ratón'/></li>
//                         <li><LazyImage width={20} height={20} src='/assets/imagenes/colores/tejido/thumb/amarillo.png' alt='Amarillo'/></li>
//                         <li><LazyImage width={20} height={20} src='/assets/imagenes/colores/piel-de-potro/thumb/lila.png' alt='Lila'/></li>
//                     </ul>

//                     <LazyImage width={28} height={28} src="/assets/imagenes/colores/circulo-cromatico.png" alt="Circulo cromatico"/>
//                 </div>
//             </div>

//             <div className={`product-page-colors-content ${isColorsActive ? 'active' : ''}`}>
//                 <section className="d-flex-column gap-20">
//                     <div className="d-flex-center-between gap-20">
//                         <p className="block-title text">Colores</p>
//                         <button type="button" className="product-page-colors-content-button-close" onClick={() => setIsColorsActive(false)}>
//                             <span className="material-symbols-outlined">close</span>
//                         </button>
//                     </div>

//                     <div>
//                         <div className="d-flex-column gap-20">
//                             <ul className="product-page-colors-fabrics">
//                                {telas.map((tela, index) => (
//                                     <li key={`${index}-${tela.tela}`}>
//                                         <button type="button" className={!showAllTelas && index === activeTelaIndex ? 'active' : ''}
//                                             onClick={() =>{
//                                                 setShowAllTelas(false);
//                                                 setActiveTelaIndex(index);
//                                             }}
//                                         >
//                                             <span className="material-symbols-outlined">keyboard_arrow_right</span>
//                                             <p className="text">{tela.tela}</p>
//                                         </button>
//                                     </li>
//                                 ))}
//                                 <li>
//                                     <button type="button" className={showAllTelas ? 'active' : ''}
//                                         onClick={() =>{
//                                             setShowAllTelas(true);
//                                             setActiveTelaIndex(0);
//                                         }}
//                                     >
//                                         <span className="material-symbols-outlined">keyboard_arrow_right</span>
//                                         <p className="text">Ver todas las telas</p>
//                                     </button>
//                                 </li>
//                             </ul>
//                         </div>

//                         <div className="d-flex-column gap-20">
//                             <div className="product-page-colors">
//                                 <ul className="product-page-colors-results">
//                                    {coloresMostrados.map((color, index) => (
//                                         <li key={color._key}>
//                                             <button type="button" className={activeColorIndex === index ? 'active' : ''}
//                                                 onClick={() =>{ 
//                                                     setActiveColorIndex(index); 
//                                                     setShowContinue(true);
                                                    
//                                                     const colorData ={
//                                                         color: color.color,
//                                                         img: color.img,
//                                                         tela: color.tela,
//                                                         categoria: color.categoria,
//                                                         costosAdicionales: color.costosAdicionales
//                                                     };
                                                    
//                                                     setSelectedColorData(colorData);
                                                    
//                                                     if (onSelectColor){
//                                                         onSelectColor(colorData);
//                                                     }
//                                                 }}
//                                             >
//                                                 <img src={color.img} alt='Paleta de colores Kamas' />
//                                                 <p className="text">{color.color}</p>
//                                             </button>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//             </div>

//             <a href={getWhatsAppLink()} className={`button-link button-link-2 product-page-colors-continue ${showContinue ? 'active' : ''}`} target="_blank" rel="noopener noreferrer" onClick={() => setIsColorsActive(false)}>
//                 <p className='button-link-text'>Continuar</p>
//                 <span className="material-symbols-outlined">arrow_forward</span>
//             </a>

//             <div className={`product-page-colors-layer ${isColorsActive ? 'active' : ''}`} onClick={() => setIsColorsActive(false)}></div>
//         </>
//     );
// }

// export default Colores;

import { useEffect, useState } from 'react';

import './Colores.css';

import LazyImage from '../../../../Componentes/Plantillas/LazyImage';

function Colores({ onSelectColor, producto, selectedShipping, shippingInfo, quantity, precioFinal }){
    const [data, setData] = useState(null);
    const [telas, setTelas] = useState([]);
    const [activeTelaIndex, setActiveTelaIndex] = useState(0);
    const [isColorsActive, setIsColorsActive] = useState(false);
    const [activeColorIndex, setActiveColorIndex] = useState(null);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);
    const [showContinue, setShowContinue] = useState(false);
    const [showAllTelas, setShowAllTelas] = useState(false);
    const [selectedColorData, setSelectedColorData] = useState(null);

    useEffect(() =>{
        fetch('/assets/json/colores.json').then((response) =>{
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            }).then((json) =>{
                setData(json);
                const lineasObj = json?.telas?.[0];
                
                if (!lineasObj){
                    setTelas([]);
                    return;
                }
                
                const categoriasKeys = Object.keys(lineasObj);
                const todasLasTelas = categoriasKeys.flatMap(categoriaKey =>{
                    const grupo = lineasObj[categoriaKey];
                    
                    let costosAdicionales = [];
                    
                    if (grupo && grupo['costos-adicionales'] !== undefined){
                        costosAdicionales = grupo['costos-adicionales'];
                    } else if (grupo && grupo['costo-adicional'] !== undefined){
                        costosAdicionales = [{
                            producto: 'Costo adicional',
                            'costo-adicional': grupo['costo-adicional']
                        }];
                    }

                    return grupo?.telas?.map(tela => ({
                        ...tela,
                        categoria: categoriaKey,
                        costosAdicionales
                    })) || [];
                });

                setTelas(todasLasTelas);
            })
            .catch((error) =>{
                console.error('Error al obtener el JSON:', error);
                setTelas([]);
            });
    }, []);

    useEffect(() =>{
        setActiveColorIndex(null);
        setShowContinue(false);
        setSelectedColorData(null);
        if (onSelectColor){
            onSelectColor(null);
        }
    }, [activeTelaIndex, showAllTelas, onSelectColor]);

    useEffect(() =>{
        const handleResize = () =>{
            setIsSmallScreen(window.innerWidth < 600);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getWhatsAppLink = () =>{
        if (!producto) return '#';

        const numeroWhatsApp = "+51917013610";
        const userName = localStorage.getItem('nombre') || '';
        let mensaje = `Hola Kamas, estoy interesad@ en adquirir este/os producto/s:\n` + `*${producto.nombre}*\n` + `https://kamas.pe${producto.ruta}\n`;

        if (selectedColorData){
            mensaje += `Tela: ${selectedColorData.tela || 'Sin variación'}\n`;
            mensaje += `Color: ${selectedColorData.color || 'Sin variación'}\n`;
        } else{
            mensaje += `Tela: Sin variación\n`;
            mensaje += `Color: Sin variación\n`;
        }

        mensaje += `Precio: S/.${precioFinal || producto.precioVenta || 0}\n\n`;
        mensaje += `Cantidad: ${quantity || 1}\n\n`;

        if (userName.trim()){
            mensaje += `Cliente: ${userName}\n`;
        }

        const departamento = shippingInfo?.locationData?.departamento || '';
        const provincia = shippingInfo?.locationData?.provincia || '';
        const distrito = shippingInfo?.locationData?.distrito || '';

        if (departamento || provincia || distrito){
            mensaje += `Departamento: ${departamento}\n`;
            mensaje += `Provincia: ${provincia}\n`;
            mensaje += `Distrito: ${distrito}\n\n`;
        }

        if (shippingInfo?.selectedAgency){
            mensaje += `Agencia seleccionada: ${shippingInfo.selectedAgency}\n`;
        }
        if (shippingInfo?.selectedSede){
            mensaje += `Sede de agencia: ${shippingInfo.selectedSede}\n`;
        }

        if (selectedShipping?.tipo){
            mensaje += `Tipo de envío seleccionado: ${selectedShipping.tipo}\n`;
            mensaje += `Costo de envío: S/.${selectedShipping.precio || 0}`;
        } else{
            mensaje += `Tipo de envío: No seleccionado\n`;
            mensaje += `Costo de envío: Por definir`;
        }

        return `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    };

    if (!data){
        return <div>Cargando colores...</div>;
    }

    if (telas.length === 0){
        return <div>No hay colores disponibles</div>;
    }

    const activeTela = telas[activeTelaIndex];

    const coloresMostrados = showAllTelas
        ? telas.flatMap((tela, telaIdx) =>
            tela.colores.map((color, colorIdx) => ({
                ...color,
                tela: tela.tela,
                categoria: tela.categoria,
                costosAdicionales: tela.costosAdicionales,
                _key: `${telaIdx}-${colorIdx}-${color.color}`
            }))
        )
        : activeTela.colores.map((color, index) => ({
            ...color,
            tela: activeTela.tela,
            categoria: activeTela.categoria,
            costosAdicionales: activeTela.costosAdicionales,
            _key: `${activeTela.tela}-${index}-${color.color}`
        }));

    return(
        <>
            <div className="product-page-colors-button" onClick={() => setIsColorsActive(true)}>
                <div className="d-flex-column gap-5">
                    <p className="text title text-center">+80 colores</p>
                    <ul className="product-page-colors-button-miniatures">
                        <li><LazyImage width={20} height={20} src='/assets/imagenes/colores/piel-de-potro/thumb/acero.png' alt='Acero'/></li>
                        <li><LazyImage width={20} height={20} src='/assets/imagenes/colores/piel-de-potro/thumb/rojo.png' alt='Azul noche'/></li>
                        <li><LazyImage width={20} height={20} src='/assets/imagenes/colores/iker/thumb/gris-raton.png' alt='Gris ratón'/></li>
                        <li><LazyImage width={20} height={20} src='/assets/imagenes/colores/tejido/thumb/amarillo.png' alt='Amarillo'/></li>
                        <li><LazyImage width={20} height={20} src='/assets/imagenes/colores/piel-de-potro/thumb/lila.png' alt='Lila'/></li>
                    </ul>

                    <LazyImage width={28} height={28} src="/assets/imagenes/colores/circulo-cromatico.png" alt="Circulo cromatico"/>
                </div>
            </div>

            <div className={`product-page-colors-content ${isColorsActive ? 'active' : ''}`}>
                <section className="d-flex-column gap-20">
                    <div className="d-flex-center-between gap-20">
                        <p className="block-title text">Colores</p>
                        <button type="button" className="product-page-colors-content-button-close" onClick={() => setIsColorsActive(false)}>
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>

                    <div>
                        <div className="d-flex-column gap-20">
                            <ul className="product-page-colors-fabrics">
                               {telas.map((tela, index) => (
                                    <li key={`${index}-${tela.tela}`}>
                                        <button type="button" className={!showAllTelas && index === activeTelaIndex ? 'active' : ''}
                                            onClick={() =>{
                                                setShowAllTelas(false);
                                                setActiveTelaIndex(index);
                                            }}
                                        >
                                            <span className="material-symbols-outlined">keyboard_arrow_right</span>
                                            <p className="text">{tela.tela}</p>
                                        </button>
                                    </li>
                                ))}
                                <li>
                                    <button type="button" className={showAllTelas ? 'active' : ''}
                                        onClick={() =>{
                                            setShowAllTelas(true);
                                            setActiveTelaIndex(0);
                                        }}
                                    >
                                        <span className="material-symbols-outlined">keyboard_arrow_right</span>
                                        <p className="text">Ver todas las telas</p>
                                    </button>
                                </li>
                            </ul>
                        </div>

                        <div className="d-flex-column gap-20">
                            <div className="product-page-colors">
                                <ul className="product-page-colors-results">
                                   {coloresMostrados.map((color, index) => (
                                        <li key={color._key}>
                                            <button type="button" className={activeColorIndex === index ? 'active' : ''}
                                                onClick={() =>{ 
                                                    setActiveColorIndex(index); 
                                                    setShowContinue(true);
                                                    
                                                    const colorData ={
                                                        color: color.color,
                                                        img: color.img,
                                                        tela: color.tela,
                                                        categoria: color.categoria,
                                                        costosAdicionales: color.costosAdicionales
                                                    };
                                                    
                                                    setSelectedColorData(colorData);
                                                    
                                                    if (onSelectColor){
                                                        onSelectColor(colorData);
                                                    }
                                                }}
                                            >
                                                <img src={color.img} alt='Paleta de colores Kamas' />
                                                <p className="text">{color.color}</p>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <a href={getWhatsAppLink()} className={`button-link button-link-2 product-page-colors-continue ${showContinue ? 'active' : ''}`} target="_blank" rel="noopener noreferrer" onClick={() => setIsColorsActive(false)}>
                <p className='button-link-text'>Continuar</p>
                <span className="material-symbols-outlined">arrow_forward</span>
            </a>

            <div className={`product-page-colors-layer ${isColorsActive ? 'active' : ''}`} onClick={() => setIsColorsActive(false)}></div>
        </>
    );
}

export default Colores;
