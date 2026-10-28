// import Productos from "../Productos";
// import "./Categorias.css";

// function Complementos() {
//     return (
//         <Productos
//             categoriaForzada="complementos"
//             titulo="Complementos"
//             descripcionSeo="Descubre nuestra amplia variedad de colchones Kamas: ortopédicos, semi ortopédicos, pocket y más. Envío a todo el Perú."
//         />
//     );
// }

// export default Complementos;

// src/Paginas/Productos/Categorias/Complementos.jsx
import { useParams } from "react-router-dom";
import Productos from "../Productos";
import "./Categorias.css";

function Complementos() {
    const { tipo, material } = useParams();

    const formatearSlug = (slug = "") =>
        slug
            .split("-")
            .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
            .join(" ");

    let titulo = "Complementos";
    if (tipo && material) {
        titulo = `Complementos ${formatearSlug(tipo)} ${formatearSlug(material)}`;
    } else if (tipo) {
        titulo = `Complementos ${formatearSlug(tipo)}`;
    }

    const descripcionSeo = `Descubre nuestra amplia variedad de complementos Kamas${
        tipo ? ` tipo ${formatearSlug(tipo)}` : ""
    }${material ? ` en ${formatearSlug(material)}` : ""}. Envío a todo el Perú.`;

    return (
        <Productos
            categoriaForzada="complementos"
            paramsRuta={{
                "subcategoría": tipo,
                "línea": material,
            }}
            titulo={titulo}
            descripcionSeo={descripcionSeo}
        />
    );
}

export default Complementos;
