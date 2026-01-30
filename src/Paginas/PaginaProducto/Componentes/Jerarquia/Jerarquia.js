import './Jerarquia.css';

function Jerarquia({ producto }){
    const breadcrumbKeys = ['categoria', 'subcategoria', 'linea', 'tamaño', 'modelo'];
    const crumbs = [];
    let cumulativePath = '';

    breadcrumbKeys.forEach(key => {
        if (producto[key]) {
            cumulativePath += `/${producto[key]}`;
            crumbs.push({ key, label: producto[key], path: cumulativePath });
        }
    });

    if(producto.nombre && producto.ruta){
        crumbs.push({ key: 'nombre', label: producto.nombre, path: `/productos/${producto.ruta}`});
    }

    return(
        <div className="product-page-direction bg-white padding-10 border-r-6">
            <ul className='d-flex-center-left gap-5 d-flex-wrap'>
                <li>
                    <a href="/" className='d-flex'>
                        <span className="material-symbols-outlined">home</span>
                    </a>
                </li>

                {crumbs.map(({ key, label }) => (
                    <li key={key}>
                        <p>{label}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Jerarquia;
