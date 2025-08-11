// import './Descripcion.css';

// function Descripcion({ producto }){
//     const formatKey = (key) => key.replace(/-/g, ' ');

//     if (producto?.descripcion){
//         return(
//             <div className='bg-component padding-10 d-flex gap-10'>
//                 <div className='product-details-container d-flex-column gap-10 margin-bottom'>
//                     <div className='d-flex gap-5'>
//                         {/* <span class="material-icons color-color-1">list</span> */}
//                         <h4 className='title color-gray'>Detalles:</h4>
//                     </div>
//                     <ul>
//                         <li>
//                             <span class="material-icons">check</span>
//                             <div>
//                                 <div>
//                                     <strong>SKU:</strong>
//                                 </div>
//                                 <div>
//                                     <p className='text'>{producto.sku}</p>
//                                 </div>
//                             </div>
//                         </li>
//                         {producto['detalles-del-producto'] && producto['detalles-del-producto'].map(
//                             (detalle, index) => Object.entries(detalle).map(([key, value]) => (
//                                 <li key={`${index}-${key}`}>
//                                     <span class="material-icons">check</span>
//                                     <div>
//                                         <div>
//                                             <strong>{formatKey(key)}:</strong>
//                                         </div>
//                                         <div>
//                                             <p className='text'>{value}</p>
//                                         </div>
//                                     </div>
//                                 </li>
//                             ))
//                         )}
//                     </ul>
//                 </div>

//                 <div className='w-100 d-flex-column gap-10 descripcion-list-container'>
//                     <h4 className='title color-gray'>Descripción:</h4>
//                     <ul className='descripcion-list descripcion-list-1'>
//                         {producto.descripcion.map(
//                             (item, index) => Object.entries(item).map(([key, value]) => (
//                                 <li key={`${index}-${key}`}>
//                                     <span class="material-icons">check</span>
//                                     <div>
//                                         <div>
//                                             <strong>{formatKey(key)}:</strong>
//                                         </div>
//                                         <div>
//                                             <p className='text'>{value}</p>
//                                         </div>
//                                     </div>
//                                 </li>
//                             ))
//                         )}
//                     </ul>
//                 </div>
//             </div>
//         );
//     }

//     else if (producto?.descripciones) {
//         return(
//             <div className='d-grid-1-3fr gap-20'>
//                 <div className='d-flex w-100'>
//                     <div className='product-details w-100 d-flex-column gap-20 margin-bottom'>
//                         <h4 className='title'>Detalles del producto:</h4>
//                         <ul>
//                             <li>
//                                 <div>
//                                     <strong>SKU:</strong>
//                                 </div>
//                                 <div>
//                                     <p className='text'>{producto.sku}</p>
//                                 </div>
//                             </li>
//                             {producto['detalles-del-producto'] && producto['detalles-del-producto'].map((detalle, index) =>
//                                 Object.entries(detalle).map(([key, value]) => (
//                                     <li key={`${index}-${key}`}>
//                                         <div>
//                                             <strong>{formatKey(key)}:</strong>
//                                         </div>
//                                         <div>
//                                             <p className='text'>{value}</p>
//                                         </div>
//                                     </li>
//                                 ))
//                             )}
//                         </ul>
//                     </div>
//                 </div>

//                 <div className='product-descripcion'>
//                     <div className='d-flex-column gap-20'>
//                         <h4 className='title description-title'>Descripción del producto:</h4>
//                         <div className='d-flex d-flex-wrap gap-10'>
//                             {producto.descripciones.map((grupo, index) => (
//                                 <div className='d-flex-column gap-10 card-flex-3' key={index}>
//                                     <p className='title'>{grupo.titulo}:</p>
//                                     <ul className='descripcion-list descripcion-list-1'>
//                                         {grupo.descripcion.map(
//                                             (item, idx) => Object.entries(item).map(([key, value]) => (
//                                                 <li key={`${idx}-${key}`}>
//                                                     <div>
//                                                         <strong>{formatKey(key)}:</strong>
//                                                     </div>
//                                                     <div>
//                                                         <p className='text'>{value}</p>
//                                                     </div>
//                                                 </li>
//                                             ))
//                                         )}
//                                     </ul>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     return null;
// }

// export default Descripcion;

import './Descripcion.css';

function Descripcion(){
    return(
        <div>
            <div className='d-flex-center-center'>
                <p className='block-title w-auto'>Sobre el producto</p>
            </div>
        </div>
    )
}

export default Descripcion;
