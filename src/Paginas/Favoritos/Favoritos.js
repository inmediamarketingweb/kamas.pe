// import { useEffect, useState } from "react";
// import { Helmet } from 'react-helmet';

// import "./Favoritos.css";

// function Favoritos(){
//     const [favoritos, setFavoritos] = useState([]);

//     useEffect(() => {
//         const favStorage = JSON.parse(localStorage.getItem("favoritos")) || [];
//         setFavoritos(favStorage);
//     }, []);

//     const removeFavorite = (producto) => {
//         const updatedFavorites = favoritos.filter((fav) => fav.sku !== producto.sku);
//         setFavoritos(updatedFavorites);
//         localStorage.setItem("favoritos", JSON.stringify(updatedFavorites));
//     };

//     const truncate = (str, maxLength) => {
//         if (str.length <= maxLength){
//             return str;
//         }
//         return str.slice(0, maxLength) + "...";
//     };

//     return(
//         <>
//             <Helmet>
//                 <title>Mis favoritos | Kamas</title>
//                 <meta name="description" content='Guarda tus productos favoritos de KAMAS en tu navegador.'/>
//             </Helmet>

//             <main>
//                 <div className="block-container">
//                     <section className="block-content">
//                         <div className="block-title-container">
//                             <h2 className="block-title">Mis favoritos</h2>
//                         </div>

//                         <div className="favorites-container d-flex-column gap-20">
//                             {favoritos.length > 0 ? (
//                                 <ul className="favorites-products">
//                                     {favoritos.map((producto) => (
//                                         <li key={producto.sku}>
//                                             <div className="product-card">
//                                                 <div className="product-card-images">
//                                                     <button type="button" className="remove-favorite" onClick={() => removeFavorite(producto)} title="Eliminar de favoritos">
//                                                         <span class="material-icons">delete</span>
//                                                     </button>

//                                                     <a href={producto.ruta}>
//                                                         <img src={`${producto.fotos}/1.jpg`} alt={producto.nombre} />
//                                                     </a>
//                                                 </div>

//                                                 <a href={producto.ruta} className="product-card-content">
//                                                     <h4 className="product-card-name">{truncate(producto.nombre, 51)}</h4>
//                                                     <div className="product-card-prices">
//                                                         <span className="product-card-normal-price">S/.{producto.precioNormal}</span>
//                                                         <span className="product-card-sale-price">S/.{producto.precioVenta}</span>
//                                                     </div>
//                                                 </a>
//                                             </div>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             ) : (
//                                 <p>No tienes productos en favoritos.</p>
//                             )}

//                             <div className="d-flex-center-right">
//                                 <a href="https://kamas.pe/" title="Inicio | Kamas" className="button-link button-link-2">
//                                     <span class="material-icons">home</span>
//                                     <p className="button-link-text">Volver al inicio</p>
//                                 </a>    
//                             </div>    
//                         </div>
//                     </section>
//                 </div>
//             </main>
//         </>
//     );
// }

// export default Favoritos;

import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';

import "./Favoritos.css";

function Favoritos(){
    const [favoritos, setFavoritos] = useState([]);

    useEffect(() => {
        const favStorage = JSON.parse(localStorage.getItem("favoritos")) || [];
        setFavoritos(favStorage);
    }, []);

    const removeFavorite = (producto) => {
        const updatedFavorites = favoritos.filter((fav) => fav.sku !== producto.sku);
        setFavoritos(updatedFavorites);
        localStorage.setItem("favoritos", JSON.stringify(updatedFavorites));
    };

    const truncate = (str, maxLength) => {
        if (str.length <= maxLength) return str;
        return str.slice(0, maxLength) + "...";
    };

    return(
        <>
            <Helmet>
                <title>Mis favoritos | Kamas</title>
                <meta name="description" content='Guarda tus productos favoritos de KAMAS en tu navegador.'/>
            </Helmet>

            <main>
                <div className="block-container">
                    <section className="block-content">
                        <div className="block-title-container">
                            <h2 className="block-title">Mis favoritos</h2>
                        </div>

                        <div className="favorites-container d-flex-column gap-20">
                            {favoritos.length > 0 ? (
                                <ul className="favorites-products">
                                    {favoritos.map((producto) => (
                                        <li key={producto.sku}>
                                            <div className="product-card">
                                                <div className="product-card-images">
                                                    <button 
                                                        type="button" 
                                                        className="remove-favorite" 
                                                        onClick={() => removeFavorite(producto)} 
                                                        title="Eliminar de favoritos"
                                                    >
                                                        <span className="material-icons">delete</span>
                                                    </button>

                                                    {/* 3. Corregir la ruta de la imagen */}
                                                    <a href={producto.ruta}>
                                                        <img src={`${producto.fotos}1.jpg`} alt={producto.nombre} />
                                                    </a>
                                                </div>

                                                <a href={producto.ruta} className="product-card-content">
                                                    <h4 className="product-card-name">{truncate(producto.nombre, 51)}</h4>
                                                    <div className="product-card-prices">
                                                        <span className="product-card-normal-price">S/.{producto.precioNormal}</span>
                                                        <span className="product-card-sale-price">S/.{producto.precioVenta}</span>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No tienes productos en favoritos.</p>
                            )}

                            <div className="d-flex-center-right">
                                <a href="https://kamas.pe/" title="Inicio | Kamas" className="button-link button-link-2">
                                    <span className="material-icons">home</span>
                                    <p className="button-link-text">Volver al inicio</p>
                                </a>    
                            </div>    
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}

export default Favoritos;
