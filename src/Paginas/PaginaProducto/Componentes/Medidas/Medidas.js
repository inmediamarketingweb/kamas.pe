import './Medidas.css';

const dimensionesMap = {
    "1 plaza": "90x190cm",
    "1 plaza y media": "105x190cm",
    "2 plazas": "135x190cm",
    "queen": "155x203cm",
    "king": "198x203cm",
    "4 plazas": "240x203cm"
};

function Medidas({ producto }) {
    const medidas = producto["tamaños-disponibles"];

    if (!Array.isArray(medidas) || medidas.length === 0) {
        return null;
    }

    return(
        <div className="border-1-component padding-20 border-r-4 d-flex-column gap-10">
            <h2 className="text uppercase font-13 font-bold">Medidas</h2>

            <ul className="product-page-sizes d-flex-wrap gap-5">
                {medidas.map((item, index) => {
                    const dimension = dimensionesMap[item.nombre.toLowerCase()];

                    return (
                        <li key={index} className='d-flex-center-center'>
                            <a className='d-flex-column d-flex-center-center' href={item.ruta} title={item.ruta}>
                                <p className='text first-uppercase'>{item.nombre}</p>
                                {dimension && <span className='subtext'>{dimension}</span>}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Medidas;
