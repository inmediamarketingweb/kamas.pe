import { useEffect, useState } from 'react';

import './Colores.css';

import LazyImage from '../../../../Componentes/Plantillas/LazyImage';

function Colores({ onSelectColor }){
    const [data, setData] = useState(null);
    const [telas, setTelas] = useState([]);
    const [activeTelaIndex, setActiveTelaIndex] = useState(0);
    const [isColorsActive, setIsColorsActive] = useState(false);
    const [activeColorIndex, setActiveColorIndex] = useState(null);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);

    useEffect(() => {
        fetch('/assets/json/colores.json')
            .then((response) => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then((json) => {
                setData(json);
                const lineasObj = json?.telas?.[0];
                
                if (!lineasObj) {
                    setTelas([]);
                    return;
                }
                
                const categoriasKeys = Object.keys(lineasObj);
                const todasLasTelas = categoriasKeys.flatMap(categoriaKey => {
                    const grupo = lineasObj[categoriaKey];
                    
                    let costosAdicionales = [];
                    
                    if (grupo && grupo['costos-adicionales'] !== undefined) {
                        costosAdicionales = grupo['costos-adicionales'];
                    } else if (grupo && grupo['costo-adicional'] !== undefined) {
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
            .catch((error) => {
                console.error('Error al obtener el JSON:', error);
                setTelas([]);
            });
    }, []);

    useEffect(() => {
        setActiveColorIndex(null);
        if (onSelectColor) {
            onSelectColor(null);
        }
    }, [activeTelaIndex, onSelectColor]);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 600);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!data) {
        return <div>Cargando colores...</div>;
    }

    if (telas.length === 0) {
        return <div>No hay colores disponibles</div>;
    }

    const activeTela = telas[activeTelaIndex];

    return(
        <>
            <div className="product-page-colors-button" onClick={() => setIsColorsActive(true)}>
                <div className="d-flex-column gap-5">
                    <p className="text title text-center">+80 colores</p>
                    <ul className="product-page-colors-button-miniatures">
                        <li><LazyImage width={20} height={20} src='/assets/imagenes/colores/plus/piel-de-potro/thumb/acero.webp' alt='Acero'/></li>
                        <li><LazyImage width={20} height={20} src='/assets/imagenes/colores/plus/piel-de-potro/thumb/rojo.webp' alt='Azul noche'/></li>
                        <li><LazyImage width={20} height={20} src='/assets/imagenes/colores/plus/iker/thumb/gris-raton.webp' alt='Gris ratón'/></li>
                        <li><LazyImage width={20} height={20} src='/assets/imagenes/colores/plus/piel-de-potro/thumb/amarillo.webp' alt='Amarillo'/></li>
                        <li><LazyImage width={20} height={20} src='/assets/imagenes/colores/plus/piel-de-potro/thumb/lila.webp' alt='Lila'/></li>
                    </ul>

                    <LazyImage width={28} height={28} src="/assets/imagenes/colores/circulo-cromatico.png" alt="Circulo cromatico"/>
                </div>
            </div>

            <div className={`product-page-colors-content ${isColorsActive ? 'active' : ''}`}>
                <section className="d-flex-column gap-20">
                    <div className="d-flex-center-between gap-20">
                        <p className="block-title text">Colores</p>
                        <button type="button" className="product-page-colors-content-button-close" onClick={() => setIsColorsActive(false)}>
                            <span className="material-icons">close</span>
                        </button>
                    </div>

                    <div>
                        <div className="d-flex-column gap-20">
                            <ul className="product-page-colors-fabrics d-flex-column gap-5">
                                {telas.map((tela, index) => (
                                    <li key={`${index}-${tela.tela}`}>
                                        <button type="button" className={index === activeTelaIndex ? 'active' : ''} onClick={() => setActiveTelaIndex(index)}>
                                            <p className="text">{tela.tela}</p>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="d-flex-column gap-20">
                            <div className="product-page-colors">
                                <ul className="product-page-colors-results">
                                    {activeTela.colores.map((color, index) => (
                                        <li key={`${activeTela.tela}-${index}-${color.color}`}>
                                            <button type="button" className={activeColorIndex === index ? 'active' : ''} onClick={() => {
                                                    setActiveColorIndex(index);
                                                    if (onSelectColor) {
                                                        onSelectColor({
                                                            color: color.color,
                                                            img: color.img,
                                                            tela: activeTela.tela,
                                                            categoria: activeTela.categoria,
                                                            costosAdicionales: activeTela.costosAdicionales
                                                        });
                                                    }
                                                }}
                                            >
                                                <LazyImage width={isSmallScreen ? 90 : 137} height={isSmallScreen ? 50 : 70} src={color.img} alt={color.color}/>
                                                <p className="text">{color.color}</p>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className='d-flex-column gap-20'>
                            <div className='d-flex-column gap-10'>
                                <p className='title'>{activeTela.tela}</p>
                                <p className='text'>{activeTela.descripcion || 'Descripción de la tela'}</p>
                            </div>

                            <div className='d-flex-column gap-10'>
                                <p className='title'>Costos adicionales:</p>
                                
                                {activeTela.costosAdicionales.length > 0 ? (
                                    <table className='costos-adicionales' cellSpacing="0">
                                        <tbody>
                                            <tr>
                                                <th><p>Producto</p></th>
                                                <th><p>Precio</p></th>
                                            </tr>
                                            {activeTela.costosAdicionales.map((costo, index) => (
                                                <tr key={`${activeTela.tela}-costo-${index}`}>
                                                    <td><p>{costo.producto}</p></td>
                                                    <td><p>S/.{costo['costo-adicional']}.00</p></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p className="text">Sin costos adicionales.</p>
                                )}
                            </div>

                            {activeColorIndex !== null && (
                                <button type="button" className="button-link button-link-2 margin-left" onClick={() => setIsColorsActive(false)}>
                                    <span className="material-icons">check</span>
                                    <p className="button-link-text">Confirmar</p>
                                </button>
                            )}
                        </div>
                    </div>
                </section>
            </div>

            <div className={`product-page-colors-layer ${isColorsActive ? 'active' : ''}`} onClick={() => setIsColorsActive(false)}></div>
        </>
    );
}

export default Colores;
