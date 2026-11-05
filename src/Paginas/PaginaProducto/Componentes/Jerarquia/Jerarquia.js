import './Jerarquia.css';

function Jerarquia({ producto }){
    const breadcrumbKeys = ['categoría', 'tamaño', 'línea', 'sku'];
    const crumbs = [];
    let cumulativePath = '';

    breadcrumbKeys.forEach(key => {
        if (producto[key]) {
            cumulativePath += `/${producto[key]}`;
            crumbs.push({ key, label: producto[key], path: cumulativePath });
        }
    });

    return(
        <div className="product-page-direction">
            <ul className='d-flex-center-left gap-5 d-flex-wrap'>
                <li>
                    <a href="https://kamas.pe/" className='d-flex'>
                        <span className="material-symbols-outlined">home</span>
                    </a>
                </li>

                {crumbs.map(({ key, label }) => (
                    <li key={key}>
                        <p className='text'>{label}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Jerarquia;
