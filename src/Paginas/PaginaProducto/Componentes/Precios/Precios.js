// import './Precios.css';

// function Precios(){
//     return(
//         <div className="page-product-prices d-flex-column position-relative">
//             <div className="d-flex-center-between margin-bottom-10">
//                 <div className="pd-clm-3-dscto">
//                     <span className="material-symbols-outlined">sell</span>
//                     <p className="text">¡ Oferta especial !</p>
//                 </div>

//                 <span className="pd-percentage-dscto">-{porcentajeDescuento}%</span>
//             </div>

//             <div className="d-flex-center-between">
//                 <p className="text">Precio regular</p>
//                 <p className="page-product-sale-price page-product-regular-price">s/{producto.precioRegular}.00</p>
//             </div>

//             <div className="d-flex-center-between">
//                 <p className="text">Precio normal</p>
//                 <p className="page-product-sale-price page-product-normal-price">s/{producto.precioNormal}.00</p>
//             </div>

//             <div className="page-ptd-of-price-container">
//                 <p className="text">Precio de oferta</p>
//                 <p className="page-product-sale-price page-product-ofert-price">s/{precioFinal}.00</p>

//                 <p className="text-pd-pg-save">Ahorras s/{ahorro.toFixed(2)}</p>
//             </div>
//         </div>
//     )
// }

// export default Precios;

import './Precios.css';

function Precios({ producto, precioFinal, porcentajeDescuento, ahorro }) {
    // Verificamos si hay un porcentaje mayor a 0 para mostrar la cabecera de oferta
    const esOferta = porcentajeDescuento > 0;

    return (
        <div className="page-product-prices d-flex-column position-relative">
            {esOferta && (
                <div className="d-flex-center-between margin-bottom-10">
                    <div className="pd-clm-3-dscto">
                        <span className="material-symbols-outlined">sell</span>
                        <p className="text">¡ Oferta especial !</p>
                    </div>

                    <span className="pd-percentage-dscto">-{porcentajeDescuento}%</span>
                </div>
            )}

            <div className="d-flex-center-between">
                <p className="text">Precio regular</p>
                <p className="page-product-sale-price page-product-regular-price">s/{producto?.precioRegular}.00</p>
            </div>

            <div className="d-flex-center-between">
                <p className="text">Precio normal</p>
                <p className="page-product-sale-price page-product-normal-price">s/{producto?.precioNormal}.00</p>
            </div>

            <div className="page-ptd-of-price-container">
                <div className='d-flex-center-between'>
                    <p className="text">Precio de oferta</p>
                    <p className="page-product-sale-price page-product-ofert-price">s/{precioFinal}.00</p>
                </div>

                {esOferta && (
                    <p className="text-pd-pg-save margin-left">Ahorras s/{ahorro?.toFixed(2)}</p>
                )}
            </div>
        </div>
    );
}

export default Precios;
