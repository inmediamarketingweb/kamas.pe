import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import './style.css';

function LimaYCallao(){
    const [zonas, setZonas] = useState(null);

    useEffect(() => {
        fetch("/assets/json/paginas/envios/costos-de-envio-por-zonas.json")
            .then(res => res.json())
            .then(data => setZonas(data))
            .catch(err => console.error("Error cargando JSON:", err));
    }, []);

    if (!zonas) return <p>Cargando costos de envío...</p>;

    const zonasPermitidas = [
        "Lima Metropolitana 1",
        "Lima Metropolitana 2",
        "Lima Periférica",
        "Callao"
    ];

    return (
        <>
            <Helmet>
                <title>Lima y Callao | Kamas</title>
            </Helmet>

            <main>
                <div className="block-container">
                    <section className="block-content costos-tables">
                        {Object.entries(zonas)
                            .filter(([titulo]) => zonasPermitidas.includes(titulo))
                            .map(([titulo, distritos]) => (
                                <div key={titulo} className="zona-block">
                                    <h2>{titulo}</h2>

                                    <table className="tabla-envios">
                                        <thead>
                                            <tr>
                                                <th>Distrito</th>
                                                <th>Costo de Envío</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {distritos.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.distrito}</td>
                                                    <td>{item.envio === "Gratis" ? "Gratis" : `S/ ${item.envio}`}</td>
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

export default LimaYCallao;
