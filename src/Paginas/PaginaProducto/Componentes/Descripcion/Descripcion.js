import './Descripcion.css';

import Colchones from './Colchones';
import Dormitorios from './Dormitorios';
import Camas from './Camas';
import Default from './Default';

function Descripcion({ producto }) {
    if (!producto) return null;

    const categoria = (
        producto?.['categoría'] ??
        producto?.categoria ??
        ''
    ).toLowerCase().trim();

    if (categoria.includes('colchon')) {
        return <Colchones producto={producto} />;
    }

    if (categoria.includes('dormitorio')) {
        return <Dormitorios producto={producto} />;
    }

    if (categoria.includes('cama')) {
        return <Camas producto={producto} />;
    }

    return <Default producto={producto} />;
}

export default Descripcion;
