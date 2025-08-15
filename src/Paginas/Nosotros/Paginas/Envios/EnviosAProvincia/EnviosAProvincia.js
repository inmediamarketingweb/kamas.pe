import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import '../EnviosALimaYCallao/EnviosALimaYCallao.css';

function EnviosAProvincia(){
    const [destinos, setDestinos] = useState([]);

    useEffect(() => {
        fetch('/assets/json/paginas/envios/envios-a-lima-y-callao.json')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error al obtener la información');
            }
            return response.json();
        })
        .then((data) => setDestinos(data))
        .catch((error) => console.error('Error fetching destinos JSON:', error));
    }, []);

    useEffect(() => {
        let script;
        if (!document.getElementById('tiktok-embed-script')){
            script = document.createElement('script');
            script.id = 'tiktok-embed-script';
            script.src = 'https://www.tiktok.com/embed.js';
            script.async = true;
            document.body.appendChild(script);
        }
        return () => {
            if (script && document.getElementById('tiktok-embed-script')) {
            document.body.removeChild(script);
        }
        };
    }, []);

    return(
        <>
            <Helmet>
                <title>Envíos a provincia | Kamas</title>
            </Helmet>

            <main>
                <div className="block-container">
                    <section className="block-content d-flex-column gap-20">
                        <img className="page-banner-img" src="/assets/imagenes/paginas/envios/envios-a-provincia.jpg" alt="Envíos para Lima y Callao | Kamas"/>

                        <div className="envios-page">
                            <div className="d-flex-column gap-10">
                                <blockquote className="tiktok-embed" cite="https://www.tiktok.com/@kamas.pe/video/7306283248932474118" data-video-id="7306283248932474118">
                                    <section>
                                        <a target="_blank" rel="noopener noreferrer" title="@kamas.pe" href="https://www.tiktok.com/@kamas.pe?refer=embed">@kamas.pe</a>
                                        <a title="dormitorio" target="_blank" rel="noopener noreferrer" href="https://www.tiktok.com/tag/dormitorio?refer=embed">#Dormitorio</a>
                                        <a title="kamas" target="_blank" rel="noopener noreferrer" href="https://www.tiktok.com/tag/kamas?refer=embed">#Kamas</a>
                                        <a title="king" target="_blank" rel="noopener noreferrer" href="https://www.tiktok.com/tag/king?refer=embed">#King</a>
                                        <a title="3plazas" target="_blank" rel="noopener noreferrer" href="https://www.tiktok.com/tag/3plazas?refer=embed">#3Plazas</a>
                                        <a target="_blank" rel="noopener noreferrer" title="♬ sonido original - kamas" href="https://www.tiktok.com/music/sonido-original-7306283263833164549?refer=embed">♬ sonido original - kamas</a>
                                    </section>
                                </blockquote>
                            </div>

                            <div className="envios-page-destinos">
                                {destinos.map((destino, idx) => (
                                    <div key={idx} className="d-flex-column d-flex-center-center gap-10">
                                        <div>
                                            <img src={destino.imgOne} alt={`Imagen de ${destino.provincia} - 1`}/>
                                            <img src={destino.imgTwo} alt={`Imagen de ${destino.provincia} - 2`}/>
                                        </div>
                                        <p className="text">{destino.provincia}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}

export default EnviosAProvincia;
