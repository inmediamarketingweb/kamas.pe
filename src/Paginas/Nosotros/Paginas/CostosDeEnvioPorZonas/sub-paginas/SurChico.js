import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import "./style.css";

function SurChico() {

    const [zonas, setZonas] = useState(null);

    useEffect(() => {
        fetch("/assets/json/paginas/envios/costos-de-envio-por-zonas.json")
            .then(res => res.json())
            .then(data => setZonas(data))
            .catch(err => console.error("Error cargando JSON:", err));
    }, []);

    if (!zonas) return <p>Cargando costos de envío...</p>;

    const surChico = zonas["Sur chico"];

    return (
        <>
            <Helmet>
                <title>Sur chico | Kamas</title>
            </Helmet>

            <main>
                <div className="block-container">
                    <section className="block-content costos-tables">
                        <h2 className="d-grid-1-1-full-row">Sur chico</h2>

                        {surChico.map((provinciaData, index) => (
                            <div key={index} className="provincia-block">
                                <h3>{provinciaData.provincia}</h3>
                                <table className="tabla-envios">
                                    <thead>
                                        <tr>
                                            <th>Distrito</th>
                                            <th>Costo de Envío</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {provinciaData.distritos.map((item, i) => (
                                            <tr key={i}>
                                                <td>{item.distrito}</td>
                                                <td>S/ {item.envio}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                            </div>
                        ))}

                    </section>
                </div>
            </main>
        </>
    );
}

export default SurChico;
