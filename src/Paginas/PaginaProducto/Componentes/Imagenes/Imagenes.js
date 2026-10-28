// // // // // // import { useState, useEffect } from 'react';

// // // // // // import LazyImage from '../../../../Componentes/Plantillas/LazyImage';
// // // // // // import Colores from '../Colores/Colores';

// // // // // // import './Imagenes.css';

// // // // // // function Imagenes({ imagenes, producto, onSelectColor, skusOfertas, selectedShipping, shippingInfo, quantity, precioFinal }){
// // // // // //     const estaEnOfertas = skusOfertas.includes(producto.sku);
// // // // // //     const [currentIndex, setCurrentIndex] = useState(0);
// // // // // //     const [isDragging, setIsDragging] = useState(false);
// // // // // //     const [dragStartX, setDragStartX] = useState(0);

// // // // // //     const [zoomActive, setZoomActive] = useState(false);
// // // // // //     const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });

// // // // // //     const navigateTo = (idx) => {
// // // // // //         if (idx >= 0 && idx < imagenes.length) setCurrentIndex(idx);
// // // // // //     };
// // // // // //     const handlePrev = () => navigateTo((currentIndex - 1 + imagenes.length) % imagenes.length);
// // // // // //     const handleNext = () => navigateTo((currentIndex + 1) % imagenes.length);

// // // // // //     const handleMouseDown = (e) => { setDragStartX(e.clientX); setIsDragging(true); };
// // // // // //     const handleMouseUp = (e) => {
// // // // // //         if (!isDragging) return;
// // // // // //         const deltaX = e.clientX - dragStartX;
// // // // // //         setIsDragging(false);
// // // // // //         Math.abs(deltaX) > 50 && (deltaX > 0 ? handlePrev() : handleNext());
// // // // // //     };

// // // // // //     const handleMouseEnter = () => setZoomActive(true);
// // // // // //     const handleMouseLeave = () => setZoomActive(false);
// // // // // //     const handleMouseMove = (e) => {
// // // // // //         const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
// // // // // //         const x = ((e.pageX - left) / width) * 100;
// // // // // //         const y = ((e.pageY - top) / height) * 100;
// // // // // //         setZoomPos({ x, y });
// // // // // //     };

// // // // // //     const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);

// // // // // //     useEffect(() => {
// // // // // //         const handleResize = () => {
// // // // // //             setIsSmallScreen(window.innerWidth < 600);
// // // // // //         };

// // // // // //         window.addEventListener('resize', handleResize);

// // // // // //         return () => {
// // // // // //             window.removeEventListener('resize', handleResize);
// // // // // //         };
// // // // // //     }, []);

// // // // // //     const descuento = Math.round(((producto.precioNormal - producto.precioVenta) * 100) / producto.precioNormal);
// // // // // //     const debeMostrarColores = (producto) => {
// // // // // //         if (!producto) return true;
// // // // // //         const detalles = producto['detalles-del-producto'];
// // // // // //         if (!Array.isArray(detalles) || detalles.length === 0) return true;
// // // // // //         const detalle = detalles[0];
// // // // // //         const normalizar = (str) => {
// // // // // //             if (!str) return '';
// // // // // //             return String(str)
// // // // // //                 .toLowerCase()
// // // // // //                 .normalize('NFD')
// // // // // //                 .replace(/[\u0300-\u036f]/g, '')
// // // // // //                 .trim();
// // // // // //         };

// // // // // //         const categoria = normalizar(detalle['categoría'] || detalle['categoria'] || producto.categoria);
// // // // // //         if (categoria === 'colchones') return false;
// // // // // //         const linea = normalizar(detalle['línea'] || detalle['linea'] || producto.linea);
// // // // // //         const lineasExcluidas = ['clasica', 'clasicas', 'clasico', 'clasicos'];
// // // // // //         if (lineasExcluidas.includes(linea)) return false;
// // // // // //         const clavesDetalle = Object.keys(detalle);
// // // // // //         const valoresDetalle = Object.values(detalle);

// // // // // //         const tieneClaveVelador = clavesDetalle.some(clave => 
// // // // // //             normalizar(clave).includes('velador')
// // // // // //         );

// // // // // //         const modelo = normalizar(detalle['modelo'] || detalle['modelo-de-velador'] || producto.modelo);
// // // // // //         const tipo = normalizar(detalle['tipo'] || detalle['tipo-de-producto'] || producto.tipo);
// // // // // //         const categoriaDetalle = normalizar(detalle['categoría'] || detalle['categoria']);

// // // // // //         if (modelo === 'velador' || tipo === 'velador' || categoriaDetalle === 'veladores') return false;
// // // // // //         if (modelo.includes('velador') && modelo.split(' ').length <= 3) return false;

// // // // // //         if (tieneClaveVelador) {
// // // // // //             if (categoria !== 'dormitorios' && categoria !== 'camas') {
// // // // // //                 return false;
// // // // // //             }
// // // // // //         }

// // // // // //         return true;
// // // // // //     };

// // // // // //     const mostrarColores = debeMostrarColores(producto);

// // // // // //     return(
// // // // // //         <div className={`product-page-images-global ${producto.stock === 0 ? 'sin-stock' : ''}`}>
// // // // // //             <span className="product-page-discount">-{descuento}%</span>

// // // // // //             {/* <div className='sin-stock-message'>Agotado</div> */}

// // // // // //             <div className="product-page-images-miniatures-container">
// // // // // //                 <ul className="product-page-images-miniatures">
// // // // // //                     {imagenes.map((img, i) => (
// // // // // //                         <li key={i} className={i === currentIndex ? 'active' : ''} onClick={() => navigateTo(i)}>
// // // // // //                             <LazyImage width={isSmallScreen ? 54 : 80} height={isSmallScreen ? 54 : 80} src={img} alt={producto.nombre}/>
// // // // // //                         </li>
// // // // // //                     ))}
// // // // // //                 </ul>
// // // // // //             </div>

// // // // // //             <div className="product-page-images-container">
// // // // // //                 <div className="product-page-images-content" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseLeave={(e) => { handleMouseUp(e) }}>
// // // // // //                     <ul className="product-page-images" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
// // // // // //                         {imagenes.map((src, i) => (
// // // // // //                             <li key={i}>
// // // // // //                                 <div className="zoom-wrapper" onMouseEnter={handleMouseEnter} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
// // // // // //                                     <img width={isSmallScreen ? 280 : 540} height={isSmallScreen ? 280 : 540} src={src} alt={producto.nombre}/>
// // // // // //                                     {zoomActive && i === currentIndex && (
// // // // // //                                         <div className="zoom-lens" style={{ backgroundImage: `url(${src})`, backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`}}/>
// // // // // //                                     )}
// // // // // //                                 </div>
// // // // // //                             </li>
// // // // // //                         ))}
// // // // // //                     </ul>

// // // // // //                     <button className="product-page-images-button product-page-images-button-1" onClick={handlePrev}>
// // // // // //                         <span className="material-symbols-outlined">chevron_left</span>
// // // // // //                     </button>

// // // // // //                     <button className="product-page-images-button product-page-images-button-2" onClick={handleNext}>
// // // // // //                         <span className="material-symbols-outlined">chevron_right</span>
// // // // // //                     </button>
// // // // // //                 </div>
// // // // // //             </div>

// // // // // //             {mostrarColores && (
// // // // // //                 <Colores onSelectColor={onSelectColor} producto={producto} selectedShipping={selectedShipping} shippingInfo={shippingInfo} quantity={quantity} precioFinal={precioFinal}/>
// // // // // //             )}
// // // // // //         </div>
// // // // // //     );
// // // // // // }

// // // // // // export default Imagenes;

// // // // // import { useState, useEffect } from 'react';

// // // // // import LazyImage from '../../../../Componentes/Plantillas/LazyImage';
// // // // // import Colores from '../Colores/Colores';

// // // // // import './Imagenes.css';

// // // // // // 👇 Extensiones soportadas, en orden de preferencia
// // // // // const EXTENSIONES_IMAGEN = ['webp', 'jpg', 'png', 'jfif'];

// // // // // // 👇 Convierte una ruta tipo "/ruta/foto.jpg" en su versión base sin extensión
// // // // // // y devuelve las candidatas en todos los formatos soportados.
// // // // // // Si la ruta ya incluye extensión conocida, se respeta como primera opción.
// // // // // function construirCandidatosImagen(ruta) {
// // // // //     if (!ruta || typeof ruta !== 'string') {
// // // // //         return { mainSrc: '', fallbackSrcs: [] };
// // // // //     }

// // // // //     // Detecta si ya tiene extensión soportada
// // // // //     const match = ruta.match(/\.(webp|jpg|jpeg|png|jfif)$/i);

// // // // //     if (match) {
// // // // //         const extActual = match[1].toLowerCase();
// // // // //         const baseSinExt = ruta.slice(0, ruta.length - match[0].length);

// // // // //         // Pone primero la extensión original y luego el resto como fallback
// // // // //         const orden = [extActual, ...EXTENSIONES_IMAGEN.filter(e => e !== extActual)];

// // // // //         const candidatos = orden.map((ext) => `${baseSinExt}.${ext}`);

// // // // //         return {
// // // // //             mainSrc: candidatos[0],
// // // // //             fallbackSrcs: candidatos.slice(1),
// // // // //         };
// // // // //     }

// // // // //     // Si no tiene extensión, genera todas las variantes
// // // // //     const candidatos = EXTENSIONES_IMAGEN.map((ext) => `${ruta}.${ext}`);

// // // // //     return {
// // // // //         mainSrc: candidatos[0],
// // // // //         fallbackSrcs: candidatos.slice(1),
// // // // //     };
// // // // // }

// // // // // function Imagenes({ imagenes, producto, onSelectColor, skusOfertas, selectedShipping, shippingInfo, quantity, precioFinal }) {
// // // // //     const estaEnOfertas = skusOfertas.includes(producto.sku);
// // // // //     const [currentIndex, setCurrentIndex] = useState(0);
// // // // //     const [isDragging, setIsDragging] = useState(false);
// // // // //     const [dragStartX, setDragStartX] = useState(0);

// // // // //     const [zoomActive, setZoomActive] = useState(false);
// // // // //     const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });

// // // // //     const navigateTo = (idx) => {
// // // // //         if (idx >= 0 && idx < imagenes.length) setCurrentIndex(idx);
// // // // //     };
// // // // //     const handlePrev = () => navigateTo((currentIndex - 1 + imagenes.length) % imagenes.length);
// // // // //     const handleNext = () => navigateTo((currentIndex + 1) % imagenes.length);

// // // // //     const handleMouseDown = (e) => { setDragStartX(e.clientX); setIsDragging(true); };
// // // // //     const handleMouseUp = (e) => {
// // // // //         if (!isDragging) return;
// // // // //         const deltaX = e.clientX - dragStartX;
// // // // //         setIsDragging(false);
// // // // //         Math.abs(deltaX) > 50 && (deltaX > 0 ? handlePrev() : handleNext());
// // // // //     };

// // // // //     const handleMouseEnter = () => setZoomActive(true);
// // // // //     const handleMouseLeave = () => setZoomActive(false);
// // // // //     const handleMouseMove = (e) => {
// // // // //         const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
// // // // //         const x = ((e.pageX - left) / width) * 100;
// // // // //         const y = ((e.pageY - top) / height) * 100;
// // // // //         setZoomPos({ x, y });
// // // // //     };

// // // // //     const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);

// // // // //     useEffect(() => {
// // // // //         const handleResize = () => {
// // // // //             setIsSmallScreen(window.innerWidth < 600);
// // // // //         };

// // // // //         window.addEventListener('resize', handleResize);

// // // // //         return () => {
// // // // //             window.removeEventListener('resize', handleResize);
// // // // //         };
// // // // //     }, []);

// // // // //     const descuento = Math.round(((producto.precioNormal - producto.precioVenta) * 100) / producto.precioNormal);

// // // // //     const debeMostrarColores = (producto) => {
// // // // //         if (!producto) return true;
// // // // //         const detalles = producto['detalles-del-producto'];
// // // // //         if (!Array.isArray(detalles) || detalles.length === 0) return true;
// // // // //         const detalle = detalles[0];

// // // // //         const normalizar = (str) => {
// // // // //             if (!str) return '';
// // // // //             return String(str)
// // // // //                 .toLowerCase()
// // // // //                 .normalize('NFD')
// // // // //                 .replace(/[\u0300-\u036f]/g, '')
// // // // //                 .trim();
// // // // //         };

// // // // //         const categoria = normalizar(detalle['categoría'] || detalle['categoria'] || producto.categoria);
// // // // //         if (categoria === 'colchones') return false;

// // // // //         const linea = normalizar(detalle['línea'] || detalle['linea'] || producto.linea);
// // // // //         const lineasExcluidas = ['clasica', 'clasicas', 'clasico', 'clasicos'];
// // // // //         if (lineasExcluidas.includes(linea)) return false;

// // // // //         const clavesDetalle = Object.keys(detalle);

// // // // //         const tieneClaveVelador = clavesDetalle.some(clave =>
// // // // //             normalizar(clave).includes('velador')
// // // // //         );

// // // // //         const modelo = normalizar(detalle['modelo'] || detalle['modelo-de-velador'] || producto.modelo);
// // // // //         const tipo = normalizar(detalle['tipo'] || detalle['tipo-de-producto'] || producto.tipo);
// // // // //         const categoriaDetalle = normalizar(detalle['categoría'] || detalle['categoria']);

// // // // //         if (modelo === 'velador' || tipo === 'velador' || categoriaDetalle === 'veladores') return false;
// // // // //         if (modelo.includes('velador') && modelo.split(' ').length <= 3) return false;

// // // // //         if (tieneClaveVelador) {
// // // // //             if (categoria !== 'dormitorios' && categoria !== 'camas') {
// // // // //                 return false;
// // // // //             }
// // // // //         }

// // // // //         return true;
// // // // //     };

// // // // //     const mostrarColores = debeMostrarColores(producto);

// // // // //     // 👇 Precalcula las candidatas para cada imagen (mainSrc + fallbacks)
// // // // //     //    y las usa tanto en miniaturas como en la vista principal.
// // // // //     const imagenesResueltas = imagenes.map((ruta) => construirCandidatosImagen(ruta));

// // // // //     return (
// // // // //         <div className={`product-page-images-global ${producto.stock === 0 ? 'sin-stock' : ''}`}>
// // // // //             <span className="product-page-discount">-{descuento}%</span>

// // // // //             {/* <div className='sin-stock-message'>Agotado</div> */}

// // // // //             <div className="product-page-images-miniatures-container">
// // // // //                 <ul className="product-page-images-miniatures">
// // // // //                     {imagenesResueltas.map((imgData, i) => (
// // // // //                         <li key={i} className={i === currentIndex ? 'active' : ''} onClick={() => navigateTo(i)}>
// // // // //                             <LazyImage
// // // // //                                 width={isSmallScreen ? 54 : 80}
// // // // //                                 height={isSmallScreen ? 54 : 80}
// // // // //                                 src={imgData.mainSrc}
// // // // //                                 srcs={imgData.fallbackSrcs}
// // // // //                                 alt={producto.nombre}
// // // // //                             />
// // // // //                         </li>
// // // // //                     ))}
// // // // //                 </ul>
// // // // //             </div>

// // // // //             <div className="product-page-images-container">
// // // // //                 <div
// // // // //                     className="product-page-images-content"
// // // // //                     onMouseDown={handleMouseDown}
// // // // //                     onMouseUp={handleMouseUp}
// // // // //                     onMouseLeave={(e) => { handleMouseUp(e); }}
// // // // //                 >
// // // // //                     <ul className="product-page-images" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
// // // // //                         {imagenesResueltas.map((imgData, i) => (
// // // // //                             <li key={i}>
// // // // //                                 <div
// // // // //                                     className="zoom-wrapper"
// // // // //                                     onMouseEnter={handleMouseEnter}
// // // // //                                     onMouseMove={handleMouseMove}
// // // // //                                     onMouseLeave={handleMouseLeave}
// // // // //                                 >
// // // // //                                     <img
// // // // //                                         width={isSmallScreen ? 280 : 540}
// // // // //                                         height={isSmallScreen ? 280 : 540}
// // // // //                                         src={imgData.mainSrc}
// // // // //                                         srcSet={[
// // // // //                                             imgData.mainSrc,
// // // // //                                             ...imgData.fallbackSrcs,
// // // // //                                         ].join(', ')}
// // // // //                                         alt={producto.nombre}
// // // // //                                     />
// // // // //                                     {zoomActive && i === currentIndex && (
// // // // //                                         <div
// // // // //                                             className="zoom-lens"
// // // // //                                             style={{
// // // // //                                                 backgroundImage: `url(${imgData.mainSrc})`,
// // // // //                                                 backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
// // // // //                                             }}
// // // // //                                         />
// // // // //                                     )}
// // // // //                                 </div>
// // // // //                             </li>
// // // // //                         ))}
// // // // //                     </ul>

// // // // //                     <button className="product-page-images-button product-page-images-button-1" onClick={handlePrev}>
// // // // //                         <span className="material-symbols-outlined">chevron_left</span>
// // // // //                     </button>

// // // // //                     <button className="product-page-images-button product-page-images-button-2" onClick={handleNext}>
// // // // //                         <span className="material-symbols-outlined">chevron_right</span>
// // // // //                     </button>
// // // // //                 </div>
// // // // //             </div>

// // // // //             {mostrarColores && (
// // // // //                 <Colores
// // // // //                     onSelectColor={onSelectColor}
// // // // //                     producto={producto}
// // // // //                     selectedShipping={selectedShipping}
// // // // //                     shippingInfo={shippingInfo}
// // // // //                     quantity={quantity}
// // // // //                     precioFinal={precioFinal}
// // // // //                 />
// // // // //             )}
// // // // //         </div>
// // // // //     );
// // // // // }

// // // // // export default Imagenes;

// // // // import { useState, useEffect } from 'react';

// // // // import LazyImage from '../../../../Componentes/Plantillas/LazyImage';
// // // // import Colores from '../Colores/Colores';

// // // // import './Imagenes.css';

// // // // // 👇 Extensiones soportadas, en orden de preferencia
// // // // const EXTENSIONES_IMAGEN = ['webp', 'jpg', 'png', 'jfif'];

// // // // // 👇 Extrae un string de ruta sin importar si viene como string u objeto
// // // // function extraerRuta(img) {
// // // //     if (!img) return '';
// // // //     if (typeof img === 'string') return img;
// // // //     if (typeof img === 'object') {
// // // //         return (
// // // //             img.src ||
// // // //             img.url ||
// // // //             img.ruta ||
// // // //             img.imagen ||
// // // //             img.foto ||
// // // //             img.path ||
// // // //             ''
// // // //         );
// // // //     }
// // // //     return '';
// // // // }

// // // // // 👇 Convierte una ruta en sus candidatas en todos los formatos soportados.
// // // // // Si ya incluye extensión conocida, la respeta como primera opción.
// // // // function construirCandidatosImagen(rutaRaw) {
// // // //     const ruta = extraerRuta(rutaRaw);

// // // //     if (!ruta || typeof ruta !== 'string') {
// // // //         return { mainSrc: '', fallbackSrcs: [] };
// // // //     }

// // // //     const match = ruta.match(/\.(webp|jpg|jpeg|png|jfif)$/i);

// // // //     if (match) {
// // // //         const extActual = match[1].toLowerCase();
// // // //         const baseSinExt = ruta.slice(0, ruta.length - match[0].length);

// // // //         const orden = [
// // // //             extActual,
// // // //             ...EXTENSIONES_IMAGEN.filter((e) => e !== extActual),
// // // //         ];

// // // //         const candidatos = orden.map((ext) => `${baseSinExt}.${ext}`);

// // // //         return {
// // // //             mainSrc: candidatos[0],
// // // //             fallbackSrcs: candidatos.slice(1),
// // // //         };
// // // //     }

// // // //     const candidatos = EXTENSIONES_IMAGEN.map((ext) => `${ruta}.${ext}`);

// // // //     return {
// // // //         mainSrc: candidatos[0],
// // // //         fallbackSrcs: candidatos.slice(1),
// // // //     };
// // // // }

// // // // function Imagenes({
// // // //     imagenes,
// // // //     producto,
// // // //     onSelectColor,
// // // //     skusOfertas,
// // // //     selectedShipping,
// // // //     shippingInfo,
// // // //     quantity,
// // // //     precioFinal,
// // // // }) {
// // // //     const estaEnOfertas = skusOfertas.includes(producto.sku);
// // // //     const [currentIndex, setCurrentIndex] = useState(0);
// // // //     const [isDragging, setIsDragging] = useState(false);
// // // //     const [dragStartX, setDragStartX] = useState(0);

// // // //     const [zoomActive, setZoomActive] = useState(false);
// // // //     const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });

// // // //     // 👇 Guardamos la URL real que cargó cada imagen (para el zoom-lens)
// // // //     const [urlsCargadas, setUrlsCargadas] = useState({});

// // // //     const navigateTo = (idx) => {
// // // //         if (idx >= 0 && idx < imagenes.length) setCurrentIndex(idx);
// // // //     };
// // // //     const handlePrev = () =>
// // // //         navigateTo((currentIndex - 1 + imagenes.length) % imagenes.length);
// // // //     const handleNext = () =>
// // // //         navigateTo((currentIndex + 1) % imagenes.length);

// // // //     const handleMouseDown = (e) => {
// // // //         setDragStartX(e.clientX);
// // // //         setIsDragging(true);
// // // //     };
// // // //     const handleMouseUp = (e) => {
// // // //         if (!isDragging) return;
// // // //         const deltaX = e.clientX - dragStartX;
// // // //         setIsDragging(false);
// // // //         if (Math.abs(deltaX) > 50) {
// // // //             deltaX > 0 ? handlePrev() : handleNext();
// // // //         }
// // // //     };

// // // //     const handleMouseEnter = () => setZoomActive(true);
// // // //     const handleMouseLeave = () => setZoomActive(false);
// // // //     const handleMouseMove = (e) => {
// // // //         const { left, top, width, height } =
// // // //             e.currentTarget.getBoundingClientRect();
// // // //         const x = ((e.pageX - left) / width) * 100;
// // // //         const y = ((e.pageY - top) / height) * 100;
// // // //         setZoomPos({ x, y });
// // // //     };

// // // //     const [isSmallScreen, setIsSmallScreen] = useState(
// // // //         window.innerWidth < 600
// // // //     );

// // // //     useEffect(() => {
// // // //         const handleResize = () => {
// // // //             setIsSmallScreen(window.innerWidth < 600);
// // // //         };

// // // //         window.addEventListener('resize', handleResize);
// // // //         return () => {
// // // //             window.removeEventListener('resize', handleResize);
// // // //         };
// // // //     }, []);

// // // //     const descuento = Math.round(
// // // //         ((producto.precioNormal - producto.precioVenta) * 100) /
// // // //             producto.precioNormal
// // // //     );

// // // //     const debeMostrarColores = (producto) => {
// // // //         if (!producto) return true;
// // // //         const detalles = producto['detalles-del-producto'];
// // // //         if (!Array.isArray(detalles) || detalles.length === 0) return true;
// // // //         const detalle = detalles[0];

// // // //         const normalizar = (str) => {
// // // //             if (!str) return '';
// // // //             return String(str)
// // // //                 .toLowerCase()
// // // //                 .normalize('NFD')
// // // //                 .replace(/[\u0300-\u036f]/g, '')
// // // //                 .trim();
// // // //         };

// // // //         const categoria = normalizar(
// // // //             detalle['categoría'] || detalle['categoria'] || producto.categoria
// // // //         );
// // // //         if (categoria === 'colchones') return false;

// // // //         const linea = normalizar(
// // // //             detalle['línea'] || detalle['linea'] || producto.linea
// // // //         );
// // // //         const lineasExcluidas = ['clasica', 'clasicas', 'clasico', 'clasicos'];
// // // //         if (lineasExcluidas.includes(linea)) return false;

// // // //         const clavesDetalle = Object.keys(detalle);

// // // //         const tieneClaveVelador = clavesDetalle.some((clave) =>
// // // //             normalizar(clave).includes('velador')
// // // //         );

// // // //         const modelo = normalizar(
// // // //             detalle['modelo'] || detalle['modelo-de-velador'] || producto.modelo
// // // //         );
// // // //         const tipo = normalizar(
// // // //             detalle['tipo'] || detalle['tipo-de-producto'] || producto.tipo
// // // //         );
// // // //         const categoriaDetalle = normalizar(
// // // //             detalle['categoría'] || detalle['categoria']
// // // //         );

// // // //         if (
// // // //             modelo === 'velador' ||
// // // //             tipo === 'velador' ||
// // // //             categoriaDetalle === 'veladores'
// // // //         )
// // // //             return false;
// // // //         if (modelo.includes('velador') && modelo.split(' ').length <= 3)
// // // //             return false;

// // // //         if (tieneClaveVelador) {
// // // //             if (categoria !== 'dormitorios' && categoria !== 'camas') {
// // // //                 return false;
// // // //             }
// // // //         }

// // // //         return true;
// // // //     };

// // // //     const mostrarColores = debeMostrarColores(producto);

// // // //     // 👇 Precalcula las candidatas para cada imagen
// // // //     const imagenesResueltas = imagenes.map((ruta) =>
// // // //         construirCandidatosImagen(ruta)
// // // //     );

// // // //     return (
// // // //         <div
// // // //             className={`product-page-images-global ${
// // // //                 producto.stock === 0 ? 'sin-stock' : ''
// // // //             }`}
// // // //         >
// // // //             <span className="product-page-discount">-{descuento}%</span>

// // // //             <div className="product-page-images-miniatures-container">
// // // //                 <ul className="product-page-images-miniatures">
// // // //                     {imagenesResueltas.map((imgData, i) => (
// // // //                         <li
// // // //                             key={i}
// // // //                             className={i === currentIndex ? 'active' : ''}
// // // //                             onClick={() => navigateTo(i)}
// // // //                         >
// // // //                             <LazyImage
// // // //                                 width={isSmallScreen ? 54 : 80}
// // // //                                 height={isSmallScreen ? 54 : 80}
// // // //                                 src={imgData.mainSrc}
// // // //                                 srcs={imgData.fallbackSrcs}
// // // //                                 alt={producto.nombre}
// // // //                                 onLoad={(urlCargada) =>
// // // //                                     setUrlsCargadas((prev) => ({
// // // //                                         ...prev,
// // // //                                         [i]: urlCargada,
// // // //                                     }))
// // // //                                 }
// // // //                             />
// // // //                         </li>
// // // //                     ))}
// // // //                 </ul>
// // // //             </div>

// // // //             <div className="product-page-images-container">
// // // //                 <div
// // // //                     className="product-page-images-content"
// // // //                     onMouseDown={handleMouseDown}
// // // //                     onMouseUp={handleMouseUp}
// // // //                     onMouseLeave={(e) => {
// // // //                         handleMouseUp(e);
// // // //                     }}
// // // //                 >
// // // //                     <ul
// // // //                         className="product-page-images"
// // // //                         style={{
// // // //                             transform: `translateX(-${currentIndex * 100}%)`,
// // // //                         }}
// // // //                     >
// // // //                         {imagenesResueltas.map((imgData, i) => {
// // // //                             // 👇 URL real que cargó (para el zoom-lens)
// // // //                             const urlReal =
// // // //                                 urlsCargadas[i] || imgData.mainSrc;

// // // //                             return (
// // // //                                 <li key={i}>
// // // //                                     <div
// // // //                                         className="zoom-wrapper"
// // // //                                         onMouseEnter={handleMouseEnter}
// // // //                                         onMouseMove={handleMouseMove}
// // // //                                         onMouseLeave={handleMouseLeave}
// // // //                                     >
// // // //                                         <LazyImage
// // // //                                             width={
// // // //                                                 isSmallScreen ? 280 : 540
// // // //                                             }
// // // //                                             height={
// // // //                                                 isSmallScreen ? 280 : 540
// // // //                                             }
// // // //                                             src={imgData.mainSrc}
// // // //                                             srcs={imgData.fallbackSrcs}
// // // //                                             alt={producto.nombre}
// // // //                                             className="product-main-image"
// // // //                                             fetchPriority="high"
// // // //                                             onLoad={(urlCargada) =>
// // // //                                                 setUrlsCargadas((prev) => ({
// // // //                                                     ...prev,
// // // //                                                     [i]: urlCargada,
// // // //                                                 }))
// // // //                                             }
// // // //                                         />

// // // //                                         {zoomActive && i === currentIndex && (
// // // //                                             <div
// // // //                                                 className="zoom-lens"
// // // //                                                 style={{
// // // //                                                     backgroundImage: `url(${urlReal})`,
// // // //                                                     backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
// // // //                                                 }}
// // // //                                             />
// // // //                                         )}
// // // //                                     </div>
// // // //                                 </li>
// // // //                             );
// // // //                         })}
// // // //                     </ul>

// // // //                     <button
// // // //                         className="product-page-images-button product-page-images-button-1"
// // // //                         onClick={handlePrev}
// // // //                     >
// // // //                         <span className="material-symbols-outlined">
// // // //                             chevron_left
// // // //                         </span>
// // // //                     </button>

// // // //                     <button
// // // //                         className="product-page-images-button product-page-images-button-2"
// // // //                         onClick={handleNext}
// // // //                     >
// // // //                         <span className="material-symbols-outlined">
// // // //                             chevron_right
// // // //                         </span>
// // // //                     </button>
// // // //                 </div>
// // // //             </div>

// // // //             {mostrarColores && (
// // // //                 <Colores
// // // //                     onSelectColor={onSelectColor}
// // // //                     producto={producto}
// // // //                     selectedShipping={selectedShipping}
// // // //                     shippingInfo={shippingInfo}
// // // //                     quantity={quantity}
// // // //                     precioFinal={precioFinal}
// // // //                 />
// // // //             )}
// // // //         </div>
// // // //     );
// // // // }

// // // // export default Imagenes;

// // // import { useState, useEffect, useMemo } from 'react';

// // // import LazyImage from '../../../../Componentes/Plantillas/LazyImage';
// // // import Colores from '../Colores/Colores';

// // // import './Imagenes.css';

// // // // 👇 Orden ajustado: .jpg primero porque tu servidor usa .jpg
// // // //    (si algún día migras a .webp, cambia el orden)
// // // const EXTENSIONES_IMAGEN = ['jpg', 'webp', 'png', 'jfif'];

// // // // 👇 Extrae un string de ruta sin importar si viene como string u objeto
// // // function extraerRuta(img) {
// // //     if (!img) return '';
// // //     if (typeof img === 'string') return img;
// // //     if (typeof img === 'object') {
// // //         return (
// // //             img.src ||
// // //             img.url ||
// // //             img.ruta ||
// // //             img.imagen ||
// // //             img.foto ||
// // //             img.path ||
// // //             ''
// // //         );
// // //     }
// // //     return '';
// // // }

// // // function construirCandidatosImagen(rutaRaw) {
// // //     const ruta = extraerRuta(rutaRaw);

// // //     if (!ruta || typeof ruta !== 'string') {
// // //         return { mainSrc: '', fallbackSrcs: [] };
// // //     }

// // //     const match = ruta.match(/\.(webp|jpg|jpeg|png|jfif)$/i);

// // //     if (match) {
// // //         const extActual = match[1].toLowerCase();
// // //         const baseSinExt = ruta.slice(0, ruta.length - match[0].length);
// // //         const orden = [
// // //             extActual,
// // //             ...EXTENSIONES_IMAGEN.filter((e) => e !== extActual),
// // //         ];
// // //         const candidatos = orden.map((ext) => `${baseSinExt}.${ext}`);
// // //         return {
// // //             mainSrc: candidatos[0],
// // //             fallbackSrcs: candidatos.slice(1),
// // //         };
// // //     }

// // //     const candidatos = EXTENSIONES_IMAGEN.map((ext) => `${ruta}.${ext}`);
// // //     return {
// // //         mainSrc: candidatos[0],
// // //         fallbackSrcs: candidatos.slice(1),
// // //     };
// // // }

// // // function Imagenes({
// // //     imagenes,
// // //     producto,
// // //     onSelectColor,
// // //     skusOfertas,
// // //     selectedShipping,
// // //     shippingInfo,
// // //     quantity,
// // //     precioFinal,
// // // }) {
// // //     const estaEnOfertas = skusOfertas?.includes(producto.sku) ?? false;
// // //     const [currentIndex, setCurrentIndex] = useState(0);
// // //     const [isDragging, setIsDragging] = useState(false);
// // //     const [dragStartX, setDragStartX] = useState(0);

// // //     const [zoomActive, setZoomActive] = useState(false);
// // //     const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
// // //     const [urlsCargadas, setUrlsCargadas] = useState({});

// // //     // 👇 Normaliza `imagenes` a un array seguro de strings
// // //     const imagenesNormalizadas = useMemo(() => {
// // //         let lista = imagenes;

// // //         // Si no es array, intenta convertirlo
// // //         if (!Array.isArray(lista)) {
// // //             if (typeof lista === 'string') {
// // //                 lista = [lista];
// // //             } else if (lista && typeof lista === 'object') {
// // //                 // Si es un objeto tipo { fotos: [...] } o similar
// // //                 lista = lista.fotos || lista.imagenes || lista.src || [];
// // //                 if (!Array.isArray(lista)) lista = [lista];
// // //             } else {
// // //                 lista = [];
// // //             }
// // //         }

// // //         // Extrae solo strings válidos
// // //         const resultado = lista
// // //             .map((img) => extraerRuta(img))
// // //             .filter((ruta) => typeof ruta === 'string' && ruta.trim() !== '');

// // //         if (process.env.NODE_ENV === 'development') {
// // //             console.log('🔎 [Imagenes] entrada:', imagenes);
// // //             console.log('🔎 [Imagenes] normalizadas:', resultado);
// // //         }

// // //         return resultado;
// // //     }, [imagenes]);

// // //     const navigateTo = (idx) => {
// // //         if (idx >= 0 && idx < imagenesNormalizadas.length)
// // //             setCurrentIndex(idx);
// // //     };
// // //     const handlePrev = () =>
// // //         navigateTo(
// // //             (currentIndex - 1 + imagenesNormalizadas.length) %
// // //                 imagenesNormalizadas.length
// // //         );
// // //     const handleNext = () =>
// // //         navigateTo((currentIndex + 1) % imagenesNormalizadas.length);

// // //     const handleMouseDown = (e) => {
// // //         setDragStartX(e.clientX);
// // //         setIsDragging(true);
// // //     };
// // //     const handleMouseUp = (e) => {
// // //         if (!isDragging) return;
// // //         const deltaX = e.clientX - dragStartX;
// // //         setIsDragging(false);
// // //         if (Math.abs(deltaX) > 50) {
// // //             deltaX > 0 ? handlePrev() : handleNext();
// // //         }
// // //     };

// // //     const handleMouseEnter = () => setZoomActive(true);
// // //     const handleMouseLeave = () => setZoomActive(false);
// // //     const handleMouseMove = (e) => {
// // //         const { left, top, width, height } =
// // //             e.currentTarget.getBoundingClientRect();
// // //         const x = ((e.pageX - left) / width) * 100;
// // //         const y = ((e.pageY - top) / height) * 100;
// // //         setZoomPos({ x, y });
// // //     };

// // //     const [isSmallScreen, setIsSmallScreen] = useState(
// // //         window.innerWidth < 600
// // //     );

// // //     useEffect(() => {
// // //         const handleResize = () => {
// // //             setIsSmallScreen(window.innerWidth < 600);
// // //         };
// // //         window.addEventListener('resize', handleResize);
// // //         return () => {
// // //             window.removeEventListener('resize', handleResize);
// // //         };
// // //     }, []);

// // //     const descuento = Math.round(
// // //         ((producto.precioNormal - producto.precioVenta) * 100) /
// // //             producto.precioNormal
// // //     );

// // //     const debeMostrarColores = (producto) => {
// // //         if (!producto) return true;
// // //         const detalles = producto['detalles-del-producto'];
// // //         if (!Array.isArray(detalles) || detalles.length === 0) return true;
// // //         const detalle = detalles[0];

// // //         const normalizar = (str) => {
// // //             if (!str) return '';
// // //             return String(str)
// // //                 .toLowerCase()
// // //                 .normalize('NFD')
// // //                 .replace(/[\u0300-\u036f]/g, '')
// // //                 .trim();
// // //         };

// // //         const categoria = normalizar(
// // //             detalle['categoría'] || detalle['categoria'] || producto.categoria
// // //         );
// // //         if (categoria === 'colchones') return false;

// // //         const linea = normalizar(
// // //             detalle['línea'] || detalle['linea'] || producto.linea
// // //         );
// // //         const lineasExcluidas = ['clasica', 'clasicas', 'clasico', 'clasicos'];
// // //         if (lineasExcluidas.includes(linea)) return false;

// // //         const clavesDetalle = Object.keys(detalle);
// // //         const tieneClaveVelador = clavesDetalle.some((clave) =>
// // //             normalizar(clave).includes('velador')
// // //         );

// // //         const modelo = normalizar(
// // //             detalle['modelo'] || detalle['modelo-de-velador'] || producto.modelo
// // //         );
// // //         const tipo = normalizar(
// // //             detalle['tipo'] || detalle['tipo-de-producto'] || producto.tipo
// // //         );
// // //         const categoriaDetalle = normalizar(
// // //             detalle['categoría'] || detalle['categoria']
// // //         );

// // //         if (
// // //             modelo === 'velador' ||
// // //             tipo === 'velador' ||
// // //             categoriaDetalle === 'veladores'
// // //         )
// // //             return false;
// // //         if (modelo.includes('velador') && modelo.split(' ').length <= 3)
// // //             return false;

// // //         if (tieneClaveVelador) {
// // //             if (categoria !== 'dormitorios' && categoria !== 'camas') {
// // //                 return false;
// // //             }
// // //         }

// // //         return true;
// // //     };

// // //     const mostrarColores = debeMostrarColores(producto);

// // //     const imagenesResueltas = useMemo(
// // //         () => imagenesNormalizadas.map((ruta) => construirCandidatosImagen(ruta)),
// // //         [imagenesNormalizadas]
// // //     );

// // //     // 👇 Si no hay imágenes, no rompas el layout
// // //     if (imagenesResueltas.length === 0) {
// // //         return (
// // //             <div className="product-page-images-global">
// // //                 <span className="product-page-discount">-{descuento}%</span>
// // //                 <div className="product-page-images-container">
// // //                     <div className="product-page-images-content">
// // //                         <div
// // //                             style={{
// // //                                 width: '100%',
// // //                                 aspectRatio: '1 / 1',
// // //                                 background: '#f5f5f5',
// // //                                 display: 'flex',
// // //                                 alignItems: 'center',
// // //                                 justifyContent: 'center',
// // //                                 color: '#888',
// // //                             }}
// // //                         >
// // //                             Sin imágenes
// // //                         </div>
// // //                     </div>
// // //                 </div>
// // //             </div>
// // //         );
// // //     }

// // //     return (
// // //         <div
// // //             className={`product-page-images-global ${
// // //                 producto.stock === 0 ? 'sin-stock' : ''
// // //             }`}
// // //         >
// // //             <span className="product-page-discount">-{descuento}%</span>

// // //             <div className="product-page-images-miniatures-container">
// // //                 <ul className="product-page-images-miniatures">
// // //                     {imagenesResueltas.map((imgData, i) => (
// // //                         <li
// // //                             key={i}
// // //                             className={i === currentIndex ? 'active' : ''}
// // //                             onClick={() => navigateTo(i)}
// // //                         >
// // //                             <LazyImage
// // //                                 width={isSmallScreen ? 54 : 80}
// // //                                 height={isSmallScreen ? 54 : 80}
// // //                                 src={imgData.mainSrc}
// // //                                 srcs={imgData.fallbackSrcs}
// // //                                 alt={producto.nombre}
// // //                                 onLoad={(urlCargada) =>
// // //                                     setUrlsCargadas((prev) => ({
// // //                                         ...prev,
// // //                                         [i]: urlCargada,
// // //                                     }))
// // //                                 }
// // //                             />
// // //                         </li>
// // //                     ))}
// // //                 </ul>
// // //             </div>

// // //             <div className="product-page-images-container">
// // //                 <div
// // //                     className="product-page-images-content"
// // //                     onMouseDown={handleMouseDown}
// // //                     onMouseUp={handleMouseUp}
// // //                     onMouseLeave={(e) => {
// // //                         handleMouseUp(e);
// // //                     }}
// // //                 >
// // //                     <ul
// // //                         className="product-page-images"
// // //                         style={{
// // //                             transform: `translateX(-${currentIndex * 100}%)`,
// // //                         }}
// // //                     >
// // //                         {imagenesResueltas.map((imgData, i) => {
// // //                             const urlReal = urlsCargadas[i] || imgData.mainSrc;
// // //                             return (
// // //                                 <li key={i}>
// // //                                     <div
// // //                                         className="zoom-wrapper"
// // //                                         onMouseEnter={handleMouseEnter}
// // //                                         onMouseMove={handleMouseMove}
// // //                                         onMouseLeave={handleMouseLeave}
// // //                                     >
// // //                                         <LazyImage
// // //                                             width={
// // //                                                 isSmallScreen ? 280 : 540
// // //                                             }
// // //                                             height={
// // //                                                 isSmallScreen ? 280 : 540
// // //                                             }
// // //                                             src={imgData.mainSrc}
// // //                                             srcs={imgData.fallbackSrcs}
// // //                                             alt={producto.nombre}
// // //                                             className="product-main-image"
// // //                                             fetchPriority="high"
// // //                                             onLoad={(urlCargada) =>
// // //                                                 setUrlsCargadas((prev) => ({
// // //                                                     ...prev,
// // //                                                     [i]: urlCargada,
// // //                                                 }))
// // //                                             }
// // //                                         />

// // //                                         {zoomActive && i === currentIndex && (
// // //                                             <div
// // //                                                 className="zoom-lens"
// // //                                                 style={{
// // //                                                     backgroundImage: `url(${urlReal})`,
// // //                                                     backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
// // //                                                 }}
// // //                                             />
// // //                                         )}
// // //                                     </div>
// // //                                 </li>
// // //                             );
// // //                         })}
// // //                     </ul>

// // //                     <button
// // //                         className="product-page-images-button product-page-images-button-1"
// // //                         onClick={handlePrev}
// // //                     >
// // //                         <span className="material-symbols-outlined">
// // //                             chevron_left
// // //                         </span>
// // //                     </button>

// // //                     <button
// // //                         className="product-page-images-button product-page-images-button-2"
// // //                         onClick={handleNext}
// // //                     >
// // //                         <span className="material-symbols-outlined">
// // //                             chevron_right
// // //                         </span>
// // //                     </button>
// // //                 </div>
// // //             </div>

// // //             {mostrarColores && (
// // //                 <Colores
// // //                     onSelectColor={onSelectColor}
// // //                     producto={producto}
// // //                     selectedShipping={selectedShipping}
// // //                     shippingInfo={shippingInfo}
// // //                     quantity={quantity}
// // //                     precioFinal={precioFinal}
// // //                 />
// // //             )}
// // //         </div>
// // //     );
// // // }

// // // export default Imagenes;

// // import { useState, useEffect, useMemo, useRef } from 'react';

// // import LazyImage from '../../../../Componentes/Plantillas/LazyImage';
// // import Colores from '../Colores/Colores';

// // import './Imagenes.css';

// // // 👇 Orden ajustado: .jpg primero porque tu servidor usa .jpg
// // const EXTENSIONES_IMAGEN = ['jpg', 'webp', 'png', 'jfif'];

// // function extraerRuta(img) {
// //     if (!img) return '';
// //     if (typeof img === 'string') return img;
// //     if (typeof img === 'object') {
// //         return (
// //             img.src ||
// //             img.url ||
// //             img.ruta ||
// //             img.imagen ||
// //             img.foto ||
// //             img.path ||
// //             ''
// //         );
// //     }
// //     return '';
// // }

// // function construirCandidatosImagen(rutaRaw) {
// //     const ruta = extraerRuta(rutaRaw);

// //     if (!ruta || typeof ruta !== 'string') {
// //         return { mainSrc: '', fallbackSrcs: [] };
// //     }

// //     const match = ruta.match(/\.(webp|jpg|jpeg|png|jfif)$/i);

// //     if (match) {
// //         const extActual = match[1].toLowerCase();
// //         const baseSinExt = ruta.slice(0, ruta.length - match[0].length);
// //         const orden = [
// //             extActual,
// //             ...EXTENSIONES_IMAGEN.filter((e) => e !== extActual),
// //         ];
// //         const candidatos = orden.map((ext) => `${baseSinExt}.${ext}`);
// //         return {
// //             mainSrc: candidatos[0],
// //             fallbackSrcs: candidatos.slice(1),
// //         };
// //     }

// //     const candidatos = EXTENSIONES_IMAGEN.map((ext) => `${ruta}.${ext}`);
// //     return {
// //         mainSrc: candidatos[0],
// //         fallbackSrcs: candidatos.slice(1),
// //     };
// // }

// // function Imagenes({
// //     imagenes,
// //     producto,
// //     onSelectColor,
// //     skusOfertas,
// //     selectedShipping,
// //     shippingInfo,
// //     quantity,
// //     precioFinal,
// // }) {
// //     const estaEnOfertas = skusOfertas?.includes(producto.sku) ?? false;
// //     const [currentIndex, setCurrentIndex] = useState(0);
// //     const [isDragging, setIsDragging] = useState(false);
// //     const [dragStartX, setDragStartX] = useState(0);

// //     const [zoomActive, setZoomActive] = useState(false);
// //     const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
// //     const [urlsCargadas, setUrlsCargadas] = useState({});

// //     // 👇 Ref al contenedor del zoom para calcular posición correctamente
// //     const zoomWrapperRef = useRef(null);

// //     // 👇 Normaliza `imagenes` a un array seguro de strings
// //     const imagenesNormalizadas = useMemo(() => {
// //         let lista = imagenes;

// //         if (!Array.isArray(lista)) {
// //             if (typeof lista === 'string') {
// //                 lista = [lista];
// //             } else if (lista && typeof lista === 'object') {
// //                 lista = lista.fotos || lista.imagenes || lista.src || [];
// //                 if (!Array.isArray(lista)) lista = [lista];
// //             } else {
// //                 lista = [];
// //             }
// //         }

// //         const resultado = lista
// //             .map((img) => extraerRuta(img))
// //             .filter((ruta) => typeof ruta === 'string' && ruta.trim() !== '');

// //         if (process.env.NODE_ENV === 'development') {
// //             console.log('🔎 [Imagenes] entrada:', imagenes);
// //             console.log('🔎 [Imagenes] normalizadas:', resultado);
// //         }

// //         return resultado;
// //     }, [imagenes]);

// //     const navigateTo = (idx) => {
// //         if (idx >= 0 && idx < imagenesNormalizadas.length)
// //             setCurrentIndex(idx);
// //     };
// //     const handlePrev = () =>
// //         navigateTo(
// //             (currentIndex - 1 + imagenesNormalizadas.length) %
// //                 imagenesNormalizadas.length
// //         );
// //     const handleNext = () =>
// //         navigateTo((currentIndex + 1) % imagenesNormalizadas.length);

// //     const handleMouseDown = (e) => {
// //         setDragStartX(e.clientX);
// //         setIsDragging(true);
// //     };
// //     const handleMouseUp = (e) => {
// //         if (!isDragging) return;
// //         const deltaX = e.clientX - dragStartX;
// //         setIsDragging(false);
// //         if (Math.abs(deltaX) > 50) {
// //             deltaX > 0 ? handlePrev() : handleNext();
// //         }
// //     };

// //     const handleMouseEnter = () => setZoomActive(true);
// //     const handleMouseLeave = () => setZoomActive(false);

// //     // 👇 CORREGIDO: usar pageX/clientX + rect correctamente
// //     const handleMouseMove = (e) => {
// //         const wrapper = zoomWrapperRef.current;
// //         if (!wrapper) return;

// //         const { left, top, width, height } = wrapper.getBoundingClientRect();
// //         // clientX/clientY son relativos al viewport, y rect también → combinación correcta
// //         const x = ((e.clientX - left) / width) * 100;
// //         const y = ((e.clientY - top) / height) * 100;

// //         // Clamp 0-100 para evitar valores fuera de rango
// //         setZoomPos({
// //             x: Math.max(0, Math.min(100, x)),
// //             y: Math.max(0, Math.min(100, y)),
// //         });
// //     };

// //     const [isSmallScreen, setIsSmallScreen] = useState(
// //         window.innerWidth < 600
// //     );

// //     useEffect(() => {
// //         const handleResize = () => {
// //             setIsSmallScreen(window.innerWidth < 600);
// //         };
// //         window.addEventListener('resize', handleResize);
// //         return () => {
// //             window.removeEventListener('resize', handleResize);
// //         };
// //     }, []);

// //     const descuento = Math.round(
// //         ((producto.precioNormal - producto.precioVenta) * 100) /
// //             producto.precioNormal
// //     );

// //     const debeMostrarColores = (producto) => {
// //         if (!producto) return true;
// //         const detalles = producto['detalles-del-producto'];
// //         if (!Array.isArray(detalles) || detalles.length === 0) return true;
// //         const detalle = detalles[0];

// //         const normalizar = (str) => {
// //             if (!str) return '';
// //             return String(str)
// //                 .toLowerCase()
// //                 .normalize('NFD')
// //                 .replace(/[\u0300-\u036f]/g, '')
// //                 .trim();
// //         };

// //         const categoria = normalizar(
// //             detalle['categoría'] || detalle['categoria'] || producto.categoria
// //         );
// //         if (categoria === 'colchones') return false;

// //         const linea = normalizar(
// //             detalle['línea'] || detalle['linea'] || producto.linea
// //         );
// //         const lineasExcluidas = ['clasica', 'clasicas', 'clasico', 'clasicos'];
// //         if (lineasExcluidas.includes(linea)) return false;

// //         const clavesDetalle = Object.keys(detalle);
// //         const tieneClaveVelador = clavesDetalle.some((clave) =>
// //             normalizar(clave).includes('velador')
// //         );

// //         const modelo = normalizar(
// //             detalle['modelo'] || detalle['modelo-de-velador'] || producto.modelo
// //         );
// //         const tipo = normalizar(
// //             detalle['tipo'] || detalle['tipo-de-producto'] || producto.tipo
// //         );
// //         const categoriaDetalle = normalizar(
// //             detalle['categoría'] || detalle['categoria']
// //         );

// //         if (
// //             modelo === 'velador' ||
// //             tipo === 'velador' ||
// //             categoriaDetalle === 'veladores'
// //         )
// //             return false;
// //         if (modelo.includes('velador') && modelo.split(' ').length <= 3)
// //             return false;

// //         if (tieneClaveVelador) {
// //             if (categoria !== 'dormitorios' && categoria !== 'camas') {
// //                 return false;
// //             }
// //         }

// //         return true;
// //     };

// //     const mostrarColores = debeMostrarColores(producto);

// //     const imagenesResueltas = useMemo(
// //         () => imagenesNormalizadas.map((ruta) => construirCandidatosImagen(ruta)),
// //         [imagenesNormalizadas]
// //     );

// //     if (imagenesResueltas.length === 0) {
// //         return (
// //             <div className="product-page-images-global">
// //                 <span className="product-page-discount">-{descuento}%</span>
// //                 <div className="product-page-images-container">
// //                     <div className="product-page-images-content">
// //                         <div
// //                             style={{
// //                                 width: '100%',
// //                                 aspectRatio: '1 / 1',
// //                                 background: '#f5f5f5',
// //                                 display: 'flex',
// //                                 alignItems: 'center',
// //                                 justifyContent: 'center',
// //                                 color: '#888',
// //                             }}
// //                         >
// //                             Sin imágenes
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>
// //         );
// //     }

// //     return (
// //         <div
// //             className={`product-page-images-global ${
// //                 producto.stock === 0 ? 'sin-stock' : ''
// //             }`}
// //         >
// //             <span className="product-page-discount">-{descuento}%</span>

// //             <div className="product-page-images-miniatures-container">
// //                 <ul className="product-page-images-miniatures">
// //                     {imagenesResueltas.map((imgData, i) => (
// //                         <li
// //                             key={i}
// //                             className={i === currentIndex ? 'active' : ''}
// //                             onClick={() => navigateTo(i)}
// //                         >
// //                             <LazyImage
// //                                 width={isSmallScreen ? 54 : 80}
// //                                 height={isSmallScreen ? 54 : 80}
// //                                 src={imgData.mainSrc}
// //                                 srcs={imgData.fallbackSrcs}
// //                                 alt={producto.nombre}
// //                                 onLoad={(urlCargada) =>
// //                                     setUrlsCargadas((prev) => ({
// //                                         ...prev,
// //                                         [i]: urlCargada,
// //                                     }))
// //                                 }
// //                             />
// //                         </li>
// //                     ))}
// //                 </ul>
// //             </div>

// //             <div className="product-page-images-container">
// //                 <div
// //                     className="product-page-images-content"
// //                     onMouseDown={handleMouseDown}
// //                     onMouseUp={handleMouseUp}
// //                     onMouseLeave={(e) => {
// //                         handleMouseUp(e);
// //                     }}
// //                 >
// //                     <ul
// //                         className="product-page-images"
// //                         style={{
// //                             transform: `translateX(-${currentIndex * 100}%)`,
// //                         }}
// //                     >
// //                         {imagenesResueltas.map((imgData, i) => {
// //                             const urlReal =
// //                                 urlsCargadas[i] || imgData.mainSrc;
// //                             const isActive = i === currentIndex;

// //                             return (
// //                                 <li key={i}>
// //                                     <div
// //                                         ref={isActive ? zoomWrapperRef : null}
// //                                         className="zoom-wrapper"
// //                                         onMouseEnter={
// //                                             isActive
// //                                                 ? handleMouseEnter
// //                                                 : undefined
// //                                         }
// //                                         onMouseMove={
// //                                             isActive
// //                                                 ? handleMouseMove
// //                                                 : undefined
// //                                         }
// //                                         onMouseLeave={
// //                                             isActive
// //                                                 ? handleMouseLeave
// //                                                 : undefined
// //                                         }
// //                                     >
// //                                         <LazyImage
// //                                             width={
// //                                                 isSmallScreen ? 280 : 540
// //                                             }
// //                                             height={
// //                                                 isSmallScreen ? 280 : 540
// //                                             }
// //                                             src={imgData.mainSrc}
// //                                             srcs={imgData.fallbackSrcs}
// //                                             alt={producto.nombre}
// //                                             className="product-main-image"
// //                                             fetchPriority="high"
// //                                             onLoad={(urlCargada) =>
// //                                                 setUrlsCargadas((prev) => ({
// //                                                     ...prev,
// //                                                     [i]: urlCargada,
// //                                                 }))
// //                                             }
// //                                         />

// //                                         {zoomActive && isActive && (
// //                                             <div
// //                                                 className="zoom-lens"
// //                                                 style={{
// //                                                     backgroundImage: `url(${urlReal})`,
// //                                                     backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
// //                                                 }}
// //                                             />
// //                                         )}
// //                                     </div>
// //                                 </li>
// //                             );
// //                         })}
// //                     </ul>

// //                     <button
// //                         className="product-page-images-button product-page-images-button-1"
// //                         onClick={handlePrev}
// //                     >
// //                         <span className="material-symbols-outlined">
// //                             chevron_left
// //                         </span>
// //                     </button>

// //                     <button
// //                         className="product-page-images-button product-page-images-button-2"
// //                         onClick={handleNext}
// //                     >
// //                         <span className="material-symbols-outlined">
// //                             chevron_right
// //                         </span>
// //                     </button>
// //                 </div>
// //             </div>

// //             {mostrarColores && (
// //                 <Colores
// //                     onSelectColor={onSelectColor}
// //                     producto={producto}
// //                     selectedShipping={selectedShipping}
// //                     shippingInfo={shippingInfo}
// //                     quantity={quantity}
// //                     precioFinal={precioFinal}
// //                 />
// //             )}
// //         </div>
// //     );
// // }

// // export default Imagenes;

// import { useState, useEffect, useMemo, useRef } from 'react';

// import LazyImage from '../../../../Componentes/Plantillas/LazyImage';
// import Colores from '../Colores/Colores';

// import './Imagenes.css';

// // 👇 Extensiones soportadas, en orden de preferencia
// const EXTENSIONES_IMAGEN = ['jpg', 'webp', 'png', 'jfif'];

// // 👇 Extrae un string de ruta sin importar si viene como string u objeto
// function extraerRuta(img) {
//     if (!img) return '';
//     if (typeof img === 'string') return img;
//     if (typeof img === 'object') {
//         return (
//             img.src ||
//             img.url ||
//             img.ruta ||
//             img.imagen ||
//             img.foto ||
//             img.path ||
//             ''
//         );
//     }
//     return '';
// }

// // 👇 Genera candidatas de URL probando todas las extensiones
// function construirCandidatosImagen(rutaRaw) {
//     const ruta = extraerRuta(rutaRaw);

//     if (!ruta || typeof ruta !== 'string') {
//         return { mainSrc: '', fallbackSrcs: [] };
//     }

//     const match = ruta.match(/\.(webp|jpg|jpeg|png|jfif)$/i);

//     if (match) {
//         const extActual = match[1].toLowerCase();
//         const baseSinExt = ruta.slice(0, ruta.length - match[0].length);
//         const orden = [
//             extActual,
//             ...EXTENSIONES_IMAGEN.filter((e) => e !== extActual),
//         ];
//         const candidatos = orden.map((ext) => `${baseSinExt}.${ext}`);
//         return {
//             mainSrc: candidatos[0],
//             fallbackSrcs: candidatos.slice(1),
//         };
//     }

//     const candidatos = EXTENSIONES_IMAGEN.map((ext) => `${ruta}.${ext}`);
//     return {
//         mainSrc: candidatos[0],
//         fallbackSrcs: candidatos.slice(1),
//     };
// }

// function Imagenes({
//     imagenes,
//     producto,
//     onSelectColor,
//     skusOfertas,
//     selectedShipping,
//     shippingInfo,
//     quantity,
//     precioFinal,
// }) {
//     const estaEnOfertas = skusOfertas?.includes(producto.sku) ?? false;
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [isDragging, setIsDragging] = useState(false);
//     const [dragStartX, setDragStartX] = useState(0);

//     const [zoomActive, setZoomActive] = useState(false);
//     const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });

//     // 👇 Guardamos la URL real que cargó cada índice
//     const [urlsCargadas, setUrlsCargadas] = useState({});

//     // 👇 Ref al contenedor activo para el zoom
//     const zoomWrapperRef = useRef(null);

//     // ===== Normaliza `imagenes` =====
//     const imagenesNormalizadas = useMemo(() => {
//         let lista = imagenes;

//         if (!Array.isArray(lista)) {
//             if (typeof lista === 'string') {
//                 lista = [lista];
//             } else if (lista && typeof lista === 'object') {
//                 lista = lista.fotos || lista.imagenes || lista.src || [];
//                 if (!Array.isArray(lista)) lista = [lista];
//             } else {
//                 lista = [];
//             }
//         }

//         const resultado = lista
//             .map((img) => extraerRuta(img))
//             .filter((ruta) => typeof ruta === 'string' && ruta.trim() !== '');

//         if (process.env.NODE_ENV === 'development') {
//             console.log('🔎 [Imagenes] entrada:', imagenes);
//             console.log('🔎 [Imagenes] normalizadas:', resultado);
//         }

//         return resultado;
//     }, [imagenes]);

//     // ===== Candidatas (mainSrc + fallbacks) =====
//     const imagenesResueltas = useMemo(
//         () =>
//             imagenesNormalizadas.map((ruta) =>
//                 construirCandidatosImagen(ruta)
//             ),
//         [imagenesNormalizadas]
//     );

//     // ===== Navegación =====
//     const navigateTo = (idx) => {
//         if (idx >= 0 && idx < imagenesNormalizadas.length)
//             setCurrentIndex(idx);
//     };
//     const handlePrev = () =>
//         navigateTo(
//             (currentIndex - 1 + imagenesNormalizadas.length) %
//                 imagenesNormalizadas.length
//         );
//     const handleNext = () =>
//         navigateTo((currentIndex + 1) % imagenesNormalizadas.length);

//     // ===== Drag =====
//     const handleMouseDown = (e) => {
//         setDragStartX(e.clientX);
//         setIsDragging(true);
//     };
//     const handleMouseUp = (e) => {
//         if (!isDragging) return;
//         const deltaX = e.clientX - dragStartX;
//         setIsDragging(false);
//         if (Math.abs(deltaX) > 50) {
//             deltaX > 0 ? handlePrev() : handleNext();
//         }
//     };

//     // ===== Zoom =====
//     const handleMouseEnter = () => setZoomActive(true);
//     const handleMouseLeave = () => setZoomActive(false);

//     // 👇 Usamos clientX/clientY contra el rect del wrapper
//     const handleMouseMove = (e) => {
//         const wrapper = zoomWrapperRef.current;
//         if (!wrapper) return;

//         const { left, top, width, height } = wrapper.getBoundingClientRect();
//         const x = ((e.clientX - left) / width) * 100;
//         const y = ((e.clientY - top) / height) * 100;

//         setZoomPos({
//             x: Math.max(0, Math.min(100, x)),
//             y: Math.max(0, Math.min(100, y)),
//         });
//     };

//     // ===== Responsive =====
//     const [isSmallScreen, setIsSmallScreen] = useState(
//         window.innerWidth < 600
//     );

//     useEffect(() => {
//         const handleResize = () => {
//             setIsSmallScreen(window.innerWidth < 600);
//         };
//         window.addEventListener('resize', handleResize);
//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);

//     // ===== Descuento =====
//     const descuento = Math.round(
//         ((producto.precioNormal - producto.precioVenta) * 100) /
//             producto.precioNormal
//     );

//     // ===== Mostrar colores =====
//     const debeMostrarColores = (producto) => {
//         if (!producto) return true;
//         const detalles = producto['detalles-del-producto'];
//         if (!Array.isArray(detalles) || detalles.length === 0) return true;
//         const detalle = detalles[0];

//         const normalizar = (str) => {
//             if (!str) return '';
//             return String(str)
//                 .toLowerCase()
//                 .normalize('NFD')
//                 .replace(/[\u0300-\u036f]/g, '')
//                 .trim();
//         };

//         const categoria = normalizar(
//             detalle['categoría'] || detalle['categoria'] || producto.categoria
//         );
//         if (categoria === 'colchones') return false;

//         const linea = normalizar(
//             detalle['línea'] || detalle['linea'] || producto.linea
//         );
//         const lineasExcluidas = ['clasica', 'clasicas', 'clasico', 'clasicos'];
//         if (lineasExcluidas.includes(linea)) return false;

//         const clavesDetalle = Object.keys(detalle);
//         const tieneClaveVelador = clavesDetalle.some((clave) =>
//             normalizar(clave).includes('velador')
//         );

//         const modelo = normalizar(
//             detalle['modelo'] || detalle['modelo-de-velador'] || producto.modelo
//         );
//         const tipo = normalizar(
//             detalle['tipo'] || detalle['tipo-de-producto'] || producto.tipo
//         );
//         const categoriaDetalle = normalizar(
//             detalle['categoría'] || detalle['categoria']
//         );

//         if (
//             modelo === 'velador' ||
//             tipo === 'velador' ||
//             categoriaDetalle === 'veladores'
//         )
//             return false;
//         if (modelo.includes('velador') && modelo.split(' ').length <= 3)
//             return false;

//         if (tieneClaveVelador) {
//             if (categoria !== 'dormitorios' && categoria !== 'camas') {
//                 return false;
//             }
//         }

//         return true;
//     };

//     const mostrarColores = debeMostrarColores(producto);

//     // ===== Sin imágenes =====
//     if (imagenesResueltas.length === 0) {
//         return (
//             <div className="product-page-images-global">
//                 <span className="product-page-discount">-{descuento}%</span>
//                 <div className="product-page-images-container">
//                     <div className="product-page-images-content">
//                         <div
//                             style={{
//                                 width: '100%',
//                                 aspectRatio: '1 / 1',
//                                 background: '#f5f5f5',
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                                 color: '#888',
//                             }}
//                         >
//                             Sin imágenes
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div
//             className={`product-page-images-global ${
//                 producto.stock === 0 ? 'sin-stock' : ''
//             }`}
//         >
//             <span className="product-page-discount">-{descuento}%</span>

//             {/* ===== MINIATURAS ===== */}
//             <div className="product-page-images-miniatures-container">
//                 <ul className="product-page-images-miniatures">
//                     {imagenesResueltas.map((imgData, i) => (
//                         <li
//                             key={i}
//                             className={i === currentIndex ? 'active' : ''}
//                             onClick={() => navigateTo(i)}
//                         >
//                             <LazyImage
//                                 width={isSmallScreen ? 54 : 80}
//                                 height={isSmallScreen ? 54 : 80}
//                                 src={imgData.mainSrc}
//                                 srcs={imgData.fallbackSrcs}
//                                 alt={producto.nombre}
//                                 onLoad={(urlCargada) =>
//                                     setUrlsCargadas((prev) => ({
//                                         ...prev,
//                                         [i]: urlCargada,
//                                     }))
//                                 }
//                             />
//                         </li>
//                     ))}
//                 </ul>
//             </div>

//             {/* ===== IMAGEN PRINCIPAL ===== */}
//             <div className="product-page-images-container">
//                 <div
//                     className="product-page-images-content"
//                     onMouseDown={handleMouseDown}
//                     onMouseUp={handleMouseUp}
//                     onMouseLeave={(e) => {
//                         handleMouseUp(e);
//                     }}
//                 >
//                     <ul
//                         className="product-page-images"
//                         style={{
//                             transform: `translateX(-${currentIndex * 100}%)`,
//                         }}
//                     >
//                         {imagenesResueltas.map((imgData, i) => {
//                             const isActive = i === currentIndex;
//                             // 👇 Usamos la URL ya cargada si existe (viene de miniaturas o del onLoad de la grande)
//                             const urlSegura =
//                                 urlsCargadas[i] || imgData.mainSrc;

//                             return (
//                                 <li key={i}>
//                                     <div
//                                         ref={isActive ? zoomWrapperRef : null}
//                                         className="zoom-wrapper"
//                                         onMouseEnter={
//                                             isActive
//                                                 ? handleMouseEnter
//                                                 : undefined
//                                         }
//                                         onMouseMove={
//                                             isActive
//                                                 ? handleMouseMove
//                                                 : undefined
//                                         }
//                                         onMouseLeave={
//                                             isActive
//                                                 ? handleMouseLeave
//                                                 : undefined
//                                         }
//                                     >
//                                         {/* 👇 Imagen grande: <img> normal (no LazyImage) para que el zoom funcione bien */}
//                                         <img
//                                             width={isSmallScreen ? 280 : 540}
//                                             height={isSmallScreen ? 280 : 540}
//                                             src={urlSegura}
//                                             alt={producto.nombre}
//                                             className="product-main-image"
//                                             draggable={false}
//                                             onLoad={(e) => {
//                                                 // Guardamos la URL que realmente cargó
//                                                 setUrlsCargadas((prev) => ({
//                                                     ...prev,
//                                                     [i]: e.target.src,
//                                                 }));
//                                             }}
//                                             onError={() => {
//                                                 // Si falla (ej: .webp no existe), probamos el siguiente fallback
//                                                 const actual = urlSegura;
//                                                 const idxFallback =
//                                                     imgData.fallbackSrcs.indexOf(
//                                                         actual
//                                                     );
//                                                 const next =
//                                                     imgData.fallbackSrcs[
//                                                         idxFallback + 1
//                                                     ];
//                                                 if (next) {
//                                                     setUrlsCargadas(
//                                                         (prev) => ({
//                                                             ...prev,
//                                                             [i]: next,
//                                                         })
//                                                     );
//                                                 }
//                                             }}
//                                         />

//                                         {zoomActive && isActive && (
//                                             <div
//                                                 className="zoom-lens"
//                                                 style={{
//                                                     backgroundImage: `url(${urlSegura})`,
//                                                     backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
//                                                 }}
//                                             />
//                                         )}
//                                     </div>
//                                 </li>
//                             );
//                         })}
//                     </ul>

//                     <button
//                         className="product-page-images-button product-page-images-button-1"
//                         onClick={handlePrev}
//                     >
//                         <span className="material-symbols-outlined">
//                             chevron_left
//                         </span>
//                     </button>

//                     <button
//                         className="product-page-images-button product-page-images-button-2"
//                         onClick={handleNext}
//                     >
//                         <span className="material-symbols-outlined">
//                             chevron_right
//                         </span>
//                     </button>
//                 </div>
//             </div>

//             {mostrarColores && (
//                 <Colores
//                     onSelectColor={onSelectColor}
//                     producto={producto}
//                     selectedShipping={selectedShipping}
//                     shippingInfo={shippingInfo}
//                     quantity={quantity}
//                     precioFinal={precioFinal}
//                 />
//             )}
//         </div>
//     );
// }

// export default Imagenes;

import { useState, useEffect, useMemo, useRef } from 'react';

import LazyImage from '../../../../Componentes/Plantillas/LazyImage';
import Colores from '../Colores/Colores';

import './Imagenes.css';

// 👇 Extensiones soportadas, en orden de preferencia
const EXTENSIONES_IMAGEN = ['jpg', 'webp', 'png', 'jfif'];

// 👇 Extrae un string de ruta sin importar si viene como string u objeto
function extraerRuta(img) {
    if (!img) return '';
    if (typeof img === 'string') return img;
    if (typeof img === 'object') {
        return (
            img.src ||
            img.url ||
            img.ruta ||
            img.imagen ||
            img.foto ||
            img.path ||
            ''
        );
    }
    return '';
}

// 👇 Genera candidatas de URL probando todas las extensiones
function construirCandidatosImagen(rutaRaw) {
    const ruta = extraerRuta(rutaRaw);

    if (!ruta || typeof ruta !== 'string') {
        return { mainSrc: '', fallbackSrcs: [] };
    }

    const match = ruta.match(/\.(webp|jpg|jpeg|png|jfif)$/i);

    if (match) {
        const extActual = match[1].toLowerCase();
        const baseSinExt = ruta.slice(0, ruta.length - match[0].length);
        const orden = [
            extActual,
            ...EXTENSIONES_IMAGEN.filter((e) => e !== extActual),
        ];
        const candidatos = orden.map((ext) => `${baseSinExt}.${ext}`);
        return {
            mainSrc: candidatos[0],
            fallbackSrcs: candidatos.slice(1),
        };
    }

    const candidatos = EXTENSIONES_IMAGEN.map((ext) => `${ruta}.${ext}`);
    return {
        mainSrc: candidatos[0],
        fallbackSrcs: candidatos.slice(1),
    };
}

// 👇 Componente que encuentra la primera URL válida y la usa para <img>
//    Así el zoom-lens puede superponerse sin problemas.
function ImagenConFallback({
    candidates,
    alt,
    width,
    height,
    className,
    onResolved,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
}) {
    const [urlValida, setUrlValida] = useState(null);
    const [cargando, setCargando] = useState(true);
    const cancelRef = useRef(false);

    useEffect(() => {
        cancelRef.current = false;
        setUrlValida(null);
        setCargando(true);

        const probar = (index) => {
            if (cancelRef.current) return;
            if (index >= candidates.length) {
                setCargando(false);
                return;
            }
            const url = candidates[index];
            const img = new Image();
            img.onload = () => {
                if (cancelRef.current) return;
                setUrlValida(url);
                setCargando(false);
                if (typeof onResolved === 'function') onResolved(url);
            };
            img.onerror = () => {
                if (cancelRef.current) return;
                probar(index + 1);
            };
            img.src = url;
        };

        probar(0);

        return () => {
            cancelRef.current = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [candidates.join('|')]);

    return (
        <div
            className="zoom-wrapper"
            onMouseEnter={onMouseEnter}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{ position: 'relative', width: '100%', height: '100%' }}
        >
            {urlValida ? (
                <img
                    width={width}
                    height={height}
                    src={urlValida}
                    alt={alt}
                    className={className}
                    draggable={false}
                    style={{
                        display: 'block',
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        userSelect: 'none',
                    }}
                />
            ) : (
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        background: '#f5f5f5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#aaa',
                        fontSize: 14,
                    }}
                >
                    {cargando ? 'Cargando…' : 'Imagen no disponible'}
                </div>
            )}
        </div>
    );
}

function Imagenes({
    imagenes,
    producto,
    onSelectColor,
    skusOfertas,
    selectedShipping,
    shippingInfo,
    quantity,
    precioFinal,
}) {
    const estaEnOfertas = skusOfertas?.includes(producto.sku) ?? false;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartX, setDragStartX] = useState(0);

    const [zoomActive, setZoomActive] = useState(false);
    const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });

    // 👇 Guardamos la URL real que cargó cada índice
    const [urlsCargadas, setUrlsCargadas] = useState({});

    // 👇 Ref al contenedor activo para el zoom
    const zoomWrapperRef = useRef(null);

    // ===== Normaliza `imagenes` =====
    const imagenesNormalizadas = useMemo(() => {
        let lista = imagenes;

        if (!Array.isArray(lista)) {
            if (typeof lista === 'string') {
                lista = [lista];
            } else if (lista && typeof lista === 'object') {
                lista = lista.fotos || lista.imagenes || lista.src || [];
                if (!Array.isArray(lista)) lista = [lista];
            } else {
                lista = [];
            }
        }

        const resultado = lista
            .map((img) => extraerRuta(img))
            .filter((ruta) => typeof ruta === 'string' && ruta.trim() !== '');

        if (process.env.NODE_ENV === 'development') {
            console.log('🔎 [Imagenes] entrada:', imagenes);
            console.log('🔎 [Imagenes] normalizadas:', resultado);
        }

        return resultado;
    }, [imagenes]);

    // ===== Candidatas (mainSrc + fallbacks) =====
    const imagenesResueltas = useMemo(
        () =>
            imagenesNormalizadas.map((ruta) =>
                construirCandidatosImagen(ruta)
            ),
        [imagenesNormalizadas]
    );

    // ===== Navegación =====
    const navigateTo = (idx) => {
        if (idx >= 0 && idx < imagenesNormalizadas.length)
            setCurrentIndex(idx);
    };
    const handlePrev = () =>
        navigateTo(
            (currentIndex - 1 + imagenesNormalizadas.length) %
                imagenesNormalizadas.length
        );
    const handleNext = () =>
        navigateTo((currentIndex + 1) % imagenesNormalizadas.length);

    // ===== Drag =====
    const handleMouseDown = (e) => {
        setDragStartX(e.clientX);
        setIsDragging(true);
    };
    const handleMouseUp = (e) => {
        if (!isDragging) return;
        const deltaX = e.clientX - dragStartX;
        setIsDragging(false);
        if (Math.abs(deltaX) > 50) {
            deltaX > 0 ? handlePrev() : handleNext();
        }
    };

    // ===== Zoom =====
    const handleMouseEnter = () => setZoomActive(true);
    const handleMouseLeave = () => setZoomActive(false);

    const handleMouseMove = (e) => {
        const wrapper = zoomWrapperRef.current;
        if (!wrapper) return;

        const { left, top, width, height } = wrapper.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;

        setZoomPos({
            x: Math.max(0, Math.min(100, x)),
            y: Math.max(0, Math.min(100, y)),
        });
    };

    // ===== Responsive =====
    const [isSmallScreen, setIsSmallScreen] = useState(
        window.innerWidth < 600
    );

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 600);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // ===== Descuento =====
    const descuento = Math.round(
        ((producto.precioNormal - producto.precioVenta) * 100) /
            producto.precioNormal
    );

    // ===== Mostrar colores =====
    const debeMostrarColores = (producto) => {
        if (!producto) return true;
        const detalles = producto['detalles-del-producto'];
        if (!Array.isArray(detalles) || detalles.length === 0) return true;
        const detalle = detalles[0];

        const normalizar = (str) => {
            if (!str) return '';
            return String(str)
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .trim();
        };

        const categoria = normalizar(
            detalle['categoría'] || detalle['categoria'] || producto.categoria
        );
        if (categoria === 'colchones') return false;

        const linea = normalizar(
            detalle['línea'] || detalle['linea'] || producto.linea
        );
        const lineasExcluidas = ['clasica', 'clasicas', 'clasico', 'clasicos'];
        if (lineasExcluidas.includes(linea)) return false;

        const clavesDetalle = Object.keys(detalle);
        const tieneClaveVelador = clavesDetalle.some((clave) =>
            normalizar(clave).includes('velador')
        );

        const modelo = normalizar(
            detalle['modelo'] || detalle['modelo-de-velador'] || producto.modelo
        );
        const tipo = normalizar(
            detalle['tipo'] || detalle['tipo-de-producto'] || producto.tipo
        );
        const categoriaDetalle = normalizar(
            detalle['categoría'] || detalle['categoria']
        );

        if (
            modelo === 'velador' ||
            tipo === 'velador' ||
            categoriaDetalle === 'veladores'
        )
            return false;
        if (modelo.includes('velador') && modelo.split(' ').length <= 3)
            return false;

        if (tieneClaveVelador) {
            if (categoria !== 'dormitorios' && categoria !== 'camas') {
                return false;
            }
        }

        return true;
    };

    const mostrarColores = debeMostrarColores(producto);

    // ===== Sin imágenes =====
    if (imagenesResueltas.length === 0) {
        return (
            <div className="product-page-images-global">
                <span className="product-page-discount">-{descuento}%</span>
                <div className="product-page-images-container">
                    <div className="product-page-images-content">
                        <div
                            style={{
                                width: '100%',
                                aspectRatio: '1 / 1',
                                background: '#f5f5f5',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#888',
                            }}
                        >
                            Sin imágenes
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`product-page-images-global ${
                producto.stock === 0 ? 'sin-stock' : ''
            }`}
        >
            <span className="product-page-discount">-{descuento}%</span>

            {/* ===== MINIATURAS ===== */}
            <div className="product-page-images-miniatures-container">
                <ul className="product-page-images-miniatures">
                    {imagenesResueltas.map((imgData, i) => (
                        <li
                            key={i}
                            className={i === currentIndex ? 'active' : ''}
                            onClick={() => navigateTo(i)}
                        >
                            <LazyImage
                                width={isSmallScreen ? 54 : 80}
                                height={isSmallScreen ? 54 : 80}
                                src={imgData.mainSrc}
                                srcs={imgData.fallbackSrcs}
                                alt={producto.nombre}
                                onLoad={(urlCargada) =>
                                    setUrlsCargadas((prev) => ({
                                        ...prev,
                                        [i]: urlCargada,
                                    }))
                                }
                            />
                        </li>
                    ))}
                </ul>
            </div>

            {/* ===== IMAGEN PRINCIPAL ===== */}
            <div className="product-page-images-container">
                <div
                    className="product-page-images-content"
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={(e) => {
                        handleMouseUp(e);
                    }}
                >
                    <ul
                        className="product-page-images"
                        style={{
                            transform: `translateX(-${currentIndex * 100}%)`,
                        }}
                    >
                        {imagenesResueltas.map((imgData, i) => {
                            const isActive = i === currentIndex;
                            // Lista de candidatas: fallback ya cargado por miniatura primero
                            const candidatas = urlsCargadas[i]
                                ? [
                                      urlsCargadas[i],
                                      imgData.mainSrc,
                                      ...imgData.fallbackSrcs,
                                  ].filter(Boolean)
                                : [
                                      imgData.mainSrc,
                                      ...imgData.fallbackSrcs,
                                  ].filter(Boolean);

                            return (
                                <li key={i}>
                                    <div
                                        ref={
                                            isActive
                                                ? zoomWrapperRef
                                                : null
                                        }
                                        className="zoom-wrapper-host"
                                        style={{
                                            position: 'relative',
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    >
                                        <ImagenConFallback
                                            candidates={candidatas}
                                            alt={producto.nombre}
                                            width={
                                                isSmallScreen ? 280 : 540
                                            }
                                            height={
                                                isSmallScreen ? 280 : 540
                                            }
                                            className="product-main-image"
                                            onResolved={(url) =>
                                                setUrlsCargadas((prev) => ({
                                                    ...prev,
                                                    [i]: url,
                                                }))
                                            }
                                            onMouseEnter={
                                                isActive
                                                    ? handleMouseEnter
                                                    : undefined
                                            }
                                            onMouseMove={
                                                isActive
                                                    ? handleMouseMove
                                                    : undefined
                                            }
                                            onMouseLeave={
                                                isActive
                                                    ? handleMouseLeave
                                                    : undefined
                                            }
                                        />

                                        {zoomActive && isActive && (
                                            <div
                                                className="zoom-lens"
                                                style={{
                                                    backgroundImage: `url(${
                                                        urlsCargadas[i] ||
                                                        imgData.mainSrc
                                                    })`,
                                                    backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                                                }}
                                            />
                                        )}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>

                    <button
                        className="product-page-images-button product-page-images-button-1"
                        onClick={handlePrev}
                    >
                        <span className="material-symbols-outlined">
                            chevron_left
                        </span>
                    </button>

                    <button
                        className="product-page-images-button product-page-images-button-2"
                        onClick={handleNext}
                    >
                        <span className="material-symbols-outlined">
                            chevron_right
                        </span>
                    </button>
                </div>
            </div>

            {mostrarColores && (
                <Colores
                    onSelectColor={onSelectColor}
                    producto={producto}
                    selectedShipping={selectedShipping}
                    shippingInfo={shippingInfo}
                    quantity={quantity}
                    precioFinal={precioFinal}
                />
            )}
        </div>
    );
}

export default Imagenes;
