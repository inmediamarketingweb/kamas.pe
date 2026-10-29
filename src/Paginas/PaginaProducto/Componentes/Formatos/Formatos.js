import "../Medidas/Medidas.css";

function Formatos({ producto }) {
    const formatos = producto?.formatos;

    if (!Array.isArray(formatos) || formatos.length === 0) return null;

    return (
        <div className="d-flex-column gap-10">
            <h2 className="title color-color-1">Otros formatos:</h2>

            <ul className="product-page-sizes d-flex-wrap gap-5">
                {formatos.map((item, index) => (
                    <li key={`${item.ruta}-${index}`} className="d-flex">
                        <a href={item.ruta} title={item.ruta} className="d-flex">
                            <p className="first-uppercase">{item.nombre}</p>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Formatos;
