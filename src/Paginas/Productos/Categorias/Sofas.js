import Productos from "../Productos";
import "./Categorias.css";

function Sofas() {
    return (
        <Productos
            categoriaForzada="sofas"
            titulo="Sofas"
            descripcionSeo="Descubre nuestra amplia variedad de colchones Kamas: ortopédicos, semi ortopédicos, pocket y más. Envío a todo el Perú."
        />
    );
}

export default Sofas;
