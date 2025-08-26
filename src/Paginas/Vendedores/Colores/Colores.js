import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router-dom';

import './Colores.css';

import SpinnerLoading from '../../../Componentes/SpinnerLoading/SpinnerLoading';

const DEFAULT_BANNER = 'https://concepto.de/wp-content/uploads/2018/09/Historia-Pintura-Van-Gogh-691x451.jpg';

function Colores(){
    const location = useLocation();
    const navigate = useNavigate();
    const [fabricData, setFabricData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedFabric, setSelectedFabric] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [bannerImage, setBannerImage] = useState(DEFAULT_BANNER);
    const [fabricInfo, setFabricInfo] = useState(null);

    useEffect(() => {
        if (window.innerWidth < 600 && selectedColor) {
            window.scrollTo({
                top: 272,
                behavior: 'smooth'
            });
        }
    }, [selectedColor]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const category = params.get('categoria');
        const fabric = params.get('tela');
        const color = params.get('color');

        if (category) setSelectedCategory(category);
        if (fabric) setSelectedFabric(fabric);
        if (color) setSelectedColor({ color });
    }, [location.search]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/assets/json/colores.json');
                if (!response.ok) throw new Error('Error al cargar datos');
                setFabricData(await response.json());
            } catch (err) {
                console.error('Error al cargar datos:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (!fabricData) return;
        
        const findColorOrigin = (colorName) => {
            for (const category in fabricData.telas[0]) {
                const categoryData = fabricData.telas[0][category];
                for (const fabric of categoryData.telas) {
                    const foundColor = fabric.colores.find(c => c.color === colorName);
                    if (foundColor) {
                        return { category, fabric: fabric.tela };
                    }
                }
            }
            return { category: null, fabric: null };
        };

        const params = new URLSearchParams();
        if (selectedCategory) params.set('categoria', selectedCategory);
        if (selectedFabric) params.set('tela', selectedFabric);
        if (selectedColor?.color) params.set('color', selectedColor.color);

        navigate(`?${params.toString()}`, { replace: true });

        if (selectedColor?.color && (!selectedCategory || !selectedFabric)) {
            const origin = findColorOrigin(selectedColor.color);
            if (origin.category && origin.fabric) {
                setSelectedCategory(origin.category);
                setSelectedFabric(origin.fabric);
            }
        }

        if (selectedColor?.color && selectedCategory && selectedFabric) {
            const categoryData = fabricData.telas[0][selectedCategory];
            const fabric = categoryData?.telas?.find(f => f.tela === selectedFabric);

            if (fabric) {
                const colorObj = fabric.colores?.find(c => c.color === selectedColor.color);
                if (colorObj){
                    setSelectedColor(colorObj);
                    setBannerImage(colorObj.original);
                }
            }
        }
    }, [selectedCategory, selectedFabric, selectedColor, fabricData, navigate]);

    useEffect(() => {
        if (selectedColor && fabricData && selectedColor.original){
            setBannerImage(selectedColor.original);
        } else {
            setBannerImage(DEFAULT_BANNER);
        }
    }, [selectedColor, fabricData]);

    useEffect(() => {
        if (fabricData && selectedCategory && selectedFabric) {
            const categoryData = fabricData.telas[0][selectedCategory];
            const fabric = categoryData?.telas?.find(f => f.tela === selectedFabric);

            if (fabric) {
                const costosAdicionales = categoryData['costos-adicionales'] || [];

                setFabricInfo({
                    nombre: fabric.tela,
                    descripcion: fabric.descripcion,
                    costosAdicionales: costosAdicionales
                });
            }
        } else {
            setFabricInfo(null);
        }
    }, [fabricData, selectedCategory, selectedFabric]);

    const handleColorSelect = (color, category = null, fabric = null) => {
        if (category && fabric) {
            setSelectedCategory(category);
            setSelectedFabric(fabric);
            setSelectedColor(color);
        } 
        else {
            setSelectedColor(color);
        }
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setSelectedFabric(null);
        setSelectedColor(null);
    };

    const handleFabricSelect = (fabric) => {
        setSelectedFabric(fabric);
        setSelectedColor(null);
    };

    if (loading) return (
        <SpinnerLoading/>
    );

    if (!fabricData) return null;

    const categories = fabricData.telas.flatMap(obj => Object.keys(obj));

    const getFabricsForCategory = (category) => {
        for (const obj of fabricData.telas) {
            if (obj[category]) {
                return obj[category].telas || [];
            }
        }
        return [];
    };

    const getCategoryShort = (category) => {
        for (const obj of fabricData.telas) {
            if (obj[category]) return obj[category].short || '';
        }
        return '';
    };

    const getColorsForFabric = (category, fabricType) => {
        const fabrics = getFabricsForCategory(category);
        const fabric = fabrics.find(f => f.tela === fabricType);
        return fabric?.colores || [];
    };

    const renderAllColors = () => {
        const categoriesToRender = selectedCategory ? [selectedCategory] : categories;

        return categoriesToRender.map(category => {
            const fabrics = getFabricsForCategory(category);

            return(
                <div className="d-flex-column gap-10" key={category}>
                    <div className='d-flex-center-left gap-10'>
                        <h2 className='block-title d-flex-center-left color-black-0'>{category}</h2>
                        <span className='text'>-</span>
                        <p className='text'>{getCategoryShort(category)}</p>
                    </div>

                    {fabrics.map(fabric => {
                        if (selectedFabric && selectedFabric !== fabric.tela) return null;

                        return(
                            <div className="d-flex-column gap-10" key={fabric.tela}>
                                <h3 className='title text'>{fabric.tela} :</h3>
                                <ul className="colores">
                                    {fabric.colores.map((color, index) => (
                                        <li key={index}>
                                            <button className={`color-item ${selectedColor?.color === color.color ? 'active' : ''}`} onClick={() => handleColorSelect(color, category, fabric.tela)}>
                                                <img src={color.img} alt={`Color ${color.color}`}/>
                                                <p>{color.color}</p>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            );
        });
    };

    return(
        <>
            <Helmet>
                <title>Paleta de colores | Kamas</title>
                <meta name="description" content="Explora nuestra variedad de colores y telas" />
            </Helmet>

            <main>
                <div className='block-container'>
                    <section className="block-content">
                        <div className="page-colors-container">
                            <div className="telas-category d-flex-column gap-20">
                                <div className='d-flex-column gap-10'>
                                    <p className='title'>Categoría de tela:</p>
                                    <ul className="d-flex d-flex-wrap gap-5">
                                        {categories.map((category, index) => (
                                            <li key={index}>
                                                <button className={selectedCategory === category ? 'page-colors-filters-button active' : 'page-colors-filters-button'} onClick={() => handleCategorySelect(category)}>
                                                    <h2>{category}</h2>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {selectedCategory && (
                                    <div className='d-flex-column gap-10'>
                                        <p className='title'>Tipos de tela:</p>
                                        <ul className="d-flex d-flex-wrap gap-5">
                                            {getFabricsForCategory(selectedCategory).map((fabric, index) => (
                                                <li key={index}>
                                                    <button className={selectedFabric === fabric.tela ? 'page-colors-filters-button active' : 'page-colors-filters-button'} onClick={() => handleFabricSelect(fabric.tela)} >
                                                    <h3>{fabric.tela}</h3>
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {selectedFabric && (
                                    <div className='d-flex-column gap-10'>
                                        <p className='title'>Colores disponibles:</p>
                                        <ul className="d-flex d-flex-wrap gap-5">
                                            {getColorsForFabric(selectedCategory, selectedFabric).map((color, index) => (
                                                <li key={index}>
                                                    <button className={selectedColor?.color === color.color ? 'page-colors-filters-button active' : 'page-colors-filters-button'} onClick={() => handleColorSelect(color, selectedCategory, selectedFabric)}>
                                                        <h2>{color.color}</h2>
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <button className={!selectedCategory ? 'button-link button-link-2 active' : 'button-link button-link-2'} onClick={() => {
                                        setSelectedCategory(null);
                                        setSelectedFabric(null);
                                        setSelectedColor(null);
                                    }}>
                                    <h2 className='button-link-text'>Ver todas las telas</h2>
                                </button>
                            </div>

                            <div className="d-flex-column gap-20">
                                <div className='d-flex color-banner-container'>
                                    <img src={bannerImage} alt={selectedColor ? `Tela ${selectedFabric} en ${selectedColor.color}` : 'Banner de colores'} className='color-banner' />
                                    {selectedColor && selectedFabric && (
                                        <div className='d-flex-center-left gap-5'>
                                            <p>Tela {selectedFabric}</p>
                                            <span>&gt;</span>
                                            <p>Color {selectedColor.color}</p>
                                        </div>
                                    )}
                                </div>

                                {renderAllColors()}
                            </div>


                            {fabricInfo && (
                                <div className="tela-info d-flex-column gap-20">
                                    <div className='d-flex-column gap-10'>
                                        <h3 className='title'>{fabricInfo.nombre}:</h3>
                                        <p className='text'>{fabricInfo.descripcion}</p>
                                    </div>

                                    <div className='d-flex-column gap-10'>
                                        <p className='title'>Costos adicionales:</p>

                                        {fabricInfo.costosAdicionales && fabricInfo.costosAdicionales.length > 0 ? (
                                            <>
                                                <table className='costos-adicionales' cellSpacing="0">
                                                    <tbody>
                                                        <tr>
                                                            <th><p>Producto</p></th>
                                                            <th><p>Precio</p></th>
                                                        </tr>
                                                        {fabricInfo.costosAdicionales.map((costo, index) => (
                                                            <tr key={index}>
                                                                <td><p>{costo.producto}</p></td>
                                                                <td><p>S/.{costo['costo-adicional']}.00</p></td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                                <p className='text font-13'><b className='color-red'>*</b> Sin importar tamaño o modelo</p>
                                            </>
                                        ) : (
                                            <p className='text'>Sin costo adicional</p>
                                        )}
                                    </div>

                                    <a href={`/busqueda?query=${selectedColor ? encodeURIComponent(selectedColor.color) : ''}`} title='Ver productos relacionados' className={`button-link button-link-2 see-ship-products ${selectedColor ? 'active' : ''}`}>
                                        <p className='button-link-text'>Ver productos relacionados</p>
                                        <span className="material-icons">arrow_forward</span>
                                    </a>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}

export default Colores;
