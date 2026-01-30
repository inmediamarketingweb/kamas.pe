function Resumen({ producto }){
    return(
        <div className='d-flex-column gap-10'>
            <p className='text title'>Resumen:</p>

            <ul className='product-page-resume'>
                {producto["resumen-del-producto"] && producto["resumen-del-producto"].map((detalle, index) => (
                    Object.entries(detalle).map(([key, value]) => (
                        <li key={index + key}>
                            <span className="material-symbols-outlined">check</span>
                            <div>
                                <b>{key.replace(/-/g, ' ').charAt(0).toUpperCase() + key.replace(/-/g, ' ').slice(1)}:</b>
                                <p className='text first-uppercase'>{value}</p>
                            </div>
                        </li>
                    ))
                ))}
            </ul>
        </div>
    );
}

export default Resumen;
