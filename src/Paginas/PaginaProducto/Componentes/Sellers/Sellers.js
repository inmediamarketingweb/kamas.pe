import "./Sellers.css";

const SELLERS_IMGS = {
    falabella: "/assets/imagenes/sellers/falabella.jpg",
    ripley: "/assets/imagenes/sellers/ripley.jpg",
};

function Sellers({ producto }) {
    const sellers = producto?.sellers;

    if (!Array.isArray(sellers) || sellers.length === 0) return null;

    const sellersActivos = sellers
        .map((s) => {
            const nombre = s?.nombre?.trim();
            if (!nombre) return null;
            const key = nombre.toLowerCase();
            return {
                nombre,
                ruta: s.ruta || "/",
                img: SELLERS_IMGS[key] || "/assets/imagenes/sellers/default.jpg",
            };
        })
        .filter(Boolean);

    if (sellersActivos.length === 0) return null;

    return (
        <div className="d-flex-column gap-10">
            <h2 className="title color-color-1">Disponible en:</h2>

            <ul className="product-page-sellers d-flex-wrap gap-5">
                {sellersActivos.map((seller, i) => (
                    <li key={`${seller.nombre}-${i}`} className="d-flex-center-center">
                        <a href={seller.ruta} title={seller.nombre} className="d-flex-center-center" target="_blank" rel="noopener noreferrer" >
                            <img src={seller.img} alt={seller.nombre} />
                            <p className="text">{seller.nombre}</p>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sellers;
