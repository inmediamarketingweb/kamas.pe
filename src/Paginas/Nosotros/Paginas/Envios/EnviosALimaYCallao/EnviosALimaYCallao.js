import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import './EnviosALimaYCallao.css'

function EnviosALimaYCallao(){
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
                <title>Envíos para Lima y Callao | Kamas</title>
            </Helmet>

            <main>
                <div className="block-container">
                    <section className="block-content d-flex-column gap-20">
                        <img className="page-banner-img" src="/assets/imagenes/paginas/envios/envios-lima-y-callao.jpg" alt="Envíos para Lima y Callao | Kamas"/>

                        <div className="envios-page">
                            <div className="d-flex-column gap-10">
                                <blockquote class="tiktok-embed" cite="https://www.tiktok.com/@kamas.pe/video/7538457611511942406" data-video-id="7538457611511942406">
                                    <section>
                                        <a target="_blank" title="@kamas.pe" href="https://www.tiktok.com/@kamas.pe?refer=embed">@kamas.pe</a>
                                        <a title="dormitorio" target="_blank" href="https://www.tiktok.com/tag/dormitorio?refer=embed">#Dormitorio</a>
                                        <a title="4plazas" target="_blank" href="https://www.tiktok.com/tag/4plazas?refer=embed">#4Plazas</a> 🔥 El MÁS GRANDE del Perú 🔥 👉 ¡Solo en 
                                        <a title="kamas" target="_blank" href="https://www.tiktok.com/tag/kamas?refer=embed">#kamas</a>  
                                        ✨ Espacio, comodidad y lujo en un solo lugar. 💤 
                                        <a title="descansa" target="_blank" href="https://www.tiktok.com/tag/descansa?refer=embed">#Descansa</a> 
                                        <a target="_blank" title="♬ sonido original - kamas" href="https://www.tiktok.com/music/sonido-original-7538457632101698310?refer=embed">♬ sonido original - kamas</a>
                                    </section>
                                </blockquote>

                                <blockquote class="tiktok-embed" cite="https://www.tiktok.com/@kamas.pe/video/7539967987751701765" data-video-id="7539967987751701765">
                                    <section>
                                        <a target="_blank" title="@kamas.pe" href="https://www.tiktok.com/@kamas.pe?refer=embed">@kamas.pe</a>
                                        <a title="insuperable" target="_blank" href="https://www.tiktok.com/tag/insuperable?refer=embed">#Insuperable</a>
                                        <a title="dormitorio" target="_blank" href="https://www.tiktok.com/tag/dormitorio?refer=embed">#Dormitorio</a>
                                        <a title="kamas" target="_blank" href="https://www.tiktok.com/tag/kamas?refer=embed">#Kamas</a>
                                        <a target="_blank" title="♬ sonido original - kamas" href="https://www.tiktok.com/music/sonido-original-7539968028658764600?refer=embed">♬ sonido original - kamas</a>
                                    </section>
                                </blockquote>
                                
                                <blockquote class="tiktok-embed" cite="https://www.tiktok.com/@kamas.pe/video/7544476821547404549" data-video-id="7544476821547404549">
                                    <section>
                                        <a target="_blank" title="@kamas.pe" href="https://www.tiktok.com/@kamas.pe?refer=embed">@kamas.pe</a> 
                                        ✨ La verdadera Cama Nube está en KAMAS 🛏️ Incluye colchón ortopédico 🎨 +60 colores premium 🚚 Envío GRATIS en Lima y Callao 📲 Escríbenos y hazla tuya hoy 
                                        <a title="kamas" target="_blank" href="https://www.tiktok.com/tag/kamas?refer=embed">#kamas</a> 
                                        <a title="nube" target="_blank" href="https://www.tiktok.com/tag/nube?refer=embed">#nube</a> 
                                        <a title="dormitorio" target="_blank" href="https://www.tiktok.com/tag/dormitorio?refer=embed">#dormitorio</a> 
                                        <a target="_blank" title="♬ sonido original - kamas" href="https://www.tiktok.com/music/sonido-original-7544476870512413496?refer=embed">♬ sonido original - kamas</a> 
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

export default EnviosALimaYCallao;
