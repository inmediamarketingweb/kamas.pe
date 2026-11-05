// import './NivelDeFirmeza.css';

// function NivelDeFirmeza(){
//     return(
//         <div className='border-1-component padding-20 border-r-4 d-flex-column gap-10'>
//             <p className='text font-bold uppercase font-13'>Nivel de firmeza</p>

//             <ul className='nvl-frm-container'>
//                 <li className='active'>
//                     <p className='text'>Suave</p>
//                 </li>
//                 <li>
//                     <p className='text'>Medio suave</p>
//                 </li>
//                 <li>
//                     <p className='text'>Intermedio</p>
//                 </li>
//                 <li>
//                     <p className='text'>Firme</p>
//                 </li>
//                 <li>
//                     <p className='text'>Muy firme</p>
//                 </li>
//             </ul>
//         </div>
//     )
// }

// export default NivelDeFirmeza;

import './NivelDeFirmeza.css';

// Los niveles válidos que se mostrarán en pantalla
const NIVELES = [
    { id: 'suave', label: 'Suave' },
    { id: 'medio-suave', label: 'Medio suave' },
    { id: 'intermedio', label: 'Intermedio' },
    { id: 'firme', label: 'Firme' },
    { id: 'muy-firme', label: 'Muy firme' },
];

// Diccionario de respaldo por modelo
const FIRMEZA_POR_MODELO = {
    adel: "suave",
    rucay: "suave",
    sarki: "medio-suave",
    safynnte: "medio-suave",
    "der-prinz": "firme",
    "thameo-pocket": "intermedio",
    ramat: "intermedio",
    nesie: "firme",
    norole: "muy firme",
    "thaleo pocket": "muy firme",
    konig: "muy firme",
    yurmale: "muy firme",
};

const normalizar = (str) => {
    if (!str) return "";
    return String(str)
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
};

function NivelDeFirmeza({ producto }) {
    if (!producto) return null;

    let nivelDetectado = null;

    // 1. Buscar en las descripciones o detalles del producto
    const buscarFirmeza = (arr) => {
        if (!Array.isArray(arr)) return;
        for (const item of arr) {
            if (!item || typeof item !== "object") continue;
            const v = item["nivel-de-confort"] || item["firmeza"];
            if (typeof v === "string") {
                const n = normalizar(v);
                // Validar que sea un nivel reconocido
                const match = NIVELES.find(nivel => nivel.id === n.replace(/\s+/g, "-") || nivel.id === n.replace(/\s+/g, ""));
                if (match) {
                    nivelDetectado = match.id;
                    return;
                }
            }
        }
    };

    buscarFirmeza(producto.descripcion);
    if (!nivelDetectado) buscarFirmeza(producto["detalles-del-producto"]);

    // 2. Si no se encuentra, buscar por el modelo del colchón
    if (!nivelDetectado) {
        let modeloDetectado = null;
        const detalles = producto["detalles-del-producto"];

        if (Array.isArray(detalles)) {
            for (const d of detalles) {
                const m = d["modelo-de-colchón"] || d["modelo-de-colchon"] || d["modelo"];
                if (typeof m === "string" && m.trim()) {
                    modeloDetectado = normalizar(m).replace(/\s+/g, "-");
                    break;
                }
            }
        }

        // Como respaldo, buscar el modelo en el nombre del producto
        if (!modeloDetectado && producto.nombre) {
            const n = normalizar(producto.nombre);
            const m = n.match(/colchon\s+kamas\s+(.+?)(?:\s+\d|\s*\+|\s*$)/) || n.match(/kamas\s+([a-z][a-z\s]*?)(?:\s+\d|\s*\+|\s*$)/);
            if (m && m[1]) modeloDetectado = m[1].trim().replace(/\s+/g, "-");
        }

        if (modeloDetectado && FIRMEZA_POR_MODELO[modeloDetectado]) {
            nivelDetectado = FIRMEZA_POR_MODELO[modeloDetectado];
        }
    }

    return (
        <div className='border-1-component padding-20 border-r-4 d-flex-column gap-10'>
            <p className='text font-bold uppercase font-13'>Nivel de firmeza</p>

            <ul className='nvl-frm-container'>
                {NIVELES.map((nivel) => (
                    <li key={nivel.id} className={nivelDetectado === nivel.id ? 'active' : ''}>
                        <p className='text'>{nivel.label}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default NivelDeFirmeza;
