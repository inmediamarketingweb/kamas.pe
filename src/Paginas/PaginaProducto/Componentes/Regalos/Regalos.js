import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";

import './Regalos.css';

function Regalos({ producto }) {
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 600);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const listaDeRegalos = producto.regalos;

    if (!Array.isArray(listaDeRegalos) || listaDeRegalos.length === 0) {
        return null;
    }

    return (
        <div className="product-page-gifts">
            <h2 className="title">Regalos:</h2>

            <ul>
                {listaDeRegalos.map(item => (
                    <li key={uuidv4()}>
                        <p className="text">{item.texto}</p>
                        <img width={isSmallScreen ? 60 : 60} height={isSmallScreen ? 60 : 60} loading="lazy" src={item.foto} alt={item.texto} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Regalos;
