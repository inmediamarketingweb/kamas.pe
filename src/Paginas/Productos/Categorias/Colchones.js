import { useParams } from "react-router-dom";
import Productos from "../../Productos/Productos";

import "./Categorias.css";

function Colchones() {
    const { medida, formato } = useParams();
    const formatearSlug = (slug = "") => slug.split("-").map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(" ");

    let titulo = "Colchones";
    if (medida && formato) {
        titulo = `Colchones ${formatearSlug(medida)} ${formatearSlug(formato)}`;
    } else if (medida) {
        titulo = `Colchones ${formatearSlug(medida)}`;
    }

    const descripcionSeo = `Descubre nuestra amplia variedad de colchones Kamas${
        medida ? ` de ${formatearSlug(medida)}` : ""
    }${formato ? ` en formato ${formatearSlug(formato)}` : ""}: ortopédicos, semi ortopédicos, pocket y más. Envío a todo el Perú.`;

    return(
        <Productos categoriaForzada="colchones" medida={medida} formato={formato} titulo={titulo} descripcionSeo={descripcionSeo} />
    );
}

export default Colchones;
