import './Medidas.css';

function Medidas({producto}){
    const medidas = producto["tamaños-disponibles"];

    if (!Array.isArray(medidas) || medidas.length === 0) {
        return null;
    }

    return(
        <div className="d-flex-column gap-10">
            <h2 className="title color-color-1">Otras medidas:</h2>

            <ul className="product-page-sizes d-flex-wrap gap-5">
                {medidas.map(item => (
                    <li className='d-flex-center-center'>
                        <a className='d-flex-center-center' href={item.ruta} title={item.ruta}>
                            <p className='text'>{item.nombre}</p>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Medidas;
