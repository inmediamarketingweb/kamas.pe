// import { useEffect, useState } from "react";
// import { Helmet } from "react-helmet";

// import './style.css';

// function NorteChico() {

//     const [zonas, setZonas] = useState(null);

//     useEffect(() => {
//         fetch("/assets/json/paginas/envios/costos-de-envio-por-zonas.json")
//             .then(res => res.json())
//             .then(data => setZonas(data))
//             .catch(err => console.error("Error cargando JSON:", err));
//     }, []);

//     if (!zonas) return <p>Cargando costos de envío...</p>;

//     const zonasPermitidas = [
//         "Norte chico"
//     ];

//     return (
//         <>
//             <Helmet>
//                 <title>Norte chico | Kamas</title>
//             </Helmet>

//             <main>
//                 <div className="block-container">
//                     <section className="block-content">
//                         <img
//                             src="/assets/imagenes/paginas/servicio-al-cliente/costos-de-envio-por-zona/costos-de-envio-por-zona.jpg"
//                             alt="Costos de envío por zona | Kamas"
//                             className="page-banner-img"
//                         />

//                         {Object.entries(zonas)
//                             .filter(([titulo]) => zonasPermitidas.includes(titulo))
//                             .map(([titulo, distritos]) => (
//                                 <div key={titulo} className="zona-block">

//                                     <h2>{titulo}</h2>

//                                     <table className="tabla-envios">
//                                         <thead>
//                                             <tr>
//                                                 <th>Distrito</th>
//                                                 <th>Costo de Envío</th>
//                                             </tr>
//                                         </thead>

//                                         <tbody>
//                                             {distritos.map((item, index) => (
//                                                 <tr key={index}>
//                                                     <td>{item.distrito}</td>
//                                                     <td>
//                                                         {item.envio === "Gratis"
//                                                             ? "Gratis"
//                                                             : `S/ ${item.envio}`}
//                                                     </td>
//                                                 </tr>
//                                             ))}
//                                         </tbody>
//                                     </table>

//                                 </div>
//                             ))}

//                     </section>
//                 </div>
//             </main>
//         </>
//     );
// }

// export default NorteChico;

import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import "./style.css";

function NorteChico() {

    const [zonas, setZonas] = useState(null);

    useEffect(() => {
        fetch("/assets/json/paginas/envios/costos-de-envio-por-zonas.json")
            .then(res => res.json())
            .then(data => setZonas(data))
            .catch(err => console.error("Error cargando JSON:", err));
    }, []);

    if (!zonas) return <p>Cargando costos de envío...</p>;

    const norteChico = zonas["Norte chico"];

    return (
        <>
            <Helmet>
                <title>Norte chico | Kamas</title>
            </Helmet>

            <main>
                <div className="block-container">
                    <section className="block-content costos-tables">
                        <h2 className="d-grid-1-1-full-row">Norte chico</h2>

                        {norteChico.map((provinciaData, index) => (
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

export default NorteChico;
