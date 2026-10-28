import Productos from "../Productos";
import "./Categorias.css";

function Pet() {
    return (
        <Productos
            categoriaForzada="pet"
            titulo="Pet"
            descripcionSeo="Descubre nuestra amplia variedad de colchones Kamas: ortopédicos, semi ortopédicos, pocket y más. Envío a todo el Perú."
        />
    );
}

export default Pet;
