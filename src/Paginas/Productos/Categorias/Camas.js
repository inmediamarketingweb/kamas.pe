// // import Productos from "../../Productos/Productos";
// // import "./Categorias.css";

// // function Camas() {
// //     return (
// //         <Productos
// //             categoriaForzada="camas"
// //             titulo="Camas"
// //             descripcionSeo="Descubre nuestra amplia variedad de colchones Kamas: ortopédicos, semi ortopédicos, pocket y más. Envío a todo el Perú."
// //         />
// //     );
// // }

// // export default Camas;

// import { useParams } from "react-router-dom";
// import Productos from "../../Productos/Productos";
// import "./Categorias.css";

// function Camas() {
//     const { tamano, linea } = useParams();

//     const formatearSlug = (slug = "") =>
//         slug
//             .split("-")
//             .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
//             .join(" ");

//     let titulo = "Camas";
//     if (tamano && linea) {
//         titulo = `Camas ${formatearSlug(tamano)} ${formatearSlug(linea)}`;
//     } else if (tamano) {
//         titulo = `Camas ${formatearSlug(tamano)}`;
//     }

//     const descripcionSeo = `Descubre nuestra amplia variedad de camas Kamas${
//         tamano ? ` de ${formatearSlug(tamano)}` : ""
//     }${linea ? ` línea ${formatearSlug(linea)}` : ""}. Envío a todo el Perú.`;

//     return (
//         <Productos
//             categoriaForzada="camas"
//             medida={tamano}
//             formato={linea}
//             titulo={titulo}
//             descripcionSeo={descripcionSeo}
//         />
//     );
// }

// export default Camas;

import { useParams } from "react-router-dom";
import Productos from "../../Productos/Productos";
import "./Categorias.css";

function Camas() {
    const { tamano, linea } = useParams();

    const formatearSlug = (slug = "") =>
        slug
            .split("-")
            .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
            .join(" ");

    let titulo = "Camas";
    if (tamano && linea) {
        titulo = `Camas ${formatearSlug(tamano)} ${formatearSlug(linea)}`;
    } else if (tamano) {
        titulo = `Camas ${formatearSlug(tamano)}`;
    }

    const descripcionSeo = `Descubre nuestra amplia variedad de camas Kamas${
        tamano ? ` de ${formatearSlug(tamano)}` : ""
    }${linea ? ` línea ${formatearSlug(linea)}` : ""}. Envío a todo el Perú.`;

    return (
        <Productos
            categoriaForzada="camas"
            medida={tamano}
            formato={linea}
            titulo={titulo}
            descripcionSeo={descripcionSeo}
        />
    );
}

export default Camas;
