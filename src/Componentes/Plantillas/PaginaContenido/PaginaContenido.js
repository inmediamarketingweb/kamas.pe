import { Helmet } from "react-helmet-async";

import './PaginaContenido.css';

function PaginaContenido({ data }){
    const metadatos = data.metadatos?.[0] || null;
    const banner = data.banner?.[0] || null;
    const contenido = data.contenido || [];
    const imagenes = data.imagen || []; 

    return(
        <>
            <Helmet>
                <title>{metadatos?.metatitulo} | Kamas</title>
                <meta name="description" content={metadatos?.metadescripcion || ""} />
                <meta property="og:title" content={metadatos?.metatitulo || ""} />
                <meta property="og:site_name" content={metadatos?.metatitulo || ""} />
                <meta property="og:description" content={metadatos?.metadescripcion || ""} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={window.location.href} />
                {banner?.banner && ( <meta property="og:image" content={banner.banner} /> )}
            </Helmet>

            <main>
                <div className="block-container">
                    <section className="block-content">
                        {metadatos?.metatitulo && (
                            <div className="block-title-container">
                                <h1 className="block-title">{metadatos.metatitulo}</h1>
                            </div>
                        )}

                        <div className="d-flex-column gap-20">
                            {banner?.banner && (
                                <img src={banner.banner} alt={metadatos?.metatitulo || "Imagen"} className="page-banner-img"/>
                            )}

                            {contenido.length > 0 && contenido.map((item, index) => (
                                <div key={index} className="d-flex-column gap-20">
                                    <div className="d-flex-column gap-10">
                                        {item.title && <h2 className="title">{item.title}</h2>}

                                        {item.textos && item.textos.map((textoItem, idx) => (
                                            <p key={idx} className="text">
                                                {textoItem.texto}
                                            </p>
                                        ))}

                                        {item.lista && (
                                            <ul className="content-page-list d-flex-column gap-5">
                                                {item.lista.map((listItem, idx) => (
                                                    <li key={idx}>
                                                        <p className="text">{listItem.texto}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {imagenes.length > 0 && imagenes.map(
                                (img, index) => img.imagen ? (
                                    <div key={index} className="block-image">
                                        <img src={img.imagen} alt={`Imagen ${index + 1}`} className="page-banner-img"/>
                                    </div>
                                ) : null
                            )}
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}

export default PaginaContenido;
