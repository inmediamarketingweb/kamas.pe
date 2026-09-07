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
                                <blockquote class="tiktok-embed" cite="https://www.tiktok.com/@kamas.pe/video/7643851361968278804" data-video-id="7643851361968278804">
                                    <section>
                                        <a target="_blank" rel="noreferrer" title="@kamas.pe" href="https://www.tiktok.com/@kamas.pe?refer=embed">@kamas.pe</a> ¡Duerme como un
                                        <a title="king" target="_blank" rel="noreferrer" href="https://www.tiktok.com/tag/king?refer=embed">#king</a> ¡ 🤴👸 
                                        <a title="dormitorio" target="_blank" rel="noreferrer" href="https://www.tiktok.com/tag/dormitorio?refer=embed">#dormitorio</a> 
                                        3 PLAZAS <a title="kamas" target="_blank" rel="noreferrer" href="https://www.tiktok.com/tag/kamas?refer=embed">#KAMAS</a> 
                                        <a target="_blank" rel="noreferrer" title="♬ sonido original - kamas" href="https://www.tiktok.com/music/sonido-original-7643851454415964935?refer=embed">♬ sonido original - kamas</a>
                                    </section>
                                </blockquote>

                                <blockquote class="tiktok-embed" cite="https://www.tiktok.com/@kamas.pe/video/7656851390819503380" data-video-id="7656851390819503380">
                                    <section>
                                        <a target="_blank" title="@kamas.pe" rel="noreferrer" href="https://www.tiktok.com/@kamas.pe?refer=embed">@kamas.pe</a>
                                        🛏️ Muchos tienen una cama de 3 plazas... pero muy pocos disfrutan una de 4 plazas. 😏 🔥 Dormitorio Kamas 4 Plazas a tan sololo S&#47;2,299 ✅ El dormitorio más grande del país 🎨 Más de 80 colores para elegir 🛋️ Amplia variedad de diseños de cabeceras 🚚 Envíos a nivel nacional 
                                        <a title="dormitorio4plazas" target="_blank" rel="noreferrer" href="https://www.tiktok.com/tag/dormitorio4plazas?refer=embed">#Dormitorio4Plazas</a> 
                                        <a title="cama4plazas" target="_blank" rel="noreferrer" href="https://www.tiktok.com/tag/cama4plazas?refer=embed">#cama4plazas</a> 
                                        <a title="kamas" target="_blank" rel="noreferrer" href="https://www.tiktok.com/tag/kamas?refer=embed">#Kamas</a> 
                                        <a target="_blank" title="♬ sonido original - kamas" rel="noreferrer" href="https://www.tiktok.com/music/sonido-original-7656851425600670485?refer=embed">♬ sonido original - kamas</a>
                                    </section>
                                </blockquote>

                                <script async src="https://www.tiktok.com/embed.js"></script>
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
