import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router-dom';

import './Colores.css';

import Layer from '../../../Componentes/Layer/Layer';
import Footer from '../../../Componentes/Footer/Footer';

const DEFAULT_BANNER = '/assets/imagenes/paginas/colores-baner.jpg';

function Colores() {
    const location = useLocation();
    const navigate = useNavigate();
    const [fabricData, setFabricData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedFabric, setSelectedFabric] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [bannerImage, setBannerImage] = useState(DEFAULT_BANNER);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await fetch('/assets/json/colores.json');
                if(!response.ok) throw new Error('Error al cargar datos');
                setFabricData(await response.json());
            } catch(err) {
                console.error('Error al cargar datos:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const fabric = params.get('tela');
        const color = params.get('color');

        if(fabric) setSelectedFabric(fabric);
        if(color) setSelectedColor({ color });
    }, [location.search]);

    useEffect(() => {
        if(!fabricData || !selectedFabric) {
            setBannerImage(DEFAULT_BANNER);
            return;
        }

        let foundFabric = null;
        for(const obj of fabricData.telas) {
            for(const cat in obj) {
                const telas = obj[cat]?.telas || [];
                const f = telas.find(t => t.tela === selectedFabric);
                if(f) {
                    foundFabric = f;
                    break;
                }
            }
            if(foundFabric) break;
        }

        if(!foundFabric) {
            setBannerImage(DEFAULT_BANNER);
            return;
        }

        if(selectedColor?.color) {
            const colorObj = foundFabric.colores?.find(c => c.color === selectedColor.color);
            if(colorObj) {
                setSelectedColor(colorObj);
                setBannerImage(colorObj.original);
            } else {
                setSelectedColor(null);
                setBannerImage(DEFAULT_BANNER);
            }
        } else {
            setBannerImage(DEFAULT_BANNER);
        }
    }, [fabricData, selectedFabric, selectedColor?.color]);

    useEffect(() => {
        const params = new URLSearchParams();
        if(selectedFabric) params.set('tela', selectedFabric);
        if(selectedColor?.color) params.set('color', selectedColor.color);
        navigate(`?${params.toString()}`, { replace: true });
    }, [selectedFabric, selectedColor, navigate]);

    // 5. Scroll en móvil al seleccionar color
    useEffect(() => {
        if(window.innerWidth < 600 && selectedColor) {
            window.scrollTo({ top: 272, behavior: 'smooth' });
        }
    }, [selectedColor]);

    const handleFabricSelect =(fabricName) => {
        setSelectedFabric(fabricName);
        setSelectedColor(null);
    };

    const handleColorSelect =(colorObj) => {
        setSelectedColor(colorObj);
    };

    const handleShowAll =() => {
        setSelectedFabric(null);
        setSelectedColor(null);
    };

    if(loading) return <Layer />;
    if(!fabricData) return null;

    const allFabrics = [];
    fabricData.telas.forEach(obj => {
        for(const cat in obj) {
            const telas = obj[cat]?.telas || [];
            telas.forEach(t => {
                allFabrics.push({ ...t, categoria: cat });
            });
        }
    });

    const currentColors = selectedFabric ? allFabrics.find(f => f.tela === selectedFabric)?.colores || [] : [];

    return(
        <>
            <Helmet>
                <title>Paleta de colores | Kamas</title>
                <meta name="description" content="Explora nuestra variedad de colores y telas" />
            </Helmet>

            <header className='pg-colors-header'>
                <div className='header-center-container d-flex-w-100'>
                    <div className='header-center'>
                        <a href='https://dormihogar.pe/' title='' className='header-logo'>
                            <img src="/assets/imagenes/kamas/logo-principal-kamas.jpg" width={188} height={42} alt="Kamas" />
                        </a>
                    </div>
                </div>
            </header>

            <main className='colors-page'>
                <div className='block-container'>
                    <section className='block-content'>
                        <div className='colors-telas'>
                            <div className='d-flex-column gap-20'>
                                <h1 className='block-title margin-right w-auto'>Paleta de colores</h1>

                                <ul>
                                    {allFabrics.map((fabric) =>(
                                        <li key={fabric.tela}>
                                            <button type='button' className={selectedFabric === fabric.tela ? 'active' : ''} onClick={() => handleFabricSelect(fabric.tela)}>
                                                <span className="material-symbols-outlined">keyboard_arrow_right</span>
                                                <p className='text'>{fabric.tela}</p>
                                            </button>
                                        </li>
                                    ))}
                                    <li>
                                        <button type='button' className={!selectedFabric ? 'active' : ''} onClick={handleShowAll}>
                                            <span className="material-symbols-outlined">keyboard_arrow_right</span>
                                            <p className='text'>Ver todas las telas</p>
                                        </button>
                                    </li>
                                </ul>
                            </div>

                            <div className='colors-results'>
                                <div className='colors-banner'>
                                    <img src={bannerImage} alt={selectedColor ? `Tela ${selectedFabric} en ${selectedColor.color}` : 'Banner de colores'} />

                                    {selectedColor ?(
                                        <div className='d-flex'>
                                            <p className='text'>{selectedColor.color}</p>
                                        </div>
                                    ) :(
                                        <div className='d-flex-center-center gap-10'>
                                            <p className='text'>Seleccione un color</p>
                                            <span className="material-symbols-outlined color-color-1">touch_app</span>
                                        </div>
                                    )}
                                </div>

                                {selectedFabric ?(
                                    <div className='colors-colors'>
                                        <ul>
                                            {currentColors.map((color, index) =>(
                                                <li key={index} onClick={() => handleColorSelect(color)} className={selectedColor?.color === color.color ? 'active' : ''}>
                                                    <img src={color.img} alt={`Color ${color.color}`} />
                                                    <p className='text'>{color.color}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ) :(
                                    allFabrics.map((fabric) =>(
                                        <div key={fabric.tela} className="d-flex-column gap-10">
                                            <h3 className='title text'>{fabric.tela} :</h3>

                                            <div className='colors-colors'>
                                                <ul>
                                                    {fabric.colores.map((color, index) =>(
                                                        <li key={index} onClick={() => { setSelectedFabric(fabric.tela); setSelectedColor(color); }}>
                                                            <img src={color.img} alt={`Color ${color.color}`} />
                                                            <p className='text'>{color.color}</p>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </>
    );
}

export default Colores;
