import { useParams } from "react-router-dom";
import Productos from "../Productos";
import "./Categorias.css";

function Cabeceras() {
    const { tamano, linea, tipo } = useParams();

    const formatearSlug = (slug = "") =>
        slug
            .split("-")
            .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
            .join(" ");

    let titulo = "Cabeceras";
    if (tamano && linea && tipo) {
        titulo = `Cabeceras ${formatearSlug(tamano)} ${formatearSlug(linea)} ${formatearSlug(tipo)}`;
    } else if (tamano && linea) {
        titulo = `Cabeceras ${formatearSlug(tamano)} ${formatearSlug(linea)}`;
    } else if (tamano) {
        titulo = `Cabeceras ${formatearSlug(tamano)}`;
    }

    const descripcionSeo = `Descubre nuestra amplia variedad de cabeceras Kamas${
        tamano ? ` de ${formatearSlug(tamano)}` : ""
    }${linea ? ` línea ${formatearSlug(linea)}` : ""}${
        tipo ? ` tipo ${formatearSlug(tipo)}` : ""
    }. Envío a todo el Perú.`;

    return (
        <Productos
            categoriaForzada="cabeceras"
            paramsRuta={{
                "tamaño": tamano,
                "línea": linea,
                "tipo-de-cabecera": tipo,
            }}
            titulo={titulo}
            descripcionSeo={descripcionSeo}
        />
    );
}

export default Cabeceras;
