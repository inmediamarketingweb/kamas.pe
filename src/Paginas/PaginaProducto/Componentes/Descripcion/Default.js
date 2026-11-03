import './Descripcion.css';

import { formatearEtiqueta, limpiarTitulo } from './utils';

function Default({ producto }) {
    if (!producto) return null;

    const nombre = producto?.nombre || '';
    const detalles =
        Array.isArray(producto?.descripcion) && producto.descripcion[0]
            ? producto.descripcion[0]
            : {};
    const mensajes = Array.isArray(producto.mensajes) ? producto.mensajes : [];
    const titulo = limpiarTitulo(nombre);

    return (
        <div className="pd-pg-description">
            <section className="block-content">
                <div className="pd-pg-description-content">
                    <div className="pd-pg-dsp-texts d-flex-column gap-10">
                        <p className="title font-bold">{titulo}</p>

                        <ul className="d-flex-column gap-5">
                            {mensajes.map((msg, i) => (
                                <li key={i}>
                                    <p className="text">{msg}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {Object.keys(detalles).length > 0 && (
                        <div className="d-flex-column gap-10">
                            <p className="title font-bold">
                                DESCRIPCIÓN DEL PRODUCTO
                            </p>

                            <ul className="chr-list">
                                {Object.entries(detalles).map(([clave, valor]) => (
                                    <li key={clave}>
                                        <div className="d-flex gap-5">
                                            <b className="color-black font-weight first-uppercase">
                                                {formatearEtiqueta(clave)}:
                                            </b>
                                            <p className="text first-uppercase">
                                                {valor}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default Default;
