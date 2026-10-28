import { useParams } from "react-router-dom";
import Productos from "../Productos";
import "./Categorias.css";

function Dormitorios() {
    const { tamano, modelo, linea } = useParams();

    const formatearSlug = (slug = "") =>
        slug
            .split("-")
            .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
            .join(" ");

    let titulo = "Dormitorios";
    if (tamano && modelo && linea) {
        titulo = `Dormitorios ${formatearSlug(tamano)} ${formatearSlug(modelo)} ${formatearSlug(linea)}`;
    } else if (tamano && modelo) {
        titulo = `Dormitorios ${formatearSlug(tamano)} ${formatearSlug(modelo)}`;
    } else if (tamano) {
        titulo = `Dormitorios ${formatearSlug(tamano)}`;
    }

    const descripcionSeo = `Descubre nuestra amplia variedad de dormitorios Kamas${
        tamano ? ` de ${formatearSlug(tamano)}` : ""
    }${modelo ? ` modelo ${formatearSlug(modelo)}` : ""}${
        linea ? ` línea ${formatearSlug(linea)}` : ""
    }. Envío a todo el Perú.`;

    return (
        <Productos
            categoriaForzada="dormitorios"
            paramsRuta={{
                "tamaño": tamano,
                "modelo-de-colchón": modelo,
                "línea": linea,
            }}
            titulo={titulo}
            descripcionSeo={descripcionSeo}
        />
    );
}

export default Dormitorios;
