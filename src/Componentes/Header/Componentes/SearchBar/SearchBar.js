import { useState, useEffect, useRef } from 'react';

import LazyImage from '../../../Plantillas/LazyImage';

import './SearchBar.css';

function SearchBar() {
    const [productos, setProductos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);
    const inputRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 600);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const handleGlobalKeyDown = (e) => {
            const isCtrlK = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k';
            
            const isSlash = e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey;
            
            if (isCtrlK || isSlash) {
                e.preventDefault();
                if (inputRef.current) {
                    inputRef.current.focus();
                    inputRef.current.select();
                }
            }
        };

        document.addEventListener('keydown', handleGlobalKeyDown);
        
        return () => {
            document.removeEventListener('keydown', handleGlobalKeyDown);
        };
    }, []);

    useEffect(() => {
        const fetchProductos = async () => {
            try{
                const manifestResponse = await fetch('/assets/json/manifest.json');
                if (!manifestResponse.ok) {
                    console.error(manifestResponse.status);
                    return;
                }
                const manifestData = await manifestResponse.json();
                const archivos = manifestData.files || [];

                const productosArrays = await Promise.all(
                    archivos.map(async (archivo) => {
                        try {
                            const res = await fetch(archivo);
                            if (!res.ok) {
                                console.warn(`No OK (${res.status}) al cargar ${archivo}`);
                                return [];
                            }
                            const text = await res.text();
                            if (!text) {
                                console.warn(`Respuesta vacía para ${archivo}`);
                                return [];
                            }
                            const data = JSON.parse(text);
                            return data.productos || [];
                        } catch (err) {
                            console.error(`Error procesando ${archivo}:`, err);
                            return [];
                        }
                    })
                );

                setProductos(productosArrays.flat());
            } catch (error) {
                console.error('Error al cargar los productos:', error);
            }
        };

        if (searchTerm.trim().length >= 3 && productos.length === 0) {
            fetchProductos();
        }
    }, [searchTerm, productos.length]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const normalizeStr = (str = '') => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

    let filteredProductos = [];

    if (searchTerm.trim() !== ''){
        const normalizedSearchTerm = normalizeStr(searchTerm);
        const searchTermWithoutSpaces = normalizedSearchTerm.replace(/\s/g, '');

        const exactSkuMatch = productos.find(p => 
            normalizeStr(p.sku).replace(/\s/g, '') === searchTermWithoutSpaces
        );

        if (exactSkuMatch) {
            filteredProductos = [exactSkuMatch];
        } 
        else {
            const tokens = normalizedSearchTerm.split(' ').filter(Boolean);
            filteredProductos = productos.filter(producto => {
                const fields = [
                    producto.nombre, 
                    producto.sku, 
                    producto.categoria, 
                    producto.subcategoria
                ].map(String).map(normalizeStr);

                return tokens.every(token => 
                    fields.some(field => field.includes(token))
                );
            });
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (!searchTerm.trim()) return;
            if (filteredProductos.length === 1) {
                window.location.href = filteredProductos[0].ruta;
            } else if (filteredProductos.length > 1) {
                window.location.href = `/busqueda?query=${encodeURIComponent(searchTerm)}`;
            }
        } else if (e.key === 'Escape') {
            setSearchTerm('');
        }
    };

    return (
        <>
            <div className={`search-bar-container ${searchTerm.trim() !== '' ? 'active' : ''}`}>
                <div className='search-bar'>
                    <input ref={inputRef} type='text' placeholder='Buscar en kamas.pe / Ctrl+K' 
                        value={searchTerm} 
                        onChange={handleSearchChange} 
                        onKeyDown={handleKeyDown} 
                    />
                    <span className='material-icons'>search</span>
                </div>

                <div className={`search-bar-items-container ${searchTerm.trim() !== '' ? 'active' : ''}`}>
                    <ul className='search-bar-items'>
                        {filteredProductos.length > 0 ? (
                            filteredProductos.map((producto) => (
                                <li key={producto.sku}>
                                    <a href={producto.ruta} title={producto.nombre}>
                                        <p className='text'>{producto.nombre}</p>
                                        <LazyImage 
                                            width={isSmallScreen ? 80 : 60} 
                                            height={isSmallScreen ? 80 : 60} 
                                            src={`${producto.fotos}/1.jpg`} 
                                            alt={producto.nombre}
                                        />
                                    </a>
                                </li>
                            ))
                        ) : (
                            <li>No se encontraron productos.</li>
                        )}
                    </ul>
                </div>
            </div>

            <div className={`search-bar-layer ${searchTerm.trim() !== '' ? 'active' : ''}`} onClick={() => setSearchTerm('')}></div>
        </>
    );
}

export default SearchBar;
